---
title: YouLess
description: Instructions on how to integrate your YouLess device into Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Local Pull
ha_config_flow: true
ha_release: '0.117'
ha_domain: youless
---

The YouLess integration for Home Assistant allows you to read the meter values from sensors
created by [YouLess](https://www.youless.nl/home.html).

The integration is tested and verified for the LS120 device.

### Setup

Go to the integrations page in your configuration and click on new integration -> YouLess. 
You will need to know the IP address that your YouLess device has in your local network. 

The integration will create sensors for you to display:

* The current power usage
* The gas meter
* The current meter value (including high and low)
* The delivery meter value, for Solar power