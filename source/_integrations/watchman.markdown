---
title: Kingspan Watchman SENSiT
description: Instructions on how to integrate Kingspan Watchman SENSiT sensors into Home Assistant.
ha_categories:
  - energy
ha_release: 2026.11
ha_iot_class: cloud_polling
ha_domain: watchman
ha_platforms:
  - sensor
ha_integration_type: device
ha_codeowners:
  - '@masaccio'
ha_config_flow: true
ha_quality_scale: gold
---

The **Kingspan Watchman SENSiT** integration allows you to read levels from your oil tank using a connection to Kingspan's cloud service. 

{% include integrations/config_flow.md %}

During installation, you will be asked for your Kingspan account email address and password.

## Options

Options for Kingspan Watchman SENSiT can be set via the user interface.

{% include integrations/option_flow.md %}

- **Usage window**: The number of recent days used to calculate the rolling usage rate and the predicted empty date. Default: 14.
- **Oil energy density**: The conversion factor used for oil-to-energy calculations, in kWh per litre. The default of 9.8 assumes 10.35 kWh per litre for heating oil and a boiler efficiency of 95%.

## Energy Dashboard

Home Assistant Energy Management does not include native support for oil consumption, so you must configure it using the gas consumption interface. 

This integration provides a continuous `sensor.oil_consumption` entity tracking the monotonically increasing amount of oil consumed, represented in kWh. Add this sensor as your source of gas usage.