---
title: Mythic Beasts DNS
description: Keep your mythic beasts DNS updated
ha_category:
  - Network
ha_release: 0.85
ha_iot_class: Cloud Push
ha_domain: mythicbeastsdns
ha_integration_type: integration
---

With the `mythicbeastsdns` integration you can automatically update your dynamic DNS entry at [Mythic Beasts](https://www.mythic-beasts.com/).

## Configuration

To use the integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mythicbeastsdns:
  host: YOUR_HOST
  domain: YOUR_DOMAIN
  password: YOUR_API_KEY
```

{% configuration %}
  host:
    description: The first part, or subdomain that you want to be dynamic.
    required: true
    type: string
  domain:
    description: Your domain, e.g., `example.com`.
    required: true
    type: string
  password:
    description: The password for your domain. You can set this by clicking "DNS API" on the domain page.
    required: true
    type: string
{% endconfiguration %}
