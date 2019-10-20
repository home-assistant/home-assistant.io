---
title: "Self-signed certificate for SSL/TLS"
description: "Configure a self-signed certificate to use with Home Assistant"
redirect_from: /cookbook/tls_self_signed_certificate/
---

If your Home Assistant instance is only accessible from your local network you can still protect the communication between your browsers and the frontend with SSL/TLS. 
[Let's encrypt]({{site_root}}/blog/2017/09/27/effortless-encryption-with-lets-encrypt-and-duckdns/) will only work if you have a DNS entry and remote access is allowed. 
The solution is to use a self-signed certificate. As you most likely don't have a certification authority (CA) your browser will complain about the security. If you have a CA then this will not be an issue.

To create a certificate locally, you need the [OpenSSL](https://www.openssl.org/) command-line tool.

Change to your Home Assistant [configuration directory](/getting-started/configuration/) like `~/.homeassistant`. This will make it easier to backup your certificate and the key. Run the command shown below. 

The certificate **must** be `.pem` extension.

If you are going to use this certificate with the iOS app, you need to ensure you complete **all** fields during the certificate creation process, then:

* Send **only** the `certificate.pem` file to the iOS device, using airdrop or other transfer method.
* Open the `.pem` file on the iOS device, follow the prompts to trust and install it.
* If you are using iOS 10.3 or newer then [additional steps](https://support.apple.com/en-us/HT204477) are needed.

```bash
openssl req -sha256 -newkey rsa:4096 -nodes -keyout privkey.pem -x509 -days 730 -out certificate.pem
```

For details about the parameters, please check the OpenSSL documentation. Provide the requested information during the generation process. 

At the end you will have two files called `privkey.pem` and `certificate.pem`. The key and the certificate.

Update the `http:` entry in your `configuration.yaml` file and let it point to your created files. 

```yaml
http:
  ssl_certificate: /home/your_user/.homeassistant/certificate.pem
  ssl_key: /home/your_user/.homeassistant/privkey.pem
```

A restart of Home Assistant is required for the changes to take effect.

If you get any log error about *ssl_key* or *ssl_certificate* that is **not a file for dictionary value** when run Home Assistant, you need to change owner or access permission of the `.pem` files as following:
  
```bash
sudo chown homeassistant:homeassistant certificate.pem privkey.pem
sudo chmod 755 certificate.pem privkey.pem
```

A tutorial "[Working with SSL Certificates, Private Keys and CSRs](https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs)" could give you some insight about special cases.
