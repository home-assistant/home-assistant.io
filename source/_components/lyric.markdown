---
layout: page
title: "Honeywell Lyric"
description: "How to integrate Honeywell Lyric thermostat systems into Home Assistant."
date: 2019-04-11 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: honeywell.png
ha_category:
  - Hub
  - Climate
  - Sensor
ha_release: 0.93
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

## {% linkable_title Configuration %}

To enable this component, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
lyric:
  client_id: 'myconsumerkey'
  client_secret: 'myconsumersecret'
```

{% configuration %}
client_id:
  description: The `Consumer Key` of your developer app.
  required: true
  type: string
client_secret:
  description: The `Consumer Secret` of your developer app.
  required: true
  type: string
redirect_uri:
  description: This will override the redirect url. This is generally not needed, but may help if you use a special setup.
  required: false
  type: string
{% endconfiguration %}

## {% linkable_title Avaliable Services %}

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
