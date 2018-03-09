---
layout: page
title: "Let's Encrypt"
description: "Automatically manage your SSL certificate using Let's Encrypt."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
featured: false
---

<p class='note'>
You should not use this if you are also using the [DuckDNS add-on]. The DuckDNS add-on has integrated Let's Encrypt support.
</p>

Setup and manage a [Let's Encrypt](https://letsencrypt.org/) certificate. This addon will create a certificate on the first run and will auto-renew if the certificate is within 30 days of expiration. This add-on uses port 80 to verify the certificate request. You will need to stop all other add-ons that also use this port.

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
  base_url: https://my-domain.tld:8123
  ssl_certificate: /ssl/fullchain.pem
  ssl_key: /ssl/privkey.pem
```

If you use another port such as `8123` or an SSL proxy, change the port number.

[DuckDNS add-on]: /addons/duckdns/
