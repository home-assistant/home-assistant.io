---
title: Tuya
description: Instructions on how to set up the Tuya hub within Home Assistant.
ha_category:
  - Binary sensor
  - Camera
  - Climate
  - Cover
  - Doorbell
  - Event
  - Fan
  - Humidifier
  - Light
  - Number
  - Scene
  - Select
  - Siren
  - Switch
  - Vacuum
  - Valve
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
  - event
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
  - valve
ha_dhcp: true
ha_integration_type: hub
---

The Tuya integration integrates all Powered by Tuya devices you have added to the Tuya Smart and Tuya Smart Life apps.

All Home Assistant platforms are supported by the Tuya integration, except the lock and remote platform.

## Prerequisites

You need to have the Tuya Smart or Smart Life app installed, with an account created and
at least one device added to that account.

During the setup process, you will need:
- A second screen (such as a phone, tablet, or another computer) to display the QR code that appears during configuration
- The Smart Life or Tuya Smart app installed on your mobile device to scan the QR code

### Obtaining User Code for sign-in

To sign-in, you will need to get your **User Code** from the Smart Life /
Tuya Smart app. You can find it by opening the app and:

1. On the tab bar, select **Me**.
2. Select the **⚙️ (gear)** icon in the top-right corner.
3. Tap **Account and Security**.
4. At the bottom, **User Code** will be shown; you need to when setting up this integration.

{% include integrations/config_flow.md %}

### Scanning the QR code

To scan the QR code in the Smart Life app:
1. Open the Smart Life app
2. Tap the **+** button or **Add Device**
3. Select **Scan** or look for the QR code scanner option
4. Scan the QR code displayed on your Home Assistant screen

After adding new devices to your Tuya account through the Smart Life or Tuya Smart app, you need to reload the Tuya integration in Home Assistant for the new devices to appear:

1. Go to **{% my integrations title="Settings > Devices & Services" %}**
2. Find the Tuya integration
3. Click the three dots menu
4. Select **Reload**

## Scenes

Tuya supports scenes in their app. These allow triggering some of the more complex modes of various devices such as light changing effects. Scenes created in the Tuya app will automatically appear in the Scenes list in Home Assistant the next time the integration updates.

## Troubleshooting

### Unsupported device or missing device functionnality

This integration relies on the official [Python SDK provided by Tuya](https://github.com/tuya/tuya-device-sharing-sdk), which does not expose all functionality available in SmartLife.

The data points provided by the SDK are visible in the Home Assistant device diagnostics JSON file, under the `status`, `status_range` and `function` keys:

1. Go to **{% my integrations title="Settings > Devices & Services" %}**
2. Find the Tuya integration
3. Select the device
4. Under the device information, click the three dots menu
5. Select **Download diagnostics**
6. Open the diagnostic file, and check manually the `status`, `status_range` and `function` keys

If `status`, `status_range` and `function` are all empty, then only scenes declared inside Tuya (if any) will be available inside Home Assistant.
