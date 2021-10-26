---
title: Twente Milieu
description: Instructions on how to integrate Twente Milieu with Home Assistant.
ha_category:
  - Sensor
  - Environment
ha_release: 0.97
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: twentemilieu
ha_platforms:
  - sensor
---

The Twente Milieu integration allows you to track the next scheduled waste
pickups by Twente Milieu for each of the different waste types.

{% include integrations/config_flow.md %}

## Sensors

This integration provides sensors for the following waste pickup dates from Twente Milieu:

- Next plastic waste pickup date.
- Next organic waste pickup date.
- Next paper waste pickup date.
- Next non-recyclable waste pickup date.

## Services

The Twente Milieu integration exposes a service that allows you to manually update
the pickup date from Twente Milieu.

### Service `update`

Update pickup dates from Twente Milieu

| Service data attribute | Optional | Description                                                  |
| ---------------------- | -------- | ------------------------------------------------------------ |
| `id`                   | Yes      | The unique address ID to update.                             |
