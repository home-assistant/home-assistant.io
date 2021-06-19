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
  - switch
ha_dhcp: true
---

The `Tuya v2` integration is developed for controlling [Powered by Tuya (PBT)](https://www.tuya.com) devices using [Tuya Open API](https://developer.tuya.com/en/docs/cloud/?_source=github), officially maintained by the Tuya Developer Team.

It applies to smart devices that you have added to the Tuya Smart or Smart Life app.

Before installation of `Tuya v2` integration, you need to create a cloud project on the [Tuya IoT Platform](https://iot.tuya.com/cloud/), link devices with this project by your account of Tuya Smart or Smart Life app, and authorize your cloud project to use Smart Home PaaS APIs. For more information, see [Tuya IoT Platform Configuration Guide Using Smart Home PaaS](https://developer.tuya.com/en/docs/iot/Platform_Configuration_smarthome?id=Kamcgamwoevrx).

**Important**: This integration is built on Tuya's standard [Open API](https://developer.tuya.com/en/docs/cloud/?_source=github), supports PBT devices of all types and most of the control commands. For more information, see [Standard Instruction Set](https://developer.tuya.com/en/docs/iot/standarddescription?id=K9i5ql6waswzq).

The integration currently supports the following Tuya's device types within Home Assistant:

- **Climate** - The platform supports air conditioners and heaters.
- **Cover** - The platform supports curtains.
- **Fan** - The platform supports most types of fans.
- **Light** - The platform supports most types of lights.
- **Switch** - The platform supports switches and sockets.

<!--
{% include integrations/config_flow.md %}
-->

You can check out this tutorial [How to Use Tuya Home Assistant Integration](https://developer.tuya.com/en/docs/iot/Home_Assistant_Integration?id=Kamcjcbvk2mu8) to learn how to use the `Tuya v2` integration. Once configuration flow is completed, the devices that you have added to the Tuya Smart or Smart Life app will be automatically discovered.

**Note:** If you get an error message saying **Invalid authentication**. 

Please check the following steps:

- Your cloud project on the [Tuya IoT Platform](https://iot.tuya.com/cloud/) was created after **May 25, 2021**.
- On the [Tuya IoT Platform](https://iot.tuya.com/cloud/), you have linked devices by using Tuya Smart or Smart Life app in your cloud project.
- You entered the correct account and password of the Tuya Smart or Smart Life app in the Account and Password fields. Note that the app account depends on which app (Tuya Smart or Smart Life) you used to link devices on the [Tuya IoT Platform](https://iot.tuya.com/cloud/).

## Important Note

The [Tuya integration](https://www.home-assistant.io/integrations/tuya/) will be deprecated by the end of 2021. The estimated deprecation date is **December 31, 2021**. We provide at least **6 months** for our Home Assistant users to migrate to the `Tuya v2` integration. Before that, these two integrations can coexist.

## Integration Migration

We always strive to provide the best development experience possible and keep updating our Home Assistant integration capabilities. Since the [Tuya integration](<https://www.home-assistant.io/integrations/tuya/>) supports limited categories and control commands, now we bring you our `Tuya v2` integration with extended support for more categories and commands.

`Tuya v2` is built on Tuya's standard APIs and tackles the limits of categories and accessible control commands. We deliver more development-friendly features including virtual device debugging, official authorization, and technical supports, which will help you efficiently work on development with the Tuya ecosystem.

The following table lists the differences between the [Tuya integration](https://www.home-assistant.io/integrations/tuya/) and `Tuya v2` integration:

| Items  | `Tuya` integration | `Tuya v2` integration |
|:------------- |:---------------| :-------------|
| Supported category     | Since the interface only applies to voice control scenarios and six types of Tuya's devices, the control commands and device types are obviously limited. | Built on Tuya's standard Open APIs, `Tuya v2` supports devices of all types and most of the control commands, as well as all the devices that are controlled based on cloud-to-cloud connectivity. For more information, see [Standard Instruction Set](https://developer.tuya.com/en/docs/iot/standarddescription?id=K9i5ql6waswzq). |
| Driver development  | Supports real device testing only. |  Supports option for testing virtual devices, which improves the efficiency of debugging drivers for different categories. |
| Verification method | Not supports official verification. | Supports Tuya official secure authorization and verification to protect your account from intrusion. |
| Technical support | No Tuya official support provided. | Supports Tuya official technical support and integration iteration. If you have any problems, submit a [service ticket](https://service.console.tuya.com/8/3/create?source=support_center) to request support. |
| Operation on Tuya IoT Platform | No operation is needed on the Tuya IoT Platform. | Create a cloud project of Smart Home PaaS on the Tuya IoT Platform. |
| Installation | Official installation method of Home Assistant. | Two options: copy method and HACS installation. |
| Integration initialization | Requires four items of information: App Account, App Account Password, Country Code, and Mobile App. | Requires seven items of information: Region, Access ID, Access Secret, Mobile App, Country Code, App Account, and App Account Password. Regarding the Mobile App, you must select the one you used to link devices on the Tuya IoT Platform.|
| App | Supports Tuya Smart, Smart Life, and Jinvoo Smart. | Supports Tuya Smart and Smart Life currently. To request support for OEM apps, submit a [service ticket](https://service.console.tuya.com/8/3/create?source=support_center) and let us know. |
| Response speed | Second | Millisecond |

### Things to note

- If you have never created a cloud project of **Smart Home PaaS** type on the [Tuya IoT Platform](https://iot.tuya.com/cloud/), you can create one directly. For more information, see [Create cloud project](https://developer.tuya.com/en/docs/iot/migrate-from-an-older-version?id=Kamee9wtbd00b#new).

- If you have created a cloud project of **Smart Home PaaS** type before **May 25, 2021**, you need to unlink devices in your old project and then go through the **Link Devices** process for your new project. For more information, see [Migrate from old project](https://developer.tuya.com/en/docs/iot/migrate-from-an-older-version?id=Kamee9wtbd00b#old).

> Note: If you have already created two cloud projects of **Smart Home PaaS** type, you need to sign up for a new account on the [Tuya IoT Platform](https://iot.tuya.com/cloud/) and create a cloud project again.

- If you are going to install the `Tuya v2` integration on your Home Assistant that is running the `Tuya` integration, the configuration and device control of the `Tuya` integration will not be impacted.
- If you have both `Tuya` and `Tuya v2` installed on your Home Assistant, removing the `Tuya v2` integration will not impact the configuration and device control of the `Tuya` integration.
- After you add virtual devices using Tuya Smart or Smart Life app, these devices are displayed in the device list of the `Tuya v2` integration only, not the `Tuya` integration. The real devices are displayed for both `Tuya` and `Tuya v2` integration.

### Procedure

#### Operation on the Tuya IoT Platform

##### Create cloud project 

Before installation, you need to create a cloud project of **Smart Home PaaS** type on the [Tuya IoT Platform](https://iot.tuya.com/cloud/). For more information about project creation, see [Tuya IoT Platform Configuration Guide Using Smart Home PaaS](https://developer.tuya.com/en/docs/iot/Platform_Configuration_smarthome?id=Kamcgamwoevrx).

##### Migrate from old project (for project of Smart Home PaaS type created before May 25, 2021)

**1.** Log in to the [Tuya IoT Platform](https://iot.tuya.com/).

**2.** In the navigation pane on the left, click **Cloud** > **Projects**. Select your project of **Smart Home PaaS** type.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/16226298483a3ad1eeaac.png)

**3.** Click **Link Devices** > **Link devices by App Account** and unlink the app.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1622629854320f3ed9225.png)

**4.** Create a new cloud project of **Smart Home PaaS** type. For more information about the procedure, see [Tuya IoT Platform Configuration Guide Using Smart Home PaaS](https://developer.tuya.com/en/docs/iot/Platform_Configuration_smarthome?id=Kamcgamwoevrx).

**5.** In your new project, click **Link Devices** > **Link devices by App Account**. Click **Add App Account** and scan the QR code with the Tuya Smart or Smart Life app.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1622629857c5a8128d537.png)

<img src="https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/16226298608042ef8d898.png" width="70%">

##### (Optional) Delete the old version

1. Log in to the Home Assistant.
2. Select **Configuration** > **Integrations**.
3. On the **Integrations** tab, select **Delete**.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1622032530158e850e27d.png)

##### Install the new integration

For more information about installing new integration, see [How to Use Tuya Home Assistant Integration](https://developer.tuya.com/en/docs/iot/Home_Assistant_Integration?id=Kamcjcbvk2mu8).
