---
title: "Rehau Nea Smart Manager"
description: "Integrates Rehau Nea Smart Manager thermostat controller into Home Assistant"
ha_release: "0.111.1"
ha_category: Climate
ha_iot_class: "Local Polling"
ha_quality_scale: silver
ha_config_flow: true
ha_codeowners:
  - '@Jeoffreybauvin'
ha_domain: rehau
---

Integrates [Rehau Nea Smart Manager](https://www.rehau.com/en-en/nea-smart/francais) Thermostat controller into Home Assistant.

This integration generates a climate entity for each heating area in your Nea Smart Manager.

To enable this platform, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
rehau:
  host: IP_ADDRESS
```

<div class='note warning'>
For security reasons, this integration is not compatible with the cloud version of Rehau Nea Smart Manager. Please use the local IP of your Nea Smart Manager.
</div>

{% configuration %}
host:
  description: Your Nea Smart Manager local IP (or DNS name).
  required: true
  type: string
{% endconfiguration %}

## Preset modes

| Preset mode | Description |
| ---------------------- | -------- |
| `auto` | Auto mode : use Nea Smart Manager scheduling
| `eco` | Eco mode
| `comfort` | Comfort mode
