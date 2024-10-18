---
title: "0.34: New Remote component, Websockets, Sonarr, GPSLogger"
description: "Major improvements of HomeMatic, Tellstick, the HTTP component, and more."
date: 2016-12-03 08:04:05 +0000
date_formatted: "December 3, 2016"
author: Fabian Affolter et al.
author_twitter: fabaff
categories:
- Release-Notes
- Core
og_image: /images/blog/2016-12-0.34/social.png
---

Here we go... 0.34. Let's call it the "Santa Claus" release. Rudolph was faster than expected and there's lot's of goodies on the sleigh. Of course, more work on async programming done by [@pvizeli] and [@balloob], new components, new platforms, major improvements, and much more.

### GPSLogger

The work of [@dainok] let's you use your Android device, with the Geolocation feature enabled, to track itself using GPS or WiFi networks with the [GPSLogger](https://github.com/mendhak/gpslogger/releases) app. GPSLogger can use multiple sources: the passive one just get the latest Android known location, without activating GPS sensors or scanning for WiFi networks.

###  Remote component

The brand new [`remote`][remote] component made by [@iandday] will simplify the integration of all kinds of remote control units. The first platform for [Harmony][harmony] is included in this release.

### HomeMatic

The [HomeMatic][homematic] component has received some updates worth mentioning:

- Additional services
  - `reconnect`: Reconnect to your CCU/Homegear without restarting Home Assistant.
  - `set_dev_value`: Manually control a device, even if it's not supported by Home Assistant yet.
- Support for multiple HomeMatic hosts
- Support for HomeMatic Wired (most devices) and HomeMatic IP (a few devices)
- Various improvements and fixes, especially for HM-Sec-Key (KeyMatic)

The support for multiple hosts is a result of allowing mixed configurations with wireless, wired, and IP devices. This has the drawback of making the update a breaking change (along with the renamed `set_value` service). However, the benefits and possibilities gained will be worth it.

### Websocket API

This release includes a new [websockets][websockets] based API by [@balloob] to power the next generation of Home Assistant frontends. The current frontend has been partly migrated to use it and will be further migrated in the future.

## All changes

- New services and improved device support for [HomeMatic][homematic] ([@pvizeli], [@danielperna84])
- Device tracker: New support for [GPSLogger][gpslogger] ([@dainok])
- Sensor: Support for [Sonarr][sonarr] ([@hborawski])
- Sensor: [World Air Quality Index][waqi] sensor ([@valentinalexeev], [@fabaff])
- Sensor: Support for [Dutch Smart Meter Requirements][dsmr] ([@aequitas])
- Switch: Hook support by hooksmarthome.com ([@dasos])
- Camera: Integration for [Nest cameras][nest-cam] ([@technicalpickles])
- Light: Support for light effects ([@Diaoul])
- Sensor: New [Threshold][threshold] sensor ([@fabaff])
- Media player: New [DuneHD][dunehd] integration([@valentinalexeev])
- Media player: Controlling support for [Philips TVs][philips] ([@aequitas])
- Camera: Support for [Amcrest][amcrest] cameras ([@tchellomello])
- Sensor: Monitoring support for [Network UPS Tools (NUT)][nut] ([@mezz64])

