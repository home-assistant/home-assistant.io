---
title: TEMPer
description: Instructions on how to integrate TEMPer sensors into Home Assistant.
ha_category:
  - DIY
ha_iot_class: Local Push
ha_release: pre 0.7
ha_domain: temper
ha_platforms:
  - sensor
---

This `temper` sensor platform allows you to get the current temperature from a TEMPer device.

## Configuration

To use your TEMPer sensor in your installation, add the following to your `configuration.yaml` file:

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
  description: The name to use when displaying this switch.
  required: false
  type: string
  default: myStrom Switch
{% endconfiguration %}

Since some of these sensors consistently show higher temperatures the scale and offset values can be used to fine-tune your sensor.
The calculation follows the formula `scale * sensor value + offset`.

The TEMPer sensors can only be accessed as root by default. To fix the USB permissions on your system create the file `/etc/udev/rules.d/99-tempsensor.rules` and add the following line to it:

```text
SUBSYSTEMS=="usb", ACTION=="add", ATTRS{idVendor}=="0c45", ATTRS{idProduct}=="7401", MODE="666"
```

After that re-plug the device and restart Home Assistant.
