---
title: SmartTub
description: Instructions on how to integrate SmartTub into Home Assistant.
ha_category:
  - Binary Sensor
  - Climate
  - Light
  - Sensor
  - Switch
ha_release: 2021.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@mdz'
ha_domain: smarttub
ha_platforms:
  - binary_sensor
  - climate
  - light
  - sensor
  - switch
---

The `smarttub` integration allows you to view and control hot tubs which use the [SmartTub](https://www.jacuzzi.com/en-us/hot-tubs/owners/smarttub-system) system, in Home Assistant.

## Prerequisites

- A hot tub with a SmartTub module
- A SmartTub account (registration is not supported, you can use the SmartTub mobile app)

{% include integrations/config_flow.md %}

## Services

### Service `smarttub.set_primary_filtration`

This service allows you to update the settings for the primary filtration cycle
on a hot tub.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | The entity to update. | sensor.jacuzzi_j_335_primary_filtration_cycle
| `duration` | no | The desired duration of the primary filtration cycle, in hours. | 4
| `start_hour` | no | The desired starting hour of the day for the primary filtration cycle. | 2 (i.e. 02:00 or 2:00am)


### Service `smarttub.set_secondary_filtration`

This service allows you to update the settings for the secondary filtration
cycle on a hot tub.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | The entity to update. | sensor.jacuzzi_j_335_secondary_filtration_cycle
| `mode` | no | The desired secondary filtration mode. Can be frequent, infrequent or away. | away

### Service `smarttub.snooze_reminder`

This service allows you to temporarily suppress a maintenance reminder on a hot tub.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | no | The entity to update. | binary_sensor.jacuzzi_j_335_refresh_water_reminder
| `days` | no | The number of days to snooze the reminder (minimum 10). | 10
