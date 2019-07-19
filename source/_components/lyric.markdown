---
title: "Honeywell Lyric"
description: "How to integrate Honeywell Lyric thermostat systems into Home Assistant."
logo: honeywell.png
ha_category:
  - Hub
  - Climate
  - Sensor
ha_release: 0.97
ha_iot_class: Cloud Polling
---

The Honeywell Lyric component integrates the Lyric thermostat systems into Home Assistant.

## Setup

To set up this component, you will need to set up a developer account with Honeywell:

1. Go to the [developer site](http://developer.honeywell.com) and register an account.
1. Next, create a [new app](https://developer.honeywell.com/user/me/apps/add) via the `my apps` section.
   1. App Name: You can use any name here.
   1. Callback URL: This needs to be the same url as your `base_url` + `/auth/lyric/callback`. If you have not set this, it will be the ip address of your ha instance. For example: `http://192.168.1.120:8123/auth/lyric/callback`.
1. Once your app is created, copy the `Consumer Key` and `Consumer Secret`. These will be your `client_id` and `client_secret`.

## Configuration

To be able to use this integration, add the following to your configuration:

```yaml
# Example configuration.yaml entry
lyric:
  client_id: 'myconsumerkey'
  client_secret: 'myconsumersecret'
```

Menu: **Configuration** -> **Integrations**.

1. Click on the `+` sign to add an integration and click on **Honeywell Lyric**.
1. You will then be directed to login to Honeywell. Use your login and allow access to your devices.

The integration will then be added with your Lyric devices.

{% configuration %}
client_id:
  description: The `Consumer Key` of your developer app.
  required: true
  type: string
client_secret:
  description: The `Consumer Secret` of your developer app.
  required: true
  type: string
{% endconfiguration %}

## Sensors

Alongside the climate platform, there will be a number of sensors available to you.

- Temperature - The thermostat's temperature sensor
- Humidity - The thermostat's humidity sensor
- Temperature Outside - Lyric's reported outdoor temperature
- Humidity Outside - Lyric's reported outdoor temperature
- Next Period Time - The next change on your thermostat's schedule
- Status - The thermostat's reported status. (Following schedule, held until etc.)

## Available Services

There are a couple of services specific to the lyric component to manage your thermostat.

### lyric.set_hold_time

Sets the time to hold until. This is what you would do in the app to set `hold until` to a specific time.

```json
{
  "entity_id": "climate.thermostat",
  "time": "21:00"
}
````
