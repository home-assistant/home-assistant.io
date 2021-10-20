---
title: Weather
description: Instructions on how to setup your Weather platforms with Home Assistant.
ha_category:
  - Weather
ha_release: 0.32
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
ha_domain: weather
---

The `weather` platforms gather meteorological information from web services and display the conditions and other details about the weather at the given location. Read the integration documentation for your particular weather provider to learn how to set it up.

Home Assistant currently supports free web services some of which require registration.

## Condition mapping

The `weather` platform only knows the below listed conditions. The reason for this is that for these conditions is an icon from [Material Design Icons](https://materialdesignicons.com/) available and mapped in the frontend.

- 'clear-night'
- 'cloudy'
- 'fog'
- 'hail'
- 'lightning'
- 'lightning-rainy'
- 'partlycloudy'
- 'pouring'
- 'rainy'
- 'snowy'
- 'snowy-rainy'
- 'sunny'
- 'windy'
- 'windy-variant'
- 'exceptional'
