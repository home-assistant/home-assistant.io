---
title: "0.28: Reload automation and groups, API documentation, car tracking, Pi-Hole stats"
description: "No Home Assistant restart for reloading automations and groups, Automatic car tracking, Pi-Hole and battery details, and bugfixes for climate and cover"
date: 2016-09-10 08:00:00 +0200
date_formatted: "September 10, 2016"
author: Fabian Affolter
author_twitter: fabaff
categories:
- Release-Notes
- Core
---

It's already time for 0.28 thanks to our super short release cycles. Now, it' official...we hit 4000 stars on Github. That's amazing. Sorry, not as amazing as all the stuff that was going on for 0.27 but still pretty awesome.

### Reload automation rules

This release brings you a huge improvement of the [automation] and [group] handling. Both can be reloaded without a Home Assistant restart by calling their new reload services. The automations can be controlled directly from the frontend.

<p class='img'>
  <img src='/images/screenshots/automation-switches.png' />
</p>

### Raspberry Pi installation guide
Singleboard computers are very popular to run Home Assistant. To support this fact, the [installation documentation][rpi] for the Raspberry Pi devices was re-written to get users started as quickly as possible. [@Landrash] took the lead with on this tasks with help from [@kellerza] and [@MartinHjelmare]. 

### Climate and  cover
There are countless bugfixes included in this release which will make your experience with the `climate` and the `cover` platforms better. Two week ago was the biggest merger of implementations released that ever happened in the history of Home Assistant. Thanks to [@turbokongen], [@pvizeli], [@djbanks], [@danielperna84], and others the improvements on the code and the frontend side is continuing... 

