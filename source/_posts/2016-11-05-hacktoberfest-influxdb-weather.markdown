---
layout: post
title: "0.32: Hacktoberfest, InfluxDB sensor, Error reporting, and Weather"
description: "Hacktoberfest is over, new InfluxDB sensor, CUPS sensor, and ThingSpeak."
date: 2016-11-05 03:04:05 +0000
date_formatted: "November 05, 2016"
author: Fabian Affolter
author_twitter: fabaff
comments: true
categories: Release-Notes
---


Another two weeks have passed and we are pleased to present Home Assistant 0.32.

### {% linkable_title Hacktoberfest %}
The [Hacktoberfest] is over now. Home Assistant made the 2nd and the 3rd place out of almost 30'000 participating repositories with a total of 528 pull requests closed - that's an average of 17 pull requests a day! Thanks to all the contributors but also to the team of reviewers. This wouldn't been possible without you 👏 .

### {% linkable_title Improved error reporting %}
This release has improved the reporting when a config validation error occurs. Thanks to [@kellerza] you will now get a persistent notification added to your UI when this happens.

### {% linkable_title Asynchronous %}
This release contains the first asynchronous sensor and camera platforms. [@pvizeli] and [@fabaff] ported most of the "internal" sensors to async programming. We hope that you will enjoy the new speed.

[@balloob] and [@pvizeli] worked a lot on the improvement of the core itself.

### {% linkable_title Weather component %}

For a long time we have had a bunch of [weather sensors][weather-sensors] but it's getting better: There is now a [Weather component][weather-component]. Sorry, not much more to tell right now. The plans are to create a weather UI element and to improve the initial implementation.

### {% linkable_title All changes %}

<img src='/images/supported_brands/icloud.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/influxdb.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/emby.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/synologydsm.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/garadget_logo.jpg' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/yeelight.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/philips.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/nfandroidtv.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/currencylayer.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/influxdb.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' />

- Cover: New [garadget] platform ([@JasonCarter80])
- Media player: New support for [Emby][emby-media] ([@mezz64])
- [LiteJet][litejet] switches and lights support ([@joncar])
- Light: [Yeelight][yeelight] Wifi bulbs are now supported ([@HydrelioxGitHub])
- Media player: [Philips TVs][philips_player] with jointSPACE API re now supported ([@danielperna84])
- Sensor: Support for [Synology DSM][synologydsm] ([@StaticCube])
- Sensor: Monitoring support for [Dovado routers][dovado-sensor] ([@molobrakos])
- Sensor: Support for monitoring [printers][cups-sensor] ([@fabaff])
- Add mochad component ([@mtreinish])
- Notify: Added support for [Android TV/FireTV](/components/notify.nfandroidtv/) - Sensor: New finance platform [CurrencyLayer][currencylayer] ([@arsaboo])
- Sensor: Support for [InfluxDB sensors][influx-sensor] ([@bestlibre])
- Sensor: New support [HDDTemp sensors][hddtemp-sensor] ([@fabaff])
([@danielperna84])
- Media player: [Sonos] improvements incl. timer setting functionality ([@bjarniivarsson], [@americanwookie])
- Media player: Discovery support for [Yamaha] ([@sdague])
- Config: Exclude dirs/files prefixed with . ([@lwis])
- HTTP: Migrate WSGI to asyncio ([@balloob])
- Configurator: Support for `entity_picture` ([@armills])
- Core: Configuration validation error prints line numbers ([@persandstrom])
- Zoneminder: SSL/TLS support ([@Khabi])
- Camera: Improvements to [RPi camera][rpi-camera] ([@postlund])
- [ThingSpeak][thingspeak] component ([@simonszu])
- Core: New property `hass.data`  to store internal data ([@balloob])
- Switch: Templating and configurable timeout for [REST][rest-switch] ([@aa755])
- Sensor: New [random number][random-sensor] sensor ([@fabaff])
- Pilight: `send_delay` feature ([@janLo])
- Config: Improvements for `known_devices` ([@kellerza])
- Device tracker: New discovered event ([@lwis])
- Device tracker: Improvements and new features for the Volvo on Call platform ([@molobrakos])
- Climate: Use unit of measurement from a Vera device ([@pavoni])
- Device tracker: [iCloud][icloud] improvements ([@Bart274])
- Minor features and bug fixes by [@fabaff], [@kellerza], [@robbiet480], [@balloob], [@DavidLP], [@Bart274], [@sdague], [@mtreinish], [@Khabi], [@bbesset], [@bestlibre], [@pvizeli], [@turbokongen], [@devdelay], [@molobrakos], [@postlund], [@wokar], [@armills], [@arsaboo], [@hartmms], [@nsideras], [@tbeckha], and [@kirichkov].

### {% linkable_title Release 0.32.1 - November 6 %}

We've added a warning to 0.32 to catch platforms accidentally slowing down Home Assistant. Our aim is to fix these quickly when reported, so here is 0.32.1 with all reported platforms fixed.

 - Fix Sonos doing I/O inside the event loop ([@pvizeli])
 - Fix Radiotherm doing I/O inside the event loop ([@balloob])
 - Fix camera MJPEG streams when using HTTP 1.0 ([@balloob])

### {% linkable_title Release 0.32.2 - November 7 %}

 - Move Honeywell I/O out of the event loop ([@balloob])
 - Use sequential updates for non-async entities to prevent race conditions ([@pvizeli])
 - Fix setting temperature in Celsius on Radiotherm CT50 thermostats ([@andyat])
 - Fix PiLight config validation ([@DavidLP])

