---
title: "0.38: Alert, AppleTV, MQTT discovery, and Yeelight"
description: "Faster and more configurable frontend, configuration check, and complete move to async for core"
date: 2017-02-11 08:04:05 +0000
date_formatted: "February 11, 2017"
author: Robbie Trencheny, Fabian Affolter
author_twitter: robbie
categories:
- Release-Notes
- Core
og_image: /images/blog/2017-02-0.38/social.png
---

Another Saturday, another release!

### Core updates
- Thanks to [@pvizeli], all the core components are now written asynchronously. All entity components are now migrated from synchronously to asynchronously code!

- Now when you restart Home Assistant using the `homeassistant.restart` service, your configuration is checked. If it appears to be invalid the restart will fail.

### Rewritten frontend
The frontend has been completely been rewritten, optimizing for speed and lost connection recovery. Even on the slowest phones it should fly now. The frontend also now uses the new [WebSockets API][websocket-api] instead of the [EventStream API][event-stream-api].

### Custom state card UI
A nice new feature is the possibility to create [custom state cards][custom-ui-cards] in the frontend. Go ahead and write your own state card for lights, sensors, locks, etc.

### MQTT discovery
MQTT now has [discovery][mqtt-discovery] support which is different than our [`discovery`][discovery] component. Similar to the HTTP sensor and HTTP binary sensor, MQTT discovery removes the need for configuration by allowing devices to make their presence known to Home Assistant.

### Alert component
If you left your front door open, then the new [`alert`][alert] component can be used to remind you of this by sending you repeating notifications at a given interval.

### Yeelight
The [`yeelight`][yeelight] component has been ported to use a more stable and feature-complete [python-yeelight][python-yeelight] backend, and supports now both white and RGB bulbs. The component also supports transitions and can be configured to save the settings to the bulb on changes. The users currently using custom components for Yeelight are encouraged to move back to use the included version and report any problems with it to our [issue tracker][issue].

### Apple TV
[Apple TV][apple-tv] is now a supported [`media_player`][media-player]! It has support for just about every media player function, including a realtime display of playback status and artwork.

### All changes
#### New platforms/components

- Sensor: Support for monitoring [OpenEVSE][openevse] chargers ([@miniconfig])
- Voice command [API.AI][apiai] ([@adrianlzt])
- [Alert][alert] Component ([@rmkraus])
- [Rflink][rflink] 433Mhz gateway platform and components ([@aequitas])
- Lock: Support for [Nuki.io][nuki] smart locks ([@pschmitt])
- Sensor: [QNAP][qnap] Sensor ([@colinodell])
- Switch: Add support for FRITZ!DECT wireless switches based on fritzhome ([@BastianPoe])
- Sensor: Add [moon][moon] sensor ([@fabaff])
- Media player: Support for the Orange Livebox Play TV appliance ([@pschmitt])
- Media player: [Apple TV][apple-tv] support ([@postlund])
- MQTT: [MQTT discovery][mqtt-discovery] support ([@balloob], [@fabaff])
- Notify: [Mailgun][mailgun] notify service ([@pschmitt])
- Image Processing: Support [Microsoft Face detection][face-detect] ([@pvizeli])

#### Improvements

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
- Light - [Hue][hue]: Fix groups with same names (@tboyce1)
- Template: Add icon_template to template sensor (@tboyce1)
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

Bugfixes: [@balloob], [@fabaff], [@pvizeli], [@mnoorenberghe] [@Danielhiversen], [@armills], [@tchellomello], [@aequitas], [@mathewpeterson], [@molobrakos], [@michaelarnauts], [@jabesq], [@turbokongen], [@JshWright], [@andriej], [@jawilson], [@andrey-git], [@nodinosaur], [@konikvranik], and you if you are missing here.

### Release 0.38.1 - February 12

- Fix logbook ordering ([@balloob])
- Fix AppleTV conflicting dependency breaking websockets ([@balloob])

### Release 0.38.2 - February 12

