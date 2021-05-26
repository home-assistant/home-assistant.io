---
title: SMA Solar
description: Instructions on how to connect your SMA Solar Inverter to Home Assistant.
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 0.36
ha_codeowners:
  - '@kellerza'
  - '@rklomp'
ha_domain: sma
ha_platforms:
  - sensor
---

The SMA Solar integration will poll a [SMA](http://www.sma-solar.com/) [(US)](https://www.sma-america.com/) solar inverter, energy meter or battery inverter and present the values as sensors in Home Assistant.

The integration uses the web interface of the device. Before you start, make sure you are able to connect to the solar inverter from your favorite web browser.

{% include integrations/config_flow.md %}

## Sensors
The SMA WebConnect module supports a wide variety of sensors, but not all of these have been mapped in the `pysma` library. Current available sensors can be found in the [definitions file](https://github.com/rklomp/pysma/blob/dev/pysma/definitions.py) of `pysma`. Feel free to submit additional sensors to be added as standard sensors to the `pysma` library.
