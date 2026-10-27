---
title: "Wait for a trigger"
building_block: wait_for_trigger
category: waiting
description: "Pause an automation or script until a trigger reacts, with an optional timeout."
related_building_blocks:
  - wait_template
  - delay
---

The **Wait for a trigger** building block pauses the automation or script until one of its triggers reacts to a change. Use it when the next steps should only run after something happens, for example, a door closing.

## Using this building block from the user interface

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select an automation. To edit a script, go to the **Scripts** tab and select the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Wait for a trigger**.
4. Select **Add trigger**, and add the trigger to wait for.
   - You can use the same [triggers](/docs/automation/trigger/) as in the **When** section of an automation.
   - You can add more than one trigger. The wait ends when any of them reacts.
5. Optional: In **Timeout**, enter how long to wait at most.
6. Optional: To stop the automation or script when the timeout ends, turn off **Continue on timeout**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Timeout:
  description: The longest time to wait. If you leave it empty, the automation or script waits until one of the triggers reacts.
  required: false
Continue on timeout:
  description: If turned on, the next steps run when the timeout ends, even though no trigger reacted. If turned off, the automation or script stops. Turned on by default.
  required: false
{% endoptions_ui %}

## Using this building block in YAML

In YAML, use `wait_for_trigger` with a list of triggers. This example waits for a custom event, or for a light to turn on and stay on for 10 seconds:

{% example %}
action: |
  alias: "Wait for MY_EVENT or light on"
  wait_for_trigger:
    - trigger: event
      event_type: MY_EVENT
      id: my_trigger
    - trigger: state
      entity_id: light.living_room
      to: "on"
      for: 10
{% endexample %}

To stop the script if the event doesn't happen in time, add a `timeout` and set `continue_on_timeout` to `false`:

{% example %}
action: |
  wait_for_trigger:
    - trigger: event
      event_type: ifttt_webhook_received
      event_data:
        action: connected_to_network
  timeout:
    minutes: "{{ timeout_minutes }}"
  continue_on_timeout: false
{% endexample %}

You can give each trigger an `id`, like in the `triggers` of an automation. To check which trigger ended the wait, use `wait.trigger.id` in a template:

{% example %}
action: |
  if:
    - "{{ wait.trigger.id == 'my_trigger' }}"
  then:
    - action: light.turn_on
      target:
        entity_id: light.living_room_table
{% endexample %}

### Options in YAML

{% options_yaml %}
wait_for_trigger:
  description: The triggers to wait for. Uses the same format as the `triggers` of an automation.
  required: true
  type: list
timeout:
  description: The longest time to wait. Uses the same formats as [Wait for time to pass (delay)](/building-blocks/delay/), including templates.
  required: false
  type: [string, integer, float, map, template]
continue_on_timeout:
  description: If `true`, the next steps run when the timeout ends. If `false`, the automation or script stops.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

### Wait variable

After the wait ends, because a trigger reacted or because the timeout ended, the `wait` variable shows the result:

- `wait.completed`: `true` if a trigger reacted, `false` if the timeout ended first.
- `wait.remaining`: The time left of the timeout, in seconds, or `none` if no timeout is set.
- `wait.trigger`: Information about the trigger that reacted, in the same format as the [trigger data](/docs/automation/trigger-data/#trigger-properties) of an automation. `none` if the timeout ended first.

## Good to know

- The wait only reacts to a change that happens after the wait starts. If the state is already there, the automation or script keeps waiting. To continue right away in that case, use [**Wait for a template**](/building-blocks/wait_template/). For more about this difference, refer to [Triggers react to changes](/docs/automation/how-automations-react-to-changes/#triggers-react-to-changes).
- **Continue on timeout** is turned on by default. To check whether a trigger reacted, use `wait.completed`.
- A restart of Home Assistant stops automations and scripts that are waiting. They don't continue after the restart.
- The triggers can use the [trigger variables](/docs/automation/trigger/#trigger-variables), [variables](/building-blocks/variables/), and [script variables](/integrations/script/#variables) that are defined before the wait.
- The **Triggered by** condition only lists the triggers of the automation itself, not the triggers of the wait. To check which trigger ended the wait, use `wait.trigger.id`, as shown in [Using this building block in YAML](#using-this-building-block-in-yaml).

## Examples

### Automation: Turn off the heating when a window stays open

When the window opens, this automation waits up to 5 minutes for it to close again. If the window is still open after 5 minutes, it turns off the heating.

- **Trigger**: State changed
  - **Entity**: Living room window (`binary_sensor.living_room_window`)
  - **To**: Open
- **Action**: Wait for a trigger
  - **Timeout**: `5` minutes
  - **Trigger**: State changed
    - **Entity**: Living room window (`binary_sensor.living_room_window`)
    - **To**: Closed
- **Action**: If-then
  - **If**:
    - **Condition**: Template
      - **Value template**: `{{ not wait.completed }}` (met if the wait ended because of the timeout)
  - **Then**:
    - **Action**: Turn off thermostat
      - **Target**: Living room thermostat (`climate.living_room`)

{% details "YAML example" %}

{% example %}
automation: |
  alias: "Turn off the heating when a window stays open"
  triggers:
    - trigger: state
      entity_id: binary_sensor.living_room_window
      to: "on"
  actions:
    - wait_for_trigger:
        - trigger: state
          entity_id: binary_sensor.living_room_window
          to: "off"
      timeout:
        minutes: 5
    - if:
        - "{{ not wait.completed }}"
      then:
        - action: climate.turn_off
          target:
            entity_id: climate.living_room
{% endexample %}

{% enddetails %}

### Script: Wait a total of 10 seconds

This script uses two waits, with one timeout of 10 seconds for both. The second wait uses `wait.remaining`, the time that is left after the first wait.

{% details "YAML example" %}

{% example %}
script: |
  sequence:
    - wait_template: "{{ is_state('binary_sensor.door_1', 'on') }}"
      timeout: 10
      continue_on_timeout: false
    - action: switch.turn_on
      target:
        entity_id: switch.some_light
    - wait_for_trigger:
        - trigger: state
          entity_id: binary_sensor.door_2
          to: "on"
          for: 2
      timeout: "{{ wait.remaining }}"
      continue_on_timeout: false
    - action: switch.turn_off
      target:
        entity_id: switch.some_light
{% endexample %}

{% enddetails %}