- Validate config will now respect custom config location ([@balloob])
- Fix Nuki lock on Python 3.4 ([@pschmitt])
- Fix login issues for myusps ([@happyleavesaoc])
- Fix hdmi_cec with new customize ([@andrey-git])
- Fix MQTT discovery ([@fabaff])
- Fix Z-Wave thermostat units ([@turbokongen])

### Release 0.38.3 - February 15

- Sonos: fix losing favorite sources on disconnect ([@pvizeli])
- Google Calendar: fix timeMin losing events ([@happyleavesaoc])
- Fix Wink PubNub subscription ([@w1ll1am23])
- Z-Wave: getter not to ignore label ([@andrey-git])
- Moon: remove unit of measurement ([@fabaff])
- MySensors: add version requirement to notify and device tracker ([@MartinHjelmare])

### Release 0.38.4 - February 21

 - Discovery: flux_led discovery led to problems on systems and has been removed ([@bazwilliams])
 - Hidden devices are no longer visible on views ([@balloob])


### Backward-incompatible changes
- The support for [LG webOS Smart TVs][webostv] was improved. This requires you to move `$HOME/.pylgtv` to `$HASS_CONFIG_DIR/webostv.conf` or Home Assistant will need to be paired with the TV again.
- Image processing events have been renamed: `identify_face` has become `image_processing.detect_face`, `found_plate` has become `image_processing.found_plate`
- The [FFmpeg binary sensor][ffmpeg-bin] change the platform name from `ffmpeg` to `ffmpeg_noise` and `ffmpeg_motion`. Also all FFmpeg-related services are moved from a platform implementation to a the [FFmpeg components][ffmpeg] and were rename from `binary_sensor.ffmpeg_xy` to `ffmpeg.xy`.
- The frontend core changes have caused all custom panels to break. Docs have not been updated yet. The gist is that you have to use `this.hass.entities`, `this.hass.callService` and `this.hass.callApi`.

### If you need help...
...don't hesitate to use our very active [forums][forum] or join us for a little [chat][discord]. The release notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

### Reporting Issues
Experiencing issues introduced by this release? Please report them in our [issue tracker][issue]. Make sure to fill in all fields of the issue template.

[@bazwilliams]: https://github.com/bazwilliams
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
[@happyleavesaoc]: https://github.com/happyleavesaoc
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
[@tchellomello]: https://github.com/tchellomello
[@Teagan42]: https://github.com/Teagan42
[@turbokongen]: https://github.com/turbokongen
[@valentinalexeev]: https://github.com/valentinalexeev
[@w1ll1am23]: https://github.com/w1ll1am23
[@Yannic-HAW]: https://github.com/Yannic-HAW

[alert]: /integrations/alert/
[apiai]: /integrations/dialogflow
[apple-tv]: /integrations/apple_tv
[arwn]: /integrations/arwn
[custom-ui-cards]: /developers/frontend_creating_custom_ui
[discovery]: /integrations/discovery/
[face-detect]: /integrations/microsoft_face_detect
[ffmpeg-bin]: /integrations/ffmpeg_motion
[ffmpeg]: /integrations/ffmpeg/
[filters]: /topics/templating/#home-assistant-template-extensions
[hue]: /integrations/hue
[mailgun]: /integrations/mailgun
[media-player]: /integrations/media_player/
[moon]: /integrations/moon
[mqtt-discovery]: /integrations/mqtt/#discovery
[nuki]: /integrations/nuki
[openevse]: /integrations/openevse
[owm]: /integrations/openweathermap#sensor
[python-yeelight]: https://gitlab.com/stavros/python-yeelight
[qnap]: /integrations/qnap
[rflink]: /integrations/rflink/
[systemmonitor]: /integrations/systemmonitor
[webostv]: /integrations/webostv#media-player
[yeelight]: /integrations/yeelight

[event-stream-api]: /developers/server_sent_events/
[forum]: https://community.home-assistant.io/
[issue]: https://github.com/home-assistant/home-assistant/issues
[websocket-api]: /developers/websocket_api/
[discord]: https://discord.gg/c5DvZ4e
