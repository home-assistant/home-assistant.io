---
layout: page
title: "Self-signed certificate for SSL/TLS"
description: "Configure a self-signed certificate to use with Home Assistant"
date: 2016-10-06 08:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /cookbook/tls_self_signed_certificate/
---

If your Home Assistant instance is only accessible from your local network you can still protect the communication between your browsers and the frontend with SSL/TLS. [Let's encrypt]({{site_root}}/blog/2015/12/13/setup-encryption-using-lets-encrypt/) will only work if you have a DNS entry and remote access is allowed. The solution is to use a self-signed certificate. As you most likely don't have a certification authority (CA) your browser will conplain about the security. If you have a CA then this will not be an issue.

To create locally a certificate you need the [OpenSSL](https://www.openssl.org/) command-line tool.

Change to your Home Assistant [configuration directory](/getting-started/configuration/) like `~/.homeassistant`. This will make it easier to backup your certificate and the key. Run the command shown below. 

**Notes:** 

The certificate **must** be `.pem` extension for HASS to like it.

If you are going to use this certificate with the ios app, you need to ensure you complete **all** fields during the cetificate creation process, then 
* Send **only** `certificate.pem` file to the ios device using airdrop or other transfer method.
* Open the `.pem` file on the ios device, follow the prompts to trust and install it.
* If iOS 10.3 or newer you need addital steps
  * Goto `Settings > General > About > Certificate Trust Settings` and enable the cert for your domain using the toggle switch
  * https://support.apple.com/en-us/HT204477

```bash
openssl req -sha256 -newkey rsa:4096 -nodes -keyout key.pem -x509 -days 730 -out certificate.pem
```

For details about the parameters, please check the OpenSSL documentation. Provide the requested information during the generation process. At the end you will have two files called `privkey.pem` and `fullchain.pem`. The key and the certificate.

Update the `http:` entry in your `configuration.yaml` file and let it point to your created files. 

```yaml
http:
  api_password: YOUR_SECRET_PASSWORD
  ssl_certificate: /home/fab/.homeassistant/fullchain.pem
  ssl_key: /home/fab/.homeassistant/privkey.pem
```

A tutorial "[Working with SSL Certificates, Private Keys and CSRs](https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs)" could give you some insight about special cases.
