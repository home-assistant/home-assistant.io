---
title: "Certificate Authority and self-signed certificate for SSL/TLS"
description: "Configure a Certificate Authority and self-signed certificate to use with Home Assistant"
redirect_from: /cookbook/tls_self_signed_certificate/
---

If your Home Assistant instance is only accessible from your local network, you can still protect the communication between your browsers and the frontend with SSL/TLS.
[Let's Encrypt](/blog/2017/09/27/effortless-encryption-with-lets-encrypt-and-duckdns/) will only work if you have a DNS entry and remote access is allowed.

The solution is to use a self-signed certificate. Please note, however, that after you have completed these steps, your browser will complain about the security of the certificate as it was not issued by a trusted authority.

* This is due to self-signed certificates having not been issued by a certification authority ([`CA`](https://cheapsslsecurity.com/blog/what-is-a-certificate-authority-ca/)). If you have your own CA, then this will not be an issue.
* A fantastic workaround for this, while keeping your instance isolated securely off the Internet, is to use a [`Certificate for SSL/TLS via domain ownership`](/docs/ecosystem/certificates/tls_domain_certificate/).

If you don't mind the browser warnings and simply want SSL/TLS encryption and therefore have decided to use a self-signed certificate permanently or temporarily, read on!

If you use Chrome browser version 58 or above and/or **don't want to have issues regarding a non-trusted CA or CN (Common Name)**, follow this full tutorial: [Create Root Certificate Authority and self-signed certificate for your Home Assistant. Compatible with Chrome browser > version 58](https://gist.github.com/tiagofreire-pt/4920be8d03a3dfa8201c6afedd00305e). Otherwise, follow this:

To create a certificate locally, you need the [OpenSSL](https://www.openssl.org/) command-line tool.

Change to your Home Assistant [configuration directory](/getting-started/configuration/) like `~/.homeassistant`. This will make it easier to backup your certificate and the key. Run the command shown below.

The certificate **must** be `.pem` extension.

```bash
openssl req -sha256 -addext "subjectAltName = IP:X.X.X.X" -newkey rsa:4096 -nodes -keyout privkey.pem -x509 -days 730 -out fullchain.pem
```

Where the `X.X.X.X` must be replaced with the IP address of your local machine running Home Assistant (e.g., `192.168.1.20`).

For details about the parameters, please check the OpenSSL documentation. Provide the requested information during the generation process.

At the end you will have two files called `privkey.pem` and `fullchain.pem`. The key and the certificate.

Update the `http:` entry in your `configuration.yaml` file and let it point to your created files.

Hass.io:

```yaml
http:
  ssl_certificate: /ssl/fullchain.pem
  ssl_key: /ssl/privkey.pem
```

Non-Hass.io:

```yaml
http:
  ssl_certificate: /home/your_user/.homeassistant/fullchain.pem
  ssl_key: /home/your_user/.homeassistant/privkey.pem
```

Docker:

```yaml
http:
  ssl_certificate: /config/fullchain.pem
  ssl_key: /config/privkey.pem
```

A restart of Home Assistant is required for the new certificate to take effect.

If you get any log error about *ssl_key* or *ssl_certificate* that is **not a file for dictionary value** when run Home Assistant, you need to change owner or access permission of the `.pem` files as following:

Home Assistant (through console or SSH add-on):

```bash
chown root:root fullchain.pem privkey.pem
chmod 600 fullchain.pem privkey.pem
```
  
Non-hass-io:

```bash
sudo chown homeassistant:homeassistant fullchain.pem privkey.pem
sudo chmod 600 fullchain.pem privkey.pem
```

A tutorial "[Working with SSL Certificates, Private Keys and CSRs](https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs)" could give you some insight about special cases.

## iOS and macOS Specific Requirements

### iOS

If you are going to use this certificate with the iOS app, you need to ensure you complete **all** fields during the certificate creation process, then:

* Send **only** the `fullchain.pem` file to the iOS device, using airdrop or other transfer method.
* Open the `.pem` file on the iOS device, follow the prompts to trust and install it.
* If you are using iOS 10.3 or newer then [additional steps](https://support.apple.com/en-us/HT204477) are needed.

### iOS 13 and macOS 10.15

There are [new security requirements](https://support.apple.com/en-us/HT210176) for TLS server certificates in iOS 13 and macOS 10.15. To summarize:

* The key size must be greater than or equal to 2048 bits.
* A hash algorithm from the SHA-2 family is required. SHA-1 signed certificates are no longer trusted for TLS.
* The DNS name of the server must be included in the Subject Alternative Name extension of the certificate.
* For certificates issued after July 1, 2019:
  * Certificates must contain an ExtendedKeyUsage (EKU) extension containing the id-kp-serverAuth OID.
  * Certificates must have a validity period of 825 days or fewer.
