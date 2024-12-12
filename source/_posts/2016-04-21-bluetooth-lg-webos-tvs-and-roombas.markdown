---
title: "0.18: Bluetooth, LG WebOS TVs and Roombas."
description: "Home Assistant 0.18 has arrived."
date: 2016-04-20 23:10:00 UTC
date_formatted: "April 20, 2016"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
og_image: /images/blog/2016-04-release-18/social.png
---

It's time for 0.18. This release cycle is 2 days shorter than usual as I'll be traveling to Europe. This also means that it can take some more time before you get feedback on PRs.

Since the last release we have moved all Home Assistant source code etc into its own [organization on GitHub](https://github.com/home-assistant). We're growing up! This sadly did cause us to have to move all Docker images. Check the backward-incompatible changes section for more info.

<a href='/demo/'><img src='/images/blog/2016-04-release-18/media_player.png' style='box-shadow: none; border: 0;' /></a>

<img src='/images/supported_brands/bluetooth.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/webos.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/rss.gif' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/eq3.gif' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/thinkingcleaner.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' />

- Media Player: redesign in the UI! ([@DesignFirst], [@balloob])
- New component: [Zeroconf] for Home Assistant discovery ([@robbiet480])
- Garage door: [MQTT] now supported ([@joelash])
- Thermostat: [Homematic platform] now supports Max! devices ([@bimbar])
- New component Thinkingcleaner ([switch][switch.thinkingcleaner]/[sensor][sensor.thinkingcleaner]) to integrate your Roomba into Home Assistant ([@TheRealLink])
- New component: [upnp] to automatically open a upnp port on your router for Home Assistant ([@robbiet480])
- Thermostat: [EQ3 Bluetooth Smart Thermostats] now supported ([@bimbar])
- New component [Feedreader] will track RSS feeds ([@shaftoe])
- Device Tracker: [Bluetooth tracking platform] added ([@vmulpuru])
- Media Player: [LG WebOS TVs][media_player.lg] now supported ([@TheRealLink])
- Notify: [LG WebOS TVs][notify.lg] now supported ([@TheRealLink])
- HTTP: Use constant time comparison for auth ([@JshWright])
- Config and service validations ([@jaharkes], [@Danielhiversen])
- MySensors: Entity IDs will more clearly differentiate between node ID and child ID ([@oeysteinhansen])
- MySensors: Add support for [ethernet gateway][mysensors] ([@MartinHjelmare])
- Media player: [Plex] will now monitor the server and add clients as they pop up ([@infamy])
- Core: We now use iso8601 for datetimes ([@balloob]).
- Media Player: [MPD] now supports service to play playlists ([@Cinntax])
- Z-Wave should be a little bit more stable ([@Turbokongen])
- Media Player: [Sonos] will now only add visible devices ([@jpmossin])
- Light: [Wink] will now allow controlling the colors ([@bradsk88])

[@balloob]: https://github.com/balloob/
[@bimbar]: https://github.com/bimbar/
[@bradsk88]: https://github.com/bradsk88/
[@Cinntax]: https://github.com/Cinntax/
[@Danielhiversen]: https://github.com/Danielhiversen/
[@DesignFirst]: https://github.com/DesignFirst/
[@infamy]: https://github.com/infamy/
[@jaharkes]: https://github.com/jaharkes/
[@joelash]: https://github.com/joelash/
[@jpmossin]: https://github.com/jpmossin/
[@JshWright]: https://github.com/JshWright/
[@MartinHjelmare]: https://github.com/MartinHjelmare/
[@oeysteinhansen]: https://github.com/oeysteinhansen/
[@robbiet480]: https://github.com/robbiet480/
[@shaftoe]: https://github.com/shaftoe/
[@TheRealLink]: https://github.com/TheRealLink/
[@Turbokongen]: https://github.com/Turbokongen/
[@vmulpuru]: https://github.com/vmulpuru/
[Bluetooth tracking platform]: /integrations/bluetooth_tracker
[EQ3 Bluetooth Smart Thermostats]: /integrations/eq3btsmart/
[mysensors]: /integrations/mysensors/
[Feedreader]: /integrations/feedreader/
[Homematic platform]: /integrations/homematic/
[media_player.lg]: /integrations/webostv#media-player
[notify.lg]: /integrations/webostv
[MPD]: /integrations/mpd
[MQTT]: /integrations/cover.mqtt/
[Plex]: /integrations/plex#media-player
[Sonos]: /integrations/sonos
[sensor.Thinkingcleaner]: /integrations/thinkingcleaner#sensor
[switch.Thinkingcleaner]: /integrations/thinkingcleaner#switch
[upnp]: /integrations/upnp/
[Wink]: /integrations/wink#light
[Zeroconf]: /integrations/zeroconf/

### Backward-incompatible changes
- We have migrated our datetime format to be iso8601. This will only impact you if you are consuming the date times from the API directly. You can ignore this if you are just using Home Assistant via configuration and the frontend.
- The constant `TEMP_CELCIUS` is now correctly called `TEMP_CELSIUS`. Old one is deprecated and will eventually be removed.
- The location of the Docker image has changed. There was no possibility for us to keep maintaining the old image (as it was bound to the GitHub repo under my name) or to make a redirect. So if you are using the Home Assistant Docker image,  change it to run `homeassistant/home-assistant:latest` for the latest release and `homeassistant/home-assistant:dev` for the latest dev version.
- MySensors received two big changes that will cause you to update your configs. See [component page][mysensors] for new example config.
  1. All MySensors entity IDs are different! There was an error in the naming that caused MySensors to append node ID and child ID instead of separating them with an underscore. This has been fixed but will cause all your MySensors entity IDs to change. This is a one time breaking change.
  2. The second change is that we now support the TCP ethernet gateway. This is causing a slight change to the config format: you have to change `port:` under `gateways` to `device:`.
