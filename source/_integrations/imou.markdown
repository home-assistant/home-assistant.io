---
title: Imou
description: Integrate IMOU smart devices into Home Assistant.
ha_category:
  - Camera
ha_iot_class: Cloud Polling
ha_release: 2025.12
ha_config_flow: true
ha_domain: imou
ha_codeowners:
  - '@Imou-OpenPlatform'
ha_platforms:
  - camera
  - gateway central control
  - button
ha_integration_type: integration
---

The **Imou** {% term integration %} uses [Imou Open Platform](https://open.imoulife.com/) APIs to operate Imou camera under the account.

By integrating this component, users can remotely view and operate devices in Home Assistant.

### Security and privacy considerations
This integration communicates with Imou's cloud services. Your camera and other devices feeds, as well as device control commands, will be routed through Imou's servers. Please review Imou's [privacy policy](https://open.imoulife.com/book/http/privacy.html) and terms of service before proceeding.

## Prerequisites
Before using Imou integration, you need to create an Imou Open Platform account:

1. Visit the official website of [Imou Open Platform](https://open.imoulife.com/).
2. Register an Imou account (if you already have one, log in directly), and select **control board** on the official website.
3. Follow the prompts to complete **App Information**, obtain **AppId** and **AppSecret**.
4. Once the account creation is completed, start integrating the imou plugin.

## API request description
1. Each user's appId has a monthly quota of 30000 free API requests. The excess amount will be charged at the [unit price](https://open.imoulife.com/price)；
2. The API request domain name is divided into three regional domain names based on global regions. Choose the most suitable domain name according to your registered account. For details, You can refer to the [Development Specification](https://open.imoulife.com/book/http/develop.html);
3. For more API information, refer to the 'HTTP interface' section in the [Development Document](https://open.imoulife.com/book/en).

{% include integrations/config_flow.md %}

## Add devices

You need to add the device through the Imou Open Platform or Imou client first. The added device can be operated on Home Assistant.

If you need to remotely operate the device, you need to meet the following network requirements:
- Ensure your devices and Home Assistant instance have stable internet connectivity.
- Required bandwidth: Minimum 2 Mbps upload/download per camera for HD streaming.
- Devices must be able to connect to Imou's cloud servers.

## Supported functionality

### Camera PTZ function
Remote control to rotate the camera lens direction to view monitoring images from different directions, supporting control in four directions: `up`, `down`, `left`, `right`.The premise is that the camera supports PTZ capability.

### Device mute
Gateway devices can be muted with one click when an alarm sound is triggered.

### Restart device
Remote control to restart devices, mainly used for certain configurations that require device restart to take effect. One click remote restart of device.

## Troubleshooting

### Can't log in to Imou Cloud, it prompts "Invalid appId or appSecret"
Please ensure that the appId, appSecret and URL domain name you entered are correct.

### My free API quota run out quickly
The integrated component will periodically request platform API to update device information internally. You can extend the update cycle in the CONFIGURE column of the integration details page.

### Sometimes the button turns gray and cannot be clicked
Please ensure that the device is online and its power supply and network connection are functioning properly. If the device is offline, some buttons will not be clickable.