/**
 * This application takes a CSV file where each row is a set of parameters,
 * combines each set of parameters with an ARM Template
 * and deploys the resources to an Azure Resource Group
 * 
 * Influenced by https://github.com/Azure-Samples/resource-manager-node-template-deployment
 */

var fs = require('fs');
var path = require('path');
var msRestAzure = require('ms-rest-azure');
var resourceManagement = require("azure-arm-resource");
var Converter = require("csvtojson").Converter;
var converter = new Converter({});
var config = require('./config/config');
var _ = require('lodash');

console.log(`Starting deployment`);

// Login to Azure 
login()
    .then(function (client) {

        // Execute in parallel all deployent preparation tasks
        Promise
            .all([Promise.resolve(client), getTemplate(), getParameters(), createRG(client)])
            .then(deployTemplate)
            .then(function (values) {

                console.log(`Deployed ARM Template to Azure`);

            });

    });

// =========================================================
// Step 1: Login to Azure with a Service Principal
// https://azure.microsoft.com/en-us/documentation/articles/resource-group-authenticate-service-principal-cli/
// =========================================================
function login() {

    return new Promise((resolve, reject) => {

        msRestAzure.loginWithServicePrincipalSecret(config.auth.APPLICATION_ID, config.auth.APPLICATION_SECRET, config.auth.DOMAIN, (error, credentials) => {

            if (error) reject(error);

            console.log(`Authenticated with Azure via Service Principal`);

            // Create an ARM client
            var client = new resourceManagement.ResourceManagementClient(credentials, config.auth.AZURE_SUBSCRIPTION_ID);

            // Resolve client
            resolve(client);

        });

    });

}

// =========================================================
// Step 2: Parse CSV File containing ARM Template parameters
// =========================================================
function getTemplate() {

    return new Promise((resolve, reject) => {

        fs.readFile(config.template.filePath, 'utf8', (error, results) => {

            if (error) reject(error);

            console.log(`Successfully retrieved ARM Template file`);
            resolve(JSON.parse(results));

        });

    });

}

// =========================================================
// Step 2: Parse CSV File containing ARM Template parameters
// =========================================================
function getParameters() {

    return new Promise((resolve, reject) => {

        converter.fromFile(config.parameters.filePath, function (error, rows) {

            if (error) console.error(error);

            // CSV values are returned as s tring (ex. {name: jane} )
            // ARM parameters have a format of parameter name, then a value object
            // ex. {name: jane} needs to be processed to {name: {value:jane}}
            // Loop through the original rows and process a new array

            // Create new array to hold processed parameters
            var processedParameters = [];

            // Loop through the original values
            rows.forEach((row, i) => {

                // Adjust value from a string to an object
                var processed = _.mapValues(row, function (original) {

                    return { value: original };

                });

                // Push new object into the array
                processedParameters.push(processed);

            });

            console.log(`Parsed parameters CSV file`);
            resolve(processedParameters);

        });

    });

}

// =========================================================
// Step 3: Create an Azure Resource Group 
// =========================================================
function createRG(client) {

    return new Promise((resolve, reject) => {

        // Use the RM client to create a resource group
        client
            .resourceGroups
            .createOrUpdate(config.group.name, config.group.properties, function (error, response) {

                if (error) reject(error);

                console.log(`Created Resource Group named ${response.name}`);

                // Resolve Promise
                resolve(response.name);

            });

    });

}

// =========================================================
// Step 4: Deploy ARM Template
// =========================================================
function deployTemplate(values) {

    return new Promise((resolve, reject) => {

        // Set variables from the values array
        var client = values[0];
        var template = values[1];
        var parameters = values[2];
        var rgName = values[3];
        var counter = 0;

        // Loop through the sets of parameters 
        // creating a new deployment for each set in the parameters array
        parameters.forEach(function (parameter, i) {

            // Define a unique deployment name
            var deploymentName = `${config.group.name}-${_.random(100, 999)}`;

            // Define object for template deployment
            var deploymentParameters = {
                "properties": {
                    "parameters": values[2][i],
                    "template": values[1],
                    "mode": "Incremental"
                }
            };

            // Deploy template
            client
                .deployments
                .createOrUpdate(rgName, deploymentName, deploymentParameters, function (error, result) {

                    if (error) console.error(error);

                    console.log(`Deployed ARM Template`);

                });

            // Iterate the counter  
            counter++;
            if (counter === parameters.length) resolve();

        });

    });

}

