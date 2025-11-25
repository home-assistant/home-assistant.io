---
title: "Home Assistant 0.43: IKEA Trådfri, Spotify and our iOS app is live"
description: "Another packed release. Three major cool new features and a ton of small ones."
date: 2017-04-22 01:04:05 +0000
date_formatted: "April 22, 2017"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
og_image: /images/blog/2017-04-0.43/components.png
---

<a href='/integrations/#added_in_current_version'><img src='/images/blog/2017-04-0.43/components.png' style='border: 0;box-shadow: none;'></a>

Oooh yeah. It's time for 0.43 and this is going to be a killer release. For the people that have been following on social media, you might have noticed that [we got pretty excited about the new IKEA Trådfri line up][ikea-blog]. And so we are very happy to announce that thanks to the work by [@ggravlingen], [@MartinHjelmare] and myself that this will be the first release to support the IKEA light bulbs. Home Assistant will automatically detect the gateway on your network and after following the instructions, allow you to control your lights.

<p class='img'>
<img src='/images/blog/2017-04-tradfri/discovery.png' />
After automatic discovery, Home Assistant will ask the user to finish pairing with the gateway.
</p>

And in case you have missed the other big news: [@robbiet480] released the [first version of our iOS app][ios]! It took a little over a year but it offers some great ways to make your iDevice work with Home Assistant. Big congrats to Robbie for shipping! As with our other parts, the app is open-sourced under APACHE 2 and contributors are welcome. [Check it out.][ios-source]

A big shout out this release to [@happyleavesaoc] for his constant stream of great contributions to Home Assistant. The first contribution was back in October 2015 and since then [@happyleavesaoc] has been responsible for many platforms and bug fixes including the Spotify platform this release. Thanks [@happyleavesaoc], you're a great example of what makes our community awesome.

The new Spotify integration is based on the new Spotify Connect Playback API. It supports playback, album art and switching which Spotify device you're controlling.

Also note that you have till the end of the weekend to [submit an application][application] to our giveaway of low energy servers which we got when [we won the Thomas Krenn award 2017][krenn]. [Go apply!][application]

[ikea-blog]: /blog/2017/04/17/ikea-tradfri-internet-of-things-done-right/
[ios]: /blog/2017/04/15/ios/
[ios-source]: https://github.com/home-assistant/home-assistant-ios
[krenn]: /blog/2017/04/01/thomas-krenn-award/
[application]: https://community.home-assistant.io/c/contest-2017

## New Platforms

