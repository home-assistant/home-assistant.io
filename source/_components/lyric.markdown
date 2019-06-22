---
layout: page
title: "Honeywell Lyric"
description: "How to integrate Honeywell Lyric thermostat systems into Home Assistant."
date: 2019-06-22 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: honeywell.png
ha_category:
  - Hub
  - Climate
  - Sensor
ha_release: 0.95
ha_iot_class: Cloud Polling
---

The Honeywell Lyric component integrates the Lyric thermostat systems into Home Assistant.

## {% linkable_title Setup %}

To set up this component, you will need to set up a developer account with Honeywell:

1. Go to the [developer site](http://developer.honeywell.com) and register an account.
1. Next, create a [new app](https://developer.honeywell.com/user/me/apps/add) via the `my apps` section.
    1. App Name: You can use any name here.
    1. Callback URL: This needs to be the same url as your `base_url` + `/api/lyric/authenticate`. If you have not set this, it will be the ip address of your ha instance. For example: `http://192.168.1.120:8123/api/lyric/authenticate`.
1. Once your app is created, copy the `Consumer Key` and `Consumer Secret`. These will be your `client_id` and `client_secret`.

## {% linkable_title Configuration via the frontend %}

Menu: **Configuration** -> **Integrations**.

1. Click on the `+` sign to add an integration and click on **Honeywell Lyric**.
1. Add your `client_id` and `client_secret` and press submit.
1. You will then be directed to login to Honeywell. Use your login and allow access to your devices.

The integration will then be available.

## {% linkable_title Sensors %}

Alongside the climate platform, there will be a number of sensors available to you.

- Temperature - The thermostat's temperature sensor
- Humidity - The thermostat's humidity sensor
- Temperature Outside - Lyric's reported outdoor temperature
- Humidity Outside - Lyric's reported outdoor temperature
- Next Period Time - The next change on your thermostat's schedule
- Status - The thermostat's reported status. (Following schedule, held until etc.)

## {% linkable_title Available Services %}

There are a couple of services specific to the lyric component to manage your thermostat.

### {% linkable_title lyric.resume_program %}

Resumes the programmed schedule.

```json
{
  "entity_id": "climate.thermostat"
}
```

### {% linkable_title lyric.set_hold_time %}

Sets the time to hold until. This is what you would do in the app to set `hold until` to a `specific time`.

```json
{
  "entity_id": "climate.thermostat",
  "time": "21:00"
}
```
