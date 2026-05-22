---
title: "Lawn mower is mowing"
condition: lawn_mower.is_mowing
domain: lawn_mower
description: "Tests if one or more lawn mowers are mowing."
---

The **Lawn mower is mowing** condition passes when one or more targeted mowers are actively mowing.
Use it when an automation should continue only while the mower is out in the yard, like before delaying sprinklers or sending the mower back because of rain.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Lawn mower is mowing**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area where your mower is used. You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, set how long the mower must stay in the mowing state before the condition passes. Leave it at zero to check the current state only.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple lawn mowers are targeted, controls how results combine. Pick **Any** to pass if at least one targeted mower is mowing, or **All** to pass only when every targeted mower is mowing.
For at least:
  description: How long the mower must stay in the mowing state before the condition passes. Leave it at zero to check the current state only.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `lawn_mower.is_mowing`. A basic example looks like this:

{% example %}
condition: |
  condition: lawn_mower.is_mowing
  target:
    entity_id: lawn_mower.backyard
{% endexample %}

This passes when `lawn_mower.backyard` is currently mowing.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple lawn mowers are targeted, controls how results combine.
    Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the mower must stay in the mowing state before the condition
    passes. Accepts a duration like `00:02:00` for two minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Mowers in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- Use **For at least** if you want to make sure the mowing run is really under way before the condition passes.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: Return the mower to dock when rain starts

If rain starts while the mower is active, check that it is really mowing before sending it back to the dock.

- **Trigger**: State: Rain sensor turned on
- **Condition**: Lawn mower is mowing
  - **Target**: Backyard mower
- **Action**: Return lawn mower to dock

{% details "YAML example for docking the mower in rain" %}

{% example %}
automation: |
  alias: "Dock the mower when it starts raining"
  triggers:
    - trigger: state
      entity_id: binary_sensor.rain_detected
      to: "on"
  conditions:
    - condition: lawn_mower.is_mowing
      target:
        entity_id: lawn_mower.backyard
  actions:
    - action: lawn_mower.dock
      target:
        entity_id: lawn_mower.backyard
{% endexample %}

{% enddetails %}

### Automation: Pause the mower before guests enter the yard

If guests are about to arrive in the backyard, only pause the mower if it is actually mowing at that moment.

- **Trigger**: State: Gate opened
- **Condition**: Lawn mower is mowing
  - **Target**: Backyard mower
  - **For at least**: 00:02:00
- **Action**: Pause lawn mower

{% details "YAML example for pausing the mower for guests" %}

{% example %}
automation: |
  alias: "Pause the mower when the gate opens"
  triggers:
    - trigger: state
      entity_id: binary_sensor.back_gate
      to: "on"
  conditions:
    - condition: lawn_mower.is_mowing
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:02:00"
  actions:
    - action: lawn_mower.pause
      target:
        entity_id: lawn_mower.backyard
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
