---
layout: post
title: "0.38: Alert, AppleTV, MQTT discovery, and Yeelight"
description: "Faster and more configurable frontend, "
date: 2017-02-11 08:04:05 +0000
date_formatted: "February 11, 2017"
author: Fabian Affolter et al.
author_twitter: fabaff
comments: true
categories: Release-Notes
og_image: /images/blog/2017-02-0.38/social.png
---

0.38, hurry :tada: In this release we (special thanks to [@pvizeli]) have migrated all core components to work asynchronous. 

The configuration checking support was expanded. We have now `homeassistant.check_config`. This means that the service `homeassistant.restart` will now only restart your Home Assistant installation if the configuration is valid.

### {% linkable_title Rewritten frontend core %}
The core of the frontend has been completely been rewritten, optimizing for speed and lost connection recovery. Even on the slowest phones it should fly now.

### {% linkable_title Custom state-card UI %}
A nice new feature is the possibility to create [custom state-card][custom-ui] in the frondend. Go ahead and write your own state-card for [lights][light], sensors, locks, etc.

### {% linkable_title MQTT discovery %}
The latest MQTT feature is [discovery][mqtt-discovery] support. Do not confuse this which the Home Assistant [Discovery][discovery]. MQTT Discover is for MQTT-only. Similar to the HTTP sensor/binary sensor allows this to use devices with minimal configuration.

### {% linkable_title Alert component %}
If you left your front door open, then the [`alert`][alert] component can be used to remind you of this by sending you repeating notifications at a given interval.

### {% linkable_title Yeelight %}
The [`yeelight`][yeelight] component has been ported to use a more stable and feature-complete [python-yeelight][python-yeelight] backend, and supports now both white and RGB bulbs. The component also supports transitions and can be configured to save the settings to the bulb on changes. The users currently using custom components for Yeelight are encouraged to move back to use the included version and report any problems with it to our [issue tracker][issue].

### {% linkable_title All changes %}
#### {% linkable_title New platforms/components %}

- Sensor: Support for monitoring [OpenEVSE][openevse] chargers ([@miniconfig])
- Voice command [API.AI][apiai] ([@adrianlzt])
- [Alert][alert] Component ([@rmkraus])
- [Rflink][rflink] 433Mhz gateway platform and components ([@aequitas])
- Lock: Support for [Nuki.io][nuki] smart locks ([@pschmitt])
- Sensor: [QNAP][qnap] Sensor ([@colinodell])
- Switch: Add support for [FRITZ!DECT][fritz] wireless switches based on fritzhome ([@BastianPoe])
- Sensor: Add [moon][moon] sensor ([@fabaff])
- Media player: Support for the [Orange Livebox Play TV][orange] appliance ([@pschmitt])
- Media player: Initial support for [Apple TV][apple] ([@postlund])
- MQTT: [MQTT discovery][mqtt-discovery] support ([@balloob], [@fabaff])
- Notify: [Mailgun][mailgun] notify service ([@pschmitt])

#### {% linkable_title Improvements %}

