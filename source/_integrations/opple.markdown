---
title: Opple
description: Instructions on how to integrate Opple lights into Home Assistant.
ha_category:
  - Light
ha_release: '0.80'
ha_iot_class: Local Polling
ha_domain: opple
ha_platforms:
  - light
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `opple` light {% term integration %} allows you to control the state of your Opple smart light.

The platform supports all Opple lights with Wi-Fi support or lights that can be controlled by the App.

To use your Opple light in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
light:
  - platform: opple
    name: LIGHT_NAME
    host: IP_ADDRESS
```

{% configuration %}
name:
  description: The name to use when displaying this light.
  required: false
  type: string
  default: opple light
host:
  description: "The IP address of your Opple light, e.g., `192.168.0.21`."
  required: true
  type: string
{% endconfiguration %}
