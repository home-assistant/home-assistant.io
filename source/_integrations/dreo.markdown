---
title: Dreo
description: Instructions on how to set up Dreo products within Home Assistant.
ha_category:
  - Fan
ha_release: 2024.12
ha_domain: dreo
ha_platforms:
  - fan
ha_integration_type: integration
---

The **Dreo** {% term integration %} enables you to control smart switches connected to the [Dreo App](https://m.dreo.com/en).

The devices must be added to the Dreo App before this integration can discover them.

The following platforms are supported:

- **fan**

## Supported devices

This integration supports devices controllable by the Dreo App. The following devices are supported by this integration:

### Fans

#### General Features

- **Sleep Mode**: All models can adjust the fan speed smoothly in the "sleep" mode. However, some models (such as DR-HTF001S) perform better in terms of adjustment smoothness, providing a more stable and quiet environment for sleeping.
- **Wide-Angle Oscillation**: Fans are typically equipped with a wide oscillation function, which ensures more even air circulation—especially in larger spaces.
- **Intelligent Auto Mode**: The "auto" mode of each model can adjust the fan speed based on temperature and humidity. For example, it provides a more precise and personalized comfort experience.
- **Child Lock Function**: Many fans include a child lock that helps prevent accidental setting changes and enhances household safety.
- **Fast Speed Adjustment Response**: Most fans offer a rapid speed-adjustment response time, enabling you to swiftly alter the fan speed according to your requirements.
- **Multi-Voice Assistant Integration**: Many models support integration with a wider range of voice assistants, which facilitates a wider range of hands-free operations.
- **Energy-Efficient Motor**: Many fans come with an energy-efficient motor that reduces electricity costs while delivering strong airflow.
- **Long Timer Setting**: Most fans offer a timer setting of up to 12 hours, which gives you more flexibility in scheduling the fan's operation.

The supported models include: DR-HTF001S, DR-HTF002S, DR-HTF005S, DR-HTF007S, DR-HTF008S, DR-HTF009S, DR-HTF010S.

#### Model-Specific Features

- **Wide-Angle Oscillation**: Generally, fans are equipped with a wide-angle oscillation function. However, the fan of model DR-HTF004S distinguishes itself with its remarkable performance. It offers an oscillation range of up to 120 degrees, and its oscillation mechanism is precisely engineered to ensure a more uniform and efficient air circulation. This feature is particularly advantageous in larger spaces, effectively spreading fresh air across the area.

The supported models include: DR-HTF004S

## Prerequisite

Before you can use this integration, all devices must be registered with the
Dreo App. Once registration is complete, you can add the Dreo integration in Home Assistant through the UI.

{% include integrations/config_flow.md %}

{% include integrations/remove_device_service.md %}


## Fan exposed attributes

Dreo Tower Fan will expose the following details depending on the features supported by the model:

| Attribute | Description                                                  | Example |
| --------- | ------------------------------------------------------------ | ------- |
| `mode`    | The current mode the device is in. | "manual", "auto", "sleep" |
| `speed`   | The current speed setting (1-4). | 1 |
| `oscillate` | Whether oscillation is enabled. | true/false |

All attributes are supported by models: DR-HTF001S, DR-HTF002S, DR-HTF004S, DR-HTF005S, DR-HTF007S, DR-HTF008S, DR-HTF009S, DR-HTF010S

## Troubleshooting

### Device not discovered

- **Check Dreo App Connection**: Ensure that your devices are properly connected to the Dreo App. Try restarting the Dreo App and checking if the devices are still visible and controllable within it. If not, re-pair the devices with the Dreo App, following the app's official pairing instructions.
- **Home Assistant Network Issues**: Make sure that your Home Assistant instance has network access. You can test this by trying to access other online services from within Home Assistant (for example, checking the weather integration if it's set up). If there are network problems, troubleshoot your Home Assistant's network connection, which may involve checking your router settings, Wi-Fi passwords, or Ethernet connections.
- **Permissions**: Double-check that you've granted all the necessary permissions during the integration setup process. Incorrect permissions can prevent Home Assistant from discovering your Dreo devices.

### Inability to control devices

- **Device State Sync**: Sometimes, the device state may not sync correctly between the Dreo App and Home Assistant. Try toggling the device on/off, changing the mode, or adjusting the speed from within the Dreo App, and then refreshing the device page in Home Assistant to see if the state updates.
- **App Version Mismatch**: Ensure that both the Dreo App and Home Assistant are running up-to-date versions. An outdated version of either software could lead to compatibility issues and control problems. Update the Dreo App from the official app store for your device, and check for Home Assistant updates in the Home Assistant UI's update section.

### Dreo App credentials are invalid or expired

If your Dreo App credentials are invalid or expired, you can follow these steps:

1. Open the Dreo App. Navigate to the account settings section.
2. Click on the "Log out" option if you are currently logged in.
3. Enter your correct username and password. If you have forgotten your password, use the "Forgot password" option in the app to reset it.
4. Once you have successfully logged in to the Dreo App, go back to Home Assistant. Navigate to the Dreo integration settings and re-enter your Dreo App credentials. Then save the settings.

### Device becomes unresponsive

If the device becomes unresponsive, try the following steps:

1. **Power cycle the device**: Turn off the device using its power switch or unplug it from the power source. Wait for about 10–15 seconds and then turn it back on or plug it back in.
2. **Check the Wi-Fi connection**: Ensure that the device is connected to a stable Wi-Fi network. You can try moving the device closer to the router to improve the signal strength.
3. **Restart the Dreo App and Home Assistant**: Close the Dreo App completely on your mobile device and restart it. Also, restart your Home Assistant instance. Then try to control the device again.
4. **Reset the device**: If the above steps do not work, you may need to reset the device to its factory settings. Refer to the device's user manual for the specific reset procedure. After resetting, re-add the device to the Dreo App and then to Home Assistant.

## Firmware update scenarios

### Updating the device firmware

1. **Check for updates in the Dreo App**: Open the Dreo App and navigate to the device management section. Select the device you want to update. If there is a firmware update available, the app will prompt you.
2. **Start the update**: Follow the on-screen instructions in the Dreo App to start the firmware update process. Make sure the device is connected to a stable power source and Wi-Fi network during the update.
3. **Wait for the update to complete**: The update process may take several minutes. Do not turn off the device or interrupt the update during this time.
4. **Verify the update**: Once the update is complete, check if the device's features are working as expected. You can also check the device information in the Dreo App to confirm the new firmware version.

### Issues during firmware update

- **Update fails**: If the firmware update fails, check your network connection. Try restarting the device, the Dreo App, and your Wi-Fi router. Then attempt the update again.
- **Device becomes unresponsive after update**: If the device becomes unresponsive after the firmware update, perform a power cycle on the device. If the problem persists, reset the device to its factory settings and re-add it to the Dreo App and Home Assistant.
