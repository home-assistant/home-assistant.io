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

The **Raspberry Pi Power Supply Checker** {% term integration %} allows you to detect [bad power supply](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#power-supply-warnings) on the Raspberry Pi that is running Home Assistant.

{% note %}
This integration can only monitor the Raspberry Pi that Home Assistant is running on. It cannot monitor remote Raspberry Pis over the network.

If you have multiple Raspberry Pis and are running Home Assistant on one of them, this integration will only check the power supply status of the Pi where Home Assistant is installed.

{% endnote %}

{% include integrations/config_flow.md %}

## Supported functionality

This integration interfaces with the kernel's power management system to detect whether the Raspberry Pi is receiving sufficient power. It creates a binary sensor that indicates whether your power supply is adequate (normal state) or if there are voltage issues (problem state).

If issues are detected, consider upgrading to a higher quality power supply that can deliver stable 5V power with sufficient current for your Raspberry Pi model.
