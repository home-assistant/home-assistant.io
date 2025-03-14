---
title: TEMPer
description: Instructions on how to integrate TEMPer sensors into Home Assistant.
ha_category:
  - DIY
ha_iot_class: Local Polling
ha_release: pre 0.7
ha_domain: temper
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This `temper` sensor {% term integration %} allows you to get the current temperature from a TEMPer device.

## Configuration

To use your TEMPer {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: temper
```

{% configuration %}
offset:
  description: The offset to fix reported vales.
  required: false
  type: integer
  default: o
scale:
  description: The scale for the sensor.
  required: false
  type: integer
  default: 1
name:
  description: The name to use when displaying this sensor.
  required: false
  type: string
  default: Unnamed Device
{% endconfiguration %}

Since some of these sensors consistently show higher temperatures the scale and offset values can be used to fine-tune your sensor.
The calculation follows the formula `scale * sensor value + offset`.

The TEMPer sensors can only be accessed as root by default. To fix the USB permissions on your system create the file `/etc/udev/rules.d/99-tempsensor.rules` and add the following line to it:

```text
SUBSYSTEMS=="usb", ACTION=="add", ATTRS{idVendor}=="0c45", ATTRS{idProduct}=="7401", MODE="666"
```

After that re-plug the device and restart Home Assistant.
