---
title: "Home Assistant 0.41: Tado, Volumio, Workday, improved Plex"
description: "Improved Pley media player, filtering components overview, Tado and Volumio platform"
date: 2017-03-25 08:04:05 +0000
date_formatted: "March 25, 2017"
author: Fabian Affolter
author_twitter: fabaff
categories:
- Release-Notes
- Core
og_image: /images/blog/2017-03-0.41/social.png
---

Welcome to 0.41. There was a lot going on in the last two weeks. Not only from the code side but also from the social one of Home Assistant. [Paulus][@balloob] did an [interview] with [OpenSourceCraft], [Fabian][@fabaff] did a [workshop] at the [Chemnitzer Linux Tage][clt], and we are now an award-winning Open source project (I will cover that in a separate blog post).

## Plex
[@JesseWebDotCom] made massive changes to the [Plex][plex] media player platform. From better metadata support over new configuration options to improved controls and non-controllable clients.

## Component overview
The [Components][components] overview is now powered by search/filtering feature. This will make it faster to get the component/platform you are looking for more quickly. Thanks again, [@bdurrer] for this.

## Changelog
The new format of the changelog which was introduced with 0.40 will provide a link to the related pull request. We are not covering everything in our release notes but we think that this addition will make it easier to find details about the change.

## New platforms/components

- Support for [Tado][tado] climate devices ([@wmalgadey])
- [Volumio][volumio] media player added ([@jslove])
- [Workday][workday] sensor ([@BastianPoe])

## Backward-incompatible changes

