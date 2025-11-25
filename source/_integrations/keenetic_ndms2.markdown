---
title: Keenetic NDMS2 Router
description: Instructions on how to integrate Keenetic NDMS2 Routers into Home Assistant.
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_release: 0.54
ha_codeowners:
  - '@foxel'
ha_domain: keenetic_ndms2
ha_platforms:
  - binary_sensor
  - device_tracker
ha_config_flow: true
ha_ssdp: true
ha_integration_type: integration
---

This platform offers presence detection by examining devices connected to a [Keenetic](https://keenetic.net/)
Router running NDMS firmware versions 2.05 and up. It uses telnet connection so make sure telnet is not disabled on your router.

## Configuration

To add a Keenetic router to your installation, go to **Settings** > **Devices & services** in the UI, click the button with `+` sign, and from the list of integrations, select **Keenetic NDMS2 Router**.
