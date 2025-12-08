---
title: Diyanet
description: Instructions on how to integrate Diyanet Awqat Salah API within Home Assistant.
ha_category:
  - Sensor
ha_release: 2025.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@mahdemir'
ha_domain: diyanet
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

Use the Diyanet integration to fetch daily Islamic prayer times from the [Diyanet Awqat Salah API](https://awqatsalah.diyanet.gov.tr/index.html) for your selected city. The integration authenticates with your Diyanet account, keeps the current day's times cached, and refreshes them automatically each day.

## Prerequisites

Before setting up the Diyanet integration, ensure you have:

1. Have a Diyanet Awqat Salah account (email/password). If you don’t have one, fill the [API access form](https://awqatsalah.diyanet.gov.tr/files/b8ed95e5-95fc-4635-9c40-406caeeddc1d.pdf) and email it to [dinisleriyk@diyanet.gov.tr](mailto:dinisleriyk@diyanet.gov.tr).

{% include integrations/config_flow.md %}

{% configuration_basic %}
E-mail:
  description: "Your Diyanet Awqat Salah API e-mail."
Password:
  description: "Your Diyanet Awqat Salah API password."
{% endconfiguration_basic %}

After signing in, the flow guides you through selecting a country, state, and city. The integration stores the chosen location ID and schedules a daily refresh.

## Supported functionality

The integration adds the following sensors for your selected city:

- `Fajr prayer time`
- `Sunrise`
- `Dhuhr prayer time`
- `Asr prayer time`
- `Maghrib prayer time`
- `Isha prayer time`
- `Qibla time`
- `Hijri date`
- `Gregorian date`

## Services

- `diyanet.refresh`: Fetch the latest prayer times immediately. Provide `config_entry_id` to refresh a specific entry or leave it empty to refresh all loaded Diyanet entries.

## Data updates

Prayer times are refreshed daily and cached for the current day. Use the refresh service if you need an immediate update (for example after changing your location in Diyanet).

## Known issues

When setting up the integration, you need to select a country, state, and city. For some countries, there is no state selection option because the API only returns states for large countries. For smaller countries, a single option will be displayed with the country name. After selecting this option, the available cities in that country will be listed.

## Removing the integration

This integration follows standard removal. After removal, your Home Assistant instance continues to run normally.

{% include integrations/remove_device_service.md %}
