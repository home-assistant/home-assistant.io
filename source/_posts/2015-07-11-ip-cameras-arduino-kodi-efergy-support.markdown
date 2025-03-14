---
title: "IP Cameras, Arduinos, Kodi and Efergy Energy Monitors now supported"
description: "New support for IP Cameras, Arduinos, Kodi and Efergy monitors"
date: 2015-07-11 01:37 -0700
date_formatted: "July 11, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

Another month has passed and some great new features have landed in Home Assistant. This month release has been made possible by [balloob](https://github.com/balloob), [ettisan](https://github.com/ettisan), [fabaff](https://github.com/fabaff), [gyran](https://github.com/gyran), [jamespcole](https://github.com/jamespcole), [michaelarnauts](https://github.com/michaelarnauts), [miniconfig](https://github.com/miniconfig) and [rmkraus](https://github.com/rmkraus).

This release includes some architectural changes by me. The first is that the frontend is now based on a [NuclearJS](http://optimizely.github.io/nuclear-js/) JavaScript backend. This has greatly helped to organize and optimize the frontend code. Another change is that Home Assistant will now install dependencies on-demand instead of installing dependencies for all supported devices.

__IP Camera Support__
James has worked very hard to add support for IP cameras to Home Assistant which is included in this release. The initial release focusses on providing generic IP camera support. This means that any webcam that can exposes a JPEG image via a URL can be integrated.

Home Assistant will route the requests to your camera via the server allowing you to expose IP camera's inside your network via the Home Assistant app.

```yaml
# Example configuration.yaml entry
camera:
  platform: generic
  name: my sample camera
  username: MY_USERNAME
  password: MY_PASSWORD
  still_image_url: http://194.218.96.92/jpg/image.jpg
```

{% note %}
To update to the latest version, run <code>scripts/update</code>. Please report any issues on <a href='https://github.com/home-assistant/home-assistant/issues'>GitHub</a>.
{% endnote %}

<!--more-->

__Arduino__
<img src='/images/supported_brands/arduino.png' style='border:none; box-shadow: none; float: right;' height='50' /> Fabian has contributed support for interfacing with Arduinos. This makes it possible to connect your Arduino via USB and expose pins as sensor data and write to pins via switches. Have a look at [the docs](/integrations/arduino/) for an extensive guide to get started.

```yaml
# Example configuration.yaml entry
switch:
  platform: arduino
  pins:
    11:
      name: Fan Office
      type: digital
    12:
      name: Light Desk
      type: digital

sensor:
  platform: arduino
  pins:
    1:
      name: Door switch
      type: analog
    0:
      name: Brightness
      type: analog
```

__Kodi (XBMC)__
<img src='/images/supported_brands/kodi.png' style='border:none; box-shadow: none; float: right;' height='50' /> Ettisan has contributed a Kodi (XBMC) platform for the media player component. This allows you to track all the media that you are playing and allow you to control it.

```yaml
# Example configuration.yaml entry
media_player:
  platform: kodi
  name: Kodi
  url: http://192.168.0.123/jsonrpc
  user: kodi
  password: my_secure_password
```

__TP-Link__
<img src='/images/supported_brands/tp-link.png' style='border:none; box-shadow: none; float: right;' width='150' /> Michael has added TP-Link support to the device tracker. This allows you to now detect presence if you have a TP-Link router.

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: tplink
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

__Efergy energy monitor__
<img src='/images/supported_brands/efergy.png' style='border:none; box-shadow: none; float: right;' height='50' /> Miniconfig has contributed support for the [Efergy energy meters](https://efergy.com). To get an app token, log in to your efergy account, go to the Settings page, click on App tokens, and click "Add token".

```yaml
# Example configuration.yaml entry
sensor:
  platform: efergy
  app_token: APP_TOKEN
  utc_offset: UTC_OFFSET
  monitored_variables:
    - type: instant_readings
    - type: budget
    - type: cost
      period: day
      currency: $
```

__Forecast.io__
Fabian has added support for [Forecast.io](https://forecast.io/) to get weather forecasts for Home Assistant. You need an API key which is free but requires a [registration](https://developer.forecast.io/register). To add Forecast.io to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: forecast
  api_key: YOUR_APP_KEY
  monitored_conditions:
    - summary
    - precip_type
    - precip_intensity
    - temperature
    - dew_point
    - wind_speed
    - wind_bearing
    - cloud_cover
    - humidity
    - pressure
    - visibility
    - ozone
```
