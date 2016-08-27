---
layout: post
title: "0.27 is here to crack eggs and take names: notifications, Hue fakery and unification come to Home Assistant"
description: "HTML5 push notifications and grouping support, Configuration validations and checking, cover, and climate."
date: 2016-08-27 14:17:25 +0200
date_formatted: "August 27, 2016"
author: Robbie Trencheny
author_twitter: Robbie
comments: true
categories: Release-Notes
---

This release, 0.27, could only be possibly described by exactly one word:

# #Amazing


Keep reading to see what **#Amazing** things we have in store for you this week :smile:! And make sure you read all the way to the end, because I left a present down there for those committed few among you :)

But first...

## {% linkable_title Some general housekeeping %}

Paulus ([@balloob]) is on vacation in Europe this week, so you will all have to deal with me, Robbie ([@robbiet480]) for this release blog post. Don't worry, he'll be back to tearing apart your pull requests in no time :-). 

Special thanks to my awesome helpers for this week's release who are looking over my shoulder to make sure I'm crossing my t's and dotting my i's: [@Teagan42], [@infamy] and [@fabaff].

## {% linkable_title Handing out some trophies %}

I felt that I had to 1-up Paulus ([@balloob]) somehow with his 500,000 pageviews stat he shared in the [0.26 blog post](https://home-assistant.io/blog/2016/08/13/foursquare-fast-com-ffmpeg-gpsd/), so I pushed myself and our development community as a whole super hard the last two weeks to put a lot of love into Home Assistant to bring you not just 1, but 6 **#Amazing** stats for this release. I am extremely happy to report to you the following stats. We have now passed:

* [10,000](https://travis-ci.org/home-assistant/home-assistant/builds/154660811) builds on Travis (congrats to [@BluGeni])
* [3,000](https://github.com/home-assistant/home-assistant/pull/3000) issues and pull requests (thanks [@kellerza]!)
* [2,000](https://github.com/home-assistant/home-assistant/pull/2991) pull requests alone (awesome [@fabaff]!!)
* 900 forks on Github!

In addition,

* Almost at 4,000 stars on Github!
* [I'm now #5 contributor by most commits!!!](https://github.com/home-assistant/home-assistant/graphs/contributors) Hey wait, how'd this get in here 😳 

Now that we have that great news out of the way, onto this week's release which is going to keep the **#Amazing** gravy train rolling right along and get to the stuff you all _really_ are here for.

## {% linkable_title 0.27 %}

While this release is **#Amazing**, we had to break a few eggs (now you understand the title reference!) to make a beautiful omelette (using home automation obviously) so some platforms and components have needed to introduce breaking changes. Please make sure to read the Breaking Changes section below.

### {% linkable_title Hue Bridge Emulation %}
Thanks to [@mgbowen] we now have the functionality previously provided by [@blocke]'s [ha-local-echo](https://github.com/blocke/ha-local-echo) built right into Home Assistant! This means that for those of you with devices that either lack or have a subpar integration with Home Assistant (looking at you Amazon Echo) you can now have a better experience by having your Home Assistant [fake a Hue Bridge][Hue]. Personally, I have used [@auchter]'s [Haaska](https://github.com/auchter/haaska) previously but found that it was slow to respond and sometimes failed entirely. With the new [`emulated_hue`][Hue] component, we can have local control of entities through Amazon Echo.

### {% linkable_title Notification improvements %}
We have some excellent upgrades to the notification system coming to you in 0.27, courtesy of [@robbiet480].

#### {% linkable_title HTML5 Push Notifications %}
This release adds support for [HTML5] push notifications on Chrome/Firefox/Opera on both desktop and Android devices. This means that you can send a notification to your phone even your Home Assistant is not in your mobile browser. When using Chrome you can even include 2 action buttons so that you can control your Home Assistant from your phone's lock screen, allowing you to do things like sound alarms or unlock your front door, all without leaving the notification. Thanks again to me ([@robbiet480]) and Paulus ([@balloob]) for all the hard work on this!

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

### {% linkable_title FFMpeg motion/noise sensing %}
It's now possible to use [FFMpeg] to monitor a video stream and detect motion thanks to a new binary sensor platform by [@pvizeli].

### {% linkable_title Component clean up - Thermostat & HVAC -> Climate. Rollershutter & Garage Door -> Cover. %}
Due to our wild growth we ended up with some components that had a lot of overlapping functionality. [@turbokongen] took on the hard job on merging them. Thermostat and HVAC platforms are now combined under the new [Climate] component. Rollershutter and Garage Door platforms are now combined under the new [Cover][cover] component. You can easily upgrade by just swapping out the name. For example replace `thermostat` with `climate`. The old components have been deprecated and will be removed in the near future.

### {% linkable_title A new `fan` component %}
Along with the new `climate` component, [@Teagan42] and I decided we needed something simpler to just control a [fan]. By the time 0.27 is released it should have support for MQTT and Insteon Hub fans with more to come soon.

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
- Allow emulating a [Hue] bridge to control entities ([@mgbowen])
- New [Fan][fan] component ([@Teagan42], [@robbiet480])

### {% linkable_title Breaking changes %}
- Ecobee3 occupancy sensors have moved from sensor platform to binary sensor platform.
- Forecast.io entity IDs are now like `sensor.forecastio_temperature`. Previously they were like `sensor.weather_temperature`. Apologies for this change, but we needed to make Forecast.io more generic now that we have many weather platforms.
- The [Loop Energy][Loop] sensor configuration format changed slightly, please reformat based on the revised documentation.
- The configuration for the [SABnzbd] sensor has slightly changed. The prefix `type:` is no longer required for monitored variables.

### {% linkable_title Deprecations %}
- Using the thermostat and hvac components has been deprecated. Please migrate to the new climate component. (just change name, configurations are compatible)
- Using the rollershutter and garage door components has been deprecated. Please migrate to the new cover component. (just change name, configurations are compatible)

[@arsaboo]: https://github.com/arsaboo
[@auchter]: https://github.com/auchter
[@balloob]: https://github.com/balloob
[@blocke]: https://github.com/blocke
[@BluGeni]: https://github.com/BluGeni
[@danielperna84]: https://github.com/danielperna84
[@DavidMStraub]: https://github.com/DavidMStraub
[@dpford]: https://github.com/dpford
[@fabaff]: https://github.com/fabaff
[@infamy]: https://github.com/infamy
[@jnewland]: https://github.com/jnewland
[@Juggels]: https://github.com/Juggels
[@kellerza]: https://github.com/kellerza
[@mcdeck]: https://github.com/mcdeck
[@meatz]: https://github.com/meatz
[@mgbowen]: https://github.com/mgbowen
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
[Hue]: /components/emulated_hue/
[fan]: /components/fan/
