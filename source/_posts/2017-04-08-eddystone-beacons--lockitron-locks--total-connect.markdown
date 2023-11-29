---
title: "Home Assistant 0.42: Eddystone Beacons, Lockitron locks and Total Connect alarm systems"
description: "Tons of bug fixes, performance increasements and some cool new integrations."
date: 2017-04-08 08:04:05 +0000
date_formatted: "April 8, 2017"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
og_image: /images/blog/2017-04-0.42/social.png
---

<a href='/integrations/#added_in_current_version'><img src='/images/blog/2017-04-0.42/social.png' style='border: 0;box-shadow: none;'></a>

It's time for Home Assistant 0.42. This release has been focused on refining the system and fixing a lot of bugs. We have also upgraded to the latest version of our HTTP library which should give us a significant boost serving files and API.

On our social media front, we have crossed the 1000 likes on [our Facebook page][hass-fb]! Also on the social media front, the YouTube channel diyAutomate has been putting out a lot of great getting started videos about Home Assistant, [go check them out!][diyAutomate]

Also want to take a moment to thank Austin Andrews aka [Templarian] for his [Material Design Icons][mli]. He is part of what makes Home Assistant so beautiful 🤗.

[hass-fb]: https://www.facebook.com/homeassistantio
[diyAutomate]: https://www.youtube.com/c/diyautomate
[mli]: https://pictogrammers.com/library/mdi/
[Templarian]: https://github.com/templarian

## New integrations

