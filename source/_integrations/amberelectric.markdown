---
title: Amber Electric
description: Instructions on how to integrate Amber Electric live prices within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: '2021.10'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@madpilot'
ha_domain: amberelectric
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

[Amber](https://www.amber.com.au/) is an Australian electricity retailer that provides access to wholesale electricity prices. Customers monitor the wholesale price and shift their energy usage to cheaper, greener times. This saves them money and supports the shift to a more renewably-powered Australia.

Using the **Amber Electric** {% term integration %}, customers can go a step further - setting up devices to automatically shift energy usage to cheaper and greener times, based on real-time electricity prices and forecasts

## Getting an API Key

To use this {% term integration %}, you will need to generate an API key.

1. Login to your Amber account at: <https://app.amber.com.au>
2. Click _Settings_
3. Enable _Developer Mode_
4. Click _Generate API Key_
5. Give your API Key a memorable name (say, Home Assistant)
6. Copy the code that is generated. Note: It will disappear after you reload the page, so make sure you make note of it!

{% include integrations/config_flow.md %}

## How the integration works

Prices are split up into three channel types:

- **General** - This is the channel that records all your power usage from your lights and appliances
- **Controlled Load** - A special channel that is only activated during off-peak times. Often electric hot water systems are connected to the controlled load channel.
- **Feed In** - A channel that records exported power from solar panels and batteries.

It exposes the following {% term sensors %} for each channel type:

- **Price** - Your current electricity price in $/kWh
- **Forecast** - The forecasted prices for the next 12 hours
- **Descriptor** - A description of the price. Useful if you want to create a Amber light that matches the app.

There are two additional sensors:

- **Price Spike** - A binary sensor that indicates when the current price is over $3/kWh.
- **Renewables** - The percentage of renewable energy currently in the grid.
