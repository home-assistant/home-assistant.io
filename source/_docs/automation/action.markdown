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

An action is the part of an automation that makes something happen, for example, turning on a light, sending a notification, or activating a [scene](/docs/scene/). When a [trigger](/docs/automation/trigger/) starts the automation and the [conditions](/docs/automation/condition/) are met, the automation runs its actions.

You add actions in the **Then do** section of the automation editor. For the steps, refer to [Adding an action in the editor](/docs/scripts/perform-actions/#adding-an-action-in-the-editor). Scripts use the same actions.

## Parts of an action

Each action does one thing. For example, **Turn on light** turns on lights. For a description of all actions, refer to the [list of available actions](/actions/).

Many actions also have some of the following parts:

- Targets: what the action controls, for example, the lights in the living room.
  - For details, refer to [Action targets](/docs/scripts/perform-actions/#action-targets).
- Options: details of what the action does, for example, the brightness of the lights.
  - For details, refer to [Action options](/docs/scripts/perform-actions/#action-options).
- Response data: what the action returns, for example, the calendar events of the next week.
  - For details, refer to [Action response data](/docs/scripts/perform-actions/#action-response-data).

## Actions run in order

An automation runs its actions one after the other, from top to bottom.

This is why:

- A condition between the actions can stop the automation. If the condition isn't met, the actions after the condition don't run. For details, refer to [Condition](/docs/scripts/#condition).
- If an action fails, the actions after the failed action don't run. To continue anyway, refer to [Continuing when a step fails](/docs/scripts/#continuing-when-a-step-fails).
- Actions don't run at the same time. To run actions at the same time, use [Run in parallel](/docs/scripts/#run-in-parallel).

## Actions and building blocks

Building blocks control whether, when, and in which order the actions run. For example, a building block can check a condition, wait a few seconds, repeat steps, or choose between steps. In the editor, select **Add action**. The building blocks are in the **Building blocks** group. For all building blocks, refer to [Building blocks and actions](/docs/scripts/).

## Running the actions directly

You can run the actions of an automation without waiting for its trigger: all actions at once, or a single action. For the steps, refer to [Testing all the actions](/docs/automation/testing/#testing-all-the-actions) and [Testing an action](/docs/automation/testing/#testing-an-action).
