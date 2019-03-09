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

If you want to select specific homes or specific rooms, set discovery to False for [netatmo](/components/netatmo/) and add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
climate:
  - platform: netatmo
```

{% configuration %}
homes:
  description: Will display the thermostats of the homes listed.
  required: false
  type: list
  keys:
    name:
      required: true
      description: The home name.
    rooms:
      description: Rooms to be displayed. Multiple entities allowed.
      required: false
      type: [list, string]
      description: List of the names of the rooms to be displayed.
{% endconfiguration %}

If **homes** and **rooms** are not provided, all thermostats will be displayed.

```yaml
# Example configuration.yaml entry
climate:
  platform: netatmo
  homes:
    - name: home1_name
      rooms:
        - room1_name
        - room2_name
    - name: home2_name
      rooms:
        - room3_name
        - room4_name
        - room5_name
```
