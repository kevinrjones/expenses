# Generate CA and Cert for Mac

1. For some help 

    See [this](https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/) and [this](https://deliciousbrains.com/https-locally-without-browser-privacy-errors/#creating-self-signed-certificate)

1. generate key

    ```openssl genrsa -des3 -out myCA.key 2048```
    - use 'password' as the password

1. generate CA Cert

    ```openssl req -x509 -new -nodes -key myCA.key -sha256 -days 1825 -out myCA.pem```

1. import the pem into the keychain and search for it by the distinguished name you gave it

1. create the CA signed cert

    ```openssl genrsa -out localhost.key 2048```

1. generate the CSR

    ```openssl req -new -key localhost.key -out localhost.csr```

    - use 'password' as the password

1. create the cert

    ```openssl x509 -req -in localhost.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial -out localhost.crt -days 1825 -sha256 -extfile ca.localhost.ext```

1. create the pfx

    ```openssl pkcs12 -export -out localhost.pfx -inkey localhost.key -in localhost.crt```

1. import the localhost.pfx into the keychain - no need to change the trust, it should be OK as it's signed by the CA

    ```csharp
    WebHost.CreateDefaultBuilder(args)
        .UseKestrel(options =>
        {
            options.Listen(IPAddress.Loopback, 5000,
                listenOptions => { listenOptions.UseHttps("../localhost.pfx", "password"); });
        })
        .UseStartup<Startup>()
        .Build();
    ```
