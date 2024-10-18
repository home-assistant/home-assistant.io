---
title: Samsung SyncThru Printer
description: Instructions on how to integrate a Samsung printer providing SyncThru within Home Assistant.
ha_category:
  - System monitor
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
ha_integration_type: integration
---

The Samsung SyncThru Printer platform allows Home Assistant to read current data from a local Samsung printer.  

Depending on device abilities, the following separate sensors are created if supported:

- Whether the printer is online
- Whether the printer is in an error state
- Black, cyan, magenta and yellow toner fill level
- Black, cyan, magenta and yellow drum state
- First to fifth paper input tray state
- First to sixth paper output tray state

In order for a device to be discovered automatically, SSPD / UPnP (under Network settings) must be enabled.

{% include integrations/config_flow.md %}
