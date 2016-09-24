---
layout: post
title: "0.29: Async, SleepIQ, OpenALPR, EmonCMS, stocks, and plants"
description: "Move to asynchronous, Support for SleepIQ, OpenALPR, and EmonCMS, and other goodies."
date: 2016-09-24 08:00:00 +0200
date_formatted: "September 24, 2016"
author: Paulus Schoutsen & Fabian Affolter
author_twitter: balloob
comments: true
categories: Release-Notes
---

It's time for 0.29 and this is a big release as we've completely overhauled the internals of Home Assistant. When I initially wrote Home Assistant, still figuring out the ins and outs of Python, I went for an approach that I was familiar with for an application with many moving parts: threads and locks. This approach has served us well over the years but it was slower than it needed to be, especially on limited hardware.

This all changed when [@bbangert] came around and took on the tough job to migrate the core over to use asynchronous programming. He did an amazing job and I am happy to say that the initial port has been done and is included in this release! On top of that, we have been able to keep our simple and straightforward API at the same time. We are still in the process of migrating more and more components over to the asynchronous API, so expect more speedups and awesome features in the upcoming releases.

### {% linkable_title SleepIQ and OpenALPR %}
There now is support for two new super cool things: Beds and license plates. [SleepIQ] let you monitor the sensor data of your bed. The [OpenALPR] implementation allows one to process license plates from a camera image to automate the opening of a garage door or to trigger other events.

### {% linkable_title Configuration validation %}

On the voluptuous front we have also made great progress. We were able to fully remove the legacy config helpers and have migrated 323 of the 346 components and platforms that needed migrating! This does mean that for some components the configuration has slightly changed, make sure to check out the breaking changes section at the bottom for more info.

### {% linkable_title All changes %}

<img src='/images/supported_brands/emoncms.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/sleepiq.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/openalpr.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' />

- Convert core from thread-based to be async-based ([@bbangert], [@balloob])
- New [SleepIQ] support ([@technicalpickles])
- Cover: [Vera] is now supported ([@pavoni])
- Climate: Vera [climate] devices are now supported ([@robjohnson189])
- Climate: [MySensors] is now supported ([@kaustubhphatak])
- Control Home Assistant with keyboard shortcuts ([@deisi])
- More voluptuous config validations ([@fabaff], [@kellerza], [@balloob])
- New [Nuimo] controller support added ([@gross1989])
- Sensor: [BOM] Weather component ([@tinglis1])
- Automation: Option added to hide entity ([@milaq])
- Sensor: [Emoncms] feeds now supported ([@joyrider])
- Sensor: Mi Flora [plant] sensor now supported ([@open-homeautomation])
- Logbook: Allow [filtering] entities and hide hidden entities ([@wokar])
- Notify: [Kodi] support added ([@chrom3])
- Notify: Support for [Simplepush] added ([@fabaff])
- Sensor: [KNX] sensors now supported ([@daBONDi])
- [Wink] improvements ([@w1ll1am23])
- [ISY] improvements ([@Teagan42])
- Notify - [Slack]: Support for username/icon ([@Khabi])
- MQTT room detection: Away [timeout] now supported ([@mKeRix])
- Climate: [Nest] can now control the fan ([@jawilson])
- Modbus: Major cleanup for [Modbus] switches and sensors ([@persandstrom])
- HTTP: Allow [passwordless] logins from whitelisted IP addresses ([@Danielhiversen])
- Sensor: Yahoo! Finance [stocks] now supported ([@tchellomello])
- Sensor: Set value based on incoming [email] ([@sam-io])
- Light: White value now supported ([@mxtra], [@MartinHjelmare])
- [InfluxDB]: Allow attaching extra data ([@lwis])
- [OpenALPR] support ([@pvizeli])
- Minor features and bug fixes by [@fabaff], [@w1ll1am23], [@turbokongen], [@clach04], [@mKeRix], [@pvizeli], [@DavidLP], [@nvella], [@Teagan42], [@ericwclymer], [@wokar], [@kellerza], [@nkgilley], [@jawilson], [@Danielhiversen], [@ej81], [@danieljkemp], [@balloob], [@philhawthorne], [@LinuxChristian], [@milas], [@simonszu], [@Cinntax], [@irvingwa], [@sytone], [@kk7ds], [@robbiet480].

### {% linkable_title Breaking changes %}

 - `yahooweather` default name is now `yweather`. Also min and max temperature are now correctly called `Temperature Min` and `Temperature Max`.
 - `ffmpeg` is now a component for manage some things central. All `ffmpeg_bin` options have moved to this compoment from platforms.

### {% linkable_title If you need help... %}
...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://gitter.im/home-assistant/home-assistant). The release notes have comments enabled but it's preferred if you the former communication channels. Thanks.

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

[BOM]: https://home-assistant.io/components/sensor.bom/
[climate]: https://home-assistant.io/components/climate.vera/
[email]: https://home-assistant.io/components/sensor.imap_email_content/
[Emoncms]: https://home-assistant.io/components/sensor.emoncms/
[filtering]: https://home-assistant.io/components/logbook/
[InfluxDB]: https://home-assistant.io/components/influxdb/
[ISY]: https://home-assistant.io/components/isy994/
[KNX]: https://home-assistant.io/components/sensor.knx/
[Kodi]: https://home-assistant.io/components/notify.kodi/
[Modbus]: https://home-assistant.io/components/modbus/
[Nest]: https://home-assistant.io/components/fan.nest/
[Nuimo]: https://home-assistant.io/components/nuimo/
[OpenALPR]: https://home-assistant.io/components/openalpr/
[passwordless]: https://home-assistant.io/components/http/
[Simplepush]: https://home-assistant.io/components/notify.simplepush/
[Slack]: https://home-assistant.io/components/notify.slack/
[SleepIQ]: https://home-assistant.io/components/sleepiq/
[stocks]: https://home-assistant.io/components/sensor.yahoo_finance/
[timeout]: https://home-assistant.io/components/sensor.mqtt_room/
[Vera]: https://home-assistant.io/components/cover.vera/
[Wink]: https://home-assistant.io/components/wink/
[plant]: https://home-assistant.io/components/sensor.miflora/

