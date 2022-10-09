---
title: "0.13: Speedtest.net, Bloomsky, Splunk and Garage Doors"
description: "Home Assistant 0.13 brings test coverage to a whopping 90% and adds a whole bunch of new components."
date: 2016-02-13 22:15:00 UTC
date_formatted: "February 13, 2016"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
og_image: /images/blog/2016-02-release-13/social-img.png
---

The focus of 0.13 was on test coverage, big cheers to [@rmkraus] for his hard work on this. I'm proud to announce that we've hit the 90% test coverage of the core + important components. A big milestone for the project.

<p class='img'>
  <img src='/images/blog/2016-02-release-13/input_select__input_boolean__weblink.png'>
  Examples of the new [input_select] and weblink components.
</p>

Not only did we gain a lot of test coverage, we also attracted a lot of new developers that contributed a variety of components and platforms:

<img src='/images/supported_brands/speedtest.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='70' /><img src='/images/supported_brands/apcupsd.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/splunk.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/bloomsky.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/ubiquiti.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/networx.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/samsung.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

 - Core: Add service to restart Home Assistant ([@rmkraus])
 - Core: Allow device to report as unavailable ([@MartinHjelmare])
 - Core: Allow overriding polling interval in platforms and via config ([@balloob])
 - Frontend: support for a [default view] have been added to replace the show all view ([@balloob])
 - Component: Added [apcupsd] component ([@flyte])
 - Component: Added component to log values to [Splunk] ([@miniconfig])
 - Component: Added [garage door] component including [Wink] support ([@xrolfex])
 - Component: Added [input_select] component ([@balloob])
 - Component: Added [proximity] component to track people closest to a location ([@nickwaring], [@Bart274] )
 - Component: Added support for [Bloomsky Weather Station] ([@haraldnagel])
 - Component: Added support for pushing stats to [graphite] ([@kk7ds])
 - Component: Added support for [SCSGate] devices ([@flavio])
 - Component: Added weblink component to link to other pages ([@MagnusKnutas])
 - Component: Support for Ubiquiti mFI [sensors][mfi.sensor] and [switchable devices][mfi.switch] added ([@kk7ds])
 - Alarm control panel: Added [Caddx/GE/Interlogix NetworX][nx584] support ([@kk7ds])
 - Camera: [MJPEG] camera's will now show real stream instead of a 2fps stream ([@stjohnjohnson])
 - Camera: Added [Unifi video cameras][unifi] support ([@kk7ds])
 - Device Tracker: [Aruba] platform now uses SSH instead of telnet ([@carlosmgr])
 - History: Show correct graphs for thermostats ([@sdague])
 - Light: Added [MySensors] support ([@MartinHjelmare])
 - Lock: Added [Verisure] support ([@turbokongen])
 - Media Player: Added [Samsung TV] support ([@stefan-jonasson])
 - Media Player: Added [Snapcast] support ([@happyleavesaoc])
 - MQTT: Allow using templates in [publish service][mqtt-publish] ([@flyte])
 - Notify: Added [REST] support ([@Theb-1])
 - Sensor: Added [Speedtest.net] support ([@nkgilley])
 - Switch: Added [template] platform ([@pavoni])
 - Thermostat: Support for [Honeywell] in the US added ([@kk7ds])
 - Z-Wave: Allow [configuring polling][zwave-polling] and [support scenes][zwave-scene] ([@lukas-hetzenecker])
 - Bug fixes and improvements by [@persandstrom], [@fabaff], [@balloob], [@pavoni], [@philipbl], [@MartinHjelmare], [@rmkraus], [@molobrakos], [@lukas-hetzenecker], [@TangoAlpha], [@deisi], [@Danielhiversen], [@roqeer], [@jaharkes]

[@rmkraus]: https://github.com/rmkraus/
[@MartinHjelmare]: https://github.com/MartinHjelmare/
[@balloob]: https://github.com/balloob/
[@flyte]: https://github.com/flyte/
[@miniconfig]: https://github.com/miniconfig/
[@xrolfex]: https://github.com/xrolfex/
[@nickwaring]: https://github.com/nickwaring/
[@Bart274]: https://github.com/Bart274/
[@haraldnagel]: https://github.com/haraldnagel/
[@kk7ds]: https://github.com/kk7ds/
[@flavio]: https://github.com/flavio/
[@MagnusKnutas]: https://github.com/MagnusKnutas/
[@stjohnjohnson]: https://github.com/stjohnjohnson/
[@carlosmgr]: https://github.com/carlosmgr/
[@sdague]: https://github.com/sdague/
[@turbokongen]: https://github.com/turbokongen/
[@stefan-jonasson]: https://github.com/stefan-jonasson/
[@happyleavesaoc]: https://github.com/happyleavesaoc/
[@Theb-1]: https://github.com/Theb-1/
[@nkgilley]: https://github.com/nkgilley/
[@pavoni]: https://github.com/pavoni/
[@lukas-hetzenecker]: https://github.com/lukas-hetzenecker/
[@persandstrom]: https://github.com/persandstrom/
[@fabaff]: https://github.com/fabaff/
[@philipbl]: https://github.com/philipbl/
[@molobrakos]: https://github.com/molobrakos/
[@TangoAlpha]: https://github.com/TangoAlpha/
[@deisi]: https://github.com/deisi/
[@Danielhiversen]: https://github.com/Danielhiversen/
[@roqeer]: https://github.com/roqeer/
[@jaharkes]: https://github.com/jaharkes/
[default view]: /integrations/group/
[apcupsd]: /integrations/apcupsd/
[Splunk]: /integrations/splunk/
[garage door]: /integrations/cover/
[Wink]: /integrations/wink/#cover
[input_select]: /integrations/input_select/
[proximity]: /integrations/proximity/
[Bloomsky Weather Station]: /integrations/bloomsky/
[graphite]: /integrations/graphite/
[SCSGate]: /integrations/scsgate/
[mfi.switch]: /integrations/mfi#switch
[mfi.sensor]: /integrations/mfi#sensor
[nx584]: /integrations/nx584
[MJPEG]: /integrations/mjpeg
[unifi]: /integrations/uvc
[Aruba]: /integrations/aruba
[History]: /integrations/history/
[MySensors]: /integrations/light.mysensors/
[Verisure]: /integrations/verisure
[Speedtest.net]: /integrations/speedtestdotnet
[Samsung TV]: /integrations/samsungtv
[Snapcast]: /integrations/snapcast
[mqtt-publish]: /integrations/mqtt/#publish-service
[REST]: /integrations/notify.rest/
[template]: /integrations/switch.template/
[Honeywell]: /integrations/honeywell/
[zwave-polling]: /integrations/zwave/#configuration
[zwave-scene]: /integrations/zwave/#events
