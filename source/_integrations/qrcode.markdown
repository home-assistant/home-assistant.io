---
title: QR Code
description: Instructions on how to integrate QR Code Recognition into Home Assistant.
ha_category:
  - Image processing
ha_iot_class: Calculated
ha_release: 0.87
ha_domain: qrcode
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `qrcode` image processing {% term integration %} enables QR code recognition from cameras.

To get this running, please install `zbar-tools` (Ubuntu 18.04)

## Configuration

To enable this, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: qrcode
    source:
      - entity_id: camera.door
```

{% configuration %}
source:
  description: List of image sources.
  required: true
  type: list
  keys:
    entity_id:
      description: A camera entity id to get picture from.
      required: true
      type: string
    name:
      description: This parameter allows you to override the name of your `image_processing` entity.
      required: false
      type: string
{% endconfiguration %}

## Basic example

An automation using this integration could look like this:

```yaml
automation:
  - alias: "Catch QR code and arm the alarm system"
    triggers:
      - trigger: state
        entity_id: image_processing.qr_front_door
        to: ARM_QR_CODE_VALUE
    actions:
      - action: alarm_control_panel.alarm_arm_away
        target:
          entity_id: alarm_control_panel.home_alarm
        data:
          code: MY_ALARM_CODE
```
