---
title: "Automating Home Assistant"
description: "Make your home react on its own with automations. Create them in the automation editor, no coding required, and learn how they work, how to test them, and how to fix them."
---

An {% term automation %} makes your home react on its own when something happens, for example, turning on the lights at sunset or pausing the music when you receive a call. You create automations in the automation editor, by choosing from your {% term devices %} and {% term entities %}. No coding is required.

## Getting started

- To create your first automation step by step, follow the tutorial [Create your first automation](/getting-started/automation/).
- To learn what an automation is made of, refer to [Understanding automations](/docs/automation/basics/).
- To use an automation that someone else has already made, refer to [Using automation blueprints](/docs/automation/using_blueprints/).

## Learning more

- [How automations react to changes](/docs/automation/how-automations-react-to-changes/): why an automation starts when something happens, not while something is true.
- [Which tool to use](/docs/automation/which-tool-to-use/): when to use an automation, a script, a scene, a blueprint, or a helper.

## What you can use in an automation

To look up what you can use in an automation, use the following references:

- [All triggers](/triggers/): every trigger, grouped by integration.
- [All conditions](/conditions/): every condition, grouped by integration.
- [All actions](/actions/): every action, grouped by integration.
- [All building blocks](/building-blocks/): the steps that control the flow of actions, such as waiting, choosing, and repeating.
- [Targets](/docs/automation/targets/): which entities a trigger, condition, or action covers when you select an area, floor, label, or device.
- [Trigger data in templates](/docs/automation/trigger-data/): the data that each trigger passes to your templates.

## Setting up an automation

To create and adjust your automations, refer to the following pages:

- [Automation editors](/docs/automation/editor/): how to create and edit automations.
- [Automation modes](/docs/automation/modes/): what happens when an automation starts while it's still running.
- [Automations in YAML](/docs/automation/yaml/): the full YAML structure, and the options that are only available in YAML.

## Scripts, scenes, and blueprints

Automations often work together with scripts, scenes, and blueprints:

- [Scripts](/docs/script/): a saved list of steps that runs when you start it, for example, from an automation or a dashboard.
- [Scenes](/docs/scene/): set a group of devices to saved states in one step.
- [Blueprints](/docs/blueprint/): ready-made automations and scripts that you install and adjust for your own home.

## When something doesn't work

- [Testing automations](/docs/automation/testing/): run an automation or a single step, and read its trace.
- [Troubleshooting automations](/docs/automation/troubleshooting/): find the cause of common problems by symptom.
