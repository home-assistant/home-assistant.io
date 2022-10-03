---
title: Open Exchange Rates
description: Instructions on how to integrate exchange rates from https://openexchangerates.org within Home Assistant.
ha_category:
  - Finance
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_release: 0.23
ha_domain: openexchangerates
ha_platforms:
  - sensor
ha_integration_type: integration
ha_codeowners:
  - '@MartinHjelmare'
---

The Open Exchange Rates integration will show you the current exchange rate from [Open Exchange Rates](https://openexchangerates.org) that provides real-time exchange rates for [170 currencies](https://openexchangerates.org/currencies). The free account is limited to only USD as a base currency, allows 1000 requests per month, and updates every hour.

Obtain your API key [here](https://openexchangerates.org/signup)

{% include integrations/config_flow.md %}
