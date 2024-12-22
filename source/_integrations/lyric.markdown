---
title: Honeywell Lyric
description: How to integrate the Honeywell Lyric integration into Home Assistant.
ha_category:
  - Climate
  - Sensor
ha_release: 2021.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@timmo001'
ha_domain: lyric
ha_platforms:
  - climate
  - sensor
ha_dhcp: true
ha_integration_type: integration
---

The Honeywell Lyric integration integrates the Lyric thermostat platform into Home Assistant.

## Setup

To set up this integration, you first **must** set up a developer account with Honeywell using the same email address as your Resideo account:

1. Go to the [developer site](https://developer.honeywellhome.com) and register with an account.
2. Next, create a [new app](https://developer.honeywellhome.com/user/me/apps/add) via the `My Apps` section.
   1. App Name: You can use any name here, but it must not contain special characters.
   2. Callback URL: `https://my.home-assistant.io/redirect/oauth`
   3. The app will be approved automatically. To view the **Consumer Key** and **Consumer Secret** values, select the name of the app.  Copy the values, you will need them later.

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Internal examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`." 

{% enddetails %}

You can then add the integration in the frontend via the steps below.

{% include integrations/config_flow.md %}

The integration configuration will ask for the **Client ID** and **Client Secret**, which correspond to the **Consumer** values in the app you created above. See [Application Credentials](/integrations/application_credentials) for more details.

## Sensors

This integration provides the following sensors:

| Name                | Description                                 |
| ------------------- | ------------------------------------------- |
| Indoor Temperature  | The reported temperature from the device    |
| Indoor Humidity     | The reported humidity from the device       |
| Outdoor Temperature | Lyric's outdoor temperature report          |
| Outdoor Humidity    | Lyric's outdoor humidity                    |
| Next Period Time    | The next time the thermostat will change    |
| Setpoint Status     | A description of the setpoint of the device |

Additional sensors will be created for each room sensor accessory assigned to a thermostat device, if applicable:

| Name                 | Description                                                       |
| -------------------- | ----------------------------------------------------------------- |
| Room Temperature     | The temperature reported from a room sensor accessory             |
| Room Humidity        | The humidity reported from a room accessory                       |
