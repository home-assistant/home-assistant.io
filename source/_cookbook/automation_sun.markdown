---
layout: page
title: "Examples using the sun"
description: "Automation examples that use the sun."
date: 2015-10-08 19:05
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

#### {% linkable_title Turn on the living room lights 45 minutes before sunset if anyone is at home  %}

```yaml
automation:
  trigger:
    platform: sun
    event: sunset
    offset: "-00:45:00"
  condition:
    condition: state
    entity_id: group.all_devices
    state: home
  action:
    service: homeassistant.turn_on
    entity_id: group.living_room_lights
```

#### {% linkable_title Natural wake up light  %}

_Note, Philips Hue and LIFX are currently the only light platforms that support transitions._

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    service: light.turn_on
    entity_id: light.bedroom
    data:
      # 900 seconds = 15 minutes
      transition: 900
```

#### {% linkable_title Send sun rise/sun set notifications %}

Send notifications through [PushBullet](/components/notify.pushbullet/) when the sun state is changed.

```yaml
automation:
  - alias: 'Send notification when sun rises'
    trigger:
      platform: sun
      event: sunrise
      offset: '+00:00:00'
    action:
      service: notify.pushbullet
      data:
        message: 'The sun is up.'
  - alias: 'Send notification when sun sets'
    trigger:
      platform: sun
      event: sunset
      offset: '+00:00:00'
    action:
      service: notify.pushbullet
      data:
        message: 'The sun is down.'
```

#### {% linkable_title Automations for lights and blinds based on solar elevation %}

Solar elevation automations can cope with offsets from sunset / sunrise as the seasons change better than using a time based offsets.

```yaml
- alias: 'Turn a few lights on when the sun gets dim'
  trigger:
    platform: numeric_state
    entity_id: sun.sun
    value_template: '{% raw %}{{ state.attributes.elevation }}{% endraw %}'
    below: 3.5
  action:
    service: scene.turn_on
    entity_id: scene.background_lights

- alias: 'Turn more lights on as the sun gets dimmer'
  trigger:
    platform: numeric_state
    entity_id: sun.sun
    value_template: '{% raw %}{{ state.attributes.elevation }}{% endraw %}'
    below: 1.5
  action:
    service: scene.turn_on
    entity_id: scene.more_lights

- alias: 'Close blind at dusk'
  trigger:
    platform: numeric_state
    entity_id: sun.sun
    value_template: '{% raw %}{{ state.attributes.elevation }}{% endraw %}'
    below: -2.5
  action:
    service: switch.turn_off
    entity_id: switch.blind

```
