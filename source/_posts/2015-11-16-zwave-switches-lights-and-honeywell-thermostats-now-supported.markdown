---
title: "0.8: Honeywell Thermostats, Orvibo switches and Z-Wave switches and lights "
description: "Home Assistant 0.8 can now interact with Honeywell thermostats, Orvibo switches and has improved Z-Wave support."
date: 2015-11-16 21:27:00 0000
date_formatted: "November 16, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

<img src='/images/screenshots/custom-icons.png' style='float: right;' />We have all been hard at work to get this latest release ready. One of the big highlights in this release is the introduction of an extended iconset to be used in the frontend (credits to [@happyleavesaoc] for idea and prototype). To get started with customizing, pick any icon from [Material Design Icons], prefix the name with `mdi:` and stick it into your `customize` section in `configuration.yaml`:

```yaml
homeassistant:
  customize:
    switch.ac:
      icon: "mdi:air-conditioner"
```

#### Backward-incompatible changes

 - Any existing zone icon will have to be replaced with one from [Material Design Icons].
 - LimitlessLED light services require colors to be specified in RGB instead of XY.

#### Changes

<img src='/images/supported_brands/honeywell.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' height='50' /><img src='/images/supported_brands/orvibo.png' style='clear: right;  border:none; box-shadow: none; float: right; margin-bottom: 16px;' height='50' />

- Thermostat: [Honeywell](/integrations/honeywell/) now supported ([@sander76])
- Switch: [Orvibo](/integrations/orvibo) now supported ([@happyleavesaoc])
- Camera: [mjpeg camera's](/integrations/mjpeg) now supported ([@ryanturner])
- Notify: Pushetta now supported ([@fabaff])
- Light: [MQTT](/integrations/light.mqtt/) now supported ([@hexxter])
- Light: [Z-Wave](/integrations/zwave/) now supported ([@leoc])
- Switch: [Z-Wave](/integrations/zwave/) now supported ([@leoc])
- New component [logger](/integrations/logger/) allows filtering logged data ([@badele])
- New component [updater](/integrations/updater/) will notify users if an update for Home Assistant is available ([@rmkraus])
- Notify: [PushBullet](/integrations/pushbullet) now allows targeting contacts/channels/specific devices ([@tomduijf])
- Light: Allow controlling color temperature ([@tomduijf])
- Frontend: about page added ([@balloob])
- Switch RGB as the color unit used in light component ([@balloob])
- Re-install platform and component dependencies after a Home Assistant version upgrade ([@balloob])

[Material Design Icons]: https://pictogrammers.com/library/mdi/
[@sander76]: https://github.com/sander76
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@ryanturner]: https://github.com/ryanturner
[@fabaff]: https://github.com/fabaff
[@hexxter]: https://github.com/hexxter
[@leoc]: https://github.com/leoc
[@badele]: https://github.com/badele
[@rmkraus]: https://github.com/rmkraus
[@tomduijf]: https://github.com/tomduijf
[@balloob]: https://github.com/balloob
