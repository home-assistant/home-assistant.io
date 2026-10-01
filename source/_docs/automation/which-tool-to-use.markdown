---
title: "Which tool to use: automation, script, scene, blueprint, or helper"
description: "Automations, scripts, scenes, blueprints, and helpers overlap. Learn how they differ, when to use which, and how to combine them."
related:
  - docs: /docs/automation/basics/
    title: Understanding automations
  - docs: /integrations/script/
    title: Scripts
  - docs: /docs/scene/
    title: Scenes
  - docs: /docs/blueprint/
    title: About blueprints
---

Home Assistant has five tools for making your home do things: automations, scripts, scenes, blueprints, and helpers. They overlap, and many tasks use more than one of them. This page explains what each tool is for, and how they work together.

## The five tools

For each tool, this section says what it is, when to use it, and when another tool fits better. If you're not sure where to start: most things that you want to happen in your home start with an automation. Add the other tools when your automation needs them.

### Automation

- What it is
  - A set of steps that starts by itself when something changes, for example, when the sun sets or a door opens.
- Use it when
  - Something should happen in response to a change in your home.
- Not for
  - Steps that you mainly want to start yourself, for example, from a button on a dashboard. You can run the actions of an automation yourself, but a script is a better fit.

For details, refer to [Understanding automations](/docs/automation/basics/).

### Script

- What it is
  - A saved list of steps that runs when you start it. It has no triggers.
- Use it when
  - You want to start the same steps from a dashboard, with Assist, or from several automations.
  - You want to give the steps different values each time, with fields.
- Not for
  - Reacting to a change by itself. A script only runs when something starts it. Use an automation for that.

For details, refer to [Scripts](/integrations/script/).

### Scene

- What it is
  - A saved set of states for several devices, which Home Assistant applies all at once.
- Use it when
  - Several lights and devices should go into a specific state together, for example, dimmed lights and closed blinds for a movie night.
- Not for
  - Steps that happen one after the other, waiting, or decisions. Use a script or an automation for that.

For details, refer to [Scenes](/docs/scene/).

### Blueprint

- What it is
  - A reusable template for an automation, a script, or a template entity, with inputs that you fill in.
- Use it when
  - You need the same automation for several rooms or devices.
  - You want to use an automation that someone in the community has already made.
- Not for
  - Writing your own blueprint for an automation that you only need once. Create the automation directly instead.

For details, refer to [About blueprints](/docs/blueprint/).

### Helper

- What it is
  - An {% term entity %} that you create yourself.
  - Some helpers store a value or a state, for example, a toggle, a timer, a schedule, or a dropdown.
  - Others calculate a value from other entities, for example, the minimum of several sensors.
  - A few combine or control other entities, for example, a group of lights that you control as one light.
- Use it when
  - An automation needs to remember something, or you want to change how an automation behaves without editing it.
- Not for
  - Reacting to changes or doing steps one after the other. Use an automation or a script for that, and let it use the helper.

You create helpers in {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}. For all helpers you can create, refer to the [list of helpers](/integrations/#helper).

Some helpers calculate their value with a [template](/docs/templating/), a small piece of code that, for example, combines the values of several sensors.

## Combining the tools

Most of the time, you combine the tools. These combinations come up often:

- An automation that activates a scene
  - For example, when you start a movie, an automation activates the movie night scene. The scene holds the states, and the automation decides when.
- An automation that runs a script
  - If several automations should do the same steps, put the steps in a script, and let each automation run it. When you change the steps, you only change the script.
- A toggle helper to pause an automation
  - Create a [**Toggle**](/integrations/input_boolean/) helper, for example, "Motion lights active", and add a condition to the automation that checks it. To pause the automation, turn off the toggle. Anyone who can use the dashboard can do that, without editing the automation.
- A timer helper instead of a long delay
  - A [delay](/docs/scripts/#wait-for-time-to-pass-delay) in an automation stops when Home Assistant restarts. A [**Timer**](/integrations/timer/) helper with **Restore state and time when Home Assistant starts** turned on continues after a restart. Start the timer in one automation, and react to it in another one with the [**Timer finished**](/triggers/timer.finished/) trigger.
  - If the time ran out while Home Assistant was off, the **Timer finished** trigger doesn't run after the start. For details, refer to the [**Timer finished**](/triggers/timer.finished/) trigger.
- A schedule helper instead of several time triggers
  - A [**Schedule**](/integrations/schedule/) helper holds time blocks for each day of the week, for example, the hours when the heating should be on. An automation reacts with the [**Schedule block started**](/triggers/schedule.block_started/) trigger, or checks the [**Schedule is on**](/conditions/schedule.is_on/) condition. To change the times, you edit the schedule, not the automation.
- A blueprint for the same automation in each room
  - For example, a motion-activated light. Create the automation once from the blueprint for each room, and fill in that room's motion sensor and light.
