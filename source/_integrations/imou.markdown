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

The Imou integration uses [Imou Open Platform](https://open.imoulife.com/) APIs to operate Imou camera under the account.

By integrating this component, developers can remotely view and operate devices in Home Assistant.

### Security Considerations
This integration communicates with Imou's cloud services. Your camera and other devices  feeds and device control commands will be routed through Imou's servers. Please review Imou's privacy policy and terms of service before proceeding.
You can refer to https://open.imoulife.com/book/http/privacy.html.

## Prerequisites 
Before using Imou integration, you need to create an Imou Open Platform account and become a developer. Please follow the steps below:

1. Visit the official website of [Imou Open Platform](https://open.imoulife.com/).
2. Register an Imou account (if you already have, log in directly), and click on **control board** on the official website.
3. Follow the prompts to complete **App Information**, obtain **AppId** and **AppSecret**.
4. Account creation completed, start integrating imou plugin.

## API Request Description
1. Each developer's appId has a monthly quota of 30000 free API requests. The excess amount will be charged at the unit price, please refer to: https://open.imoulife.com/price ；
2. The API request domain name is divided into three regional domain names based on global regions. Please choose the most suitable domain name according to your registered account. You can refer to: https://open.imoulife.com/book/http/develop.html ;
3. For more API information, please refer to 'HTTP interface' chapter on https://open.imoulife.com/book/en .

{% include integrations/config_flow.md %}

## Add Devices

Please add the device through the Imou Open Platform or Imou client first. The added device can be operated on Home Assistant.

If you need to remotely operate the device, you need to meet the following network requirements:
- Ensure your devices and Home Assistant instance have stable internet connectivity
- Required bandwidth: Minimum 2Mbps upload/download per camera for HD streaming
- Devices must be able to connect Imou's cloud servers

## Features

### Camera PTZ function
Remote control to rotate the camera lens direction to view monitoring images from different directions, supporting control in four directions: `up`, `down`, `left`, `right`.The premise is that the camera supports PTZ capability.

### Device Mute
Gateway devices can be muted with one click when an alarm sound is triggered.

### Restart Device
Remote control to restart devices, mainly used for certain configurations that require device restart to take effect. One click remote restart of device.

## More information
Please stay tuned for more integrated feature updates.

## FAQ
### Quertion 1: When entering information to log in to Imou Cloud, it prompts "Invalid appId or appSecret".
Answer: This is due to incorrect account information. Please confirm that you have entered the correct appId and appSecret, and selected the correct URL domain name.

### Quertion 2: Why did my free API quota run out quickly?
Answer: The integrated component will periodically request platform API to update device information internally. You can extend the update cycle in the CONFIGURE column of the integration details page.

### Quertion 2: Why sometimes the button turns gray and cannot be clicked?
Answer: Button functions require the device to be online in order to operate properly, so if the device is offline, these functions will not be available. Please check if the device power or network connection is normal.