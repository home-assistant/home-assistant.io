---
title: "State"
trigger: state
domain: homeassistant
description: "Triggers when the state or an attribute changes."
related_triggers:
  - numeric_state
  - time
---

The **State** trigger is useful when you want an automation to react to a change in an entity or one of its attributes. Use it when you care about a device turning on or off, a door opening or closing, or a person arriving home.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for and select the **State** trigger.
5. In **Entity**, select the entity whose state or attribute value Home Assistant should watch.
6. Optional: Select **Add entity** to watch additional entities.
7. Optional: In **Attribute**, select an attribute instead of the main state.
8. Optional: In **From**, enter the state (or attribute value) the entity must have before the trigger fires.
9. Optional: In **To**, enter the state (or attribute value) the entity must have when the trigger fires.
10. Optional: In **For**, enter how long the entity must be in the new state, or hold the new attribute value, before the trigger fires. Instead of a **Duration**, you can enter a **Template**.
11. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: Entity whose state or attribute value to watch.
  required: true
Attribute:
  description: Entity attribute to watch instead of the main state.
  required: false
From:
  description: The starting state or starting attribute value to match.
  required: false
To:
  description: The new state or new attribute value to match.
  required: false
For:
  description: The amount of time the new state or new attribute value must remain unchanged before the trigger fires. Default is `0` hours, `00` minutes and `00` seconds (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, use `trigger: state`. A basic example looks like this:

{% example %}
trigger: |
  trigger: state
  entity_id: binary_sensor.front_door
  to: "on"
{% endexample %}

This runs when the front door changes to `on`.

### Options in YAML

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `state`.
  required: true
  type: string
entity_id:
  description: The ID of the entity or a list of IDs of the entities to watch.
  required: true
  type: [string, list]
from:
  description: The starting state or starting attribute value to match. You can use one state or a list of states.
  required: false
  type: [string, list]
to:
  description: The new state or new attribute value to match. You can use one state or a list of states.
  required: false
  type: [string, list]
not_from:
  description: The starting state or starting attribute value to exclude. You can use one state or a list of states. This option is available in YAML only.
  required: false
  type: [string, list]
not_to:
  description: The new state or new attribute value to exclude. You can use one state or a list of states. This option is available in YAML only.
  required: false
  type: [string, list]
attribute:
  description: The entity attribute to watch instead of the main state.
  required: false
  type: string
for:
  description: The amount of time the new state or new attribute value must remain unchanged before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes, and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

## Targets of the trigger

This trigger watches one or more entities:

- Use the UI option **Entity**, or YAML option `entity_id`, to watch one entity.
- Select **Add entity** and pick another entity from the UI, or use a list of `entity_id` values in YAML, to watch more than one entity.

## Good to know

- If you do not set any of **From**, **To**, `not_from`, or `not_to`, this trigger fires on all state changes. It also fires when only an attribute changes.
- If you set one of the options **From** (`from`), **To** (`to`), `not_from`, or `not_to`, attribute-only changes do not fire the trigger.
- In the UI, **Any state (ignoring attribute changes)** for **From** or **To** means "match any state, but only when the state changes." In YAML, this appears as `from: null` or `to: null` (the key is present, but the value is empty), which prevents attribute-only changes from firing. This is useful for sensors that update attributes often while their main state changes less often.
- You cannot combine the options `from` with `not_from`, or `to` with `not_to`.
- If you use the **For** (`for`) option, the timer resets if Home Assistant restarts or automations reload.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a reminder when a door stays open for 5 minutes

If a door stays open longer than expected, this automation sends a message to your phone.

- **Trigger**: State
  - **Entity**: Back door sensor (`binary_sensor.back_door`)
  - **To**: On
  - **For**: 5 minutes
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a door-left-open reminder" %}

{% example %}
automation: |
  alias: "Remind me when the back door stays open"
  triggers:
    - trigger: state
      entity_id: binary_sensor.back_door
      to: "on"
      for: "00:05:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The back door has been open for 5 minutes."
{% endexample %}

{% enddetails %}

### Automation: send a notification when someone arrives home

If you want a message when a person arrives, this automation watches for a state change to `home`.

- **Trigger**: State
  - **Entity**: Person entity (`person.sam`)
  - **To**: Home
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an arrival notification" %}

{% example %}
automation: |
  alias: "Notify me when Sam arrives home"
  triggers:
    - trigger: state
      entity_id: person.sam
      to: "home"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Sam has arrived home."
{% endexample %}

{% enddetails %}

### Automation: send a notification when a sensor value stops changing

If you want to know when a sensor value has not changed for a period, use **Any state (ignoring attribute changes)** for **To** and set **For** to the amount of time you want to wait.

- **Trigger**: State
  - **Entity**: Power sensor (`sensor.current_power`)
  - **To**: Any state (ignoring attribute changes)
  - **For**: 30 minutes
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a sensor value that stops changing" %}

{% example %}
automation: |
  alias: "Notify me when power stops updating"
  triggers:
    - trigger: state
      entity_id: sensor.current_power
      to: null
      for: "00:30:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The power sensor value has not changed for 30 minutes."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
