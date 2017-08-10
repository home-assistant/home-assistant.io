---
layout: page
title: "Attribute Sensor"
description: "Instructions how to integrate Attribute sensor into Home Assistant."
date: 2017-09-08 14:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_release: xx
ha_iot_class: "Local Push"
logo: home-assistant.png
---

The `attribute` platform supports sensors which break out specified `attribute` from other entities.

To enable Attribute sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:  
  - platform: attributes
    friendly_name: "Batteries"
    attribute: battery_level
    unit_of_measurement: "%"
    entities:
      - sensor.myslipo_1_0
      - sensor.myslipo_2_0
      - sensor.myslipo_3_0
      - sensor.myslipo_4_0
      
  - platform: attributes
    friendly_name: "Last changed"
    attribute: last_triggered
    icon: 'mdi:clock'
    time_format: '%e %B - %H:%M:%S'
    entities:
      - automation.temp_changed
```

Configuration variables:

- **entities** (*Required*): A list of entity IDs that you want to read attributes from.
- **attribute** (*Required*): Which attribute to extract from defined entity IDs.
- **frindly_name** (*Optional*): Name to use in the Frontend *(will be the same for all entities specified at the moment)*.
- **icon** (*Optional*): Icon to use in the Frontend.
- **unit_of_measurement** (*Optional*): Defines the units of measurement of the sensor, if any.
- **time_format** (*Optional*): **`strftime`** type string to beautify time attribute output. Applicable only when attribute `last_changed` or `last_triggered` is selected. Cheatsheet for strftime formatting  [here](http://strftime.ninja/).


if you select attribute last_changed or last_triggered and you specify time_format your datetime will get translated to your local timezone and will be formatted like strftime(). Cheatsheet here2
    if you select attribute battery or battery_level and you don’t specify icon you will get battery icon with fullness ie. mdi:battery-50, mdi:battery-40, mdi:battery-outline etc.


## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Extract battery level %}

This example shows how to extact `battery_level` attribute.

```yaml
sensor:
  - platform: attributes
    friendly_name: "Batteries"
    attribute: battery_level
    unit_of_measurement: "%"
    entities:
      - sensor.test1
      - sensor.test2
      - sensor.test3
```

<p class='note'>
If **`attribute`** is `battery` or `battety_level` and you don't specify **`icon`** following icon_template is applied. The result is that battery icon become as full as battery based on percentage.

```yaml
{% if batt != 'unknown' %}
    {% if batt > 95 %}
        mdi:battery
    {% elif batt > 85 %}
        mdi:battery-90
    {% elif batt > 75 %}
        mdi:battery-80
    {% elif batt > 65 %}
        mdi:battery-70
    {% elif batt > 55 %}
        mdi:battery-60
    {% elif batt > 45 %}
        mdi:battery-50
    {% elif batt > 35 %}
        mdi:battery-40
    {% elif batt > 25 %}
        mdi:battery-30
    {% elif batt > 15 %}
        mdi:battery-20
    {% elif batt > 10 %}
        mdi:battery-10
    {% else %}
        mdi:battery-outline
    {% endif %}
{% else %}
    mdi:battery-unknown
{% endif %}
```
</p>

### {% linkable_title Extract last triggered %}

This example shows how to extact `last_triggered` attribute in human readable format.

```yaml
sensor:
  - platform: attributes
    friendly_name: "Last changed"
    attribute: last_triggered
    icon: 'mdi:clock'
    time_format: '%e %B - %H:%M:%S'
    entities:
      - automation.dummy_changed
```
<p class='note'>
If **`attribute`** is `last_changed` or `last_triggered` and you specify **`time_format`**, extracted string ie.: _**2017-08-08T13:14:21.651894+00:00**_ gets translated into specified strftime format with timezone applied. Result would be ie.: _**8 August 15:14:21**_ if you timezone is UTC+2
</p>

