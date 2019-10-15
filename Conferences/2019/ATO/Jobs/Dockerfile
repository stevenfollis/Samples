# escape=`

# Base image matching the host's OS version (WS2019)
FROM mcr.microsoft.com/dotnet/framework/aspnet:4.8-windowsservercore-ltsc2019

# Use PowerShell rather than cmd
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

# Remove OOTB Site in favor of a custom site
RUN Remove-Website 'Default Web Site'

# Enable OS-Level Windows Features
RUN Enable-WindowsOptionalFeature -Online -All -FeatureName `
    IIS-ApplicationDevelopment, `
    IIS-CommonHttpFeatures, `
    IIS-DefaultDocument, `
    IIS-DirectoryBrowsing, `
    IIS-HealthAndDiagnostics, `
    IIS-HttpCompressionStatic, `
    IIS-HttpErrors, `
    IIS-HttpLogging, `
    IIS-ISAPIExtensions, `
    IIS-ISAPIFilter, `
    IIS-Performance, `
    IIS-RequestFiltering, `
    IIS-Security, `
    IIS-StaticContent, `
    IIS-WebServer, `
    IIS-WebServerRole

# Expose port(s) from website's bindings.
EXPOSE 8000 `
    8080 `
    44300

# Create and configure app pools
RUN Import-Module WebAdministration; `
    New-Item `
        -Path 'IIS:\AppPools\JobsAppPool'; `
    Set-ItemProperty `
        -Path 'IIS:\AppPools\JobsAppPool' `
        -Name processModel `
        -Value @{identitytype='ApplicationPoolIdentity'};

# Copy files from host into container
COPY Jobs C:\Jobs

# Copy SSL certificates for website bindings.
COPY c0562a7b889037523da4c76cdd39933046132da3.pfx C:\c0562a7b889037523da4c76cdd39933046132da3.pfx

# Set ACLs
RUN $path='C:\Jobs' ; `
    $acl = Get-Acl $path ; `
    $newOwner = [System.Security.Principal.NTAccount]('BUILTIN\IIS_IUSRS') ; `
    $acl.SetOwner($newOwner) ; `
    dir -r $path | Set-Acl -aclobject  $acl

# Initialize website
RUN New-Item `
        -Path 'C:\Jobs' `
        -Type Directory `
        -Force; `
    New-Website `
        -Name 'Jobs' `
        -PhysicalPath 'C:\Jobs' `
        -ApplicationPool 'JobsAppPool' `
        -IPAddress '*' `
        -Port 8080 `
        -Force; `
    New-WebBinding `
        -Name 'Jobs' `
        -IPAddress '*' `
        -Port 8000 `
        -Protocol 'http'; `
    New-WebBinding `
        -Name 'Jobs' `
        -IPAddress '*' `
        -Port 44300 `
        -Protocol 'https'; `
    $cert = Import-PfxCertificate -FilePath 'c0562a7b889037523da4c76cdd39933046132da3.pfx' Cert:\LocalMachine\WebHosting; `
    New-Item `
        -Path IIS:\SslBindings\0.0.0.0!44300 `
        -Value $cert;

# Configure Remote Administration in IIS.
RUN Install-WindowsFeature Web-Mgmt-Service; `
    New-ItemProperty `
        -Path HKLM:\software\microsoft\WebManagement\Server `
        -Name EnableRemoteManagement `
        -Value 1 `
        -Force; `
    Set-Service `
        -Name wmsvc `
        -StartupType automatic; `
    net user 'Docker' 'BuildShip&Run' /add; `
    net localgroup administrators Docker /add;

