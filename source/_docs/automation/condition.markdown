---
title: "Automation conditions"
description: "Conditions decide whether an automation continues after a trigger starts it. Learn which kinds of conditions there are, why they check the current state, and how they work with building blocks."
related:
  - docs: /conditions/
    title: List of available conditions
  - docs: /docs/scripts/conditions/
    title: Conditions reference
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

For the conditions that come with an integration, refer to the [list of available conditions](/conditions/). For the built-in conditions, and for writing conditions in YAML, refer to [Conditions](/docs/scripts/conditions/).

## Conditions check the current state

A condition checks the state at the moment the automation runs.

This is why:

- A condition doesn't start the automation when it becomes true. To start the automation when something becomes true, use a trigger.
- If the state changes after the check, the condition isn't checked again. The automation continues or stops based on that one check.

For examples, refer to [Conditions check the current state](/docs/automation/how-automations-react-to-changes/#conditions-check-the-current-state).

## Conditions and building blocks

If an automation has several conditions, all of them must be met. To combine conditions in a different way, select **Add condition**, and then select **Blocks**:

- **Or**: met if at least one of the conditions inside is met.
- **Not**: met if none of the conditions inside are met.
- **And**: met if all conditions inside are met. Use it inside an **Or** or **Not** block.

You can also check a condition between the actions under **Then do**:

- To stop the remaining actions when a condition isn't met, use the [**Condition**](/docs/scripts/#condition) building block.
- To do different things depending on a condition, use [**If-then**](/docs/scripts/#if-then) or [**Choose**](/docs/scripts/#choose).

## Testing conditions

You can check whether a condition is met right now, without running the automation. For the steps, refer to [Testing a condition](/docs/automation/testing/#testing-a-condition).
