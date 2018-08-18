---
layout: page
title: "RFXtrx Sensor"
description: "Instructions on how to integrate RFXtrx sensors into Home Assistant."
date: 2015-08-06 17:15
sidebar: true
comments: false
sharing: true
footer: true
logo: rfxtrx.png
ha_category: Sensor
ha_iot_class: "Local Polling"
---

The `rfxtrx` platform supports sensors that communicate in the frequency range of 433.92 MHz. The rfxtrx sensor component provides support for them.

## {% linkable_title Configuration %}

Once you have set up your [rfxtrx hub](/components/rfxtrx/), the easiest way to find your sensors is to add this to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rfxtrx
    automatic_add: true
```

Then when the sensor emits a signal it will be automatically added:

<p class='img'>
<img src='/images/components/rfxtrx/sensor.png' />
</p>

Here the name is `0a52080000301004d240259` or `0a52080000301004d240259_temperature` and you can verify that it works from the frontend.
Then you should update your configuration to (`_temperature` is not needed):

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rfxtrx
    devices:
      0a52080000301004d240259:
        name: device_name
```

{% configuration %}
devices:
  description: A list of devices to use.
  required: false
  type: list
  keys:
    name:
      description: The name of the device to use in the frontend.
      required: false
      type: string
    fire_event:
      description: Fires an event even if the state is the same as before. Can be used for automations.
      required: false
      type: boolean
      default: false
    data_type:
      description: Which data type the sensor should show. See below for a list of supported values.
      required: false
      type: list
      default: None
automatic_add:
  description: To enable the automatic addition of new lights.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

Only these `data_type`s are valid:

- *Temperature*
- *Humidity*
- *Barometer*
- *Wind direction*
- *Rain rate*
- *Energy usage*
- *Total usage*
- *Sound*
- *Sensor Status*
- *Counter value*
- *UV*

<p class='note warning'>
If a device ID consists of only numbers, please make sure to surround it with quotes.
This is a known limitation in YAML, because the device ID will be interpreted as a number otherwise.
</p>

## {% linkable_title Examples %}

If you want to display several data types from one sensor:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rfxtrx
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
sensor:
  - platform: rfxtrx
    automatic_add: true
    devices:
      0a52080705020095220269:
        name: Living
        fire_event: true
      0a520802060100ff0e0269:
        name: Bath
        data_type:
          - Humidity
          - Temperature
```
