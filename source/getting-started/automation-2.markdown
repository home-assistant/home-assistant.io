---
layout: page
title: "Your second Automation"
description: "Step by step guiding through making your second automation."
date: 2016-04-24 08:30 +0100
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/automation-create-first/
---

After the scratch on the Automation surface, let's dive deeper and create the automation rule: **Turn on the lights when the sun sets**

We are defining a [trigger](/docs/automation/trigger/) to track the sunset and tell it to fire when the sun is setting. When this event is triggered, the service `light.turn_on` is called without any parameters. Because we specify no parameters, it will turn on all the lights.

```yaml
# Example configuration.yaml entry
automation:
  alias: Turn on the lights when the sun sets
  initial_state: True
  hide_entity: False
  trigger:
    platform: sun
    event: sunset
  action:
    service: light.turn_on
```

Starting with 0.28 automation rules can be reloaded from the [frontend](/components/automation/) and are shown by default. With [`hide_entity:`](/components/automation/) you can control this behavior. It's convenient if you are working on your rules, but when a rule is finished, and you don't want to see that rule in your frontend, you can set `hide_entity:` to `True`. To set an automation to be disabled when Home Assistant starts set `initial_state:` to `False`.

After a few days of running this automation rule, you come to realize that this automation rule is not sufficient. It was already dark when the lights went on, and the one day you weren't home, the lights turned on anyway. Time for some tweaking. Let's add an offset to the sunset trigger and a [condition](/docs/automation/condition/) to only turn on the lights if anyone is home.

```yaml
# Example configuration.yaml entry
automation:
  alias: Turn on the lights when the sun sets
  trigger:
    platform: sun
    event: sunset
    offset: "-01:00:00"
  condition:
    condition: state
    entity_id: group.all_devices
    state: 'home'
  action:
    service: light.turn_on
```

Now you're happy, and all is good. You start to like this automation business and buy some more lights, this time you put them in the bedroom. But what you now realize is that when the sun is setting, the lights in the bedroom are also being turned on! Time to tweak the automation to only turn on the living room lights.

The first thing you do is to look at the entities in the developer tools (second icon) in the app. You see the names of your lights, and you write them down: `light.table_lamp`, `light.bedroom`, `light.ceiling`.

Instead of hard coding the entity IDs of the lights in the automation rule, we will set up a group. This will allow us to see the living room separate in the app and be able to address it from automation rules.

So we tweak the config to add the group and have the automation rule only turn on the group.

```yaml
# Example configuration.yaml entry
group:
  living_room:
    - light.table_lamp
    - light.ceiling

automation:
  alias: Turn on the light when the sun sets
  trigger:
    platform: sun
    event: sunset
    offset: "-01:00:00"
  condition:
    condition: state
    entity_id: group.all_devices
    state: 'home'
  action:
    service: light.turn_on
    entity_id: group.living_room
```

Christmas is coming along, and you decide to buy a remote switch to control the Christmas lights from Home Assistant. You can't claim to live in the house of the future if you're still manually turning on your Christmas lights!

We hook the switch up to Home Assistant and grab the entity ID from the developer tools: `switch.christmas_lights`. We will update the group to include the switch and will change our [action](/docs/automation/action/). We are no longer able to call `light.turn_on` because we also want to turn on a switch. This is where `homeassistant.turn_on` comes to the rescue. This service is capable of turning on any entity.

```yaml
# Example configuration.yaml entry
group:
  living_room:
    - light.table_lamp
    - light.ceiling
    - switch.christmas_lights

automation:
  alias: Turn on the lights when the sun sets
  hide_entity: True
  trigger:
    platform: sun
    event: sunset
    offset: "-01:00:00"
  condition:
    condition: state
    entity_id: group.all_devices
    state: 'home'
  action:
    service: homeassistant.turn_on
    entity_id: group.living_room
```

### [Next step: Presence detection &raquo;](/getting-started/presence-detection/)
