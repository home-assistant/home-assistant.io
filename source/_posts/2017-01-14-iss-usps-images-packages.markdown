---
layout: post
title: "0.36: ISS, USPS, Image processing, "
description: "Track packages, space stations, TrackR devices, Xiaomi, and UPC"
date: 2017-01-14 08:04:05 +0000
date_formatted: "January 15, 2017"
author: Fabian Affolter
author_twitter: fabaff
comments: true
categories: Release-Notes
og_image: /images/blog/2016-12-0.35/social.png
---

Welcome to 2017 and 0.36. We are proud to announce the first release for this year. While we are still migrating parts to async but 0.36 is focusing on new features and bug fixes.

## {% linkable_title Packages %}
[Packages][packages] are providing a new way to organize different component's configuration parts together. With packages we offer the option to include different components or parts of configuration using any of the `!include` directives.

## {% linkable_title International Space Station (ISS) %}
No, unfortunately we are not going to space. The `iss` sensor is tracking the position of the International Space Station and gives your some details.

## {% linkable_title Insteon local %}
The support for Insteon was removed due to issues. With the `insteon_local` component support for [Insteon][insteon] is back.

## {% linkable_title Image processing %}
The new [image processing component][image] currently works with [number plates][plates]. But this could level the way to integrate feature like facial recognition or gestures control.

## {% linkable_title All changes %}
- Sensor: Support for [HydroQuebec][quebec] ([@titilambert])
- Sensor: Tracking the [ISS][iss] ([@HydrelioxGitHub])
- Sensor: [USPS][usps] deliveries tracking ([@happyleavesaoc])
- Device tracker: New [ping-based][ping] tracker ([@michaelarnauts])
- TTS: Support for [Pico][pico] ([@doudz])
- Switch: [BeagleBone Black][beaglebone] GPIO are supported now ([@MatoKafkac])
- Light: New support for [Tikteck][tik] Bluetooth bulbs ([@mjg59])
- Switch: Support for customised [Kankun SP3 Wifi][kankun] switches ([@webworxshop])
- Insteon local: Local [insteon][insteon] support([@wardcraigj])
- `rest_command`: Support for using [REST][rest] ([@pvizeli])
- Sensor: Show details of the [Dublin RTPI][dublin] information ([@ttroy50])
- Light: [Zengge Bluetooth][zengge] bulbs ([@mjg59])
- Fan: Wink support for [fans][wink-fan] ([@w1ll1am23])
- Device tracker: New [TrackR][trackr] device tracker support ([@w1ll1am23])
- Device tracker: Support for [Xiaomi router][xiaomi] ([@RiRomain])
- Sensor: New [SMA Solar Webconnect][sma] sensor ([@kellerza])
- Notify: [Lannouncer][lannouncer] TTS support ([@michaelarnauts])
- Image processing: Support for [Image processing][image] ([@pvizeli])
- Device tracker: [UPC][upc] connect box platform ([@pvizeli])

- Sensor - sonarr: Add `urlbase` to [Sonarr][] ([@quadportnick])
- Switch - broadlink: Support for [SP][bl-switch] devices ([@Danielhiversen])
- Homematic: Support for HMIP-PSM or HMWIOSwitch ([@danielperna84], [@pvizeli])
- Light - flux: Ledenet protocol support by Flux LED ([@bah2830])
- Device tracker: Support for longer intervals ([@partofthething])
- ISY994: Weather sensors added ([@rmkraus])
- Light - Yeelight: Auto discovery support and color temperature feature for [Yeelight][yeelight] ([@jjensn])
- Media player - SqueezeBox: Switch to JSON-RPC ([@dasos])
- Scripts: Support for `last_triggered` ([@Danielhiversen])
- Media player: Support for `SUPPORT_PLAY` flag ([@armills])
- Minor and not so minor features and bug fixes by [@balloob], [@pvizeli], [@fabaff], [@mezz64], [@andrey-git], [@aequitas], [@abmantis], [@turbokongen], [@jabesq], [@michaelarnauts], [@kellerza], [@titilambert], [@btorresgil], [@henworth], [@armills], [@mjg59], [@Giannie], [@n8henrie], [@magicus], [@florianholzapfel], [@MrMep], [@bah2830], [@happyleavesaoc], [@lwis], [@glance-], [@markferry], and [@nikdoof].

### {% linkable_title Breaking Changes %}

