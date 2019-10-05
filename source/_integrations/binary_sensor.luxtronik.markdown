---
title: "Luxtronik Binary Sensor"
description: "Instructions on how to setup the Luxtronik binary sensors within Home Assistant."
logo: luxtronik.png
ha_category:
  - Binary Sensor
ha_release: "0.100"
ha_iot_class: Local Polling
---

<div class='note'>
  
The `Luxtronik` integration must be configured correctly to use this integration, see [Luxtronik Integration](/integrations/luxtronik).

</div>

The `Luxtronik` binary sensor platform allows you to monitor the status values of a heat pump unit controlled by a Luxtronik controller.

Binary sensors are read-only. To write to the heatpump, use the provided service [Luxtronik Integration - Service](/integrations/luxtronik/#service).

## Configuration

To use a Luxtronik binary sensor in your installation, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: luxtronik
    sensors:
      - group: calculations
        id: ID_WEB_EVUin
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
  description: Sets a meaningful name for the sensor, if not provided the sensor will be named after the id, `luxtronik.id_web_evuin` for example, otherwise `luxtronik.utility_company_lock`.
  required: false
  type: string
icon:
  description: Set an icon for the sensor
  required: false
  type: string
invert:
  description: Inverts the value
  required: false
  type: boolean
  default: false
{% endconfiguration %}

## Full example

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: luxtronik
    sensors:
      - group: calculations
        id: ID_WEB_EVUin
        friendly_name: Utility company lock
        icon: mdi:lock
```
