---
title: "0.33: New Calendar component, Wink thermostats and Cisco IOS"
description: "Continued our upgrade to Async, fixed tons of bugs and added a few new things."
date: 2016-11-20 00:04:05 +0000
date_formatted: "November 20, 2016"
author: Fabian Affolter
author_twitter: fabaff
categories:
- Release-Notes
- Core
og_image: /images/blog/2016-11-0.33/social.png
---

For this release we put a lot of focus on finishing our async upgrade and fix a bunch of bugs in the process.

But a new release wouldn't be awesome if it didn't had some new goodies and this release is no different. This release includes a new calendar component by [@mnestor]. It comes now with Google Calendar support, which should allow you to automate things based on your calendar events!

### Changes

- New [calendar component][google] including Google support ([@mnestor])
- Final core upgrade for async ([@pvizeli])
-  [Neato] refactor + sensor support ([@turbokongen])
- Device Tracker: [Swisscom Internet-Box][swisscom] now supported ([@betrisey])
- Device Tracker - Locative: [Map support][locative] added ([@danijelst])
-  [Emulated Hue] will now sent request info as variables to scripts that get called ([@bah2830])
- Wink: [Thermostats][wink-climate] are now supported ([@w1ll1am23])
- Light: New [MQTT template][mqtt-template] platform for custom communication ([@Diaoul])
-  [Wake on Lan switch] can now configure a custom OFF script ([@Chris-V])
- Device Tracker: [Cisco IOS][cisco] now supported ([@fbradyirl])
- Sensor: Support for [PVOutput][pvoutput] snesor ([@fabaff])
- Sensor: Show count of connected clients to the [API stream][api-stream] ([@balloob])
- Fix platforms from doing I/O in the event loop ([@balloob], [@pvizeli], [@lwis], [@kellerza])
- Switch - [TP Link]: Add daily consumption ([@gonzalezcalleja])
- Templates: Add new `strptime` [template function] for parsing times ([@lwis])
-  [HTTP] component: Fix X-Forwarded-For parsing ([@mweinelt])
- Switch - [Command Line]: Use configured object_id for entity IDs ([@n8henrie])
-  [MQTT] now supports birth and last will messages ([@bestlibre])
- Better handling of accented characters in slugify ([@magicus])
- Alarm Control Panel - [Envisalink]: Add new keypress service ([@jnimmo])
- Light - [Hue]: Add service to activate scenes defined in Hue app ([@sdague])

### Release 0.33.1 - November 20

 - Fix Z-Wave lights ([@turbokongen])

### Release 0.33.2 - November 22

 - Fix Device Tracker init ([@pvizeli])
 - Fix Discovery init ([@pvizeli])
 - Fix TP-Link switch ([@mweinelt])
 - Fix Zwave light naming & configurable refresh ([@jchapple])
 - Neato fixes ([@turbokongen])
 - Fix 'Unknown' status for Nest Protect devices ([@Khabi])

### Release 0.33.3 - November 23

 - Update Yr.no entities every hour ([@kellerza])
 - Bump Netdisco to 0.7.7 (fixes discovery on Synology)
 - Fix discovery race condition (most obvious in Wemo) ([@balloob])

### Release 0.33.4 - November 24

 - Set executor pool size to 10 (as intended) ([@pvizeli])

This should fix occasional performance problems that some people have reported.

### Backward-incompatible changes

 - We have included a fix that impacts how we generate entity ids. This only impacts devices with accented characters. Instead of being stripped out, they are now replaced with the non-accented version. So now `Tèst Mörê` will become `test_more` instead of `tst_mr`.
 - Command line switches will now use the specified object ID for their entity ID instead of basing it off the name.

### Reporting issues

Experiencing issues introduced by this release? Please report them in our [issue tracker]. Make sure to fill in all fields of the issue template.

[issue tracker]: https://github.com/home-assistant/home-assistant/issues
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
[@jchapple]: https://github.com/jchapple
[@Khabi]: https://github.com/Khabi

[api-stream]: /integrations/sensor.websocket_api
[cisco]: /integrations/cisco_ios
[Command Line]: /integrations/switch.command_line/
[Envisalink]: /integrations/envisalink/
[google]: /integrations/calendar.google/
[Hue]: /integrations/hue
[locative]: /integrations/locative
[mqtt-template]: /integrations/light.mqtt
[mqtt-will]: /integrations/mqtt/
[pvoutput]: /integrations/pvoutput
[swisscom]: /integrations/swisscom
[TP Link]: /integrations/tplink
[wink-climate]: /integrations/wink#climate
[neato]: /integrations/neato/
[Emulated Hue]: /integrations/emulated_hue/
[Wake on Lan switch]: /integrations/wake_on_lan#switch
[template function]: /topics/templating/#home-assistant-template-extensions
[HTTP]: /integrations/http/
[MQTT]: /integrations/mqtt/
