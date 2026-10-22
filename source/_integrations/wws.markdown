---
title: WestfalenWIND Ökostrom smart
description: Instructions on how to integrate WestfalenWIND Ökostrom smart within Home Assistant.
ha_categories:
  - energy.energy_prices
  - sensors
ha_release: 2026.9.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@ed-julian'
  - '@dennis-schoen'
ha_domain: wws
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

The **WestfalenWIND Ökostrom smart** {% term integration %} provides sensors with the current energy prices and your own energy consumption from the dynamic tariff of your WestfalenWIND Ökostrom smart account.

With it, you can see the dynamic quarter-hour prices in Home Assistant and adjust your consumption to them, for example with automations.

## Prerequisites

You need an account for the [WestfalenWIND Ökostrom smart app](https://play.google.com/store/apps/details?id=de.energiedock.dynamit_app.wws&hl=de). If you don't have an account yet, you can register in the app or at [web.wws.dynatarif.de](https://web.wws.dynatarif.de/).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: The email address you use to log in to your WestfalenWIND Ökostrom smart account.
Password:
  description: The password of your account.
{% endconfiguration_basic %}

## Use cases

- Start energy-intensive appliances or charge your electric vehicle when the current price is low, using automations that trigger on the price sensors.
- Compare the current price with the next price to decide whether it is worth waiting.
- See how much you consumed in a 15-minute interval of the previous day, in the same resolution as the prices.

## Data updates

The integration polls the WestfalenWIND Ökostrom smart API every 15 minutes to update the data in Home Assistant.

The prices for the following day are published every day around **14:00 UTC**. They become available in Home Assistant with the next update after that.

## Known limitations

- The integration only provides sensors. It doesn't provide actions or controls.
- Home Assistant only has the values from the day you set up the integration. Earlier prices and consumption are not imported into the history or the statistics.
- The integration holds the prices of 48 hours. Until the prices for the following day are published, these are yesterday and today. After the next update following the publication (around 14:00 UTC), these are today and tomorrow.
- Every 15 minutes, the integration retrieves the most recent 100 quarter-hour price periods (25 hours) from the service and replaces the previous data. Older prices are not kept.
- If no measurements are available for your account, the consumption sensor has no value.

## Sensors

The integration creates the following sensors. All of them belong to one device.

- **Current energy price**: The price per kWh in the current quarter-hour, in €/kWh.
- **Next energy price**: The price per kWh in the next quarter-hour, in €/kWh.
- **Yesterday's consumption**: Your consumption in kWh. The day is split into 15-minute intervals, like the prices. The sensor shows the interval that matches the current time on the previous day.
- **Last updated**: A diagnostic sensor with the time of the last successful data update.

## Removing the integration

This integration follows standard integration removal steps.

{% include integrations/remove_device_service.md %}
