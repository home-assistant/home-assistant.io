---
title: Mobile App
description: The Mobile App integration provides a generic platform for integrating mobile apps with Home Assistant.
ha_category:
  - Other
ha_release: 0.89
ha_config_flow: true
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: mobile_app
ha_iot_class: Local Push
ha_platforms:
  - binary_sensor
  - device_tracker
  - notify
  - sensor
ha_integration_type: device
---

The **Mobile App** {% term integration %} lets Home Assistant mobile apps integrate with Home Assistant.

If you are planning to use a mobile application that integrates with Home Assistant, we recommend that you keep this integration enabled.

If you are a mobile app developer, see the [developer documentation](https://developers.home-assistant.io/docs/api/native-app-integration/) for instructions on how to build your app on top of the mobile app integration.

## Configuration

This integration is enabled by default, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, enable it manually by adding the following to your configuration:

```yaml
# Example configuration.yaml entry
mobile_app:
```

## Apps that use Mobile App

- [Home Assistant for iOS](https://apps.apple.com/app/id1099568401) (official)
  - [Beta release](https://testflight.apple.com/join/1AlPbnLZ) (Testflight)
- [Home Assistant for Android](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android) (official)
  - [Beta release](https://play.google.com/apps/testing/io.homeassistant.companion.android)

## Mobile App documentation

- [Companion documentation](https://companion.home-assistant.io/)
