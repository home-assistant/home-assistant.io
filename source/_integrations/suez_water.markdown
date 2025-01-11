---
title: Suez Water
description: Instructions on how to integrate Suez Water daily data within Home Assistant.
ha_release: 0.97
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@ooii'
  - '@jb101010-2'
ha_domain: suez_water
ha_platforms:
  - sensor
ha_integration_type: integration
---

The **Suez Water** {% term integration %} fetches your water consumption data from the French water provider [Tout Sur Mon Eau](https://www.toutsurmoneau.fr) website.

## Sensors

- The **Water usage yesterday** sensor shows yesterday's water consumption data if that data is available.
- The **Water price** sensor shows the current water price in euros per cubic meter (€/m3).

### Extra attributes

Extra attributes of `Water usage yesterday` sensor:

- Daily consumption for the current month
- Daily consumption for the previous month
- Monthly consumption for the last 26 months
- Highest monthly consumption
- Last year total consumption
- Current year total consumption

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "The username used to connect to your _Tout Sur Mon Eau_ [user account](https://www.toutsurmoneau.fr/mon-compte-en-ligne)."
Password:
  description: "The password used to connect to your _Tout Sur Mon Eau_ [user account](https://www.toutsurmoneau.fr/mon-compte-en-ligne) with the above username."
{% endconfiguration_basic %}

## Devices

The integration will automatically use the meter provided by _Tout Sur Mon Eau_ website and create a {% term device %} representing the meter.

### Supported meters

All **connected meters** provided by Suez are supported.

For the integration to work, you **need to have** a Suez connected meter installed. To check if your meter is compatible, you can verify if consumption data is available on _Tout sur mon eau_ [consumption page](https://www.toutsurmoneau.fr/mon-compte-en-ligne/historique-de-consommation-tr).

If your meter changes, the integration will automatically create a new device representing the new meter.

### Unsupported meters

Currently, this integration does not support the following meters:

- Non-connected meters
- Meters provided by other brands than Suez

## Remove integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
