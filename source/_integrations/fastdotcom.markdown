---
title: Fast.com
description: How to integrate Fast.com within Home Assistant.
ha_category:
  - Sensor
  - System monitor
ha_release: 0.88
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@rohankapoorcom'
  - '@erwindouna'
ha_domain: fastdotcom
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: integration
---

The `fastdotcom` integration uses the [Fast.com](https://fast.com/) web service to measure network bandwidth performance.

{% note %}
Currently, the Fast.com integration only supports measuring download bandwidth.
If you want to measure bandwidth metrics other than download such as ping and upload, utilize the [Speedtest.net](/integrations/speedtestdotnet) integration.
{% endnote %}

Enabling this integration will automatically create the Fast.com Sensor.

By default, a speed test will be run every hour. The user can manually run a speed test via the `homeassistant.update_entity` action.

{% include integrations/config_flow.md %}

## Notes

- When running on Raspberry Pi 3 or older, the maximum speed is limited by its 100 Mbit/s LAN adapter.
- The sensor will return the maximum measured speed during a 15-second test.
- Speed tests consume data depending on your internet speed. Make sure to consider this if your internet connection has limited bandwidth.