- The [Kodi notifier][kodi] platform was migrated to async and the configuration synced with the Kodi media player platform ([#6497]).
- For the [Music Player Daemon][mpd] (MPD) platform was `location` replaced with `name` ([#6553]).
- Event decorators were removed ([#6634]).
- The [Emby mediaplayer][emby] platform was changed to avoid name clashes ([#6664]).
- In a lot of places were the power and energy units update. This change mostly affects the `switch` platforms ([#6212]).
- If set to `auto` then the [MQTT][mqtt] implementation will use the bundled certificates automatically ([#6707]).
- Autodiscovery of [Android IP Webcam][android] was removed ([#6528]).
- The frontend is now using [Shadow DOM][shadow] and this could break your custom panels ([#228](https://github.com/home-assistant/home-assistant-polymer/issues/228)).

## If you need help...
...don't hesitate to use our very active [forums][forum] or join us for a little [chat][discord]. The release notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

## Reporting Issues
Experiencing issues introduced by this release? Please report them in our [issue tracker][issue]. Make sure to fill in all fields of the issue template.

<!--more-->
## All changes

- Bugfix android camera autodiscovery settings ([@pvizeli] - [#6510])
- Insteon lib ([@craigjmidwinter] - [#6505])
- Update to Pyunifi2.0 ([@finish06] - [#6490])
- Insteon lib ([@craigjmidwinter] - [#6505])
- Don't allow sending to invalid iOS targets ([@robbiet480] - [#6115])
- Bugfix rpi_rf cleanup ([@pvizeli] - [#6513])
- Include LICENSE.md in tarball ([@bachp] - [#6514])
- Android webcam better error handling / pump library 0.4 ([@pvizeli] - [#6518])
- Fix mysensors gateway windows setup ([@MartinHjelmare] - [#6500])
- Update frontend ([@balloob])
- Remove mint finance sensor ([@balloob] - [#6522])
- Append vera device id to entity id - but not name. ([@pavoni] - [#6523])
- Force update support for MQTT sensor ([@vrnagy] - [#6492])
- Wink scene(shortcut) support ([@w1ll1am23] - [#6147])
- Add type configuration in history_stats ([@bokub] - [#6430])
- Discovery is a dict rather than an array. ([@pavoni] - [#6525])
- Fix colortemp conversion for osramlightify ([@amelchio] - [#6516])
- Update Kodi notifier to async ([@armills] - [#6497]) (Breaking Change)
- Fix mysensors gateway windows setup ([@MartinHjelmare] - [#6500])
- Fix colortemp conversion for osramlightify ([@amelchio] - [#6516])
- Remove mint finance sensor ([@balloob] - [#6522])
- Append vera device id to entity id - but not name. ([@pavoni] - [#6523])
- Discovery is a dict rather than an array. ([@pavoni] - [#6525])
- Version bump to 0.41.0.dev0 ([@lwis])
- Simplify Android IP webcam discovery ([@balloob] - [#6528])
- Fix gen_requirements_all.py script for Windows. ([@siebert] - [#6547])
- Fix wake_on_lan ping with None as host ([@iamtpage] - [#6532])
- Be able to select mqtt:tls_version for Python ([@dennisdegreef] - [#6442])
- ZWave binary sensor tests ([@armills] - [#6555])
- Refactor zwave discovery to entity schema ([@armills] - [#6445])
- Revert "Refactor zwave discovery to entity schema (#6445)" ([@balloob] - [#6564])
- Upgraded blinkpy version, increased Throttle time for camera ([@fronzbot] - [#6561])
- Don't start the push updater if the Apple TV is 'off' ([@jnewland] - [#6552])
- Bump voc version (fixes heater bug) ([@molobrakos])
- Remove dispatcher camera ([@pvizeli] - [#6579])
- Fix for the case of zwave value used in several devices. ([@andrey-git] - [#6577])
- Fix hydroquebec ([@titilambert] - [#6574])
- Upgrade async_timeout to 1.2.0 ([@fabaff] - [#6590])
- Upgrade pyasn1 to 0.2.3 ([@fabaff] - [#6588])
- Upgrade sqlalchemy to 1.1.6 ([@fabaff] - [#6591])
- Upgrade psutil to 5.2.0 ([@fabaff] - [#6585])
- Upgrade Sphinx to 1.5.3 ([@fabaff] - [#6587])
- Update pyecobee version to 0.0.7 ([@dale3h] - [#6593])
- Update SMA solar sensor to work with the new add_devices callback ([@kellerza] - [#6602])
- Fix link ([@fabaff] - [#6612])
- Upgrade py-cpuinfo to 0.2.7 ([@fabaff] - [#6610])
- Upgrade googlemaps to 2.4.6 ([@fabaff] - [#6611])
- Error handling when connection refused ([@molobrakos] - [#6614])
- Prevent entities running multiple updates simultaneously ([@pvizeli] - [#6511])
- Add configurable timeout option to notify/smtp ([@hawk259] - [#6609])
- Define db for SHOW DIAGNOSTICS query since some users will not have a… ([@tflack] - [#6566])
- Cover myq fix update pymyq ([@arraylabs] - [#6595])
- Update mpd.py ([@yeralin] - [#6553]) (Breaking Change)
- Upgrade to dsmr_parser 0.8, supporting protocol 3 and 5. ([@aequitas] - [#6600])
- Add "Refactor zwave discovery to entity schema" ([@balloob] - [#6565])
- Tests for ZWave climate ([@armills] - [#6629])
- Correctly flag Kodi media types ([@armills] - [#6628])
- Use sqlite's WAL mode to avoid `database is locked` errors ([@n8henrie] - [#6519])
- Remove event decorators ([@balloob] - [#6634]) (Breaking Change)
- Deprecate event forwarding ([@balloob])
- Upgrade aiohttp to 1.3.4 ([@pvizeli] - [#6643])
- Kodi extra attributes for tvshow and music media ([@mvillarejo] - [#6622])
- Add ZWave cover tests ([@armills] - [#6648])
- Kodi: Fix episode media type classification ([@armills] - [#6645])
- Move LIFX to aiolifx for driving the bulbs ([@amelchio] - [#6584])
- Fix #6534 ([@deisi] - [#6598])
- self.loop.create_task -> self.add_job ([@balloob] - [#6632])
- Bugfix RFLINK remove group ([@pvizeli] - [#6580])
- Version bump to 0.40.1 ([@balloob])
- Fix wake_on_lan ping with None as host ([@iamtpage] - [#6532])
- Don't start the push updater if the Apple TV is 'off' ([@jnewland] - [#6552])
- Fix for the case of zwave value used in several devices. ([@andrey-git] - [#6577])
- Fix hydroquebec ([@titilambert] - [#6574])
- Update pyecobee version to 0.0.7 ([@dale3h] - [#6593])
- Update SMA solar sensor to work with the new add_devices callback ([@kellerza] - [#6602])
- Since knx_2_float can't handle 0, bypass converting 0 value from knx to float ([@goofz] - [#6626])
- Bugfix RFLINK remove group ([@pvizeli] - [#6580])
- Added workday sensor ([@BastianPoe] - [#6599])
- Add test for Z-wave switch ([@turbokongen] - [#6619])
- Upgrade python-digitalocean to 1.11 ([@fabaff] - [#6653])
- Add Zwave sensors test ([@turbokongen] - [#6640])
- round output values ([@joe248] - [#6657])
- Support for non-clients, NVidia shield, dynamic grouping, extra metad ([@JesseWebDotCom] - [#6054])
- Upgrade astral to 1.4 ([@fabaff] - [#6332])
- Upgrade aiohttp to 1.3.5 ([@fabaff] - [#6660])
- Check if droplet exists ([@fabaff] - [#6663])
- Corrected help text for refresh_node ([@sebk-666] - [#6659])
- Add configurable timeout option to camera.synology ([@hawk259] - [#6655])
- Pump Android ip webcam to 0.6 ([@pvizeli] - [#6665])
- add latitude and longitude configuration to darksky sensor ([@RickyTaterSalad] - [#6191])
- Refactor Neurio to add Daily Power Sensor ([@mezz64] - [#6662])
- Added support for multiple efergy sensors in the same household. ([@miniconfig] - [#6630])
- Add new media_player platform: Volumio Media Player ([@jslove] - [#6556])
- Phone book lookup support for Fritz!Box call monitor ([@DavidMStraub] - [#6474])
- Update Emby component to async ([@mezz64] - [#6664])
- Fix hass script execution on Windows (#4977). ([@matrixx567] - [#6601])
- Fixed Show All Controls feature ([@JesseWebDotCom])
- Update Torque component to match recent API. ([@tylercrumpton] - [#6671])
- Rflink: added support for lights with toggle type ([@martinfrancois] - [#6521])
- Upgrade distro to 1.0.3 ([@fabaff] - [#6693])
- Fix longitude ([@mezz64] - [#6697])
- Bump PyChromecast to 0.8.1 ([@balloob] - [#6702])
- Kodi use websocket loop task created by library ([@armills] - [#6703])
- Fix Kodi when websocket is disabled ([@armills] - [#6706])
- Revise power and energy units and property names. ([@pavoni] - [#6212]) (Breaking Change)
- automatically use bundled certificate it set to auto ([@printzlau] - [#6707]) (Breaking Change)
- Update frontend ([@balloob])
- Add zwave light tests ([@armills] - [#6710])
- restore_state: do not crash if domain not defined ([@balloob] - [#6714])
- Fix for issue: luci returns 403 invalid token when rebooted #6715 ([@fbradyirl] - [#6717])
- Don't warn if octoprint completion is null ([@jawilson] - [#6719])
- ZWave Sensor tests ([@armills] - [#6721])
- ZWave switch tests ([@armills] - [#6722])
- Update frontend ([@balloob])
- Fix LIFX unregister races ([@amelchio] - [#6723])
- Do not log warning on rest_command if no error ([@balloob] - [#6713])
- camera.zoneminder: Show recording state ([@mnoorenberghe] - [#6686])
- ZWave Lock Tests ([@armills] - [#6730])
- Tado climate device ([@wmalgadey] - [#6572])
- Version bump to 0.40.2 ([@balloob])
- Bump PyChromecast to 0.8.1 ([@balloob] - [#6702])
- Constrain core dependencies to core versions ([@balloob] - [#6738])
- Update constraints ([@balloob])
- Adds Support for Lutron Caseta devices. ([@gurumitts] - [#6631])
- Add sensor for Lyft time and price (based on Uber sensor) ([@drkp] - [#6711])
- Add zwave per-node entity. ([@andrey-git] - [#6690])
- Version bump to 0.41 ([@balloob])

[#6054]: https://github.com/home-assistant/home-assistant/pull/6054
[#6115]: https://github.com/home-assistant/home-assistant/pull/6115
[#6147]: https://github.com/home-assistant/home-assistant/pull/6147
[#6191]: https://github.com/home-assistant/home-assistant/pull/6191
[#6212]: https://github.com/home-assistant/home-assistant/pull/6212
[#6332]: https://github.com/home-assistant/home-assistant/pull/6332
[#6430]: https://github.com/home-assistant/home-assistant/pull/6430
[#6442]: https://github.com/home-assistant/home-assistant/pull/6442
[#6445]: https://github.com/home-assistant/home-assistant/pull/6445
[#6474]: https://github.com/home-assistant/home-assistant/pull/6474
[#6490]: https://github.com/home-assistant/home-assistant/pull/6490
[#6492]: https://github.com/home-assistant/home-assistant/pull/6492
[#6497]: https://github.com/home-assistant/home-assistant/pull/6497
[#6500]: https://github.com/home-assistant/home-assistant/pull/6500
[#6505]: https://github.com/home-assistant/home-assistant/pull/6505
[#6510]: https://github.com/home-assistant/home-assistant/pull/6510
[#6511]: https://github.com/home-assistant/home-assistant/pull/6511
[#6513]: https://github.com/home-assistant/home-assistant/pull/6513
[#6514]: https://github.com/home-assistant/home-assistant/pull/6514
[#6516]: https://github.com/home-assistant/home-assistant/pull/6516
[#6518]: https://github.com/home-assistant/home-assistant/pull/6518
[#6519]: https://github.com/home-assistant/home-assistant/pull/6519
[#6521]: https://github.com/home-assistant/home-assistant/pull/6521
[#6522]: https://github.com/home-assistant/home-assistant/pull/6522
[#6523]: https://github.com/home-assistant/home-assistant/pull/6523
[#6525]: https://github.com/home-assistant/home-assistant/pull/6525
[#6528]: https://github.com/home-assistant/home-assistant/pull/6528
[#6532]: https://github.com/home-assistant/home-assistant/pull/6532
[#6547]: https://github.com/home-assistant/home-assistant/pull/6547
[#6552]: https://github.com/home-assistant/home-assistant/pull/6552
[#6553]: https://github.com/home-assistant/home-assistant/pull/6553
[#6555]: https://github.com/home-assistant/home-assistant/pull/6555
[#6556]: https://github.com/home-assistant/home-assistant/pull/6556
[#6561]: https://github.com/home-assistant/home-assistant/pull/6561
[#6564]: https://github.com/home-assistant/home-assistant/pull/6564
[#6565]: https://github.com/home-assistant/home-assistant/pull/6565
[#6566]: https://github.com/home-assistant/home-assistant/pull/6566
[#6572]: https://github.com/home-assistant/home-assistant/pull/6572
[#6574]: https://github.com/home-assistant/home-assistant/pull/6574
[#6577]: https://github.com/home-assistant/home-assistant/pull/6577
[#6579]: https://github.com/home-assistant/home-assistant/pull/6579
[#6580]: https://github.com/home-assistant/home-assistant/pull/6580
[#6584]: https://github.com/home-assistant/home-assistant/pull/6584
[#6585]: https://github.com/home-assistant/home-assistant/pull/6585
[#6587]: https://github.com/home-assistant/home-assistant/pull/6587
[#6588]: https://github.com/home-assistant/home-assistant/pull/6588
[#6590]: https://github.com/home-assistant/home-assistant/pull/6590
[#6591]: https://github.com/home-assistant/home-assistant/pull/6591
[#6593]: https://github.com/home-assistant/home-assistant/pull/6593
[#6595]: https://github.com/home-assistant/home-assistant/pull/6595
[#6598]: https://github.com/home-assistant/home-assistant/pull/6598
[#6599]: https://github.com/home-assistant/home-assistant/pull/6599
[#6600]: https://github.com/home-assistant/home-assistant/pull/6600
[#6601]: https://github.com/home-assistant/home-assistant/pull/6601
[#6602]: https://github.com/home-assistant/home-assistant/pull/6602
[#6609]: https://github.com/home-assistant/home-assistant/pull/6609
[#6610]: https://github.com/home-assistant/home-assistant/pull/6610
[#6611]: https://github.com/home-assistant/home-assistant/pull/6611
[#6612]: https://github.com/home-assistant/home-assistant/pull/6612
[#6614]: https://github.com/home-assistant/home-assistant/pull/6614
[#6619]: https://github.com/home-assistant/home-assistant/pull/6619
[#6622]: https://github.com/home-assistant/home-assistant/pull/6622
[#6626]: https://github.com/home-assistant/home-assistant/pull/6626
[#6628]: https://github.com/home-assistant/home-assistant/pull/6628
[#6629]: https://github.com/home-assistant/home-assistant/pull/6629
[#6630]: https://github.com/home-assistant/home-assistant/pull/6630
[#6631]: https://github.com/home-assistant/home-assistant/pull/6631
[#6632]: https://github.com/home-assistant/home-assistant/pull/6632
[#6634]: https://github.com/home-assistant/home-assistant/pull/6634
[#6640]: https://github.com/home-assistant/home-assistant/pull/6640
[#6643]: https://github.com/home-assistant/home-assistant/pull/6643
[#6645]: https://github.com/home-assistant/home-assistant/pull/6645
[#6648]: https://github.com/home-assistant/home-assistant/pull/6648
[#6653]: https://github.com/home-assistant/home-assistant/pull/6653
[#6655]: https://github.com/home-assistant/home-assistant/pull/6655
[#6657]: https://github.com/home-assistant/home-assistant/pull/6657
[#6659]: https://github.com/home-assistant/home-assistant/pull/6659
[#6660]: https://github.com/home-assistant/home-assistant/pull/6660
[#6662]: https://github.com/home-assistant/home-assistant/pull/6662
[#6663]: https://github.com/home-assistant/home-assistant/pull/6663
[#6664]: https://github.com/home-assistant/home-assistant/pull/6664
[#6665]: https://github.com/home-assistant/home-assistant/pull/6665
[#6671]: https://github.com/home-assistant/home-assistant/pull/6671
[#6686]: https://github.com/home-assistant/home-assistant/pull/6686
[#6690]: https://github.com/home-assistant/home-assistant/pull/6690
[#6693]: https://github.com/home-assistant/home-assistant/pull/6693
[#6697]: https://github.com/home-assistant/home-assistant/pull/6697
[#6702]: https://github.com/home-assistant/home-assistant/pull/6702
[#6703]: https://github.com/home-assistant/home-assistant/pull/6703
[#6706]: https://github.com/home-assistant/home-assistant/pull/6706
[#6707]: https://github.com/home-assistant/home-assistant/pull/6707
[#6710]: https://github.com/home-assistant/home-assistant/pull/6710
[#6711]: https://github.com/home-assistant/home-assistant/pull/6711
[#6713]: https://github.com/home-assistant/home-assistant/pull/6713
[#6714]: https://github.com/home-assistant/home-assistant/pull/6714
[#6717]: https://github.com/home-assistant/home-assistant/pull/6717
[#6719]: https://github.com/home-assistant/home-assistant/pull/6719
[#6721]: https://github.com/home-assistant/home-assistant/pull/6721
[#6722]: https://github.com/home-assistant/home-assistant/pull/6722
[#6723]: https://github.com/home-assistant/home-assistant/pull/6723
[#6730]: https://github.com/home-assistant/home-assistant/pull/6730
[#6738]: https://github.com/home-assistant/home-assistant/pull/6738
[#6664]: https://github.com/home-assistant/home-assistant/pull/6664
[@BastianPoe]: https://github.com/BastianPoe
[@DavidMStraub]: https://github.com/DavidMStraub
[@JesseWebDotCom]: https://github.com/JesseWebDotCom
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@RickyTaterSalad]: https://github.com/RickyTaterSalad
[@aequitas]: https://github.com/aequitas
[@amelchio]: https://github.com/amelchio
[@andrey-git]: https://github.com/andrey-git
[@armills]: https://github.com/armills
[@arraylabs]: https://github.com/arraylabs
[@bachp]: https://github.com/bachp
[@balloob]: https://github.com/balloob
[@bokub]: https://github.com/bokub
[@dale3h]: https://github.com/dale3h
[@deisi]: https://github.com/deisi
[@dennisdegreef]: https://github.com/dennisdegreef
[@drkp]: https://github.com/drkp
[@fabaff]: https://github.com/fabaff
[@fbradyirl]: https://github.com/fbradyirl
[@finish06]: https://github.com/finish06
[@fronzbot]: https://github.com/fronzbot
[@goofz]: https://github.com/goofz
[@gurumitts]: https://github.com/gurumitts
[@hawk259]: https://github.com/hawk259
[@iamtpage]: https://github.com/iamtpage
[@jawilson]: https://github.com/jawilson
[@jnewland]: https://github.com/jnewland
[@joe248]: https://github.com/joe248
[@jslove]: https://github.com/jslove
[@kellerza]: https://github.com/kellerza
[@lwis]: https://github.com/lwis
[@martinfrancois]: https://github.com/martinfrancois
[@matrixx567]: https://github.com/matrixx567
[@mezz64]: https://github.com/mezz64
[@miniconfig]: https://github.com/miniconfig
[@mnoorenberghe]: https://github.com/mnoorenberghe
[@molobrakos]: https://github.com/molobrakos
[@mvillarejo]: https://github.com/mvillarejo
[@n8henrie]: https://github.com/n8henrie
[@pavoni]: https://github.com/pavoni
[@printzlau]: https://github.com/printzlau
[@pvizeli]: https://github.com/pvizeli
[@robbiet480]: https://github.com/robbiet480
[@sebk-666]: https://github.com/sebk-666
[@siebert]: https://github.com/siebert
[@tflack]: https://github.com/tflack
[@titilambert]: https://github.com/titilambert
[@turbokongen]: https://github.com/turbokongen
[@tylercrumpton]: https://github.com/tylercrumpton
[@vrnagy]: https://github.com/vrnagy
[@w1ll1am23]: https://github.com/w1ll1am23
[@craigjmidwinter]: https://github.com/craigjmidwinter
[@wmalgadey]: https://github.com/wmalgadey
[@yeralin]: https://github.com/yeralin

[components]: /integrations/
[kodi]: /integrations/kodi
[mpd]: /integrations/mpd
[emby]: /integrations/emby
[mqtt]: /docs/mqtt/
[plex]: /integrations/plex#media-player
[tado]: /integrations/tado
[volumio]: /integrations/volumio/
[workday]: /integrations/workday
[android]: /integrations/android_ip_webcam/
[shadow]: https://www.w3.org/TR/shadow-dom/

[forum]: https://community.home-assistant.io/
[issue]: https://github.com/home-assistant/home-assistant/issues
[discord]: https://discord.gg/c5DvZ4e

[@bdurrer]: https://github.com/bdurrer
[interview]: /blog/2017/03/23/opensourcecraft-interview-with-founder-paulus-schoutsen/
[OpenSourceCraft]: http://codepop.com/open-sourcecraft
[clt]: https://chemnitzer.linux-tage.de/2017/en/
[workshop]: https://github.com/home-assistant/home-assistant-assets/tree/master/german/2017-clt-workshop
