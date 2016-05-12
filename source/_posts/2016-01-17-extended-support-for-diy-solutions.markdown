---
layout: post
title: "0.11: Extended support for DIY solutions"
description: "Home Assistant 0.11 has been released with extended support for making your own home automation components using a Raspberry Pi and MySensors."
date: 2016-01-17 15:20:00 -0800
date_formatted: "January 17, 2016"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Release-Notes
---

First release of 2016 and we are on 🔥! The [main repository][github-ha] has passed 2500 ⭐ on GitHub (2596 ⭐ as of now). This release also has a [record number][release-pr] of 20 contributors all working on improving and extending Home Assistant. With the continued growth, I am very excited to see what 2016 will bring us 🤘.

[github-ha]: https://github.com/home-assistant/home-assistant/
[release-pr]: https://github.com/home-assistant/home-assistant/pull/883#partial-users-participants

<img src='/images/supported_brands/mysensors.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/raspberry-pi.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='50' /><img src='/images/supported_brands/yr.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/telldus.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/free_mobile.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/netatmo.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/alarmdotcom.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/proliphix.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

 - [MySensors] revamped and switch support added ([@MartinHjelmare][@MartinHjelmare])
 - Full refactor of RPi GPIO. Now includes [binary sensor][rpi-bs] and [switch][rpi-s] ([@sfam])
 - Sensor: [YR] platform added ([@danielhiversen])
 - Device Tracker: Geofancy platform has been renamed to [Locative] ([@philipbl])
 - Automation: Add [sun condition] ([@philipbl])
 - Switch: [command_switch] can now poll for state ([@happyleavesaoc][@happyleavesaoc])
 - Switch: [wemo] now uses subscription to states instead of polling ([@pavoni][@pavoni])
 - [Telldus Live] support added ([@molobrakos])
 - [Vera] now uses subscription to states instead of polling ([@pavoni])
 - New [template helper method] `is_state_attr(entity_id, name, value)` added ([@andythigpen])
 - Device tracker: [OwnTracks] transition events now supported ([@xifle])
 - Light: [Philips Hue] platform now supports multiple hubs ([@rhooper])
 - Notify: [Free Mobile] platform added ([@HydrelioxGitHub])
 - New [MQTT Eventstream] component to connect two Home Assistant instances over MQTT ([@moonshot])
 - Media player: [Cast] huge stability improvements ([@rmkraus])
 - Media Player: [Universal media player] added to combine multiple media players ([@rmkraus])
 - Sensor: [Netatmo] platform added ([@HydrelioxGitHub])
 - Alarm Control Panel: [Alarm.com] platform added ([@Xorso])
 - Thermostat: [Proliphix] platform added ([@sdague])
 - New component [input_boolean] will allow for customizing automation ([@balloob])
 - Support calling services via [Amazon Echo] ([@balloob])

[MySensors]: /components/mysensors/
[YR]: /components/sensor.yr/
[Locative]: /components/device_tracker.locative/
[sun condition]: /getting-started/automation-condition/#sun-condition
[command_switch]: /components/switch.command_switch/
[wemo]: /components/switch.wemo/
[Telldus Live]: /components/tellduslive/
[Vera]: /components/vera/
[template helper method]: /topics/templating/#home-assistant-template-extensions
[OwnTracks]: /components/device_tracker.owntracks/
[Philips Hue]: /components/light.hue/
[Free Mobile]: /components/notify.free_mobile/
[MQTT Eventstream]: /components/mqtt_eventstream/
[Cast]: /components/media_player.cast/
[Universal media player]: /components/media_player.universal/
[Netatmo]: /components/sensor.netatmo/
[Alarm.com]: /components/alarm_control_panel.alarmdotcom/
[Proliphix]: /components/thermostat.proliphix/
[rpi-bs]: /components/binary_sensor.rpi_gpio/
[rpi-s]: /components/switch.rpi_gpio/
[input_boolean]: /components/input_boolean/
[MySensors sensor platform]: /components/sensor.mysensors/
[Amazon Echo]: /components/alexa/

### Backwards incompatible changes
 - The [RPi.GPIO sensor platform][rpi-bs] has been moved to the `binary_sensor` component.
 - [MySensors sensor platform] now requires the [MySensors] component to be configured.
 - Geofancy platform has been renamed to [Locative].

[@MartinHjelmare]: https://github.com/MartinHjelmare
[@danielhiversen]: https://github.com/danielhiversen
[@philipbl]: https://github.com/philipbl
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@pavoni]: https://github.com/pavoni
[@molobrakos]: https://github.com/molobrakos
[@andythigpen]: https://github.com/andythigpen
[@xifle]: https://github.com/xifle
[@rhooper]: https://github.com/rhooper
[@HydrelioxGitHub]: https://github.com/HydrelioxGitHub
[@moonshot]: https://github.com/moonshot
[@rmkraus]: https://github.com/rmkraus
[@Xorso]: https://github.com/Xorso
[@sdague]: https://github.com/sdague
[@balloob]: https://github.com/balloob
[@sfam]: https://github.com/sfam
