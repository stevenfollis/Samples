# escape=`
FROM mcr.microsoft.com/dotnet/framework/aspnet:4.7.2-windowsservercore-ltsc2016
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

EXPOSE 80

# Create and configure app pools
RUN Import-Module WebAdministration ; `
    Install-WindowsFeature -Name 'Web-Windows-Auth'; `
    Remove-Website 'Default Web Site'; `
    New-Item -Path 'IIS:\AppPools\SiteAppPool' ; `
	Set-ItemProperty -Path 'IIS:\AppPools\SiteAppPool' `
		-Name processModel `
		-Value @{identitytype='NetworkService'};

# Set ACLs
RUN New-Item `
		-ItemType Directory `
		-Path C:\Site; `
	$path='C:\Site'; `
	$acl = Get-Acl $path; `
	$newOwner = [System.Security.Principal.NTAccount]('BUILTIN\IIS_IUSRS'); `
	$acl.SetOwner($newOwner); `
	dir -r $path | Set-Acl -aclobject  $acl

# Initialize website
RUN New-Website `
		-Name 'Site' `
		-PhysicalPath 'C:\Site' `
		-IP '*' `
		-Port 80 `
		-ApplicationPool 'SiteAppPool' `
		-Force; `
	Set-WebConfigurationProperty `
		-Location "Site" `
		-PSPath IIS:\ `
		-Filter "system.webServer/security/authentication/anonymousAuthentication" `
		-Name "enabled" `
		-Value $false; `
	Set-WebConfigurationProperty `
		-Location "Site" `
		-PSPath IIS:\ `
		-Filter "/system.webServer/security/authentication/windowsAuthentication" `
		-Name "Enabled" `
		-Value $true; `
	Set-WebConfigurationProperty `
		-PSPATH 'MACHINE/WEBROOT/APPHOST/Site' `
		-Filter "system.webServer/security/Authentication/windowsAuthentication" `
		-Name "useAppPoolCredentials" `
		-Value $true `
		-Force;

# Enable IIS Remote Administration
RUN  Install-WindowsFeature "Web-Mgmt-Service"; `
	net user remoteadmin Qwerty123456 /add; `
	net localgroup Administrators remoteadmin /add; `
	New-ItemProperty `
		-Path "HKLM:\software\microsoft\WebManagement\Server" `
		-Name "EnableRemoteManagement" `
		-Value 1 `
		-Force;
			
ENTRYPOINT	Start-Service WMSVC; `
		C:\ServiceMonitor.exe w3svc;

# Copy physical paths
COPY default.aspx C:\Site\