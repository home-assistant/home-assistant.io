---
layout: post
title: "0.27: Notify improvements, configuration checks, and HP ILO support"
description: "HTML5 push notifications and grouping support, Configuration validations and checking, cover, and climate."
date: 2016-08-19 09:00
date_formatted: "August 19, 2016"
author: Paulus Schoutsen & Fabian Affolter
author_twitter: balloob
comments: true
categories: Release-Notes
---

This upcoming release can only be described with one word: **Amazing**

As of this release we have done [10,000 builds on Travis](https://travis-ci.org/home-assistant/home-assistant/builds/154660811) and recently passed 900 forks on Github! We are also  fast approaching 4,000 stars on Github.

While this release is **Amazing**, we had to crack a few eggs to make an omelette so some things are broken. Please make sure to read the Breaking Changes section below!


### {% linkable_title Notification improvements %}
We have some excellent upgrades to the notification system coming to you in 0.27, courtesy of [@robbiet480].

#### {% linkable_title HTML5 Push Notifications %}
This release will enable [HTML5] push notifications on Chrome/Firefox/Opera on both desktop and Android devices. This means that you can send a notification to your phone even when the site is not open on it. When using Chrome you can include an action so that you can control your phone from your lock screen. Thanks again to [@robbiet480] for all his hard work on this!

<p class='img'>
  <img src='{{site_root}}/images/screenshots/html5-notify.png' />
</p>

#### {% linkable_title Notification Groups %}
Using the new notify `group` platform allows you to cut down a lot of duplicate automation logic by combining multiple notification platforms and `target`s into a single notify service. Check out the [docs](https://home-assistant.io/components/notify.group/) for more info.

#### {% linkable_title `target` is no longer needed! %}
For platforms that support it, starting with the new HTML5 platform, any `target`s that are available will be exposed as individual services, so no more having to remember which `target`s to use. Please note that the existing services also still exist so you can keep using `target` if you wish.

### {% linkable_title Validate configuration before restarting Home Assistant %}
Ever restarted Home Assistant to test a configuration change just to figure out there is a validation error? Well, not anymore! [@kellerza] has added a command line script that will validate your configuration as if you start Home Assistant.

```bash
$ hass --script check_config
```

### {% linkable_title Configuration validation %}
This release includes a first big push on making sure all platforms contain proper configuration validation. This should help in getting your configuration right. Thanks to [@fabaff], [@pavoni], [@pvizeli], and [@nkgilley] for all the hard work on this, you rock!

<p class='img'>
  <img src='{{site_root}}/images/screenshots/config-validation.png' />
</p>

### {% linkable_title FFMPEG motion / noise sensing %}
It's now possible to use [FFMpeg] to monitor a video stream and detect motion thanks to a new binary sensor platform by [@pvizeli].

### {% linkable_title Component clean up - Thermostat & HVAC -> Climate. Rollershutter & Garage Door -> Cover. %}
Due to our wild growth we ended up with some components that had a lot of overlapping functionality. [@turbokongen] took on the hard job on merging them. Thermostat and HVAC platforms are now combined under the new [Climate] component. Rollershutter and Garage Door platforms are now combined under the new Cover component. You can easily upgrade by just swapping out the name. For example replace `thermostat` with `climate`. The old components have been deprecated and will be removed in the near future.

### {% linkable_title All changes %}

<img src='/images/supported_brands/html5.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/mqtt.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/hewlett_packard_enterprise.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/wunderground.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' />

- Merge thermostat and HVAC components into new [climate] component ([@turbokongen])
- Merge rollershutter and garage door components into new [cover] component ([@turbokongen])
- Alarm Control Panel - Manual: Allow returning to previous state after [trigger] ([@tobiebooth])
- Sensor - DHT: Allow range [checking] ([@open-homeautomation])
- Light entities will now [expose] their features ([@shmuelzon])
- Sensor: Monitor HP ILO sensors on [HP] servers ([@Juggels])
- Sensor: Monitor [Fritzbox] Calls ([@DavidMStraub])
- Notify: LlamaLab [Automate] is now supported ([@danielperna84])
- Sensor: Serial [CO2] sensors now supported ([@open-homeautomation])
- Sensor: MQTT room [presence] detection ([@mKerix])
- Notify: New group platform allows [grouping] notify targets across platforms ([@robbiet480])
- [HTML5] push notifications ([@robbiet480], [@balloob])
- Weather: [Wunderground] now supported ([@arsaboo], [@Teagan42])
- New check config script to test validity before restarting HA ([@kellerza])
- Binary Sensor: Allow [monitoring] a camera feed using FFMpeg ([@pvizeli])
- Cover: Z-Wave platform now supports [positions] ([@nunofgs])
- Device tracker: allow using [Gravatar] for entity picture ([@robbiet480])
- Notify: platforms with known targets will expose them as standalone services ([@robbiet480])
- Camera: [MJPEG] and [Generic] camera's can now authenticate using digest auth ([@meatz])
- Weather: Forecast.io now can show daily temp/precip [forecast] values ([@DavidMStraub])
- Media Player: WebOS TV now allows [customizing][webos] the sources ([@roidayan])
- Device tracker: Allow tracking devices using [Bluetooth] Low-Energy ([@open-homeautomation])
- Notify: Ensure [Slack] messages appear as correct user ([@technicalpickles])
- YAML: [Secrets] will look for values in all parents folders up to the config root folder ([@Teagan42])
- Camera: Generic camera now supports [template] support ([@balloob])
- Slack: Allow sending [attachments] ([@technicalpickles])
- Device Tracking: TP-Link Archer C7 5 GHz devices will now also be [found] ([@dpford])
- Z-Wave: New rename [node] service added ([@jnewland])
- Wink: [Bug] fixes ([@w1ll1am23])
- Homematic: new device and controller variable [support] ([@danielperna84], [@pvizeli], [@mcdeck])

### {% linkable_title Breaking changes %}
- Ecobee3 occupancy sensors have moved from sensor platform to binary sensor platform.
- Forecast.io entity IDs are now like `sensor.forecastio_temperature`. Previously they were like `sensor.weather_temperature`. Apologies for this change, but we needed to make Forecast.io more generic now that we have many weather platforms.
- The [Loop Energy][Loop] sensor configuration format changed slightly, please reformat based on the revised documentation.
- The configuration for the [SABnzbd] sensor has slightly changed. The prefix `type:` is no longer required for monitored variables.

### {% linkable_title Deprecations %}
- Using the thermostat and hvac components has been deprecated. Please migrate to the new climate component. (just change name, configurations are compatible)
- Using the rollershutter and garage door components has been deprecated. Please migrate to the new cover component. (just change name, configurations are compatible)

[@arsaboo]: https://github.com/arsaboo
[@balloob]: https://github.com/balloob
[@danielperna84]: https://github.com/danielperna84
[@DavidMStraub]: https://github.com/DavidMStraub
[@dpford]: https://github.com/dpford
[@fabaff]: https://github.com/fabaff
[@jnewland]: https://github.com/jnewland
[@Juggels]: https://github.com/Juggels
[@kellerza]: https://github.com/kellerza
[@mcdeck]: https://github.com/mcdeck
[@meatz]: https://github.com/meatz
[@mKerix]: https://github.com/mKerix
[@nkgilley]: https://github.com/nkgilley
[@nunofgs]: https://github.com/nunofgs
[@open-homeautomation]: https://github.com/open-homeautomation
[@pavoni]: https://github.com/pavoni
[@pvizeli]: https://github.com/pvizeli
[@robbiet480]: https://github.com/robbiet480
[@roidayan]: https://github.com/roidayan
[@roidayan]: ttps://github.com/roidayan
[@shmuelzon]: https://github.com/shmuelzon
[@Teagan42]: https://github.com/Teagan42
[@technicalpickles]: https://github.com/technicalpickles
[@tobiebooth]: https://github.com/tobiebooth
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23

[checking]: /components/sensor.dht/
[FFMpeg]: /components/binary_sensor.ffmpeg/
[Climate]: /components/climate/
[NZBGet]: /components/sensor.nzbget/
[SABnzbd]: /components/sensor.sabnzbd/
[HP]: /components/sensor.hp_ilo/
[Fritzbox]: /components/sensor.fritzbox_callmonitor/
[webos]: /components/media_player.webostv/
[HTML5]: /components/notify.html5/
[Gravatar]: /components/device_tracker/
[Loop]: /components/sensor.loop_energy/
[cover]: /components/cover/
[climate]: /components/climate/
[expose]: /components/light/
[Automate]: /components/notify.llamalab_automate/
[Secrets]: /topics/secrets/
[trigger]: /components/alarm_control_panel.manual/
[CO2]: /components/sensor.mhz19/
[presence]: /components/sensor.mqtt_room
[grouping]: /components/notify.group/
[Wunderground]: /components/sensor.wunderground/
[monitoring]: /components/binary_sensor.ffmpeg/
[MJPEG]: /components/camera.mjpeg/
[Generic]: /components/camera.generic/
[positions]: /components/cover.zwave/
[forecast]: /components/sensor.forecast/
[Bluetooth]: /components/device_tracker.bluetooth_le_tracker/
[Slack]: /components/notify.slack/
[template]: /components/camera.generic/
[Bug]: /components/wink/
[support]: /components/homematic/
[node]: /components/zwave/
[found]: /components/device_tracker.tplink/
[attachments]: /components/notify.slack/
