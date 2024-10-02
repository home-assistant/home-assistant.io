---
title: EzBEQ
description: Instructions on how to integrate EzBEQ into Home Assistant.
ha_category:
  - Sensor
ha_release: '2024.8'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@iloveicedgreentea'
ha_domain: ezbeq
ha_platforms:
  - sensor
ha_integration_type: device
---

The EzBEQ allows for the automation and control of [EzBEQ](https://github.com/3ll3d00d/ezbeq). Its main purpose is to automate loading and unloading [BEQ](https://beqcatalogue.readthedocs.io/en/latest/) profiles.

{% include integrations/config_flow.md %}

## Supported Devices

This integration supports the EzBEQ API. It should work with any device that is compatible with the EzBEQ API although it has only been tested with a MiniDSP 2x4HD.

It will create a "Device" for every physical device attached to EzBEQ. For example, if you have two MiniDSPs that EzBEQ manages, they will appear as separate devices.

### Sensor

This integration creates a sensor on each device to show the currently loaded BEQ Profile.

`sensor.{device_name}_current_profile`
