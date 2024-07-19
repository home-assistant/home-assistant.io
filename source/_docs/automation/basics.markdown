---
title: "Understanding automations"
description: "A breakdown of what an automation consists of."
---

All {% term automations %} are made up of a {% term trigger %} and an {% term action %}. Optionally combined with a {% term condition %}. Take for example the automation:

> When Paulus arrives home and it is after sunset: Turn the lights on in the living room.

We can break up this automation into the following three parts:

```text
(trigger)    When Paulus arrives home
(condition)  and it is after sunset:
(action)     Turn the lights on in the living room
```

The first part is the [trigger](/docs/automation/trigger/) of the automation rule. Triggers describe {% term events %} that should trigger the automation rule. In this case, it is a person arriving home, which can be observed in Home Assistant using {% term devices %}/{% term sensors %} by observing the state of Paulus changing from `not_home` to `home`.

The second part is the [condition](/docs/automation/condition/). Conditions are optional tests that can limit an automation rule to only work in your specific use cases. A condition will test against the current state of the system. This includes the current time, devices, people and other things like the sun. In this case, we only want to act when the sun has set.

The third part is the [action](/docs/automation/action/), which will be performed when a rule is triggered and all conditions are met. For example, it can turn a light on, set the temperature on your thermostat or activate a scene.

{% note %}
The difference between a condition and a trigger can be confusing as they are very similar. Triggers look at the actions, while conditions look at the current state: turning a light on versus a light being on.
{% endnote %}

## Exploring the internal state

Automation rules interact directly with the internal state of Home Assistant, so you'll need to familiarize yourself with it. Home Assistant exposes its current state via the developer tools. These are available at the bottom of the sidebar in the frontend. **{% my developer_states title="Developer Tools > States" %}** will show all currently available states. An entity can be anything. A light, a switch, a person and even the sun. A state consists of the following parts:

| Name | Description | Example |
| ---- | ----- | ---- |
| Entity ID | Unique identifier for the entity. | `light.kitchen`
| State | The current state of the device. | `home`
| Attributes | Extra data related to the device and/or current state. | `brightness`

State changes can be used as the source of triggers and the current state can be used in conditions.

To explore the available *actions* open the {% my developer_services title="**Developer tools** > **Actions**" %}. *Actions* allow changing anything. For example, turn on a light, run a script, or enable a scene. Each *action* has a domain and a name. For example, the *action* {% my developer_call_service service="light.turn_on" %} is capable of turning on any light in your system. Parameters can be passed to an *action* to indicate, for example, which device to activate or which color to use.

## Creating automations

Now that you've got a sneak peek of what is possible, it's time to get your feet wet and create your first automation.

### [Using the automation editor &raquo;](/docs/automation/editor/)
