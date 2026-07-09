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
4. Select the type of trigger to add.
5. Select **State**.
6. In **Entity**, select the entity whose state Home Assistant should watch.
7. If you want to pick another entity, select **Add entity** and then select it from the list.
8. Optional: In **Attribute**, select an attribute instead of the main state.
9. Optional: In **From**, enter the state the entity must have before the trigger fires.
10. Optional: In **To**, enter the state the entity must have when the trigger fires.
11. Optional: In **For**, enter how long the entity must be in the new state, or hold the new attribute value, before the trigger fires. Instead of a **Duration**, you can enter a **Template**.
12. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: Entity whose state to watch.
  required: true
Attribute:
  description: Entity attribute to watch instead of the main state.
  required: false
From:
  description: The entity starting state or starting attribute value to match.
  required: false
To:
  description: The new entity state or new attribute value to match.
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
  description: The entity starting state to match. You can use one state or a list of states.
  required: false
  type: [string, list]
to:
  description: The entity new state to match. You can use one state or a list of states.
  required: false
  type: [string, list]
not_from:
  description: The entity starting state to exclude. You can use one state or a list of states. This option is available in YAML only.
  required: false
  type: [string, list]
not_to:
  description: The entity new state to exclude. You can use one state or a list of states. This option is available in YAML only.
  required: false
  type: [string, list]
attribute:
  description: The entity attribute value to watch instead of the main state.
  required: false
  type: string
for:
  description: The amount of time the new state or new attribute value must remain unchanged before the trigger fires. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

## Targets of the trigger

This trigger watches one or more entities:

- Use the UI option **Entity**, or YAML option `entity_id`, to watch one entity.
- Select **Add entity** and pick another entity from the UI, or use a list of `entity_id` values in YAML, to watch more than one entity.

## Good to know

- If you do not set the options **From** and **To**, this trigger fires on all state changes. It also fires when only an attribute changes.
- If you set one of the options **From** (`from`), **To** (`to`), `not_from`, or `not_to`, attribute-only changes do not fire the trigger.
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
  - **To**: `home`
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

{% include triggers/stuck.md %}

{% include triggers/related.md %}
