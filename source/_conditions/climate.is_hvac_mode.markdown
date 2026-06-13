---
title: "Thermostat is in HVAC mode"
condition: climate.is_hvac_mode
domain: climate
description: "Tests if one or more thermostats are set to a specific HVAC mode."
related_conditions:
  - climate.is_on
  - climate.is_off
  - climate.is_heating
  - climate.is_cooling
---

The **Thermostat is in HVAC mode** condition passes when a thermostat {% term entity %} is set to a specific HVAC mode. HVAC modes control the thermostat's operating mode and typically include **Off**, **Heat**, **Cool**, **Heat/cool**, **Dry**, **Fan only**, and **Auto**, though the exact modes available depend on your device. Use **Thermostat is in HVAC mode** to have an automation run only when the thermostat is set to a specific mode, such as ensuring the blinds only close when cooling is active.

When you target more than one thermostat, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted thermostat to be in the selected mode, or demand that all of them are.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Thermostat is in HVAC mode** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your living room or bedroom). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Thermostat is in HVAC mode**.
6. Under **HVAC mode**, select one or more modes to check for. Only modes available on the targeted device are shown. Typical modes include **Off**, **Heat**, **Cool**, **Heat/cool**, **Auto**, **Dry**, and **Fan only**.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple thermostats are targeted.
8. Under **For at least**, set how long the thermostat must have been in the selected mode before the condition passes. Leave it at zero to pass immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
HVAC mode:
  description: The HVAC mode or modes to check for. Only the modes available on the targeted device are shown. Typical modes include **Off**, **Heat**, **Cool**, **Heat/cool**, **Auto**, **Dry**, and **Fan only**, though the exact modes depend on your device.
Condition passes if:
  description: When multiple thermostats are targeted, controls how results combine. Pick **Any** to pass if at least one targeted thermostat is in the selected mode, or **All** to pass only when every targeted thermostat is in the selected mode. Default is **Any**.
For at least:
  description: How long the thermostat must have been continuously in the selected mode before the condition passes. Default is zero (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Thermostat is in HVAC mode** is referred to as `climate.is_hvac_mode`. A basic example looks like this:

{% example %}
condition: |
  condition: climate.is_hvac_mode
  target:
    entity_id: climate.living_room
  options:
    hvac_mode: "cool"
{% endexample %}

This passes when the living room thermostat is currently set to cool mode.

To check for any one of several modes:

{% example %}
condition: |
  condition: climate.is_hvac_mode
  target:
    entity_id: climate.living_room
  options:
    hvac_mode:
      - "heat"
      - "heat_cool"
{% endexample %}

### Options in YAML

{% options_yaml %}
hvac_mode:
  description: >
    The HVAC mode or modes to check for. Accepts a single mode string or a list of modes. Typical modes include `off`, `heat`, `cool`, `heat_cool`, `auto`, `dry`, and `fan_only`, though the exact modes available depend on your device.
  required: true
  type: [string, list]
behavior:
  description: >
    When multiple thermostats are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the thermostat must have been continuously in the selected mode before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The available HVAC modes depend entirely on the device. Check your thermostat's documentation or the entity's attributes in Home Assistant to see which modes are supported.
- This condition checks the mode the thermostat is currently set to, not whether it is actively heating or cooling. To check what action the thermostat is currently performing, see the related conditions below.
- To check if a thermostat is simply on (any active mode) or off, use [Thermostat is on](/conditions/climate.is_on/) or [Thermostat is off](/conditions/climate.is_off/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: close the blinds when cooling is active

When the outdoor temperature rises above 28°C during the day, close the living room blinds to help the air conditioner, but only if the thermostat is already set to cool mode.

- **Trigger**: Numeric state: Outdoor temperature above 28°C
- **Condition**: Sun elevation above horizon
- **Condition**: Thermostat is in HVAC mode
  - **HVAC mode**: Cool
  - **Target**: Living room thermostat
- **Action**: Close cover

{% details "YAML example for closing blinds when cooling" %}

{% example %}
automation: |
  alias: "Close blinds when cooling in hot weather"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.outdoor_temperature
      above: 28
  conditions:
    - condition: sun
      after: sunrise
      before: sunset
    - condition: climate.is_hvac_mode
      target:
        entity_id: climate.living_room
      options:
        hvac_mode: "cool"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_blinds
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
