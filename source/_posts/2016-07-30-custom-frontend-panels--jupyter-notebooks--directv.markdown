---
title: "0.25: Custom frontend panels, Jupyter notebooks, DirecTV."
description: "Frontend became blazing fast and extensible. DirecTV support added."
date: 2016-07-30 12:00:00 +0000
date_formatted: "July 30, 2016"
author: Fabian Affolter & Paulus Schoutsen
author_twitter: fabaff
categories:
- Release-Notes
- Core
---

When Home Assistant started the focus has always been on making a great developer experience. Allowing anyone to add support for their favorite devices to Home Assistant easily. This focus has been a great success since we now have 339 components and platforms!

Starting with this release, we are extending our extensibility to the frontend. Starting this release, any component can [add its own page to the frontend][custom-panels]. Examples of this today are the map, logbook and history. We are looking forward to all the crazy panels you'll come up with!

We have also seen an exciting trend of people starting to visualize their Internet of Things data using [Jupyter] Notebooks, which are a great way to create and share documents that contain code, visualizations, and explanatory text. In case you missed it, the [blog] post by [@kireyeu] shows an advanced usecase while our [Notebooks][jupyter-notebooks] in the [Home Assistant Notebooks repository][jupyter-repo] cover the basics.

This release also includes a bunch of new integrations, among others three new media player platforms. This means that today Home Assistant can talk to 26 different media players!

The brand-new [iFrame panel component][iframe_panel] allows you to add other websites as pages in the Home Assistant frontend. They will show up in the sidebar and can be used the same way as you open the frontend in your browser but all within one view.

I would like to do a shoutout to [@fabianhjr]. He has started adding [typing] data ([PEP484]) to the Home Assistant core. This will help us identify issues before they are released.

<img src='/images/supported_brands/russound.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/jupyter.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='https://brands.home-assistant.io/directv/icon.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

- Frontend: Support for [iFrame panels][iframe_panel] to adding other sites to sidebar ([@balloob])
- Allow components to register [custom frontend panels][custom-panels] ([@balloob])
- Add example custom_component react_panel showing custom panels ([@balloob])
- Light: [MagicLight/Flux WiFi Color LED Light][flux] support ([@Danielhiversen])
- Script: Specify a delay [using templates][script] ([@Teagan42])
- Media player: [Russound RNET][Russound] integration ([@laf]) 
- Remote: Option specifying custom timeout when calling Home Assistant API ([@n8henrie])
- Thermostat: Integration of [KNX] thermostats ([@open-homeautomation])
- Thermostat: Support for HVAC mode of [Nest] devices ([@vladonemo])
- InfluxDB: Option to specify additional [tags] ([@open-homeautomation])
- Input slider: Support for float value ([@ngraziano])
- Template: New [filters] (`timestamp_local` and `timestamp_utc`) ([@fabaff])
- Binary sensor - Wink: Water leak sensor support added ([@w1ll1am23])
- Sensor - Tellduslive: Support for luminance of Fibaro Motion Sensor ([@PetitCircuitLab])
- Switch - RPi GPIO: Fix when inverted logic (@zeroDenial)
- Z-Wave: Rollershutter update ([@turbokongen])
- RFXtrx: Fire events when receiving signals from sensors and tests added ([@Danielhiversen])
- Core: Add [type][typing] checking using mypy to the core ([@fabianhjr])
- Remote: Support for getting the [Configuration] through the Python API ([@fabaff])
- Media player: Support for [DirecTV] ([@cbulock])
- Use browser timezone for frontend logbook and history dates ([@armills])
- Light: New support for [X10] lights ([@fotoetienne])
- Sensor: Support for observing [IMAP] accounts ([@danieljkemp])
- Media Player: Integration for [MPC-HC] (Media Player Classic - Home Cinema) mediaplayer ([@abcminiuser])
- Notify: `location` extension for [Telegram] and photo bug fixed ([@keatontaylor] and [@pvizeli])
- Groups: Lock states will now be properly grouped ([@jwl17330536])
- Media Player: Added tests for Sonos to improve code quality ([@americanwookie])
- Device Tracker: iCloud stability fixes ([@kellerza])
- Sensor: Speedtest with improved error handling and state restoring ([@nkgilley])
- Recorder: Stability fixes ([@kellerza])
- Qwikswitch: Stability fixes ([@kellerza])
- Light: [Hyperion] keeps now track of active color ([@schneefux])

