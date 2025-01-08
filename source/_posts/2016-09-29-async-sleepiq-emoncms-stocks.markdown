---
title: "0.29: 🎈 Async, SleepIQ, OpenALPR, EmonCMS, stocks, and plants"
description: "Move to asynchronous, Support for SleepIQ, OpenALPR, and EmonCMS, and other goodies."
date: 2016-09-29 03:04:05 +0000
date_formatted: "September 29, 2016"
author: Paulus Schoutsen & Fabian Affolter
author_twitter: balloob
categories:
- Release-Notes
- Core
---

Two weeks ago, September 17 marked our 3 year anniversary. In this time Home Assistant managed to grow from a simple script that turned on my lights when the sun set to a kick ass open source project with the best community an open-source project could wish for. This release contains features, bug fixes and performance tweaks by a total of **50** different people! We have also managed to cross the 1000 forks on GitHub. Talking about momentum!

This is a big release as we've completely overhauled the internals of Home Assistant. When I initially wrote Home Assistant, still figuring out the ins and outs of Python, I went for an approach that I was familiar with for an application with many moving parts: threads and locks. This approach has served us well over the years but it was slower than it needed to be, especially on limited hardware.

This all changed when [@bbangert] came around and took on the tough job to migrate the core over to use asynchronous programming. He did an amazing job and I am happy to say that the initial port has been done and is included in this release! On top of that, we have been able to keep our simple and straightforward API at the same time. We are still in the process of migrating more and more components over to the asynchronous API, so expect more speedups and awesome features in the upcoming releases.

### SleepIQ and OpenALPR

There now is support for two new super cool things: Beds and license plates. [@technicalpickles] created a [SleepIQ] component that let you monitor the sensor data of your bed. [@pvizeli] has added license plate recognition based on [OpenALPR]! This means that you can now be notified about which car is parked on your driveway or in your garage. I also would like to use this opportunity to give a big shoutout to [@pvizeli] for being such an awesome member of our community. He joined us at the end of June and has helped crush bugs and add awesome features ever since (65 pull requests already!).

### Configuration validation

On the voluptuous front we have also made great progress. We were able to fully remove the legacy config helpers and have migrated 323 of the 346 components and platforms that needed migrating! This does mean that for some components the configuration has slightly changed, make sure to check out the backward-incompatible changes section at the bottom for more info. Thanks everybody for reviewing the Pull requests, testing the changes, and reporting issues.

### Delayed Release

As you might have noticed, this release has been delayed by 5 days. This was due to a rare, difficult to reproduce problem with the Python interpreter. A huuuuge thanks to all the people that have helped countless hours in researching, debugging and fixing this issue: [@bbangert], [@turbokongen], [@lwis], [@kellerza], [@technicalpickles], [@pvizeli], [@persandstrom] and [@joyrider3774]. I am grateful to have all of you as part of the Home Assistant community.

### Hide automation rules

