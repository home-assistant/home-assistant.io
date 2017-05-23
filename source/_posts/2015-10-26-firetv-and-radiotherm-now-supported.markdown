---
layout: post
title: "0.7.6: Amazon FireTV, Radiotherm thermostats"
description: "Home Assistant 0.7.6 has been released with lots of squashed bugs and support for Amazon FireTV and Radiotherm thermostats."
date: 2015-10-26 18:10:00 0000
date_formatted: "October 26, 2015"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Release-Notes
---

After two weeks of hard work I'm proud to announce the release of Home Assistant v0.7.6. For this release the main focus was bugs, test coverage and documentation. And we exceeded expectations on all three fronts. Bugs have been squashed, [test coverage increased to 85%](https://coveralls.io/builds/3946399) and thanks to the hard work by [@fabaff](https://github.com/fabaff) and myself the [component section](/components/) on the website has gotten a complete revamp.

#### Changes

<img src='/images/supported_brands/radiotherm.png' style='border:none; box-shadow: none; float: right; margin-bottom: 16px;' height='50' /><img src='/images/supported_brands/firetv.png' style='border:none; box-shadow: none; float: right; margin-bottom: 16px; clear: right;' height='50' /><img src='/images/supported_brands/locative.png' style='border:none; box-shadow: none; float: right; margin-bottom: 16px; clear: right;' height='50' />

 - Device tracker: Newer [TP-Link routers](/components/device_tracker.tplink/) now supported ([@mKeRix](https://github.com/mKeRix))
 - Alarm Control Panel: [Manual alarm](/components/alarm_control_panel.manual/) added ([@sfam](https://github.com/sfam))
 - Thermostat: [Radiotherm](/components/thermostat.radiotherm/) now supported ([@toddeye](https://github.com/toddeye))
 - Media Player: [Amazon FireTV](/components/media_player.firetv/) now supported ([@happyleavesaoc](https://github.com/happyleavesaoc))
 - Device Tracker: [Geofancy](/components/device_tracker.locative/) now supported ([@wind-rider](https://github.com/wind-rider))
 - New component [Shell Command](/components/shell_command/) can expose shell commands as services ([@balloob](https://github.com/balloob))
 - [Scripts](/components/script/) can now be customized using `customize` key in `configuration.yaml` ([@balloob](https://github.com/balloob))
 - Light: [Hyperion](/components/light.hyperion/) now supported ([@MakeMeASandwich](https://github.com/MakeMeASandwich))
 - Sensor: [aRest](/components/sensor.arest/) can now also read out pins ([@balloob](https://github.com/balloob))
 - Sensor: [Forecast.io](/components/sensor.forecast/) now supports specifying units in `configuration.yaml` ([@balloob](https://github.com/balloob))
 - Thermostat: [Heat Control](/components/thermostat.heat_control/) has been completely rewritten ([@balloob](https://github.com/balloob))
 - Switch: [Rest](/components/switch.rest/) now supported ([@bachp](https://github.com/bachp))
 - Media Player: [Plex](/components/media_player.plex/) can now be auto discovered and configure itself ([@tomduijf](https://github.com/tomduijf))
 - [Downloader](/components/downloader/) will now treat relative paths based on config dir ([@tomduijf](https://github.com/tomduijf))
 - Line Charts will use interpolation for sensor data and show current and target temperature for thermostats ([@balloob](https://github.com/balloob))
 - Device Tracker: [OpenWRT via ubus](/components/device_tracker.ubus/) now supported ([@krzynio](https://github.com/krzynio))

<!--more-->

#### Breaking changes

As part of this release we did some cleanup which introduced backwards incompatible changes:

**Heat Control thermostat no longer includes scheduling features.**
This feature has been removed completely. Use the [automation component](/getting-started/automation/) instead to control target temperature.

**Config changed for calling a service from a script.**
`execute_service:` has been replaced with `service:`. See [component page](/components/script/) for example. The old method will continue working for some time.

**Scenes can no longer be turned off.**
It is no longer possible to turn a scene off after it has been activated. The way it worked was unpredictable and causes a lot of confusion.

**Downloader treats relative paths now relative to the config dir instead of the current working dir.**
This makes more sense as most people run Home Assistant as a daemon
