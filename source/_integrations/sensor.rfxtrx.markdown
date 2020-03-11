---
title: "RFXtrx Sensor"
description: "Instructions on how to integrate RFXtrx sensors into Home Assistant."
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_release: 0.7
ha_domain: rfxtrx
---

The `rfxtrx` platform support sensors that communicate in the frequency range of 433.92 MHz.

First you have to set up your [RFXtrx hub](/integrations/rfxtrx/).
The easiest way to find your sensors is to add this to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  platform: rfxtrx
  automatic_add: true
```

Then when the sensor emits a signal it will be automatically added:

<p class='img'>
<img src='/images/integrations/rfxtrx/sensor.png' />
</p>

Here the name is `0a52080000301004d240259` or `0a52080000301004d240259_temperature` and you can verify that it works from the frontend.
Then you should update your configuration to (_temperature is not needed):

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

Only these data_type are valid:

- *Temperature*, *Temperature2*
- *Humidity*
- *Humidity status*
- *Barometer*
- *Wind direction*
- *Wind average speed*
- *Wind gust*
- *Rain rate*
- *Rain total*
- *Sound*
- *Sensor Status*
- *Counter value*
- *UV*
- *Forecast*
- *Forecast numeric*
- *Chill*
- *Energy usage*
- *Total usage*
- *Voltage*
- *Current*
- *Battery numeric*
- *Rssi numeric*

Example configuration:

```yaml
# Example configuration.yaml entry
sensor:
  platform: rfxtrx
  automatic_add: true
  devices:
    0a52080705020095220269:
      name: Lving
      fire_event: true
    0a520802060100ff0e0269:
      name: Bath
      data_type:
       - Humidity
       - Temperature
```

{% configuration %}
devices:
  description: A list of devices.
  required: false
  type: list
  keys:
    name:
      description: Override the name to use in the frontend.
      required: false
      type: string
    fire_event:
      description: Fires an event even if the state is the same as before. Can be used for automations.
      required: false
      default: false
      type: boolean
    data_type:
      description: Which data type the sensor should show.
      required: false
      type: list
automatic_add:
  description: To enable the automatic addition of new lights.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

<div class='note warning'>
If a device ID consists of only numbers, please make sure to surround it with quotes.
This is a known limitation in YAML, because the device ID will be interpreted as a number otherwise.
</div>
