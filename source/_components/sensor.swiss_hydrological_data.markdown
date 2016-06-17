---
layout: page
title: "Swiss Hydrological Data"
description: "Instructions how to integrate hydrological data of Swiss waters within Home Assistant."
date: 2016-06-17 17:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: 0.22
---


The `swiss_hydrological_data` sensor will show you details (temperature, level, and discharge) of rivers and lakes in Switzerland.

The [station overview](http://www.hydrodaten.admin.ch/en/danger-levels-table.html) contains a list of all available measuring points and will help to determine the ID of station which is needed for the configuration.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: swiss_hydrological_data
  name: Aare
  station: STATION_ID
```

Configuration variables:

- **name** (*Optional*): Name to use in the frontend.
- **station** (*Required*): The ID of the measurement point.

The hydrological measurings are coming from the [Swiss Federal Office for the Environment (FOEN)](http://www.hydrodaten.admin.ch).
