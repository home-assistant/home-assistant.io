---
title: "0.16: Embedded MQTT broker, Uber, Yamaha receivers and Growl"
description: "Home Assistant 0.16 has arrived."
date: 2016-03-26 0:10:00 -0700
date_formatted: "March 26, 2016"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

Party people, 0.16 is here! The big thing with this release is that we have completely removed the barrier to get started by MQTT by being able to launch an embedded MQTT server: [hbMQTT]. Just add `mqtt:` to your config and a broker is launched and connected with Home Assistant.

Further in this release a bunch of cool new stuff, bug fixes and rewrites for the Vera and Tellstick component (see backward-incompatible changes section at bottom for this!).

Rock on.

<img src='/images/supported_brands/message_bird.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/pulseaudio.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/uber.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/gntp.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/images/supported_brands/yamaha.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

 - Device Tracker - [OwnTracks]: Allow entry into passive zones using iBeacons ([@pavoni])
 - Tellstick: rewrite to [component][Tellstick] to address concurrency issues ([@stefan-jonasson])
 - Z-Wave: add [services][Z-Wave] to heal and soft reset network ([@srcLurker])
 - New component [input_slider] added ([@persandstrom])
 - Light - [Hue]: Option added to ignore unreachable property ([@maddox])
 - Notify: [MessageBird] support added ([@florianholzapfel])
 - HTTP: Failed login attempts are now logged ([@fabaff])
 - Vera: rewrite to [component][Vera] to simplify code and organize for reusability ([@pavoni])
 - Discovery: support for Squeezebox (Logitech media) server added ([@jaharkes])
 - Discovery: fix uPNP discovery crashing some routers ([@jaharkes])
 - Switch: [Wake on LAN] platform added ([@joopert])
 - Services for thermostats, notify and media player will now validate passed in parameters ([@MartinHjelmare])
 - Switch - [Arduino]: support for default state and negate port functionality (@tilutza)
 - Switch: [PulseAudio loopback] now supported ([@Cinntax])
 - Sensor: Uber now supported ([@robbiet480])
 - Notify: [Growl (GNTP)] now supported ([@robbiet480])
 - Media Player: [Yamaha receivers] now supported ([@aoakeson])

[hbMQTT]: https://github.com/beerfactory/hbmqtt
[@aoakeson]: https://github.com/aoakeson
[@balloob]: https://github.com/balloob
[@Cinntax]: https://github.com/Cinntax
[@fabaff]: https://github.com/fabaff
[@florianholzapfel]: https://github.com/florianholzapfel
[@jaharkes]: https://github.com/jaharkes
[@joopert]: https://github.com/joopert
[@maddox]: https://github.com/maddox
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@pavoni]: https://github.com/pavoni
[@persandstrom]: https://github.com/persandstrom
[@robbiet480]: https://github.com/robbiet480
[@srcLurker]: https://github.com/srcLurker
[@stefan-jonasson]: https://github.com/stefan-jonasson
[Arduino]: /integrations/arduino#switch
[Discovery]: /integrations/discovery/
[Growl (GNTP)]: /integrations/gntp
[Hue]: /integrations/hue
[input_slider]: /integrations/input_number
[MessageBird]: /integrations/message_bird
[OwnTracks]: /integrations/owntracks
[PulseAudio loopback]: /integrations/pulseaudio_loopback
[Tellstick]: /integrations/tellstick/
[Vera]: /integrations/vera/
[Wake on LAN]: /integrations/wake_on_lan#switch
[Z-Wave]: /integrations/zwave/#services
[Yamaha receivers]: /integrations/yamaha

### Backward-incompatible changes
 - Automation: support for old deprecated config has been removed

 - Tellstick configuration has changed

```yaml
tellstick:
  signal_repetitions: X
```

- Vera configuration has changed

```yaml
vera:
  vera_controller_url: http://192.168.1.161:3480/
  # Optional to exclude devices - this is a list of vera device ids
  exclude: [ 13, 14, 16, 20, 23, 72, 73, 74, 75, 76, 77, 78, 88, 89, 99]
  # Optional to import switches as lights - this is a list of vera device ids
  lights: [15, 17, 19, 21, 22, 24, 26, 43, 64, 70, 87]
```
