---
title: Seitron
description: Instructions on how to setup Seitron integration.
ha_category:
  - Climate
ha_release: 2022.12.8
ha_iot_class: Cloud Polling
ha_domain: seitron
ha_codeowners:
  - '@stefano-vardanega'
ha_config_flow: true
ha_platforms:
  - climate
ha_integration_type: integration
---

The `Seitron` integration allows Home Assistant to connect to [Seitron](https://www.seitron.com) thermostats, reporting and setting its status.
The integration implements the following platforms:

- Climate

{% include integrations/config_flow.md %}


## Climate

The Seitron climate platform provides current and target temperature information for the heating system, boiler status, and HVAC mode.

### Integration services

This integration supports the following services (see [Climate](/integrations/climate/)).

- [`set_temperature`](/integrations/climate/#service-climateset_temperature)
- [`set_hvac_mode`](/integrations/climate/#service-climateset_hvac_mode)
  - `heat` for thermostat winter mode
  - `cool` for thermostat summer mode
  - `auto` for thermostat schedule mode (heat/cool)
  - `off` for thermostat defrost mode