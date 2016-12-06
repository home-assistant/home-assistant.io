---
layout: page
title: "Your First Automation"
description: "Step by step guiding through making your first automation."
date: 2016-04-24 08:30 +0100
sidebar: true
comments: false
sharing: true
footer: true
---

Before we dive deeper into what every piece of automation _can_ do, let's look at a simple automation rule: **Turn on the lights when the sun sets**

In this example, we are defining a trigger to track the sunset and tell it to fire when the sun is setting. When this event is triggered, the service `light.turn_on` is called without any parameters. Because we specify no parameters, it will turn on all the lights.

```yaml
# Example configuration.yaml entry
automation:
  alias: Turn on light when sun sets
  initial_state: True
  hide_entity: False
  trigger:
    platform: sun
    event: sunset
  action:
    service: light.turn_on
```

Starting with 0.28 automation rules can be reloaded from the [frontend](/components/automation/) and are shown by default. With [`hide_entity:`](/components/automation/) you can control this behaviour. It's very handy if you are working on your rules but when a rule is finished and you don't want to see that rule in your frontend, you can set `hide_entity:` to `True`. To set an automation to be disabled when HASS starts set `initial_state:` to `False`. 

After a few days of running this automation rule, you come to realize that this automation rule is not good enough. It was already dark when the lights went on and the one day you weren't home, the lights turned on anyway. Time for some tweaking. Let's add an offset to the sunset trigger and a condition to only turn on the lights if anyone is home.

```yaml
# Example configuration.yaml entry
automation:
  alias: Turn on light when sun sets
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

Now you're happy and all is good. You start to like this automation business and buy some more lights, this time you put them in the bedroom. But what you now realize is that when the sun is setting, the lights in the bedroom are also being turned on! Time to tweak the automation to only turn on the living room lights.

The first thing you do is to look at the entities in the developer tools (second icon) in the app. You see the names of your lights and you write them down: `light.table_lamp`, `light.bedroom`, `light.ceiling`.

Instead of hard coding the entity IDs of the lights in the automation rule, we will set up a group. This will allow us to see the living room separate in the app and be able to address it from automation rules.

So we tweak the config to add the group and have the automation rule only turn on the group.

```yaml
# Example configuration.yaml entry
group:
  living_room:
    - light.table_lamp
    - light.ceiling

automation:
  alias: Turn on light when sun sets
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

Christmas is coming along and you decide to buy a remote switch to control the Christmas lights from Home Assistant. You can't claim to live in the house of the future if you're still manually turning on your Christmas lights!

We hook the switch up to Home Assistant and grab the entity ID from the developer tools: `switch.christmas_lights`. We will update the group to include the switch and will change our action. We are no longer able to call `light.turn_on` because we also want to turn on a switch. This is where `homeassistant.turn_on` comes to the rescue. This service is capable of turning any entity on.

```yaml
# Example configuration.yaml entry
group:
  living_room:
    - light.table_lamp
    - light.ceiling
    - switch.christmas_lights

automation:
  alias: Turn on light when sun sets
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

### {% linkable_title Learn more %}

 - [Triggers]
 - [Conditions]
 - [Actions]
 - [Templating] (advanced)

[Triggers]: /getting-started/automation-trigger/
[Conditions]: /getting-started/automation-condition/
[Actions]: /getting-started/automation-action/
[Templating]: /getting-started/automation-templating/
