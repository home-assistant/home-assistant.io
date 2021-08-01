---
title: Ambee
description: Instructions on how to integrate Ambee within Home Assistant.
ha_category:
  - Health
  - Environment
ha_release: 2021.7
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - "@frenck"
ha_domain: ambee
ha_platforms:
  - sensor
---

The Ambee integration integrations the [Ambee](https://www.getambee.com/) API
platform with Home Assistant.

Ambee fuses the power of thousands of on-ground sensor data and hundreds of
remote imagery from satellites. Their state-of-the-art AI and ML techniques with
proprietary models analyze environmental factors such as air quality, soil,
micro weather, pollen, and more to help millions worldwide say safe and protect
themselves.

## Prerequisites

To use the Ambee integration, you will need to obtain an API key from Ambee

Ambee provides a free API keys, that are limited to 100 requests a day. If
you are in need for more, paid options are available as well.

[Sign up for an Ambee account](https://api-dashboard.getambee.com/#/signup).
Once you have completed the sign up and logged in for the first time, the
API token will be displayed on the top of your
[Ambee dashboard](https://api-dashboard.getambee.com/#/).

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
