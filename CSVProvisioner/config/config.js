module.exports = {

    auth: {

        // Your subscription ID
        "AZURE_SUBSCRIPTION_ID": "00000000-0000-0000-0000-000000000000",

        // AzureAD Application Client ID
        "APPLICATION_ID": "00000000-0000-0000-0000-000000000000",

        // AzureAD Application Secret/Key
        "APPLICATION_SECRET": "0000000000000000000000000000000000000000000=",

        // Your AzureAD tenant as a GUID
        "DOMAIN": "00000000-0000-0000-0000-000000000000"

    },

    parameters: {
        filePath: './csv/parameters.csv'
    },

    template: {
        filePath: './template/azuredeploy.json'
    },

    group: {
        name: 'SampleRG01',
        properties: {
            location: "East US",
            tags: { project: "Contoso" }
        }
    }

};