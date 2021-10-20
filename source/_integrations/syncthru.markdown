---
title: Samsung SyncThru Printer
description: Instructions on how to integrate a Samsung printer providing SyncThru within Home Assistant.
ha_category:
  - System Monitor
ha_iot_class: Local Polling
ha_release: 0.66
ha_config_flow: true
ha_codeowners:
  - '@nielstron'
ha_domain: syncthru
ha_ssdp: true
ha_platforms:
  - binary_sensor
  - sensor
---

The Samsung SyncThru Printer platform allows you to read current data from your local Samsung printer.

It usually provides information about the device's state, the left amount of ink or toner and the state of paper trays.

The following information is displayed in separate sensors, if it is available:

 - Whether the printer is online
 - Whether the printer is in an error state
 - Black, cyan, magenta and yellow toner fill level
 - Black, cyan, magenta and yellow drum state
 - First to fifth paper input tray state
 - First to sixth paper output tray state

{% include integrations/config_flow.md %}
