---
title: "0.9: Rollershutters, locks, binary sensors and InfluxDB"
description: Version 0.9 of Home Assistant has been released.
date: 2015-12-06 12:29:00 -0700
date_formatted: "December 6, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
og_image: /images/blog/2015-12-release-09/facebook-09.png
---

It's been a few weeks but we managed to polish a nice new release of Home Assistant for y'all!

<img src='/images/supported_brands/homematic.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='238' /><img src='/images/supported_brands/ecobee.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='238' /><img src='/images/supported_brands/influxdb.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='238' />

 - New [lock component] including [Wink][lock.wink] support ([@miniconfig])
 - New [binary sensor component] including [aRest][binary_sensor.arest] and [MQTT][binary_sensor.mqtt] support ([@fabaff])
 - New rollershutter component including MQTT support ([@sfam])
 - New [InfluxDB component] to store data in InfluxDB ([@fabaff])
 - Thermostat: [Ecobee] now supported ([@nkgilley])
 - Thermostat: [Homematic] now supported ([@goir])
 - Support for [parsing JSON values] received over MQTT ([@mcdeck])
 - Bunch of bug fixes and optimizations

To update, run `pip3 install --upgrade homeassistant`.

[lock component]: /integrations/lock/
[lock.wink]: /integrations/wink#lock
[binary sensor component]: /integrations/binary_sensor/
[binary_sensor.arest]: /integrations/arest#binary-sensor
[binary_sensor.mqtt]: /integrations/binary_sensor.mqtt/
[InfluxDB component]: /integrations/influxdb/
[Ecobee]: /integrations/ecobee/#thermostat
[Homematic]: /integrations/homematic/
[parsing JSON values]: /integrations/mqtt/#processing-json

[@miniconfig]: https://github.com/miniconfig
[@fabaff]: https://github.com/fabaff
[@sfam]: https://github.com/sfam
[@fabaff]: https://github.com/fabaff
[@nkgilley]: https://github.com/nkgilley
[@mcdeck]: https://github.com/mcdeck
[@goir]: https://github.com/goir

<p class='img'>
<img src='/images/screenshots/lock-and-rollershutter-card.png'>
</p>

