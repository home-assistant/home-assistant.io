---
title: "0.35: Text-to-speech, VLC, Flic, netdata"
description: "Home Assistant learned to speak, VLC and AquosTV mediaplayer, Netdata, ZMAG, Flic, and Broadlink"
date: 2016-12-17 08:04:05 +0000
date_formatted: "December 17, 2016"
author: Fabian Affolter et al.
author_twitter: fabaff
categories:
- Release-Notes
- Core
og_image: /images/blog/2016-12-0.35/social.png
---

5000 stars on GitHub, 2000 people in our [chatroom][discord] and over a million monthly page views. I don't think we could wish for a better place to be at the end of 2016. Feels like an early Christmas present! Our early one for you is 0.35. It's not a single thing inside a nice wrapping, more like several little gifts inside the 0.35 box.

This will be the last release of 2016 as our developers are taking a well deserved break. We will be back in 2017!

## Text-to-speech
With the addition of a [text-to-speech][tts] component by [@pvizeli] we have been able to bring Home Assistant to a whole new level. The text-to-speech component will take in any text and will play it on a media player that supports to play media. We have tested this on Sonos, Chromecast, and Google Home.

[https://www.youtube.com/watch?v=Ke0QuoJ4tRM](https://www.youtube.com/watch?v=Ke0QuoJ4tRM)

## Call for help with HASSbian (our Raspberry Pi image)
In an effort to make Home Assistant, we're planning to extend the things that people can do out of the box with HASSbian, our Raspberry Pi image. As you might know, the image is currently maintained by [@Landrash]. However he also spends a lot of time on improving the docs and helping out with a ton of other things.

So if you know your Linux-foo and would love to contribute to open source, join the [developer chat][discord-devs] and take a stab at one of [our open issues](https://github.com/home-assistant/pi-gen/issues).

## VLC media player, Broadlink, and GPSLogger
Let you control [VLC media player][vlc-media] and  play sound on connected speakers.

This Broadlink [switch][bl-switch] platform allow to you control Broadlink RM2 Pro and RM mini IR+RF devices. This Broadlink [sensor][bl-sensor] platform adds support for Broadlink RM2 and A1 Devices.

The [GPSLogger](/integrations/gpslogger) now also supports attributes as the speed, direction, altitude, provider, and activity.

## All changes
- Media player: Support for Sharp [AquaosTV][aquostv] ([@titilambert])
- Media player: [VLC][vlc-media] support ([@Danielhiversen])
- Switch: Digital Loggers relay([@dethpickle])
- Sensor: Support for [Netdata][netdata] ([@fabaff], [@ezar])
- Sensor: Support weather conditions from Austrian [ZAMG][zamg] ([@mjl])
- Verisure: Add Verisure smartcam capture service ([@turbokongen])
- Binary sensor: [Flic][flic] button support added ([@soldag])
- Sensor: Support for [Sense HAT][sensehat] ([@farminf])
- Binary sensor: [Hikvision][hikvision] binary sensor support ([@mezz64])
- [Text-to-speech][tts] support ([@pvizeli])
- Sensor: Support for Broadlink [sensors][bl-sensor] ([@Danielhiversen])
- Switch: Broadlink [switches][bl-switch] supported now ([@Danielhiversen])

- Media player: Add `source_list` to universal media player ([@danieljkemp])
- Binary Sensor: Support improvement for Wink ([@w1ll1am23])
- Sensor: More features for DSMR ([@aequitas])
- Automation: Parse payload as JSON ([@balloob])
- Mediap player - Cast: New progress indicator ([@balloob])
- Device tracker: New attributes ([@balloob], [@Danielhiversen])
- Binary sensor - netatmo: Add support for tags ([@jabesq])
- Climate: Add `away_mode` for RadioThermostat ([@trisk])
- Device tracker - nmap: Make scan option configurable ([@Danielhiversen])
- Climate - Ecobee: Add SmartAway option ([@devdelay])
- Light - Hue: Add support for Hue LightGroups ([@michaelarnauts])
- Media player - Emby: New support for trailer and media position ([@mezz64])
- Camera - Amcrest: Support for resolution ([@tchellomello])
- Media player - Kodi: Authentification fixed and fan art ([@balloob], [@joopert])
- Minor and not so minor features and bug fixes by [@pvizeli], [@jminn], [@magicus], [@teodoc], [@fabaff], [@technicalpickles], [@balloob], [@lukas-hetzenecker], [@rubund], [@dasos], [@trisk], [@armills], [@auduny], [@lwis], [@nkgilley], [@janLo], [@keatontaylor], [@stefan-jonasson], [@Jypy], [@jawilson], [@DavidLP], [@molobrakos], [@jabesq], [@joerocklin], [@kellerza], [@kirichkov], [@r-jordan] and [@danielperna84].

### Release 0.35.1 - December 18

Some issues have been reported with TTS that will be addressed by 0.35.1. The TTS component had issues linking the media player to the right media file if you were using Docker or SSL certificates. This can be fixed by exposing to your HTTP config what URL you use for hosting Home Assistant:

```yaml
http:
  base_url: example.duckdns.org
```

 - Fix exit hanging on OS X with async logging ([@balloob])
 - Fix text-to-speech clearing cache ([@pvizeli])
 - Allow setting a base API url in HTTP component ([@balloob])
 - Fix occasional errors in automation ([@pvizeli])

### Release 0.35.2 - December 19

 - When base url specified, do not combine it with `server_port` ([@balloob])

### Release 0.35.3 - December 23

 - Fix issue with voicerrs and post api ([@pvizeli])
 - Fix async component update on service calls ([@pvizeli])
 - Fix async log handle do not close ([@pvizeli])
 - Fix nest component with various KeyError exceptions ([@technicalpickles])

###  If you need help...
...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat][discord]. The release notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

###  Reporting Issues
Experiencing issues introduced by this release? Please report them in our [issue tracker](https://github.com/home-assistant/home-assistant/issues). Make sure to fill in all fields of the issue template.


[@r-jordan]: https://github.com/r-jordan
[@aequitas]: https://github.com/aequitas
[@armills]: https://github.com/armills
[@auduny]: https://github.com/auduny
[@balloob]: https://github.com/balloob
[@Danielhiversen]: https://github.com/Danielhiversen
[@danieljkemp]: https://github.com/danieljkemp
[@danielperna84]: https://github.com/danielperna84
[@dasos]: https://github.com/dasos
[@DavidLP]: https://github.com/DavidLP
[@dethpickle]: https://github.com/dethpickle
[@devdelay]: https://github.com/devdelay
[@ezar]: https://github.com/ezar
[@fabaff]: https://github.com/fabaff
[@farminf]: https://github.com/farminf
[@jabesq]: https://github.com/jabesq
[@janLo]: https://github.com/janLo
[@jawilson]: https://github.com/jawilson
[@jminn]: https://github.com/jminn
[@joerocklin]: https://github.com/joerocklin
[@joopert]: https://github.com/joopert
[@Jypy]: https://github.com/Jypy
[@keatontaylor]: https://github.com/keatontaylor
[@kellerza]: https://github.com/kellerza
[@kirichkov]: https://github.com/kirichkov
[@Landrash]: https://github.com/Landrash
[@lukas-hetzenecker]: https://github.com/lukas-hetzenecker
[@lwis]: https://github.com/lwis
[@magicus]: https://github.com/magicus
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@mezz64]: https://github.com/mezz64
[@michaelarnauts]: https://github.com/michaelarnauts
[@mjl]: https://github.com/mjl
[@molobrakos]: https://github.com/molobrakos
[@nkgilley]: https://github.com/nkgilley
[@pvizeli]: https://github.com/pvizeli
[@rubund]: https://github.com/rubund
[@soldag]: https://github.com/soldag
[@stefan-jonasson]: https://github.com/stefan-jonasson
[@tchellomello]: https://github.com/tchellomello
[@technicalpickles]: https://github.com/technicalpickles
[@teodoc]: https://github.com/teodoc
[@titilambert]: https://github.com/titilambert
[@trisk]: https://github.com/trisk
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23

[vlc-media]: /integrations/vlc
[aquostv]: /integrations/aquostv
[digitalloggers]: /integrations/digitalloggers
[netdata]: /integrations/netdata
[bl-sensor]: /integrations/broadlink#sensor
[bl-switch]: /integrations/broadlink#switch
[hikvision]: /integrations/hikvision
[zamg]: /integrations/zamg#sensor
[flic]: /integrations/flic
[sensehat]: /integrations/sensehat/
[tts]: /integrations/tts/
[discord]: https://discord.gg/c5DvZ4e
[discord-devs]: https://discord.gg/8X8DTH4
