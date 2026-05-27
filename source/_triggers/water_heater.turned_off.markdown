---
title: "Water heater turned off"
trigger: water_heater.turned_off
domain: water_heater
description: "Triggers after one or more water heaters turn off."
related_triggers:
  - water_heater.turned_on
  - water_heater.operation_mode_changed
---

The **Water heater turned off** trigger fires when a water heater {% term entity %} changes to the off state. Use it when you want to react as soon as hot water heating is stopped, like pausing a recirculation pump or sending a notification if the water heater turns off unexpectedly.

When you target more than one water heater, the **Trigger when** option controls whether the automation runs for each water heater that turns off, only for the first one, or only after all targeted water heaters are off.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Water heater turned off** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your water heater is in, or select a device, a specific entity, a floor, or a label.
5. From the triggers shown for that target, select **Water heater turned off**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, enter how long the water heater must stay off before the trigger fires.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple water heaters are targeted, controls when the trigger fires:

    - **Each** (`any` in YAML): Fire every time any targeted water heater turns off.
    - **First** (`first` in YAML): Fire only when the first targeted water heater turns off.
    - **All** (`last` in YAML): Fire only after all targeted water heaters are off.
For at least:
  description: How long the water heater must stay off before the trigger fires.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Water heater turned off** is referred to as `water_heater.turned_off`. A basic example looks like this:

{% example %}
trigger: |
  trigger: water_heater.turned_off
  target:
    entity_id: water_heater.utility_room
{% endexample %}

This fires when `water_heater.utility_room` turns off.

To wait for all targeted water heaters to stay off:

{% example %}
trigger: |
  trigger: water_heater.turned_off
  target:
    label_id: vacation_water_heaters
  options:
    behavior: last
    for: "00:15:00"
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple water heaters are targeted, controls when the trigger fires:

    - `any` (**Each** in the UI): Fires every time any targeted water heater turns off.
    - `first` (**First** in the UI): Fires only when the first targeted water heater turns off.
    - `last` (**All** in the UI): Fires only after all targeted water heaters are off.
  required: false
  type: string
  default: any
for:
  description: >
    How long the water heater must stay off before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:15:00` waits 15 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires when the water heater enters the off state. It does not fire for operation mode changes unless the new state is actually off.
- `unavailable` and `unknown` do not count as off for this trigger.
- To react when the water heater turns back on, use [Water heater turned on](/triggers/water_heater.turned_on/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off the recirculation pump when the water heater turns off

When the water heater turns off, stop the recirculation pump so it does not keep running unnecessarily.

- **Trigger**: Water heater turned off
  - **Target**: Utility room water heater
- **Action**: Turn off

{% details "YAML example for stopping the recirculation pump" %}

{% example %}
automation: |
  alias: "Stop recirculation when the water heater turns off"
  triggers:
    - trigger: water_heater.turned_off
      target:
        entity_id: water_heater.utility_room
  actions:
    - action: switch.turn_off
      target:
        entity_id: switch.hot_water_recirculation
{% endexample %}

{% enddetails %}

### Automation: alert if all vacation water heaters stay off

When every targeted water heater stays off for 15 minutes, send a notification so you can confirm that the vacation setup is still intentional.

- **Trigger**: Water heater turned off
  - **Target**: Vacation water heaters
  - **Trigger when**: All
  - **For at least**: 00:15:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an off-state alert" %}

{% example %}
automation: |
  alias: "Alert when all vacation water heaters are off"
  triggers:
    - trigger: water_heater.turned_off
      target:
        label_id: vacation_water_heaters
      options:
        behavior: last
        for: "00:15:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "All vacation water heaters have been off for 15 minutes."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