- Lockitron locks ([@aarya123] - [#6805])
- Met Office weather and sensor components ([@jacobtomlinson] - [#6742])
- Total Connect alarm systems ([@craigjmidwinter] - [#6887])
- Eddystone Beacon Temperature Sensor ([@citruz] - [#6789])
- CrimeReports.com integration shows crimes around a location in the US ([@happyleavesaoc] - [#6966])
- The Ring doorbell has been integrated further with the inclusion of binary sensors ([@tchellomello] - [#6520])

<!--more-->
## Backward-incompatible changes

- We were incorrectly treating groups named `default_view` as default views. Make sure you set `view: true` in the config for these groups. [#251 (frontend)](https://github.com/home-assistant/home-assistant-polymer/pull/251)
- The last release introduced a revamped LIFX platform. We only realized after deploy that this version does not work on Windows. We have added the old LIFX implementation back as `lifx_legacy`.
- We added indexes to the database to speed up the history view. Initial boot can take a couple of minutes. Do not shut down while migration is occurring. [#6688]
- Z-Wave cover workaround has been removed. Use device config instead. [#6832]

```yaml
zwave:
  device_config:
    cover.my_cover:
      invert_openclose_buttons: true
```

- If you set an initial state for an automation, input_boolean, input_slider or input_select it will overrule over the previous state. [#6911] [#6924]
- Z-Wave rename node service parameter `entity_id` has been replaced with `node_id` to align parameters [#6938]
- Automations are now initialized when Home Assistant finishes starting up. This means that it is deprecated to listen for event `homeassistant_start`. Instead, use the new `homeassistant` automation platform. [#6936]

```yaml
automation:
  trigger:
    platform: homeassistant
    event: start
  action:
    service: light.turn_on
```

- The Ring component has moved the authentication to a dedicated ring component. [#6520]

```yaml
ring:
    username: !secret ring_username
    password: !secret ring_password

binary_sensor:
  - platform: ring
    monitored_conditions:
      - ding
      - motion

sensor:
  - platform: ring
    monitored_conditions:
      - battery
      - last_activity
      - last_ding
      - last_motion
      - volume
```

## If you need help...
...don't hesitate to use our very active [forums][forum] or join us for a little [chat][discord]. The release notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

## Reporting Issues
Experiencing issues introduced by this release? Please report them in our [issue tracker][issue]. Make sure to fill in all fields of the issue template.

## Release 0.42.1 - April 9

- Upgrade aiohttp to 2.0.6
- Make discovery not cause startup warning

## Release 0.42.1 - April 9

 - Revert upgrade to aiothttp 2.0.6

## Release 0.42.3 - April 11

- Fix Synology camera content type ([@balloob] - [#7010])
- Fix two more instances of JSON parsing synology ([@balloob] - [#7014])
- Bump pyalarmdotcom to support new version of aiohttp ([@Xorso] - [#7021])
- Fix US states check (fixes #7015) ([@fabaff] - [#7017])
- Plug file leak on LIFX unregister ([@amelchio] - [#7031])
- Bugfix wait on start event ([@pvizeli] - [#7013])

## Release 0.42.4 - April 17

- Version bump to 0.42.4 ([@balloob])
- Fix mysensors callback ([@MartinHjelmare] - [#7057])
- Upgrade aiohttp to 2.0.7 ([@fabaff] - [#7106])
- Make version number optional and a string to fix identify issue introduced in iOS 1.0.1 ([@robbiet480] - [#7141])
- Fix for zwave RGB setting ([@armills] - [#7137])

## All changes

- Flux led update lib ([@danielhiversen] - [#6763])
- Adding expire_after to mqtt sensor to expire outdated values ([@micw] - [#6708])
- New indexes for states and recording_runs tables ([@m00dawg] - [#6688]) (breaking change)
- Fix flaky template test ([@armills] - [#6768])
- Repair zwave sensor coverage ([@armills] - [#6764])
- Version bump to 0.42.0.dev0 ([@balloob])
- current temp could be none ([@turbokongen] - [#6759])
- Typing error and update test ([@turbokongen] - [#6757])
- Wink Aros Fixes ([@geekofweek] - [#6726])
- Upgrade pydroid-ipcam to 0.7 ([@fabaff] - [#6772])
- Upgrade psutil to 5.2.1 ([@fabaff] - [#6771])
- Upgrade sleekxmpp to 1.3.2 ([@fabaff] - [#6773])
- Tests for zwave workaround detection ([@armills] - [#6761])
- Bugfix automation fire on bootstrap ([@pvizeli] - [#6770])
- Homematic Fixes ([@danielperna84] - [#6769])
- Fix wink siren ([@w1ll1am23] - [#6775])
- Fix bridge-led support in limitlessled.py ([@quadportnick] - [#6776])
- Wrong info in discovery schema ([@turbokongen] - [#6779])
- switch.tplink: upgrade to the newest upstream release which adds support for plugs using the newer communication protocol ([@rytilahti] - [#6790])
- Add switch to MQTT discovery ([@fabaff] - [#6733])
- Update docstrings ([@fabaff] - [#6795])
- Add optional unit of measurement ([@fabaff] - [#6796])
- Upgrade zeroconf to 0.19.0 ([@fabaff] - [#6792])
- Upgrade pysnmp to 4.3.5 ([@fabaff] - [#6793])
- Platform for Munich public transport departure times ([@DavidMStraub] - [#6704])
- Use string formatting and remove already global disabled pylint issue ([@fabaff] - [#6801])
- Fix typo and update name ([@fabaff] - [#6809])
- Upgrade matrix-client to 0.0.6 ([@fabaff] - [#6808])
- Make get_snmp_data more robust ([@tantecky] - [#6798])
- Add NVR support to Hikvision Binary Sensors ([@mezz64] - [#6807])
- Update Insight parameters using the subscription data. ([@pavoni] - [#6782])
- fix WOL in docker/jail ([@goto100] - [#6810])
- Allow to monitor Windows hosts ([@fabaff] - [#6803])
- lights/hue: use device class for on/off devices like the osram lightify plug ([@jannau] - [#6817])
- [switch.wemo] Fix mW to kW conversion. ([@lwis] - [#6826])
- yeelight: adjust supported features on update() ([@rytilahti] - [#6799])
- Updated pubnubsub-handler version ([@w1ll1am23] - [#6829])
- Remove zwave cover invert workaround. Use config instead. ([@andrey-git] - [#6832]) (breaking change)
- history_stats: Fix schema, as `state` can be arbitrary string ([@leppa] - [#6753])
- Rflink group commands ([@aequitas] - [#5969])
- Updating Alarm.com Component for async and no Selenium ([@Xorso] - [#6752])
- Add voluptuous config validation to scenes ([@MartinHjelmare] - [#6830])
- Integration with lockitron ([@aarya123] - [#6805]) (new-platform)
- [switch.wemo] Fix today_energy_kwh calculation. ([@lwis] - [#6846])
- Locative tests to use aiohttp test utils ([@balloob] - [#6838])
- Convert Alexa tests to use aiohttp test utils ([@balloob] - [#6839])
- Handle initial event after entity is instantiated. ([@aequitas] - [#6760])
- Lifx legacy ([@amelchio] - [#6847]) (new-platform)
- aiohttp 2 ([@balloob] - [#6835])
- Fix configuration setup ([@bdurrer] - [#6853])
- Add option to disable automatic add for lights and sensors. ([@aequitas] - [#6852])
- Update aioHTTP to 2.0.5 ([@pvizeli] - [#6856])
- use change light level to avoid variable ramp speeds ([@craigjmidwinter] - [#6860])
- Handle aiohttp task cancellation better ([@balloob] - [#6862])
- Introduced Ring binary sensors and refactored Ring component ([@tchellomello] - [#6520]) (breaking change) (new-platform)
- Upgrade sendgrid to 3.6.5 ([@fabaff] - [#6866])
- Upgrade sphinx-autodoc-typehints to 1.2.0 ([@fabaff] - [#6865])
- Added Met Office weather and sensor components ([@jacobtomlinson] - [#6742]) (new-platform)
- Upgrade speedtest-cli to 1.0.3 ([@fabaff] - [#6867])
- Bumped amcrest module to 1.1.5 ([@tchellomello] - [#6872])
- Upgrade pytz to 2017.02 ([@fabaff] - [#6875])
- Upgrade aiohttp_cors to 0.5.2 ([@fabaff] - [#6874])
- Upgrade sqlalchemy to 1.1.8 ([@fabaff] - [#6873])
- added support for Fibaro FGR-222 (similar to FGRM-222) ([@ChristianKuehnel] - [#6890])
- Fluxled ([@danielhiversen] - [#6892])
- Fix Tado climate set off mode ([@wmalgadey] - [#6848])
- Fox UMP volume set ([@danieljkemp] - [#6904])
- Move examples out ([@balloob] - [#6908])
- Update README.rst ([@balloob])
- Makes amcrest.sensor to handle properly the scan_interval option. ([@tchellomello] - [#6885])
- Make sensor.ring to handle scan_interval option as expected. ([@tchellomello] - [#6886])
- Eliminate needless async_add_job invocation of async_add_devices ([@nugget] - [#6864])
- Onkyo update ([@danieljkemp] - [#6906])
- Fix for #6691 Neato Connection error handling ([@turbokongen] - [#6731])
- Adds support for the PlugInDimmer hardware ([@gurumitts] - [#6915])
- Support for zwave light transitions ([@armills] - [#6868])
- Bump pyHik library version to support more cameras ([@mezz64] - [#6921])
- Update vera cover refresh logic ([@pavoni] - [#6897])
- Update frontend ([@balloob])
- Automation: initial state > restore state ([@balloob] - [#6911]) (breaking change)
- Upgrade flux_led to 0.17 ([@danielhiversen] - [#6929])
- Upgrade paho-mqtt to 1.2.1 ([@fabaff] - [#6928])
- Upgrade distro to 1.0.4 ([@fabaff] - [#6926])
- Upgrade Sphinx to 1.5.4 ([@fabaff] - [#6927])
- Allow token authentication for 'hook' switch component ([@KlaasH] - [#6922])
- WIP - Fix bug in state handling in Vera Switch and Light ([@pavoni] - [#6931])
- total connect alarm support ([@craigjmidwinter] - [#6887]) (new-platform)
- Initial state over restore state ([@balloob] - [#6924]) (breaking change)
- Eddystone Beacon Temperature Sensor ([@citruz] - [#6789]) (new-platform)
- Add android ip webcam support for aiohttp2 ([@pvizeli] - [#6940])
- Bump pywemo version. Fixes Osram/Sylvania Lightify tunable white bulbs. ([@pavoni] - [#6946])
- Clean artifacts after running Ring tests. ([@tchellomello] - [#6944])
- Rename zwave nodes by node ID instead of entity ID ([@armills] - [#6938]) (breaking change)
- Report proper features in mqtt_json light ([@jawilson] - [#6941])
- Add multi phone numbers support ([@titilambert] - [#6605])
- Upgrade Sphinx to 1.5.5 ([@fabaff] - [#6947])
- Upgrade py-cpuinfo to 3.0.0 ([@fabaff] - [#6948])
- Fix automations listening to HOMEASSISTANT_START ([@balloob] - [#6936]) (breaking change)
- Fix startup of sonos / snapshot handling / error handling ([@pvizeli] - [#6945])
- Upgrade mysensors dep and callbacks ([@MartinHjelmare] - [#6950])
- Added average temperature for the day before and the current period ([@diogos88] - [#6883])
- Upgrade sqlalchemy to 1.1.9 ([@fabaff] - [#6955])
- Update for 0.42 ([@fabaff])
- Initial import for HassIO ([@pvizeli] - [#6935]) (new-platform)
- light.yeelight: catch i/o related exceptions from the backend lib ([@rytilahti] - [#6952])
- Fix current_temperature is rounded ([@aufano] - [#6960])
- Preserve customize glob order. ([@andrey-git] - [#6963])
- Foscam Camera: Adding exception handling when fetching the camera image to avoid python exception errors when host is not reachable or rather any URL error to camera ([@viswa-swami] - [#6964])
- Crime Reports sensor ([@happyleavesaoc] - [#6966]) (new-platform)
- Update kodi for aiohttp2 ([@armills] - [#6967])
- Bugfix time and task coro ([@pvizeli] - [#6968])
- Fix control+c quitting HASS ([@balloob] - [#6974])
- Update Emby for aiohttp v2 ([@mezz64] - [#6981])
- switch.tplink: bump pyhs100 version requirement ([@rytilahti] - [#6986])
- Warn if start takes a long time. ([@balloob] - [#6975])
- Bump Amcrest module to 1.1.8 ([@tchellomello] - [#6990])

[#5969]: https://github.com/home-assistant/home-assistant/pull/5969
[#6520]: https://github.com/home-assistant/home-assistant/pull/6520
[#6605]: https://github.com/home-assistant/home-assistant/pull/6605
[#6688]: https://github.com/home-assistant/home-assistant/pull/6688
[#6704]: https://github.com/home-assistant/home-assistant/pull/6704
[#6708]: https://github.com/home-assistant/home-assistant/pull/6708
[#6726]: https://github.com/home-assistant/home-assistant/pull/6726
[#6731]: https://github.com/home-assistant/home-assistant/pull/6731
[#6733]: https://github.com/home-assistant/home-assistant/pull/6733
[#6742]: https://github.com/home-assistant/home-assistant/pull/6742
[#6752]: https://github.com/home-assistant/home-assistant/pull/6752
[#6753]: https://github.com/home-assistant/home-assistant/pull/6753
[#6757]: https://github.com/home-assistant/home-assistant/pull/6757
[#6759]: https://github.com/home-assistant/home-assistant/pull/6759
[#6760]: https://github.com/home-assistant/home-assistant/pull/6760
[#6761]: https://github.com/home-assistant/home-assistant/pull/6761
[#6763]: https://github.com/home-assistant/home-assistant/pull/6763
[#6764]: https://github.com/home-assistant/home-assistant/pull/6764
[#6768]: https://github.com/home-assistant/home-assistant/pull/6768
[#6769]: https://github.com/home-assistant/home-assistant/pull/6769
[#6770]: https://github.com/home-assistant/home-assistant/pull/6770
[#6771]: https://github.com/home-assistant/home-assistant/pull/6771
[#6772]: https://github.com/home-assistant/home-assistant/pull/6772
[#6773]: https://github.com/home-assistant/home-assistant/pull/6773
[#6775]: https://github.com/home-assistant/home-assistant/pull/6775
[#6776]: https://github.com/home-assistant/home-assistant/pull/6776
[#6779]: https://github.com/home-assistant/home-assistant/pull/6779
[#6782]: https://github.com/home-assistant/home-assistant/pull/6782
[#6789]: https://github.com/home-assistant/home-assistant/pull/6789
[#6790]: https://github.com/home-assistant/home-assistant/pull/6790
[#6792]: https://github.com/home-assistant/home-assistant/pull/6792
[#6793]: https://github.com/home-assistant/home-assistant/pull/6793
[#6795]: https://github.com/home-assistant/home-assistant/pull/6795
[#6796]: https://github.com/home-assistant/home-assistant/pull/6796
[#6798]: https://github.com/home-assistant/home-assistant/pull/6798
[#6799]: https://github.com/home-assistant/home-assistant/pull/6799
[#6801]: https://github.com/home-assistant/home-assistant/pull/6801
[#6803]: https://github.com/home-assistant/home-assistant/pull/6803
[#6805]: https://github.com/home-assistant/home-assistant/pull/6805
[#6807]: https://github.com/home-assistant/home-assistant/pull/6807
[#6808]: https://github.com/home-assistant/home-assistant/pull/6808
[#6809]: https://github.com/home-assistant/home-assistant/pull/6809
[#6810]: https://github.com/home-assistant/home-assistant/pull/6810
[#6817]: https://github.com/home-assistant/home-assistant/pull/6817
[#6826]: https://github.com/home-assistant/home-assistant/pull/6826
[#6829]: https://github.com/home-assistant/home-assistant/pull/6829
[#6830]: https://github.com/home-assistant/home-assistant/pull/6830
[#6832]: https://github.com/home-assistant/home-assistant/pull/6832
[#6835]: https://github.com/home-assistant/home-assistant/pull/6835
[#6838]: https://github.com/home-assistant/home-assistant/pull/6838
[#6839]: https://github.com/home-assistant/home-assistant/pull/6839
[#6846]: https://github.com/home-assistant/home-assistant/pull/6846
[#6847]: https://github.com/home-assistant/home-assistant/pull/6847
[#6848]: https://github.com/home-assistant/home-assistant/pull/6848
[#6852]: https://github.com/home-assistant/home-assistant/pull/6852
[#6853]: https://github.com/home-assistant/home-assistant/pull/6853
[#6856]: https://github.com/home-assistant/home-assistant/pull/6856
[#6860]: https://github.com/home-assistant/home-assistant/pull/6860
[#6862]: https://github.com/home-assistant/home-assistant/pull/6862
[#6864]: https://github.com/home-assistant/home-assistant/pull/6864
[#6865]: https://github.com/home-assistant/home-assistant/pull/6865
[#6866]: https://github.com/home-assistant/home-assistant/pull/6866
[#6867]: https://github.com/home-assistant/home-assistant/pull/6867
[#6868]: https://github.com/home-assistant/home-assistant/pull/6868
[#6872]: https://github.com/home-assistant/home-assistant/pull/6872
[#6873]: https://github.com/home-assistant/home-assistant/pull/6873
[#6874]: https://github.com/home-assistant/home-assistant/pull/6874
[#6875]: https://github.com/home-assistant/home-assistant/pull/6875
[#6883]: https://github.com/home-assistant/home-assistant/pull/6883
[#6885]: https://github.com/home-assistant/home-assistant/pull/6885
[#6886]: https://github.com/home-assistant/home-assistant/pull/6886
[#6887]: https://github.com/home-assistant/home-assistant/pull/6887
[#6890]: https://github.com/home-assistant/home-assistant/pull/6890
[#6892]: https://github.com/home-assistant/home-assistant/pull/6892
[#6897]: https://github.com/home-assistant/home-assistant/pull/6897
[#6904]: https://github.com/home-assistant/home-assistant/pull/6904
[#6906]: https://github.com/home-assistant/home-assistant/pull/6906
[#6908]: https://github.com/home-assistant/home-assistant/pull/6908
[#6911]: https://github.com/home-assistant/home-assistant/pull/6911
[#6915]: https://github.com/home-assistant/home-assistant/pull/6915
[#6921]: https://github.com/home-assistant/home-assistant/pull/6921
[#6922]: https://github.com/home-assistant/home-assistant/pull/6922
[#6924]: https://github.com/home-assistant/home-assistant/pull/6924
[#6926]: https://github.com/home-assistant/home-assistant/pull/6926
[#6927]: https://github.com/home-assistant/home-assistant/pull/6927
[#6928]: https://github.com/home-assistant/home-assistant/pull/6928
[#6929]: https://github.com/home-assistant/home-assistant/pull/6929
[#6931]: https://github.com/home-assistant/home-assistant/pull/6931
[#6935]: https://github.com/home-assistant/home-assistant/pull/6935
[#6936]: https://github.com/home-assistant/home-assistant/pull/6936
[#6938]: https://github.com/home-assistant/home-assistant/pull/6938
[#6940]: https://github.com/home-assistant/home-assistant/pull/6940
[#6941]: https://github.com/home-assistant/home-assistant/pull/6941
[#6944]: https://github.com/home-assistant/home-assistant/pull/6944
[#6945]: https://github.com/home-assistant/home-assistant/pull/6945
[#6946]: https://github.com/home-assistant/home-assistant/pull/6946
[#6947]: https://github.com/home-assistant/home-assistant/pull/6947
[#6948]: https://github.com/home-assistant/home-assistant/pull/6948
[#6950]: https://github.com/home-assistant/home-assistant/pull/6950
[#6952]: https://github.com/home-assistant/home-assistant/pull/6952
[#6955]: https://github.com/home-assistant/home-assistant/pull/6955
[#6960]: https://github.com/home-assistant/home-assistant/pull/6960
[#6963]: https://github.com/home-assistant/home-assistant/pull/6963
[#6964]: https://github.com/home-assistant/home-assistant/pull/6964
[#6966]: https://github.com/home-assistant/home-assistant/pull/6966
[#6967]: https://github.com/home-assistant/home-assistant/pull/6967
[#6968]: https://github.com/home-assistant/home-assistant/pull/6968
[#6974]: https://github.com/home-assistant/home-assistant/pull/6974
[#6975]: https://github.com/home-assistant/home-assistant/pull/6975
[#6981]: https://github.com/home-assistant/home-assistant/pull/6981
[#6986]: https://github.com/home-assistant/home-assistant/pull/6986
[#6990]: https://github.com/home-assistant/home-assistant/pull/6990
[#7010]: https://github.com/home-assistant/home-assistant/pull/7010
[#7013]: https://github.com/home-assistant/home-assistant/pull/7013
[#7014]: https://github.com/home-assistant/home-assistant/pull/7014
[#7017]: https://github.com/home-assistant/home-assistant/pull/7017
[#7021]: https://github.com/home-assistant/home-assistant/pull/7021
[#7031]: https://github.com/home-assistant/home-assistant/pull/7031
[@Xorso]: https://github.com/Xorso
[@amelchio]: https://github.com/amelchio
[@balloob]: https://github.com/balloob
[@fabaff]: https://github.com/fabaff
[@pvizeli]: https://github.com/pvizeli
[@ChristianKuehnel]: https://github.com/ChristianKuehnel
[@DavidMStraub]: https://github.com/DavidMStraub
[@KlaasH]: https://github.com/KlaasH
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@aarya123]: https://github.com/aarya123
[@aequitas]: https://github.com/aequitas
[@andrey-git]: https://github.com/andrey-git
[@armills]: https://github.com/armills
[@aufano]: https://github.com/aufano
[@bdurrer]: https://github.com/bdurrer
[@citruz]: https://github.com/citruz
[@danielhiversen]: https://github.com/danielhiversen
[@danieljkemp]: https://github.com/danieljkemp
[@danielperna84]: https://github.com/danielperna84
[@diogos88]: https://github.com/diogos88
[@geekofweek]: https://github.com/geekofweek
[@goto100]: https://github.com/goto100
[@gurumitts]: https://github.com/gurumitts
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@jacobtomlinson]: https://github.com/jacobtomlinson
[@jannau]: https://github.com/jannau
[@jawilson]: https://github.com/jawilson
[@leppa]: https://github.com/leppa
[@lwis]: https://github.com/lwis
[@m00dawg]: https://github.com/m00dawg
[@mezz64]: https://github.com/mezz64
[@micw]: https://github.com/micw
[@nugget]: https://github.com/nugget
[@pavoni]: https://github.com/pavoni
[@quadportnick]: https://github.com/quadportnick
[@rytilahti]: https://github.com/rytilahti
[@tantecky]: https://github.com/tantecky
[@tchellomello]: https://github.com/tchellomello
[@titilambert]: https://github.com/titilambert
[@turbokongen]: https://github.com/turbokongen
[@viswa-swami]: https://github.com/viswa-swami
[@w1ll1am23]: https://github.com/w1ll1am23
[@craigjmidwinter]: https://github.com/craigjmidwinter
[@wmalgadey]: https://github.com/wmalgadey
[forum]: https://community.home-assistant.io/
[issue]: https://github.com/home-assistant/home-assistant/issues
[#7057]: https://github.com/home-assistant/home-assistant/pull/7057
[#7106]: https://github.com/home-assistant/home-assistant/pull/7106
[#7137]: https://github.com/home-assistant/home-assistant/pull/7137
[#7141]: https://github.com/home-assistant/home-assistant/pull/7141
[@robbiet480]: https://github.com/robbiet480
[discord]: https://discord.gg/c5DvZ4e
