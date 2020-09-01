---
title: GoalZero
description: Instructions on how to integrate Goal Zero Yeti with Home Assistant
ha_category:
  - Energy
ha_release: 0.115
ha_config_flow: true
ha_domain: goalzero
ha_codeowners:
  - '@tkdrob'
---

This `goalzero` integration pulls data from a Wifi enabled Goal Zero Yeti.

The switch platform creates a switch for the 12V, 5V, and AC outputs.

## Configuration

To use your Goal Zero sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
goalzero:
  host: 192.168.0.10
  name: "Yeti"
```

{% configuration %}
host:
  required: true
  type: string
  description: The IP address of the Goal Zero Yeti.
name:
  required: false
  type: string
  description: Give a name for your Goal Zero Yeti.

{% endconfiguration %}

## Integration Entities

Each added configuration entry for this integration will create the following sensors:

`v12PortStatus`, `usbPortStatus`, `acPortStatus`, `backlight`, `app_online`, `isCharging`
