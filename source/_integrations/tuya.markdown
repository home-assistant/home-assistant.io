---
title: Tuya
description: Instructions on how to set up the Tuya hub within Home Assistant.
ha_category:
  - Binary sensor
  - Camera
  - Climate
  - Cover
  - Doorbell
  - Fan
  - Humidifier
  - Light
  - Number
  - Scene
  - Select
  - Siren
  - Switch
  - Vacuum
ha_iot_class: Cloud Push
ha_release: 0.74
ha_config_flow: true
ha_domain: tuya
ha_codeowners:
  - '@Tuya'
  - '@zlinoliver'
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - camera
  - climate
  - cover
  - diagnostics
  - fan
  - humidifier
  - light
  - number
  - scene
  - select
  - sensor
  - siren
  - switch
  - vacuum
ha_dhcp: true
ha_integration_type: hub
---

The Tuya integration integrates all Powered by Tuya devices you have added to the Tuya Smart and Tuya Smart Life apps.

All Home Assistant platforms are supported by the Tuya integration, except the lock and remote platform.

## Prerequisites

You need to have the Tuya Smart or Smart Life app installed, with an account created and
at least one device added to that account.

### Obtaining User Code for sign-in

To sign-in, you will need to get your **User Code** from the Smart Life /
Tuya Smart app. You can find it by opening the app and:

1. On the tab bar, select **Me**.
2. Select the **⚙️ (gear)** icon in the top-right corner.
3. Tap **Account and Security**.
4. At the bottom, **User Code** will be shown; you need to when setting up this integration.

{% include integrations/config_flow.md %}

## Scenes

Tuya supports scenes in their app. These allow triggering some of the more complex modes of various devices such as light changing effects. Scenes created in the Tuya app will automatically appear in the Scenes list in Home Assistant the next time the integration updates.
