---
title: "Wait for a template"
building_block: wait_template
category: waiting
description: "Pause an automation or script until a template is true, with an optional timeout."
related_building_blocks:
  - wait_for_trigger
  - delay
---

The **Wait for a template** building block pauses the automation or script until a template is true. If the template is already true when the wait starts, the next steps run right away. Use it when the next steps should only run once something is in a certain state, for example, when the media player has stopped.

## Using this building block from the user interface

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select an automation. To edit a script, go to the **Scripts** tab and select the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Wait for a template**.
4. In **Wait template**, enter the template to wait for, for example, `{{ is_state('media_player.living_room', 'idle') }}`.
5. Optional: In **Timeout**, enter how long to wait at most.
6. Optional: To stop the automation or script when the timeout ends, turn off **Continue on timeout**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Wait template:
  description: The template to wait for. The wait ends as soon as the template is true.
  required: true
Timeout:
  description: The longest time to wait. If you leave it empty, the automation or script waits until the template is true.
  required: false
Continue on timeout:
  description: If turned on, the next steps run when the timeout ends, even though the template is not true. If turned off, the automation or script stops. Turned on by default.
  required: false
{% endoptions_ui %}

## Using this building block in YAML

In YAML, use `wait_template`:

{% example %}
action: |
  alias: "Wait until media player is stopped"
  wait_template: "{{ is_state('media_player.living_room', 'idle') }}"
{% endexample %}

<a id="wait-timeout"></a>

To wait at most 1 minute, add a `timeout`:

{% example %}
action: |
  wait_template: "{{ is_state('binary_sensor.entrance', 'on') }}"
  timeout: "00:01:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
wait_template:
  description: The template to wait for. The wait ends as soon as the template is true.
  required: true
  type: template
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

After the wait ends, because the template is true or because the timeout ended, the `wait` variable shows the result:

- `wait.completed`: `true` if the template became true, `false` if the timeout ended first.
- `wait.remaining`: The time left of the timeout, in seconds, or `none` if no timeout is set.

## Good to know

- If the template is already true when the wait starts, the next steps run right away. To wait for a change that happens after the wait starts, use [**Wait for a trigger**](/building-blocks/wait_for_trigger/). For more about this difference, refer to [Conditions check the current state](/docs/automation/how-automations-react-to-changes/#conditions-check-the-current-state).
- The template is checked again whenever an entity that it references changes state. If the template uses [`now()`](/template-functions/now/), it is also checked at the start of every minute.
- **Continue on timeout** is turned on by default. To check whether the template became true, use `wait.completed`.
- A restart of Home Assistant stops automations and scripts that are waiting. They don't continue after the restart.

## Examples

### Script: Take different actions depending on whether the door opened

This script waits up to 10 seconds for the door to open, and then uses `wait.completed` to decide what to do.

{% details "YAML example" %}

{% example %}
script: |
  sequence:
    - wait_template: "{{ is_state('binary_sensor.door', 'on') }}"
      timeout: 10
    - if:
        - "{{ not wait.completed }}"
      then:
        - action: script.door_did_not_open
      else:
        - action: script.turn_on
          target:
            entity_id:
              - script.door_did_open
              - script.play_fanfare
{% endexample %}

{% enddetails %}

For an example that combines **Wait for a template** and **Wait for a trigger** with one timeout for both, refer to [Script: wait a total of 10 seconds](/building-blocks/wait_for_trigger/#script-wait-a-total-of-10-seconds).