Since 0.28 [automation rules](/blog/2016/09/10/notify-group-reload-api-pihole/#reload-automation-rules) can be reloaded directly from the frontend.

### All changes

<img src='/images/supported_brands/emoncms.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/sleepiq.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/openalpr.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' />

- Convert core from thread-based to be async-based ([@bbangert], [@balloob])
- New [SleepIQ] support ([@technicalpickles])
- Cover: [Vera] is now supported ([@pavoni])
- Climate: Vera [climate] devices are now supported ([@robjohnson189])
- Climate: [MySensors] is now supported ([@kaustubhphatak])
- Control Home Assistant with [keyboard shortcuts][keyboard_remote] ([@deisi])
- More voluptuous config validations ([@fabaff], [@kellerza], [@balloob])
- New Nuimo controller support added ([@gross1989])
- Sensor: BOM Weather component ([@tinglis1])
- Automation: Option added to hide entity ([@milaq])
- Sensor: [Emoncms] feeds now supported ([@joyrider])
- Sensor: Mi Flora [plant] sensor now supported ([@open-homeautomation])
- Logbook: Allow [filtering] entities and hide hidden entities ([@wokar])
- Notify: [Kodi] support added ([@chrom3])
- Notify: Support for [Simplepush] added ([@fabaff])
- Sensor: [KNX] sensors now supported ([@daBONDi])
- [Wink] improvements ([@w1ll1am23])
- [ISY] improvements ([@Teagan42])
- Link to relevant docs in config validation error messages ([@fabaff])
- Greatly improve the performance of templates ([@balloob], [@pvizeli])
- Notify - [Slack]: Support for username/icon ([@Khabi])
- MQTT room detection: Away [timeout] now supported ([@mKeRix])
- Climate: [Nest] can now control the fan ([@jawilson])
- Modbus: Major cleanup for [Modbus] switches and sensors ([@persandstrom])
- HTTP: Allow [passwordless] logins from whitelisted IP addresses ([@Danielhiversen])
- Sensor: Yahoo! Finance stocks now supported ([@tchellomello])
- Sensor: Set value based on incoming [email] ([@sam-io])
- Light: White value now supported (@mxtra, [@MartinHjelmare])
- [InfluxDB] now allows attaching extra data ([@lwis])
- [OpenALPR] support ([@pvizeli])
- Minor features and bug fixes by [@fabaff], [@w1ll1am23], [@turbokongen], [@clach04], [@mKeRix], [@pvizeli], [@DavidLP], [@nvella], [@Teagan42], [@ericwclymer], [@wokar], [@kellerza], [@nkgilley], [@jawilson], [@Danielhiversen], [@ej81], [@danieljkemp], [@balloob], [@philhawthorne], [@LinuxChristian], [@milas], [@simonszu], [@Cinntax], [@irvingwa], [@sytone], [@kk7ds], [@robbiet480].

### Hotfix 0.29.1 - September 29

- Fix typo in Nest climate platform. [We are still experiencing issues with Nest.][nest-issues] ([@tchellomello])

### Hotfix 0.29.2 - September 29

 - InfluxDB config fix ([@fabaff], reported by [@lwis])
 - Netatmo config fix ([@jabesq])

### Hotfix 0.29.3 - September 29

 - Hue config fix ([@pvizeli])

### Hotfix 0.29.4 - September 30

 - Alexa config fix ([@balloob], reported by [@lwis])
 - Envisalink discovery fix ([@cinntax])
 - Acer Projector config fix ([@pvizeli])

### Hotfix 0.29.5 - September 30

 - Fix Climate Nest platform ([@tchellomello], [@jawilson])

### Hotfix 0.29.6 - October 1

 - Fix segmentation fault ([@bbangert]) 🎉
 - Fix nested templates in `data_template` would incorrectly get cached ([@balloob])

### Hotfix 0.29.7 - October 5

 - Fix handling SIGTERM and SIGHUP signals (fixes Systemd restart issues) ([@pvizeli])

### Backward-incompatible changes

 - The template methods `now` and `utcnow` have been changed from variables to methods. To get the current time replace `now` with `now()`.
 - `yahooweather` default name is now `yweather`. Also min and max temperature are now correctly called `Temperature Min` and `Temperature Max`.
 - `ffmpeg` is now a component for manage some things central. All `ffmpeg_bin` options have moved to this compoment from platforms.
 - Config has changed for [X10] lights.
 - For Wink, make sure your config only contains the access token as in the [docs][Wink].
 - Nest sensor 'mode' has been renamed to 'operation_mode'

### If you need help...
...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://discord.gg/c5DvZ4e). The release notes have comments enabled but it's preferred if you the former communication channels. Thanks.

[nest-issues]: https://github.com/home-assistant/home-assistant/issues/3574
[@jabesq]: https://github.com/jabesq
[@joyrider3774]: https://github.com/joyrider3774
[@balloob]: https://github.com/balloob
[@bbangert]: https://github.com/bbangert
[@chrom3]: https://github.com/chrom3
[@Cinntax]: https://github.com/Cinntax
[@clach04]: https://github.com/clach04
[@daBONDi]: https://github.com/daBONDi
[@Danielhiversen]: https://github.com/Danielhiversen
[@danieljkemp]: https://github.com/danieljkemp
[@DavidLP]: https://github.com/DavidLP
[@deisi]: https://github.com/deisi
[@ej81]: https://github.com/ej81
[@ericwclymer]: https://github.com/ericwclymer
[@fabaff]: https://github.com/fabaff
[@gross1989]: https://github.com/gross1989
[@irvingwa]: https://github.com/irvingwa
[@jawilson]: https://github.com/jawilson
[@joyrider]: https://github.com/joyrider
[@kaustubhphatak]: https://github.com/kaustubhphatak
[@kellerza]: https://github.com/kellerza
[@Khabi]: https://github.com/Khabi
[@kk7ds]: https://github.com/kk7ds
[@LinuxChristian]: https://github.com/LinuxChristian
[@lwis]: https://github.com/lwis
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@milaq]: https://github.com/milaq
[@milas]: https://github.com/milas
[@mKerix]: https://github.com/mKerix
[@nkgilley]: https://github.com/nkgilley
[@nvella]: https://github.com/nvella
[@open-homeautomation]: https://github.com/open-homeautomation
[@pavoni]: https://github.com/pavoni
[@persandstrom]: https://github.com/persandstrom
[@philhawthorne]: https://github.com/philhawthorne
[@pvizeli]: https://github.com/pvizeli
[@robbiet480]: https://github.com/robbiet480
[@robjohnson189]: https://github.com/robjohnson189
[@sam-io]: https://github.com/sam-io
[@simonszu]: https://github.com/simonszu
[@sytone]: https://github.com/sytone
[@tchellomello]: https://github.com/tchellomello
[@Teagan42]: https://github.com/Teagan42
[@technicalpickles]: https://github.com/technicalpickles
[@tinglis1]: https://github.com/tinglis1
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23
[@wokar]: https://github.com/wokar

[climate]: /integrations/vera
[email]: /integrations/imap_email_content/
[Emoncms]: /integrations/emoncms
[filtering]: /integrations/logbook/
[InfluxDB]: /integrations/influxdb/
[ISY]: /integrations/isy994/
[KNX]: /integrations/sensor.knx/
[Kodi]: /integrations/kodi
[Modbus]: /integrations/modbus/
[Nest]: /integrations/nest/
[OpenALPR]: /integrations/openalpr_local/
[passwordless]: /integrations/http/
[Simplepush]: /integrations/simplepush
[Slack]: /integrations/slack
[SleepIQ]: /integrations/sleepiq/
[timeout]: /integrations/mqtt_room
[Vera]: /integrations/vera
[Wink]: /integrations/wink/
[plant]: /integrations/miflora
[MySensors]: /integrations/climate.mysensors/
[keyboard_remote]: /integrations/keyboard_remote
[X10]: /integrations/x10
