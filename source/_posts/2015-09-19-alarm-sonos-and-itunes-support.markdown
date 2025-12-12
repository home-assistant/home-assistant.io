---
title: "Alarms, Sonos and iTunes now supported"
description: "Home Assistant 0.7.3 has been released with support for Sonos, iTunes and improved ."
date: 2015-09-19 21:47:00 0000
date_formatted: "September 19, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

It's like someone opened a can of rock solid developers and emptied it above our [chat channel](https://discord.gg/c5DvZ4e) because it exploded with great conversations and solid contributions. Featured in release 0.7.3: Sonos, iTunes, Alarm component and Automation upgrade.

See [GitHub](https://github.com/home-assistant/home-assistant/releases/tag/0.7.3) for more detailed release notes.

_Migration note: the `scheduler` component has been removed in favor of the `automation` component._

__Sonos__
<img src='/images/supported_brands/sonos.png' style='border:none; box-shadow: none; float: right;' height='50' /> Sonos support has been added by [@rhooper](https://github.com/rhooper) and [@SEJeff](https://github.com/SEJeff). Home Assistant is now able to automatically detect Sonos devices in your network and set them up for you. It will allow you to control music playing on your Sonos and change the volume.

__iTunes and airplay speakers__
<img src='/images/supported_brands/itunes.png' style='border:none; box-shadow: none; float: right;' height='50' /> [@maddox](https://github.com/maddox) has contributed support for controlling iTunes and airplay speakers. For this to work you will have to run [itunes-api](https://github.com/maddox/itunes-api) on your Mac as middleware.

```yaml
# Example configuration.yaml entry
media_player:
  platform: itunes
  name: iTunes
  host: http://192.168.1.50
  port: 8181
```

<!--more-->

__Automation__
Automation has gotten a lot of love. It now supports conditions, multiple triggers and new types of triggers. The best to get started with it is to head over to the new [getting started with automation](/getting-started/automation/) page.

```yaml
# Example of entry in configuration.yaml
automation:
  alias: "Light on in the evening"
  trigger:
    - platform: sun
      event: sunset
      offset: "-01:00:00"
    - platform: state
      entity_id: all
      state: home
  condition:
    - platform: state
      entity_id: all
      state: home
    - platform: time
      after: "16:00:00"
      before: "23:00:00"
  action:
    service: homeassistant.turn_on
    target:
      entity_id: group.living_room
```

__Verisure Alarms__
<img src='/images/supported_brands/verisure.png' style='border:none; box-shadow: none; float: right;' height='50' /> We now support arming and disarming your verisure alarm from within Home Assistant thanks to added support by [@persandstrom](https://github.com/persandstrom).