### {% linkable_title Release 0.32.3 - November 11 %}

 - Fix OpenWeather weather platform doing I/O in event loop ([@lwis])
 - Fix Alarm.com doing I/O in event loop ([@jnewland])
 - Fix Tellstick doing I/O in event loop ([@balloob])
 - Fix KNX doing I/O in event loop ([@balloob])
 - Increase warning threshold for catching platforms that do I/O ([@balloob])
 - Change pilight systemcode validation ([@janLo])
 - Fix Yamaha discovering already configured receivers ([@sdague])
 - Fix Sonos from installing dependency each time HA was started ([@pvizeli])
 - Fix Synology camera SSL and error handling ([@pvizeli])
 - Fix Panasonic Viera doing I/O in event loop ([@balloob])
 - Improve generic camera error handling ([@kellerza])
 - Light - Flux Led Lights: allow specifying mode if light does not support white mode ([@DanielHiversen])
 - Fix Rest switch default template ([@pvizeli])

### {% linkable_title Release 0.32.4 - November 15 %}

 - Fix device tracker from crashing HASS when a new device was discovered ([@balloob])
 - HTTP: Fix X-Forwarded-For feature ([@mweinelt])

### {% linkable_title Misc %}

Our website has now an additional category called "Ecosystem". This will become the place where tools, apps, and other helper for the Home Assistant ecosystem can store their documentation or guides.

- [iOS](/ecosystem/ios/)
- [SceneGen](/ecosystem/scenegen/)

### {% linkable_title Breaking changes %}

- The [Yahoo Finance][yahoo] platform supports now multiple stock. Please adjust your configuration.
- Deprecated components `garage_door`, `rollershutter`, `thermostat`, and `hvac` have been removed.
- The minimum Python version on Windows has been bumped to Python 3.5.
- The Insteon Hub integration has been disabled due to a [request from Insteon][req-insteon].

### {% linkable_title If you need help... %}

...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://discord.gg/c5DvZ4e). The release notes have comments enabled but it's preferred if you the former communication channels. Thanks.

[@mweinelt]: https://github.com/mweinelt
[@aa755]: https://github.com/aa755
[@americanwookie]: https://github.com/americanwookie
[@armills]: https://github.com/armills
[@andyat]: https://github.com/andyat
[@arsaboo]: https://github.com/arsaboo
[@balloob]: https://github.com/balloob
[@Bart274]: https://github.com/Bart274
[@bbesset]: https://github.com/bbesset
[@bestlibre]: https://github.com/bestlibre
[@bjarniivarsson]: https://github.com/bjarniivarsson
[@danielperna84]: https://github.com/danielperna84
[@DavidLP]: https://github.com/DavidLP
[@devdelay]: https://github.com/devdelay
[@fabaff]: https://github.com/fabaff
[@hartmms]: https://github.com/hartmms
[@HydrelioxGitHub]: https://github.com/HydrelioxGitHub
[@janLo]: https://github.com/janLo
[@JasonCarter80]: https://github.com/JasonCarter80
[@joncar]: https://github.com/joncar
[@kellerza]: https://github.com/kellerza
[@Khabi]: https://github.com/Khabi
[@kirichkov]: https://github.com/kirichkov
[@lwis]: https://github.com/lwis
[@mezz64]: https://github.com/mezz64
[@molobrakos]: https://github.com/molobrakos
[@mtreinish]:  https://github.com/mtreinish
[@nsideras]: https://github.com/nsideras
[@pavoni]: https://github.com/pavoni
[@persandstrom]: https://github.com/persandstrom
[@postlund]: https://github.com/postlund
[@pvizeli]: https://github.com/pvizeli
[@robbiet480]: https://github.com/robbiet480
[@sdague]: https://github.com/sdague
[@simonszu]: https://github.com/simonszu
[@StaticCube]: https://github.com/StaticCube
[@tbeckha]: https://github.com/tbeckha
[@tchellomello]: https://github.com/tchellomello
[@turbokongen]: https://github.com/turbokongen
[@wokar]: https://github.com/wokar
[@jnewland]: https://github.com/jnewland
[@DanielHiversen]: https://github.com/DanielHiversen

[currencylayer]: /components/sensor.currencylayer/
[yahoo]: /components/sensor.yahoo_finance/
[mochat]: /components/mochat/
[firetv]: /components/notify.firetv/
[Yamaha]: /components/media_player.yamaha/
[hddtemp-sensor]: /components/sensor.hddtemp/
[Sonos]: /components/media_player.sonos/
[weather-sensors]: /components/#weather
[rpi-camera]: /components/camera.rpi_camera/
[rest-switch]: /components/switch.rest/
[emby-media]: /components/media_player.emby/
[random-sensor]: /components/sensor.random/
[yeelight]: /components/light.yeelight/
[influx-sensor]: /components/sensor.influxdb/
[weather-component]: /components/weather/
[cups-sensor]: /components/sensor.cups/
[litejet]: /components/litejet/
[garadget]: /components/garadget/
[philips_player]: /components/media_player.philips_js/
[icloud]: /components/device_tracker.icloud/
[synologydsm]: /components/sensor.synologydsm/
[dovado-sensor]: /components/sensor.dovado/
[ios]: /ecosystem/ios/
[Hacktoberfest]: https://hacktoberfest.digitalocean.com/
[req-insteon]: https://github.com/home-assistant/home-assistant/issues/3811
[updater]: /blog/2016/10/25/explaining-the-updater/
[thingspeak]: /components/thingspeak/
