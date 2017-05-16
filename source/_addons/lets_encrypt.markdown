---
layout: page
title: "Let's Encrypt"
description: "Automatically manage your SSL certificate using Let's Encrypt."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Setup and manage a [Let's Encrypt](https://letsencrypt.org/) certificate. This will create a certificate on the first run and renew it if the certificate is expiring in the next 30 days.

```json
{
  "email": "example@example.com",
  "domains": ["example.com", "mqtt.example.com", "hass.example.com"]
}
```

Configuration variables:

- **email** (*Required*): Your email address for registration on Let's Encrypt.
- **domains** (*Required*): A list of domains to create/renew the certificate.

## {% linkable_title Home Assistant configuration %}

Use the following configuration in Home Assistant to use the generated certificate:

```yaml
http:
  ssl_certificate: /ssl/fullchain.pem
  ssl_key: /ssl/privkey.pem
```
