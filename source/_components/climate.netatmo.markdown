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

If you want to select a specific thermostat, set discovery to False for [netatmo](/components/netatmo/) and add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
climate:
  - platform: netatmo
```

Configuration variables:

- **relay** (*Optional*): Will display the thermostats of this relay only.
- **thermostat** array (*Optional*): Thermostat to use.
  - **thermostat_name**: Name of the thermostat to display.

If **relay** and **thermostat** are not provided, all thermostats will be displayed.

```yaml
# Example configuration.yaml entry
climate:
  platform: netatmo
  relay: relay_name
  thermostat:
    - thermostat_name
```
