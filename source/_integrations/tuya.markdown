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

The **Tuya** {% term integration %} integrates all Powered by Tuya devices you have added to the Tuya Smart and Tuya Smart Life apps.

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

1. Go to **{% my integrations title="Settings > Devices & services" %}**
2. Find the Tuya integration
3. Click the three dots menu
4. Select **Reload**

## Scenes

Tuya supports scenes in their app. These allow triggering some of the more complex modes of various devices such as light changing effects. Scenes created in the Tuya app will automatically appear in the Scenes list in Home Assistant the next time the integration updates.

## Actions

The **Tuya** integration provide actions to manage the meal plan for feeders. 

### Action: Get feeder meal plan

The `tuya.get_feeder_meal_plan` action retrieves the meal plan data from a Tuya feeder device.
- **Data attribute**: `device_id`
  - **Description**: The device ID of the Tuya feeder to retrieve the meal plan from.
  - **Optional**: No

### Action: Set feeder meal plan

The `tuya.set_feeder_meal_plan` action set the mealplan data from a Tuya feeder device.
- **Data attribute**: `device_id`
  - **Description**: The device ID of the Tuya feeder to retrieve the meal plan from.
  - **Optional**: No
- **Data attribute**: `meal_plan`
  - **Description**: The decoded data to update the feeder's meal plan. Take a list of dictionary of attributes.
  - **Optional**: No
  - **Attributes**:
    - days: List[String] with monday-sunday. Indexed with monday as first day of week.
    - time: String with HH:MM format
    - portion: Numeric with number of portions
    - enabled: Enable or disable the schedule.

This action returns [response data](/docs/scripts/perform-actions#use-templates-to-handle-response-data) containing the meal plan for the specified feeder device.

#### Example

```yaml
action: tuya.set_feeder_meal_plan
data:
  device_id: "1234567890abcdef"
  meal_plan:
    - days:
        - Monday
        - Tuesday
      time: 10:00
      portions: 2
      enabled: true
```

## Troubleshooting

### Unsupported device or missing device functionality

This integration relies on the official [Python SDK provided by Tuya](https://github.com/tuya/tuya-device-sharing-sdk), which does not expose all functionality available in SmartLife.

The data points provided by the SDK are visible in the Home Assistant device diagnostics JSON file, under the `status`, `status_range` and `function` keys:

1. Go to **{% my integrations title="Settings > Devices & services" %}**
2. Find the Tuya integration
3. Select the device
4. Under the device information, click the three dots menu
5. Select **Download diagnostics**
6. Open the diagnostic file, and check manually the `status`, `status_range` and `function` keys

If `status`, `status_range` and `function` are all empty, then only scenes declared inside Tuya (if any) will be available inside Home Assistant.

### Integration requires re-authenticating after every integration reload

When Tuya updates the terms and conditions of iot.tuya.com, the integration will require repeated authentication.

To fix this:

1. Login to [iot.tuya.com](https://iot.tuya.com), and accept the terms and conditions.
2. Restart Home Assistant.
3. Reconfigure the Tuya integration.

### Feeder meal plan not supported


#### Symptom: "Feeder not supported" warning

Home Assistant shows a warning that this particular feeder is not supported.

#### Description

Feeders are dependent on [tuya-device-handlers](https://github.com/home-assistant-libs/tuya-device-handlers) to be integrated based on feeders `product_id`. 

#### Resolution

Open a issue to [tuya-device-handlers](https://github.com/home-assistant-libs/tuya-device-handlers) with information provided from QueryThingsDataModel API result from iot.tuya.com (under Cloud / API Explorer / Device Control). 

