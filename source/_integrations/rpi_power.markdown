---
title: Raspberry Pi Power Supply Checker
description: Instructions on how to integrate Raspberry Pi Power Supply Checker within Home Assistant.
ha_category:
  - System monitor
ha_iot_class: Local Polling
ha_release: 0.116
ha_domain: rpi_power
ha_codeowners:
  - '@shenxn'
  - '@swetoast'
ha_config_flow: true
ha_platforms:
  - binary_sensor
ha_integration_type: integration
---

The `rpi_power` integration allows you to detect [bad power supply](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#power-supply-warnings) on Raspberry Pi.

{% include integrations/config_flow.md %}
