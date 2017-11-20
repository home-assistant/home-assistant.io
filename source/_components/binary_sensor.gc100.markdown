---
layout: page
title: gc100 Binary Sensor
description: "Instructions on how to set up an gc100 binary sensor within Home Assistant."
date: 2017-10-27 17:26
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Binary Sensor
ha_release: 0.57
ha_iot_class: "Local Polling"
---

To enable this sensor, you first have to set up [gc100](/components/gc100/), and add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: gc100
    ports:
      - '3:1': Doorchime
      - '3:2': Garage Obstruction
```

Configuration variables:

- **ports** (*Required*): A list of module-address to name mappings in the format 'x:y': name, where x is module #, y is address.

