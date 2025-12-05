---
title: Android TV Remote
description: The Android TV Remote integration has been merged into the Android TV integration.
ha_category:
  - Media player
  - Remote
ha_release: 2023.5
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@tronikos'
  - '@Drafteed'
ha_domain: androidtv_remote
ha_zeroconf: true
ha_platforms:
  - diagnostics
  - media_player
  - remote
ha_integration_type: device
ha_quality_scale: platinum
---

{% note %}
The **Android TV Remote** integration has been merged into the [Android TV](/integrations/androidtv/) integration. Please refer to the Android TV integration documentation for setup instructions and features.

Existing Android TV Remote configurations will continue to work, but for new setups, use the Android TV integration which now supports both the Remote Protocol (formerly Android TV Remote) and ADB connection methods.
{% endnote %}

For documentation on controlling your Android TV device, see the [Android TV integration](/integrations/androidtv/).
