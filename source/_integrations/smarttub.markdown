---
title: SmartTub
description: Instructions on how to integrate SmartTub into Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Light
  - Sensor
  - Switch
ha_release: 2021.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@mdz'
ha_domain: smarttub
ha_platforms:
  - binary_sensor
  - climate
  - light
  - sensor
  - switch
ha_integration_type: integration
---

The **SmartTub** {% term integration %} allows you to view and control hot tubs which use the [SmartTub](https://www.jacuzzi.com/en-us/hot-tubs/owners/smarttub-system) system, in Home Assistant.

## Prerequisites

- A hot tub with a SmartTub module
- A SmartTub account (registration is not supported, you can use the SmartTub mobile app)

{% include integrations/config_flow.md %}

## Actions

### Action: Set primary filtration

The `smarttub.set_primary_filtration` action updates the settings for the primary filtration cycle on a hot tub.

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | The entity to update. | sensor.jacuzzi_j_335_primary_filtration_cycle
| `duration` | no | The desired duration of the primary filtration cycle, in hours. | 4
| `start_hour` | no | The desired starting hour of the day for the primary filtration cycle. | 2 (i.e. 02:00 or 2:00am)


### Action: Set secondary filtration

The `smarttub.set_secondary_filtration` action updates the settings for the secondary filtration cycle on a hot tub.

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | The entity to update. | sensor.jacuzzi_j_335_secondary_filtration_cycle
| `mode` | no | The desired secondary filtration mode. Can be frequent, infrequent or away. | away

### Action: Snooze reminder

The `smarttub.snooze_reminder` action temporarily suppresses a maintenance reminder on a hot tub.

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | The entity to update. | binary_sensor.jacuzzi_j_335_refresh_water_reminder
| `days` | no | The number of days to snooze the reminder (minimum 10). | 10

### Action: Reset reminder

The `smarttub.reset_reminder` action resets a maintenance reminder on a hot tub.

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | The entity to update. | binary_sensor.jacuzzi_j_335_refresh_water_reminder
| `days` | no | The number of days when reminder should trigger next (minimum 30). | 180
