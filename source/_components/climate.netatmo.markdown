---
layout: page
title: "Netatmo Thermostat"
description: "Instructions on how to integrate Netatmo thermostat into Home Assistant."
date: 2016-10-11 08:10
sidebar: true
comments: false
sharing: true
footer: true
logo: netatmo.png
ha_category: Climate
ha_release: 0.31
ha_iot_class: "Cloud Polling"
---


The `netatmo` thermostat platform is consuming the information provided by a [Netatmo Smart Thermostat](https://www.netatmo.com/product/energy/thermostat) thermostat. This component allows you to view the current temperature and setpoint.

To enable the Netatmo thermostat, you first have to set up [netatmo](/components/netatmo/), this will use discovery to add your thermostat.

If you want to select a specific home or specific rooms, set discovery to False for [netatmo](/components/netatmo/) and add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
climate:
  - platform: netatmo
```

{% configuration %}
home:
  description: Will display the thermostats of this home only.
  required: false
  type: string
rooms:
  description: Rooms to be displayed. Multiple entities allowed.
  required: false
  type: list
  keys:
    room_name:
      description: Name of the room to display.
{% endconfiguration %}

If **home** and **rooms** are not provided, all thermostats will be displayed.

```yaml
# Example configuration.yaml entry
climate:
  platform: netatmo
  home: home_name
  rooms:
    - room_name1
    - room_name2
```
