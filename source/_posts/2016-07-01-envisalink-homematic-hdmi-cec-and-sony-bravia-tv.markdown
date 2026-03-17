---
title: "0.23: Envisalink, Homematic, HDMI-CEC and Sony Bravia TV"
description: "This new release of Home Assistant contains support for Envisalink, Homematic, Sony Bravia TV and HDMI-CEC. Additionally was the Wink support improved and CherryPy is the new WSGI server."
date: 2016-07-01 00:31:00 +0000
date_formatted: "July 1, 2016"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

It's time for Home Assistant 0.23 and it's full of goodies. It's also the release that bumps us over a 1000 tests and to 94% test coverage! Also our install issues on the Raspberry Pi and Synology have been resolved.

This release brings support for two new ecosystems: [Envisalink] and [Homematic]. We can now also control your TV via HDMI using [HDMI-CEC] (which works on the Pi!) and another cool feature is the [persistent notifications] which allow you to add a notification to the frontend till dismissed.

[Wink] support has been dramatically improved by migrating to the PubNub API. This allows Wink to push changes from their system to Home Assistant. This change came just in time as somehow our Wink integration was causing a lot of requests to their servers. Thanks to Wink for letting us know so we could solve it instead of blocking us.

On the config side, you can now [store your passwords][secrets] in your OS keyring or just in a standalone file. We also got a new service to reload the core config so no reboots needed anymore after changing customize settings!

<img src='/images/supported_brands/bravia.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/eyezon.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/homematic.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/openexchangerates.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

- Support for [Envisalink] added ([alarm control panel][envi-alarm], [binary sensor][envi-binary-sensor], [sensor][envi-sensor]) ([@cinntax])
- Support for [Homematic] added ([binary sensor][hm-binary-sensor], [light][hm-light], [rollershutter][hm-rollershutter], [sensor][hm-sensor], [switch][hm-switch]) ([@pvizeli], [@danielperna84])
- New [HDMI-CEC] component ([@happyleavesaoc], [@lukas-hetzenecker])
- Major rewrite of [Wink] which now pushes changes to Home Assistant ([@w1ll1am23])
- Core: new add [reload core config service] ([@balloob])
- Support for [persistent notifications] added ([@fabaff], [@balloob])
- Garage door: [Z-Wave][zwave-garage-door] support added ([@turbokongen])
- Rollershutter: [Z-Wave][zwave-rollershutter] support added ([@turbokongen])
- Media Player: [Sony Bravia TV] now supported ([@aparraga])
- Sensor: [Fixer.io] now supported ([@fabaff])
- Garage door: Control any garage door using [Raspberry Pi GPIO pins] ([@kellerza])
- Sensor: [OpenExchangeRates] support added ([@arsaboo])
- Notify: [Pushover] now supports target device, sound, URL and priority ([@dale3h])
- Sensor: [Netatmo] now supports wind, battery and radio signals ([@Jypy])
- Log successful and failed login attemps ([@fabaff])
- Config: allow [extracting account info][secrets] into OS keyring or separate YAML file ([@kellerza])
- Core: add option to not filter out duplicate states per entity ([@philipbl])
- HTTP: Follow Mozilla SSL recommendations ([@danieljkemp], [@AlucardZero])
- Light: [Z-Wave colorbulb][zwave-light] support added ([@armills])
- Core: new elevation config option added ([@balloob])
- Sensor: [OneWire] support extended with support for DS18S20, DS1822, DS1825 and DS28EA00 temperature sensors + support for bus masters which use fuse to mount device tree. ([@Ardetus])
- Lock: [Vera] now supported ([@rhooper])
- HTTP: Migrate to CherryPy WSGI server to fix install and runtime problems ([@balloob])

### Backward-incompatible changes

- Homematic thermostat configuration has changed and now depends on the new [Homematic] component.

### Hotfix 0.23.1 - July 2

- Bump PyVera to 0.2.13 to fix traceback and pyvera thread dying related to bug ([@rhooper])
- HTTP - SSL: Check for OP_NO_COMPRESSION support before trying to use it ([@AlucardZero])
- Wink: Downgraded pubnub to work around pycryptodome conflicts ([@w1ll1am23])

### FAQ

- `elevation: ` was introduced to the configuration for weather/sunrise data. For existing [configurations][elevation] add the value shown in the warning `[homeassistant.config] Incomplete core config. Auto detected elevation: 665` to your `configuration.yaml` file.

[@AlucardZero]: https://github.com/AlucardZero/
[@aparraga]: https://github.com/aparraga/
[@Ardetus]: https://github.com/Ardetus/
[@armills]: https://github.com/armills/
[@arsaboo]: https://github.com/arsaboo/
[@balloob]: https://github.com/balloob/
[@cinntax]: https://github.com/cinntax/
[@dale3h]: https://github.com/dale3h/
[@danieljkemp]: https://github.com/danieljkemp/
[@danielperna84]: https://github.com/danielperna84/
[@fabaff]: https://github.com/fabaff/
[@happyleavesaoc]: https://github.com/happyleavesaoc/
[@Jypy]: https://github.com/Jypy/
[@kellerza]: https://github.com/kellerza/
[@lukas-hetzenecker]: https://github.com/lukas-hetzenecker/
[@philipbl]: https://github.com/philipbl/
[@pvizeli]: https://github.com/pvizeli/
[@rhooper]: https://github.com/rhooper/
[@turbokongen]: https://github.com/turbokongen/
[@w1ll1am23]: https://github.com/w1ll1am23/
[envi-alarm]: /integrations/envisalink
[envi-binary-sensor]: /integrations/envisalink
[envi-sensor]: /integrations/envisalink
[Envisalink]: /integrations/envisalink/
[HDMI-CEC]: /integrations/hdmi_cec/
[hm-binary-sensor]: /integrations/homematic
[hm-light]: /integrations/homematic
[hm-rollershutter]: /integrations/homematic/
[hm-sensor]: /integrations/homematic
[hm-switch]: /integrations/homematic
[Homematic]: /integrations/homematic/
[Netatmo]: /integrations/netatmo#sensor
[OneWire]: /integrations/onewire
[OpenExchangeRates]: /integrations/openexchangerates
[Pushover]: /integrations/pushover
[secrets]: /topics/secrets/
[Vera]: /integrations/vera
[Wink]: /integrations/wink/
[zwave-garage-door]: /integrations/zwave/#cover
[zwave-light]: /integrations/zwave
[zwave-rollershutter]: /integrations/zwave/#cover
[Fixer.io]: /integrations/fixer
[persistent notifications]: /integrations/persistent_notification/
[reload core config service]: /getting-started/customizing-devices/#reloading-customize
[Sony Bravia TV]: /integrations/braviatv
[Raspberry Pi GPIO pins]: /integrations/rpi_gpio/#remote-raspberry-pi-cover
[elevation]: /getting-started/basic/
