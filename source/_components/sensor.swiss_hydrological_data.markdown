---
layout: page
title: "Swiss Hydrological Data"
description: "Instructions on how to integrate hydrological data of Swiss waters within Home Assistant."
date: 2016-06-17 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: swiss-hydrological-data.png
ha_category: Environment
ha_iot_class: "Cloud Polling"
ha_release: 0.22
---

<p class='note warning'>
  This sensor doesn't work at the moment due to changed by the [Swiss Federal Office for the Environment (Bundesamt für Umwelt - Abt. Hydrologie)](http://www.hydrodaten.admin.ch) to access the data.
</p>

The `swiss_hydrological_data` sensor will show you details (temperature, level, and discharge) of rivers and lakes in Switzerland.

## {% linkable_title Setup %}

The [station overview](http://www.hydrodaten.admin.ch/en/danger-levels-table.html) contains a list of all available measuring points and will help to determine the ID of station which is needed for the configuration.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: swiss_hydrological_data
    station: STATION_ID
```

{% configuration %}
station:
  description: The ID of the measurement point.
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: 
{% endconfiguration %}

The hydrological measurings are coming from the [Swiss Federal Office for the Environment (Bundesamt für Umwelt - Abt. Hydrologie)](http://www.hydrodaten.admin.ch) and are updated almost in real-time.

## {% linkable_title Example %}

This sensor contains additional information which an easily accessed by a [template sensor](/components/sensor.template/).

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  platform: template
  sensors:
    discharge:
      value_template: '{{ states.sensor.aare.attributes.Discharge }}'
      friendly_name: 'Discharge'
```
{% endraw %}


