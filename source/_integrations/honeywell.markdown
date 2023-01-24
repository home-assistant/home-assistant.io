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
ha_domain: honeywell
ha_platforms:
  - climate
  - sensor
ha_integration_type: integration
---

The Honeywell integration integrates Home Assistant with _US-based_ [Honeywell Total Connect Comfort (TCC)](https://mytotalconnectcomfort.com/portal/) climate systems.

It does not support the home security functionality of TCC.

If your system is compatible with this integration, then you will be able access it via [https://mytotalconnectcomfort.com/portal/](https://mytotalconnectcomfort.com/portal/) (note the `/portal/`).

- [Supported hardware](#supported-hardware)
- [Climate](#climate)
- [Sensor](#sensor)

## Supported hardware

Any US-based Honeywell thermostat the uses [Honeywell Total Connect Comfort (TCC)](https://mytotalconnectcomfort.com/portal/)

{% include integrations/config_flow.md %}

## Climate

The `honeywell` climate platform integrates Honeywell US based thermostats into Home Assistant, allowing control of the thermostat through the user interface. The current inside temperature, operating mode, and fan state are also displayed on the thermostat card.

The following services are also available:

- [**set_hvac_mode**](/integrations/climate/#service-climateset_hvac_mode) (`off`, `heat`, `cool`,`auto`)
- [**target temperature**](/integrations/climate#service-climateset_temperature)
- [**turn on/off**](/integrations/climate#service-climateturn_on)
- [**fan mode**](/integrations/climate#service-climateset_fan_mode) (`on`, `auto`, `diffuse`)
- [**target humidity**](/integrations/climate#service-climateset_humidity) 
- [**Preset**](/integrations/climate#service-climateset_preset_mode)
- [**Aux Heat**](/integrations/climate#service-climateset_aux_heat)

## Sensor

The `honeywell` sensor platform integrates outside temperature and outside humidity into Home Assistant as sensors for each device.

This integration will add Home Assistant sensors for the following:
|Sensor|Value|
--- | ---
|Outdoor temperature | Average temperature of all Honeywell Wireless Outdoor Sensors|
|Outdoor humidity | Average humidity of all Honeywell Wireless Outdoor Sensors|
