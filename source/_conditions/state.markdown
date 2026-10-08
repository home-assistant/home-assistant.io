---
title: "State"
condition: state
domain: homeassistant
description: "Tests if an entity, or one of its attributes, has a specific state."
related_conditions:
  - light.is_on
  - zone.in_zone
---

The **State** condition checks whether an {% term entity %} has a specific state right now. Use it when an automation should only continue in a certain situation. For example, the automation only continues when someone is home, or when a door is closed. It works with any entity, and it can also check an attribute instead of the main state.

With the **For at least** option, the condition also checks how long the entity has had that state. For example, you can check whether a door has been closed for at least 10 minutes.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **State**.
5. In **Entity**, select the entity to check.
6. Optional: In **Attribute**, select an attribute to check instead of the main state.
7. In **State**, select the state that the entity must have. To allow several states, select more than one.
8. Optional: In **For at least**, enter how long the entity must have had the state. This only works with one state. If you selected an **Attribute**, **For at least** isn't available.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The entity to check.
  required: true
Attribute:
  description: An attribute of the entity to check instead of the main state.
  required: false
State:
  description: The state, or the attribute value, that the entity must have. If you select several states, the condition passes if the entity has one of them.
  required: true
For at least:
  description: How long the entity must have had the state. By default, the condition doesn't check how long. Only works with one state. Not available if you select an **Attribute**.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, use `condition: state`. A basic example looks like this:

{% example %}
condition: |
  condition: state
  entity_id: person.sam
  state: "home"
{% endexample %}

This passes when Sam is home.

### Options in YAML

YAML provides some options that aren't available in the UI, such as checking several entities at once.

{% options_yaml %}
condition:
  description: The condition type. For this condition, use `state`.
  required: true
  type: string
entity_id:
  description: The ID of the entity, or a list of entity IDs, to check.
  required: true
  type: [string, list]
state:
  description: >
    The state, or the attribute value, that the entity must have. Use a list to allow several states. Instead of a fixed value, you can use the entity ID of an `input_boolean`, `input_datetime`, `input_number`, `input_select`, or `input_text` helper. The condition then compares with the current state of that helper. The main state is always text. An attribute value keeps its own type, so write it the same way. For example, write a number or `true` without quotes.
  required: true
  type: [string, integer, float, boolean, list]
attribute:
  description: An attribute of the entity to check instead of the main state.
  required: false
  type: string
match:
  description: >
    When you check several entities, whether all of them (`all`) or at least one of them (`any`) must have the state. This option is available in YAML only.
  required: false
  type: string
  default: all
for:
  description: >
    How long the entity must have had the state. Accepts a duration string in `HH:MM:SS` format, or a time period mapping in hours, minutes, and seconds. You can use a template. Can't be combined with `attribute`, a list of states, or a helper entity as the state.
  required: false
  type: string
{% endoptions_yaml %}

The following example passes if at least one of two motion sensors detects motion:

{% example %}
condition: |
  condition: state
  entity_id:
    - binary_sensor.motion_sensor_left
    - binary_sensor.motion_sensor_right
  match: any
  state: "on"
{% endexample %}

If an attribute value is itself a list, put that list inside another list. Otherwise, the condition reads the values as several possible states. The following example passes only if the `fan_modes` attribute is exactly `["auto", "low"]`:

{% example %}
condition: |
  condition: state
  entity_id: climate.living_room_thermostat
  attribute: fan_modes
  state:
    - - "auto"
      - "low"
{% endexample %}

## Targets of the condition

This condition checks one or more entities:

- Use the UI option **Entity**, or the YAML option `entity_id`, to check one entity.
- To check more than one entity, use a list of `entity_id` values in YAML. In the UI, add one **State** condition per entity.

## Good to know

- The condition compares the state exactly. To check whether an entity is unavailable (`unavailable`) or has an unknown state (`unknown`), select or enter those states. Otherwise, an unavailable entity doesn't pass.
- If the entity doesn't exist, the condition fails with an error. The error is shown in the trace.
- If you select an **Attribute** that the entity doesn't have, the condition doesn't pass.
- **For at least** (`for`) only works with one state. If you select an **Attribute**, **For at least** isn't available. With several states, or with a helper entity as the state, Home Assistant shows an error when you save the automation.
- After Home Assistant restarts, **For at least** counts from the moment the entity was loaded again.
- To check entities of a specific type, conditions such as [Light is on](/conditions/light.is_on/) can be easier to set up. For all conditions, refer to the [list of available conditions](/conditions/).
- To check whether a numeric value is above or below a limit, use the [Numeric state](/docs/scripts/conditions/#numeric-state-condition) condition.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only send a laundry notification when someone is home

When the washing machine finishes, this automation sends a notification, but only if Sam is home to take out the laundry.

- **Trigger**: State changed
  - **Entity**: Washing machine running (`binary_sensor.washing_machine_running`)
  - **From**: Running
  - **To**: Not running
- **Condition**: State
  - **Entity**: Sam (`person.sam`)
  - **State**: Home
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a laundry notification when someone is home" %}

{% example %}
automation: |
  alias: "Laundry is done"
  triggers:
    - trigger: state
      entity_id: binary_sensor.washing_machine_running
      from: "on"
      to: "off"
  conditions:
    - condition: state
      entity_id: person.sam
      state: "home"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The laundry is done."
{% endexample %}

{% enddetails %}

### Automation: lock the front door at night if it has been closed for a while

At 23:00, this automation locks the front door, but only if the door has been closed for at least 10 minutes. The 10 minutes make sure that nobody is still going in or out when the door locks.

- **Trigger**: Time
  - **At time**: 23:00:00
- **Condition**: State
  - **Entity**: Front door (`binary_sensor.front_door`)
  - **State**: Closed
  - **For at least**: 10 minutes
- **Action**: Lock lock
  - **Target**: Front door lock (`lock.front_door`)

{% details "YAML example for locking the front door at night" %}

{% example %}
automation: |
  alias: "Lock the front door at night"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: state
      entity_id: binary_sensor.front_door
      state: "off"
      for: "00:10:00"
  actions:
    - action: lock.lock
      target:
        entity_id: lock.front_door
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
