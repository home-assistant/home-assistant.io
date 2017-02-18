---
layout: page
title: "Certificate for SSL/TLS via domain ownership"
description: "Configure a certificate to use with Home Assistant"
date: 2017-02-17 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Infrastructure
---

If your Home Assistant instance is only accessible from your local network you can still protect the communication between your browsers and the frontend with SSL/TLS. You can use [Self-sign certificate](/cookbook/tls_self_signed_certificate/) but your browser will present a warning and some https-only features might not work.

## Prerequirement for this guide:
* Your Homeassistant instance is not exposed to the intenet. If it is - use [this guide]({{site_root}}/blog/2015/12/13/setup-encryption-using-lets-encrypt/)
* You control a public domain name. The domain doesn't have to point to a site. A domain controlled by a *trusted* friend will do. (A friend you trust not to MItM you)
* Your home router supports custom DNS entries.

## Run certbot
```bash
$ mkdir certbot
$ cd certbot
$ wget https://dl.eff.org/certbot-auto
$ chmod a+x certbot-auto
$ sudo ./certbot-auto --manual certonly --preferred-challenges dns -d "mydomain.com" --email your@email.address
```

* Agree to Tos
* Choose whether to share your email with EFF
* Agree to your IP being logged

You will get the following text:

```
Please deploy a DNS TXT record under the name
_acme-challenge.mydomain.com with the following value:

deadbeefdeadbeefdeadbeefdeadbeefdeadbeef

Once this is deployed,
-------------------------------------------------------------------------------
Press Enter to Continue
```

* Deploy the value to TXT field using your domain registar.

* Go to a site that queries domain record. For example [this one](https://mxtoolbox.com/TXTLookup.aspx) and look if it sees your brand new TXT field (Don't forget to enter the full domain: `_acme-challenge.mydomain.com`)
* Press Enter at certbot prompt.

## Make mydomain.com point to your Homeassistant instance
If your router uses DNSMasq (for example DDWRT) add the following line to DNSMasq options:
```
address=/mydomain.com/<hass ip>
```

## Edit your Homeassistant configuration to use your certificates
```yaml
http:
  api_password: YOUR_SECRET_PASSWORD
  base_url: https://mydomain.com:8123
  ssl_certificate: /etc/letsencrypt/live/mydomain.com/fullchain.pem
  ssl_key: /etc/letsencrypt/live/mydomain.com/privkey.pem
```
Make sure the files are accessible by your homeassisatnt user.
