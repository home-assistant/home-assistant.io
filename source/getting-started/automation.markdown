---
layout: page
title: "Automating Home Assistant"
description: "Steps to help you get automation setup in Home Assistant."
date: 2015-09-19 09:40
sidebar: false
comments: false
sharing: true
footer: true
---

When all your devices are set up it's time to put the cherry on the pie: automation. Home Assistant
offers [a few built-in automations](/components/#automation) but mainly you'll be using
[the automation component](/components/automation.html) to set up your own rules.

### {% linkable_title The basics of automation %}

Every automation rule consists of triggers, an action to be performed and optional conditions.

Triggers can be anything observed in Home Assistant. For example, it can be a certain point in time
or a person coming home, which can be observed by the state changing from `not_home` to `home`.

Actions will call services within Home Assistant. For example, turn a light on, set the temperature
on your thermostat or activate a scene.

Conditions are used to prevent actions from firing unless certain conditions are met. For example,
it is possible to only turn on the light if someone comes home and it is after a certain point in
time.

The difference between a condition and a trigger can be confusing. The difference is that the trigger
looks at the event that is happening, ie a car engine turning on. Conditions looks at the current state
of the system, ie is the car engine on.

### {% linkable_title Exploring the internal state %}

Automation rules are based on the internal state of Home Assistant. This is available for exploring
in the app using the developer tools. The first icon will show you the available services and the
second icon will show you the current devices.

Each device is represented in Home Assistant as an entity consisting of the following parts:

| Name | Description | Example |
| ---- | ----- | ---- |
| Entity ID | Unique identifier for the entity. | `light.kitchen`
| State | The current state of the device. | `home`
| Attributes | Extra data related to the device and/or current state. | `brightness`

A service can be called to have Home Assistant perform an action. Turn on a light, run a script or
enable a scene. Each service has a domain and a name. For example the service `light.turn_on` is
capable of turning on any light device in your system. Services can be passed parameters to for
example tell which device to turn on or what color to use.

## {% linkable_title Creating your first automation rule %}

Before we dive deeper into what every piece of automation _can_ do, let's look at a simple automation
rule: **Turn on the lights when the sun sets**

In this example, we are defining a trigger to track the sunset and tell it to fire when the sun is
setting. When this event is triggered, the service `light.turn_on` is called without any
parameters. Because we specify no parameters, it will turn on all the lights.

```yaml
# Example configuration.yaml entry
automation:
  alias: Turn on light when sun sets
  trigger:
    platform: sun
    event: sunset
  action:
    service: light.turn_on
```

After a few days of running this automation rule you come to realize that this automation rule is not
good enough. It was already dark when the lights went on and the one day you weren't home, the lights
turned on anyway. Time for some tweaking. Let's add an offset to the sunset trigger and a condition
to only turn on the lights if anyone is home.

```yaml
# Example configuration.yaml entry
automation:
  alias: Turn on light when sun sets
  trigger:
    platform: sun
    event: sunset
    offset: "-01:00:00"
  condition:
    platform: state
    entity_id: group.all_devices
    state: home
  action:
    service: light.turn_on
```

Now you're happy and all is good. You start to like this automation business and buy some more lights,
this time you put them in the bedroom. But what you now realize is that when the sun is setting, the
lights in the bedroom are also being turned on! Time to tweak the automation to only turn on the living
room lights.

The first thing you do is to look at the entities in the developer tools (second icon) in the app.
You see the names of your lights and you write them down: `light.table_lamp`, `light.bedroom`,
`light.ceiling`.

Instead of hard coding the entity ids of the lights in the automation rule, we will set up a group.
This will allow us to see the living room separate in the app and be able to address it from
automation rules.

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
    platform: state
    entity_id: group.all_devices
    state: home
  action:
    service: light.turn_on
    entity_id: group.living_room
```

Christmas is coming along and you decide to buy a remote switch to control the christmas lights from
Home Assistant. You can't claim to live in the house of the future if you're still manually turn on
your christmas lights!

We hook the switch up to Home Assistant and grab the entity id from the developer tools:
`switch.christmas_lights`. We will update the group to include the switch and will change our action.
We are no longer able to call `light.turn_on` because we also want to turn on a switch. This is
where `homeassistant.turn_on` comes to the rescue. This service is capable of turning any entity on.

```yaml
# Example configuration.yaml entry
group:
  living_room:
    - light.table_lamp
    - light.ceiling
    - switch.christmas_lights

automation:
  alias: Turn on light when sun sets
  trigger:
    platform: sun
    event: sunset
    offset: "-01:00:00"
  condition:
    platform: state
    entity_id: group.all_devices
    state: home
  action:
    service: homeassistant.turn_on
    entity_id: group.living_room
```

### {% linkable_title Further reading %}

We went over the basics of creating a home automation rule. From here no longer any hand holding,
go automate!

 - Learn about the available [automation triggers](/components/automation.html#triggers)
 - Learn about the available [automation conditions](/components/automation.html#conditions)
 - Learn about [scripts](/components/script.html) to help you trigger multiple actions and delays
 - Learn about [scenes](/components/scene.html) to help you set many entities at once to your liking
