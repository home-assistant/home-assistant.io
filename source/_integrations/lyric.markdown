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
ha_quality_scale: silver
ha_platforms:
  - climate
  - sensor
ha_dhcp: true
---

The Honeywell Lyric component integrates the Lyric thermostat platform into Home Assistant.

## Setup

To set up this component, you will need to set up a developer account with Honeywell:

1. Go to the [developer site](https://developer.honeywellhome.com) and register with an account.
1. Next, create a [new app](https://developer.honeywellhome.com/user/me/apps/add) via the `My Apps` section.
   1. App Name: You can use any name here.
   1. Callback URL: This needs to be the URL of your Home Assistant instance + `/auth/external/callback`. For example: `http://192.168.1.123:8123/auth/external/callback`.

Once your app is created, copy the `Consumer Key` and `Consumer Secret`. These will be your `client_id` and `client_secret` to add to your configuration:

```yaml
# Example configuration.yaml entry
lyric:
  client_id: MY_CONSUMER_KEY
  client_secret: MY_CONSUMER_SECRET
```

You can then add the integration in the frontend.

{% include integrations/config_flow.md %}

## Sensors

This integration provides the following sensors:

| Name                | Description                                 |
| ------------------- | ------------------------------------------- |
| Indoor Temperature  | The reported temperature from the device    |
| Outdoor Temperature | Lyric's outdoor temperature report          |
| Outdoor Humidity    | Lyric's outdoor humidity                    |
| Next Period Time    | The next time the thermostat will change    |
| Setpoint Status     | A description of the setpoint of the device |
