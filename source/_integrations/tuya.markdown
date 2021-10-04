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
ha_release: 0.74
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

The Tuya integration allows integrating all Powered by Tuya devices you have added to the Tuya Smart and Tuya Smart Life apps. This integration is officially maintained by Tuya.

## Supported platforms

- **Climate**: air conditioner, heater, thermostat.
- **Cover**: curtain, curtain switch.
- **Fan**: fan, air purifier, humidifier, dehumidifier.
- **Light**: light, light strip, ambient light, light string, humidifier's light, ceiling light.
- **Scene**: smart scene.
- **Switch**: switch, socket, power strip, smart kettle, breaker, pet water feeder, air purifier, diffuser.

## Configuration of the Tuya IoT Platform

### Prerequisites

Your devices need to first be added in the [Tuya Smart or Smart Life app](https://developer.tuya.com/en/docs/iot/tuya-smart-app-smart-life-app-advantages?id=K989rqa49rluq#title-1-Download).

You will also need to create an account in the [Tuya IoT Platform](https://iot.tuya.com/).
This is a separate account to the one you made for the app. You cannot log in with your app's credentials.

#### Create a project

**1.** Log in to the [Tuya IoT Platform](https://iot.tuya.com/).

**2.** In the left navigation bar, click `Cloud` > `Development`. If this is your first time setting up an account you will be asked to subscribe to a Cloud Development Plan. You can select and "purchase" the Trial Edition.

**3.** On the page that appears, click `Create Cloud Project`.

**4.** In the `Create Project` dialog box, configure `Project Name`, `Description`, `Industry`, and `Data Center`. For the `Development Method` field, select `Smart Home` from the dropdown list. For the `Data Center` field, select the zone you are located in.

![](/images/integrations/tuya/image_001.png)

**5.** Click `Create` to continue project configuration.

**6.** In Configuration Wizard, select the `Device Status Notification` API. `Smart Home` API products should already be selected by default.

![](/images/integrations/tuya/image_002.png)

**7.** Click `Authorize`.

#### Link devices by app account

**1.** Navigate to the `Devices` tab.

**2.** Click `Link Tuya App Account` > `Add App Account`.

![](/images/integrations/tuya/image_004.png)

**3.** Scan the QR code that appears using the `Tuya Smart` app or `Smart Life` app.

![](/images/integrations/tuya/image_005.png)

**4.** Click `Confirm` on your `Tuya Smart` or `Smart Life` app.

**5.** Navigate to the `All Devices` tab. Here you should be able to find the devices that have been added through your `Tuya Smart` or `Smart Life` account, as a confirmation everything worked.

![](/images/integrations/tuya/image_006.png)

#### Get authorization key

Click the created project to enter the `Project Overview` page and get the `Authorization Key` used to make API calls. You will need these for setting up the integration. in the next step.

![](/images/integrations/tuya/image_003.png)

{% include integrations/config_flow.md %}

## Error codes and troubleshooting

|Error Code|Error Message|Troubleshooting|
|:----|:--------|:------------------------------|
|1004| sign invalid| Incorrect Access ID or Access Secret. Please refer to [Tuya credential table](https://github.com/tuya/tuya-home-assistant/wiki/Install-Tuya-v2?_source=d10de34623e3daca5b02e3c31528a0c4#3-enter-your-tuya-credential).
|1106|permission deny|<ul><li> App account not linked with cloud project: On the [Tuya IoT Platform](https://iot.tuya.com/cloud/), you have linked devices by using Tuya Smart or Smart Life app in your cloud project. For more information, see [Link devices by app account](https://developer.tuya.com/en/docs/iot/Platform_Configuration_smarthome?id=Kamcgamwoevrx&_source=7a356dd493196a01bb9021b7680a2a45#title-3-Link%20devices%20by%20app%20account).</li><li> Incorrect username or password: Enter the correct account and password of the Tuya Smart or Smart Life app in the **Account** and **Password** fields. Note that the app account depends on which app (Tuya Smart or Smart Life) you used to link devices on the [Tuya IoT Platform](https://iot.tuya.com/cloud/).</li><li>Incorrect availability zone: See [Availability Zone](https://github.com/tuya/tuya-home-assistant/wiki/Tuya-IoT-Platform-Configuration-Guide-Using-Smart-Home-PaaS#region--available-zone-correspondence) and select the correct availability zone.</li><li>Incorrect countycode: Fill the [code](https://countrycode.org/) of the country you select on logging in to Tuya Smart or Smart Life app.</li></ul>|
|1100|param is empty| Empty parameter of username or app. Fill the parameters refer to [Tuya credential table](https://github.com/tuya/tuya-home-assistant/wiki/Install-Tuya-v2?_source=d10de34623e3daca5b02e3c31528a0c4#3-enter-your-tuya-credential).
|2017|schema does not exist| Incorrect app selected. Select the app you used to link devices in the cloud project.|
| 2406 | skill id invalid | Make sure that your cloud project on the [Tuya IoT Platform](https://iot.tuya.com/cloud/) should be created after May 25, 2021. Otherwise, you need to create a new project or migrate data to a new project. For more information, see [Operation on the Tuya IoT Platform](https://developer.tuya.com/en/docs/iot/migrate-from-an-older-version?id=Kamee9wtbd00b#title-3-Operation%20on%20the%20Tuya%20IoT%20Platform).|
| 28841105 |No permissions. This project is not authorized to call this API| Some APIs are not authorized, please  [Subscribe](https://developer.tuya.com/en/docs/iot/applying-for-api-group-permissions?id=Ka6vf012u6q76#title-2-Subscribe%20to%20cloud%20products) then [Authorize](https://developer.tuya.com/en/docs/iot/applying-for-api-group-permissions?id=Ka6vf012u6q76#title-3-Authorize%20projects%20to%20call%20the%20cloud%20product). The following APIs must be subscribed for this tutorial: <ul><li>Authorization</li><li>Smart Home Devices Management</li><li>Smart Home Family Management</li><li>Smart Home Scene Linkage</li><li>Smart Home Data Service</li><li>Device status notification</li></ul>|

## Related Documents

- [Supported Device Category](https://github.com/tuya/tuya-home-assistant/wiki/Supported-Device-Category?_source=f5f782752be3c4a9157ec47514d6091b)
- [How to Develop a New Driver](https://github.com/tuya/tuya-home-assistant/wiki/How-to-Develop-a-New-Driver?_source=dbf3bf17966af48325e4328b2535eefe)
- [FAQs](https://github.com/tuya/tuya-home-assistant/wiki/FAQs)
