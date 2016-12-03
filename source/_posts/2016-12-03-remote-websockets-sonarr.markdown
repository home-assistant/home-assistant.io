---
layout: post
title: "0.34: New Remote component, Websockets, Sonarr, GPSLogger"
description: "Major improvements of HomeMatic, Tellstick, the HTTP component, and more."
date: 2016-12-03 08:04:05 +0000
date_formatted: "December 3, 2016"
author: Fabian Affolter et al.
author_twitter: fabaff
comments: true
categories: Release-Notes
og_image: /images/blog/2016-12-0.34/social.png
---

Here we go... 0.34. Let's call it the "Santa Claus" release. Rudolph was faster than expected and there's lot's of goodies on the sleigh. Of course, more work on async programming done by [@pvizeli] and [@balloob], new components, new platforms, major improvements, and much more.

### {% linkable_title GPSLogger %}

The work of [@dainok] let's you use your Android device, with the Geolocation feature enabled, to track itself using GPS or WiFi networks with the [GPSLogger](https://play.google.com/store/apps/details?id=com.mendhak.gpslogger) app. GPSLogger can use multiple sources: the passive one just get the latest Android known location, without activating GPS sensors or scanning for WiFi networks.

###  {% linkable_title Remote component %}

The brand new [`remote`][remote] component made by [@iandday] will simplify the integration of all kinds of remote control units. The first platform for [Harmony][harmony] is included in this release.

### {% linkable_title HomeMatic %}

The [HomeMatic][homematic] component has received some updates worth mentioning:

* Additional services
  * `reconnect`: Reconnect to your CCU/Homegear without restarting Home Assistant.
  * `set_dev_value`: Manually control a device, even if it's not supported by Home Assistant yet.
* Support for multiple HomeMatic hosts
* Support for HomeMatic Wired (most devices) and HomeMatic IP (a few devices)
* Various improvements and fixes, especially for HM-Sec-Key (KeyMatic)

The support for multiple hosts is a result of allowing mixed configurations with wireless, wired, and IP devices. This has the drawback of making the update a breaking change (along with the renamed `set_value` service). However, the benefits and possibilities gained will be worth it.

### {% linkable_title Websocket API %}

This release includes a new [websockets][websockets] based API by [@balloob] to power the next generation of Home Assistant frontends. The current frontend has been partly migrated to use it and will be further migrated in the future.

## {% linkable_title All changes  %}

- Sensor: [Broadlink][boradlink] RM2 and A1 E-air support ([@skyval])
- New services and improved device support for [HomeMatic][homematic] ([@pvizeli], [@danielperna84])
- Device tracker: New support for [GPSLogger][gpslogger] ([@dainok])
- Sensor: Support for [Sonarr][sonarr] ([@hborawski])
- Sensor: [World Air Quality Index][waqi] sensor ([@valentinalexeev], [@fabaff])
- Sensor: Support for [Dutch Smart Meter Requirements][dsmr] ([@aequitas])
- Switch: [Hook][hook] support by hooksmarthome.com ([@dasos])
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

## {% linkable_title Breaking changes %}

- The [HomeMatic][homematic] component now uses a different syntax for hosts and the `set_value` service has been renamed.
- All [RFXtrx][rfxtrx] sensors will get a new entity ID.
- If you are using NGINX, you will have to [adapt your configuration][nginx].
- [Nest][nest] contains changes which will require your attention.

### {% linkable_title If you need help... %}

...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://gitter.im/home-assistant/home-assistant). The release notes have comments enabled but it's preferred if you use these communication channels. Thanks.

### {% linkable_title Reporting Issues %}

Experiencing issues introduced by this release? Please report them in our [issue tracker](https://github.com/home-assistant/home-assistant/issues). Make sure to fill in all fields of the issue template.

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

[amcrest]: https://home-assistant.io/components/camera.amcrest/
[boradlink]: https://home-assistant.io/components/sensor.broadlink/
[dsmr]: https://home-assistant.io/components/sensor.dsmr/
[dunehd]: https://home-assistant.io/components/dunehd/
[efergy]: https://home-assistant.io/components/sensor.efergy/
[filtering]: https://home-assistant.io/components/http/
[gpslogger]: https://home-assistant.io/components/device_tracker.gpslogger/
[harmony]: https://home-assistant.io/components/remote.harmony/
[homematic]: https://home-assistant.io/components/homematic/
[hook]: https://home-assistant.io/components/switch.hook/
[nest-cam]: https://home-assistant.io/components/camera.nest/
[nest]: https://home-assistant.io/components/nest/
[nginx]: https://home-assistant.io/ecosystem/nginx/
[nut]: https://home-assistant.io/components/sensor.nut/
[philips]: https://home-assistant.io/components/media_player.philips_js/
[remote]: https://home-assistant.io/components/remote/
[rfxtrx]: https://home-assistant.io/components/rfxtrx/
[sonarr]: https://home-assistant.io/components/sensor.sonarr/
[tellstick]: https://home-assistant.io/components/tellstick/
[temper]: https://home-assistant.io/components/sensor.temper/
[threshold]: https://home-assistant.io/components/binary_sensor.threshold/
[websockets]: https://home-assistant.io/developers/websockets_api/
[waqi]: https://home-assistant.io/components/sensor.waqi/

