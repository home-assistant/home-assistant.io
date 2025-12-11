---
title: "0.37: Face detection, Coffee, Wink"
description: "Governance, Face recognition, improved camera security, and a coffee maker"
date: 2017-01-28 08:04:05 +0000
date_formatted: "January 28, 2017"
author: Fabian Affolter et al.
author_twitter: fabaff
categories:
- Release-Notes
- Core
og_image: /images/blog/2017-01-0.37/social.png
---


No stats, no numbers, and alike this time. Ok, just one number: 0.37. We are back on track with our bi-weekly release cycle. Beside some organizational changes is this release shipping again cool features and new integrations. Please keep an eye on the "Backward-incompatible changes" section because there are also massive improvements for some platforms and components.

### Governance
As announced, the new [Governance][gov] requires for developers to sign the CLA. [Code of Conduct][coc], [Contributor License Agreement][cla], and proper [Licensing][license] will to protect all involved parties in the Home Assistant eco-system from users and community members to contributors.

### Face recognition using the Microsoft Face API
[@pvizeli] has been on a roll with the image processing integrations. This time it's the [Microsoft Face API][face]. This means that now it will be possible to train the API with the people you want to recognize and send images from your camera to the API as another source of automation.

Want to play a personalized tune when someone enters the house? It is now possible 😎

### Improved camera security

After a security audit by Stephen O'Conner, he found that our source for randomly generated access tokens for camera feeds were reasonable predictable and could be brute force attacked in 2.5 weeks. A fix has been included in this release that uses the system provided random number generator for maximum randomness and rotates the keys every 10 minutes to reduce the window in which a brute force attack can happen.

Although the old method is not insecure, the new method is a lot more secure. Upgrading to the latest version is encouraged.

### New customization options
[@Andrey-git] has added some great new options to the customize functionality. It is now possible to specify customizations as a wildcard for entities or for a specific domain.

### Major Wink and HDMI-CEC improvements
[@w1ll1am23] did an amazing job fixing a ton of bugs and issues with the Wink integration. Biggest improvement is that it now is able to automatically refresh the authentication tokens. This means that if you have your email address and password in your `configuration.yaml` file, no `client_id` and `client_secret` are needed, and token which was generated with the generator located in the [Wink][wink] documentation.

The new Wink support will cause renaming of all the binary sensors and will also create new sensors for devices that weren't previously detected or supported in the older version.

Thanks to [@konikvranik] the [HDMI-CEC][cec] integration got a huge update with a lot of improvements. This update should make it easier to work with HDMI-CEC and give you more control.

### First Coffee Maker supported
[@stu-gott] has added support for the first coffee maker in Home Assistant: [Mr. Coffee Smart Optimal Brew][coffee]. Happy brewing!

### All changes
#### New platforms/components

- Netatmo: [Netatmo][netatmo] Presence support ([@gieljnssns])
- Sensor: [Amcrest][amcrest] camera sensors ([@tchellomello])
- Notify: New [Discord][discord] notification component ([@Deinara])
- Device tracker: [Tado][tado] device tracker support ([@jmvermeulen])
- Sensor: Add [Skybeacon][skybeacon] BLE temperature/humidity sensor ([@anpetrov])
- New [Zabbix][zabbix] component ([@Whytey])
- Media  player: New platform [Anthemav][anthem] Media player ([@nugget])
- Light: Add support for [Avion][avion] Bluetooth dimmer switches ([@mjg59])
- Binary sensor: [Beaglebone Black][bb-bin] binary sensor ([@MatoKafkac])
- Light: [Piglow][piglow] support ([@xarnze])
- [Face][face] recognition for automation ([@pvizeli])
- Sensor: New [Washington State DOT][wsdot] sensor ([@partofthething])
- Support for Wemo CoffeeMaker devices ([@stu-gott])
- Device tracker: [Sky hub][sky] support ([@alexmogavero])
- Support for [Lutron][lutron] RadioRA 2 ([@thecynic])
- TTS: Amazon [Polly TTS][polly] platform ([@robbiet480])
- Device tracker: Support for Linksys Access Points ([@lukas-hetzenecker])
- Notify: Make calls with [Twilio][twilio] ([@fakezeta])

