---
title: "How automations react to changes"
description: "How triggers react to changes, when conditions are checked, and how to start an automation when two things are both true."
related:
  - docs: /docs/automation/basics/
    title: Understanding automations
  - docs: /docs/configuration/events/
    title: Events
  - docs: /docs/configuration/state_object/
    title: State and state object
---

An automation waits for something to change, then checks its conditions, and then performs its actions. This page explains what that means when you set up triggers and conditions. For the parts of an automation, refer to [Understanding automations](/docs/automation/basics/).

## Triggers react to changes

A trigger reacts to a change, such as a light turning on or the sun setting. An automation does not keep checking whether something is true. It waits for the change and then starts. Behind the scenes, these changes are [events](/docs/configuration/events/), and most of them are changes to the [state](/docs/configuration/state_object/) of an entity.

For example, a **Numeric state** trigger for "above 25 °C" does not react when you save the automation while the temperature is already 26 °C. It reacts the next time the temperature rises above 25 °C.

## Conditions check the current state

A condition checks the state at the moment the automation runs, not at the moment of the trigger. For example, if a switch is turned on and quickly off again, the automation starts, but a condition that checks whether the switch is on is not met anymore.

## When two things must both be true

Sometimes you want an automation to run as soon as two things are both true. For example, you want the lights in the living room to turn on when Paulus is home and the sun has set. If the trigger is "Paulus enters home" and the condition is "it is after sunset", the automation only works if Paulus comes home after sunset. If Paulus comes home before sunset, nothing happens when the sun sets.

A trigger only reacts to one change. To cover both cases, add a trigger for each change and a condition for each situation:

```text
(triggers)    When Paulus enters home, or when the sun sets
(conditions)  and Paulus is home, and it is after sunset
(action)      turn on the lights in the living room
```
