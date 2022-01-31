---
title: Unmanic
description: Instructions on how to integrate Unmanic with Home Assistant
ha_category:
  - Multimedia
ha_release: 2022.1
ha_iot_class: Local Polling
ha_domain: unmanic
ha_config_flow: true
ha_codeowners:
  - "@JeffResc"
ha_platforms:
  - sensor
---

The `Unmanic` integration pulls data from a given [Unmanic](https://unmanic.app/) instance.

{% include integrations/config_flow.md %}

The Unmanic integration will add the following entities:

## Sensors

- `sensor.unmanic_active_workers`: The number of active workers.
- `sensor.unmanic_completed_tasks`: The number of completed tasks in the history.
- `sensor.unmanic_pending_tasks`: The number of pending tasks in the queue.
- `sensor.unmanic_total_workers`: The number of total workers.
