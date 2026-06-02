---
title: "Lawn mower is docked"
condition: lawn_mower.is_docked
domain: lawn_mower
description: "Tests if one or more lawn mowers are docked."
---

The **Lawn mower is docked** condition passes when one or more targeted mowers are currently docked.
Use it when you only want an automation to continue after the mower is safely back at the dock, like before turning off a yard light or sending a completion summary.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Lawn mower is docked**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area where your mower is used. You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Each** or **All**.
7. Under **For at least**, set how long the mower must stay docked before the condition passes. Leave it at zero to check the current state only.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple lawn mowers are targeted, controls how results combine. Pick **Each** to pass if at least one targeted mower is docked, or **All** to pass only when every targeted mower is docked.
For at least:
  description: How long the mower must stay docked before the condition passes. Leave it at zero to check the current state only.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `lawn_mower.is_docked`. A basic example looks like this:

{% example %}
condition: |
  condition: lawn_mower.is_docked
  target:
    entity_id: lawn_mower.backyard
{% endexample %}

This passes when `lawn_mower.backyard` is currently docked.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple lawn mowers are targeted, controls how results combine.
    Accepts `all` or `each`.
  required: false
  type: string
  default: each
for:
  description: >
    How long the mower must stay docked before the condition passes. Accepts a
    duration like `00:10:00` for 10 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Mowers in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- Use **For at least** if you want to wait until the mower has stayed docked for a while before the condition passes.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: Turn off the yard light once the mower is docked

At the end of the evening, you might want the light near the dock to stay on until the mower is fully back in place.

- **Trigger**: Time: 22:30
- **Condition**: Lawn mower is docked
  - **Target**: Backyard mower
  - **For at least**: 00:05:00
- **Action**: Turn off light

{% details "YAML example for turning off the yard light" %}

{% example %}
automation: |
  alias: "Turn off the yard light after docking"
  triggers:
    - trigger: time
      at: "22:30:00"
  conditions:
    - condition: lawn_mower.is_docked
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:05:00"
  actions:
    - action: light.turn_off
      target:
        entity_id: light.garden_path
{% endexample %}

{% enddetails %}

### Automation: Send a summary only after the mower has stayed docked

If you want to avoid a message during a brief stop, wait 10 minutes before sending the completion notification.

- **Trigger**: Time: 21:00
- **Condition**: Lawn mower is docked
  - **Target**: Backyard mower
  - **For at least**: 00:10:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a docked-status summary" %}

{% example %}
automation: |
  alias: "Send a docked summary"
  triggers:
    - trigger: time
      at: "21:00:00"
  conditions:
    - condition: lawn_mower.is_docked
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:10:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The backyard mower has been docked for 10 minutes."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
