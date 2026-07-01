---
title: "Set fan preset mode"
action: fan.set_preset_mode
domain: fan
description: "Set the preset mode of a fan."
related_actions:
  - fan.turn_on
  - fan.set_percentage
---

The **Set fan preset mode** action is useful when your fan offers named modes like low, medium, high, sleep, or auto. Use it when you want to switch between those built-in modes instead of setting a raw speed percentage.

Available preset modes come from the integration that provides the fan entity. For example, the ESPHome [Speed Fan](https://esphome.io/components/fan/speed/) component provides **Low**, **Medium**, and **High** presets by default.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're creating an automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the fan you want to control. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Set fan preset mode**.
7. Under **Preset mode**, select the mode you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Preset mode:
  description: The preset mode to apply to the selected fan.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `fan.set_preset_mode`. A basic example looks like this:

{% example %}
action: |
  action: fan.set_preset_mode
  target:
    entity_id: fan.bedroom
  data:
    preset_mode: "sleep"
{% endexample %}

This sets `fan.bedroom` to the `sleep` preset mode.

### Options in YAML

{% options_yaml %}
preset_mode:
  description: The preset mode to apply to the selected fan.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action is available only for fans that support preset modes.
- Available preset modes come from the fan integration, so names vary by device.
- To set a percentage instead of a named mode, use [Set fan speed](/actions/fan.set_percentage/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: set the bedroom fan to low at night

If your bedroom fan uses ESPHome Speed Fan presets, you can switch it to **Low** automatically at bedtime for quieter airflow.

- **Trigger**: Time: 22:30
- **Action**: Set fan preset mode
- **Target**: Bedroom fan
- **Preset mode**: low

{% details "YAML example for a bedtime low preset" %}

{% example %}
automation: |
  alias: "Bedroom fan low preset"
  triggers:
    - trigger: time
      at: "22:30:00"
  actions:
    - action: fan.set_preset_mode
      target:
        entity_id: fan.bedroom
      data:
        preset_mode: "low"
{% endexample %}

{% enddetails %}

### Automation: set the living room fan to high when you get home

When you arrive home on a warm day, you can switch an ESPHome Speed Fan to **High** for stronger airflow right away.

- **Trigger**: Zone: Person enters home zone
- **Action**: Set fan preset mode
- **Target**: Living room fan
- **Preset mode**: high

{% details "YAML example for an arrival high preset" %}

{% example %}
automation: |
  alias: "Living room fan high preset on arrival"
  triggers:
    - trigger: zone
      entity_id: person.alex
      zone: zone.home
      event: enter
  actions:
    - action: fan.set_preset_mode
      target:
        entity_id: fan.living_room
      data:
        preset_mode: "high"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
