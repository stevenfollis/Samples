module.exports = {

    auth: {

        // Your subscription ID
        "AZURE_SUBSCRIPTION_ID": "9f4d814b-7085-44ae-8a42-bbae2a5a3f35",

        // AzureAD Application Client ID
        "APPLICATION_ID": "ca93cb9f-350e-47ef-8ca1-dc367ca189a8",

        // AzureAD Application Secret/Key
        "APPLICATION_SECRET": "CGE5qhjiiY4/wyNDU3rw1riG9Nv6FHem6VyrJaRtCwY=",

        // Your AzureAD tenant as a GUID
        "DOMAIN": "72f988bf-86f1-41af-91ab-2d7cd011db47"
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