---
title: PTDevices
description: Instructions on how to integrate your PTLevel into Home Assistant.
ha_release: 2026.6
ha_category:
  - Sensor
ha_platforms:
  - sensor
ha_iot_class: Cloud Polling
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@ParemTech-Inc'
  - '@frogman85978'
ha_domain: ptdevices
ha_integration_type: hub
---

The **PTDevices** {% term integration %} allows you to integrate your [PTLevel](https://paremtech.com/wireless-ptlevel/) into Home Assistant.
Use cases include:

- Send notifications for low level or excessive usage.
- Setup Automations to turn off pumps when running low.
- Setup Automations to run appliances after water has been delivered.

## Supported devices

- PTLevel Long Range Wireless
- PTLevel Long Range Wireless - Septic
- PTLevel Long Range Wireless - Deep Well
- PTLevel Wired Wifi
- PTLevel Wired Wifi - Septic
- PTLevel Wired Wifi - Temperature Probe

## Prerequisites

You will need to create a token for your PTDevices account if you haven't done so already. If you have already generated a Token API token, you don't need to generate another one.

1. Log in to your PTDevices account that contains the devices you wish to integrate.
2. Go to the **My Account** page from the left hand side menu or [https://www.ptdevices.com/profile](https://www.ptdevices.com/profile).
3. Go to the **Settings** page from the top menu.
4. At the bottom of this page, select the **Regenerate API Token** button.
5. Copy the generated API token to a safe location. This API token will be used when setting up the PTDevices integration in Home Assistant.

{% include integrations/config_flow.md %}

## Examples

### Send a push notification when Low on water

```yaml
alias: "PTDevice - Low Level Notification"
description: "Notify when the level drops below a set level"
mode: single
triggers:
  - trigger: numeric_state
    entity_id:
      - sensor.TARGET_PTDEVICE_level_percent
    below: 15
conditions: []
actions:
  - action: notify.TARGET_MOBILE_DEVICE
    data:
      message: "Your PTDevice has dropped below 15%, its time to order water."
      title: "Your PTDevice is below 15%"
```

Replace TARGET_PTDEVICE and TARGET_MOBILE_DEVICE with your actual devices.

## Supported functionality

The PTDevices integration provides the following entities.

{% note %}

Some sensors are disabled by default because they provide information that is only useful to advanced users. You can manually enable them in {% my entities title="**Settings** > **Devices & services** > **Entities**" %}> the sensor entity you want to enable > **Advanced settings** > **Enabled**.

{% endnote %}

### Sensors

- **Level depth**:
  - **Description**: The depth of the remaining fluid.
  - **Available for models**: All
  - **Unit**: Meters
- **Level percent**:
  - **Description**: The remaining level in percent.
  - **Available for models**: All
  - **Unit**: %
- **Level volume**:
  - **Description**: The volume of remaining fluid.
  - **Available for models**: All
  - **Unit**: Liters
- **Probe temperature**:
  - **Description**: The current temperature measured by the external temperature probe.
  - **Available for models**: PTLevel Wired Wifi With Temperature Probe
  - **Unit**: °C
- **Status**:
  - **Description**: The current status of the device. For example, **Working** or **Not connected**.
  - **Available for models**: All
- **Battery voltage**:
  - **Description**: The current voltage reading of the onboard batteries.
  - **Available for models**: All battery powered models
  - **Remarks**: Disabled by default.
  - **Unit**: Volts
- **Wi-Fi signal strength**:
  - **Description**: The signal strength of the WiFi at the receiver/WiFI device.
  - **Available for models**: All
  - **Remarks**: Disabled by default.
  - **Unit**: dBm
- **LoRa signal strength**:
  - **Description**: The signal strength between the receiver and transmitter.
  - **Available for models**: PTLevel Long Range Wireless Only
  - **Remarks**: Disabled by default.
  - **Unit**: dBm

## Data updates

The integration {% term polling polls %} data from PTDevices every 60 seconds by default.

## Known limitations

- This integration does not allow you to change the settings of the device. You must go to [PTDevices.com](https://ptdevices.com) to change device settings.

## Removing the integration

This integration follows the standard integration removal. No extra steps required.

{% include integrations/remove_device_service.md %}
