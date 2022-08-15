---
title: Fully Kiosk Browser
description: Instructions on how to integrate Fully Kiosk Browser with Home Assistant
ha_category:
  - Binary Sensor
  - Sensor
ha_release: 2022.9
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@cgarwood'
ha_domain: fullykiosk
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

[Fully Kiosk Browser](https://www.fully-kiosk.com) is a powerful kiosk browser for Android devices. It provides a number of features for monitoring and controlling your Android device. This integration gives you access to view the status of your device in Home Assistant.

There is currently support for the following information:

- Current Page URL
- Battery Level
- Device plugged in
- App start time
- Screen Orientation
- Kiosk mode enabled/disabled
- Storage available
- RAM available

## Requirements

This integration requires the Fully Remote Admin feature to be enabled in the Fully Kiosk Browser app. This feature requires the paid Fully Plus license. You can test it out for free, but Fully Kiosk Browser will display a watermark on your device.

You will need the IP address of your device, and the Fully Remote Admin password you set in the Fully Kiosk Browser app.

{% include integrations/config_flow.md %}