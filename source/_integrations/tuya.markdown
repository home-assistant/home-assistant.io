---
title: Tuya
description: Instructions on how to setup the Tuya hub within Home Assistant.
ha_category:
  - Climate
  - Cover
  - Fan
  - Light
  - Scene
  - Switch
ha_iot_class: Cloud Polling
ha_release: 2021.9.7
ha_config_flow: true
ha_domain: tuya
ha_codeowners:
  - '@zlinoliver'
ha_platforms:
  - climate
  - cover
  - fan
  - light
  - scene
  - switch
ha_dhcp: true
---

The Tuya Home Assistant integration is developed for controlling **Powered by Tuya (PBT)** devices using the [tuya-iot-python-sdk](https://github.com/tuya/tuya-iot-python-sdk) (a python version of [Tuya Open API](https://developer.tuya.com/en/docs/iot/api-reference?id=Ka7qb7vhber64)), which is officially maintained by the Tuya Developer Team.

It applies to smart devices that you have added to the Tuya Smart or Smart Life app.

## Supported device categories
- **Climate**: Supports air conditioner, heater, thermostat.
- **Cover**: Supports curtain, curtain switch.
- **Fan**: Supports fan, air purifier, humidifier, dehumidifier.
- **Light**: Supports light, light strip, ambient light, light string, humidifier's light, Ceiling light.
- **Scene**: Supports smart scene.
- **Switch**: Supports switch, socket, power strip, smart kettle, breaker, pet water feeder, air purifier, diffuser.

## Quick installation and startup

### Configure on the Tuya IoT Platform

#### Prerequisites

You have created an account for [Tuya Smart or Smart Life app](https://developer.tuya.com/en/docs/iot/tuya-smart-app-smart-life-app-advantages?id=K989rqa49rluq#title-1-Download).

#### Create a project

1. Log in to the [Tuya IoT Platform](https://iot.tuya.com/).
2. In the left navigation bar, click **Cloud** > **Projects**.
3. On the page that appears, click **Create**.
4. In the **Create Project** dialog box, configure **Project Name**, **Description**, **Industry**, and **Availability Zone**. In the **Development Method** field, select **Smart Home PaaS** from the dropdown list.
	> **Note:** Select all available zones.

	![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1622030427d285b460b84.png)

5. Click **Create** to continue project configuration.
6. In **Configuration Wizard**, select **Device status notification** API.
   > **Note:** **Smart Home PaaS** API has been selected as default.

   ![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1622125804d11f95a118f.png)

7. Click **Authorize**.

#### Get authorization key

Click the created project to enter the **Project Overview** page and get the **Authorization Key** used to make API calls.


![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/162208268849af51b8af3.png)

#### Link devices by app account

Link devices by your app account and copy the **Device ID** in the **Device List** to the clipboard for specifying `device_id` later.

1. Navigate to the **Devices** tab.
2. Click **Link Tuya App Account** > **Add App Account**.
![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/162701375118ee3e1d0f4.png)
3. Scan the QR code that appears using the **Tuya Smart** app or **Smart Life** app.
![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/16220137160a864a6099d.png)

4. Click **Confirm** on your **Tuya Smart** or **Smart Life** app.
5. Navigate to the **Device List** tab. You can find the devices that have been added through your **Tuya Smart** or **Smart Life** account.
   ![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/goat/20210407/cf3e32f2f42548188e406e45b852ef6a.png)
</details>

### Install the Tuya Home Assistant integration

#### Install Home Assistant

Please refer to the [Home Assistant Official Installation](https://www.home-assistant.io/installation/) documentation to install **Home Assistant Core**.

You can also get help from [Set up Home Assistant Development Environment on Raspberry Pi](https://developer.tuya.com/en/demo/setuphomeassistantdevenv/?_source=b1441bb02314be3e594a0448891aac58) in Tuya Developer Demo Center.

#### Install the Tuya integration

In **Configuration** > **Integrations** > **ADD INTEGRATION**, search for the keyword **tuya** and select it for installation.
![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1627013411144507956ff.png)

#### Enter your Tuya credential

In the Tuya Integration window, select **Smart Home PaaS** and click **SUBMIT**.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1627379701127540ff6a2.png)

See the following table and enter your Tuya credential.

| Field | Description |
| ------- | -------- |
| Access ID and Access Secret| Go to your cloud project on [Tuya IoT Platform](https://iot.tuya.com/cloud/?_source=3a6f90da0e85f686f89c4f85c883e8f0). Find the **Access ID** and **Access Secret** on the **Project Overview** tab.|
| Mobile App | Must select the one you used to link devices on the Tuya IoT Platform. |
| Country Code | The country you select on logging in to Tuya Smart or Smart Life app.|
| Account | Tuya Smart or Smart Life app account. |
| Password | The password of your app account. |
> **Note**: The app mentioned in the table must be the one you used to link devices on the Tuya IoT Platform.
</details>

## Errorcode and troubleshooting

|Error Code|Error Message|Troubleshooting|
|:----|:--------|:------------------------------|
|1004| sign invalid| Incorrect Access ID or Access Secret. Please refer to [Tuya credential table](https://github.com/tuya/tuya-home-assistant/wiki/Install-Tuya-v2?_source=d10de34623e3daca5b02e3c31528a0c4#3-enter-your-tuya-credential).
|1106|permission deny|<ul><li> App account not linked with cloud project: On the [Tuya IoT Platform](https://iot.tuya.com/cloud/), you have linked devices by using Tuya Smart or Smart Life app in your cloud project. For more information, see [Link devices by app account](https://developer.tuya.com/en/docs/iot/Platform_Configuration_smarthome?id=Kamcgamwoevrx#title-3-Link%20devices%20by%20app%20account).</li><li> Incorrect username or password: Enter the correct account and password of the Tuya Smart or Smart Life app in the **Account** and **Password** fields. Note that the app account depends on which app (Tuya Smart or Smart Life) you used to link devices on the [Tuya IoT Platform](https://iot.tuya.com/cloud/).</li><li>Incorrect availability zone: See [Availability Zone](https://github.com/tuya/tuya-home-assistant/wiki/Tuya-IoT-Platform-Configuration-Guide-Using-Smart-Home-PaaS#region--available-zone-correspondence) and select the correct availability zone.</li><li>Incorrect countycode: Fill the [code](https://countrycode.org/) of the country you select on logging in to Tuya Smart or Smart Life app.</li></ul>|
|1100|param is empty| Empty parameter of username or app. Fill the parameters refer to [Tuya credential table](https://github.com/tuya/tuya-home-assistant/wiki/Install-Tuya-v2?_source=d10de34623e3daca5b02e3c31528a0c4#3-enter-your-tuya-credential).
|2017|schema does not exist| Incorrect app selected. Select the app you used to link devices in the cloud project.|
| 2406 | skill id invalid | Make sure that your cloud project on the [Tuya IoT Platform](https://iot.tuya.com/cloud/) should be created after May 25, 2021. Otherwise, you need to create a new project or migrate data to a new project. For more information, see [Operation on the Tuya IoT Platform](https://developer.tuya.com/en/docs/iot/migrate-from-an-older-version?id=Kamee9wtbd00b#title-3-Operation%20on%20the%20Tuya%20IoT%20Platform).|
| 28841105 |No permissions. This project is not authorized to call this API| Some APIs are not authorized, please  [Subscribe](https://developer.tuya.com/en/docs/iot/applying-for-api-group-permissions?id=Ka6vf012u6q76#title-2-Subscribe%20to%20cloud%20products) then [Authorize](https://developer.tuya.com/en/docs/iot/applying-for-api-group-permissions?id=Ka6vf012u6q76#title-3-Authorize%20projects%20to%20call%20the%20cloud%20product). The following APIs must be subscribed for this tutorial: <ul><li>Authorization</li><li>Smart Home Devices Management</li><li>Smart Home Family Management</li><li>Smart Home Scene Linkage</li><li>Smart Home Data Service</li><li>Device status notification</li></ul>|

## Related Documents

### How to Contribute
* [How to Develop a New Driver](https://github.com/tuya/tuya-home-assistant/wiki/How-to-Develop-a-New-Driver)
* [How to Get the Log](https://github.com/tuya/tuya-home-assistant/wiki/How-to-Get-the-Log)
* [Supported Device Categories](https://github.com/tuya/tuya-home-assistant/wiki/Supported-Device-Category)

### Documentation
* [How does the Integration work](https://github.com/tuya/tuya-home-assistant/wiki/How-the-Integration-works)
* [Set up Home Assistant on a Raspberry Pi](https://github.com/tuya/tuya-home-assistant/wiki/Set-up-Home-Assistant-on-a-Raspberry-Pi)
* [FAQs](https://github.com/tuya/tuya-home-assistant/wiki/FAQs)


{% include integrations/config_flow.md %}