### API documentation
The [Home Assistant API Documentation](https://dev-docs.home-assistant.io/en/dev/) is a great addition to the already existing user documentation. The focus is not end-users but developers who want to get details about the code without actually browsing the code on Github.

### Configuration validation
The validation of the configuration is still on-going. Approximately 80 % is done. This means that we will propably talk about this topic in the next release notes again. To align the configuration of components and platforms we needed to break some. Please refer to the Backward-incompatible changes section to check if you need to update your configuration or simple check your log for configuration validation errors. Thanks to [@kellerza], [@fabaff], [@Teagan42], and [@pvizeli] for your effort!

### All changes

<img src='/images/supported_brands/xbox-live.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='https://brands.home-assistant.io/automatic/icon.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/pi_hole.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' />

- Light: Added bitfield to Flux LED since we are supporting effects ([@tchellomello])
- Device tracker: [Owntracks] waypoint import ([@pavoni])
- Climate: A lot of bugfix ([@turbokongen], [@pvizeli], [@djbanks])
- Notify: Improvement of the title handling ([@lwis])
- RFXtrx: Sensor cleanup ([@turbokongen])
- Device tracker: Fix for BLE device tracker ([@open-homeautomation])
- Device tracker: Allow 'None' MAC addresses to be loaded from `known_devices` file ([@kellerza])
- Cover: Bugfixes ([@turbokongen], [@danielperna84])
- Sensor: Support for displaying details about [crypto currencies][Coinmarketcap] ([@fabaff])
- Device tracker: Support for automatic to track your vehicles ([@Teagan42])
- Devie tracker: Add exclude option to [Nmap] device tracker ([@danieljkemp])
- Device tracker: Improved login errors for Asus device tracker ([@kellerza])
- Sensor: Support for displaying the status of [Xbox] Live accounts ([@mKerix])
- Notify: Adding `link_names` for sending Slack message ([@salt-lick])
- Binary sensor: Add the occupancy sensor class ([@robbiet480])
- Fan: Add supoort for [MQTT fans][mqtt-fan] ([@robbiet480])
- Docs: Add Sphinx API doc generation ([@bbangert])
- Core: Allow reloading automation without restart ([@balloob])
- Sensor: Added scale and offset to the [Temper] sensor ([@mKerix])
- Sensor: New support for [Trend] sensor ([@pavoni])
- Device tracker: Keep looking for new BLE devices ([@Bart274])
- Switch: Added device state attributes and support for legacy firmware for D-Link switches ([@LinuxChristian])
- Sensor: Improve 1-Wire device family detection ([@Ardetus])
- Modbus: Update to be thread safe ([@persandstrom])
- Camera: FFMpeg is abale to get the images ([@pvizeli])
- Core: Reload groups without restart ([@balloob])
- Core: Fix remove listener ([@balloob])
- Sensor: Support for monitoring your [battery] on a Linux host ([@fabaff])
- Core: Add support for complex template structures to `data_template` ([@pvizeli])
- `check_config`: Improve yaml fault tolerance and handle border cases ([@kellerza])
- Core: Add additional [template] for custom date formats ([@lwis])
- Sensor: Support for getting stats from Pi-Hole systems ([@fabaff])
- Modbus: New `write_registers` [Modbus] service ([@persandstrom])
- Device tracker: Fix TP-Link Archer C7 long passwords ([@snikch])

### Hotfix 0.28.1 - September 12

- Fix: Simplisafe alarm control panels accept any string for code ([@tchellomello])
- Fix: Z-Wave would sometimes not detect all thermostats ([@turbokongen])
- Fix: Automatic device tracker when 2 or more cars are tracked ([@teagan42])
- Fix: Group ordering is now based on config again ([@balloob], [@kellerza])

### Hotfix 0.28.2 - September 13

- Light - pilight: Fix send RF code ([@DavidLP])
- Recorder: Fix specifying SQLite ([@pvizeli])
- Wink: Fix garage door detection ([@turbokongen])
- Climate - Ecobee: Fix inverted high and low temperatures ([@turbokongen])
- Allow changing covers using scenes ([@nvella])
- Device tracker - Automatic: Fix polling ([@teagan42])

### Backward-incompatible changes

- [OpenweatherMap] entity IDs are now like `sensor.owm_temperature`. Previously they were like `sensor.weather_temperature`. Apologies for this change, but we needed to make OpenWeatherMap more generic now that we have many weather platforms.
- Updates of configuration variables due to configuration check or alignment with other platforms. Please update your configuration entries according to the documentation:
  - [OctoPrint] component
  - mFi platform ([switch][mfi-switch] and [sensor][mfi-sensor])
  - NX584 Alarm Control Panel
  - Mediaplayer platforms [FireTV], [Kodi] and [MPD]
  - [switch][command-line-switch] and the [cover][command-line-cover] `command_line` platforms
- Custom components extending `BaseNotificationService` need to be aware that `kwargs.get(ATTR_TITLE)` will now return `None` if a title has not been set, and will need to specify `kwargs.get(ATTR_TITLE, ATTR_TITLE_DEFAULT)` if they always require a title.

### If you need help...
...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://discord.gg/c5DvZ4e).


[@DavidLP]: https://github.com/DavidLP
[@nvella]: https://github.com/nvella
[@Ardetus]: https://github.com/Ardetus
[@arsaboo]: https://github.com/arsaboo
[@auchter]: https://github.com/auchter
[@balloob]: https://github.com/balloob
[@Bart274]: https://github.com/Bart274
[@bbangert]: https://github.com/bbangert
[@danieljkemp]: https://github.com/danieljkemp
[@danielperna84]: https://github.com/danielperna84
[@djbanks]: https://github.com/djbanks
[@fabaff]: https://github.com/fabaff
[@infamy]: https://github.com/infamy
[@jnewland]: https://github.com/jnewland
[@kellerza]: https://github.com/kellerza
[@Landrash]: https://github.com/Landrash
[@LinuxChristian]: https://github.com/LinuxChristian
[@lwis]: https://github.com/lwis
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@mKerix]: https://github.com/mKerix
[@nkgilley]: https://github.com/nkgilley
[@open-homeautomation]: https://github.com/open-homeautomation
[@pavoni]: https://github.com/pavoni
[@persandstrom]: https://github.com/persandstrom
[@pvizeli]: https://github.com/pvizeli
[@robbiet480]: https://github.com/robbiet480
[@salt-lick]: https://github.com/salt-lick
[@tchellomello]: https://github.com/tchellomello
[@Teagan42]: https://github.com/Teagan42
[@technicalpickles]: https://github.com/technicalpickles
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23
[@snikch]: https://github.com/snikch

[modbus]: /integrations/modbus/
[rpi]: /getting-started/installation-raspberry-pi/
[MPD]: /integrations/mpd
[Coinmarketcap]: /integrations/coinmarketcap
[template]: /topics/templating/
[battery]: /integrations/linux_battery
[group]: /integrations/group/
[automation]: /integrations/automation/
[Temper]: /integrations/temper
[mqtt-fan]: /integrations/fan.mqtt/
[Xbox]: /integrations/xbox_live
[Nmap]: /integrations/nmap_tracker
[Owntracks]: /integrations/owntracks
[OpenweatherMap]: /integrations/openweathermap#sensor
[OctoPrint]: /integrations/octoprint/
[mfi-switch]: /integrations/mfi#switch
[mfi-sensor]: /integrations/mfi#sensor
[FireTV]: /integrations/androidtv
[Kodi]: /integrations/kodi
[command-line-switch]: /integrations/switch.command_line/
[command-line-cover]: /integrations/cover.command_line/
