---
layout: post
title: "0.7.6: Amazon FireTV, Radiotherm thermostats"
description: "Home Assistant 0.7.6 has been released with lots of squashed bugs and support for Amazon FireTV and Radiotherm thermostats."
date: 2015-10-26 18:10:00 -0700
date_formatted: "October 26, 2015"
author: Paulus Schoutsen
comments: true
categories: release-notes
---

After two weeks of hard work I'm proud to announce the release of Home Assistant v0.7.6. For this release the main
focus was bugs, test coverage and documentation. And we exceeded expectations on all three fronts. Bugs have been
squashed, [test coverage increased to 85%](https://coveralls.io/builds/3946399) and thanks to the hard work by
[@fabaff](https://github.com/fabaff) and myself the [component section](/components/) on the website has gotten a
complete revamp.

#### Changes

<img src='/images/supported_brands/radiotherm.png' style='border:none; box-shadow: none; float: right; margin-bottom: 16px;' height='50' />
<img src='/images/supported_brands/firetv.png' style='border:none; box-shadow: none; float: right; margin-bottom: 16px; clear: right;' height='50' />
<img src='/images/supported_brands/geofancy.png' style='border:none; box-shadow: none; float: right; margin-bottom: 16px; clear: right;' height='50' />

 - Device tracker: Newer [TP-Link routers](/components/device_tracker.tplink.html) now supported ([@mKeRix](https://github.com/mKeRix))
 - Alarm Control Panel: [Manual alarm](/components/alarm_control_panel.manual.html) added ([@sfam](https://github.com/sfam))
 - Thermostat: [Radiotherm](/components/thermostat.radiotherm.html) now supported ([@toddeye](https://github.com/toddeye))
 - Media Player: [Amazon FireTV](/components/media_player.firetv.html) now supported ([@happyleavesaoc](https://github.com/happyleavesaoc))
 - Device Tracker: [Geofancy](/components/device_tracker.geofancy.html) now supported ([@wind-rider](https://github.com/wind-rider))
 - New component [Shell Command](/components/shell_command.html) can expose shell commands as services ([@balloob](https://github.com/balloob))
 - [Scripts](/components/script.html) can now be customized using `customize` key in `configuration.yaml` ([@balloob](https://github.com/balloob))
 - Light: [Hyperion](/components/light.hyperion.html) now supported ([@MakeMeASandwich](https://github.com/MakeMeASandwich))
 - Sensor: [aRest](/components/sensor.arest.html) can now also read out pins ([@balloob](https://github.com/balloob))
 - Sensor: [Forecast.io](/components/sensor.forecast.html) now supports specifying units in `configuration.yaml` ([@balloob](https://github.com/balloob))
 - Thermostat: [Heat Control](/components/thermostat.heat_control.html) has been completely rewritten ([@balloob](https://github.com/balloob))
 - Switch: [Rest](/components/switch.rest.html) now supported ([@bachp](https://github.com/bachp))
 - Media Player: [Plex](/components/media_player.plex.html) can now be auto discovered and configure itself ([@tomduijf](https://github.com/tomduijf))
 - [Downloader](/components/downloader.html) will now treat relative paths based on config dir ([@tomduijf](https://github.com/tomduijf))
 - Line Charts will use interpolation for sensor data and show current and target temperature for thermostats ([@balloob](https://github.com/balloob))

<!--more-->

#### Breaking changes

As part of this release we did some cleanup which introduced backwards incompatible changes:

**Heat Control thermostat no longer includes scheduling features.**<br>
This feature has been removed completely. Use the [automation component](/components/automation.html)
instead to control target temperature.

**Config changed for calling a service from a script.**<br>
`execute_service:` has been replaced with `service:`. See [component page](/components/script.html)
for example. The old method will continue working for some time.

**Scenes can no longer be turned off.**<br>
It is no longer possible to turn a scene off after it has been activated. The way it worked was unpredictable
and causes a lot of confusion.

**Downloader treats relative paths now relative to the config dir instead of the current working dir.**<br>
This makes more sense as most people run Home Assistant as a daemon
