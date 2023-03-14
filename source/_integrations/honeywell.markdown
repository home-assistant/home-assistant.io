---
title: Honeywell Total Connect Comfort (US)
description: Instructions on how to integrate Honeywell thermostats within Home Assistant.
ha_category:
  - Climate
  - Sensor
ha_release: pre 0.7
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@rdfurman'
  - '@mkmer'
ha_domain: honeywell
ha_platforms:
  - climate
  - sensor
ha_integration_type: integration
---

The Honeywell integration integrates Home Assistant with _US-based_ [Honeywell Total Connect Comfort (TCC)](https://mytotalconnectcomfort.com/portal/) climate systems.

If your system is compatible with this integration, then you will be able access it via [https://mytotalconnectcomfort.com/portal/](https://mytotalconnectcomfort.com/portal/) (note the `/portal/`).

- [Supported hardware](#supported-hardware)
- [Climate](#climate)
- [Sensor](#sensor)

{% include integrations/config_flow.md %}

## Supported hardware

Home Assistant is integrated with the following devices through [https://mytotalconnectcomfort.com/portal/](https://mytotalconnectcomfort.com/portal/):

- Thermostats
  - Every thermostat is exposed as a climate entity
  - Known working devices: TH6320R1004, RTH9585WF1004
- Sensors
  - A Temperature sensor entity.
  - A Humidity sensor entity.
  - Known working devices: C7089R1013

Others devices like Security systems are not currently supported by this integration

## Climate

The climate platform integrates Honeywell US-based thermostats into Home Assistant, allowing control of the thermostat through the user interface. The current inside temperature, operating mode, and fan state are also displayed on the thermostat card.

All [climate services](/integrations/climate) are supported except set_swing_mode

## Sensor

The sensor platform integrates outside temperature and outside humidity into Home Assistant as sensors for each device.

This integration will add Home Assistant sensors for the following:
|Sensor|Value|
--- | ---
|Outdoor temperature | Average temperature of all Honeywell Wireless Outdoor Sensors|
|Outdoor humidity | Average humidity of all Honeywell Wireless Outdoor Sensors|