- [APNS][apns] service was moved to the `notify` domain. Use `notify.apns_NOTIFIER_NAME` instead of `apns.NOTIFIER_NAME`.
- InfluxDB component has a new schema to store values in the influx db. You may require to run the `influxdb_migrator` script.
  You have to note:
  - There will not be any tags/fields named time anymore.
  - All numeric fields (int/float/bool) will be stored as float inside influx db.
  - All string fields corresponding to state attributes will be renamed as FIELDNAME_str, where FIELDNAME is the state attribute, to avoid type conflicts.
  - All string fields corresponding to a state will be renamed as state (former value).
  - Fields named value will always be stored as float.
  - Fields named state will always be stored as string.


### {% linkable_title If you need help... %}
...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://gitter.im/home-assistant/home-assistant). The release notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

### {% linkable_title Reporting Issues %}
Experiencing issues introduced by this release? Please report them in our [issue tracker](https://github.com/home-assistant/home-assistant/issues). Make sure to fill in all fields of the issue template.

[@abmantis]: https://github.com/abmantis
[@aequitas]: https://github.com/aequitas
[@andrey-git]: https://github.com/andrey-git
[@armills]: https://github.com/armills
[@bah2830]: https://github.com/bah2830
[@balloob]: https://github.com/balloob
[@brandonweeks]: https://github.com/brandonweeks
[@btorresgil]: https://github.com/btorresgil
[@Danielhiversen]: https://github.com/Danielhiversen
[@danieljkemp]: https://github.com/danieljkemp
[@danielperna84]: https://github.com/danielperna84
[@dasos]: https://github.com/dasos
[@DavidLP]: https://github.com/DavidLP
[@doudz]: https://github.com/doudz
[@eieste]: https://github.com/eieste
[@fabaff]: https://github.com/fabaff
[@florianholzapfel]: https://github.com/florianholzapfel
[@Giannie]: https://github.com/Giannie
[@glance-]: https://github.com/glance-
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@henworth]: https://github.com/henworth
[@HydrelioxGitHub]: https://github.com/HydrelioxGitHub
[@jabesq]: https://github.com/jabesq
[@jjensn]: https://github.com/jjensn
[@kellerza]: https://github.com/kellerza
[@kk7ds]: https://github.com/kk7ds
[@lwis]: https://github.com/lwis
[@magicus]: https://github.com/magicus
[@markferry]: https://github.com/markferry
[@MatoKafkac]: https://github.com/MatoKafkac
[@mezz64]: https://github.com/mezz64
[@michaelarnauts]: https://github.com/michaelarnauts
[@mjg59]: https://github.com/mjg59
[@MrMep]: https://github.com/MrMep
[@n8henrie]: https://github.com/n8henrie
[@nikdoof]: https://github.com/nikdoof
[@partofthething]: https://github.com/partofthething
[@pvizeli]: https://github.com/pvizeli
[@quadportnick]: https://github.com/quadportnick
[@RiRomain]: https://github.com/RiRomain
[@rmkraus]: https://github.com/rmkraus
[@scmmmh]: https://github.com/scmmmh
[@technicalpickles]: https://github.com/technicalpickles
[@ttroy50]: https://github.com/ttroy50
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23
[@wardcraigj]: https://github.com/wardcraigj
[@webworxshop]: https://github.com/webworxshop
[@titilambert]: https://github.com/titilambert

[beaglebone]: https://home-assistant.io/components/bbb_gpio/
[bl-switch]: https://home-assistant.io/components/switch.broadlink/
[dublin]: https://home-assistant.io/components/sensor.dublin_public_transport/
[image]: https://home-assistant.io/components/image_processing/
[insteon]: https://home-assistant.io/components/insteon_local/
[kankun]: https://home-assistant.io/components/switch.kankun/
[lannouncer]: https://home-assistant.io/components/notify.lannouncer/
[packages]: https://home-assistant.io/topics/packages/
[pico]: https://home-assistant.io/components/tts.picotts/
[ping]: https://home-assistant.io/components/device_tracker.ping/
[plates]: https://home-assistant.io/components/openalpr/
[quebec]: https://home-assistant.io/components/sensor.hydroquebec/
[rest]: https://home-assistant.io/components/rest_command/
[sma]: https://home-assistant.io/components/sensor.sma/
[sonarr]: https://home-assistant.io/components/sensor.sonarr/
[tik]: https://home-assistant.io/components/light.tikteck/
[trackr]: https://home-assistant.io/components/device_tracker.trackr/
[upc]: https://home-assistant.io/components/device_tracker.upc_connect/
[usps]: https://home-assistant.io/components/sensor.usps/
[wink-fan]: https://home-assistant.io/components/fan.wink/
[xiaomi]: https://home-assistant.io/components/device_tracker.xiaomi/
[yeelight]: https://home-assistant.io/components/light.yeelight/
[zengge]: https://home-assistant.io/components/light.zengge/
[apns]: https://home-assistant.io/components/notify.apns/
