---
layout: page
title: "Loop Energy"
description: "Instructions how to integrate Loop Energy devices within Home Assistant."
date: 2016-04-02 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: loop.png
ha_category: Sensor
---


Integrate your [Loop Energy](https://www.your-loop.com/) meter information into Home Assistant.

To enable the Loop Energy sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  platform: loopenergy
  electricity_serial: ELECRITCAL_SERIAL
  electricity_secret: ELECTRICAL_OFFSET
  gas_serial: GAS_SERIAL
  gas_secret: GAS_SECRET
```

Configuration variables:

- **electricity_serial** (*Required*): Serial of your electricity sensor
- **electricity_secret** (*Required*): Secret for your electricity Sensor 
- **gas_serial** (*Required*): Serial for your gas sensor.
- **gas_secret** (*Required*): Secret for your gas sensor.