- Switch - Pilight: Validation no longer rejects alphanumeric IDs ([@DavidLP])
- Device tracker - ASUSWrt: Fixes `ip neigh` regex to handle the possible IPv6 "router" flag ([@kylehendricks])
- Light - MySensors: Fix mysensors RGB and W light turn on ([@MartinHjelmare])
- Light - Yeelight: new yeelight backend lib, new features ([@rytilahti])
- Climate - Eq3btsmart: Cleanup modes & available, bump version requirement ([@rytilahti])
- Sensor - SMA: Handle units correctly ([@kellerza])
- MQTT eventstream: Prevent infinite loop in cross configured MQTT event streams ([@aequitas])
- Light - [Hue][hue]: Fix lightgroups not syncing state ([@tboyce1])
- Dvice tracker - Owntracks: Fix OwnTracks state names ([@tboyce1])
- Wink: Wink AC and additional sensor support ([@w1ll1am23])
- Modbus: Modbus write_register accept list ([@benvm])
- Device tracker - Ping: Add devices detected by ping as SOURCE_TYPE_ROUTER instead of GPS ([@michaelarnauts])
- Climate - Ecobee: Cleanup climate and ecobee ([@Duoxilian])
- Sensor - Miflora: Allow specification of bluetooth adapter ([@Danielhiversen])
- Sensor - [Systemmonitor][systemmonitor]: Add average load to systemmonitor ([@eagleamon])
- Sensor - [Openweathermap][owm]: Add wind bearing ([@fabaff])
- Notify - Facebook: Allow to use data for enhanced messages ([@adrianlzt])
- Light - Hyperion: Change CONF_DEFAULT_COLOR CV type ([@Joeboyc2])
- Mysensors: Fix validation of serial port on windows ([@MartinHjelmare])
- Notify - Webostv: Store the key file in the configuration directory ([@pschmitt])
- TTS: TTS ID3 support ([@robbiet480])
- Switch - Broadlink: Add send packet service ([@Yannic-HAW])
- Wink: Add support for position on Wink cover ([@albertoarias])
- Light - Flux: Make brightness display work for RGB devices. ([@aequitas])
- Media player - Roku: Fix attribute error for media_player/roku ([@tchellomello])
- Light - MQTT template: Fix brightness slider for MQTT template lights ([@ray0711])
- Template: Add `min` and `max` Jinja2 [filters][filters] ([@sbidoul])
- Device tracker - Skyhub: Improve Sky Hub error handling ([@alexmogavero])
- Notify - SMTP: Add error checking to the MIMEImage encoding ([@stratosmacker])
- Light - MQTT: Check for command topics when determining the capabilities of an MQTT light ([@herm])
- Core: Check config before restarting ([@andrey-git])
- Light - [Hue][hue]: Fix groups with same names ([@tboyce1])
- Template: Add icon_template to template sensor ([@tboyce1])
- Recorder: Refactoring, scoping, and better handling of SQLAlchemy Sessions ([@kellerza])
- Light - Flux: Add support for fluxled discovery. ([@aequitas])
- Media player - AppleTV: Add discovery support to Apple TV ([@postlund])
- Sensor - Template: Improve warning message in template rendering ([@Danielhiversen])
- Light - Demo: Add available property and typing hints ([@rytilahti])
- Sensor - ARWN: Enhancements to [ARWN][arwn] platform ([@sdague])
- Fan - ISY994: Change medium state for filtering ([@Teagan42])
- Climate - Ecobee: Support away_mode as permanent hold and hold_mode as temporary hold. ([@Duoxilian])
- Tellduslive: Don't throw exception if connection to server is lost ([@molobrakos])
- Zoneminder: Refactoring and JSON decode error handling ([@pschmitt])
- Image processing: Cleanup Base face class add support for microsoft face detect ([@pvizeli])

Bugfix(es): [@balloob], [@fabaff], [@pvizeli], [@mnoorenberghe] [@Danielhiversen], [@armills], [@tchellomello], [@aequitas], [@mathewpeterson], [@molobrakos], [@michaelarnauts], [@jabesq], [@turbokongen], [@JshWright], [@andriej], [@jawilson], [@andrey-git], [@nodinosaur], [@konikvranik], and you if you are missing here.

### {% linkable_title Breaking changes %}
- The support for [LG webOS Smart TVs][webostv] was improved. This requires you to move `$HOME/.pylgtv` to `$HASS_CONFIG_DIR/webostv.conf` or Home Assistant will need to be paired with the TV again.
- Image processing events have been renamed: `identify_face` has become `image_processing.detect_face`, `found_plate` has become `image_processing.found_plate`
- The [FFmpeg binary sensor][ffmpeg-bin] change the platform name from `ffmpeg` to `ffmpeg_noise` and `ffmpeg_motion`. Also all FFmpeg-related services are moved from a platform implementation to a the [FFmpeg components][ffmpeg] and were rename from `binary_sensor.ffmpeg_xy` to `ffmpeg.xy`. 

### {% linkable_title If you need help... %}
...don't hesitate to use our [Forum][forum] or join us for a little [chat][gitter]. The release notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

### {% linkable_title Reporting Issues %}
Experiencing issues introduced by this release? Please report them in our [issue tracker][issue]. Make sure to fill in all fields of the issue template.

