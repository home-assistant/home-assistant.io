---
title: "Water heater turned on"
trigger: water_heater.turned_on
domain: water_heater
description: "Triggers when one or more water heaters turn on, regardless of the operation mode."
related_triggers:
  - water_heater.turned_off
  - water_heater.operation_mode_changed
---

The **Water heater turned on** trigger fires when a water heater {% term entity %} changes from off to on. It does not depend on which operation mode the water heater uses after turning on. Use it when you want to react as soon as hot water heating becomes active again, like starting a recirculation pump or restoring a normal schedule.

When you target more than one water heater, the **Trigger when** option controls whether the automation runs for each water heater that turns on, only for the first one, or only after all targeted water heaters are on.

{% include triggers/ui_header.md %}

To use **Water heater turned on** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your water heater is in, or select a device, a specific entity, a floor, or a label.
5. From the triggers shown for that target, select **Water heater turned on**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, enter how long the water heater must stay on before the trigger fires.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple water heaters are targeted, controls when the trigger fires:

    - **Each** (default): Fire every time any targeted water heater turns on.
    - **First**: Fire only when the first targeted water heater turns on.
    - **All**: Fire only after all targeted water heaters are on.
  required: false
For at least:
  description: How long the water heater must stay on before the trigger fires. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Water heater turned on** is referred to as `water_heater.turned_on`. A basic example looks like this:

{% example %}
trigger: |
  trigger: water_heater.turned_on
  target:
    entity_id: water_heater.utility_room
{% endexample %}

This fires when `water_heater.utility_room` turns on.

To wait until all targeted water heaters are on:

{% example %}
trigger: |
  trigger: water_heater.turned_on
  target:
    label_id: basement_water_heaters
  options:
    behavior: all
    for: "00:05:00"
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple water heaters are targeted, controls when the trigger fires:

    - `each`: Fires every time any targeted water heater turns on.
    - `first`: Fires only when the first targeted water heater turns on.
    - `all`: Fires only after all targeted water heaters are on.
  required: false
  type: string
  default: each
for:
  description: >
    How long the water heater must stay on before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` waits 5 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires when the water heater changes from off to on, regardless of whether it comes back in `eco`, `electric`, `heat_pump`, or another supported mode.
- Use [Water heater operation mode changed](/triggers/water_heater.operation_mode_changed/) if you need to react only to a specific operating mode.
- `unavailable` and `unknown` do not count as on for this trigger.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: start recirculation when the water heater turns on

When the water heater turns on, start the recirculation pump so hot water is available sooner at nearby fixtures.

- **Trigger**: Water heater turned on
  - **Target**: Utility room water heater
- **Action**: Turn on switch

{% details "YAML example for starting the recirculation pump" %}

{% example %}
automation: |
  alias: "Start recirculation when the water heater turns on"
  triggers:
    - trigger: water_heater.turned_on
      target:
        entity_id: water_heater.utility_room
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.hot_water_recirculation
{% endexample %}

{% enddetails %}

### Automation: restore the normal operating mode when all basement water heaters come back on

When all targeted water heaters are back on for 5 minutes, switch them to your normal operating mode.

- **Trigger**: Water heater turned on
  - **Target**: Basement water heaters
  - **Trigger when**: All
  - **For at least**: 00:05:00
- **Action**: Set water heater operation mode

{% details "YAML example for restoring the normal mode" %}

{% example %}
automation: |
  alias: "Restore water heater mode after startup"
  triggers:
    - trigger: water_heater.turned_on
      target:
        label_id: basement_water_heaters
      options:
        behavior: all
        for: "00:05:00"
  actions:
    - action: water_heater.set_operation_mode
      target:
        label_id: basement_water_heaters
      data:
        operation_mode: heat_pump
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
