---
title: "0.22: Pandora, BT Home Hub 5 and local file camera."
description: "This new release of Home Assistant has been mainly about stabilizing our last release which included a lot of core improvements. We're all stable now and set for a bright future."
date: 2016-06-18 18:06:00 +0000
date_formatted: "June 18, 2016"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

It's time for the 0.22 release. This was a pretty rough release cycle and we had to issue two hot fixes for our core improvements. But it seems now that all is good and a lot of people have reported that their installs are faster than ever and the occasional quirks no longer occur.

We are aware that our new web stack has caused issues installing Home Assistant on ARM-based platforms. This sadly includes the Raspberry Pi and Synology NAS systems. We're working on getting to a better solution. For Raspberry Pi, the All-in-One installer will take care of everything for you. We're working on updating our [standalone Raspberry Pi installation guide].

There are two cool things that I want to highlight in this release. The first is Pandora support. This is based on the CLI player called pianobar. This means that your machine running Home Assistant can be connected to the speakers and provide your house with tunes.

<p class='img'>
<img src='/images/screenshots/pandora_player.png' />
</p>

Another cool addition is the local file camera. This seems very basic at first but will allow you to generate a graph with your favorite 3rd party graphing tool and display it on your Home Assistant dashboard. We're looking forward to see what you can do with this!

<img src='/images/supported_brands/pandora.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/bt.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

- Media Player: [Pandora] media player now supported ([@partofthething])
- Device Tracker: [BT Home Hub 5] now supported ([@lwis])
- Camera: New [local file] platform shows any image as camera ([@Landrash])
- Add [Sonos] snapshot and restore services ([@dansullivan86])
- Device Tracker: [AsusWRT] in Access Point mode now supported ([@linjef])
- Device Tracker: [AsusWRT] login using public key now supported ([@mtreinish])
- Device Tracker: [AsusWRT] protocol to use is now auto detected ([@persandstrom])
- Camera: [Netatmo] now supported ([@jabesq])
- API documentation added  in [Swagger.yaml format] ([@wind-rider])
- Media Player: [Cast] devices can now be stopped ([@michaelarnauts])
- MySensors: [IR switch device] and service now supported ([@MartinHjelmare])
- Bloomsky: [Voltage sensor] now supported ([@arsaboo])
- Sensor: New [Plex sensor] monitors friends streaming from your Plex server ([@nkgilley])
- Component [shell command] can now use templates to render arguments ([@partofthething])
- Rollershutter: [Wink] is now supported ([@philk])
- Alexa: Updated [documentation][alexa] to show how to call scripts and scenes (@acockburn)
- Sensor: [SNMP] is now supported ([@fabaff])
- Sensor: Support for Swiss hydrological data ([@fabaff])

### Breaking change

- The new Netatmo support caused us to change how Netatmo are configured. It's now done via its own component.

```yaml
netatmo:
    api_key: API_KEY
    secret_key: SECRET_KEY
    username: username
    password: password
```

### Hotfix 0.22.1 - June 20

- Insteon Hub lights will load again

[@acockburn]: https://github.com/acockburn/
[@arsaboo]: https://github.com/arsaboo/
[@dansullivan86]: https://github.com/dansullivan86/
[@jabesq]: https://github.com/jabesq/
[@Landrash]: https://github.com/Landrash/
[@linjef]: https://github.com/linjef/
[@lwis]: https://github.com/lwis/
[@MartinHjelmare]: https://github.com/MartinHjelmare/
[@michaelarnauts]: https://github.com/michaelarnauts/
[@mtreinish]: https://github.com/mtreinish/
[@nkgilley]: https://github.com/nkgilley/
[@partofthething]: https://github.com/partofthething/
[@persandstrom]: https://github.com/persandstrom/
[@philk]: https://github.com/philk/
[@wind-rider]: https://github.com/wind/
[@fabaff]: https://github.com/fabaff/
[AsusWRT]: /integrations/asuswrt
[BT Home Hub 5]: /integrations/bt_home_hub_5
[Cast]: /integrations/cast
[IR switch device]: /integrations/mysensors/
[local file]: /integrations/local_file
[Netatmo]: /integrations/netatmo/
[Pandora]: /integrations/pandora
[shell command]: /integrations/shell_command/
[Sonos]: /integrations/sonos
[Wink]: /integrations/wink/#cover
[alexa]: /integrations/alexa/#working-with-scenes
[Plex sensor]: /integrations/plex#sensor
[Swagger.yaml format]: https://github.com/home-assistant/home-assistant/blob/dev/docs/swagger.yaml
[standalone Raspberry Pi installation guide]: /getting-started/installation-raspberry-pi/
[Voltage sensor]: /integrations/bloomsky/#sensor
[SNMP]: /integrations/snmp#sensor
