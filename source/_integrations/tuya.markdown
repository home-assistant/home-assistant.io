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
  - '@frenck'
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

## Category/Standard Instruction Set Extension Development
When developers find a feature in SmartLife that is not supported, they can follow the steps below for development:

**Step 1**    
Download and Review the Diagnostic File   
Download the diagnostic file and view the category and data of the supported standard instruction set for the device.

- `data["category"]`: Device Category
- `data["function"]` and `data["status_range"]`: Data type and value description of the standard instruction set
- `data["status"]`: Value of the standard instruction set

For more details, refer to the Standard Instruction Set document in the Home Assistant (HA) official Entity Development Guide.

**Step 2**    
Refer to homeassistant/components/tuya's Supported Entity Code Files   
See [here](https://github.com/home-assistant/core/tree/dev/homeassistant/components/tuya) on GitHub.

Add the Entity's support in the relevant file(s) as per the Standard Instruction Set in the Home Assistant Entity Development Guide. If the existing files don't suffice, you can add new Entity files to accommodate new Entity types.

**Example**  
As an example, you may need to add numeric display functionality for the standard instruction "cur_current" under the "dlq" category in sensor.py. Locate the "dlq" category in the SENSORS dictionary (add it if not already present), and implement support for the standard instruction "cur_current". [Code Linking](https://github.com/home-assistant/core/blob/9a38f0de0b83189ca18b68bd8ebd5ae7daf8e4d7/homeassistant/components/tuya/sensor.py#L822)