---
title: "PTDevices"
description: "home-assistant.io web presence"
ha_release: "0.38"
ha_category: Integration 
ha_iot_class: "Cloud Polling"
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@paremtech-inc'
  - '@frogman85978'
ha_domain: ptdevices
related:
  - docs: /voice_control/s3_box_voice_assistant/
    title: Creating a ESP32-S3-BOX-3 voice assistant
  - url: https://esphome.io/projects/index.html
    title: ESPHome projects website
---

The `PTDevices` integration allows you to integrate your PTDevice cistern monitor into Home Assistant.
Use cases include:

- with the notify integration installed, you can send notifications for low level.
- Setup Automations to turn off pumps when running low.
- Automatically run appliances that use water after a load has been delivered.

## Token API key

You will need to create a token for your PTDevices account if your haven't done so already. If your have already generated a Token API token, you can use it for setting up more devices linked to the same account.

1. Login to your PTDevices account that contains the devices your wish to integrate.
2. Go to **My Account** page from the left hand side menu or [https://www.ptdevices.com/profile](https://www.ptdevices.com/profile)
3. Go to the **Settings** page from the top menu.
4. At the bottom of this page, click the **Regenerate API Token** button.
5. Copy the generated API token to a safe location for setting up future devices. This API token will be used together with the MAC address of your PTDevice to when setting up the PTDevices integration in Home Assistant.

{% include integrations/config_flow.md %}

## Supported Devices

- PTLevel Long Range Wireless
- PTLevel Long Range Wireless - Septic
- PTLevel Long Range Wireless - Deep Well
- PTLevel Wired Wifi
- PTLevel Wired Wifi - Septic
- PTLevel Wired Wifi - Temperature Probe

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

## ENTITIES

The PTDevices integration provides the following entities.

## Sensors

This integration provides sensors for the following information from PTDevices.

{% note %}

Some sensors are disabled by default, since they provide information that is only useful for advanced users. You can manually enable them in **{% my entities title="Settings -> Devices & Services -> Entities" %}** -> the sensor entity you want to enable -> Advanced settings -> Enabled.

{% endnote %}

- **Level Depth**:
  - **Description**: The depth of the remaining fluid.
  - **Available for models**: All
- **Level Percent**:
  - **Description**: The remaining level in percent.
  - **Available for models**: All
- **Level Volume**:
  - **Description**: The volume of remaining fluid.
  - **Available for models**: All
- **Probe Temperature**:
  - **Description**: The current temperature measured by the external temperature probe.
  - **Available for models**: PTLevel Wired Wifi With Temperature Probe
- **Status**:
  - **Description**: The current status of the device. e.g. Working or Not Connected.
  - **Available for models**: All
- **Battery Status**:
  - **Description**: The current status of the onboard batteries. e.g. Good or Low
  - **Available for models**: All battery powered models
- **Battery Voltage**:
  - **Description**: The current voltage reading of the onboard batteries.
  - **Available for models**: All battery powered models
  - **Remarks**: Disabled by default for advanced uses.
- **WiFi Signal Strength**:
  - **Description**: The signal strength of the WiFi at the receiver/WiFI device.
  - **Available for models**: All
  - **Remarks**: Disabled by default for advanced uses.
- **LoRa Signal Strength**:
  - **Description**: The signal strength between the receiver and transmitter.
  - **Available for models**: PTLevel Long Range Wireless Only
  - **Remarks**: Disabled by default for advanced uses.
- **Last RX Report**:
  - **Description**: The last time the receiver/WiFi device reported to PTDevices.
  - **Available for models**: All
  - **Remarks**: Disabled by default for advanced uses.
- **Last TX Report**:
  - **Description**: The last time the transmitter reported to the receiver.
  - **Available for models**: PTLevel Long Range Wireless Only.
  - **Remarks**: Disabled by default for advanced uses.

## Data Updates

The integration {% term polling polls %} data from PTDevices every 60 seconds by default.

## Known Limitations

This integration does not allow you to change the settings of the device. You must go to [PTDevices.com](https://ptdevices.com) to change device settings.

{% include integrations/remove_device_service.md %}