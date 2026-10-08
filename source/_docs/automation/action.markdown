---
title: "Automation actions"
description: "Actions are what an automation does, such as turning on a light or sending a notification. Learn what an action is made of, how actions run, and how they work with building blocks."
related:
  - docs: /docs/scripts/perform-actions/
    title: Performing actions
  - docs: /actions/
    title: List of available actions
  - docs: /docs/scripts/
    title: Building blocks and actions
---

An action is the part of an automation that makes something happen, for example, turning on a light, sending a notification, or activating a [scene](/docs/scene/). You add actions in the **Then do** section of the automation editor. Scripts use the same actions, in their **Sequence** section.

When a [trigger](/docs/automation/trigger/) starts the automation, Home Assistant checks the [conditions](/docs/automation/condition/). If they are met, the automation runs its actions.

For the steps to add an action, refer to [Adding an action in the editor](/docs/scripts/perform-actions/#adding-an-action-in-the-editor). For all actions, refer to the [list of available actions](/actions/).

## Parts of an action

Each action does one thing. Depending on the action, it also has some of the following parts:

- Targets: what the action controls, for example, the lights in the living room.
  - For details, refer to [Action targets](/docs/scripts/perform-actions/#action-targets).
- Options: how the action does it, for example, the brightness of the lights.
  - For details, refer to [Action options](/docs/scripts/perform-actions/#action-options).
- Response data: what the action returns, for example, the calendar events of the next week.
  - For details, refer to [Action response data](/docs/scripts/perform-actions/#action-response-data).

## Actions run in order

An automation runs its actions one after the other, from top to bottom.

This is why:

- A condition between the actions can stop the rest. If the condition isn't met, the actions after it don't run. For details, refer to [Condition](/docs/scripts/#condition).
- If an action fails, the actions after it don't run. To continue anyway, refer to [Continuing when a step fails](/docs/scripts/#continuing-when-a-step-fails).
- Actions don't run at the same time. To run them at the same time, use [Run in parallel](/docs/scripts/#run-in-parallel).

## Actions and building blocks

Building blocks control whether, when, and in which order the actions run. For example, a building block can check a condition, wait a few seconds, repeat steps, or choose between steps. In the editor, select **Add action**. The building blocks are in the **Building blocks** group. For all building blocks, refer to [Building blocks and actions](/docs/scripts/).

## Running the actions directly

To try the actions of an automation, select **Menu** {% icon "mdi:dots-vertical" %} > **Run actions** in the automation editor. **Run actions** is available after you save the automation. It skips the **When** and **And if** sections, and performs the actions right away. To run a single action, refer to [Testing an action](/docs/scripts/perform-actions/#testing-an-action).
