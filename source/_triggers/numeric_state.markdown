---
title: "Numeric state"
trigger: numeric_state
domain: homeassistant
description: "Triggers when a numeric value crosses a threshold."
related_triggers:
  - state
  - time
---

The **Numeric state** trigger is useful when you want an automation to react when a value crosses a threshold. Use it for temperatures, power readings, battery levels, humidity, and other values that matter only when they move above, below, or into a range.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select the type of trigger to add.
5. Select **Numeric state**.
6. In **Entity**, select the entity whose numeric value Home Assistant should watch.
7. Optional: In **Attribute**, select an attribute instead of the main state.
8. Set **Above**, **Below**, or both.
9. Optional: In **For**, enter how long the value must stay in range before the trigger fires.
10. Select **Save**.

### Options in the UI

{% options_ui %}
Attribute:
  description: Optional entity attribute to evaluate instead of the main state.
Above:
  description: Optional lower threshold.
Below:
  description: Optional upper threshold.
For:
  description: Optional amount of time the value must stay within the configured threshold.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, use `trigger: numeric_state`. A basic example looks like this:

{% example %}
trigger: |
  trigger: numeric_state
  entity_id: sensor.outdoor_temperature
  above: 30
{% endexample %}

This runs when the outdoor temperature crosses from 30 or below to above 30.

### Options in YAML

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `numeric_state`.
  required: true
  type: string
entity_id:
  description: The entity to watch.
  required: true
  type: string
above:
  description: Optional lower threshold. You can use a number or an entity ID.
  required: false
  type: string
below:
  description: Optional upper threshold. You can use a number or an entity ID.
  required: false
  type: string
attribute:
  description: Optional attribute to evaluate instead of the main state.
  required: false
  type: string
value_template:
  description: Optional limited template used to calculate the numeric value.
  required: false
  type: string
for:
  description: Optional time the threshold must remain true before the trigger fires.
  required: false
  type: string
{% endoptions_yaml %}

When you use `attribute`, Home Assistant evaluates that attribute instead of the main entity state.

When you use `value_template`, the `state` variable is the [state object](/docs/configuration/state_object) for the entity you selected with `entity_id`.

## Targets of the trigger

This trigger watches one or more entities selected by `entity_id`. Each selected entity must provide a numeric state, or a numeric value in the attribute you choose.

- Use a single `entity_id` to watch one entity.
- Use a list of `entity_id` values in YAML to watch more than one entity.

## Good to know

- This trigger fires when a value crosses a threshold. It does not keep firing while the value stays on the same side of the threshold.
- If you set both **Above** and **Below**, the trigger fires when the value enters that range.
- If you use another entity in `above` or `below`, Home Assistant compares against that entity only when the watched entity updates.
- If you use `for`, the timer resets if Home Assistant restarts or automations reload.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a notification when the freezer gets too warm

If the freezer temperature rises above a safe value, this automation sends a message to your phone.

- **Trigger**: Numeric state
  - **Entity**: Freezer temperature sensor (`sensor.freezer_temperature`)
  - **Above**: `-10`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a freezer temperature alert" %}

{% example %}
automation: |
  alias: "Alert when the freezer gets too warm"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.freezer_temperature
      above: -10
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The freezer temperature is above -10°C."
{% endexample %}

{% enddetails %}

### Automation: remind me when battery level stays low for 30 minutes

If a battery-powered device stays below a set level for a while, this automation reminds you to charge or replace it.

- **Trigger**: Numeric state
  - **Entity**: Door lock battery sensor (`sensor.front_door_lock_battery`)
  - **Below**: `20`
  - **For**: 30 minutes
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a low-battery reminder" %}

{% example %}
automation: |
  alias: "Remind me when the door lock battery stays low"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.front_door_lock_battery
      below: 20
      for: "00:30:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The front door lock battery has been below 20% for 30 minutes."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
