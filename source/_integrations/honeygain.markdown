---
title: Honeygain
description: Instructions for how to add Honeyagin sensors to Home Assistant.
ha_category:
  - Finance
  - Sensor
ha_release: 2023.01
ha_iot_class: Cloud Polling
ha_domain: honeygain
ha_platforms:
  - diagnostics
  - sensor
ha_codeowners:
  - '@SplinterHead'
ha_config_flow: true
ha_integration_type: integration
---

The `honeygain` integration lets you access account balances and daily earnings from [Honeygain](https://www.honeygain.com/).

Honeygain is a platform where you can sell your idle bandwidth to make a bit of extra cash. This integration will let you keep an eye on your account balances.

## Prerequisites

You must have a Honeygain account. Sign up [here](https://r.honeygain.me/LEWISF7B55) to get free credits.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email Address:
  description: Your Honeygain account's email address, this is required.
Password:
  description: Your Honeygain password for the account, this is required.
{% endconfiguration_basic %}

## Entities

### Sensor

The integration will create sensor entities for metrics that relate to your account:

- Account Balance
- Today's current earnings

