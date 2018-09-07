---
layout: post
title: "0.26: Foursquare, Fast.com, FFMPEG and GPSD"
description: "Automate based on check ins, slow internet speed or just stream a camera using FFMPEG."
date: 2016-08-13 12:00:00 -0700
date_formatted: "August 13, 2016"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Release-Notes
---

It's time for 0.26 and it's again full of new features and fixes. First I want to highlight that we are now having 500 000 monthly pageviews on the website. A big milestone for us! It's been an amazing journey. Big thanks to the Home Assistant community for being such a delightful bunch.

This release includes code contributed by 31 different people. The biggest change in this release is a new unit system. Instead of picking Celsius or Fahrenheit you'll have to pick imperial or metric now. This influences the units for your temperature, distance, and weight. This will simplify any platform or component that needs to know this information. Big thanks to [@Teagan42] for her hard work on this!

<img src='/images/supported_brands/foursquare.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/ohmconnect.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/fastdotcom.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/gpsd.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/ffmpeg.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' />

- Core: Introduce notion of unit system (deprecates temperature unit option) ([@Teagan42])
- Front end: Speed improvements ([@balloob])
- Front end: Improve layout of state dev tool ([@balloob])
- [Proximity]\: Allow definition of unit of measurement ([@Teagan42])
- [Flux]\: Add mired and kelvin mode ([@HBDK])
- Thermostat - [Proliphix]: Support for cooling ([@sdague])
- Media Player - [LG Netcast TV]: Show screenshot of what is currently playing ([@shmuelzon])
- Z-Wave improvements ([@jnewland], [@turbokongen])
- Thermostat - [heat control]: now also able to control an AC ([@mtreinish])
- Thermostat - [heat control]: allow specifying a minimum duration before switching ([@mtreinish])
- [InfluxDB]\: Whitelist entities option added ([@tchellomello])
- Sensor: Serial [particulate matters][particulate] sensors now supported ([@open-homeautomation])
- Sensor - [Fitbit]: Fix unit system ([@tchellomello])
- Light - [Flux LED]: Add support for [color and brightness][color] ([@Danielhiversen])
- Media Player - [Plex]: Now able to report on music ([@abcminiuser])
- Alarm Control Panel - [Verisure]: Now able to see who changed the alarm ([@persandtrom])
- Thermostat - [Honeywell]: Add option to read and control HVAC mode ([@Teagan42])
- [Foursquare] component to receive instant notifications of checkins ([@robbiet480])
- Camera: New [FFMPEG] platform allows to stream anything through front end ([@pvizeli])
- Manage [secrets] with new command line script ([@kellerza])
- Notify - [SMTP]: Allow embedding of images ([@partofthething])
- Sensor: [OhmConnect] is now supported ([@robbiet480])
- [panel_custom] component allows the registering of new panels ([@balloob])
- Light: New [mqtt_json] platform for working with JSON payload ([@corbanmailloux])
- Sensor: New [Fast.com] platform to measure network bandwidth performance ([@nkgilley])
- New [pilight] component to control 433 Mz devices ([@DavidLP])
- Sensor: [GPSD] now supported ([@fabaff])

### {% linkable_title Hotfix 0.26.1 - August 14 %}

- Fix serial_pm config validation ([@open-homeautomation])
- Check for existence of system mode on Honeywell thermostats ([@mKeRix])
- Fix unknown unit of measurement for hvac and thermostat component ([@turbokongen])

### {% linkable_title Hotfix 0.26.2 - August 15 %}

- Fix Wemo: have PyWemo play nicely with the latest Requests ([@pavoni])

### {% linkable_title Hotfix 0.26.3 - August 19 %}

- Media Player cover art would not work when an API password was set. Thanks to [@maddox] for reporting it and [@balloob] for the fix.

### {% linkable_title Breaking changes %}

 - A new unit system has superseded the temperature unit option in the core configuration. For now it is backwards compatible, but you should update soon:

```yaml
# Configuration.yaml example
homeassistant:
  # 'metric' for the metric system, 'imperial' for the imperial system
  unit_system: metric
```

[@maddox]: https://github.com/maddox
[@pavoni]: https://github.com/pavoni
[@mKeRix]: https://github.com/mKeRix
[@abcminiuser]: https://github.com/abcminiuser
[@balloob]: https://github.com/balloob
[@corbanmailloux]: https://github.com/corbanmailloux
[@Danielhiversen]: https://github.com/Danielhiversen
[@DavidLP]: https://github.com/DavidLP
[@fabaff]: https://github.com/fabaff
[@HBDK]: https://github.com/HBDK
[@jnewland]: https://github.com/jnewland
[@kellerza]: https://github.com/kellerza
[@mtreinish]: https://github.com/mtreinish
[@nkgilley]: https://github.com/nkgilley
[@open-homeautomation]: https://github.com/open-homeautomation
[@partofthething]: https://github.com/partofthething
[@persandtrom]: https://github.com/persandtrom
[@pvizeli]: https://github.com/pvizeli
[@robbiet480]: https://github.com/robbiet480
[@sdague]: https://github.com/sdague
[@shmuelzon]: https://github.com/shmuelzon
[@tchellomello]: https://github.com/tchellomello
[@Teagan42]: https://github.com/Teagan42
[@turbokongen]: https://github.com/turbokongen
[@fabaff]: https://github.com/fabaff

[Foursquare]: /components/foursquare/
[OhmConnect]: /components/sensor.ohmconnect/
[FFMPEG]: /components/camera.ffmpeg/
[SMTP]: /components/notify.smtp/
[panel_custom]: /components/panel_custom/
[Verisure]: /components/alarm_control_panel.verisure/
[Flux LED]: /components/light.flux_led/
[InfluxDB]: /components/influxdb/
[particulate]: /components/sensor.serial_pm/
[LG Netcast TV]: /components/media_player.lg_netcast/
[mqtt_json]: /components/light.mqtt_json/
[Fast.com]: /components/sensor.fastdotcom/
[pilight]: /components/pilight/
[GPSD]: /components/sensor.gpsd/
[heat control]: /components/thermostat.heat_control/
[Proximity]: /components/proximity/
[Flux]: /components/switch.flux/
[Proliphix]: /components/thermostat.proliphix/
[Fitbit]: /components/sensor.fitbit/
[Plex]: /components/media_player.plex/
[Honeywell]: /components/thermostat.honeywell/
[Secrets]: /topics/secrets/
