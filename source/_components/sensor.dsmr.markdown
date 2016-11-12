---
layout: page
title: "DSMR/Slimme meter"
description: "Instructions how to integrate DSMR Smartmeter within Home Assistant."
date: 2016-11-12 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: netbeheernederland.jpg
ha_category: Energy
ha_iot_class: "Local Push"
---

A sensor platform for Dutch Smart Meters which comply to DSMR (Dutch Smart Meter Requirements), also known as 'Slimme meter' or 'P1 poort'.

Currently support DSMR V2.2 and V4 through the [dsmr_parser](https://github.com/ndokter/dsmr_parser) module by Nigel Dokter.

For official information about DSMR refer to: [DSMR Document](http://www.netbeheernederland.nl/themas/hotspot/hotspot-documenten/?dossierid=11010056&title=Slimme%20meter&onderdeel=Documenten)

For unofficial hardware connection examples refer to: [Domoticx](http://domoticx.com/p1-poort-slimme-meter-hardware/)

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dsmr
```

Configuration variables:

- **device** string (*Optional*): Serial device to which Smartmeter is connected (default: /dev/ttyUSB0).
- **dsmr_version_** string (*Optional*): Version of DSMR used by meter, choices: 2.2, 4 (default: 2.2).

A full configuration example can be found below:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dsmr
    device: /dev/ttyUSB1
    dsmr_version: 4

group:
  meter_readings:
    name: Meter readings
    entities:
      - sensor.power_consumption_low
      - sensor.power_consumption_normal
      - sensor.power_production_low
      - sensor.power_production_normal
      - sensor.gas_consumption
```
