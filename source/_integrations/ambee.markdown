---
title: Ambee
description: Instructions on how to integrate Ambee within Home Assistant.
ha_category:
  - Environment
  - Health
ha_release: 2021.7
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: ambee
ha_platforms:
  - sensor
ha_quality_scale: platinum
ha_integration_type: integration
---

The Ambee integration integrates the [Ambee](https://www.getambee.com/) API
platform with Home Assistant.

Ambee fuses the power of thousands of on-ground sensor data and hundreds of
remote imagery from satellites. Their state-of-the-art AI and ML techniques with
proprietary models analyze environmental factors such as air quality, soil,
micro weather, pollen, and more to help millions worldwide say safe and protect
themselves.

## Prerequisites

To use the Ambee integration, you will need to obtain an API key from Ambee

Ambee provides free API keys, that are limited to 100 requests a day. This
is enough for a single Ambee integration instance. If
you are in need for more, Ambee offers paid options to raise the limits on
your API key as well.

[Sign up for an Ambee account](https://api-dashboard.getambee.com/#/signup).
Once you have completed the sign up and logged in for the first time, the
API token will be displayed on the top of your
[Ambee dashboard](https://api-dashboard.getambee.com/#/). Make sure you select
both the Air Quality API and the Pollen API.

{% include integrations/config_flow.md %}

## Sensors

The Ambee platform mainly provides sensors that you can use in your automations.

### Air Quality

Polluted air affects planetary well-being with disruption to our ecosystem and
various health risks. The following sensors from Ambee are available on this:

- Air Quality Index (AQI)
- Carbon Monoxide (CO)
- Nitrogen Dioxide (NO2)
- Ozone
- Particulate Matter < 10 μm
- Particulate Matter < 2.5 μm
- Sulphur Dioxide (SO2)

### Pollen

Pollen is a fine powder produced by trees and plants. Pollen can severely affect
people, especially those with different ailments such as asthma and respiratory
issues. This integration provides a lot of sensors to monitor pollen counts and
risks.

Generic pollen count sensors (in pollen/m3)
and as risk level (low, moderate, high, very high):

- Grass
- Tree
- Weed

Additionally, sensors for specific pollen from specific grasses,
trees or weeds, in pollen/m3, are provided. These are disabled by default.
Enable those entities in the user interface if you like to use these:

- Alder Tree
- Birch Tree
- Chenopod Weed
- Cypress Tree
- Elm Tree
- Hazel Tree
- Mugwort Weed
- Nettle Weed
- Oak Tree
- Pine Tree
- Plane Tree
- Poaceae Grass
- Poplar Tree
- Ragweed
