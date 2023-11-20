---
title: "0.27 is here to break eggs and take names: notifications, Hue fakery, safety and unification come to Home Assistant"
description: "HTML5 push notifications and grouping support, Configuration validations and checking, cover, climate and fan."
date: 2016-08-28 20:30:25 UTC
date_formatted: "August 28, 2016"
author: Robbie Trencheny
author_twitter: Robbie
categories:
- Release-Notes
- Core
---

This week's blog post could only be possibly described by exactly one hashtag:

## #Amazing

<sup>or <sup>maybe<sup>#supersized</sup></sup></sup>

Keep reading to see what **#Amazing** things we have in store for you this week 😄! And make sure you read all the way to the end, because I left a present down there for those committed few among you :)

But first...

## Some general housekeeping

Paulus ([@balloob]) is on vacation in Europe this week, so you will all have to deal with me, Robbie ([@robbiet480]) for this release blog post. Don't worry, Paulus will be back to tearing apart your pull requests in no time 😈.

Special thanks to my awesome helpers for this week's release who are looking over my shoulder to make sure I'm crossing my t's and dotting my i's: [@Teagan42], [@infamy] and [@fabaff].

For my next trick, let's hand out some...

## Trophies

I felt that I had to 1-up Paulus ([@balloob]) somehow with his 500,000 pageviews stat he shared in the [0.26 blog post](/blog/2016/08/13/foursquare-fast-com-ffmpeg-gpsd/), so I pushed myself and our development community as a whole super hard the last two weeks to put a lot of love into Home Assistant to bring you not just one, but six **#Amazing** stats for this release. As of 0.27, we have now surpassed the following milestones:

