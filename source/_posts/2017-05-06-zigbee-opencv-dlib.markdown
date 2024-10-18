---
title: "Home Assistant 0.44: Zigbee, OpenCV and DLib"
description: "Speak natively with Zigbee network, detect faces with OpenCV: 0.44 is here."
date: 2017-05-06 01:04:05 +0000
date_formatted: "May 6, 2017"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
og_image: /images/blog/2017-05-0.44/components.png
---

<a href='/integrations/#version/0.44'><img src='/images/blog/2017-05-0.44/components.png' style='border: 0;box-shadow: none;'></a>

This release brings some great new integrations. The biggest one is the [native Zigbee integration][zha docs] by [Russell Cloran][@rcloran]. This will allow Home Assistant to natively control Philips Hue lights without the need for a hub! (IKEA Tradfri lights not yet due to implementing a different profile)

Another great new addition is [OpenCV][opencv docs] by [Teagan Glenn][@teagan42]. So now you'll be able to unlock all the cool stuff from OpenCV right in Home Assistant. And if OpenCV is not your style, you can try out the new [DLib integration][image_processing.dlib_face_identify docs] added by [Pascal Vizeli][@pvizeli] in this release.

This release also includes a [new component][rss_feed_template docs] to dynamically generate RSS feeds based on a template. This means that any RSS widget on your phone, tablet or computer can now be used to show Home Assistant data!

And finally, for users of the config panel in the UI, we have fixed the issue with the group editor.

Enjoy!

## If you need help...
...don't hesitate to use our very active [forums][forum] or join us for a little [chat][discord]. The release notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

## Reporting Issues
Experiencing issues introduced by this release? Please report them in our [issue tracker][issue]. Make sure to fill in all fields of the issue template.

## New integrations

