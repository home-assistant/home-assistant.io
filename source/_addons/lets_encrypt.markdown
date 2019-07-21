---
title: "Let's Encrypt"
description: "Automatically manage your SSL certificate using Let's Encrypt."
---

<div class='note'>

You should not use this if you are also using the [DuckDNS add-on]. The DuckDNS add-on has integrated Let's Encrypt support.

</div>

Setup and manage a [Let's Encrypt](https://letsencrypt.org/) certificate. This add-on will create a certificate on the first run and will auto-renew if the certificate is within 30 days of expiration. This add-on uses port 80 to verify the certificate request. You will need to stop all other add-ons that also use this port.

```json
{
  "email": "example@example.com",
  "domains": ["example.com", "mqtt.example.com", "hass.example.com"],
  "certfile": "fullchain.pem",
  "keyfile": "privkey.pem"
}
```

{% configuration %}
email:
  description: Your email address for registration on Let's Encrypt.
  required: true
  type: string
domains:
  description: A list of domains to create/renew the certificate.
  required: true
  type: list
certfile:
  description: Name of the certfile that is created.  Leave as default value.
  required: true
  type: string
  default: fullchain.pem
keyfile:
  description: Name of the keyfile that is created.  Leave as default value.
  required: true
  type: string
  default: privkey.pem
{% endconfiguration %}

## Home Assistant configuration

Use the following configuration in Home Assistant to use the generated certificate:

```yaml
http:
  base_url: https://my-domain.tld:8123
  ssl_certificate: /ssl/fullchain.pem
  ssl_key: /ssl/privkey.pem
```

If you use another port such as `8123` or an SSL proxy, change the port number.

## Enabling auto-renewals

Out of the box, the add-on will not automatically renew your certificate. In fact, it only starts, tries to get/renew your certificate, and then stops. It's up to you to manually start it again whenever your certificate comes close to expiry.

However, you can automate this process using Home Assistant.

Use this in your `automations.yaml` to attempt certificate renewal each day at midnight:

```yaml
- id: letsencrypt-renewal
  alias: "Let's Encrypt Renewal"
  trigger:
  - platform: time
    at: '00:00:00'
  action:
  - service: hassio.addon_restart
    data:
      addon: core_letsencrypt
```

If you are using the [Nginx Proxy add-on] you will need need to stop this during the renewal process. This can be achieved by stopping the add-on whilst restarting the Let's Encrypt add-on. This can be achieved the following configuration:

```yaml
- id: letsencrypt-renewal
  alias: 'LetsEncrypt renewal'
  trigger:
  - platform: time
    at: '00:00:00'
  action:
  - service: hassio.addon_stop
    data:
      addon: core_nginx_proxy
  - service: hassio.addon_restart
    data:
      addon: core_letsencrypt
  - delay: '00:01:30'
  - service: hassio.addon_start
    data:
      addon: core_nginx_proxy
```

[DuckDNS add-on]: /addons/duckdns/
[Nginx Proxy add-on]: /addons/nginx_proxy/
