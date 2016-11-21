module.exports = {

    auth: {

        // AzureAD Application Client ID
        "APPLICATION_ID": "",

        // AzureAD Application Secret/Key
        "APPLICATION_SECRET": "",

        // Your AzureAD tenant as a GUID
        "DOMAIN": "",

        // Your subscription ID
        "AZURE_SUBSCRIPTION_ID": ""

    },

    parameters: {
        filePath: './csv/parameters.csv'
    },

    template: {
        filePath: './templates/VirtualMachine.json',
        sharedResourcesPath: './templates/SharedResources.json'
    },

    group: {
        name: 'SampleRG01',
        properties: {
            location: "East US",
            tags: { project: "Contoso" }
        }
    }

};