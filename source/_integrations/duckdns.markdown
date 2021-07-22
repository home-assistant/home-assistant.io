---
title: Duck DNS
description: Keep your computer registered with the DuckDNS dynamic DNS.
ha_category:
  - Network
ha_iot_class: Cloud Polling
ha_release: 0.55
ha_domain: duckdns
---

With the DuckDNS integration you can keep your DuckDNS record up to date. DuckDNS is a free dynamic DNS service that allows you to point a subdomain under `duckdns.org` at your computer.

<div class='note'>

If you are running the Home Assistant DuckDNS add-on this integration is not required. The add-on will keep your IP updated with DuckDNS.

</div>

## Configuration

To use the integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
duckdns:
  domain: YOUR_SUBDOMAIN
  access_token: YOUR_ACCESS_TOKEN
```

{% configuration duckdns %}
  domain:
    description: Your duckdns subdomain (without the `.duckdns.org` suffix).
    required: true
    type: string
  access_token:
    description: Your DuckDNS access token. Log in to the site to get one.
    required: true
    type: string
{% endconfiguration %}

## Service `set_txt`

Set the TXT record of your DuckDNS subdomain.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `txt` | no | Payload for the TXT record. |
