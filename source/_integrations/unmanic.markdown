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
  - button
  - number
  - sensor
  - switch
---

The `Unmanic` integration pulls data from a given [Unmanic](https://unmanic.app/) instance.

{% include integrations/config_flow.md %}

The Unmanic integration will add the following entities:

## Buttons

- `button.unmanic_pause_all_workers`: Pauses all workers.
- `button.unmanic_resume_all_workers`: Resumes all workers.
- `button.unmanic_scan_library`: Triggers a library scan.

## Numbers

- `number.unmanic_concurrent_file_testers`: The configured number of concurrent file testers.
- `number.unmanic_distributed_worker_count`: The configured number of distributed workers.
- `number.unmanic_worker_count`: The configured number of workers.

## Sensors

- `sensor.unmanic_active_workers`: The number of active workers.
- `sensor.unmanic_completed_tasks`: The number of completed tasks in the history.
- `sensor.unmanic_pending_tasks`: The number of pending tasks in the queue.
- `sensor.unmanic_total_workers`: The number of total workers.

## Switches

- `switch.unmanic_debugging`: Whether debugging should be enabled on Unmanic.
- `switch.unmanic_enable_periodic_library_scans`: Whether periodic library scans should be enabled.
- `switch.unmanic_enable_the_library_file_monitor`: Whether the library file monitor should be enabled.
- `switch.unmanic_follow_symlinks_on_library_scans`: Whether symlinks should be followed during library scans.
- `switch.unmanic_run_a_one_off_library_scan_on_startup`: Whether a one-off library scan should be enabled on startup.
- `switch.unmanic_clear_all_pending_tasks_on_startup`: Whether Unmanic should clear all pending tasks on startup.
