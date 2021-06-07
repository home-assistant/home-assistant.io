---
title: Tuya v2
description: Instructions on how to setup the Tuya hub within Home Assistant.
ha_category:
  - Climate
  - Cover
  - Fan
  - Light
  - Switch
ha_iot_class: Cloud Polling
ha_release: 2021.6.0
ha_config_flow: true
ha_domain: tuya
ha_codeowners:
  - '@zlinoliver'
ha_platforms:
  - climate
  - cover
  - fan
  - light
  - switch
ha_dhcp: true
---

The `tuya v2` integration is developed for controlling [Powered by Tuya (PBT)](https://www.tuya.com) devices using [Tuya Open API](https://developer.tuya.com/en/docs/cloud/?_source=github), officially maintained by the Tuya Developer Team.

It includes smart devices linked with the Tuya Smart and Smart Life apps. 

It requires you to create a cloud project on the [Tuya IoT Platform](https://iot.tuya.com/), added at least one device or one virtual device, and authorized your cloud project to use related Smart Home PaaS APIs. For more information, see [Tuya IoT Platform Configuration Guide Using Smart Home PaaS](https://developer.tuya.com/en/docs/iot/Platform_Configuration_smarthome?id=Kamcgamwoevrx).

**Important**: This integration is built on Tuya's standard [Open API](https://developer.tuya.com/en/docs/cloud/?_source=github), supports PBT devices of all types and most of the control commands. For more information, see [Standard Instruction Set](https://developer.tuya.com/en/docs/iot/standarddescription?id=K9i5ql6waswzq). 

The integration is currently support for the following device types within Home Assistant:

- **Climate** - The platform supports the air conditioner and heater.
- **Cover** - The platform supports curtains.
- **Fan** - The platform supports most kinds of Tuya fans.
- **Light** - The platform supports most kinds of Tuya light.
- **Switch** - The platform supports switch and socket.

{% include integrations/config_flow.md %}

You can check this tutorial [How to Use Tuya Home Assistant Integration](https://developer.tuya.com/en/docs/iot/Home_Assistant_Integration?id=Kamcjcbvk2mu8) to learn how to use the integration. Once configuration flow is completed, the devices configured in your Tuya Smart or Smart Life app will be automatically discovered. 

**Note:** If you get an error message saying **Invalid authentication**. 

Please check the following steps:

- Your cloud project on the [Tuya IoT Platform](https://iot.tuya.com/cloud/) was created after **May 25, 2021**.
- On the [Tuya IoT Platform](https://iot.tuya.com/cloud/), you have linked devices by using Tuya Smart or Smart Life app in your cloud project.
- You entered the correct account and password of the Tuya Smart or Smart Life app in the Account and Password fields. Note that the app account depends on which app (Tuya Smart or Smart Life) you used to link devices on the [Tuya IoT Platform](https://iot.tuya.com/cloud/).

## Important Note

The old Tuya integration: <https://www.home-assistant.io/integrations/tuya/> will be deprecated by the end of 2021, the estimated deprecation date is **2021.12.31.** We will provide at least **6 months** for our Home Assistant users to migrate to the new integration. Before that, these two integrations will exist at the same time.

## Integration Migration

We always strive to provide the best development experience possible and keep updating our Home Assistant integration capabilities. Since the [old version](https://www.home-assistant.io/integrations/tuya/) of Tuya Home Assistant integration supports limited categories and control commands, now we bring you our new integration with extended support for more categories and commands.

Our new integration is built on Tuya’s standard APIs and tackles the limits of categories and accessible control commands. We deliver more development-friendly features including virtual device debugging, official authorization, and technical supports, which will help you efficiently work on development with the Tuya ecosystem.

The following table lists the differences between the old and new version:

| Items  | Old integration | New integration |
|:------------- |:---------------| :-------------|
| Supported category     | Since the old interface only applies to voice control scenarios and six types of Tuya’s devices, the control commands and device types are obviously limited. |         Built on Tuya’s standard OpenAPI, the new integration supports devices of all types and most of the control commands. Supports all the devices that are controlled based on cloud-to-cloud connectivity. For more information, see [Standard Instruction Set](https://developer.tuya.com/en/docs/iot/standarddescription?id=K9i5ql6waswzq). |
| Driver development  | Supports real device testing only. |  Supports option for testing virtual devices, which improves the efficiency of debugging drivers for different categories. |
| Verification method | Not supports official verification. | Supports Tuya official secure authorization and verification to protect your account from intrusion. |
| Technical support | Not supports official support. | Supports official technical support and integration iteration. If you have any problems, submit a service [ticket](https://service.console.tuya.com/8/3/create?source=support_center) to request support. |
| Operation on Tuya IoT Platform | No operation is needed on the Platform. | Create a cloud project of Smart Home PaaS. |
| Installation | Official installation method of Home Assistant. | Two options: copy method and HACS installation. |
| Integration initialization | Requires four items of information: Account of Tuya IoT Platform, Account Password, Country Code, and Mobile App. | Requires seven items of information: Region, Access ID, Access Secret, Mobile App, Country Code, App Account, and App Account Password. Regarding the Mobile App, you must select the one you used to link devices on the Tuya IoT Platform.|
| App | Supports Tuya Smart, Smart Life, and Jinvoo Smart. | Supports Tuya Smart and Smart Life currently. To request support for OEM apps, submit a [service ticket](https://service.console.tuya.com/8/3/create?source=support_center) and let us know. |
| Response speed | Second | Millisecond |

### Things to note

- If you have never created a cloud project of **Smart Home PaaS** type on the [Tuya IoT Platform](https://iot.tuya.com/cloud/), you can create one directly. For more information, see [Create cloud project](https://developer.tuya.com/en/docs/iot/migrate-from-an-older-version?id=Kamee9wtbd00b#new).

- If you have created a cloud project of **Smart Home PaaS** type before **May 25, 2021**, you need to unlink devices in your old project and then go through the **Link Devices** process for your new project. For more information, see [Migrate from old project](https://developer.tuya.com/en/docs/iot/migrate-from-an-older-version?id=Kamee9wtbd00b#old).

> Note: If you have already created two cloud projects of **Smart Home PaaS** type, you need to sign up for a new account on the [Tuya IoT Platform](https://iot.tuya.com/cloud/) and create a cloud project again.

### Procedure

#### Operation on the Tuya IoT Platform

##### Create cloud project 

Before installation, you need to create a cloud project of **Smart Home PaaS** type on the [Tuya IoT Platform](https://iot.tuya.com/cloud/). For more information about project creation, see [Tuya IoT Platform Configuration Guide Using Smart Home PaaS](https://developer.tuya.com/en/docs/iot/Platform_Configuration_smarthome?id=Kamcgamwoevrx).

##### Migrate from old project (for project of Smart Home PaaS type created before May 25, 2021)

**1.** Log in to the [Tuya IoT Platform](https://iot.tuya.com/).

**2.** In the navigation pane on the left, click **Cloud** > **Projects**. Select your project of **Smart Home PaaS** type.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/16226298483a3ad1eeaac.png)

**3.** Click Link Devices > Link devices by App Account and unlink the app.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1622629854320f3ed9225.png)

**4.** Create a new cloud project of **Smart Home PaaS** type. For more information about the procedure, see [Tuya IoT Platform Configuration Guide Using Smart Home PaaS](https://developer.tuya.com/en/docs/iot/Platform_Configuration_smarthome?id=Kamcgamwoevrx).

**5.** In your new project, click **Link Devices** > **Link devices by App Account**. Click **Add App Account** and scan the QR code with the Tuya Smart or Smart Life app.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1622629857c5a8128d537.png)

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/16226298608042ef8d898.png)