- Mediap player - Denon: Source selection support ([@Gilles95])
- Sensor - MinMax: Precision now configurable ([@exxamalte])
- Tellstick: Massive [improvement][tellstick] ([@magicus])
- Light - Osram: New requirement ([@tfriedel])
- Sensor - Systemmonitor: Support for removable network adapters ([@mnoorenberghe])
- LiteJet: New trigger option ([@joncar])
- Media player - Bose: Add Bose SoundTouch device support ([@CharlesBlonde])
- HTTP: Re-organisation and [websockets] support ([@balloob])
- HTTP: Advanced [IP filtering][filtering] ([@vkorn])
- Sensor - KNX: Fix unit of mesaurement ([@cyberjunky])
- Climate: New precision properties ([@sdague])
- Sensor - TEMPer: Reset [devices][temper] on address change ([@vemek])
- Core: Color names now follow w3.org recommandations ([@srcLurker])
- Updater: Robustness improvements ([@balloob]])
- Media player - MPD: Reconnect to daemon ([@janLo])
- Device tracker: Fall-back for MAC address lookup ([@aequitas])
- Sensor - Efergy: Get the amount of [energy consumed][efergy] ([@gonzalezcalleja])
- Zeroconf: Fix for IPv6 support ([@rcloran])
- Minor and not so minor features and bug fixes by [@turbokongen], [@sdague], [@pvizeli], [@fabaff], [@chapple], [@mweinelt], [@Khabi], [@balloob], [@mnestor], [@kellerza], [@Morrisai],
[@michaelarnauts], [@tchellomello], [@lwis], [@bjarniivarsson], [@danielperna84], [@LinuxChristian], [@MartinHjelmare], [@dethpickle], [@jnewland], [@lichtteil], [@brandonweeks], [@partofthething], [@mnoorenberghe], [@bah2830], and [@albertoarias].

### Release 0.34.1 - December 4

This release has a bunch of bug fixes including a big one: emulated_hue will now work with Google Home! We usually reserve patch releases for small bug fixes but we considered this more impactful bug fix so important that we're including it now instead of having people wait two weeks.

To make the fix backwards compatible (it is a patch release after all) you will have to add two new configuration option to emulated_hue to have it work with Google Home:

```yaml
emulated_hue:
  type: google_home
  # This is important. Sadly, Google Home will not work with other ports.
  listen_port: 80
```

We are working on a better solution for 0.35.

- Fix emulated_hue with Google Home ([@balloob])
- Fix Sonos invalid config error ([@pvizeli])
- Fix Synology DSM doing I/O inside event loop ([@balloob])
- Fix Nest camera issues ([@technicalpickles])
- Fix occasional hangs in Homematic ([@pvizeli])
- Revert TP-Link upgrade to fix issues ([@mweinelt])
- Fix CORS ([@balloob])

### Release 0.34.2 - December 5

- Fix Nest interpreting Celsius as Fahrenheit and converting it ([@balloob])
- Fix Nest sensor platforms throwing errors ([@technicalpickles])
- Frontend will now always show persistent_notification and configurator entities even if not part of the active view ([@balloob])
- Fixed media player cards taking up unnecessary space ([@balloob])

### Release 0.34.3 - December 6

 - Fix Hook connections ([@dasos])
 - Fix random websocket connections ([@balloob])
 - Fix Google Home sometimes not finding our emulated_hue ([@jawilson])
 - Fix EnOcean config validation ([@rubund])

### Release 0.34.4 - December 7

 - Fix InfluxDB without authentication ([@balloob])
 - Fix Kodi without authentication ([@balloob])
 - Fix incorrect caching of /api/error_log ([@armills])
 - Fix incorrect ordering of service calls which could cause delays between turning on multiple entities ([@balloob])
 - Fix Nest Climate temperature issues ([@technicalpickles])

### Release 0.34.5 - December 12

 - Fix Nest sensors doing I/O inside event loop ([@balloob])
 - Fix Nest version bump not triggering re-install ([@EarthlingRich])
 - Fix Nest cameras without activity zones ([@technicalpickles])
 - Fix Plex doing I/O inside event loop ([@balloob])

### Backward-incompatible changes

- The [HomeMatic][homematic] component now uses a different syntax for hosts and the `set_value` service has been renamed.
- All [RFXtrx][rfxtrx] sensors will get a new entity ID.
- The frontend now uses websockets. If you run a server in front of Home Assistant, you will have to update your config (example [nginx][nginx])
- [Nest][nest] contains changes which will require your attention.

### If you need help...

...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://discord.gg/c5DvZ4e). The release notes have comments enabled but it's preferred if you use these communication channels. Thanks.

### Reporting Issues

