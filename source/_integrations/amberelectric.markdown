---
title: Amber Electric
description: Instructions on how to integrate Amber Electric live prices within Home Assistant.
ha_category:
  - Sensor
ha_release: 2021.9
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - "@madpilot"
ha_domain: amberelectric
ha_platforms:
  - sensor
---

[Amber](https://www.amber.com.au/) is an Australian electricity retailer that provides wholesale prices. By monitoring the price, and shifting usage to cheaper and greener times, You can save money and the environment. Using the `amberelectric` component allows you to run automations based on the real-time electricity price and forecasts.

Prices are split up into three channel types:

- **General** - This is the channel that records all your power usage from your lights and appliances
- **Controlled Load** - A special channel that is only activated during off-peak times. Often electric hot water systems are connected to the controlled load channel.
- **Feed In** - A channel that records exported power from solar panels and batteries.

It exposes the following sensors for each channel type:

- **Price** - Your current electricity price in c/kWh
- **Forecast** - The forecasted prices for the next 12 hours
- **Energy Price** - Your current electricity price in $/kWh for use in the energy dashboard

There are two additional sensors:

- **Price Spike** - A binary sensor that indicates the current price is over $3/kWh.
- **Renewables** - The percentage of renewable energy currently in the grid.

## Getting an API Key

To use this integration, you will need to generate an API key.

1. Login to your Amber account at: https://app.amber.com.au
2. Click _Settings_
3. Enable _Developer Mode_
4. Click _Generate API Key_
5. Give your API Key a memorable name (say, Home Assistant)
6. Copy the code that is generated. Note: It will disappear after you reload the page, so make sure you make note of it!
