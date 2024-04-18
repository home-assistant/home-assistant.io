---
title: "0.7.6: Amazon FireTV, Radiotherm thermostats"
description: "Home Assistant 0.7.6 has been released with lots of squashed bugs and support for Amazon FireTV and Radiotherm thermostats."
date: 2015-10-26 18:10:00 0000
date_formatted: "October 26, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

After two weeks of hard work I'm proud to announce the release of Home Assistant v0.7.6. For this release the main focus was bugs, test coverage and documentation. And we exceeded expectations on all three fronts. Bugs have been squashed, [test coverage increased to 85%](https://coveralls.io/builds/3946399) and thanks to the hard work by [@fabaff](https://github.com/fabaff) and myself the [component section](/integrations/) on the website has gotten a complete revamp.

#### Changes

<img src='/images/supported_brands/radiotherm.png' style='border:none; box-shadow: none; float: right; margin-bottom: 16px;' height='50' /><img src='/images/supported_brands/firetv.png' style='border:none; box-shadow: none; float: right; margin-bottom: 16px; clear: right;' height='50' /><img src='/images/supported_brands/locative.png' style='border:none; box-shadow: none; float: right; margin-bottom: 16px; clear: right;' height='50' />

 - Device tracker: Newer [TP-Link routers](/integrations/tplink) now supported ([@mKeRix](https://github.com/mKeRix))
 - Alarm Control Panel: [Manual alarm](/integrations/manual) added ([@sfam](https://github.com/sfam))
 - Thermostat: [Radiotherm](/integrations/radiotherm/) now supported ([@toddeye](https://github.com/toddeye))
 - Media Player: [Amazon FireTV](/integrations/androidtv) now supported ([@happyleavesaoc](https://github.com/happyleavesaoc))
 - Device Tracker: [Geofancy](/integrations/locative) now supported (@wind-rider)
 - New component [Shell Command](/integrations/shell_command/) can expose shell commands as services ([@balloob](https://github.com/balloob))
 - [Scripts](/integrations/script/) can now be customized using `customize` key in `configuration.yaml` ([@balloob](https://github.com/balloob))
 - Light: [Hyperion](/integrations/hyperion) now supported (@MakeMeASandwich)
 - Sensor: [aRest](/integrations/arest#sensor) can now also read out pins ([@balloob](https://github.com/balloob))
 - Sensor: [Forecast.io](/integrations/darksky) now supports specifying units in `configuration.yaml` ([@balloob](https://github.com/balloob))
 - Thermostat: Heat Control has been completely rewritten ([@balloob](https://github.com/balloob))
 - Switch: [Rest](/integrations/switch.rest/) now supported ([@bachp](https://github.com/bachp))
 - Media Player: [Plex](/integrations/plex#media-player) can now be auto discovered and configure itself ([@tomduijf](https://github.com/tomduijf))
 - [Downloader](/integrations/downloader/) will now treat relative paths based on config dir ([@tomduijf](https://github.com/tomduijf))
 - Line Charts will use interpolation for sensor data and show current and target temperature for thermostats ([@balloob](https://github.com/balloob))
 - Device Tracker: [OpenWRT via ubus](/integrations/ubus) now supported ([@krzynio](https://github.com/krzynio))

<!--more-->

#### Backward-incompatible changes

As part of this release we did some cleanup which introduced backwards incompatible changes:

**Heat Control thermostat no longer includes scheduling features.**
This feature has been removed completely. Use the [automation component](/getting-started/automation/) instead to control target temperature.

**Config changed for calling a service from a script.**
`execute_service:` has been replaced with `service:`. See [component page](/integrations/script/) for example. The old method will continue working for some time.

**Scenes can no longer be turned off.**
It is no longer possible to turn a scene off after it has been activated. The way it worked was unpredictable and causes a lot of confusion.

**Downloader treats relative paths now relative to the config dir instead of the current working dir.**
This makes more sense as most people run Home Assistant as a daemon
