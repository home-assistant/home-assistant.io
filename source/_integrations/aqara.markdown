---
title: Aqara
description: Instructions on how to set up the aqara devices within Home Assistant..
ha_release: 0.0.1
ha_category:
  - Binary Sensor
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@wumao'
  - '@chenliuyang1989'
ha_domain: aqara
ha_platforms:
  - binary_sensor
ha_integration_type: integration
---

Aqara integration allows users to integrate binary devices and scenes on the Aqara Home app into Home Assistant. After the account authorization, the supported devices and scenes will be automatically synchronized to the Home Assistant.

## Configuration of the Aqara IoT Platform

### PREREQUISITES

- You will need to create an account in the Aqara Home app.
- Your devices also need first to be added in the Aqara Home app.

### ADD DEVICES BY AQARA HOME APP

1. Download and login Aqara Home app.

2. Click on the **Add Device** button on the Device page.

3. Select device type and complete the configuration according to the introduction. 

   > Note: Add the Hub first, then add the sub-devices.

## Configuration

Please follow the steps below:

1. In the left navigation bar of Home Assistant, click on **Configuration**.
3. Select **Devices and Services** from the menu.
4. In the bottom right corner, click on the **ADD INTEGRATION** button.
5. Search and select **Aqara**.
6. Complete the configuration according to the page introduction.

**Country**

Choose the country as Aqara Home app. Currently support China mainland, Europe, South Korea, Russia, United States, Singapore.

**Account**

Aqara Home app account.

**Password**

The password of your Aqara Home app account.
