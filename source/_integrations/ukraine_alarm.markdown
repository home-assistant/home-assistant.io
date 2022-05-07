---
title: Ukraine Alarm
description: Instructions on how to integrate Ukraine Alarm within Home Assistant.
ha_category:
  - Other
ha_release: 2022.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@PaulAnnekov'
ha_domain: ukraine_alarm
ha_platforms:
  - binary_sensor
ha_integration_type: integration
---

The Ukraine Alarm integration uses the [Ukraine Alarm](https://www.ukrainealarm.com/) web service as a source for air-raid sirens in Ukraine for your region. It's became very important since [Russian troops invasion](https://war.ukraine.ua/).

For each region integration exposes 4 binary sensors:

- Air
- Unknown
- Artillery
- Urban Fights

Siren check interval is set to 10 seconds to don't overload API and be able to react quite fast.

## Setup

To generate an Ukraine Alarm API key, go to [Ukraine Alarm APIs](https://api.ukrainealarm.com/) page, fill in a form and wait for an email with an API key.

{% include integrations/config_flow.md %}