Experiencing issues introduced by this release? Please report them in our [issue tracker](https://github.com/home-assistant/home-assistant/issues). Make sure to fill in all fields of the issue template.

[@EarthlingRich]: https://github.com/EarthlingRich
[@armills]: https://github.com/armills
[@jawilson]: https://github.com/jawilson
[@rubund]: https://github.com/rubund
[@aequitas]: https://github.com/aequitas
[@albertoarias]: https://github.com/albertoarias
[@bah2830]: https://github.com/bah2830
[@balloob]: https://github.com/balloob
[@bjarniivarsson]: https://github.com/bjarniivarsson
[@brandonweeks]: https://github.com/brandonweeks
[@cawilliamson]: https://github.com/cawilliamson
[@chapple]: https://github.com/chapple
[@CharlesBlonde]: https://github.com/CharlesBlonde
[@cyberjunky]: https://github.com/cyberjunky
[@dainok]: https://github.com/dainok
[@danielperna84]: https://github.com/danielperna84
[@dasos]: https://github.com/dasos
[@dethpickle]: https://github.com/dethpickle
[@Diaoul]: https://github.com/Diaoul
[@exxamalte]: https://github.com/exxamalte
[@fabaff]: https://github.com/fabaff
[@Gilles95]: https://github.com/Gilles95
[@gonzalezcalleja]: https://github.com/gonzalezcalleja
[@hartmms]: https://github.com/hartmms
[@hborawski]: https://github.com/hborawski
[@iandday]: https://github.com/iandday
[@janLo]: https://github.com/janLo
[@jnewland]: https://github.com/jnewland
[@joncar]: https://github.com/joncar
[@kellerza]: https://github.com/kellerza
[@Khabi]: https://github.com/Khabi
[@lichtteil]: https://github.com/lichtteil
[@LinuxChristian]: https://github.com/LinuxChristian
[@lwis]: https://github.com/lwis
[@magicus]: https://github.com/magicus
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@mezz64]: https://github.com/mezz64
[@mezz64]: https://github.com/mezz64
[@michaelarnauts]: https://github.com/michaelarnauts
[@mnestor]: https://github.com/mnestor
[@mnoorenberghe]: https://github.com/mnoorenberghe
[@molobrakos]: https://github.com/molobrakos
[@Morrisai]: https://github.com/Morrisai
[@mtreinish]:  https://github.com/mtreinish
[@mweinelt]: https://github.com/mweinelt
[@nsideras]: https://github.com/nsideras
[@partofthething]: https://github.com/partofthething
[@pavoni]: https://github.com/pavoni
[@persandstrom]: https://github.com/persandstrom
[@postlund]: https://github.com/postlund
[@pvizeli]: https://github.com/pvizeli
[@rcloran]: https://github.com/rcloran
[@sdague]: https://github.com/sdague
[@skyval]: https://github.com/skyval
[@srcLurker]: https://github.com/srcLurker
[@tchellomello]: https://github.com/tchellomello
[@technicalpickles]: https://github.com/technicalpickles
[@tfriedel]: https://github.com/tfriedel
[@turbokongen]: https://github.com/turbokongen
[@valentinalexeev]: https://github.com/valentinalexeev
[@vemek]: https://github.com/vemek
[@vkorn]: https://github.com/vkorn

[amcrest]: /integrations/amcrest
[boradlink]: /integrations/broadlink#sensor
[dsmr]: /integrations/dsmr
[dunehd]: /integrations/dunehd
[efergy]: /integrations/efergy
[filtering]: /integrations/http/
[gpslogger]: /integrations/gpslogger
[harmony]: /integrations/harmony
[homematic]: /integrations/homematic/
[nest-cam]: /integrations/nest#camera
[nest]: /integrations/nest/
[nginx]: /docs/ecosystem/nginx
[nut]: /integrations/nut
[philips]: /integrations/philips_js
[remote]: /integrations/remote/
[rfxtrx]: /integrations/rfxtrx/
[sonarr]: /integrations/sonarr
[tellstick]: /integrations/tellstick/
[temper]: /integrations/temper
[threshold]: /integrations/threshold
[websockets]: /developers/websocket_api/
[waqi]: /integrations/waqi