### Hotfix 0.25.1 - August 1

- Light - Z-Wave: Bring back delayed value update behavior ([@jnewland])
- Recorder: Properly close session after execute ([@kellerza])
- Media Player - Kodi: No longer block startup if connecting to wrong port ([@shoekstra])
- Downgrade voluptuous to 0.8.9 as it blocked the upgrade for some ([@balloob])

### Hotfix 0.25.2 - August 2

- Hotfix to make sure Z-Wave locks work again. Thanks to @tobiebooth for the quick fix.

### Backward-incompatible changes

- Google Voice SMS notification support was removed.

[@nkgilley]: https://github.com/nkgilley
[@abcminiuser]: https://github.com/abcminiuser
[@americanwookie]: https://github.com/americanwookie
[@armills]: https://github.com/armills
[@balloob]: https://github.com/balloob
[@cbulock]: https://github.com/cbulock
[@Danielhiversen]: https://github.com/Danielhiversen
[@danieljkemp]: https://github.com/danieljkemp
[@fabaff]: https://github.com/fabaff
[@fabianhjr]: https://github.com/fabianhjr
[@fotoetienne]: https://github.com/fotoetienne
[@jwl17330536]: https://github.com/jwl17330536
[@keatontaylor]: https://github.com/keatontaylor
[@kellerza]: https://github.com/kellerza
[@kireyeu]: https://github.com/kireyeu
[@laf]: https://github.com/laf
[@n8henrie]: https://github.com/n8henrie
[@ngraziano]: https://github.com/ngraziano
[@open-homeautomation]: https://github.com/open-homeautomation
[@PetitCircuitLab]: https://github.com/PetitCircuitLab
[@pvizeli]: https://github.com/pvizeli
[@schneefux]: https://github.com/schneefux
[@Teagan42]: https://github.com/Teagan42
[@turbokongen]: https://github.com/turbokongen
[@usul27]: https://github.com/usul27
[@vladonemo]: https://github.com/vladonemo
[@w1ll1am23]: https://github.com/w1ll1am23
[@jnewland]: https://github.com/jnewland
[@shoekstra]: https://github.com/shoekstra

[custom-panels]: /developers/frontend_creating_custom_panels/
[iframe_panel]: /integrations/panel_iframe/
[flux]: /integrations/flux_led
[script]: /getting-started/scripts/#delay
[Russound]: /integrations/russound_rnet
[tags]: /integrations/influxdb/
[filter]: /topics/templating/
[jupyter-notebooks]: /cookbook/#jupyter-notebooks
[jupyter-repo]: https://github.com/home-assistant/home-assistant-notebooks
[Jupyter]: http://jupyter.org/
[blog]: /blog/2016/07/23/internet-of-things-data-exploration-with-jupyter-notebooks/
[DirecTV]: /integrations/directv
[Configuration]: /developers/python_api/#get-configuration
[X10]: /integrations/x10
[IMAP]: /integrations/imap
[typing]: https://docs.python.org/3/library/typing.html
[PEP484]: https://www.python.org/dev/peps/pep-0484/
[MPC-HC]: /integrations/mpchc
[Telegram]: /integrations/telegram
[KNX]: /integrations/climate.knx/
[Nest]: /integrations/nest/#climate
[filters]: /topics/templating/#home-assistant-template-extensions
[Hyperion]: /integrations/hyperion
