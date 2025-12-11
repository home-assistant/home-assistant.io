---
title: "Home Assistant goes geo with OwnTracks"
description: "Home Assistant 0.7.4 has been released with support for OwnTracks and geofencing."
date: 2015-10-05 21:49:00 0000
date_formatted: "October 5, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
og_image: /images/screenshots/map.png
---

A few weeks have past and it is time again for another release: version 0.7.4. This time we're very glad to be able to introduce brand new integration with OwnTracks to allow tracking of people on a map. The geo support consists of three different parts:

 - [OwnTracks platform for the device tracker][platform-owntracks] to get locations for devices
 - Brand new [zone component][component-zone] to define zones to identify locations and [trigger automation][zone-automation]
 - A map in the UI to see all this ([see it in action in the demo](/demo/))

We have added a new [getting started section][start-presence] to get up and running.

[platform-owntracks]: /integrations/owntracks
[component-zone]: /integrations/zone/
[zone-automation]: /getting-started/automation-trigger/#zone-trigger
[start-presence]: /getting-started/presence-detection/

<p class='img'>
<img src='/images/screenshots/map.png' />
Map in Home Assistant showing two people and three zones (home, school, work)
</p>

Ofcourse more things happened in the last three weeks. I'm moving away from my usual long post to a short summary of highlights:

<a href='/integrations/plex#media-player'>
<img src='/images/supported_brands/plex.png' style='border:none; box-shadow: none; float: right;' height='50' />
</a>

 - Sensor: [rest platform](/integrations/rest) added ([@fabaff](https://github.com/fabaff))
 - Alarm Control Panel: [MQTT platform](/integrations/alarm_control_panel.mqtt/) added ([@sfam](https://github.com/sfam))
 - Media Player: [Plex platform](/integrations/plex#media-player) added ([@miniconfig](https://github.com/miniconfig, [@adrienbrault](https://github.com/adrienbrault))
 - Dev Tools: services can now show description of fields ([@balloob](https://github.com/balloob))
 - MQTT: Support for certificates and improved error reporting ([@balloob](https://github.com/balloob))
 - Light: [limitlessled platform](/integrations/limitlessled) extended with white light support ([@auchter](https://github.com/auchter))
 - Fuzzy matching for scenes ([@pavoni](https://github.com/pavoni))
 - Scene support for media player ([@maddox](https://github.com/maddox))
