---
title: Zerproc
description: Instructions for integrating Zerproc bluetooth lights within Home Assistant.
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: '0.110'
ha_domain: zerproc
ha_codeowners:
  - '@emlove'
ha_config_flow: true
ha_platforms:
  - light
ha_integration_type: integration
---

This {% term integration %} discovers nearby Zerproc lights and adds them to Home Assistant.

{% include integrations/config_flow.md %}

The {% term integration %} will scan for nearby devices, and is completed if any are found. No additional configuration is required. The integration will perform a BLE scan every 60 seconds to search for new devices.

## Additional information for Home Assistant Core on Python environments

This {% term integration %} requires a working Bluetooth stack. Please refer to the [requirements of the underlying bleak library](https://bleak.readthedocs.io/en/latest/backends/index.html) for the operating system requirements.