- [10,000](https://travis-ci.org/home-assistant/home-assistant/builds/154660811) builds on Travis (congrats to [@BluGeni])
- [3,000](https://github.com/home-assistant/home-assistant/pull/3000) issues and pull requests (thanks [@kellerza]!)
- [2,000](https://github.com/home-assistant/home-assistant/pull/2991) pull requests alone (awesome [@fabaff]!!)
- 900 forks on Github!

In addition,

- We are very close to 4,000 stars on Github!
- [I'm now #5 contributor by most commits!!!](https://github.com/home-assistant/home-assistant/graphs/contributors) Hey wait, how'd this get in here 😳...

Now that we have that great news out of the way, onto this week's release which is going to keep the **#Amazing** gravy train rolling right along and get to the stuff you all _really_ are here for.

## 0.27

While this release is **#Amazing**, we had to break a few eggs (now you understand the title reference!) to make a beautiful omelette (using home automation obviously) so some platforms and components have needed to introduce backward-incompatible changes. Please make sure to read the [Backward-incompatible changes](#backward-incompatible-changes) section below.

### Hue Bridge Emulation

Thanks to [@mgbowen] we now have the functionality previously provided by [@blocke]'s [ha-local-echo](https://github.com/blocke/ha-local-echo) [built right into Home Assistant](/integrations/emulated_hue/)! This means that for those of you with devices that either lack or have a subpar integration with Home Assistant (looking at you Amazon Echo) you can now have a better experience by having your Home Assistant pretend to be a Hue Bridge. Personally, I have used [@auchter]'s [Haaska](https://github.com/auchter/haaska) previously but found that it was slow to respond and sometimes failed entirely. With the new [`emulated_hue`](/integrations/emulated_hue/) component, you can have local control of entities through Amazon Echo.

### Notification improvements

We have some excellent upgrades to the notification system coming to you in 0.27, courtesy of me, [@robbiet480].

#### HTML5 Push Notifications

This release adds support for [HTML5] push notifications on Chrome/Firefox/Opera on both desktop and Android devices. This means that you can send a notification to your phone even when your Home Assistant is not open in your mobile browser. When using Chrome you can even include 2 action buttons so that you can control your Home Assistant from your phone's lock screen, allowing you to do things like sound alarms or unlock your front door, all without leaving the notification. Thanks again to me ([@robbiet480]) and Paulus ([@balloob]) for all the hard work on this!

<p class='img'>
  <img src='/images/screenshots/html5-notify.png' />
</p>

#### Notification Groups

Using the new notify `group` platform allows you to cut down a lot of duplicate automation logic by combining multiple notification platforms and `target`s into a single notify service. Check out the [documentation](/integrations/notify.group/) for more info.

#### `target` is no longer needed

For platforms that support it, starting with the new HTML5 platform, any `target`s that are available will be exposed as individual services, so no more having to remember which `target`s to use. Please note that the existing services also still exist so you can keep using `target` if you wish.

### Validate configuration before restarting Home Assistant

Ever restarted Home Assistant to test a configuration change just to find out there is a validation error? Well, not anymore! [@kellerza] has added a command line script that will validate your configuration as if you started Home Assistant.

```bash
hass --script check_config
```

### Configuration validation

This release includes a big push on making sure all platforms contain proper configuration validation. This should help in getting your configuration right. Thanks to [@fabaff], [@pavoni], [@pvizeli], [@nkgilley] for all the hard work on this, you all rock!

<p class='img'>
  <img src='/images/screenshots/config-validation.png' />
</p>

### FFMpeg motion/noise sensing

It's now possible to use [FFMpeg] to monitor a video stream and detect motion thanks to a new binary sensor platform by [@pvizeli].

### Component clean up - Thermostat & HVAC -> Climate. Rollershutter & Garage Door -> Cover

Due to our wild growth we ended up with a few components that had a lot of overlapping functionality. [@turbokongen] took on the hard job on merging them. Thermostat and HVAC platforms are now combined under the new Climate component. Rollershutter and Garage Door platforms are now combined under the new Cover component. You can easily upgrade by just swapping out the name. For example replace `thermostat` with `climate`. The old components have been deprecated and will be removed in the near future.

### A new `fan` component

Along with the new `climate` component, [@Teagan42] and I ([@robbiet480]) decided we needed something simpler to just control a fan. Currently it has support for controlling Insteon fans. MQTT support will appear in 0.28.0. I tried to get it implemented before 0.27.0 but spent too long writing this blog post 😢.

### All changes

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

### Backward-incompatible changes
- Ecobee3 occupancy sensors have moved from sensor platform to binary sensor platform.
- Forecast.io entity IDs are now like `sensor.forecastio_temperature`. Previously they were like `sensor.weather_temperature`. Apologies for this change, but we needed to make Forecast.io more generic now that we have many weather platforms.
- The [Loop Energy][Loop] sensor configuration format changed slightly, please reformat based on the revised documentation.
- The configuration for the [SABnzbd] sensor has slightly changed. The prefix `type:` is no longer required for monitored variables.
- The [IMAP] sensor now uses `username` instead of `user`.
- The [NZBGet] sensor has had so many changes I can't list them all. Please refer to the documentation for more info.

### Deprecations
- Using the `thermostat` and `hvac` components has been deprecated. Please migrate to the new `climate` component. (just change the component name, the configurations are compatible)
- Using the `rollershutter` and `garage_door` components have also been deprecated. Please migrate to the new `cover` component. (just change the component name, the configurations are compatible)

## Finishing up

Thanks all for sticking with me to the end. I'll be taking over a lot of Paulus's ([@balloob]) work while he is gone, but as I said, don't worry because he'll be back well before 0.28.0 comes out. Hopefully you didn't find this jovial blog post too jarring from our standard style, I just wrote a lot of this at 2am after being awake for almost 20 hours, so I'm a little loopy hahaha 😴.

Also, thanks as always to our developer contributors, documentation contributors, but most of all our users! This would've just been a script that Paulus (@balloob) used to control his lights at home if we didn't have your enthusiasm.

Feel free to let me know what you thought of this blog post and release on [Discord](https://discord.gg/c5DvZ4e) or my [Twitter](https://twitter.com/robbie), or even the [Home Assistant Twitter](https://twitter.com/home_assistant). Did I mention we have a brand new [Facebook page](https://www.facebook.com/homeassistantio) that you should absolutely Like? There's a convenient Facebook Like and Twitter follow button right on the sidebar.

I almost forgot about your 🎁 for reading all the way to here: a 🍪! Hope you enjoy it in good health 😄.

Talk to you soon on Discord and in your pull request comments!

-- Robbie

(p.s. To those of you that scrolled directly to the bottom to get your present, just know that you didn't earn it like the others did. 😄)

## Hotfix 0.27.1 - August 30

- Migrate APCUPSd to voluptuous ([@fabaff])
- Ecobee operation mode fix ([@turbokongen])
- update ha-ffmpeg version to 0.9 ([@pvizeli])
- Device tracker component & platform validation. No more home_range. ([@kellerza])
- Added option to use effect:random for Flux Led light bulbs ([@tchellomello])
- Use voluptuous for smtp ([@pvizeli])
- Upgrade sendgrid to 3.2.10 ([@fabaff])
- Upgrade TwitterAPI to 2.4.2 ([@fabaff])
- Fix bug in wemo discovery caused by voluptuous addition. ([@pavoni])
- Bug fix for asuswrt device_tracker. ([@Danielhiversen])
- Remove units for humidity in Wundeground sensor ([@arsaboo])
- Fix media_player descriptions and select_source ([@MartinHjelmare])
- Allow user to configure server id to perform speed test against ([@Teagan42])
- Bug fix for asuswrt device_tracker. ([@Danielhiversen])
- More Ecobee operation mode fixes ([@turbokongen])
- Map Modes to setpoint indexes ([@turbokongen])
- fix voluptuous and cover autodiscovery ([@pvizeli])
- Fixes wrong statevalue and problem with zwave setpoint ([@turbokongen])

## Hotfix 0.27.2 - September 3
### home-assistant

- Ble fix ([#3019](https://github.com/home-assistant/home-assistant/pull/3019)) - ([@open-homeautomation](https://github.com/open-homeautomation))
- Reset insteon hub ([#3062](https://github.com/home-assistant/home-assistant/pull/3062)) - ([@Teagan42](https://github.com/Teagan42))
- Host should be optional for apcupsd component ([#3072](https://github.com/home-assistant/home-assistant/pull/3072)) - ([@Danielhiversen](https://github.com/Danielhiversen))
- Zwave climate Bugfix: if some setpoints have different units, we should fetch the o… ([#3078](https://github.com/home-assistant/home-assistant/pull/3078)) - ([@turbokongen](https://github.com/turbokongen))
- Bugfix  unit fix ([#3083](https://github.com/home-assistant/home-assistant/pull/3083)) - ([@turbokongen](https://github.com/turbokongen))
- Ecobee humidity slider ([#3088](https://github.com/home-assistant/home-assistant/pull/3088)) - ([@turbokongen](https://github.com/turbokongen))
- Zwave Climate Bugfix: If device was off target temp was null. Default to Heating setpoint ([#3091](https://github.com/home-assistant/home-assistant/pull/3091)) - ([@turbokongen](https://github.com/turbokongen))
- Climate and cover bugfix ([#3097](https://github.com/home-assistant/home-assistant/pull/3097)) - ([@turbokongen](https://github.com/turbokongen))
- Add missing docstrings (fix PEP257 issues) ([#3098](https://github.com/home-assistant/home-assistant/pull/3098)) - ([@fabaff](https://github.com/fabaff))
- Allow None MAC to be loaded from known_devices ([#3102](https://github.com/home-assistant/home-assistant/pull/3102)) - ([@kellerza](https://github.com/kellerza))
- fix homematic climate implementation ([#3114](https://github.com/home-assistant/home-assistant/pull/3114)) - ([@pvizeli](https://github.com/pvizeli))
- Fixed Homematic cover ([#3116](https://github.com/home-assistant/home-assistant/pull/3116)) - ([@danielperna84](https://github.com/danielperna84))
- Bugfix. climate and covermqt ([#3130](https://github.com/home-assistant/home-assistant/pull/3130)) - ([@turbokongen](https://github.com/turbokongen))

### home-assistant-polymer

- Fix missing attributes on the climate and HVAC more info cards ([7e455e2](https://github.com/home-assistant/home-assistant-polymer/commit/7e455e2be1cb7cc4f55628b063019bea548a3182)) - ([@robbiet480](https://github.com/robbiet480))
- Add a default icon for the fan component ([#101](https://github.com/home-assistant/home-assistant-polymer/pull/101)) - ([@robbiet480](https://github.com/robbiet480))

[@arsaboo]: https://github.com/arsaboo
[@auchter]: https://github.com/auchter
[@balloob]: https://github.com/balloob
[@blocke]: https://github.com/blocke
[@BluGeni]: https://github.com/BluGeni
[@Danielhiversen]: https://github.com/Danielhiversen
[@danielperna84]: https://github.com/danielperna84
[@DavidMStraub]: https://github.com/DavidMStraub
[@dpford]: https://github.com/dpford
[@fabaff]: https://github.com/fabaff
[@infamy]: https://github.com/infamy
[@jnewland]: https://github.com/jnewland
[@Juggels]: https://github.com/Juggels
[@kellerza]: https://github.com/kellerza
[@MartinHjelmare]: https://github.com/MartinHjelmare
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
[@shmuelzon]: https://github.com/shmuelzon
[@tchellomello]: https://github.com/tchellomello
[@Teagan42]: https://github.com/Teagan42
[@technicalpickles]: https://github.com/technicalpickles
[@tobiebooth]: https://github.com/tobiebooth
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23

[checking]: /integrations/dht
[FFMpeg]: /integrations/ffmpeg_motion
[Climate]: /integrations/climate/
[NZBGet]: /integrations/nzbget
[SABnzbd]: /integrations/sabnzbd
[HP]: /integrations/hp_ilo
[Fritzbox]: /integrations/fritzbox#sensor_callmonitor/
[webos]: /integrations/webostv#media-player
[HTML5]: /integrations/html5
[Gravatar]: /integrations/device_tracker/
[Loop]: /integrations/loopenergy
[cover]: /integrations/cover/
[climate]: /integrations/climate/
[expose]: /integrations/light/
[Automate]: /integrations/llamalab_automate
[Secrets]: /topics/secrets/
[trigger]: /integrations/manual
[CO2]: /integrations/mhz19
[presence]: /integrations/mqtt_room
[grouping]: /integrations/notify.group/
[Wunderground]: /integrations/wunderground
[monitoring]: /integrations/ffmpeg_motion
[MJPEG]: /integrations/mjpeg
[Generic]: /integrations/generic_ip_camera
[positions]: /integrations/zwave#cover
[forecast]: /integrations/darksky
[Bluetooth]: /integrations/bluetooth_le_tracker
[Slack]: /integrations/slack
[template]: /integrations/generic_ip_camera
[Bug]: /integrations/wink/
[support]: /integrations/homematic/
[node]: /integrations/zwave/
[found]: /integrations/tplink
[attachments]: /integrations/slack
[Hue]: /integrations/emulated_hue/
[fan]: /integrations/fan/
[IMAP]: /integrations/imap