#### Improvements

- Script: Fix script release ([@balloob])
- Camera - Amcrest: Add support for direct MJPEG streams from Amcrest cameras ([@colinodell])
- Sensor - Miflora: Removing throttle decorator ([@freol35241])
- Notify - Lannouncer: Fix `get_service` method ([@mKeRix])
- Sensor - WAQI: Add station parameter to waqi sensor ([@whhsw])
- Sensor - USPS: Absolute path to save cookie used by USPS sensor ([@tchellomello])
- Nest: Fix python-nest release number ([@Danielhiversen])
- Keyboard remote: Improve support ([@MrMep])
- Device tracker - VolvoOnCall: Fix timedelta ([@pvizeli])
- Climate - eq3btsmart: Expose away attribute ([@rytilahti])
- Remote: Reserve a test port for broken API to fix race ([@armills])
- Climate - Ecobee: Made target temperature sensitive to auto mode ([@Duoxilian])
- Configuration: Fix load_yaml default value ([@balloob])
- Notify - Facebook: Fix encoding error ([@Danielhiversen])
- Emulated_hue: Add `upnp_bind_multicast` option, default type to Google, and persist emulated hue IDs ([@hoopty], [@balloob])
- Docker: Install phantomjs in Docker container ([@jnewland])
- Media player - MPD: Add listing and selection of available MPD playlists ([@partofthething])
- Media player - Denon AVR: Denon improvements ([@glance-])
- Light - x10.py: Improved x10 state monitoring ([@martst])
- Sensor - DSMR: TCP, reconnecting and V4 CRC support ([@aequitas])
- Media player - Yamaha.py: Fix Yamaha doing I/O in event loop ([@balloob])
- Device tracker UPC: Make upc more robust ([@pvizeli])
- Climate - Generic thermostat: Update ([@MrMep])
- Device tracker - Xiaomi.py: Xiaomi Mi Router token refresh ([@RiRomain])
- Camera - MJPEG: Support still image for thumbmail ([@pvizeli])
- Sensor - ZAMG: Updated valid station id list ([@HerrHofrat])
- Light - ISY994: Not overwrite `state_attributes` ([@rmkraus])[emul-hue]
- Light - Zwave: Use only supported features for devices ([@turbokongen])
- Media player - Kodi: Support for volume stepping ([@armills])
- Media player- roku: Use `is_screensaver`, update IDLE state, and use device name ([@robbiet480], [@xhostplus])
- Switch - HDMI-CEC: Support for devices and commands ([@konikvranik])
- Lock - Zwave: Improvements to Zwave lock platform ([@turbokongen])
- TTS: Invalidate broken file cache entries ([@stu-gott])
- Light - Hue: Improvements ([@robbiet480])
- TTS - YandexTTS: Added speed and emotion to Yandex TTS ([@lupin-de-mid])
- Light - tellstick.py: Tellstick light fix ([@stefan-jonasson])
- Switch - insteon_local.py: only check for devices when not defined in config ([@craigjmidwinter])
- Notify - Twitter: Allow direct messaging to user ([@fabaff])
- Fan - MQTT: Don't set a speed when fan turns on ([@robbiet480])
- Config: Allow easier customization of whole domain, entity lists, globs ([@andrey-git])
- Sensor - Homematic: Update device support ([@danielperna84])
- Binary sensor - ISS: Add location to attributes and option to show position on the map ([@fabaff])
- Media player - Kodi: Add SSL configuration option ([@ecksun])
- Sensor - WAQI: Add missing particle value ([@fabaff])
- Wink: Support for python-wink 1.0.0 ([@w1ll1am23])
- Binary sensor - RPi GPIO: Add a small sleep before reading the sensor ([@snagytx])
- Sensor - USPS: Add name to configuration ([@happyleavesaoc])
- Sensor - Miflora: Remove throttle decorator from miflora platform ([@freol35241])
- Device tracker - asuswrt.py: Add IPv6 support when parsing neighbors ([@leppa])
- iOS: Discover notify.ios when iOS component loads ([@robbiet480])
- Homematic: Add MAX shutter contact class ([@jannau])
- Sensor - Darksky: Added forecast support ([@nordlead2005])
- Switch - Pilight: Implement echo config option ([@janLo])
- Core: Support customize in packages ([@kellerza])
- Switch - Flux: Allow disabling setting the brightness ([@rytilahti])
- Media player - Sonos: Add `is_coordinator`, set coordinator after join/unjoin, and no empty image ([@pvizeli], [@andrey-git], [@robbiet480])
- Climate: Hold mode ([@Duoxilian])
- Switch - TPlink: No longer doing I/O in event bus ([@balloob])
- Light - Insteon local: Improve Insteon configuration ([@craigjmidwinter])
- Emulated Hue: Emulated Hue "host-ip" fails to bind when running in docker without `--net=host` ([@jeremydk])
- Climate - EQ3 BT smart: Add reporting for availability ([@rytilahti])

