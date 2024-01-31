---
title: Traccar
description: Instructions how to use Traccar GPS tracker to track devices in Home Assistant.
ha_release: 0.83
ha_category:
  - Car
  - Presence detection
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@ludeeus'
ha_domain: traccar
ha_platforms:
  - device_tracker
ha_integration_type: integration
---

`Traccar` uses GPS for tracking and has support for over 1500 different types of devices. You can use the [Traccar Client](https://www.traccar.org/client/) app on a smartphone via `webhook`.

To configure Traccar Client, you must set it up via the integrations panel in the configuration screen. This will give you the webhook URL to use during mobile device configuration. This URL has to be set in the Traccar app.
