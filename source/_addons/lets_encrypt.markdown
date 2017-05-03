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

Setup and manage a [let's encrypt](https://letsencrypt.org/) certificate. The first run will create the certificate and every other run will renew it if they will expire in 30 days. All other run make nothing.

```json
{
  "email": "example@example.com",
  "domains": ["example.com", "mqtt.example.com", "hass.example.com"],
}
```

Option variables:

- **email** (*Required*): default empty. Your email for register on let's encrypt with your domains.
- **domains** (*Required*): default empty list. A list of domains for create/renew the certificate.
