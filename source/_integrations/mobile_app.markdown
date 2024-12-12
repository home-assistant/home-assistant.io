---
title: Mobile App
description: The Mobile App integration allows a generic platform for integrating with mobile apps.
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
ha_integration_type: integration
---

The Mobile App integration allows Home Assistant mobile apps to easily integrate with Home Assistant.

If you are planning to use a mobile application that integrates with Home Assistant, we recommend that you keep this integration enabled.

If you are a mobile app developer, see the [developer documentation](https://developers.home-assistant.io/docs/api/native-app-integration.html) for instructions on how to build your app on top of the mobile app component.

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
mobile_app:
```

## Apps that use Mobile App

- [Home Assistant for iOS](https://apps.apple.com/us/app/home-assistant/id1099568401?ls=1) (official)
  - [Beta release](https://testflight.apple.com/join/1AlPbnLZ) (Testflight)
- [Home Assistant for Android](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android) (official)
  - [Beta release](https://play.google.com/apps/testing/io.homeassistant.companion.android)

## Mobile App Documentation

- [Companion documentation](https://companion.home-assistant.io/)
