---
title: "Water heater operation mode changed"
trigger: water_heater.operation_mode_changed
domain: water_heater
description: "Triggers when the operation mode of one or more water heaters changes to a specific mode."
related_triggers:
  - water_heater.turned_on
  - water_heater.turned_off
---

The **Water heater operation mode changed** trigger fires when a water heater {% term entity %} changes to one of the operation modes you select. Use it when you want an automation to react to a specific mode, like switching related devices to an energy-saving setup when the water heater changes to **Eco** mode.

When you target more than one water heater, the **Trigger when** option controls whether the automation runs for each matching change, only for the first one, or only after all targeted water heaters reach the selected mode.

{% include triggers/ui_header.md %}

To use **Water heater operation mode changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your water heater is in, or select a device, a specific entity, a floor, or a label.
5. From the triggers shown for that target, select **Water heater operation mode changed**.
6. Under **Operation mode**, select one or more modes to watch for. Only modes supported by the targeted water heater are shown.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
8. Under **For at least**, enter how long the water heater must stay in the selected mode before the trigger fires.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Operation mode:
  description: The operation mode or modes that should fire the trigger. Only modes supported by the targeted water heater are shown.
Trigger when:
  description: |
    When multiple water heaters are targeted, controls when the trigger fires:

    - **Each** (default): Fire every time any targeted water heater changes to one of the selected modes.
    - **First**: Fire only when the first targeted water heater changes to one of the selected modes.
    - **All**: Fire only after all targeted water heaters have changed to one of the selected modes.
  required: false
For at least:
  description: How long the water heater must stay in the selected mode before the trigger fires. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Water heater operation mode changed** is referred to as `water_heater.operation_mode_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: water_heater.operation_mode_changed
  target:
    entity_id: water_heater.utility_room
  options:
    operation_mode: eco
{% endexample %}

This fires when `water_heater.utility_room` changes to `eco` mode.

To watch for more than one mode:

{% example %}
trigger: |
  trigger: water_heater.operation_mode_changed
  target:
    entity_id: water_heater.utility_room
  options:
    operation_mode:
      - eco
      - heat_pump
    behavior: first
    for: "00:05:00"
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
operation_mode:
  description: >
    The operation mode or modes that should fire the trigger. Accepts a single mode string or a list of mode strings. Only modes supported by the targeted water heater are valid.
  required: true
  type: string
behavior:
  description: |
    When multiple water heaters are targeted, controls when the trigger fires:

    - `each` (default): Fires every time any targeted water heater changes to one of the selected modes.
    - `first`: Fires only when the first targeted water heater changes to one of the selected modes.
    - `all`: Fires only after all targeted water heaters have changed to one of the selected modes.
  required: false
  type: string
  default: each
for:
  description: >
    How long the water heater must stay in the selected mode before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` waits 5 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The target water heater entity must support the operation mode you want to use.
- This trigger fires when the mode changes _to_ one of the selected modes. It does not fire when the water heater leaves that mode.
- `unavailable` and `unknown` are not offered as selectable modes.
- To react when the water heater simply turns on or off, use [Water heater turned on](/triggers/water_heater.turned_on/) or [Water heater turned off](/triggers/water_heater.turned_off/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a notification when the water heater enters boost mode

When the water heater changes to a high-demand or boost-style mode, send a notification so you know hot water recovery is being prioritized.

- **Trigger**: Water heater operation mode changed
  - **Target**: Utility room water heater
  - **Operation mode**: performance
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a boost mode notification" %}

{% example %}
automation: |
  alias: "Notify when water heater enters performance mode"
  triggers:
    - trigger: water_heater.operation_mode_changed
      target:
        entity_id: water_heater.utility_room
      options:
        operation_mode: performance
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The water heater switched to performance mode."
{% endexample %}

{% enddetails %}

### Automation: lower the recirculation pump when the first water heater enters Eco mode

When the first targeted water heater changes to **Eco** mode, reduce the recirculation pump speed to save energy.

- **Trigger**: Water heater operation mode changed
  - **Target**: Water heaters with the energy label
  - **Operation mode**: eco
  - **Trigger when**: First
  - **For at least**: 00:05:00
- **Action**: Turn on switch

{% details "YAML example for lowering pump speed in Eco mode" %}

{% example %}
automation: |
  alias: "Lower recirculation pump in Eco mode"
  triggers:
    - trigger: water_heater.operation_mode_changed
      target:
        label_id: energy_water_heaters
      options:
        operation_mode: eco
        behavior: first
        for: "00:05:00"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.recirculation_pump_low_speed
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
