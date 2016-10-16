---
layout: page
title: "RFXtrx Binary Sensor"
description: "Instructions how to integrate RFXtrx binary sensors into Home Assistant."
date: 2016-10-16 23:33
sidebar: true
comments: false
sharing: true
footer: true
logo: rfxtrx.png
ha_category: Binary Sensor
---

The `rfxtrx` platform support binary sensors that communicate in the frequency range of 433.92 MHz.

First you have to set up your [rfxtrx hub](/components/rfxtrx/).
The easiest way to find your sensors is to add this to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: rfxtrx
  automatic_add: True
```

Then when the sensor emits a signal it will be automatically added:

<p class='img'>
<img src='/images/components/rfxtrx/sensor.png' />
</p>

Here the name is `0a52080000301004d240259` and you can verify that it works from the frontend.
Then you should update your configuration to:

```yaml
# Example configuration.yaml entry
sensor:
  platform: rfxtrx
  devices:
    0a52080000301004d240259:
      name: device_name
```

If you want to display several data types from one sensor:

```yaml
# Example configuration.yaml entry
sensor:
  platform: rfxtrx
  devices:
    0a520802060100ff0e0269:
      name: Bath
      data_type:
       - Humidity
       - Temperature
```

Example configuration:

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: rfxtrx
  automatic_add: True
  devices:
    0a52080705020095220269:
      name: Lving
      fire_event: True
    0a520802060100ff0e0269:
      name: Bath
      data_type:
       - Humidity
       - Temperature
```

Configuration variables:

- **devices**  (*Optional*): A list of devices with their name to use in the frontend.
- **automatic_add** (*Optional*): To enable the automatic addition of new binary sensors.
- **sensor_class**  (*Optional*): 
- **off_delay** (*Optional*):
- **cmd_on** (*Optional*): 
- **cmd_off** (*Optional*): 
- **data_bits** (*Optional*):
