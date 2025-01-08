---
title: Sky Hub
description: Instructions on how to integrate Sky Hub routers into Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.37
ha_domain: sky_hub
ha_codeowners:
  - '@rogerselwyn'
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `sky_hub` {% term integration %} offers presence detection by looking at connected devices to a [Sky Hub router](https://www.sky.com/shop/broadband-talk/sky-hub/) based router.

To use your Sky Hub device in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: sky_hub
```

{% configuration %}
host:
  description: The IP address of your router.
  required: false
  default: 192.168.1.254
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