- Pushbullet notification sensor ([@jotunacorn] - [#7182]) ([sensor.pushbullet docs])
- Add https certificate expiry sensor ([@fabfurnari] - [#7272]) ([sensor.cert_expiry docs])
- RSS feed template ([@micw] - [#7032]) ([rss_feed_template docs])
- Add support for Zigbee Home Automation ([@rcloran] - [#6263]) ([zha docs]) ([binary_sensor.zha docs]) ([light.zha docs]) ([sensor.zha docs]) ([switch.zha docs])
- Support for Blinkt! lights on Raspberry Pi ([@imrehg] - [#7377]) ([light.blinkt docs])
- Plant automation ([@ChristianKuehnel] - [#7131]) ([plant docs])
- Add Eight sleep component ([@mezz64] - [#7275]) ([eight_sleep docs]) ([binary_sensor.eight_sleep docs]) ([sensor.eight_sleep docs])
- OpenGarage support ([@swbradshaw] - [#7338]) ([cover.opengarage docs])
- Add Sensibo climate platform ([@andrey-git] - [#7379]) ([climate docs])
- Pilight binary sensor components ([@zeltom] - [#6774]) ([binary_sensor.pilight docs])
- Opencv ([@Teagan42] - [#7261]) ([opencv docs]) ([image_processing.opencv docs])
- Enviro pHAT ([@imrehg] - [#7427]) ([sensor.envirophat docs])
- Add support for face recognition with dlib ([@pvizeli] - [#7421]) ([image_processing.dlib_face_detect docs]) ([image_processing.dlib_face_identify docs])

## Release 0.44.2 - May 8

- Fix opening add-ons in Hass.io store that are not installed ([@balloob])

## Release 0.44.1 - May 7

- Fix opening add-ons in Hass.io store that are not installed ([@balloob])
- sensor.envirophat: add missing requirement ([@imrehg] - [#7451]) ([sensor.envirophat docs])
- Forecasts for weather underground ([@pezinek] - [#7062]) ([sensor.wunderground docs])
- Upgrade pymysensors to 0.10.0 ([@MartinHjelmare] - [#7469])
- Fix plant MIN_TEMPERATURE, MAX_TEMPERATURE validation ([@frog32] - [#7476]) ([plant docs])
- Update to pyunifi 2.12 ([@finish06] - [#7468]) ([device_tracker.unifi docs])
- MQTT Cover: Fixed status reporting for range with non-zero base ([@cribbstechnologies])

<!--more-->
## Backward-incompatible changes

- Python Open Z-Wave made a release that fixed string processing. This was backwards incompatible. We have updated our code so you'll have to update to the latest Python Open Z-Wave with this release. You can also wait one release, as next release we'll introduce automatic installing of Python Open Z-Wave. ([@keatontaylor] - [#7266]) ([climate.zwave docs]) (breaking change)
- InfluxDB configuration to blacklist domains has been updated to allow more features. ([@janLo] - [#7264]) (breaking change)

```yaml
# New format
influxdb:
  exclude:
    entities:
       - entity.id1
       - entity.id2
    domains:
       - automation
  include:
    entities:
       - entity.id3
       - entity.id4
```

- The Automatic device tracker has been converted from polling to websocket push. This requires you to make a change in your Automatic account, see our documentation for instructions. ([@armills] - [#7404]) (breaking change)
- The LimitlessLED color temperatures have been turned around to work like other lights. To maintain previous colors you must adjust the color_temp value in your light.turn_on calls to 654 minus your old value (for example, 280 becomes 374). ([@amelchio] - [#7359]) (breaking change)
- Joao apps will now require an API key to be set for all commands. ([@nkgilley] - [#7443]) ([joaoapps_join docs]) ([notify.joaoapps_join docs]) (breaking change)

## All changes

- LIFX light effects ([@amelchio] - [#7145]) ([light.lifx docs])
- HassIO API v2 ([@pvizeli] - [#7201])
- Capture and log pip install error output ([@postlund] - [#7200])
- Support xy_color with LIFX lights ([@amelchio] - [#7208]) ([light.lifx docs])
- Update ios.py ([@biacz] - [#7160])
- Fix arwn platform to update hass state when events are received ([@sdague] - [#7202])
- Issue 6749 updated pylgtv to 0.1.6 to fix thread leak in asyncio loop ([@hmn] - [#7199]) ([media_player.webostv docs]) ([notify.webostv docs])
- tradfri: Improve color temp support detection ([@balloob] - [#7211])
- Fix tradfri lights ([@MartinHjelmare] - [#7212])
- Bump version to 0.44.0.dev0 ([@fabaff] - [#7217])
- Pushbullet notification sensor ([@jotunacorn] - [#7182]) ([sensor.pushbullet docs]) (new-platform)
- Zwave cover workaround for graber shades. ([@turbokongen] - [#7204]) ([cover.zwave docs])
- Fixed typo and clarified details for Lifx effects ([@arsaboo] - [#7226])
- Remove superfluous comments and update ordering ([@fabaff] - [#7227]) ([maxcube docs]) ([binary_sensor.maxcube docs]) ([climate.maxcube docs])
- lyft sensor: re-enable Prime Time rate attribute ([@drkp] - [#6982]) ([sensor.lyft docs])
- Bump a couple of dependencies ([@mjg59] - [#7231]) ([light.avion docs]) ([light.decora docs])
- Refactor lyft sensor update ([@armills] - [#7233]) ([sensor.lyft docs])
- LIFX: avoid "Unable to remove unknown listener" warning ([@amelchio] - [#7235]) ([light.lifx docs])
- Upgrade pygatt to 3.1.1 ([@fabaff] - [#7220])
- Upgrade mutagen to 1.37.0 ([@fabaff] - [#7216])
- Upgrade speedtest-cli to 1.0.5 ([@fabaff] - [#7215])
- Upgrade paho-mqtt to 1.2.3 ([@fabaff] - [#7214])
- Upgrade aiohttp_cors to 0.5.3 ([@fabaff] - [#7213])
- Use consts and string formatting ([@fabaff] - [#7243]) (notify.instapush docs)
- Pushed to version 0.4.0 of denonavr which also includes experimental support for Marantz receivers ([@scarface-4711] - [#7250])
- Add notice regarding submission of analytics ([@craftyguy] - [#7263])
- Iterating the dictionary directly ([@fabaff] - [#7251])
- Don't use len(SEQUENCE) as condition value ([@fabaff] - [#7249])
- Workround for wemo subscription bug. ([@pavoni] - [#7245]) ([wemo docs]) ([switch.wemo docs])
- Fix telegram webhooks ([@MartinHjelmare] - [#7236]) ([telegram_bot docs]) ([telegram_bot.webhooks docs])
- Work around bad content-type in Hook api response ([@KlaasH] - [#7267])
- Rfxtrx upgrade lib 0.18 ([@danielhiversen] - [#7273]) ([rfxtrx docs])
- WIP: HassIO allow to access to container logs. ([@pvizeli] - [#7271])
- Update aiolifx ([@amelchio] - [#7279]) ([light.lifx docs])
- Refactor matrix notify service ([@Cadair] - [#7122]) ([notify.matrix docs])
- Add support for Ukrainian Language in Google TTS ([@LvivEchoes] - [#7278])
- Add https certificate expiry sensor ([@fabfurnari] - [#7272]) ([sensor.cert_expiry docs]) (new-platform)
- Fix telegram_polling no first_name or last_name ([@darookee] - [#7281]) ([telegram_bot docs])
- Add script to import state events to InfluxDB ([@janLo] - [#7254])
- Fix HassIO bug with supervisor update & log ([@pvizeli] - [#7282])
- Updating ping binary sensor with Windows support ([@patrickeasters] - [#7253]) ([binary_sensor.ping docs])
- Fixes utf-8 encoding no longer required by python-openzwave0.3.3 ([@keatontaylor] - [#7266]) ([climate.zwave docs]) (breaking change)
- Recorder: Check for ENTITY_ID key that contains None value ([@balloob] - [#7287]) ([recorder docs])
- Upgrade pytradfri to 1.1 ([@balloob] - [#7290])
- Adding group control to tradfri light component ([@cyberjunky] - [#7248]) ([light.tradfri docs])
- Feature/rss feed template ([@micw] - [#7032]) ([rss_feed_template docs]) (new-platform)
- Add support for Zigbee Home Automation ([@rcloran] - [#6263]) ([zha docs]) ([binary_sensor.zha docs]) ([light.zha docs]) ([sensor.zha docs]) ([switch.zha docs]) (new-platform)
- Added scene controller support to the vera component, along with proper polling when a vera device needs it ([@alanfischer] - [#7234]) ([vera docs]) ([sensor.vera docs])
- Don't stack up error messages, fix link, and ordering ([@fabaff] - [#7291]) ([sensor.cert_expiry docs])
- Fix breaking SSL in test HTML5 ([@balloob] - [#7310]) ([notify.html5 docs])
- Upgrade pyhomematic, extend device support ([@danielperna84] - [#7303])
- Issue 7218 update pylgtv to 0.1.7 ([@hmn] - [#7302]) ([media_player.webostv docs]) ([notify.webostv docs])
- Version bump of aioautomatic ([@armills] - [#7300])
- Upgrade python-telegram-bot to 5.3.1 ([@fabaff] - [#7311]) ([notify.telegram docs]) ([telegram_bot.polling docs]) ([telegram_bot.webhooks docs])
- Disable Open Z-Wave in Docker ([@balloob] - [#7315])
- LIFX: use white light when setting a specific temperature ([@amelchio] - [#7256]) ([light.lifx docs])
- Allow InfluxDB to blacklist domains ([@janLo] - [#7264]) (breaking change)
- Hassio api v3 ([@balloob] - [#7323])
- Update frontend ([@balloob] - [#7324])
- Reduce color_xy_brightness_to_hsv to color_xy_to_hs ([@amelchio] - [#7320]) ([light.hue docs]) ([light.lifx docs])
- Fix broken docker build ([@turbokongen] - [#7316])
- Re-enable Open Z-Wave in Dockerfile ([@balloob] - [#7325])
- Version bump for automatic ([@armills] - [#7329])
- Right fix for Python Open Z-Wave in Docker ([@balloob] - [#7337])
- Use four-digits year ([@fabaff] - [#7336])
- Allow multiple recipients for SMTP notify ([@amelchio] - [#7319]) ([notify.smtp docs])
- Add auxheat to ecobee climate ([@titilambert] - [#6562]) ([climate.ecobee docs])
- Properly return self._unit_of_measurement in the unit_of_measurement function ([@robbiet480] - [#7341]) ([sensor.ios docs])
- Multiple changes (typo, ordering, docstrings, timeouts) ([@fabaff] - [#7343]) ([cover.garadget docs])
- Upgrade Flux led lb to 0.19 ([@danielhiversen] - [#7352]) ([light.flux_led docs])
- Add debug logging to pyvera events. ([@pavoni] - [#7364]) ([vera docs])
- Upgrade xmltodict to 0.11.0 ([@fabaff] - [#7355])
- Upgrade speedtest-cli to 1.0.6 ([@fabaff] - [#7354]) ([sensor.speedtest docs])
- Remove global limit on white light temperature ([@amelchio] - [#7206]) ([light docs]) ([light.hue docs]) ([light.zwave docs]) ([switch.flux docs])
- Remove state property from alarmdecoder binary sensor ([@balloob] - [#7370]) ([binary_sensor.alarmdecoder docs])
- Remove binary sensor platforms implementing state property ([@balloob] - [#7371]) ([binary_sensor.octoprint docs]) ([binary_sensor.workday docs])
- Feature/add mikrotik device tracker ([@LvivEchoes] - [#7366])
- Netdisco now returns a dictionary while it used to be a tuple, fixed ([@JasonCarter80] - [#7350])
- Create knx.py ([@onsmam] - [#7356])
- light.sensehat: plugin to control the 8x8 LED matrix on a Sense hat ([@imrehg] - [#7365])
- Update docstrings ([@fabaff] - [#7361]) ([ecobee docs]) ([enocean docs]) ([zha docs])
- Flux switch: avoid updates when off ([@amelchio] - [#7363]) ([switch.flux docs])
- Zoneminder: Fixed undefined index error ([@bah2830] - [#7340])
- optimize remote calls and apps on webostv media_player ([@hmn] - [#7191]) ([media_player.webostv docs])
- binary_sensor.workday: fix handling of states vs provinces ([@drkp] - [#7162]) ([binary_sensor.workday docs])
- Upgrade voluptuous to 0.10.5 ([@fabaff] - [#7107])
- Remove ordered_dict validator ([@balloob] - [#7375])
- light.blinkt: add support for Blinkt! lights on Raspberry Pi ([@imrehg] - [#7377]) ([light.blinkt docs]) (new-platform)
- improve handling of flux_led lights in RGBW mode ([@wuub] - [#7221])
- Plant (replacement for MiGardener) ([@ChristianKuehnel] - [#7131]) ([plant docs]) (new-platform)
- Add support for shuffle toggling on Spotify component. ([@abmantis] - [#7339]) ([media_player docs]) ([media_player.spotify docs])
- Upgrade Ring to 0.1.4 ([@tchellomello] - [#7386])
- Updated docstrings ([@arsaboo] - [#7383]) ([camera.netatmo docs])
- Fix impulse events, added error event for Homegear ([@danielperna84] - [#7349]) ([homematic docs])
- Fix YAML dump ([@balloob] - [#7388])
- Migrate updater to aiohttp ([@balloob] - [#7387]) ([updater docs])
- Remove path whitelisting for hassio ([@balloob] - [#7399])
- Add Eight sleep component ([@mezz64] - [#7275]) ([eight_sleep docs]) ([binary_sensor.eight_sleep docs]) ([sensor.eight_sleep docs]) (new-platform)
- OpenGarage support ([@swbradshaw] - [#7338]) ([cover.opengarage docs]) (new-platform)
- Clean up requirements ([@andrey-git] - [#7391]) ([sensor.dht docs]) ([sensor.thinkingcleaner docs]) ([switch.thinkingcleaner docs])
- correct MQTT subscription filter ([@amigian74] - [#7269]) ([mqtt docs])
- Update docstrings ([@fabaff] - [#7374])
- light.blinkt: update brightness control logic ([@imrehg] - [#7389])
- Update docstrings ([@fabaff] - [#7405])
- Update LIFX default color for breathe/pulse effects ([@amelchio] - [#7407])
- LIFX: Add transition option to colorloop effect ([@amelchio] - [#7410])
- light.sensehat: brightness control logic update ([@imrehg] - [#7409]) ([light.sensehat docs])
- Add Sensibo climate platform ([@andrey-git] - [#7379]) ([climate docs]) (new-platform)
- Pilight binary sensor components ([@zeltom] - [#6774]) ([binary_sensor.pilight docs]) (new-platform)
- applx suggested fix from issue #6573 ([@wokar] - [#7390]) ([sensor.zamg docs])
- remove charset if set in content type header ([@hmn] - [#7411]) ([media_player docs])
- Convert automatic device tracker to push updates ([@armills] - [#7404]) (breaking change)
- light.piglow update ([@imrehg] - [#7408]) ([light.piglow docs])
- Opencv ([@Teagan42] - [#7261]) ([opencv docs]) ([image_processing.opencv docs]) (new-platform)
- Fixed extra R in variable name. ([@cyberplant] - [#7418])
- Update docstrings ([@fabaff] - [#7420])
- ps - fix opencv ([@balloob] - [#7419])
- Comment out opencv-python that is not installable on arm ([@andrey-git] - [#7426])
- Reverse limitlessled color_temp range ([@amelchio] - [#7359]) (breaking change)
- Guard against no content type ([@balloob] - [#7432]) ([media_player docs])
- wsock.send_json is a coroutine ([@balloob] - [#7433])
- ps - fix websocket yielding pt2 ([@balloob] - [#7434])
- Upgrade temperusb to 1.5.3 ([@fabaff] - [#7428])
- update for pypi ([@nkgilley] - [#7430])
- Add new sensor: Enviro pHAT ([@imrehg] - [#7427]) ([sensor.envirophat docs]) (new-platform)
- Added osramlightify groups. ([@deisi] - [#7376]) ([light.osramlightify docs])
- Add support for face recognition with dlib ([@pvizeli] - [#7421]) ([image_processing.dlib_face_detect docs]) ([image_processing.dlib_face_identify docs]) ([image_processing.microsoft_face_detect docs]) (new-platform)
- Replace pymailgun with pymailgunner ([@pschmitt] - [#7436]) ([notify.mailgun docs])
- Suppress logs when octorpint goes offline ([@w1ll1am23] - [#7441]) ([octoprint docs])
- Update join ([@nkgilley] - [#7443]) ([joaoapps_join docs]) ([notify.joaoapps_join docs]) (breaking change)
- Bump pyvera version - handle malformed json replies in poll thread. ([@pavoni] - [#7440]) ([vera docs])
- Fix for broken virtual keys ([@danielperna84] - [#7439]) ([homematic docs])
- Get new token to keep pubnub updates working ([@w1ll1am23] - [#7437]) ([wink docs])
- Add hass to rfxtrx object ([@danielhiversen] - [#6844])
- sensor.envirophat: add missing requirement ([@imrehg] - [#7451]) ([sensor.envirophat docs])

[#6263]: https://github.com/home-assistant/home-assistant/pull/6263
[#6562]: https://github.com/home-assistant/home-assistant/pull/6562
[#6774]: https://github.com/home-assistant/home-assistant/pull/6774
[#6844]: https://github.com/home-assistant/home-assistant/pull/6844
[#6982]: https://github.com/home-assistant/home-assistant/pull/6982
[#7032]: https://github.com/home-assistant/home-assistant/pull/7032
[#7107]: https://github.com/home-assistant/home-assistant/pull/7107
[#7122]: https://github.com/home-assistant/home-assistant/pull/7122
[#7131]: https://github.com/home-assistant/home-assistant/pull/7131
[#7145]: https://github.com/home-assistant/home-assistant/pull/7145
[#7160]: https://github.com/home-assistant/home-assistant/pull/7160
[#7162]: https://github.com/home-assistant/home-assistant/pull/7162
[#7182]: https://github.com/home-assistant/home-assistant/pull/7182
[#7191]: https://github.com/home-assistant/home-assistant/pull/7191
[#7199]: https://github.com/home-assistant/home-assistant/pull/7199
[#7200]: https://github.com/home-assistant/home-assistant/pull/7200
[#7201]: https://github.com/home-assistant/home-assistant/pull/7201
[#7202]: https://github.com/home-assistant/home-assistant/pull/7202
[#7204]: https://github.com/home-assistant/home-assistant/pull/7204
[#7206]: https://github.com/home-assistant/home-assistant/pull/7206
[#7208]: https://github.com/home-assistant/home-assistant/pull/7208
[#7211]: https://github.com/home-assistant/home-assistant/pull/7211
[#7212]: https://github.com/home-assistant/home-assistant/pull/7212
[#7213]: https://github.com/home-assistant/home-assistant/pull/7213
[#7214]: https://github.com/home-assistant/home-assistant/pull/7214
[#7215]: https://github.com/home-assistant/home-assistant/pull/7215
[#7216]: https://github.com/home-assistant/home-assistant/pull/7216
[#7217]: https://github.com/home-assistant/home-assistant/pull/7217
[#7220]: https://github.com/home-assistant/home-assistant/pull/7220
[#7221]: https://github.com/home-assistant/home-assistant/pull/7221
[#7226]: https://github.com/home-assistant/home-assistant/pull/7226
[#7227]: https://github.com/home-assistant/home-assistant/pull/7227
[#7231]: https://github.com/home-assistant/home-assistant/pull/7231
[#7233]: https://github.com/home-assistant/home-assistant/pull/7233
[#7234]: https://github.com/home-assistant/home-assistant/pull/7234
[#7235]: https://github.com/home-assistant/home-assistant/pull/7235
[#7236]: https://github.com/home-assistant/home-assistant/pull/7236
[#7243]: https://github.com/home-assistant/home-assistant/pull/7243
[#7245]: https://github.com/home-assistant/home-assistant/pull/7245
[#7248]: https://github.com/home-assistant/home-assistant/pull/7248
[#7249]: https://github.com/home-assistant/home-assistant/pull/7249
[#7250]: https://github.com/home-assistant/home-assistant/pull/7250
[#7251]: https://github.com/home-assistant/home-assistant/pull/7251
[#7253]: https://github.com/home-assistant/home-assistant/pull/7253
[#7254]: https://github.com/home-assistant/home-assistant/pull/7254
[#7256]: https://github.com/home-assistant/home-assistant/pull/7256
[#7261]: https://github.com/home-assistant/home-assistant/pull/7261
[#7263]: https://github.com/home-assistant/home-assistant/pull/7263
[#7264]: https://github.com/home-assistant/home-assistant/pull/7264
[#7266]: https://github.com/home-assistant/home-assistant/pull/7266
[#7267]: https://github.com/home-assistant/home-assistant/pull/7267
[#7269]: https://github.com/home-assistant/home-assistant/pull/7269
[#7271]: https://github.com/home-assistant/home-assistant/pull/7271
[#7272]: https://github.com/home-assistant/home-assistant/pull/7272
[#7273]: https://github.com/home-assistant/home-assistant/pull/7273
[#7275]: https://github.com/home-assistant/home-assistant/pull/7275
[#7278]: https://github.com/home-assistant/home-assistant/pull/7278
[#7279]: https://github.com/home-assistant/home-assistant/pull/7279
[#7281]: https://github.com/home-assistant/home-assistant/pull/7281
[#7282]: https://github.com/home-assistant/home-assistant/pull/7282
[#7287]: https://github.com/home-assistant/home-assistant/pull/7287
[#7290]: https://github.com/home-assistant/home-assistant/pull/7290
[#7291]: https://github.com/home-assistant/home-assistant/pull/7291
[#7300]: https://github.com/home-assistant/home-assistant/pull/7300
[#7302]: https://github.com/home-assistant/home-assistant/pull/7302
[#7303]: https://github.com/home-assistant/home-assistant/pull/7303
[#7310]: https://github.com/home-assistant/home-assistant/pull/7310
[#7311]: https://github.com/home-assistant/home-assistant/pull/7311
[#7315]: https://github.com/home-assistant/home-assistant/pull/7315
[#7316]: https://github.com/home-assistant/home-assistant/pull/7316
[#7319]: https://github.com/home-assistant/home-assistant/pull/7319
[#7320]: https://github.com/home-assistant/home-assistant/pull/7320
[#7323]: https://github.com/home-assistant/home-assistant/pull/7323
[#7324]: https://github.com/home-assistant/home-assistant/pull/7324
[#7325]: https://github.com/home-assistant/home-assistant/pull/7325
[#7329]: https://github.com/home-assistant/home-assistant/pull/7329
[#7336]: https://github.com/home-assistant/home-assistant/pull/7336
[#7337]: https://github.com/home-assistant/home-assistant/pull/7337
[#7338]: https://github.com/home-assistant/home-assistant/pull/7338
[#7339]: https://github.com/home-assistant/home-assistant/pull/7339
[#7340]: https://github.com/home-assistant/home-assistant/pull/7340
[#7341]: https://github.com/home-assistant/home-assistant/pull/7341
[#7343]: https://github.com/home-assistant/home-assistant/pull/7343
[#7349]: https://github.com/home-assistant/home-assistant/pull/7349
[#7350]: https://github.com/home-assistant/home-assistant/pull/7350
[#7352]: https://github.com/home-assistant/home-assistant/pull/7352
[#7354]: https://github.com/home-assistant/home-assistant/pull/7354
[#7355]: https://github.com/home-assistant/home-assistant/pull/7355
[#7356]: https://github.com/home-assistant/home-assistant/pull/7356
[#7359]: https://github.com/home-assistant/home-assistant/pull/7359
[#7361]: https://github.com/home-assistant/home-assistant/pull/7361
[#7363]: https://github.com/home-assistant/home-assistant/pull/7363
[#7364]: https://github.com/home-assistant/home-assistant/pull/7364
[#7365]: https://github.com/home-assistant/home-assistant/pull/7365
[#7366]: https://github.com/home-assistant/home-assistant/pull/7366
[#7370]: https://github.com/home-assistant/home-assistant/pull/7370
[#7371]: https://github.com/home-assistant/home-assistant/pull/7371
[#7374]: https://github.com/home-assistant/home-assistant/pull/7374
[#7375]: https://github.com/home-assistant/home-assistant/pull/7375
[#7376]: https://github.com/home-assistant/home-assistant/pull/7376
[#7377]: https://github.com/home-assistant/home-assistant/pull/7377
[#7379]: https://github.com/home-assistant/home-assistant/pull/7379
[#7383]: https://github.com/home-assistant/home-assistant/pull/7383
[#7386]: https://github.com/home-assistant/home-assistant/pull/7386
[#7387]: https://github.com/home-assistant/home-assistant/pull/7387
[#7388]: https://github.com/home-assistant/home-assistant/pull/7388
[#7389]: https://github.com/home-assistant/home-assistant/pull/7389
[#7390]: https://github.com/home-assistant/home-assistant/pull/7390
[#7391]: https://github.com/home-assistant/home-assistant/pull/7391
[#7399]: https://github.com/home-assistant/home-assistant/pull/7399
[#7404]: https://github.com/home-assistant/home-assistant/pull/7404
[#7405]: https://github.com/home-assistant/home-assistant/pull/7405
[#7407]: https://github.com/home-assistant/home-assistant/pull/7407
[#7408]: https://github.com/home-assistant/home-assistant/pull/7408
[#7409]: https://github.com/home-assistant/home-assistant/pull/7409
[#7410]: https://github.com/home-assistant/home-assistant/pull/7410
[#7411]: https://github.com/home-assistant/home-assistant/pull/7411
[#7418]: https://github.com/home-assistant/home-assistant/pull/7418
[#7419]: https://github.com/home-assistant/home-assistant/pull/7419
[#7420]: https://github.com/home-assistant/home-assistant/pull/7420
[#7421]: https://github.com/home-assistant/home-assistant/pull/7421
[#7426]: https://github.com/home-assistant/home-assistant/pull/7426
[#7427]: https://github.com/home-assistant/home-assistant/pull/7427
[#7428]: https://github.com/home-assistant/home-assistant/pull/7428
[#7430]: https://github.com/home-assistant/home-assistant/pull/7430
[#7432]: https://github.com/home-assistant/home-assistant/pull/7432
[#7433]: https://github.com/home-assistant/home-assistant/pull/7433
[#7434]: https://github.com/home-assistant/home-assistant/pull/7434
[#7436]: https://github.com/home-assistant/home-assistant/pull/7436
[#7437]: https://github.com/home-assistant/home-assistant/pull/7437
[#7439]: https://github.com/home-assistant/home-assistant/pull/7439
[#7440]: https://github.com/home-assistant/home-assistant/pull/7440
[#7441]: https://github.com/home-assistant/home-assistant/pull/7441
[#7443]: https://github.com/home-assistant/home-assistant/pull/7443
[#7451]: https://github.com/home-assistant/home-assistant/pull/7451
[@Cadair]: https://github.com/Cadair
[@ChristianKuehnel]: https://github.com/ChristianKuehnel
[@JasonCarter80]: https://github.com/JasonCarter80
[@JshWright]: https://github.com/JshWright
[@KlaasH]: https://github.com/KlaasH
[@LvivEchoes]: https://github.com/LvivEchoes
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@Teagan42]: https://github.com/Teagan42
[@abmantis]: https://github.com/abmantis
[@alanfischer]: https://github.com/alanfischer
[@amelchio]: https://github.com/amelchio
[@amigian74]: https://github.com/amigian74
[@andrey-git]: https://github.com/andrey-git
[@armills]: https://github.com/armills
[@arsaboo]: https://github.com/arsaboo
[@bah2830]: https://github.com/bah2830
[@balloob]: https://github.com/balloob
[@biacz]: https://github.com/biacz
[@craftyguy]: https://github.com/craftyguy
[@cribbstechnologies]: https://github.com/cribbstechnologies
[@cyberjunky]: https://github.com/cyberjunky
[@cyberplant]: https://github.com/cyberplant
[@danielhiversen]: https://github.com/danielhiversen
[@danielperna84]: https://github.com/danielperna84
[@darookee]: https://github.com/darookee
[@deisi]: https://github.com/deisi
[@drkp]: https://github.com/drkp
[@fabaff]: https://github.com/fabaff
[@fabfurnari]: https://github.com/fabfurnari
[@hmn]: https://github.com/hmn
[@imrehg]: https://github.com/imrehg
[@janLo]: https://github.com/janLo
[@jotunacorn]: https://github.com/jotunacorn
[@keatontaylor]: https://github.com/keatontaylor
[@mezz64]: https://github.com/mezz64
[@micw]: https://github.com/micw
[@mjg59]: https://github.com/mjg59
[@nkgilley]: https://github.com/nkgilley
[@onsmam]: https://github.com/onsmam
[@patrickeasters]: https://github.com/patrickeasters
[@pavoni]: https://github.com/pavoni
[@postlund]: https://github.com/postlund
[@pschmitt]: https://github.com/pschmitt
[@pvizeli]: https://github.com/pvizeli
[@rcloran]: https://github.com/rcloran
[@robbiet480]: https://github.com/robbiet480
[@scarface-4711]: https://github.com/scarface-4711
[@sdague]: https://github.com/sdague
[@swbradshaw]: https://github.com/swbradshaw
[@tchellomello]: https://github.com/tchellomello
[@titilambert]: https://github.com/titilambert
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23
[@wokar]: https://github.com/wokar
[@wuub]: https://github.com/wuub
[@zeltom]: https://github.com/zeltom
[binary_sensor.alarmdecoder docs]: /integrations/alarmdecoder
[binary_sensor.eight_sleep docs]: /integrations/eight_sleep
[binary_sensor.maxcube docs]: /integrations/maxcube
[binary_sensor.octoprint docs]: /integrations/octoprint#binary-sensor
[binary_sensor.pilight docs]: /integrations/pilight#binary-sensor
[binary_sensor.ping docs]: /integrations/ping#binary-sensor
[binary_sensor.workday docs]: /integrations/workday
[binary_sensor.zha docs]: /integrations/zha
[camera.netatmo docs]: /integrations/netatmo#camera
[climate docs]: /integrations/climate/
[climate.ecobee docs]: /integrations/ecobee
[climate.maxcube docs]: /integrations/maxcube
[climate.zwave docs]: /integrations/zwave#climate
[cover.garadget docs]: /integrations/garadget
[cover.opengarage docs]: /integrations/opengarage
[cover.zwave docs]: /integrations/zwave#cover
[device_tracker.zha docs]: /integrations/device_tracker.zha/
[ecobee docs]: /integrations/ecobee/
[eight_sleep docs]: /integrations/eight_sleep/
[enocean docs]: /integrations/enocean/
[homematic docs]: /integrations/homematic/
[image_processing.dlib_face_detect docs]: /integrations/dlib_face_detect
[image_processing.dlib_face_identify docs]: /integrations/dlib_face_identify
[image_processing.microsoft_face_detect docs]: /integrations/microsoft_face_detect
[image_processing.opencv docs]: /integrations/opencv
[joaoapps_join docs]: /integrations/joaoapps_join/
[light docs]: /integrations/light/
[light.avion docs]: /integrations/avion
[light.blinkt docs]: /integrations/blinkt
[light.decora docs]: /integrations/decora
[light.flux_led docs]: /integrations/flux_led
[light.hue docs]: /integrations/hue
[light.lifx docs]: /integrations/lifx
[light.osramlightify docs]: /integrations/osramlightify
[light.piglow docs]: /integrations/piglow
[light.sensehat docs]: /integrations/sensehat#light
[light.tradfri docs]: /integrations/tradfri
[light.zha docs]: /integrations/zha
[light.zwave docs]: /integrations/zwave
[maxcube docs]: /integrations/maxcube/
[media_player docs]: /integrations/media_player/
[media_player.spotify docs]: /integrations/spotify
[media_player.webostv docs]: /integrations/webostv#media-player
[mqtt docs]: /integrations/mqtt/
[notify.html5 docs]: /integrations/html5
[notify.joaoapps_join docs]: /integrations/joaoapps_join
[notify.mailgun docs]: /integrations/mailgun
[notify.matrix docs]: /integrations/matrix/#notifications
[notify.smtp docs]: /integrations/smtp
[notify.telegram docs]: /integrations/telegram
[notify.webostv docs]: /integrations/webostv
[octoprint docs]: /integrations/octoprint/
[opencv docs]: /integrations/opencv/
[plant docs]: /integrations/plant/
[recorder docs]: /integrations/recorder/
[rfxtrx docs]: /integrations/rfxtrx/
[rss_feed_template docs]: /integrations/rss_feed_template/
[sensor.cert_expiry docs]: /integrations/cert_expiry
[sensor.dht docs]: /integrations/dht
[sensor.eight_sleep docs]: /integrations/eight_sleep
[sensor.envirophat docs]: /integrations/envirophat
[sensor.ios docs]: /integrations/sensor.ios/
[sensor.lyft docs]: /integrations/lyft
[sensor.pushbullet docs]: /integrations/pushbullet#sensor
[sensor.speedtest docs]: /integrations/speedtestdotnet
[sensor.thinkingcleaner docs]: /integrations/thinkingcleaner#sensor
[sensor.vera docs]: /integrations/vera#sensor
[sensor.zamg docs]: /integrations/zamg#sensor
[sensor.zha docs]: /integrations/zha
[switch.flux docs]: /integrations/flux
[switch.thinkingcleaner docs]: /integrations/thinkingcleaner#switch
[switch.wemo docs]: /integrations/wemo
[switch.zha docs]: /integrations/zha
[telegram_bot docs]: /integrations/telegram_bot/
[telegram_bot.polling docs]: /integrations/telegram_polling
[telegram_bot.webhooks docs]: /integrations/telegram_webhooks
[updater docs]: /integrations/updater/
[vera docs]: /integrations/vera/
[wemo docs]: /integrations/wemo/
[wink docs]: /integrations/wink/
[zha docs]: /integrations/zha/
[forum]: https://community.home-assistant.io/
[issue]: https://github.com/home-assistant/home-assistant/issues
[#7062]: https://github.com/home-assistant/home-assistant/pull/7062
[#7468]: https://github.com/home-assistant/home-assistant/pull/7468
[#7469]: https://github.com/home-assistant/home-assistant/pull/7469
[#7476]: https://github.com/home-assistant/home-assistant/pull/7476
[@finish06]: https://github.com/finish06
[@frog32]: https://github.com/frog32
[@pezinek]: https://github.com/pezinek
[device_tracker.unifi docs]: /integrations/unifi
[sensor.wunderground docs]: /integrations/wunderground
[discord]: https://discord.gg/c5DvZ4e
