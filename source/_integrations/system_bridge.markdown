---
title: System Bridge
description: How to integrate the System Bridge integration into Home Assistant.
ha_category:
  - Sensor
  - System Monitor
ha_release: 2021.4
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@timmo001'
ha_domain: system_bridge
ha_quality_scale: silver
ha_platforms:
  - sensor
---

[System Bridge](https://github.com/timmo001/system-bridge) is an application that runs on your local machine to share system information via its API as well as allowing commands to be sent to the device.

## Prerequisites

You will need your API key. This can be found and configured in the application's settings.

{% include integrations/config_flow.md %}

## Sensors

This integration provides the following sensors:

| Name             | Description                                         |
| ---------------- | --------------------------------------------------- |
| Battery          | Battery level of the device                         |
| CPU Speed        | The current CPU speed                               |
| CPU Temperature  | The current temperature of the device               |
| Filesystem(s)    | Space used for each drive letter / filesystem mount |
| Operating System | Version information of the Operating System         |
| Load             | System load percentage                              |
