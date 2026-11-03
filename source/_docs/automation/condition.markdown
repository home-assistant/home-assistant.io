---
title: "Automation conditions"
description: "Conditions decide whether an automation continues after a trigger starts it. Learn which kinds of conditions there are, why they check the current state, and how they work with building blocks."
related:
  - docs: /conditions/
    title: List of available conditions
  - docs: /docs/automation/targets/
    title: Automation targets
  - docs: /docs/automation/how-automations-react-to-changes/
    title: How automations react to changes
  - docs: /docs/automation/testing/
    title: Testing automations
---

A condition checks whether something is true right now. For example, a condition can check whether a door is closed, or whether someone is home. When a [trigger](/docs/automation/trigger/) starts the automation, Home Assistant checks the conditions. If they are met, the automation runs its [actions](/docs/automation/action/). If not, the automation stops.

You add conditions in the **And if** section of the automation editor, with **Add condition**. Conditions are optional. Without conditions, the automation runs its actions whenever a trigger starts it.

## Built-in and integration conditions

- Conditions that come with an integration are named after what they check. Integration conditions include **Light is on** and **Sun is up**.
- Conditions that are built into Home Assistant aren't tied to an integration. You can use them with entities from any integration. Built-in conditions include **State**, **Numeric state**, **Time**, and **Template**.

For all conditions, refer to the [list of available conditions](/conditions/). The built-in conditions are in the [General](/conditions/#homeassistant) group. The **Device** condition is in the [Device automation](/conditions/#device_automation) group.

Many conditions check a target, such as a light or all windows in an area. If the target covers several entities, the **Condition passes if** option decides whether one or all of them must match. For details, refer to [Automation targets](/docs/automation/targets/#conditions-any-and-all). To leave out some of the targets, refer to [Excluding targets](/docs/automation/targets/#excluding-targets).

## Conditions check the current state

A condition checks the state at the moment the automation runs.

This is why:

- A condition doesn't start the automation when it becomes true. To start the automation when something becomes true, use a trigger.
- If the state changes after the check, the condition isn't checked again. The automation continues or stops based on that one check.

For examples, refer to [Conditions check the current state](/docs/automation/how-automations-react-to-changes/#conditions-check-the-current-state).

## Conditions and building blocks

If an automation has several conditions, all of them must be met. To combine conditions in a different way, select **Add condition**, and then select **Blocks**:

- [**Or**](/conditions/or/): met if at least one of the conditions inside is met.
- [**Not**](/conditions/not/): met if none of the conditions inside are met.
- [**And**](/conditions/and/): met if all conditions inside are met. Use it inside an **Or** or **Not** block.

You can also check a condition between the actions under **Then do**:

- To stop the remaining actions when a condition isn't met, use the [**Condition**](/building-blocks/condition/) building block.
- To do different things depending on a condition, use [**If-then**](/building-blocks/if/) or [**Choose**](/building-blocks/choose/).

## Disabling a condition

To try an automation without one of its conditions, disable the condition instead of deleting it. In the editor, in the **Menu** {% icon "mdi:dots-vertical" %} of the condition, select **Disable**. For details, refer to [Turning off a trigger, condition, or action](/docs/automation/editor/#turning-off-a-trigger-condition-or-action).

A disabled condition is skipped, as if it isn't there. In YAML, add `enabled: false` to the condition. `enabled` can also be a [limited template](/docs/templating/limited-templates/) or a blueprint input. The limited template can't use variables, such as `trigger`, `this`, or values from the `variables` section. If the limited template refers to a variable, the condition is disabled or causes an error. For details, refer to [Variables in limited templates](/docs/templating/limited-templates/#in-the-enabled-option-of-conditions-and-other-steps). For conditions in the **And if** section, Home Assistant checks the value once, when the automation loads.

## Testing conditions

You can check whether a condition is met right now, without running the automation. For the steps, refer to [Testing a condition](/docs/automation/testing/#testing-a-condition).