Bugfix: [@balloob], [@fabaff], [@freol35241], [@pvizeli], [@Danielhiversen], [@tdickman], [@armills], [@rytilahti], [@EarthlingRich], [@asbach], [@happyleavesaoc], [@robbiet480], [@colinodell], [@joopert], [@dale3h], [@pavoni], [@jaharkes], [@MartinHjelmare], [@mezz64], [@jabesq], and you if you are missing in this list.

### Release 0.37.1 - February 2

- Do not reject alphanumeric IDs for PiLight ([@DavidLP])
- Fix broken Hue discovery ([@DanielHiversen])
- Fix Amcrest ([@tchellomello])
- Fix Telldus Live dim level error on startup ([@molobrakos])
- Fix Sonos group coordinators ([@pvizeli])
- UPC Connect: Parse XML outside event loop ([@pvizeli])
- Fix Netatmo SSL issue with VPN URL ([@jabesq])
- Homematic: Fix bug with UNREACH device state/restore and variables not updating ([@pvizeli])
- Sonos: Prevent duplicate entries in favorite list ([@pvizeli])
- Fix Schlage Connect deadbolt integration via Z-Wave ([@turbokongen])
- Prevent infinite loop in crossconfigured mqtt event streams ([@aequitas])
- Fix Hue lightgroups failing on startup (@tboyce1)

### Backward-incompatible changes
- A **major** breaking change in the [`emulated_hue`][emul-hue] component means that unless you set `type: alexa` before starting up the newer Home Assistant version you will lose all devices that Alexa has discovered and will need to re-add them as well as create new groups.
- The platform of the [ISS][iss] integration was change to `binary_sensor`. Please check the platform documentation.
- The [Roku][roku] media uses now a new format for the entity IDs.
- [OpenALPR][openalpr] is no longer a component. It's now a platform for [Image processing][image].
- Due to massive improvements of the [Wink][wink] integration, the names of your binary sensors will change and new devices can show up.
- The [MySensors][mysensors] component now requires all persistence file paths to be set if any is set by the user. This is to avoid name conflicts for the paths. If no path is set Home Assistant will set all paths for you.
- The [Sonos][sonos] service `sonos_group_players` was removed. Use now `sonos_join` for this function.
- TTS cache have change for the last time. Files use now also an option hash as part of the name. If you want to use the cache, it need to be renamed or cleared, new created. E. g. `HASH_LANG_PLATFORM.xxx` -> `HASH_LANG_OPTIONS_PLATFORM.xxx`, replace *OPTIONS* with `-` on exiting platforms.

### If you need help...
...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://discord.gg/c5DvZ4e). The release notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

