---
title: Honeywell Lyric
description: How to integrate the Honeywell Lyric integration into Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Select
  - Sensor
ha_release: 2021.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@timmo001'
ha_domain: lyric
ha_platforms:
  - binary_sensor
  - climate
  - select
  - sensor
ha_dhcp: true
ha_integration_type: hub
---

The **Honeywell Lyric** {% term integration %} integrates the Lyric thermostat platform into Home Assistant.

## Setup

To set up this integration, you first **must** set up a developer account with Honeywell using the same email address as your Resideo account:

1. Go to the [developer site](https://developer.honeywellhome.com) and register with an account.
2. Next, create a [new app](https://developer.honeywellhome.com/user/me/apps/add) via the `My Apps` section.
   1. App Name: You can use any name here, but it must not contain special characters.
   2. Callback URL: `https://my.home-assistant.io/redirect/oauth`
   3. The app will be approved automatically. To view the **Consumer Key** and **Consumer Secret** values, select the name of the app. Copy the values, you will need them later.

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Internal examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`." 

{% enddetails %}

You can then add the integration in Home Assistant.

{% include integrations/config_flow.md %}

The integration setup will ask for the **Client ID** and **Client Secret**. These correspond to the **Consumer Key** and **Consumer Secret** values from the app you created on the Honeywell developer site. See [Application Credentials](/integrations/application_credentials) for more details.

{% important %}
During setup, you will be redirected to Honeywell to sign in. Use your regular Resideo/Honeywell Home account here, not the developer account you created on the developer site. These are two separate accounts, even if they share the same email address.
{% endimportant %}

## Binary sensors

This integration provides the following binary sensor:

- **Device pairing enabled**
  - **Description**: Indicates whether the thermostat is in pairing mode and can accept new room sensor accessories.

## Selects

- **Room priority**
  - **Description**: Controls which room sensor the thermostat uses for its temperature reading.
  - **Options**: **Follow me**, and the name of each paired room sensor (such as "Bedroom" or "Office").
  - **Available for**: T9 and T10 thermostats with at least one paired room sensor.

## Sensors

This integration provides the following sensors:

- **Indoor temperature**
  - **Description**: The temperature reported by the thermostat.

- **Indoor humidity**
  - **Description**: The humidity reported by the thermostat.

- **Outdoor temperature**
  - **Description**: The outdoor temperature reported by Lyric.

- **Outdoor humidity**
  - **Description**: The outdoor humidity reported by Lyric.

- **Next period time**
  - **Description**: The next time the thermostat switches to another setpoint.

- **Setpoint status**
  - **Description**: A description of the thermostat's current setpoint, such as _Following Schedule_, _Held Permanently_, or _Held until_ a given time.

- **Schedule status**
  - **Description**: The thermostat's current schedule status, such as _Resume_.

An extra set of sensors is created for each room sensor accessory paired with a thermostat:

- **Room temperature**
  - **Description**: The temperature reported by the room sensor accessory.

- **Room humidity**
  - **Description**: The humidity reported by the room sensor accessory.

- **Room average temperature**
  - **Description**: The average temperature measured in that room.
