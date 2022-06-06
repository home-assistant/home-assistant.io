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
ha_integration_type: integration
---

The Honeywell Lyric integration integrates the Lyric thermostat platform into Home Assistant.

## Setup

To set up this component, you first **must** set up a developer account with Honeywell:

1. Go to the [developer site](https://developer.honeywellhome.com) and register with an account.
1. Next, create a [new app](https://developer.honeywellhome.com/user/me/apps/add) via the `My Apps` section.
   1. App Name: You can use any name here.
   1. Callback URL: `https://my.home-assistant.io/redirect/oauth`

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Internal examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`." 

{% enddetails %}

Once your app is created, copy the `Consumer Key` and `Consumer Secret`. These will be your `client_id` and `client_secret` to add to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
lyric:
  client_id: MY_CONSUMER_KEY
  client_secret: MY_CONSUMER_SECRET
```

You should now restart the server.

You can then add the integration in the frontend via the steps below.

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
