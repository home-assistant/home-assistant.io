---
title: Meppel Afvalkalender
description: Instructions on how to integrate Meppel Afvalkalender with Home Assistant.
ha_category:
  - Sensor
  - Environment
ha_release: 0.97
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@westenberg'
ha_domain: meppel_afvalkalender
ha_platforms:
  - sensor
---

The Meppel Afvalkalender integration allows you to track the next scheduled waste
pickups by Meppel Afvalkalender for each of the different waste types.

{% include integrations/config_flow.md %}

## Sensors

This integration provides sensors for the following waste pickup dates from Meppel Afvalkalender:

- Next plastic waste pickup date.
- Next organic waste pickup date.
- Next paper waste pickup date.
- Next non-recyclable waste pickup date.

## Services

The Meppel Afvalkalender integration exposes a service that allows you to manually update
the pickup date from Meppel Afvalkalender.

### Service `update`

Update pickup dates from Meppel Afvalkalender

| Service data attribute | Optional | Description                                                  |
| ---------------------- | -------- | ------------------------------------------------------------ |
| `id`                   | Yes      | The unique address ID to update.                             |
