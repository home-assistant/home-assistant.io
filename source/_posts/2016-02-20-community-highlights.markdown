---
title: Community Highlights
description: Another round-up of the amazing things from our community including Alexa Lightning skill and HomeKit integration.
date: 2016-02-20 01:06:00 -0800
date_formatted: "February 20, 2016"
author: Paulus Schoutsen
author_twitter: balloob
categories: Community Video
og_image: /images/blog/2016-02-community-highlights/part-of-the-thing.png
---

Home Assistant land has been busy and a lot of people have been creating awesome stuff.

### Home automation demo by Part of the Thing

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Mc_29EC3aZw" frameborder="0" allowfullscreen></iframe>
</div>

### Haaska - Alexa Skill Adapter for Home Assistant

Haaska allows you to control lights, switches, and scenes exposed by your Home Assistant instance using an Amazon Echo. This is different from our own [Alexa](/integrations/alexa/) component because it will teach the Amazon Echo directly about the devices instead of teaching it to talk to Home Assistant. It will not allow you to use custom sentences but it will allow you to skip the 'Ask Home Assistant' part when giving commands:

 - "Alexa, set kitchen to twenty percent"
 - "Alexa, turn on evening scene"
 - "Alexa, turn off bedroom light"

[Haaska on GitHub](https://github.com/auchter/haaska)

### Integrating Home Assistant with HomeKit

Contributor Maddox has created a plugin for HomeBridge, an open-source HomeKit bridge. This will allow you to control your home using Siri on your Apple devices. HomeBridge has recently restructured so you'll have to install the plugin separately with the homebridge-homeassistant npm package.

Example config.json entry to load Home Assistant:

```json
"platforms": [
    {
        "platform": "HomeAssistant",
        "name": "HomeAssistant",
        "host": "http://192.168.1.50:8123",
        "password": "xxx",
        "supported_types": ["light", "switch", "media_player", "scene"]
    }
]
```

[HomeBridge on GitHub](https://github.com/nfarina/homebridge)
[HomeBridge Home Assistant Plugin](https://github.com/maddox/homebridge-homeassistant)

### Custom alarm system with Home Assistant

User thaijames [describes in the Home Assistant forums](https://community.home-assistant.io/t/controlling-house-alarm-from-ha/67) how he has created his own NFC-based alarm system using Home Assistant, DIY components and Garfield dolls.

<p class='img'>
<img src='/images/blog/2016-02-community-highlights/garfield-nfc.png'>
Hold your NFC tag against the belly of Garfield to unlock the alarm.
</p>
