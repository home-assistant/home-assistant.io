---
title: "Examples using the sun"
description: "Automation examples that use the sun."
ha_category: Automation Examples
---

#### Turn on the living room lights 45 minutes before sunset if anyone is at home

```yaml
automation:
  trigger:
    platform: sun
    event: sunset
    offset: "-00:45:00"
  condition:
    condition: state
    entity_id: all
    state: home
  action:
    service: light.turn_on
    target:
      entity_id: group.living_room_lights
```

#### Natural wake up light

_Note, Philips Hue and LIFX are currently the only light platforms that support transitions._

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    service: light.turn_on
    target:
      entity_id: light.bedroom
    data:
      # 900 seconds = 15 minutes
      transition: 900
```

#### Send sun rise/sun set notifications

Send notifications through [PushBullet](/integrations/pushbullet) when the sun state is changed.

```yaml
automation:
  - alias: "Send notification when sun rises"
    trigger:
      platform: sun
      event: sunrise
      offset: "+00:00:00"
    action:
      service: notify.pushbullet
      data:
        message: "The sun is up."
  - alias: "Send notification when sun sets"
    trigger:
      platform: sun
      event: sunset
      offset: "+00:00:00"
    action:
      service: notify.pushbullet
      data:
        message: "The sun is down."
```

#### Automations for lights and blinds based on solar elevation

Solar elevation automations can cope with offsets from sunset / sunrise as the seasons change better than using a time based offsets.

{% raw %}

```yaml
- alias: "Turn a few lights on when the sun gets dim"
  trigger:
    platform: numeric_state
    entity_id: sun.sun
    value_template: "{{ state_attr('sun.sun', 'elevation') }}"
    below: 3.5
  action:
    service: scene.turn_on
    target:
      entity_id: scene.background_lights

- alias: "Turn more lights on as the sun gets dimmer"
  trigger:
    platform: numeric_state
    entity_id: sun.sun
    value_template: "{{ state_attr('sun.sun', 'elevation') }}"
    below: 1.5
  action:
    service: scene.turn_on
    target:
      entity_id: scene.more_lights

- alias: "Close blind at dusk"
  trigger:
    platform: numeric_state
    entity_id: sun.sun
    value_template: "{{ state_attr('sun.sun', 'elevation') }}"
    below: -2.5
  action:
    service: switch.turn_off
    target:
      entity_id: switch.blind
```

{% endraw %}