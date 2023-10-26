---
title: La Marzocco
description: Instructions on how to integrate your La Marzocco coffee machine with Home Assistant.
ha_release: 2023.10
ha_category:
  - Water Heater
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: lamarzocco
ha_platforms:
  - water_heater
ha_codeowners:
  - '@zweckj'
  - '@rccoleman'
ha_integration_type: integration
---

This integration interacts with [La Marzocco coffee machines](https://lamarzocco.com/it/en/) through a mix of cloud calls, local API calls, WebSocket connections and (optionally) Bluetooth. 

If you are in Bluetooth reach to your coffee machine it should be discovered automatically.

Your machine needs to be added to your account using the official app first.


{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "Your username you use to log into the La Marzocco app."
  required: true
  type: string
Password:
  description: "Password you use to log into the La Marzocco app."
  required: true
  type: string
Host:
  description: "IP address of your machine in your local network. If not set, no local connections will be used."
  required: false
  type: boolean
{% endconfiguration_basic %}

## Water Heaters
| Water Heater Name | Description |
|-------------|-------------|
| Coffee Boiler | Control the coffee boiler of your machine. If turned off, your machine will turn off. |
| Steam Boiler | Control the steam boiler of your machine. |
