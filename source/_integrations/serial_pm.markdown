---
title: Serial Particulate Matter
description: Instructions on how to integrate particulate matter (dust) sensors with Home Assistant.
ha_category:
  - DIY
ha_release: 0.26
ha_iot_class: Local Polling
ha_domain: serial_pm
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

Particulate matter sensors measure the amount of very small particles in the air.

Cheap LED based sensors usually use a GPIO interface that is hard to attach to computers. However, there are a lot of laser LED based sensors on the market that use a serial interface and can be connected to your Home Assistant system easily with a USB to serial converter.

## Supported Sensors

At this time, the following sensors are supported:

- oneair,s3
- novafitness,sds021
- novafitness,sds011
- plantower,pms1003
- plantower,pms5003
- plantower,pms7003
- plantower,pms2003
- plantower,pms3003

## Configuration

To use your PM sensor in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
sensor:
  - platform: serial_pm
    serial_device: /dev/tty.SLAB_USBtoUART
    brand: oneair,s3
```

{% configuration %}
serial_device:
  description: The serial port to use. On *nix systems, it can often be identified by `$ ls /dev/tty*`
  required: true
  type: string
name:
  description: The name displayed in the frontend.
  required: false
  type: string
brand:
  description: Manufacturer and type of the sensor. (Use a value from the supported sensors list.).
  required: true
  type: string
{% endconfiguration %}

### Named Sensor Configuration Example

```yaml
sensor:
  - platform: serial_pm
    serial_device: /dev/tty.SLAB_USBtoUART
    name: Nova
    brand: novafitness,sds011
```
