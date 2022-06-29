---
title: Tuya
description: Instructions on how to set up the Tuya hub within Home Assistant.
ha_category:
  - Binary Sensor
  - Camera
  - Climate
  - Cover
  - Doorbell
  - Fan
  - Humidifier
  - Light
  - Number
  - Scene
  - Select
  - Siren
  - Switch
  - Vacuum
ha_iot_class: Cloud Push
ha_release: 0.74
ha_config_flow: true
ha_domain: tuya
ha_codeowners:
  - '@Tuya'
  - '@zlinoliver'
  - '@frenck'
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - camera
  - climate
  - cover
  - diagnostics
  - fan
  - humidifier
  - light
  - number
  - scene
  - select
  - sensor
  - siren
  - switch
  - vacuum
ha_dhcp: true
ha_integration_type: integration
---

The Tuya integration integrates all Powered by Tuya devices you have added to the Tuya Smart and Tuya Smart Life apps.

All Home Assistant platforms are supported by the Tuya integration, except the lock and remote platform.

## Configuration of the Tuya IoT Platform

### Prerequisites

- Your devices need first to be added in the [Tuya Smart or Smart Life app](https://developer.tuya.com/en/docs/iot/tuya-smart-app-smart-life-app-advantages?id=K989rqa49rluq#title-1-Download).
- You will also need to create an account in the [Tuya IoT Platform](https://iot.tuya.com/).
This is a separate account from the one you made for the app. You cannot log in with your app's credentials.

### Create a project

1. Log in to the [Tuya IoT Platform](https://iot.tuya.com/).
2. In the left navigation bar, click `Cloud` > `Development`. 
3. On the page that appears, click `Create Cloud Project`.
4. In the `Create Cloud Project` dialog box, configure `Project Name`, `Description`, `Industry`, and `Data Center`. For the `Development Method` field, select `Smart Home` from the dropdown list. For the `Data Center` field, select the zone you are located in. Refer to the country/data center mapping list [here](https://github.com/tuya/tuya-home-assistant/blob/main/docs/regions_dataCenters.md) to choose the right data center for the country you are in.
  ![](/images/integrations/tuya/image_001.png)
5. Click `Create` to continue with the project configuration.
6. In Configuration Wizard, make sure you add `Device Status Notification` API. The list of API should look like this:
  ![](/images/integrations/tuya/image_002.png)
7. Click `Authorize`.

### Link devices by app account

1. Navigate to the `Devices` tab.
2. Click `Link Tuya App Account` > `Add App Account`.
  ![](/images/integrations/tuya/image_003.png)
3. Scan the QR code that appears using the `Tuya Smart` app or `Smart Life` app.
  ![](/images/integrations/tuya/image_004.png)
4. Click `Confirm` in the app.
5. To confirm that everything worked, navigate to the `All Devices` tab. Here you should be able to find the devices from the app.
6. If zero devices are imported. Try changing the DataCenter and check the account used is the "Home Owner".

![](/images/integrations/tuya/image_005.png)

### Get authorization key

Click the created project to enter the `Project Overview` page and get the `Authorization Key`. You will need these for setting up the integration. in the next step.

![](/images/integrations/tuya/image_006.png)

{% include integrations/config_flow.md %}

{% configuration_basic %}
  Country:
    description: Choose the country you picked when signing up.

  "Tuya IoT Access ID":
    description: Go to your cloud project on [Tuya IoT Platform](https://iot.tuya.com/). Find the **Access ID** under [Authorization Key](#get-authorization-key) on the **Project Overview** tab.

  "Tuya IoT Access Secret":
    description: Go to your cloud project on [Tuya IoT Platform](https://iot.tuya.com/). Find the **Access Secret** under [Authorization Key](#get-authorization-key) on the **Project Overview** tab.

  Account:
    description: Tuya Smart or Smart Life **app** account.

  Password:
    description: The password of your **app** account.

{% endconfiguration_basic %}

## Error codes and troubleshooting

{% configuration_basic %}

"1004: sign invalid":
  description: Incorrect Access ID or Access Secret. Please refer to the **Configuration** part above.

"1106: permission deny":
  description: >
    - App account not linked with cloud project: On the [Tuya IoT Platform](https://iot.tuya.com/cloud/), you have linked devices by using Tuya Smart or Smart Life app in your cloud project. For more information, see [Link devices by app account](https://developer.tuya.com/en/docs/iot/Platform_Configuration_smarthome?id=Kamcgamwoevrx&_source=7a356dd493196a01bb9021b7680a2a45#title-3-Link%20devices%20by%20app%20account).

    - Incorrect username or password: Enter the correct account and password of the Tuya Smart or Smart Life app in the **Account** and **Password** fields (social login, which the Tuya Smart app allows, may not work, and thus should be avoided for use with the Home Assistant integration). Note that the app account depends on which app (Tuya Smart or Smart Life) you used to link devices on the [Tuya IoT Platform](https://iot.tuya.com/cloud/).

    - Incorrect country. You must select the region of your account of the Tuya Smart app or Smart Life app.

"1100: param is empty":
  description: Empty parameter of username or app. Please fill the parameters refer to the **Configuration** part above.

"2406: skill id invalid":
  description: >
    - Make sure you use the **Tuya Smart** or **SmartLife** app account to log in. Also, choose the right data center endpoint related to your country region. For more details, please check [Country Regions and Data Center](https://github.com/tuya/tuya-home-assistant/blob/main/docs/regions_dataCenters.md). 
    
    - Your cloud project on the [Tuya IoT Development Platform](https://iot.tuya.com) should be created after May 25, 2021. Otherwise, you need to create a new project. 

"28841105: No permissions. This project is not authorized to call this API":
  description: >
    Some APIs are not authorized, please [Subscribe](https://developer.tuya.com/en/docs/iot/applying-for-api-group-permissions?id=Ka6vf012u6q76#title-2-Subscribe%20to%20cloud%20products) then [Authorize](https://developer.tuya.com/en/docs/iot/applying-for-api-group-permissions?id=Ka6vf012u6q76#title-3-Authorize%20projects%20to%20call%20the%20cloud%20product). The following APIs must be subscribed for this tutorial:

    - Device Status Notification
    
    - Authorization

    - IoT Core

    - Smart Home Scene Linkage

    - IoT Data Analytics

{% endconfiguration_basic %}

## Scenes

Tuya supports scenes in their app. These allow triggering some of the more complex modes of various devices such as light changing effects. Scenes created in the Tuya app will automatically appear in the Scenes list in Home Assistant the next time the integration updates.

## Related Documents

- [Tuya Integration Documentation Page](https://github.com/tuya/tuya-home-assistant)
- [Supported Tuya Device Category](https://github.com/tuya/tuya-home-assistant/blob/main/docs/supported_devices.md)
- [Error Code and Troubleshooting](https://github.com/tuya/tuya-home-assistant/blob/main/docs/error_code.md)
- [Countries/Regions and Tuya Data Center](https://github.com/tuya/tuya-home-assistant/blob/main/docs/regions_dataCenters.md)
- [FAQs](https://github.com/tuya/tuya-home-assistant/blob/main/docs/faq.md)
