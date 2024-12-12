---
title: BT Home Hub 5
description: Instructions on how to integrate BT Home Hub 5 router into Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.22
ha_domain: bt_home_hub_5
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This platform offers presence detection by looking at connected devices to a [BT Home Hub 5](https://en.wikipedia.org/wiki/BT_Home_Hub) based router.

To use a BT Home Hub 5 router in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: bt_home_hub_5
    host: 192.168.1.254
```

{% configuration %}
host:
  description: The IP address of your router.
  required: false
  default: 192.168.1.254
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
