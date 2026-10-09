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

An automation starts when something changes, not while something is true. Its conditions are checked once, right after a trigger reacts. These two rules explain most automations that don't do what you expect. To learn about the parts of an automation, refer to [Understanding automations](/docs/automation/basics/). For help with a specific problem, refer to [Troubleshooting automations](/docs/automation/troubleshooting/).

## Triggers react to changes

A trigger reacts to a change, such as a light turning on or the sun setting. An automation does not keep checking whether something is true. It waits for the change and then starts. Behind the scenes, these changes are [events](/docs/configuration/events/), and most of them are changes to the [state](/docs/configuration/state_object/) of an entity.

This is why:

- A **Temperature crossed threshold** trigger with **Threshold type** set to **Above** and a threshold of 25&nbsp;°C does not react when you save the automation while the temperature is already 26&nbsp;°C. It reacts only after the temperature drops to 25&nbsp;°C or below and then rises above 25&nbsp;°C again.
- An automation that should run while it's dark doesn't start just because it is dark. It starts when it becomes dark, for example, when the sun sets.
- [**Wait for a trigger**](/docs/scripts/#wait-for-a-trigger) works like a trigger: it waits for a change. If the state it waits for is already there when the wait starts, it keeps waiting.

## What counts as a change

Not every update of an entity starts an automation:

- A [**State changed** trigger](/triggers/state/) without a **From** or **To** state also reacts when only an attribute changes, such as the brightness of a light. The trigger page explains how to react only to changes of the state itself.
- Normally, setting an entity to the state it already has does not produce a state change event, so the trigger does not react. Some entities can be configured to emit updates even when their value has not changed.
- Most triggers for a specific kind of entity, such as [**Light turned on**](/triggers/light.turned_on/), do not react when an entity comes back from `unavailable` or `unknown`. The **State changed** trigger does react to that change, for example, from `unavailable` to `on`. If the **State changed** trigger has a **From** state, such as `off`, that change doesn't match. For details, refer to [unavailable and unknown states](/docs/automation/trigger/#unavailable-and-unknown-state-behavior-in-triggers).
- With **For at least**, a change only counts when the new state has lasted for that time. A restart resets the waiting. For details, refer to the [**State changed** trigger](/triggers/state/).

## Conditions check the current state

A condition checks the current state once, right after a trigger reacts. By then, the state may already be different from the change that started the automation. It isn't checked again later, and it doesn't start the automation when it becomes true.

This is why:

- If the condition isn't met when the trigger reacts, nothing happens, even if the condition is met a minute later.
- If a switch is turned on and quickly off again, the automation starts, but a condition that checks whether the switch is on is not met anymore.
- [**Wait for a template**](/docs/scripts/#wait-for-a-template) works like a condition: if the template is already true when the wait starts, the automation continues right away.

## When two things must both be true

Sometimes you want an automation to run as soon as two things are both true. For example, you want the lights in the living room to turn on when Paulus is home and the sun has set. If the trigger is "Paulus enters home" and the condition is "it is after sunset", the automation only works if Paulus comes home after sunset. If Paulus comes home before sunset, nothing happens when the sun sets.

A trigger only reacts to one change. To cover both cases, add a trigger for each change and a condition for each situation:

```text
(triggers)    When Paulus enters home, or when the sun sets
(conditions)  and Paulus is home, and it is after sunset
(action)      turn on the lights in the living room
```
