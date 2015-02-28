---
layout: page
title: "Automation"
description: "Instructions how to setup automation within Home Assistant."
date: 2015-01-20 22:36
sidebar: false
comments: false
sharing: true
footer: true
---

This page will talk about automating Home Assistant using the `automation` component. For more advanced ways of automation, see the [create a component]({{site_root}}/developers/creating_components.html) page.

Each part of automation consists of two parts: the trigger part and the action part. The final result will look something like this:

```
automation:
  # Optional alias that the logs will use to refer to the entry
  alias: Sunset notification

  # Type of trigger and informatino for the trigger
  platform: state
  state_entity_id: sun.sun
  state_from: above_horizon
  state_to: below_horizon

  # Action to be done when trigger activated
  execute_service: notify.notify
  service_data: {"message":"The sun has set"}
```

## Setting up triggers

#### Time-based automation
This allows you to trigger actions whenever the time matches your filter. You can setup filters to match on hours, minutes and seconds. Any filter that you omit will match all values. 

Here are some example values:

```
  # Match at the start of every hour
  platform: time
  time_minutes: 0
  time_seconds: 0

  # Match at 4pm
  platform: time
  time_hours: 16
  time_minutes: 0
  time_seconds: 0
```

#### State-based automation
This allows you to trigger actions based on state changes of any entity within Home Assistant. You can omit the `state_from` and `state_to` to match all.

```
# Match when the sun sets
  platform: state
  state_entity_id: sun.sun
  state_from: above_horizon
  state_to: below_horizon

  # Match when a person comes home
  platform: state
  state_entity_id: device_tracker.Paulus_OnePlus_One
  state_from: not_home
  state_to: home

  # Match when a light turns on
  platform: state
  state_entity_id: light.Ceiling
  state_from: off
  state_to: on
```

## Setting up the action

Currently the only supported action is calling a service. Services are what devices expose to be controlled, so this will allow us to control anything that Home Assistant can control.

```
  # Turn the lights Ceiling and Wall on.
  execute_service: light.turn_on
  service_entity_id: light.Ceiling,light.Wall

  # Turn the lights Ceiling and Wall on and turn them red.
  execute_service: light.turn_on
  service_entity_id: light.Ceiling,light.Wall
  service_data: {"rgb_color": [255, 0, 0]}

  # Notify the user
  execute_service: notify.notify
  service_data: {"message":"YAY"}
```

## Putting it all together
For every combination of a trigger and an action we will have to combine the configuration lines and add it to an `automation` component entry in `configuration.yaml`. You can add an optional `alias` key to the configuration to make the logs more understandable. To setup multiple entries, append 2, 3 etc to the section name. An example of a `configuration.yaml` file:

```
automation:
  alias: Sunset notification

  platform: state
  state_entity_id: sun.sun
  state_from: above_horizon
  state_to: below_horizon

  execute_service: notify.notify
  service_data: {"message":"The sun has set"}

automation 2:
  alias: Turn lights off at 8am in the morning

  platform: time
  time_hours: 8
  time_minutes: 0
  time_seconds: 0

  execute_service: light.turn_off

automation 3:
  alias: Turn lights in study room on when Paulus comes home

  platform: state
  state_entity_id: device_tracker.Paulus_OnePlus
  state_from: not_home
  state_to: home

  execute_service: homeassistant.turn_on
  service_entity_id: group.Study_Room
```

<p class='note'>
All configuration entries have to be sequential. If you have <code>automation:</code>, <code>automation 2:</code> and <code>automation 4:</code> then the last one will not be processed. 
</p>
