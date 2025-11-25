---
title: Mythic Beasts DNS
description: Keep your mythic beasts DNS updated
ha_category:
  - Network
ha_release: 0.85
ha_iot_class: Cloud Push
ha_domain: mythicbeastsdns
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

With the `mythicbeastsdns` {% term integration %} you can automatically update your dynamic DNS entry at [Mythic Beasts](https://www.mythic-beasts.com/).

## Configuration

To use the {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
