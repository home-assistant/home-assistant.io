---
title: Mutesync
description: Instructions on how to integrate Mutesync button with Home Assistant.
ha_category:
  - Network
  - Binary Sensor
ha_release: 0.79 # TODO which one?
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@currentoor'
ha_domain: mutesync
ha_ssdp: true
ha_platforms:
  - binary_sensor
---

The Muteysnc button integration for Home Assistant allows you to observe [Mutesync buttons](https://mutesync.com/).

There is currently support for the following platforms within Home Assistant:

- Binary sensor - mic muted/unmuted and meeting live/not-live

## Configuration

The integration can be enabled using the frontend.

The integration requires authentication to work.

### Configuration via the frontend

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **mutesync**,
and follow the configuration flow. After finishing, the Mutesync
integration will be available.
