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
7. Optional: In **Attribute**, select an attribute instead of the main state.
8. Optional: In **From** and **To**, limit which changes should match.
9. Optional: In **For**, enter how long the new state must last before the trigger fires.
10. Select **Save**.

### Options in the UI

{% options_ui %}
Attribute:
  description: Optional entity attribute to watch instead of the main state.
From:
  description: Optional starting state to match.
To:
  description: Optional new state to match.
For:
  description: Optional amount of time the new state must last before the trigger fires.
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
  description: The entity to watch.
  required: true
  type: string
from:
  description: Optional starting state to match. You can use one state or a list of states.
  required: false
  type: string
to:
  description: Optional new state to match. You can use one state or a list of states.
  required: false
  type: string
not_from:
  description: Optional starting state to exclude. You can use one state or a list of states. YAML only.
  required: false
  type: string
not_to:
  description: Optional new state to exclude. You can use one state or a list of states. YAML only.
  required: false
  type: string
attribute:
  description: Optional attribute to watch instead of the main state.
  required: false
  type: string
for:
  description: Optional time the new state must remain unchanged before the trigger fires.
  required: false
  type: string
{% endoptions_yaml %}

If you want to trigger on all state changes but ignore attribute-only changes, set one of `from`, `to`, `not_from`, or `not_to` to an empty value in YAML.

In YAML, `from`, `to`, `not_from`, and `not_to` each accept either one state or a list of states.

## Targets of the trigger

This trigger watches one or more entities selected by `entity_id`.

- Use a single `entity_id` to watch one entity.
- Use a list of `entity_id` values in YAML to watch more than one entity.

## Good to know

- If you do not set **From** or **To**, this trigger fires on all state changes. It also fires when only an attribute changes.
- If you set **From**, **To**, `not_from`, or `not_to`, attribute-only changes do not fire the trigger.
- You cannot combine `from` with `not_from`, or `to` with `not_to`.
- If you use `for`, the timer resets if Home Assistant restarts or automations reload.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a reminder when a door stays open for 5 minutes

If a door stays open longer than expected, this automation sends a message to your phone.

- **Trigger**: State
  - **Entity**: Back door sensor (`binary_sensor.back_door`)
  - **To**: `on`
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
