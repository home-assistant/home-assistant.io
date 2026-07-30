---
title: "Humidifier is in mode"
condition: humidifier.is_mode
domain: humidifier
description: "Tests if one or more humidifiers are set to a specific mode."
related_conditions:
  - humidifier.is_on
  - humidifier.is_humidifying
  - humidifier.is_drying
---

The **Humidifier is in mode** condition passes when a humidifier {% term entity %} is set to a specific operating mode. Modes are device-specific and typically include options like **Normal**, **Eco**, **Sleep**, **Auto**, or **Baby**, though the exact modes available depend on your device. Use **Humidifier is in mode** to have an automation run only when the humidifier is set to a specific mode. For example, to skip a scene change if the humidifier is already in sleep mode.

When you target more than one humidifier, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted humidifier to be in the selected mode, or demand that all of them are.

## Prerequisites

- The target humidifier must support modes.

{% include conditions/ui_header.md %}

To use **Humidifier is in mode** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your humidifier is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Humidifier is in mode**.
6. Under **Mode**, select one or more modes to check for. Only modes available on the targeted device are shown.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple humidifiers are targeted.
8. Under **For at least**, set how long the humidifier must have been in the selected mode before the condition passes. Leave it at zero to pass immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Mode:
  description: The mode or modes to check for. Only the modes available on the targeted device are shown. Typical modes include **Normal**, **Eco**, **Not home**, **Boost**, **Comfort**, **Home**, **Sleep**, **Auto**, and **Baby**, though the exact modes depend on your device.
Condition passes if:
  description: When multiple humidifiers are targeted, controls how results combine. Pick **Any** to pass if at least one targeted humidifier is in the selected mode, or **All** to pass only when every targeted humidifier is in the selected mode. Default is **Any**.
For at least:
  description: How long the humidifier must have been continuously in the selected mode before the condition passes. Default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Humidifier is in mode** is referred to as `humidifier.is_mode`. A basic example looks like this:

{% example %}
condition: |
  condition: humidifier.is_mode
  target:
    entity_id: humidifier.bedroom
  options:
    mode: "sleep"
{% endexample %}

This passes when the bedroom humidifier is currently set to sleep mode.

To check for any one of several modes:

{% example %}
condition: |
  condition: humidifier.is_mode
  target:
    entity_id: humidifier.bedroom
  options:
    mode:
      - "sleep"
      - "eco"
{% endexample %}

### Options in YAML

{% options_yaml %}
mode:
  description: >
    The mode or modes to check for. Accepts a single mode string or a list of modes. Typical modes include `normal`, `eco`, `away`, `boost`, `comfort`, `home`, `sleep`, `auto`, and `baby`, though the exact modes available depend on your device.
  required: false
  type: [string, list]
behavior:
  description: >
    When multiple humidifiers are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the humidifier must have been continuously in the selected mode before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The available modes depend entirely on the device. Check your humidifier's documentation or the entity's attributes in Home Assistant to see which modes are supported.
- This condition checks the mode the humidifier is _currently set to_, not whether it is actively running in that mode.
- To check general on/off state instead, use [Humidifier is on](/conditions/humidifier.is_on/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: skip the night scene if sleep mode is already active

When you press the bedtime button, activate the night  {% term scene %}. But if the bedroom humidifier is already in sleep mode, skip the scene because the room is clearly already set up for rest.

- **Trigger**: State: Bedtime button pressed
- **Condition**: Humidifier is in mode (negated: not in sleep mode)
  - **Target**: Bedroom humidifier
  - **Condition passes if**: Any
- **Action**: Scene: Activate night scene

{% details "YAML example for skipping the night scene in sleep mode" %}

{% example %}
automation: |
  alias: "Activate night scene if not in sleep mode"
  triggers:
    - trigger: state
      entity_id: input_button.bedtime
  conditions:
    - condition: not
      conditions:
        - condition: humidifier.is_mode
          target:
            entity_id: humidifier.bedroom
          options:
            mode: "sleep"
            behavior: any
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.bedroom_night
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
