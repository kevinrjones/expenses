# Installing and setting up Identity Server and Admin UI

## IDS, AdminUI and Client App

1. Read [this starter guide](https://www.scottbrady91.com/Identity-Server/Getting-Started-with-IdentityServer-4)
    1. In this case though do not run the DbApplicationContext migrations

1. Install AdminUI both API and UI
    1. In the configuration set ```RunIdentityMigrations``` to ```true``` and make sure the ```RunIdentityServerMigrations``` is set to ```false```

1. Create an application
    1. If you want to use the Users table as a foreign key then include the ```IdentityExpress.Identity``` package
    1. Reference the table

    ``` csharp
    namespace Expenses.Repository.Entities
    {
        public class Expense
        {
            public int ExpenseId { get; set; }

            [ForeignKey("UserId")]
            public virtual IdentityExpressUser User { get; set; }
        }
    }
    ```
    1. Add migrations
        1. You will need to edit the migrations file to remove all the *Identity* migrations and just leave yours

## Certificates


1. See this answer on [SO](https://stackoverflow.com/questions/21297139/how-do-you-sign-a-certificate-signing-request-with-your-certification-authority/21340898#21340898)
    1. These may also be useful
        1. [https://deliciousbrains.com/https-locally-without-browser-privacy-errors/](https://deliciousbrains.com/https-locally-without-browser-privacy-errors/) [https://www.humankode.com/asp-net-core/develop-locally-with-https-self-signed-certificates-and-asp-net-core](https://www.humankode.com/asp-net-core/develop-locally-with-https-self-signed-certificates-and-asp-net-core)
        1. [https://tosbourn.com/getting-os-x-to-trust-self-signed-ssl-certificates/](https://tosbourn.com/getting-os-x-to-trust-self-signed-ssl-certificates/)
        1. [https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/](https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/)

1. For the root cert
    1. Generate a key and a certificate
        1. ```openssl req -x509 -config openssl-ca.conf -newkey rsa:4096 -sha256 -nodes -out cacert.pem -outform PEM```
        1. Add the data needed for the root cert
        ``` shell
        touch index.txt
        echo '01' > serial.txt
        ```
    1. Install the root cert
        1. Import into KeyChain
        1. Double click and check 'Always Trust'
    1. Can now create a certificate for the site

1. For the development certificate
    1. Create a CSR
        1. ```openssl req -config openssl.localhost.conf -newkey rsa:2048 -sha256 -nodes -out dev.knowledgespike.com.csr -keyout dev.knowledgespike.com.key -outform PEM```
    1. Create the cert from the csr
        1. ```openssl ca -config openssl-ca.conf -policy signing_policy -extensions signing_req -out dev.knowledgespike.com.pem -infiles dev.knowledgespike.com.csr```
    1. Import this cert into the KeyChain (not sure that this is necessary)
    1. Make sure that Nginx (or whichever server you are using) references this certificate (see config below)
    1. To convert the cert to 'pfx' use ```openssl pkcs12 -inkey dev.knowledgespike.com.key -in dev.knowledgespike.com.pem -export -out dev.knowledgespike.com.pfx -certfile cacert.pem```
        1. Copy this file to location where pfx is read from by Kestral
        1. This is used by 'Kestral' when running the app locally (without Nginx)
    1. Add it to the keychain and make sure that its CA is trusted


## Release

### IDS

1. Notes [Here](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-2.1&tabs=aspnetcore2x)
1. Create a [Framework Dependent Deployment](https://docs.microsoft.com/en-us/dotnet/core/deploying/deploy-with-cli#framework-dependent-deployment)
    1. ```dotnet publish -c Release```
1. Choose location for the app
    1. Copy the app from ```Release\publish```  to ```/User/kevinjones/webapplications/ids.expenses``` for example
    1. Run ```dotnet IdentityServer.dll``` from ```/User/kevinjones/webapplication/ids.expenses```


1. Configuration
    1. How do I set the environment for the running app?

## Settting up Nginx

1. Update the conf file for each app (in /usr/local/etc/nginx/nginx.conf)

 ```json

#user  nobody;
worker_processes  1;

error_log /usr/local/var/log/nginx/error.log debug;
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /usr/local/var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;


    server {
        listen       80;
        listen       443 ssl;

        server_name  ids.knowledgespike.local;

        ssl_certificate      /etc/ssl/certs/dev.knowledgespike.com.pem;
        ssl_certificate_key  /etc/ssl/private/dev.knowledgespike.com.key;

        ssl_protocols TLSv1.2 TLSv1.1 TLSv1;

        rewrite_log on;
        #charset koi8-r;

        access_log  /usr/local/var/log/nginx/host.access.log  main;

        location / {
            proxy_pass         http://localhost:5000/;
            proxy_http_version 1.1;
            proxy_set_header   Upgrade $http_upgrade;
            proxy_set_header   Connection keep-alive;
            proxy_set_header   Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto $scheme;
        }

        error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }

    server {
        listen       80;
        listen       443 ssl;

        server_name  adminapi.knowledgespike.local;

        ssl_certificate      /etc/ssl/certs/dev.knowledgespike.com.pem;
        ssl_certificate_key  /etc/ssl/private/dev.knowledgespike.com.key;

        ssl_protocols TLSv1.2 TLSv1.1 TLSv1;

        rewrite_log on;
        #charset koi8-r;

        access_log  /usr/local/var/log/nginx/host.access.log  main;

        location / {
            proxy_pass         http://localhost:5001/;
            proxy_http_version 1.1;
            proxy_set_header   Upgrade $http_upgrade;
            proxy_set_header   Connection keep-alive;
            proxy_set_header   Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto $scheme;
        }

        error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }
    server {
        listen       80;
        listen       443 ssl;

        server_name  adminui.knowledgespike.local;

        ssl_certificate      /etc/ssl/certs/dev.knowledgespike.com.pem;
        ssl_certificate_key  /etc/ssl/private/dev.knowledgespike.com.key;

        ssl_protocols TLSv1.2 TLSv1.1 TLSv1;

        rewrite_log on;
        #charset koi8-r;

        access_log  /usr/local/var/log/nginx/host.access.log  main;

        location / {
            proxy_pass         http://localhost:5002/;
            proxy_http_version 1.1;
            proxy_set_header   Upgrade $http_upgrade;
            proxy_set_header   Connection keep-alive;
            proxy_set_header   Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto $scheme;
        }

        error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }
    server {
        listen       80;
        listen       443 ssl;

        server_name  expenses.knowledgespike.local;

        ssl_certificate      /etc/ssl/certs/dev.knowledgespike.com.pem;
        ssl_certificate_key  /etc/ssl/private/dev.knowledgespike.com.key;

        ssl_protocols TLSv1.2 TLSv1.1 TLSv1;

        rewrite_log on;
        #charset koi8-r;

        access_log  /usr/local/var/log/nginx/host.access.log  main;

        location / {
            proxy_pass         http://localhost:5003/;
            proxy_http_version 1.1;
            proxy_set_header   Upgrade $http_upgrade;
            proxy_set_header   Connection keep-alive;
            proxy_set_header   Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto $scheme;
        }

        error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }

    server {
        listen       80;
        listen       443 ssl;

        server_name  expensesapi.knowledgespike.local;

        ssl_certificate      /etc/ssl/certs/dev.knowledgespike.com.pem;
        ssl_certificate_key  /etc/ssl/private/dev.knowledgespike.com.key;

        ssl_protocols TLSv1.2 TLSv1.1 TLSv1;

        rewrite_log on;
        #charset koi8-r;

        access_log  /usr/local/var/log/nginx/host.access.log  main;

        location / {
            proxy_pass         http://localhost:5003/;
            proxy_http_version 1.1;
            proxy_set_header   Upgrade $http_upgrade;
            proxy_set_header   Connection keep-alive;
            proxy_set_header   Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto $scheme;
        }

        error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }
    server {
        listen       80;
        server_name  localhost knowledgespike.local www.knowledgespike.local;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }
    }

    server {
        listen   80 default_server;
        # listen [::]:80 default_server deferred;
        return   444;
    }
    include servers/*;
}
 ```

1. Start nginx with `sudo brew services start nginx`
    * test nginx with `sudo /usr/local/bin/nginx -t` (or `/usr/local/bin/nginx -t`)
    * Logs are at `/usr/local/var/log/nginx`

Need to do this for each app you are running

## Building the Applications

1. For each app need to publish and copy to appropriate directory
    1. ```dotnet publish -f netcoreapp2.1 -c Release```
1. Choose location for the app
    1. Copy the app from ```Release\publish```  to ```/User/kevinjones/webapplications/[app name]``` for example
    1. Run ```dotnet [app name].dll``` from ```/User/kevinjones/webapplication/[app name]```
        1. ```dotnet IdentityExpress.Manager.Api.dll```
        1. ```dotnet IdentityExpressUI.dll```

1. Identity Server
    * `cd ~/projects/expenses/application/IdentityServer/IdentityServer`
    * `dotnet publish -c Release`
    * `cd bin/Release/netcoreapp2.1/publish`
    * `cp -r * ~/webapplications/ids.expenses/`
    * `cd ~/webapplications/ids.expenses`
    * `dotnet IdentityServer.dll`

1. Admin UI API
    * `cd ~/projects/expenses/identity.express/identity-express-manager-api/`
    * `dotnet publish -c Release`
    * `cd src/IdentityExpress.Manager.Api/bin/Release/netcoreapp2.1/publish/`
    * `cp -r . ~/webapplications/adminui.api/`
    * `cd ~/webapplications/adminui.api`
    * `dotnet IdentityExpress.Manager.Api.dll`

1. Admin UI UI
    * `cd ~/projects/expenses/identity.express/identity-express-manager-ui/`
    * `dotnet publish -c Release`
    * `cd src/IdentityExpressUI/bin/Release/netcoreapp2.1/publish`
    * `cp -r * ~/webapplications/adminui.ui/`
    * `cd ~/webapplications/adminui.ui`
    * `dotnet IdentityExpressUI.dll`

1. Expenses API
    * `cd ~/projects/expenses/application/`
    * `dotnet publish -c Release`
    * `cd Expenses.API/bin/Release/netcoreapp2.1/publish`
    * `cp -r * ~/webapplications/expenses.api/`
    * `cd ~/webapplications/expenses.api`
    * `dotnet Expenses.API.dll`

1. Expenses UI
    * `cd ~/projects/expenses/application/`
    * `dotnet publish -c Release`
    * `cd Expenses.UI/bin/Release/netcoreapp2.1/publish/`
    * `cp -r * ~/webapplications/expenses.ui/`
    * `cd ~/webapplications/expenses.ui`
    * `dotnet Expenses.UI.dll`

1. My Sql

The MySql error file is here `/usr/local/var/mysql/Kevins-MacBook-Pro.local.err`

If MySql crashes you can edit the `my.cnf` file in /usr/local/etc and add the `innodb_force_recovery = 2` option. See the [page here](https://dev.mysql.com/doc/refman/8.0/en/forcing-innodb-recovery.html) for more information. 

    * set the force_recovery value to 1,2 or 3 (2 worked for me)
    * restart the server `brew services restart mysql`
    * Export the database
    * Drop the schema
    * Set the recover mode to 0
    * Restart mysql (check the log, hopefully it works)
    * Create the schema ('expenses')
    * Import the data