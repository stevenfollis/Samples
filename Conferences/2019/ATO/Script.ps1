# Setup variables for URLs and Image Name
$UCP='ucp.west.us.se.dckr.org';
$REGISTRY='dtr.west.us.se.dckr.org';
$IMAGE="$REGISTRY/$env:USERNAME/jobs:ltsc2019";
$USER=$env:USERNAME.replace('.', '');



# Build container
docker image build --tag $IMAGE "C:\Demos\ato\Jobs";



# Run container
docker container rm --force jobs-$USER;
docker container run `
    --name jobs-$USER `
    --detach `
    --publish 8080 `
    $IMAGE;

Start-Process chrome "http://$(docker container inspect --format '{{ .NetworkSettings.Networks.nat.IPAddress }}' jobs-$USER):8080"



<#
# Pre-Generated: How to generate + Install a Group Managed Service Account (gMSA)
#
New-ADServiceAccount `
    -Name "jobs-gmsa" `
    -DNSHostName "jobs-gmsa.dckr.org" `
    -PrincipalsAllowedToRetrieveManagedPassword "CN=Windows Worker Nodes,OU=Groups,OU=DOCKER,DC=dckr,DC=org" `
    -ServicePrincipalNames "HTTP/jobs-gmsa", "HTTP/jobs-gmsa.dckr.org";
    
Install-ADServiceAccount -Identity "jobs-gmsa"
#>



# Create a new Credential Spec file
Import-Module C:\Demos\dac\CredentialSpec.psm1;
New-CredentialSpec `
    -Name jobs-gmsa-cred-spec `
    -AccountName jobs-gmsa `
    -Domain $(Get-ADDomain -Current LocalComputer);



# View contents of the Cred Spec file
code "D:\credentialspecs\jobs-gmsa-cred-spec.json";



# Re-Create Container with Credential Spec
# Run container
docker container rm --force jobs-$USER;
docker container run `
    --name jobs-$USER `
    --detach `
    --publish 8080 `
    --security-opt "credentialspec=file://jobs-gmsa-cred-spec.json" `
    $IMAGE;

Start-Process chrome "http://$(docker container inspect --format '{{ .NetworkSettings.Networks.nat.IPAddress }}' jobs-$USER):8080";



# Login to DTR and push image
docker login --username $env:USERNAME $REGISTRY;
docker image push $IMAGE;
Start-Process chrome "https://dtr.west.us.se.dckr.org/repositories/$env:USERNAME/jobs/tags"

# End