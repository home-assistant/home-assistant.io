---
title: Nettigo Air Monitor
description: Instructions on how to integrate Nettigo Air Monitor within Home Assistant.
ha_category:
  - DIY
ha_release: 2021.6
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: nam
ha_platforms:
  - button
  - diagnostics
  - sensor
ha_zeroconf: true
ha_integration_type: device
---

The Nettigo Air Monitor integration allows you to read temperature, humidity, pressure and air quality data from Nettigo Air Monitor devices. [Nettigo Air Monitor](https://air.nettigo.pl/?setlang=en) is a DIY air quality monitoring system with open source firmware, based on an open hardware project.

The integration currently has support for the following sensors:

- BME280
- BMP180
- BMP280
- DHT22
- DS18B20
- HECA
- MH-Z14A
- PMSx003
- SDS011
- SHT3X
- SPS30

{% include integrations/config_flow.md %}
