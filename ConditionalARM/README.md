# Conditional ARM Templates

This demo deploys an ARM Template consisting of an Azure Web App backed by Azure SQL Database. However, the deployment is conditional based on the value of the **environment** parameter:

* **production** will create an Azure Web App that has a secondary deployment slot to aid in code deployments
* **qa** will create just the Azure Web App

Each of the two environments are implemented as nested template deployments.

Sample Parameters File
```json
{
    "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "hostingPlanName": {
            "value": "asp1214"
        },
        "administratorLogin": {
            "value": "l-admin"
        },
        "databaseName": {
            "value": "db1214"
        },
        "skuName": {
            "value": "S1"
        },
        "administratorLoginPassword": {
            "value": "Pass@word1214"
        }
    }
}
```