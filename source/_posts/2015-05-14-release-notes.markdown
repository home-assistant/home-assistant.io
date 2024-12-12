---
title: "Release notes for May 14, 2015"
description: "Introducing support for MySensors, InstaPush, Notify My Android, OpenWeatherMap and Jabber."
date: 2015-05-14 22:25 0000
date_formatted: "May 14, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

Almost three busy weeks have past since the last release. We used this time to finally make the overhaul to use UTC as the internal date time format. We added a bunch of test coverage in the process to make sure the transition went smoothly. Pleas see [the blog post about the UTC refactor](/blog/2015/05/09/utc-time-zone-awareness/#backwards-incompatible-stuff) for backwards incompatible changes.

This release includes a significant startup boost for the frontend and a fix for Wemo discovery after their latest firmware upgrade.

I would like to give a big shout out to our newest contributor [fabaff](https://github.com/fabaff) for taking the time to improve the documentation.

{% note %}
To update to the latest version, run <code>scripts/update</code>. Please report any issues on <a href='https://github.com/home-assistant/home-assistant/issues'>GitHub</a>.
{% endnote %}

<!--more-->

__Overwriting Entity Attributes__
Before diving into the newly supported devices and services, I want to highlight an awesome configuration enhancement by [rmkraus](https://github.com/rmkraus): overwriting entity attributes.

These new configuration settings allow you to overwrite entity state attributes. The main usage for this is being able to overwrite attributes that influence how an entity is shown in the interface.

```yaml
# Example configuration.yaml entry
homeassistant:
  customize:
    light.bowl:
      # hides this entity from the interface
      hidden: true
    light.ceiling:
      # Replaces the state badge with given picture
      entity_picture: http://graph.facebook.com/schoutsen/picture
```

__MySensors__
<img src='https://brands.home-assistant.io/mysensors/logo.png' style='border:none; box-shadow: none; float: right;' height='50' /> [Andythigpen](https://github.com/andythigpen) and [Theolind](https://github.com/theolind) have added support for the [MySensors platform](http://www.mysensors.org) to Home Assistant.

```yaml
# Example configuration.yaml entry
sensor:
  platform: mysensors
  port: /dev/ttyACM0
```

__OpenWeatherMap__
<img src='/images/supported_brands/openweathermap.png' style='border:none; box-shadow: none; float: right;' height='50' /> [Fabaff](https://github.com/fabaff) has contributed support for [OpenWeatherMap](http://openweathermap.org). This will allow you to integrate local meteorological data into Home Assistant.

```yaml
# Example configuration.yaml entry
sensor:
  platform: openweathermap
  api_key: YOUR_API_KEY
  monitored_variables:
    - type: 'weather'
    - type: 'temperature'
    - type: 'wind_speed'
    - type: 'humidity'
    - type: 'pressure'
    - type: 'clouds'
    - type: 'rain'
    - type: 'snow'
```

__InstaPush__
[Fabaff](https://github.com/fabaff) has contributed support for InstaPush. This will allow you send messages from Home Assistant to your iOS and Android devices.

```yaml
# Example configuration.yaml entry
notify:
    platform: instapush
    # Get those by creating a new application, event and tracker
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    app_secret: ABCDEFGHJKLMNOPQRSTUVXYZ
    event: ABCDEFGHJKLMNOPQRSTUVXYZ
    tracker: ABCDEFGHJKLMNOPQRSTUVXYZ
```

__XMPP__
<img src='/images/supported_brands/xmpp.png' style='border:none; box-shadow: none; float: right;' height='50' /> [Fabaff](https://github.com/fabaff) has contributed support for Jabber/XMPP. This will allow you send messages from Home Assistant to anyone on Jabber/XMPP. 

```yaml
# Example configuration.yaml entry
notify:
    platform: xmpp
    sender: YOUR_JID
    password: YOUR_JABBER_ACCOUNT_PASSWORD
    recipient: YOUR_RECIPIENT
```

__Notify My Android__
<img src='/images/supported_brands/nma.png' style='border:none; box-shadow: none; float: right;' height='50' /> [Fabaff](https://github.com/fabaff) has contributed support for [Notify My Android](http://www.notifymyandroid.com/). This will allow you to send messages from Home Assistant to your Android device.

```yaml
# Example configuration.yaml entry
notify:
    platform: nma
    # Get this by registering a new application on http://www.notifymyandroid.com/
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
```

__Time & Date sensor__
[Fabaff](https://github.com/fabaff) has contributed a time & date sensor. This will allow you to show the current time/date on the dashboard.

```yaml
# Example configuration.yaml entry
sensor:
  platform: time_date
  monitored_variables:
    - type: 'time'
    - type: 'date'
    - type: 'date_time'
    - type: 'time_date'
```
