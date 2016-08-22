// Load the node HTTP Module
var http = require('http');

// Define an HTML template with environmental variables
var template =
    `
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <title>Environmental Variable Fun</title>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    </head>

    <body>
        <div class="container">
            <h1>Environmental Variable Fun</h1>
            <p>List of environmental variables available to Node.js applications running within Azure Web Apps.</p>
            <p>Adapted and inspired from <a href="https://github.com/projectkudu/kudu/wiki/Azure-runtime-environment" target="_blank">https://github.com/projectkudu/kudu/wiki/Azure-runtime-environment</a>.</p>
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <th>WEBSITE_SITE_NAME</th>
                        <td>${process.env.WEBSITE_SITE_NAME}</td>
                        <td>The name of the site.</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_SKU</th>
                        <td>${process.env.WEBSITE_SKU}</td>
                        <td>The sku of the site (Possible values: Free, Shared, Basic, Standard).</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_COMPUTE_MODE</th>
                        <td>${process.env.WEBSITE_COMPUTE_MODE}</td>
                        <td>Specifies whether website is on a dedicated or shared VM/s (Possible values: Shared, Dedicated).</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_SITE_MODE</th>
                        <td>${process.env.WEBSITE_SITE_MODE}</td>
                        <td>The mode for the site (can be Limited for a free site, Basic for a shared site or empty for a standard site).</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_HOSTNAME</th>
                        <td>${process.env.WEBSITE_HOSTNAME}</td>
                        <td>The Azure Website's primary host name for the site (For example: site.azurewebsites.net). Note that custom
                            hostnames are not accounted for here.</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_INSTANCE_ID</th>
                        <td>${process.env.WEBSITE_INSTANCE_ID}</td>
                        <td>The id representing the VM that the site is running on (If site runs on multiple instances, each instance
                            will have a different id).</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_NODE_DEFAULT_VERSION</th>
                        <td>${process.env.WEBSITE_NODE_DEFAULT_VERSION}</td>
                        <td>The default node version this website is using.</td>
                    </tr>
                    <tr>
                        <th>WEBSOCKET_CONCURRENT_REQUEST_LIMIT</th>
                        <td>${process.env.WEBSOCKET_CONCURRENT_REQUEST_LIMIT}</td>
                        <td>The limit for websocket's concurrent requests.</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_LOCALCACHE_ENABLED</th>
                        <td>${process.env.WEBSITE_LOCALCACHE_ENABLED}</td>
                        <td>Whether or not <a href="https://azure.microsoft.com/en-us/documentation/articles/app-service-local-cache/" target="_blank">Local Cache</a> is being used</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_AUTH_ENABLED</th>
                        <td>${process.env.WEBSITE_AUTH_ENABLED}</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_DYNAMIC_CACHE</th>
                        <td>${process.env.WEBSITE_DYNAMIC_CACHE}</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_HTTPLOGGING_ENABLED</th>
                        <td>${process.env.WEBSITE_HTTPLOGGING_ENABLED}</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_IIS_SITE_NAME</th>
                        <td>${process.env.WEBSITE_IIS_SITE_NAME}</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_OWNER_NAME</th>
                        <td>${process.env.WEBSITE_OWNER_NAME}</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_PROACTIVE_AUTOHEAL_ENABLED</th>
                        <td>${process.env.WEBSITE_PROACTIVE_AUTOHEAL_ENABLED}</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_REWRITE_TABLE</th>
                        <td>${process.env.WEBSITE_REWRITE_TABLE}</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_SCM_ALWAYS_ON_ENABLED</th>
                        <td>${process.env.WEBSITE_SCM_ALWAYS_ON_ENABLED}</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_SCM_SEPARATE_STATUS</th>
                        <td>${process.env.WEBSITE_SCM_SEPARATE_STATUS}</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th>WEBSITE_VOLUME_TYPE</th>
                        <td>${process.env.WEBSITE_VOLUME_TYPE}</td>
                        <td>&nbsp;</td>
                    </tr>
                     <tr>
                        <th>REGION_NAME</th>
                        <td>${process.env.REGION_NAME}</td>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>

    </html>
    `;

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(template);
    response.end();
});

// Listen on port 1337 if the environmental variable is not set
server.listen(process.env.PORT || 1337);

// Put a friendly message on the terminal
console.log("Server Running");
