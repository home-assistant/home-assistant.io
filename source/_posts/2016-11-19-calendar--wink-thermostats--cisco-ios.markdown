---
layout: post
title: "0.33: New Calendar component, Wink thermostats and Cisco IOS"
description: "Continued our upgrade to Async, fixed tons of bugs and added a few new things."
date: 2016-11-19 03:04:05 +0000
date_formatted: "November 19, 2016"
author: Fabian Affolter
author_twitter: fabaff
comments: true
categories: Release-Notes
---

For this release we put a lot of focus on finishing our async upgrade and fix a bunch of bugs in the process.

But a new release wouldn't be awesome if it didn't had some new goodies and this release is no different. This release includes a new calendar component by [@mnestor]. It comes now with Google Calendar support, which should allow you to automate things based on your calendar events!

## Changes

- New [calendar component][google] including Google support ([@mnestor])
- Final core upgrade for async ([@pvizeli])
- Neato refactor + sensor support ([@turbokongen])
- Device Tracker: [Swisscom Internet-Box][swisscom] now supported ([@betrisey])
- Device Tracker - Locative: [Map support][locative] added ([@danijelst])
- Emulated Hue: Option to sent request info as variables to scripts that get called ([@bah2830])
- Wink: [Thermostats][wink-climate] are now supported ([@w1ll1am23])
- Light: New [MQTT template][mqtt-template] platform for custom communication ([@Diaoul])
- Wake on Lan switch can now configure a custom OFF script ([@Chris-V])
- Device Tracker: [Cisco IOS][cisco] now supported ([@fbradyirl])
- Sensor: Support for [PVOutput][pvoutput] snesor ([@fabaff])
- Sensor: Show count of connected clients to the [API stream][api-stream] ([@balloob])
- Fix platforms from doing I/O in the event loop ([@balloob], [@pvizeli], [@lwis], [@kellerza])
- Switch - TP Link: Add daily consumption [TP Link switches][tp-link] ([@gonzalezcalleja])
- Templates: Add new `strptime` function for parsing times ([@lwis])
- HTTP: Fix X-Forwarded-For parsing (@[mweinelt])
- Switch - Command Line: Use [configured object_id][command-line] for entity IDs ([@n8henrie])
- MQTT: Support added for [birth and last will][mqtt-will] messages ([@bestlibre])
- Better handling of accented characters in slugify ([@magicus])
- Alarm Control Panel - Envisalink: Add new [keypress service][envisalink] ([@jnimmo])
- Light - Hue: Add service to [activate scenes][hue] defined in Hue app ([@sdague])

## Breaking changes

 - We have included a fix that impacts how we generate entity ids. This only impacts devices with accented characters. Instead of being stripped out, they are now replaced with the non-accented version. So now `Tèst Mörê` will become `test_more` instead of `tst_mr`.
 - Command line switches will now use the specified object ID for their entity ID instead of basing it off the name.

[@bah2830]: https://github.com/bah2830
[@balloob]: https://github.com/balloob
[@bestlibre]: https://github.com/bestlibre
[@betrisey]: https://github.com/betrisey
[@Chris-V]: https://github.com/Chris-V
[@danijelst]: https://github.com/danijelst
[@Diaoul]: https://github.com/Diaoul
[@fabaff]: https://github.com/fabaff
[@fbradyirl]: https://github.com/fbradyirl
[@gonzalezcalleja]: https://github.com/
[@jnimmo]: https://github.com/jnimmo
[@kellerza]: https://github.com/kellerza
[@lwis]: https://github.com/lwis
[@magicus]: https://github.com/magicus
[@mnestor]: https://github.com/mnestor
[@mweinelt]: https://github.com/mweinelt
[@n8henrie]: https://github.com/n8henrie
[@pvizeli]: https://github.com/pvizeli
[@sdague]: https://github.com/sdague
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23

[api-stream]: https://home-assistant.io/components/sensor.api_stream/
[cisco]: https://home-assistant.io/components/device_tracker.cisco_ios/
[command-line]: https://home-assistant.io/components/switch.command_line/
[envisalink]: https://home-assistant.io/components/envisalink/
[google]: https://home-assistant.io/components/sensor.google_calendar/
[hue]: https://home-assistant.io/components/light.hue/
[locative]: https://home-assistant.io/components/device_tracker.locative/
[mqtt-template]: https://home-assistant.io/components/light.mqtt_template/
[mqtt-will]: https://home-assistant.io/components/mqtt/
[pvoutput]: https://home-assistant.io/components/sensor.pvoutput/
[swisscom]: https://home-assistant.io/components/device_tracker.swisscom/
[tp-link]: https://home-assistant.io/components/switch.tplink/
[wink-climate]: https://home-assistant.io/components/climate.wink/

