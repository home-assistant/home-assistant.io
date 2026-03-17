---
title: "0.36: ISS, USPS, Image processing, Insteon"
description: "Track packages, space stations, TrackR devices, Xiaomi, and UPC connect boxes"
date: 2017-01-14 08:04:05 +0000
date_formatted: "January 15, 2017"
author: Fabian Affolter
author_twitter: fabaff
categories:
- Release-Notes
- Core
og_image: /images/blog/2016-01-0.36/social.png
---

Welcome to 2017 and 0.36. We are proud to announce the first release for this year. While we are still migrating parts to async but 0.36 is focusing on new features and a lot of bug fixes.

### Packages
[Packages][packages] are providing a new way to organize different component's configuration parts together. With packages we offer the option to include different components or parts of configuration using any of the `!include` directives.

### InfluxDB export
The [InfluxDB][influx] component was causing problems in a wide variety of use cases. [@titilambert] improved our InfluxDB exporter feature. It might be that you need to run the [migration script](/integrations/influxdb/#migration-script) to update your InfluxDB database.

```bash
$ hass --script influxdb_migrator \
    -H IP_INFLUXDB_HOST -u INFLUXDB_USERNAME -p INFLUXDB_PASSWORD \
    -d INFLUXDB_DB_NAME
```

### International Space Station (ISS)
No, unfortunately we are not going to space. The `iss` sensor is tracking the position of the International Space Station and gives you some details.

### Insteon local
The support for Insteon was removed due to issues a while ago. With the `insteon_local` component support for [Insteon][insteon] is back and let one work locally with an Insteon setup.

### Image processing
The new [image processing component][image] currently works with [number plates][plates]. But this could level the way to integrate feature like facial recognition, motion detection, or gestures control.

## All changes

- Sensor: Support for HydroQuebec ([@titilambert])
- Sensor: Tracking the [ISS][iss] ([@HydrelioxGitHub])
- Sensor: USPS deliveries tracking ([@happyleavesaoc])
- Device tracker: New [ping-based][ping] tracker ([@michaelarnauts])
- TTS: Support for [Pico][pico] ([@doudz])
- Switch: [BeagleBone Black][beaglebone] GPIO are supported now ([@MatoKafkac])
- Light: New support for [Tikteck][tik] Bluetooth bulbs ([@mjg59])
- Switch: Support for customised [Kankun SP3 Wifi][kankun] switches ([@webworxshop])
- Insteon local: Local [insteon][insteon] support([@craigjmidwinter])
- `rest_command`: Support for using [REST][rest] ([@pvizeli])
- Sensor: Show details of the [Dublin RTPI][dublin] information ([@ttroy50])
- Light: [Zengge Bluetooth][zengge] bulbs ([@mjg59])
- Fan: Wink support for [fans][wink-fan] ([@w1ll1am23])
- Device tracker: New [TrackR][trackr] device tracker support ([@w1ll1am23])
- Device tracker: Support for [Xiaomi router][xiaomi] ([@RiRomain])
- Sensor: New [SMA Solar Webconnect][sma] sensor ([@kellerza])
- Notify: [Lannouncer][lannouncer] TTS support ([@michaelarnauts])
- Image processing: Support for [Image processing][image] ([@pvizeli])
- Device tracker: [UPC][upc] Connect box platform support ([@pvizeli])
- Weather: Australian BOM (Bureau of Meteorology) support ([@Zac-HD])
- Notify: Support for [MySensors][mysensors] notifications ([@MartinHjelmare])
- TTS: New [Yandex SpeechKit TTS][yandex] integration ([@lupin-de-mid])
- Notify: [Facebook Messenger][facebook] support ([@gopalkildoliya])

- Sensor - sonarr: Add `urlbase` to [Sonarr][] ([@quadportnick])
- Switch - broadlink: Support for [SP][bl-switch] devices ([@Danielhiversen])
- Homematic: Support for HMIP-PSM or HMWIOSwitch ([@danielperna84], [@pvizeli])
- Light - flux: Ledenet protocol support by Flux LED ([@bah2830])
- Device tracker: Support for longer intervals ([@partofthething])
- ISY994: Weather sensors added ([@rmkraus])
- InfluxDB: Improvements to avoid issues with storing details ([@titilambert])
- Light - Yeelight: Auto discovery support and color temperature feature for [Yeelight][yeelight] ([@jjensn])
- Media player - SqueezeBox: Switch to JSON-RPC ([@dasos])
- Scripts: Support for `last_triggered` ([@Danielhiversen])
- Media player: Support for `SUPPORT_PLAY` flag ([@armills])
- Docker: `ffmpeg` is now included by default ([@colinodell])
- Minor and not so minor features and bug fixes by [@balloob], [@pvizeli], [@fabaff], [@mezz64], [@andrey-git], [@aequitas], [@abmantis], [@turbokongen], [@jabesq], [@michaelarnauts], [@kellerza], [@titilambert], [@btorresgil], [@henworth], [@armills], [@mjg59], [@Giannie], [@n8henrie], [@magicus], [@florianholzapfel], [@MrMep], [@bah2830], [@happyleavesaoc], [@lwis], [@glance-], [@markferry], and [@nikdoof].

### Release 0.36.1 - January 17

 - Fix load_yaml default value ([@balloob])
 - Fix discovery of flux_led ([@Danielhiversen])
 - Fix Python Nest dependency re-installation ([@Danielhiversen])
 - Make USPS to use absolute path to save cookie ([@tchellomello])
 - Fix UPC_connect cookies ([@pvizeli])
 - Fix Eq3bt import issues ([@rytilahti])
 - Fix Bluetooth and Volvo trackers ([@pvizeli])
 - Fix lannouncer notify platform ([@mKeRix])

### Backward-incompatible changes

- [APNS][apns] service was moved to the `notify` domain. Use `notify.apns_NOTIFIER_NAME` instead of `apns.NOTIFIER_NAME`.
- [InfluxDB][influx] component has a new [schema](/integrations/influxdb/#data-migration) to store values in the InfluxDB database. You may require to run the [`influxdb_migrator`](/integrations/influxdb/#migration-script) script.
  You have to note:
  - There will not be any tags/fields named time anymore.
  - All numeric fields (int/float/bool) will be stored as float inside influx db.
  - All string fields corresponding to state attributes will be renamed as FIELDNAME_str, where FIELDNAME is the state attribute, to avoid type conflicts.
  - All string fields corresponding to a state will be renamed as state (former value).
  - Fields named value will always be stored as float.
  - Fields named state will always be stored as string.
- TTS cache files use now the language abbreviation as part of the name. If you want to use the cache, it need to be renamed or cleared, new created. E. g. `HASH_PLATFORM.xxx` -> `HASH_LANG_PLATFORM.xxx`.

### If you need help...
...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://discord.gg/c5DvZ4e). The release notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

### Reporting Issues
Experiencing issues introduced by this release? Please report them in our [issue tracker](https://github.com/home-assistant/home-assistant/issues). Make sure to fill in all fields of the issue template.

[@tchellomello]: https://github.com/tchellomello
[@rytilahti]: https://github.com/rytilahti
[@mKeRix]: https://github.com/mKeRix
[@abmantis]: https://github.com/abmantis
[@aequitas]: https://github.com/aequitas
[@andrey-git]: https://github.com/andrey-git
[@armills]: https://github.com/armills
[@bah2830]: https://github.com/bah2830
[@balloob]: https://github.com/balloob
[@brandonweeks]: https://github.com/brandonweeks
[@btorresgil]: https://github.com/btorresgil
[@colinodell]: https://github.com/colinodell
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
[@gopalkildoliya]: https://github.com/gopalkildoliya
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@henworth]: https://github.com/henworth
[@HydrelioxGitHub]: https://github.com/HydrelioxGitHub
[@jabesq]: https://github.com/jabesq
[@jjensn]: https://github.com/jjensn
[@kellerza]: https://github.com/kellerza
[@kk7ds]: https://github.com/kk7ds
[@lupin-de-mid]: https://github.com/lupin-de-mid
[@lwis]: https://github.com/lwis
[@magicus]: https://github.com/magicus
[@markferry]: https://github.com/markferry
[@MartinHjelmare]: https://github.com/MartinHjelmare
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
[@titilambert]: https://github.com/titilambert
[@ttroy50]: https://github.com/ttroy50
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23
[@craigjmidwinter]: https://github.com/craigjmidwinter
[@webworxshop]: https://github.com/webworxshop
[@Zac-HD]: https://github.com/Zac-HD

[apns]: /integrations/apns
[beaglebone]: /integrations/bbb_gpio/
[bl-switch]: /integrations/broadlink#switch
[dublin]: /integrations/dublin_bus_transport/
[facebook]: /integrations/facebook
[image]: /integrations/image_processing/
[influx]: /integrations/influxdb/
[insteon]: /integrations/insteon/
[iss]: /integrations/iss
[kankun]: /integrations/kankun
[lannouncer]: /integrations/lannouncer
[mysensors]: /integrations/notify.mysensors/
[packages]: /topics/packages/
[pico]: /integrations/picotts
[ping]: /integrations/ping
[plates]: /integrations/openalpr_local/
[rest]: /integrations/rest_command/
[sma]: /integrations/sma#sensors
[sonarr]: /integrations/sonarr
[tik]: /integrations/tikteck
[trackr]: /integrations/trackr
[upc]: /integrations/upc_connect
[usps]: /integrations/usps#sensor
[wink-fan]: /integrations/wink#fan
[xiaomi]: /integrations/device_tracker.xiaomi/
[yandex]: /integrations/yandextts
[yeelight]: /integrations/yeelight
[zengge]: /integrations/zengge