[@acambitsis]: https://github.com/acambitsis
[@adrianlzt]: https://github.com/adrianlzt
[@aequitas]: https://github.com/aequitas
[@albertoarias]: https://github.com/albertoarias
[@alexmogavero]: https://github.com/alexmogavero
[@andrey-git]: https://github.com/andrey-git
[@andriej]: https://github.com/andriej
[@armills]: https://github.com/armills
[@balloob]: https://github.com/balloob
[@BastianPoe]: https://github.com/BastianPoe
[@benvm]: https://github.com/benvm
[@colinodell]: https://github.com/colinodell
[@Danielhiversen]: https://github.com/Danielhiversen
[@DavidLP]: https://github.com/DavidLP
[@Duoxilian]: https://github.com/Duoxilian
[@eagleamon]: https://github.com/eagleamon
[@fabaff]: https://github.com/fabaff
[@herm]: https://github.com/herm
[@jabesq]: https://github.com/jabesq
[@jawilson]: https://github.com/jawilson
[@Joeboyc2]: https://github.com/Joeboyc2
[@JshWright]: https://github.com/JshWright
[@kellerza]: https://github.com/kellerza
[@konikvranik]: https://github.com/konikvranik
[@kylehendricks]: https://github.com/kylehendricks
[@LinuxChristian]: https://github.com/LinuxChristian
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@mathewpeterson]: https://github.com/mathewpeterson
[@michaelarnauts]: https://github.com/michaelarnauts
[@miniconfig]: https://github.com/miniconfig
[@mnoorenberghe]: https://github.com/mnoorenberghe
[@molobrakos]: https://github.com/molobrakos
[@nodinosaur]: https://github.com/nodinosaur
[@postlund]: https://github.com/postlund
[@pschmitt]: https://github.com/pschmitt
[@pvizeli]: https://github.com/pvizeli
[@ray0711]: https://github.com/ray0711
[@rmkraus]: https://github.com/rmkraus
[@robbiet480]: https://github.com/robbiet480
[@rytilahti]: https://github.com/rytilahti
[@sbidoul]: https://github.com/sbidoul
[@sdague]: https://github.com/sdague
[@stratosmacker]: https://github.com/stratosmacker
[@tboyce1]: https://github.com/tboyce1
[@tchellomello]: https://github.com/tchellomello
[@Teagan42]: https://github.com/Teagan42
[@turbokongen]: https://github.com/turbokongen
[@valentinalexeev]: https://github.com/valentinalexeev
[@w1ll1am23]: https://github.com/w1ll1am23
[@Yannic-HAW]: https://github.com/Yannic-HAW

[alert]: https://home-assistant.io/components/alert/
[apiai]: https://home-assistant.io/components/apiai/
[apple]: https://home-assistant.io/components/media_player.apple_tv/
[arwn]: https://home-assistant.io/components/sensor.arwn/
[custom-ui]: https://home-assistant.io/developers/frontend_creating_custom_ui/
[discovery]: https://home-assistant.io/components/discovery/
[ffmpeg-bin]: https://home-assistant.io/components/binary_sensor.ffmpeg/
[ffmpeg]: https://home-assistant.io/components/ffmpeg/
[filters]: https://home-assistant.io/topics/templating/#home-assistant-template-extensions
[fritz]: https://home-assistant.io/components/switch.fritzdect/
[hue]: https://home-assistant.io/components/light.hue/
[light]: https://home-assistant.io/cookbook/custom_ui_by_andrey-git
[mailgun]: https://home-assistant.io/components/notify.mailgun/
[moon]: https://home-assistant.io/components/sensor.moon/
[mqtt-discovery]: https://home-assistant.io/components/mqtt/#discovery
[nuki]: https://home-assistant.io/components/lock.nuki/
[openevse]: https://home-assistant.io/components/sensor.openevse/
[orange]: https://home-assistant.io/components/media_player.liveboxplaytv/
[owm]: https://home-assistant.io/components/sensor.openweathermap/
[python-yeelight]: https://gitlab.com/stavros/python-yeelight
[qnap]: https://home-assistant.io/components/sensor.qnap/
[rflink]: https://home-assistant.io/components/rflink/
[systemmonitor]: https://home-assistant.io/components/sensor.systemmonitor/
[webostv]: https://home-assistant.io/components/media_player.webostv/
[yeelight]: https://home-assistant.io/components/light.yeelight/

[issue]: https://github.com/home-assistant/home-assistant/issues
[gitter]: https://gitter.im/home-assistant/home-assistant
[forum]: https://community.home-assistant.io/

