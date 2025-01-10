---
title: Dreo
description: Instructions on how to set up Dreo fans within Home Assistant.
ha_category:
  - Fan
ha_release: 2025.1
ha_domain: dreo
ha_platforms:
  - fan
ha_integration_type: integration
---

The Dreo integration enables you to control smart switches and outlets connected to the Dreo App.

The devices must be added to the Dreo App before this integration can discover them.

The following platforms are supported:

- **fan**

## Supported devices

This integration supports devices controllable by the Dreo App.  The following devices are supported by this integration:

### Fans

- DR-HTF001S: Tower Fan
- DR-HTF002S: Tower Fan
- DR-HTF004S: Tower Fan
- DR-HTF005S: Tower Fan
- DR-HTF007S: Tower Fan
- DR-HTF008S: Tower Fan
- DR-HTF009S: Tower Fan
- DR-HTF010S: Tower Fan

## Prerequisite

Before you can use this integration, all devices must be registered with the
Dreo App. Once registration is complete, you can add the Dreo integration in Home Assistant through the UI.

## Configuration instructions

1. **Open Home Assistant UI**: Log in to your Home Assistant web interface. Navigate to the "Settings" section, usually found in the sidebar.
2. **Access Integrations**: In the "Settings" menu, click on "Integrations". This will take you to a page listing all the available integrations.
3. **Search for Dreo**: Use the search bar on the Integrations page to search for the "Dreo" integration.
4. **Initiate Setup**: Once you've located the Dreo integration, click on it to start the setup wizard. Follow the on-screen prompts to authorize Home Assistant to access your Dreo App account. This will involve logging into your Dreo App credentials within the Home Assistant setup flow.
5. **Complete Setup**: After providing the necessary information and authorizing the connection, the integration should be set up successfully. You should then be able to control your Dreo devices from within Home Assistant.

## Fan exposed attributes

Dreo Tower Fan will expose the following details depending on the features supported by the model:

| Attribute | Description                                                  | Example |
| --------- | ------------------------------------------------------------ | ------- |
| `mode`    | The current mode the device is in. | "manual", "auto", "sleep" |
| `speed`   | The current speed setting (1-4). | 1 |
| `oscillate` | Whether oscillation is enabled. | true/false |

All attributes are supported by models: DR-HTF001S/002S/004S/005S/007S/008S/009S/010S

## Troubleshooting

### Device not discovered

- **Check Dreo App Connection**: Ensure that your devices are properly connected to the Dreo App. Try restarting the Dreo App and checking if the devices are still visible and controllable within it. If not, re-pair the devices with the Dreo App following the app's. official pairing instructions.
- **Home Assistant Network Issues**: Make sure that your Home Assistant instance has network access. You can test this by trying to access other online services from within Home Assistant (for example, checking the weather integration if it's set up). If there are network problems, troubleshoot your Home Assistant's network connection, which may involve checking your router settings, Wi-Fi passwords, or Ethernet connections.
- **Permissions**: Double-check that you've granted all the necessary permissions during the integration setup process. Incorrect permissions can prevent Home Assistant from discovering your Dreo devices.

### Inability to control devices

- **Device State Sync**: Sometimes, the device state may not sync correctly between the Dreo App and Home Assistant. Try toggling the device on/off, changing the mode, or adjusting the speed from within the Dreo App, and then refreshing the device page in Home Assistant to see if the state updates.
- **App Version Mismatch**: Ensure that both the Dreo App and Home Assistant are running up-to-date versions. An outdated version of either software could lead to compatibility issues and control problems. Update the Dreo App from the official app store for your device, and check for Home Assistant updates in the Home Assistant UI's update section.