- MaryTTS platform ([@johanpalmqvist] - [#6988]) ([tts.marytts docs]) (new-platform)
- Telegram bot component (incl. webhook and polling platform) ([@sander76] - [#6913]) ([telegram_bot docs]) ([telegram_bot.polling docs]) ([telegram_bot.webhooks docs]) (breaking change) (new-platform)
- Support fo map data from Neato ([@turbokongen] - [#6939]) ([neato docs]) ([camera.neato docs]) ([sensor.neato docs]) (new-platform)
- Support for IKEA Trådfri ([@ggravlingen] - [#7074]) ([light.tradfri docs]) (new-platform)
- MQTT camera ([@MrMep] - [#7092]) ([camera.mqtt docs]) (new-platform)
- LIFX Cloud scene support ([@amelchio] - [#7124]) ([scene.lifx_cloud docs]) (new-platform)
- Spotify media player ([@happyleavesaoc] - [#6980]) ([media_player.spotify docs]) (new-platform)
- JSON MQTT Device tracker ([@MrMep] - [#7055]) (new-platform)
- Opensky sensor ([@happyleavesaoc] - [#7061]) ([sensor.opensky docs]) (new-platform)
- Ping binary sensor ([@fabaff] - [#7052]) ([binary_sensor.ping docs]) (new-platform)
- myStrom Wifi Bulbs ([@fabaff] - [#7161]) ([light.mystrom docs]) (new-platform)

<!--more-->
## Backward-incompatible changes

- Remove deprecated classes from `homeassistant.remote` ([@balloob] - [#7011])
- min_max sensor has a different default name and will ignore states that are unknown ([@micw] - [#6786])
- `telegram_webhooks` has been converted to a new `telegram_bot` component. It has two platforms: webhook and polling platform ([@sander76] - [#6913]) ([telegram_bot docs])([telegram_bot.polling docs]) ([telegram_bot.webhooks docs])

```yaml
telegram_bot:
    platform: webhooks
    api_key : api_key_here
    allowed_chat_ids:
        - 123456
        - 456789
```

- Lutron_Caseta: it is no longer necessary to specify username and password in the config. ([@gurumitts] - [#7165]) ([lutron_caseta docs])
- mvglive: config has been updated to allow support for multiple departures ([@mountainsandcode] - [#6953]) ([sensor.mvglive docs])

```yaml
sensor:
  - platform: mvglive
    nextdeparture:
     - station: Hauptbahnhof
       name: Hbf
       destinations: ['München Flughafen Terminal','Markt Schwaben']
       products: "S-Bahn"
       timeoffset: 2
     - station: Sendlinger Tor
       lines: ['U2','U8']
     - station: Scheidplatz
       products: ['U-Bahn']
       directions: "1"
```

## If you need help...
...don't hesitate to use our very active [forums][forum] or join us for a little [chat][discord]. The release notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

## Reporting Issues
Experiencing issues introduced by this release? Please report them in our [issue tracker][issue]. Make sure to fill in all fields of the issue template.

## Release 0.43.1 - April 25

- Zwave cover workaround for graber shades. ([@turbokongen] - [#7204]) ([cover.zwave docs]) (zwave.workaround docs)
- Upgrade paho-mqtt to 1.2.3 ([@fabaff] - [#7214])
- Workround for wemo subscription bug. ([@pavoni] - [#7245]) ([wemo docs]) ([switch.wemo docs])
- Fix telegram webhooks ([@MartinHjelmare] - [#7236]) ([telegram_bot docs]) ([telegram_bot.webhooks docs])
- Work around bad content-type in Hook api response ([@KlaasH] - [#7267])
- Recorder: Check for ENTITY_ID key that contains None value ([@balloob] - [#7287]) ([recorder docs])

## Release 0.43.2 - April 27

- Frontend: Fix default date on history/logbook (@amelchio)
- Frontend: Fix logbook ui (@balloob)
- Upgrade pytradfri to 1.1 ([@balloob] - [#7290])
- Upgrade python-telegram-bot to 5.3.1 ([@fabaff] - [#7311]) ([notify.telegram docs]) ([telegram_bot.polling docs]) ([telegram_bot.webhooks docs])
- Version bump of aioautomatic ([@armills] - [#7300])
- Version bump for automatic ([@armills] - [#7329])
- Fix breaking SSL in test HTML5 ([@balloob] - [#7310]) ([notify.html5 docs])
- Fix for building Python Open Z-Wave in Docker ([@balloob] - [#7337])

## All changes

- Update kodi for aiohttp2 ([@armills] - [#6967]) ([media_player.kodi docs]) ([notify.kodi docs])
- Fix current_temperature is rounded ([@aufano] - [#6960]) ([climate docs])
- Bugfix time and task coro ([@pvizeli] - [#6968])
- Initial import for HassIO ([@pvizeli] - [#6935])
- Preserve customize glob order. ([@andrey-git] - [#6963])
- Foscam Camera: Adding exception handling when fetching the camera image to avoid python exception errors when host is not reachable or rather any URL error to camera ([@viswa-swami] - [#6964]) ([camera.foscam docs])
- light.yeelight: catch i/o related exceptions from the backend lib ([@rytilahti] - [#6952])
- From Dusk till Dawn ([@BillyNate] - [#6857]) ([sun docs])
- Tests for zwave services ([@armills] - [#6937]) ([zwave docs])
- Fix control+c quitting HASS ([@balloob] - [#6974])
- Update Emby for aiohttp v2 ([@mezz64] - [#6981])
- switch.tplink: upgrade to the newest upstream release which adds support for plugs using the newer communication protocol ([@rytilahti] - [#6979]) ([switch.tplink docs])
- switch.tplink: bump pyhs100 version requirement ([@rytilahti] - [#6986])
- Add tests for ZWaveDeviceEntityValues helper ([@armills] - [#6978]) ([zwave docs])
- Bump Amcrest module to 1.1.8 ([@tchellomello] - [#6990])
- update gstreamer ([@happyleavesaoc] - [#6987]) ([media_player.gstreamer docs])
- Warn if start takes a long time. ([@balloob] - [#6975])
- Upgrade to aiohttp 2.0.6 ([@balloob] - [#6992])
- Make discovery not block start ([@balloob] - [#6991])
- Downgrade aiohttp to 205 ([@balloob] - [#6994])
- Bump pywemo version. ([@pavoni] - [#7004])
- Fix Synology camera content type ([@balloob] - [#7010]) ([camera.synology docs])
- Fix two more instances of JSON parsing synology ([@balloob] - [#7014])
- Bump pyalarmdotcom to support new version of aiohttp ([@Xorso] - [#7021])
- Fix US states check (fixes #7015) ([@fabaff] - [#7017])
- Remove deprecated remote classes ([@balloob] - [#7011]) (breaking change)
- Replace 'vendor_id' with 'arch' (fixes #7003) ([@fabaff] - [#7023])
- more tests for slugify ([@micw] - [#7027])
- Additional ZWave coverage ([@armills] - [#7024]) ([zwave docs])
- bump ups version ([@happyleavesaoc] - [#7033])
- update usps version ([@happyleavesaoc] - [#7035])
- update fedex ([@happyleavesaoc] - [#7034])
- Google TTS can't read percent sign (#6971) ([@pezinek] - [#7030]) ([tts.google docs])
- Feature/min max improvements ([@micw] - [#6786]) (breaking change)
- Upgrade psutil to 5.2.2 ([@fabaff] - [#7037]) ([sensor.systemmonitor docs])
- Upgrade sendgrid to 4.0.0 ([@fabaff] - [#7038]) ([notify.sendgrid docs])
- Missing line name restriction added (fixes #7039) ([@DavidMStraub] - [#7040]) ([sensor.mvglive docs])
- Plug file leak on LIFX unregister ([@amelchio] - [#7031]) ([light.lifx docs])
- Make core to look available state of device on servicecall ([@pvizeli] - [#7045])
- Remove configuration sample ([@fabaff] - [#7048])
- Bugfix wait on start event ([@pvizeli] - [#7013])
- Bugfix slider ([@pvizeli] - [#7047]) ([input_slider docs])
- Add MaryTTS platform ([@johanpalmqvist] - [#6988]) ([tts.marytts docs]) (new-platform)
- Fix mysensors callback ([@MartinHjelmare] - [#7057]) ([mysensors docs]) ([device_tracker.mysensors docs])
- Constrain chardet to 2.3 ([@balloob] - [#7063])
- Fix/slugify with german umlaut ss ([@micw] - [#7029])
- Speed up aiohttp ([@balloob] - [#7064])
- Upgrade netdisco to 1.0.0rc2 ([@balloob] - [#7008])
- Telegram bot component (incl. webhook and polling platform) ([@sander76] - [#6913]) ([telegram_bot docs]) ([telegram_bot.polling docs]) ([telegram_bot.webhooks docs]) (breaking change) (new-platform)
- Upgrade paho-mqtt to 1.2.2 ([@fabaff] - [#7066])
- Fix handling with register callbacks on added_to_hass ([@pvizeli] - [#7067])
- Lutron. Bugfix callback registration. ([@pvizeli] - [#7042])
- Adding AlarmDecoder platform ([@hawk259] - [#6900])
- Add communication data attributes to Zwave node_entity ([@turbokongen] - [#6813]) ([zwave docs])
- Add product_name attribute to zwave nodes. ([@andrey-git] - [#7071])
- Bump braviarc version to 0.3.7 ([@robbiet480] - [#7078]) ([media_player.braviatv docs])
- Fix account balance in fido sensor ([@titilambert] - [#7077]) ([sensor.fido docs])
- MQTT: Managing binary payloads ([@MrMep] - [#6976]) ([mqtt docs])
- Bump qnapstats library version to 0.2.4 ([@colinodell] - [#7085]) ([sensor.qnap docs])
- Add support fo map data from Neato ([@turbokongen] - [#6939]) ([neato docs]) ([camera.neato docs]) ([sensor.neato docs]) (new-platform)
- Added initial support for IKEA Trådfri Gateway ([@ggravlingen] - [#7074]) ([light.tradfri docs]) (new-platform)
- Better thread safety in zwave node_entity ([@andrey-git] - [#7087])
- Uber version bump ([@armills] - [#7100]) (sensor.uber docs)
- No product ids configured should fetch all ids ([@armills] - [#7091])
- Upgrade aiohttp to 2.0.7 ([@fabaff] - [#7106])
- Update file header, add const for defaults, and update log messages ([@fabaff] - [#7110])
- Upgrade speedtest-cli to 1.0.4 ([@fabaff] - [#7105]) ([sensor.speedtest docs])
- Remove globally disabled pylint issue and update docstrings ([@fabaff] - [#7111])
- Use third-party lib aioautomatic for automatic ([@armills] - [#7126])
- Upgrade chardet to 3.0.2 ([@fabaff] - [#7112])
- Send stderr of ping tracker to devnull ([@amelchio] - [#7096]) ([device_tracker.ping docs])
- Upgraded Amcrest module to 1.1.9 to support new firmware versions: ([@tchellomello] - [#7130])
- Mqtt camera ([@MrMep] - [#7092]) ([camera.mqtt docs]) (new-platform)
- Bump version to 0.43.0.dev0 ([@MartinHjelmare] - [#7132])
- Load zwave panel ([@balloob] - [#7127]) ([zwave docs])
- IKEA Trådfri Gateway: added support for RGB ([@ggravlingen] - [#7115]) ([light.tradfri docs])
- Make Trådfri discoverable ([@balloob] - [#7128])
- Make version number optional and a string to fix identify issue introduced in iOS 1.0.1 ([@robbiet480] - [#7141])
- Fix for zwave RGB setting ([@armills] - [#7137])
- Replace rollershutter with cover in demo ([@robbiet480] - [#7140])
- Add debug logging to automation initial state ([@armills] - [#7068]) ([automation docs])
- Always return True/False from is_state and is_state_attr ([@amelchio] - [#7138])
- Add LIFX Cloud scene support ([@amelchio] - [#7124]) ([scene.lifx_cloud docs]) (new-platform)
- Fix LIFX lights with disappearing names ([@amelchio] - [#7119]) ([light.lifx docs])
- lutron: fix typo that prevented callback registration ([@thecynic] - [#7148]) ([lutron docs])
- Fix HassIO timeout bug ([@pvizeli] - [#7155])
- small fix for random effect in order to use the whole rgb range. So 255 is not excluded anymore. ([@Mister-Espria] - [#7156]) ([light.flux_led docs]) ([light.yeelight docs])
- exposed content_type in rest_command ([@cmsimike] - [#7101])
- Add vera power meter. ([@pavoni] - [#7134]) ([vera docs]) ([sensor.vera docs])
- Add support for tradfri color temp ([@MartinHjelmare] - [#7153]) ([light.tradfri docs])
- Disable MQTT camera test ([@balloob] - [#7164])
- myStrom WiFi bulbs ([@fabaff] - [#7161])
- Fix #7026 adding a new wol parameter ([@titilambert] - [#7144]) ([switch.wake_on_lan docs])
- Add subscription update for Wemo switches, fix bug in Insight switches, fix wemo motion bug, fix wemo discovery ([@pavoni] - [#7135]) ([wemo docs])
- Update neato.py ([@michaelarnauts] - [#7166]) ([neato docs])
- Keep track of already added players ([@molobrakos] - [#7149])
- Fix id zone mismatch ([@gurumitts] - [#7165]) ([lutron_caseta docs]) (breaking change)
- Upgrade pytradfri to 1.0 ([@balloob] - [#7163])
- Value of 0 should not be considered `unknown`. ([@aequitas] - [#7139])
- Upgrade netdisco ([@balloob] - [#7171])
- Added new services to platform kodi ([@alexmogavero] - [#6426]) ([media_player docs]) ([media_player.kodi docs])
- Suppress trackback and upgrade PyMata to 2.14 ([@fabaff] - [#7176]) ([arduino docs])
- Disable invalid-sequence-index ([@fabaff] - [#7177])
- Upgrade mypy to 0.501 (was renamed from mypy-lang) ([@fabaff] - [#7117])
- Add condition for API failure ([@sytone] - [#7181])
- Add history to component priority list ([@balloob] - [#7173])
- Tweak Tradfri ([@balloob] - [#7172]) ([light.tradfri docs])
- Mqtt camera test ([@MrMep] - [#7175])
- updated pylgtv module to fix problems with timeouts ([@hmn] - [#7184]) ([media_player.webostv docs]) ([notify.webostv docs])
- Fix wemo discovery ([@balloob] - [#7183]) ([wemo docs]) ([light.wemo docs]) ([switch.wemo docs])
- Add Bose soundtouch discovery support and upgrade libsoundtouch library ([@CharlesBlonde] - [#7005])
- spotify media player ([@happyleavesaoc] - [#6980]) ([media_player.spotify docs]) (new-platform)
- JSON MQTT Device tracker ([@MrMep] - [#7055]) (new-platform)
- opensky sensor ([@happyleavesaoc] - [#7061]) ([sensor.opensky docs]) (new-platform)
- Add ping binary sensor ([@fabaff] - [#7052]) ([binary_sensor.ping docs]) (new-platform)
- Added light.pwm component. ([@soldag] - [#7009])
- Fix for errors on missing preview on LG webos TV ([@masarliev] - [#6755]) ([media_player.webostv docs])
- Fix auto discovery for Apple TV ([@postlund] - [#7188]) ([media_player.apple_tv docs])
- Do not request artwork if not available ([@postlund] - [#7189]) ([media_player.apple_tv docs])
- mvglive bug fixes and improvements ([@mountainsandcode] - [#6953]) ([sensor.mvglive docs]) (breaking change)
- Upgrade py-cpuinfo to 3.2.0 ([@fabaff] - [#7190]) ([sensor.cpuspeed docs])
- Add support of input registers while querying modbus sensor. ([@LvivEchoes] - [#7082]) ([modbus docs]) ([sensor.modbus docs])
- Add HassIO to discovery component ([@pvizeli] - [#7195])
- LIFX light effects ([@amelchio] - [#7145]) ([light.lifx docs])
- HassIO API v2 ([@pvizeli] - [#7201])
- Support xy_color with LIFX lights ([@amelchio] - [#7208]) ([light.lifx docs])
- Update ios.py ([@biacz] - [#7160])
- Fix arwn platform to update hass state when events are received ([@sdague] - [#7202])
- Issue 6749 updated pylgtv to 0.1.6 to fix thread leak in asyncio loop ([@hmn] - [#7199]) ([media_player.webostv docs]) ([notify.webostv docs])

[#6426]: https://github.com/home-assistant/home-assistant/pull/6426
[#6755]: https://github.com/home-assistant/home-assistant/pull/6755
[#6786]: https://github.com/home-assistant/home-assistant/pull/6786
[#6813]: https://github.com/home-assistant/home-assistant/pull/6813
[#6857]: https://github.com/home-assistant/home-assistant/pull/6857
[#6900]: https://github.com/home-assistant/home-assistant/pull/6900
[#6913]: https://github.com/home-assistant/home-assistant/pull/6913
[#6935]: https://github.com/home-assistant/home-assistant/pull/6935
[#6937]: https://github.com/home-assistant/home-assistant/pull/6937
[#6939]: https://github.com/home-assistant/home-assistant/pull/6939
[#6952]: https://github.com/home-assistant/home-assistant/pull/6952
[#6953]: https://github.com/home-assistant/home-assistant/pull/6953
[#6960]: https://github.com/home-assistant/home-assistant/pull/6960
[#6963]: https://github.com/home-assistant/home-assistant/pull/6963
[#6964]: https://github.com/home-assistant/home-assistant/pull/6964
[#6966]: https://github.com/home-assistant/home-assistant/pull/6966
[#6967]: https://github.com/home-assistant/home-assistant/pull/6967
[#6968]: https://github.com/home-assistant/home-assistant/pull/6968
[#6974]: https://github.com/home-assistant/home-assistant/pull/6974
[#6975]: https://github.com/home-assistant/home-assistant/pull/6975
[#6976]: https://github.com/home-assistant/home-assistant/pull/6976
[#6978]: https://github.com/home-assistant/home-assistant/pull/6978
[#6979]: https://github.com/home-assistant/home-assistant/pull/6979
[#6980]: https://github.com/home-assistant/home-assistant/pull/6980
[#6981]: https://github.com/home-assistant/home-assistant/pull/6981
[#6986]: https://github.com/home-assistant/home-assistant/pull/6986
[#6987]: https://github.com/home-assistant/home-assistant/pull/6987
[#6988]: https://github.com/home-assistant/home-assistant/pull/6988
[#6990]: https://github.com/home-assistant/home-assistant/pull/6990
[#6991]: https://github.com/home-assistant/home-assistant/pull/6991
[#6992]: https://github.com/home-assistant/home-assistant/pull/6992
[#6994]: https://github.com/home-assistant/home-assistant/pull/6994
[#7004]: https://github.com/home-assistant/home-assistant/pull/7004
[#7005]: https://github.com/home-assistant/home-assistant/pull/7005
[#7008]: https://github.com/home-assistant/home-assistant/pull/7008
[#7009]: https://github.com/home-assistant/home-assistant/pull/7009
[#7010]: https://github.com/home-assistant/home-assistant/pull/7010
[#7011]: https://github.com/home-assistant/home-assistant/pull/7011
[#7013]: https://github.com/home-assistant/home-assistant/pull/7013
[#7014]: https://github.com/home-assistant/home-assistant/pull/7014
[#7017]: https://github.com/home-assistant/home-assistant/pull/7017
[#7021]: https://github.com/home-assistant/home-assistant/pull/7021
[#7023]: https://github.com/home-assistant/home-assistant/pull/7023
[#7024]: https://github.com/home-assistant/home-assistant/pull/7024
[#7027]: https://github.com/home-assistant/home-assistant/pull/7027
[#7029]: https://github.com/home-assistant/home-assistant/pull/7029
[#7030]: https://github.com/home-assistant/home-assistant/pull/7030
[#7031]: https://github.com/home-assistant/home-assistant/pull/7031
[#7033]: https://github.com/home-assistant/home-assistant/pull/7033
[#7034]: https://github.com/home-assistant/home-assistant/pull/7034
[#7035]: https://github.com/home-assistant/home-assistant/pull/7035
[#7037]: https://github.com/home-assistant/home-assistant/pull/7037
[#7038]: https://github.com/home-assistant/home-assistant/pull/7038
[#7040]: https://github.com/home-assistant/home-assistant/pull/7040
[#7042]: https://github.com/home-assistant/home-assistant/pull/7042
[#7045]: https://github.com/home-assistant/home-assistant/pull/7045
[#7047]: https://github.com/home-assistant/home-assistant/pull/7047
[#7048]: https://github.com/home-assistant/home-assistant/pull/7048
[#7052]: https://github.com/home-assistant/home-assistant/pull/7052
[#7055]: https://github.com/home-assistant/home-assistant/pull/7055
[#7057]: https://github.com/home-assistant/home-assistant/pull/7057
[#7061]: https://github.com/home-assistant/home-assistant/pull/7061
[#7063]: https://github.com/home-assistant/home-assistant/pull/7063
[#7064]: https://github.com/home-assistant/home-assistant/pull/7064
[#7066]: https://github.com/home-assistant/home-assistant/pull/7066
[#7067]: https://github.com/home-assistant/home-assistant/pull/7067
[#7068]: https://github.com/home-assistant/home-assistant/pull/7068
[#7071]: https://github.com/home-assistant/home-assistant/pull/7071
[#7074]: https://github.com/home-assistant/home-assistant/pull/7074
[#7077]: https://github.com/home-assistant/home-assistant/pull/7077
[#7078]: https://github.com/home-assistant/home-assistant/pull/7078
[#7082]: https://github.com/home-assistant/home-assistant/pull/7082
[#7085]: https://github.com/home-assistant/home-assistant/pull/7085
[#7087]: https://github.com/home-assistant/home-assistant/pull/7087
[#7091]: https://github.com/home-assistant/home-assistant/pull/7091
[#7092]: https://github.com/home-assistant/home-assistant/pull/7092
[#7096]: https://github.com/home-assistant/home-assistant/pull/7096
[#7100]: https://github.com/home-assistant/home-assistant/pull/7100
[#7101]: https://github.com/home-assistant/home-assistant/pull/7101
[#7105]: https://github.com/home-assistant/home-assistant/pull/7105
[#7106]: https://github.com/home-assistant/home-assistant/pull/7106
[#7110]: https://github.com/home-assistant/home-assistant/pull/7110
[#7111]: https://github.com/home-assistant/home-assistant/pull/7111
[#7112]: https://github.com/home-assistant/home-assistant/pull/7112
[#7115]: https://github.com/home-assistant/home-assistant/pull/7115
[#7117]: https://github.com/home-assistant/home-assistant/pull/7117
[#7119]: https://github.com/home-assistant/home-assistant/pull/7119
[#7124]: https://github.com/home-assistant/home-assistant/pull/7124
[#7126]: https://github.com/home-assistant/home-assistant/pull/7126
[#7127]: https://github.com/home-assistant/home-assistant/pull/7127
[#7128]: https://github.com/home-assistant/home-assistant/pull/7128
[#7130]: https://github.com/home-assistant/home-assistant/pull/7130
[#7132]: https://github.com/home-assistant/home-assistant/pull/7132
[#7134]: https://github.com/home-assistant/home-assistant/pull/7134
[#7135]: https://github.com/home-assistant/home-assistant/pull/7135
[#7137]: https://github.com/home-assistant/home-assistant/pull/7137
[#7138]: https://github.com/home-assistant/home-assistant/pull/7138
[#7139]: https://github.com/home-assistant/home-assistant/pull/7139
[#7140]: https://github.com/home-assistant/home-assistant/pull/7140
[#7141]: https://github.com/home-assistant/home-assistant/pull/7141
[#7144]: https://github.com/home-assistant/home-assistant/pull/7144
[#7145]: https://github.com/home-assistant/home-assistant/pull/7145
[#7148]: https://github.com/home-assistant/home-assistant/pull/7148
[#7149]: https://github.com/home-assistant/home-assistant/pull/7149
[#7153]: https://github.com/home-assistant/home-assistant/pull/7153
[#7155]: https://github.com/home-assistant/home-assistant/pull/7155
[#7156]: https://github.com/home-assistant/home-assistant/pull/7156
[#7160]: https://github.com/home-assistant/home-assistant/pull/7160
[#7161]: https://github.com/home-assistant/home-assistant/pull/7161
[#7163]: https://github.com/home-assistant/home-assistant/pull/7163
[#7164]: https://github.com/home-assistant/home-assistant/pull/7164
[#7165]: https://github.com/home-assistant/home-assistant/pull/7165
[#7166]: https://github.com/home-assistant/home-assistant/pull/7166
[#7171]: https://github.com/home-assistant/home-assistant/pull/7171
[#7172]: https://github.com/home-assistant/home-assistant/pull/7172
[#7173]: https://github.com/home-assistant/home-assistant/pull/7173
[#7175]: https://github.com/home-assistant/home-assistant/pull/7175
[#7176]: https://github.com/home-assistant/home-assistant/pull/7176
[#7177]: https://github.com/home-assistant/home-assistant/pull/7177
[#7181]: https://github.com/home-assistant/home-assistant/pull/7181
[#7183]: https://github.com/home-assistant/home-assistant/pull/7183
[#7184]: https://github.com/home-assistant/home-assistant/pull/7184
[#7188]: https://github.com/home-assistant/home-assistant/pull/7188
[#7189]: https://github.com/home-assistant/home-assistant/pull/7189
[#7190]: https://github.com/home-assistant/home-assistant/pull/7190
[#7195]: https://github.com/home-assistant/home-assistant/pull/7195
[#7199]: https://github.com/home-assistant/home-assistant/pull/7199
[#7201]: https://github.com/home-assistant/home-assistant/pull/7201
[#7202]: https://github.com/home-assistant/home-assistant/pull/7202
[#7208]: https://github.com/home-assistant/home-assistant/pull/7208
[@BillyNate]: https://github.com/BillyNate
[@CharlesBlonde]: https://github.com/CharlesBlonde
[@DavidMStraub]: https://github.com/DavidMStraub
[@JesseWebDotCom]: https://github.com/JesseWebDotCom
[@LvivEchoes]: https://github.com/LvivEchoes
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@Mister-Espria]: https://github.com/Mister-Espria
[@MrMep]: https://github.com/MrMep
[@Xorso]: https://github.com/Xorso
[@aequitas]: https://github.com/aequitas
[@alexmogavero]: https://github.com/alexmogavero
[@amelchio]: https://github.com/amelchio
[@andrey-git]: https://github.com/andrey-git
[@armills]: https://github.com/armills
[@aufano]: https://github.com/aufano
[@balloob]: https://github.com/balloob
[@biacz]: https://github.com/biacz
[@cmsimike]: https://github.com/cmsimike
[@colinodell]: https://github.com/colinodell
[@fabaff]: https://github.com/fabaff
[@ggravlingen]: https://github.com/ggravlingen
[@gurumitts]: https://github.com/gurumitts
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@hawk259]: https://github.com/hawk259
[@hmn]: https://github.com/hmn
[@johanpalmqvist]: https://github.com/johanpalmqvist
[@masarliev]: https://github.com/masarliev
[@mezz64]: https://github.com/mezz64
[@michaelarnauts]: https://github.com/michaelarnauts
[@micw]: https://github.com/micw
[@molobrakos]: https://github.com/molobrakos
[@mountainsandcode]: https://github.com/mountainsandcode
[@pavoni]: https://github.com/pavoni
[@pezinek]: https://github.com/pezinek
[@postlund]: https://github.com/postlund
[@pvizeli]: https://github.com/pvizeli
[@robbiet480]: https://github.com/robbiet480
[@rytilahti]: https://github.com/rytilahti
[@sander76]: https://github.com/sander76
[@sdague]: https://github.com/sdague
[@soldag]: https://github.com/soldag
[@sytone]: https://github.com/sytone
[@tchellomello]: https://github.com/tchellomello
[@thecynic]: https://github.com/thecynic
[@titilambert]: https://github.com/titilambert
[@turbokongen]: https://github.com/turbokongen
[@viswa-swami]: https://github.com/viswa-swami

[arduino docs]: /integrations/arduino/
[automation docs]: /integrations/automation/
[binary_sensor.ping docs]: /integrations/ping#binary-sensor
[binary_sensor.wemo docs]: /integrations/wemo
[camera.foscam docs]: /integrations/foscam
[camera.mqtt docs]: /integrations/camera.mqtt/
[camera.neato docs]: /integrations/neato#camera
[camera.synology docs]: /integrations/synology
[climate docs]: /integrations/climate/
[device_tracker.mysensors docs]: /integrations/device_tracker.mysensors/
[device_tracker.ping docs]: /integrations/ping
[hassio docs]: /integrations/hassio/
[input_slider docs]: /integrations/input_number
[light.flux_led docs]: /integrations/flux_led
[light.lifx docs]: /integrations/lifx
[light.lutron_caseta docs]: /integrations/lutron_caseta/
[light.mystrom docs]: /integrations/mystrom#light
[light.services.yaml docs]: /integrations/light.services.yaml/
[light.tradfri docs]: /integrations/tradfri
[light.wemo docs]: /integrations/wemo
[light.yeelight docs]: /integrations/yeelight
[lutron docs]: /integrations/lutron/
[lutron_caseta docs]: /integrations/lutron_caseta/
[media_player docs]: /integrations/media_player/
[media_player.apple_tv docs]: /integrations/apple_tv
[media_player.braviatv docs]: /integrations/braviatv
[media_player.gstreamer docs]: /integrations/gstreamer
[media_player.kodi docs]: /integrations/kodi
[media_player.spotify docs]: /integrations/spotify
[media_player.webostv docs]: /integrations/webostv#media-player
[modbus docs]: /integrations/modbus/
[mqtt docs]: /integrations/mqtt/
[mysensors docs]: /integrations/mysensors/
[neato docs]: /integrations/neato/
[notify.kodi docs]: /integrations/kodi
[notify.sendgrid docs]: /integrations/sendgrid
[notify.webostv docs]: /integrations/webostv
[scene.lifx_cloud docs]: /integrations/lifx_cloud
[sensor.cpuspeed docs]: /integrations/cpuspeed
[sensor.crimereports docs]: /integrations/crimereports
[sensor.fido docs]: /integrations/fido
[sensor.modbus docs]: /integrations/sensor.modbus/
[sensor.mvglive docs]: /integrations/mvglive
[sensor.neato docs]: /integrations/neato/
[sensor.opensky docs]: /integrations/opensky
[sensor.qnap docs]: /integrations/qnap
[sensor.speedtest docs]: /integrations/speedtestdotnet
[sensor.systemmonitor docs]: /integrations/systemmonitor
[sensor.vera docs]: /integrations/vera#sensor
[sun docs]: /integrations/sun/
[switch.tplink docs]: /integrations/tplink
[switch.wake_on_lan docs]: /integrations/wake_on_lan#switch
[switch.wemo docs]: /integrations/wemo
[telegram_bot docs]: /integrations/telegram_bot/
[telegram_bot.polling docs]: /integrations/telegram_polling
[telegram_bot.webhooks docs]: /integrations/telegram_webhooks
[tts.google docs]: /integrations/google_translate
[tts.marytts docs]: /integrations/marytts
[vera docs]: /integrations/vera/
[wemo docs]: /integrations/wemo/
[zwave docs]: /integrations/zwave/
[zwave.node_entity docs]: /integrations/zwave.node_entity/
[forum]: https://community.home-assistant.io/
[issue]: https://github.com/home-assistant/home-assistant/issues
[#7204]: https://github.com/home-assistant/home-assistant/pull/7204
[#7214]: https://github.com/home-assistant/home-assistant/pull/7214
[#7236]: https://github.com/home-assistant/home-assistant/pull/7236
[#7245]: https://github.com/home-assistant/home-assistant/pull/7245
[#7267]: https://github.com/home-assistant/home-assistant/pull/7267
[#7287]: https://github.com/home-assistant/home-assistant/pull/7287
[@KlaasH]: https://github.com/KlaasH
[cover.zwave docs]: /integrations/zwave#cover
[recorder docs]: /integrations/recorder/
[switch.wemo docs]: /integrations/wemo
[telegram_bot docs]: /integrations/telegram_bot/
[telegram_bot.webhooks docs]: /integrations/telegram_webhooks
[wemo docs]: /integrations/wemo/
[#7271]: https://github.com/home-assistant/home-assistant/pull/7271
[#7282]: https://github.com/home-assistant/home-assistant/pull/7282
[#7290]: https://github.com/home-assistant/home-assistant/pull/7290
[#7300]: https://github.com/home-assistant/home-assistant/pull/7300
[#7310]: https://github.com/home-assistant/home-assistant/pull/7310
[#7311]: https://github.com/home-assistant/home-assistant/pull/7311
[#7323]: https://github.com/home-assistant/home-assistant/pull/7323
[#7324]: https://github.com/home-assistant/home-assistant/pull/7324
[#7329]: https://github.com/home-assistant/home-assistant/pull/7329
[#7337]: https://github.com/home-assistant/home-assistant/pull/7337
[hassio docs]: /integrations/hassio/
[notify.html5 docs]: /integrations/html5
[notify.telegram docs]: /integrations/telegram
[telegram_bot.polling docs]: /integrations/telegram_polling
[discord]: https://discord.gg/c5DvZ4e
