---
title: "Thermostat turned on"
trigger: climate.turned_on
domain: climate
description: "Triggers after one or more climate devices turn on, regardless of the mode."
related_triggers:
  - climate.turned_off
  - climate.hvac_mode_changed
---

The **Thermostat turned on** trigger fires after a climate {% term entity %} turns on, entering any operational mode (such as **Heat**, **Cool**, or **Auto**). Climate entities include thermostats, air conditioners, heat pumps, and evaporative coolers. The trigger doesn't care which specific mode the device switches to. It only checks that it transitions from **Off** to any active mode. Use this trigger when you want to react as soon as the climate entity becomes active, regardless of whether it's heating, cooling, or in another mode.

Note: The UI labels this trigger as "Thermostat," but it works with all climate entities.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Thermostat turned on** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Thermostat turned on**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple thermostats are targeted.
7. Under **For at least**, set how long the thermostat must stay on before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple thermostats are targeted, controls when the trigger fires:

    - **Each** (`any` in YAML, default): fires every time any targeted thermostat turns on.
    - **First** (`first` in YAML): fires only when the first of a group turns on.
    - **All** (`last` in YAML): fires only after every targeted thermostat is on.
For at least:
  description: How long the thermostat must stay on before the trigger fires. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Thermostat turned on** is referred to as `climate.turned_on`. A basic example looks like this:

{% example %}
trigger: |
  trigger: climate.turned_on
  target:
    entity_id: climate.living_room
{% endexample %}

This fires every time `climate.living_room` transitions from off to any active mode.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple thermostats are targeted, controls when the trigger fires:

    - `any` (**Each** in the UI, default): fire every time any targeted thermostat turns on.
    - `first` (**First** in the UI): fire only when the first thermostat turns on.
    - `last` (**All** in the UI): fire only after every targeted thermostat is on.
  required: false
  type: string
  default: any
for:
  description: |
    How long the thermostat must stay on before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:00:10` fires only after the thermostat has stayed on for 10 seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires when the device transitions from **Off** to any operational mode (**Heat**, **Cool**, **Auto**, **Dry**, **Fan only**, or **Heat/Cool**).
- The trigger does not fire when switching between active modes. For example, changing from **Heat** to **Cool** will not fire this trigger.
- To react to specific mode changes or when the device switches between modes, use **Thermostat mode changed** instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on fans when first evaporative cooler starts

When the first of multiple evaporative coolers turns on and stays on for 10 seconds, start a ceiling fan on low speed to help distribute the cooled air more evenly throughout the room. The short delay ensures the cooler has fully started, and firing on the first one prevents multiple fan activations.

- **Trigger**: Thermostat turned on
  - **Target**: Multiple evaporative coolers
  - **Trigger when**: First
  - **For at least**: 10 seconds
- **Action**: Turn on fan

{% details "YAML example for running fans when first cooler starts" %}

{% example %}
automation: |
  alias: "Start fan when first cooler turns on"
  triggers:
    - trigger: climate.turned_on
      target:
        entity_id:
          - climate.bedroom_evaporative_cooler
          - climate.living_room_evaporative_cooler
      options:
        behavior: first
        for: "00:00:10"
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom_ceiling
      data:
        percentage: 30
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
