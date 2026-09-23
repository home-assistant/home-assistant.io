---
title: "Automation actions"
description: "Reference for the actions you can call from an automation, including how to pass data, target a specific entity, and chain multiple actions together."
---

The automation {% term integration %} provides actions to control your automations, such as turning them on and off. This is useful when you want one automation to enable or disable another one.

Each action has its own page with a step-by-step walkthrough, options, and examples:

- [Turn on automation](/actions/automation.turn_on/) (`automation.turn_on`):
  Enable an automation, so it listens for its {% term triggers %} again.
- [Turn off automation](/actions/automation.turn_off/) (`automation.turn_off`):
  Disable an automation and, unless you say otherwise, stops the actions it is running.
- [Toggle automation](/actions/automation.toggle/) (`automation.toggle`):
  Enable an automation if it was off, and disables it if it was on.
- [Trigger automation](/actions/automation.trigger/) (`automation.trigger`):
  Run the actions of an automation right away, without waiting for its triggers.
- [Reload automations](/actions/automation.reload/) (`automation.reload`):
  Load your automations again after you change them in YAML.

For an overview of every action across all integrations, see the [actions reference](/actions/).
