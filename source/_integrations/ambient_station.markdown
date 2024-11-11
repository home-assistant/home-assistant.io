---
title: Ambient Weather Station
description: How to integrate Ambient Weather station within Home Assistant.
ha_category:
  - Weather
ha_release: 0.85
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: ambient_station
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: hub
---

The **Ambient Weather Station** {% term integration %} retrieves local weather information
via personal weather stations from [Ambient Weather](https://ambientweather.net).

## Prerequisites

Using this {% term integration %} requires both an Application Key and an API Key. To
generate both, simply utilize the profile section of
[your Ambient Weather dashboard](https://dashboard.ambientweather.net).

{% include integrations/config_flow.md %}

## Local API Option

This integration communicates with Ambient Weather PWS units via the Ambient Weather
Cloud. Users desiring a local option can utilize
[`ecowitt2mqtt`](https://github.com/bachya/ecowitt2mqtt#input-data-formats)
in `ambient_weather` mode, (which supports [MQTT Discovery](/integrations/mqtt/#mqtt-discovery)).

Another option is to explore the [Ecowitt](https://www.ecowitt.com) family of devices,
which support the built-in [Ecowitt](/integrations/ecowitt/) integration.
