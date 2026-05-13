---
title: "Humidifier turned off"
trigger: humidifier.turned_off
domain: humidifier
description: "Triggers after one or more humidifiers turn off."
related_triggers:
  - humidifier.turned_on
  - humidifier.started_humidifying
  - humidifier.started_drying
---

The **Humidifier turned off** trigger fires after a humidifier {% term entity %} turns off. Use it to react the moment the device shuts down, whether it was switched off manually, by a schedule, or because the target humidity was met and the device powered down automatically.

When you target more than one humidifier, the **Trigger when** option controls when it fires. You can have it fire the first time any targeted humidifier turns off, only after all targeted humidifiers have turned off, or every single time any of them turn off.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Humidifier turned off** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your humidifier is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Humidifier turned off**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple humidifiers are targeted.
7. Under **For at least**, set how long the humidifier must stay off before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple humidifiers are targeted, controls when the trigger fires:

    - **Each** (`any` in YAML, default): fire every time any targeted humidifier turns off.
    - **First** (`first` in YAML): fire only when the first of a group turns off.
    - **All** (`last` in YAML): fire only after every targeted humidifier is off.
For at least:
  description: How long the humidifier must stay off before the trigger fires. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Humidifier turned off** is referred to as `humidifier.turned_off`. A basic example looks like this:

{% example %}
trigger: |
  trigger: humidifier.turned_off
  target:
    entity_id: humidifier.bedroom
{% endexample %}

This fires every time `humidifier.bedroom` transitions from on to off.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple humidifiers are targeted, controls when the trigger fires:

    - `any` (**Each** in the UI, default): fire every time any targeted humidifier turns off.
    - `first` (**First** in the UI): fire only when the first of a group turns off.
    - `last` (**All** in the UI): fire only after every targeted humidifier is off.
  required: false
  type: string
  default: any
for:
  description: |
    How long the humidifier must stay off before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` fires only after the humidifier has stayed off for 5 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger only fires when a humidifier transitions from a known, valid state. Transitions from the **Unavailable** or **Unknown** state to off do not count.
- To react to the opposite transition, use [Humidifier turned on](/triggers/humidifier.turned_on/).
- Pair **Humidifier turned off** with the `last` behavior to do something only after every humidifier in an area has stopped. For example, send a single notification when all humidifiers in the house are off.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send an alert when the bedroom humidifier turns off unexpectedly

If the bedroom humidifier turns off during the night, send a notification so you can check whether it ran out of water or was switched off by accident.

- **Trigger**: Humidifier turned off
  - **Target**: Bedroom humidifier
  - **Trigger when**: Each
  - **For at least**: 00:00:00
- **Condition**: Time is between 22:00 and 07:00
- **Action**: Send a notification message
  - **Target**: My device (`notify.my_device`)

{% details "YAML example for an overnight humidifier-off alert" %}

{% example %}
automation: |
  alias: "Alert when bedroom humidifier turns off at night"
  triggers:
    - trigger: humidifier.turned_off
      target:
        entity_id: humidifier.bedroom
      options:
        behavior: any
        for: "00:00:00"
  conditions:
    - condition: time
      after: "22:00:00"
      before: "07:00:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Bedroom humidifier turned off."
{% endexample %}

{% enddetails %}

### Automation: turn off the fan when the last humidifier stops

When all humidifiers in the house turn off, turn off the ventilation fan as well, since there is nothing left to support.

- **Trigger**: Humidifier turned off
  - **Target**: All humidifiers (by label)
  - **Trigger when**: All
  - **For at least**: 00:00:00
- **Action**: Fan: Turn off

{% details "YAML example for turning off the fan when all humidifiers stop" %}

{% example %}
automation: |
  alias: "Turn off fan when all humidifiers off"
  triggers:
    - trigger: humidifier.turned_off
      target:
        label_id: all_humidifiers
      options:
        behavior: last
        for: "00:00:00"
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.ventilation
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
