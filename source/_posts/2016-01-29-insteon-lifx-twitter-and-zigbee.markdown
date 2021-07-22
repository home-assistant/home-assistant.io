---
title: "0.12: Insteon, LIFX, Twitter and Zigbee"
description: "Home Assistant 0.12 brings improved organizational tools and makes writing automation in Python easier."
date: 2016-01-30 00:22:00 -0800
date_formatted: "January 30, 2016"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
og_image: /images/blog/2016-01-release-12/social.png
---

Another sprint has come to an end and it seems that we have not slowed down a single bit 🚀. 0.12 is full of new components, platforms and organizational additions.

I would like to give a shout out to [Greg Dowling (@pavoni)][@pavoni] as every release includes new work from him. He is constantly adding support for new platforms or improving the reliability of existing components and platforms. Keep up the good work!

This release includes a very frequent requested feature: the ability to organize entities in different tabs in the frontend. See [the demo] to see this in action and read more in the [group documentation][group] how to get started.

<p class='img'>
<a href='/demo/'><img src='/images/blog/2016-01-release-12/views.png'></a>
Example of the new views in the frontend. <a href='/integrations/group/'>Learn more.</a>
</p>

<img src='/images/supported_brands/insteon.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/lifx.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/twitter.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/zigbee.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

 - Binary sensor: [command sensor] added ([@Bart274])
 - [Nest] support extended to include sensors and binary sensors ([@joshughes])
 - Light: [LIFX] platform added ([@TangoAlpha])
 - Notify: [Twitter] platform added ([@HydrelioxGitHub])
 - Sensor: [Template] platform added ([@pavoni])
 - Switch: [Wink] platform now supports sirens ([@w1ll1am23])
 - [Insteon hub] support added ([@FreekingDean])
 - [Statsd] component added ([@michaelkuty])
 - Light: [Rfxtrx] platform now supports dimming ([@turbokongen])
 - Time scheduling (including [time automation]) now works with intervals (ie. `/5`) ([@kennedyshead])
 - Sensor: [onewire] support added ([@deisi])
 - [Zigbee] support added ([@flyte])
 - Device Tracker: [OwnTracks] can now track iBeacons ([@pavoni])
 - Notify: Google Voice SMS platform added ([@w1ll1am23])
 - Toggle service added to `homeassistant`, `switch`, `light` and `media_player` ([@rmkraus])
 - [Thermostat] services added to control fans ([@auchter])
 - Improved Python automation: Event helpers are now also available as decorators for custom components ([@rmkraus])
 - Frontend: support added for tabs to show [different views][group] of your house ([@balloob])
 - Bugfixes by [@molobrakos], [@MartinHjelmare], [@pavoni], [@trollkarlen], [@zmrow], [@maddox], [@persandstrom], [@happyleavesaoc], [@balloob], [@fabaff], [@stefan-jonasson], [@haraldnagel].

[the demo]: /demo/
[command sensor]: /integrations/command_line/
[Insteon hub]: /integrations/insteon/
[LIFX]: /integrations/lifx
[Nest]: /integrations/nest/
[onewire]: /integrations/onewire
[OwnTracks]: /integrations/owntracks
[Rfxtrx]: /integrations/rfxtrx#lights
[Statsd]: /integrations/statsd/
[Template]: /integrations/template
[Thermostat]: /integrations/climate/
[time automation]: /getting-started/automation-trigger/#time-trigger
[Twitter]: /integrations/twitter
[Wink]: /integrations/wink/
[Zigbee]: /integrations/zigbee/
[group]: /integrations/group/
[@auchter]: https://github.com/auchter
[@balloob]: https://github.com/balloob
[@Bart274]: https://github.com/Bart274
[@deisi]: https://github.com/deisi
[@fabaff]: https://github.com/fabaff
[@flyte]: https://github.com/flyte
[@FreekingDean]: https://github.com/FreekingDean
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@haraldnagel]: https://github.com/haraldnagel
[@HydrelioxGitHub]: https://github.com/HydrelioxGitHub
[@joshughes]: https://github.com/joshughes
[@kennedyshead]: https://github.com/kennedyshead
[@maddox]: https://github.com/maddox
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@michaelkuty]: https://github.com/michaelkuty
[@molobrakos]: https://github.com/molobrakos
[@pavoni]: https://github.com/pavoni
[@persandstrom]: https://github.com/persandstrom
[@rmkraus]: https://github.com/rmkraus
[@stefan-jonasson]: https://github.com/stefan-jonasson
[@TangoAlpha]: https://github.com/TangoAlpha
[@trollkarlen]: https://github.com/trollkarlen
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23
[@zmrow]: https://github.com/zmrow

### Backwards incompatible changes
 - Nest config has moved from thermostat to the [Nest component][Nest].
 - Entity IDs for Z-Wave devices are now generated in a deterministic way causing all IDs to change starting this release. This is a one time change. [(Changed again in 0.31)](/blog/2016/10/22/flash-briefing-updater-hacktoberfest/)
