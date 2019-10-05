---
title: "Luxtronik Sensor"
description: "Instructions on how to use a Luxtronik Sensor with Home Assistant."
logo: luxtronik.png
ha_category:
  - Sensor
ha_release: "0.100"
ha_iot_class: Local Polling
---

<div class='note'>
  
The `Luxtronik` integration must be configured correctly to use this integration, see [Luxtronik Integration](/integrations/luxtronik).

</div>

The `Luxtronik` sensor platform allows you to monitor the status values of a heat pump unit controlled by a Luxtronik controller.

Sensors are read-only. To write to the heatpump, use the provided service [Luxtronik Integration - Service](/integrations/luxtronik/#service).

## Configuration

To use a Luxtronik sensor in your installation, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: luxtronik
    sensors:
      - group: calculations
        id: ID_WEB_Temperatur_TVL
```

{% configuration %}
group:
  description: Value group where the ID is located, possible values are `calculations`, `parameters`, `visibilities`.
  required: true
  type: string
id:
  description: The id of the value.
  required: true
  type: string
friendly_name:
  description: Sets a meaningful name for the sensor, if not provided the sensor will be named after the id, `luxtronik.id_webemperatur_tvl` for example, otherwise `luxtronik.temperature_forerun`.
  required: false
  type: string
icon:
  description: Set an icon for the sensor
  required: false
  type: string
{% endconfiguration %}

## Full example

```yaml
# Example configuration.yaml entry
sensor:
  - platform: luxtronik
    sensors:
      - group: calculations
        id: ID_WEB_Temperatur_TVL
        friendly_name: Temperature forerun
        icon: mdi:thermometer
```
