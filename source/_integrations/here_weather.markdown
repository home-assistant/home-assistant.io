---
title: "HERE Destination Weather"
description: "Instructions on how to add HERE Destination Weather to Home Assistant."
ha_category:
  - Weather
  - Sensor
ha_iot_class: Cloud Polling
ha_release: '0.103'
ha_config_flow: true
ha_quality_scale: gold
ha_codeowners:
  - '@eifinger'
ha_platforms:
  - sensor
  - weather
---

The `here_weather` integration provides weather information from the [HERE Destination Weather API](https://developer.here.com/documentation/destination-weather/dev_guide/topics/overview.html).

## Setup

You need to register for an API key (REST & XYZ HUB API/CLI) by following the instructions [here](https://developer.here.com/tutorials/getting-here-credentials/).

HERE offers a Freemium Plan which includes 250,000 free Transactions per month. For the Destination Weather API, one transaction equals one request.

By default HERE will deactivate your account if you exceed the free Transaction limit for the month. You can add payment details to reenable your account as described [here](https://knowledge.here.com/csm_kb?id=public_kb_csm_details&number=KB0016434).

{% include integrations/config_flow.md %}

## Additional entities

The integration provides the following four modes:

* **Astronomy**: Sunrise, Sunset and Moonphase
* **Hourly**: Weather forecast in an hourly format
* **Daily**: Weather forecast in a dailyformat
* **Daily Simple**: Like Daily but with high/low temp, UV-index and pressure
* **Observation**: Detailed precipitation for the next 24h

All sensors and all weather entities but the Daily Simple are disabled by default. You can enable them manually if needed.