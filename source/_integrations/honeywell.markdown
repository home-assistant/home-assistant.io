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
  - diagnostics
  - sensor
  - switch
ha_integration_type: integration
---

The Honeywell integration integrates Home Assistant with _US-based_ [Honeywell Total Connect Comfort (TCC)](https://mytotalconnectcomfort.com/portal/) climate systems.

If your system is compatible with this integration, then you will be able access it via [https://mytotalconnectcomfort.com/portal/](https://mytotalconnectcomfort.com/portal/) (note the `/portal/`).

- [Supported hardware](#supported-hardware)
- [Climate](#climate)
- [Sensor](#sensor)
- [Switch](#switch)

## Supported hardware

Home Assistant is integrated with the following devices through [https://mytotalconnectcomfort.com/portal/](https://mytotalconnectcomfort.com/portal/):

- Thermostats
  - Every thermostat is exposed as a climate entity
  - Known working devices: [TH6320R1004](https://customer.resideo.com/en-US/Pages/Product.aspx?cat=HonECC%2520Catalog&pid=TH6320R1004/U), [RTH9585WF1004](https://www.honeywellhome.com/us/en/products/air/thermostats/wifi-thermostats/wifi-color-touchscreen-thermostat-rth9585wf1004-u/), [RTH6580WF](https://www.honeywellhome.com/us/en/products/air/thermostats/wifi-thermostats/wifi-7-day-programmable-thermostat-rth6580wf1001-u1/)
- Sensors
  - A Temperature sensor entity
  - A Humidity sensor entity
  - Known working devices: [C7089R1013](https://customer.resideo.com/en-US/Pages/Product.aspx?cat=HonECC%20Catalog&pid=C7089R1013/U), [RTH6580WF](https://www.honeywellhome.com/us/en/products/air/thermostats/wifi-thermostats/wifi-7-day-programmable-thermostat-rth6580wf1001-u1/)

Other devices like Security systems are not currently supported by this integration.

## Climate

The climate platform integrates Honeywell US-based thermostats into Home Assistant, allowing control of the thermostat through the user interface. The current inside temperature, operating mode, and fan state are also displayed on the thermostat card.

All [climate services](/integrations/climate) are supported except set_swing_mode.

There is a "known" issue related to setting the temperature from Home Assistant with some thermostats. If your instance receives errors when setting the temperature above or below some value, go to the Honeywell web page and set the temperature to the max or min for the mode you are using, then adjust from Home Assistant.

## Sensor

The sensor platform integrates inside and outside temperature and humidity into Home Assistant as sensors for each device. Not every supported thermostat will support all sensors.

This integration will add Home Assistant sensors for the following:
|Sensor|Value|
--- | ---
|Outdoor temperature | Average temperature of all Honeywell Wireless Outdoor Sensors|
|Outdoor humidity | Average humidity of all Honeywell Wireless Outdoor Sensors|
|Indoor temperature | Current temperature as measured at the specific thermostat|
|Indoor humidity | Current humidity as measured at the specific thermostat|

## Switch

The switch entity integrates the emergency heat option for each device.  If the thermostat supports emergency heat, the switch entity will be created.

This integration will add a switch for the following:
|Switch|Value|
--- | ---
|Emergency Heat | Activates second stage heat source as primary heat|