### Reporting Issues
Experiencing issues introduced by this release? Please report them in our [issue tracker](https://github.com/home-assistant/home-assistant/issues). Make sure to fill in all fields of the issue template.

[@DavidLP]: https://github.com/DavidLP
[@molobrakos]: https://github.com/molobrakos
[@MrMep]: https://github.com/MrMep
[@joopert]: https://github.com/joopert
[@armills]: https://github.com/armills
[@janLo]: https://github.com/janLo
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@danielperna84]: https://github.com/danielperna84
[@lukas-hetzenecker]: https://github.com/lukas-hetzenecker
[@robbiet480]: https://github.com/robbiet480
[@mjg59]: https://github.com/mjg59
[@turbokongen]: https://github.com/turbokongen
[@whhsw]: https://github.com/whhsw
[@jabesq]: https://github.com/jabesq
[@asbach]: https://github.com/asbach
[@stefan-jonasson]: https://github.com/stefan-jonasson
[@fabaff]: https://github.com/fabaff
[@RiRomain]: https://github.com/RiRomain
[@freol35241]: https://github.com/freol35241
[@jmvermeulen]: https://github.com/jmvermeulen
[@thecynic]: https://github.com/thecynic
[@aequitas]: https://github.com/aequitas
[@balloob]: https://github.com/balloob
[@konikvranik]: https://github.com/konikvranik
[@jeremydk]: https://github.com/jeremydk
[@alexmogavero]: https://github.com/alexmogavero
[@Duoxilian]: https://github.com/Duoxilian
[@nugget]: https://github.com/nugget
[@mezz64]: https://github.com/mezz64
[@pavoni]: https://github.com/pavoni
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@EarthlingRich]: https://github.com/EarthlingRich
[@andrey-git]: https://github.com/andrey-git
[@kellerza]: https://github.com/kellerza
[@dale3h]: https://github.com/dale3h
[@Deinara]: https://github.com/Deinara
[@jaharkes]: https://github.com/jaharkes
[@tchellomello]: https://github.com/tchellomello
[@jannau]: https://github.com/jannau
[@glance-]: https://github.com/glance-
[@w1ll1am23]: https://github.com/w1ll1am23
[@ecksun]: https://github.com/ecksun
[@nordlead2005]: https://github.com/nordlead2005
[@rytilahti]: https://github.com/rytilahti
[@rmkraus]: https://github.com/rmkraus
[@pvizeli]: https://github.com/pvizeli
[@anpetrov]: https://github.com/anpetrov
[@partofthething]: https://github.com/partofthething
[@craigjmidwinter]: https://github.com/craigjmidwinter
[@Danielhiversen]: https://github.com/Danielhiversen
[@colinodell]: https://github.com/colinodell
[@hoopty]: https://github.com/hoopty
[@martst]: https://github.com/martst
[@Whytey]: https://github.com/Whytey
[@MatoKafkac]: https://github.com/MatoKafkac
[@stu-gott]: https://github.com/stu-gott
[@jnewland]: https://github.com/jnewland
[@tdickman]: https://github.com/tdickman
[@xarnze]: https://github.com/xarnze
[@snagytx]: https://github.com/snagytx
[@gieljnssns]: https://github.com/gieljnssns
[@leppa]: https://github.com/leppa
[@lupin-de-mid]: https://github.com/lupin-de-mid
[@HerrHofrat]: https://github.com/HerrHofrat
[@xhostplus]: https://github.com/xhostplus
[@mKeRix]: https://github.com/mKeRix
[@fakezeta]: https://github.com/fakezeta

[amcrest]: /integrations/amcrest/#binary_sensors
[discord]: /integrations/discord
[tado]: /integrations/tado
[sky]: /integrations/sky_hub
[zabbix]: /integrations/zabbix/
[avion]: /integrations/avion
[anthem]: /integrations/anthemav
[bb-bin]: /integrations/bbb_gpio#binary-sensor
[piglow]: /integrations/piglow
[wsdot]:  /integrations/wsdot
[skybeacon]: /integrations/skybeacon
[lutron]: /integrations/lutron/
[polly]: /integrations/amazon_polly
[emul-hue]: /integrations/emulated_hue/
[netatmo]: /integrations/netatmo/
[face]: /integrations/microsoft_face/
[iss]: /integrations/iss
[roku]: /integrations/roku#media-player
[openalpr]: /integrations/#image-processing
[image]: /integrations/image_processing/
[emul_hue]: https://github.com/home-assistant/home-assistant/pull/5549
[coc]: /developers/code_of_conduct/
[cla]: /developers/cla/
[gov]: /blog/2017/01/21/home-assistant-governance/
[license]: /developers/license/
[wink]: /integrations/wink/
[coffee]: /integrations/wemo
[cec]: /integrations/hdmi_cec/
[mysensors]: /integrations/mysensors/
[sonos]: /integrations/sonos
[twilio]: /integrations/twilio_call
