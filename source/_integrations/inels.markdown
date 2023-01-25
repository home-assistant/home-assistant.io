---
title: iNELS
description: Instructions on how to integrate iNELS with Home Assistant.
ha_category:
  - Binary Sensor
  - Button
  - Climate
  - Cover
  - Light
  - Select
  - Sensor
  - Switch
ha_release: '2023.1'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@nejezchleb'
  - '@jhoralek'
  - '@zed4805'
ha_domain: inels
ha_platforms:
  - binary-sensor
  - button
  - climate
  - cover
  - light
  - select
  - sensor
  - switch
ha_integration_type: integration
---

The iNELS integration allows you to control and monitor the devices connected to your control units ([BUS](https://www.elkoep.com/wired) or [eLAN](https://www.elkoep.com/wireless)).


iNELS control units are configured for native discovery.


Currently supported RF devices:

  - Switch units
  - Dimmers
  - Buttons
  - Shutters
  - Switching socket-plug
 
Currently supported BUS devices:
	
	-  DMD3-1
	-  SA3-01B, SA3-02B, SA3-02M, SA3-04M, SA3-06M, SA3-012M
	-  DA3-22M, DA3-66M
	-  IM3-20B, IM3-40B, IM3-80B, IM3-140M
	-  TI3-10B, TI3-40B, TI3-60M
	-  RC3-610DALI
	-  FA3-612M
	-  GSB3-20Sx, GSB3-40Sx, GSB3-60Sx, GSB3-90Sx
	-  WSB3-20, WSB3-20HUM, WSB3-40, WSB3-40HUM
	-  IDRT3-1 
	-  GRT3-50x
	-  GBP3-60
 
Devices will be automatically added when the eLAN or BUS is connected to Home Assistant.

## Requirements
- MQTT broker and the  set up in Home Assistant.
- iNELS control units MQTT setting configured to communicate with the MQTT broker.
	 - eLAN devices flashed with version mqtt_1.0, or later.
	 - BUS devices flashed with version mqtt_1.0, or later.

{% include integrations/config_flow.md %}

You must also configure each iNELS device's MQTT settings to communicate with whatever MQTT broker you are using. Enter the broker address under host and enter a username/password combination that allows access to the broker.
