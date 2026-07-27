---
title: "Numeric state"
trigger: numeric_state
domain: homeassistant
description: "Triggers when a numeric value crosses a threshold."
related_triggers:
  - state
  - time
---

The **Numeric state** trigger is a general trigger for reacting when a numeric value crosses a threshold. Use it when you need to watch an exact entity state or attribute value, or when the automation editor does not offer a trigger named after what you want to watch.

If the automation editor shows a trigger named after the measurement you care about, use that one instead. For example, use [Temperature crossed threshold](/triggers/temperature.crossed_threshold/) for temperature readings or [Power crossed threshold](/triggers/power.crossed_threshold/) for power readings. These triggers are easier to read later and can handle compatible units automatically.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for and select the **Numeric state** trigger.
5. In **Entity**, select the entity whose numeric value Home Assistant should watch.
6. Optional: Select **Add entity** to select additional entities whose numeric value Home Assistant should watch.
7. Optional: In **Attribute**, select an attribute instead of the main state.
8. Optional: In **Above**, enter a number to fire the trigger only if the value of the numeric state or attribute is above that number. Instead of a **Fixed number**, you can select **Value of an entity** and then select an entity from the list. This fires the trigger if the value of the numeric state or attribute is above the value of the selected entity.
9. Optional: In **Below**, enter a number to fire the trigger only if the value of the numeric state or attribute is below that number. Instead of a **Fixed number**, you can select **Value of an entity** and then select an entity from the list. This fires the trigger if the value of the numeric state or attribute is below the value of the selected entity.
10. Optional: Enter a number in both **Above** and **Below** to fire the trigger if the value of the numeric state or attribute is inside the range. If you don't set **Above** and **Below**, the trigger fires on every change of the numeric state or attribute value.
11. Optional: In **Value template**, enter a template that will be used to calculate the numeric value.
12. Optional: In **For**, enter how long the numeric state or attribute value must remain unchanged or stay within the configured threshold before the trigger fires. You can enter a template by selecting **Template** instead of **Duration**.
13. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The entity whose numeric state or attribute value to watch.
  required: true
Attribute:
  description: The entity attribute to evaluate instead of the main state.
  required: false
Above:
  description: The lower threshold value for the numeric state or attribute value. Use a **Fixed number** or a **Value of an entity**.
  required: false
Below:
  description: The upper threshold value for the numeric state or attribute value. Use a **Fixed number** or a **Value of an entity**.
  required: false
Value template:
  description: The limited template to use for calculating the numeric value.
  required: false
For:
  description: The amount of time the value of the numeric state or attribute must remain unchanged or stay within the configured threshold. Default is `0` hours, `00` minutes and `00` seconds (fires immediately).
  required: false
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
  description: The entity whose numeric state or attribute value to watch.
  required: true
  type: [string, list]
above:
  description: The lower threshold. You can use a number or an entity ID.
  required: false
  type: string
below:
  description: The upper threshold. You can use a number or an entity ID.
  required: false
  type: string
attribute:
  description: The attribute to evaluate instead of the main state.
  required: false
  type: string
value_template:
  description: The limited template to use for calculating the numeric value.
  required: false
  type: string
for:
  description: The amount of time the value of the numeric state or attribute must remain unchanged or stay within the configured threshold. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes, and seconds. Default is `00:00:00` (fires immediately).
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

## Targets of the trigger

This trigger watches one or more entities selected in the UI options **Entity** and **Add entity**, or using the `entity_id` option in YAML. Each selected entity must provide a numeric state, or a numeric value in the attribute you choose.

- Use a single **Entity** (`entity_id`) to watch one entity.
- Select **Add entity**, or a list of `entity_id` values in YAML, to watch more than one entity.

## Good to know

- This trigger fires when a value crosses a threshold. It does not keep firing while the value stays on the same side of the threshold.
- If you set both **Above** and **Below**, the trigger fires when the value enters that range.
- This trigger compares the raw numeric value you enter. It does not convert between units. For measurements with units, use a trigger named after that measurement when one is available.
- If you use an entity in **Above** (`above`) or **Below** (`below`), Home Assistant compares the value of the watched entity against the value of that entity only when the watched entity updates.
- If you use **For** (`for`), the timer resets if Home Assistant restarts or automations reload.
- When you use `value_template`, the `state` variable is the [state object](/docs/configuration/state_object) for the entity you selected with `entity_id`.

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
