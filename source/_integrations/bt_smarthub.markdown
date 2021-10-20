---
title: BT Smart Hub
description: Instructions on how to integrate BT Smart Hub router into Home Assistant.
ha_category:
  - Presence Detection
ha_release: 0.82
ha_iot_class: Local Polling
ha_codeowners:
  - '@jxwolstenholme'
ha_domain: bt_smarthub
ha_platforms:
  - device_tracker
---

This platform offers presence detection by looking at connected devices to a [BT Smart Hub](https://en.wikipedia.org/wiki/BT_Smart_Hub) based router.
This router is sometimes referred to as the BT Home Hub 6.

## Configuration

To use a BT Smart Hub router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: bt_smarthub
```

{% configuration %}
host:
  description: The IP address of your router
  default: 192.168.1.254
  required: false
  type: string
smarthub_model:
  description: The model of your BT Smarthub 1 or 2. If this option is omitted, it will attempt to detect the hub model.
  required: false
  type: integer
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions on how to configure the people to be tracked.
