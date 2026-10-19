---
title: "Wait for time to pass (delay)"
building_block: delay
category: waiting
description: "Pause the automation or script for a set time."
related_building_blocks:
  - wait_template
  - wait_for_trigger
---

The **Wait for time to pass (delay)** building block pauses the automation or script for a set time. Use it when the next steps should run a while later, for example, to turn off a light 5 minutes after it turned on.

## Using this building block from the user interface

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select an automation. To edit a script, go to the **Scripts** tab and select the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Wait for time to pass (delay)**.
4. In **Duration**, enter how long to wait.
5. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: How long to wait, in hours, minutes, seconds, and milliseconds.
  required: true
{% endoptions_ui %}

## Using this building block in YAML

In YAML, use `delay`. You can enter the duration in several formats:

- A number of seconds, for example, `5` to wait 5 seconds, or `1.5` to wait 1.5 seconds.
- A time in `HH:MM` format, for example, `"01:00"` to wait 1 hour.
- A time in `HH:MM:SS` format, for example, `"00:01:30"` to wait 1 minute and 30 seconds.
- A mapping with `days`, `hours`, `minutes`, `seconds`, and `milliseconds`. You can combine them, and you need at least one.

{% example %}
action: |
  alias: "Wait 5 seconds"
  delay: 5
{% endexample %}

{% example %}
action: |
  delay:
    minutes: 1
{% endexample %}

All formats accept templates. This example waits as many minutes as `input_number.minute_delay` is set to:

{% example %}
action: |
  delay: "{{ states('input_number.minute_delay') | multiply(60) | int }}"
{% endexample %}

### Options in YAML

{% options_yaml %}
delay:
  description: How long to wait. Use a number of seconds, a time in `HH:MM` or `HH:MM:SS` format, or a mapping with `days`, `hours`, `minutes`, `seconds`, and `milliseconds`. All formats accept templates.
  required: true
  type: [integer, float, string, map, template]
{% endoptions_yaml %}

## Good to know

- A delay in milliseconds is at least that long, but not exact.
- A delay with a template can only be edited in YAML.
- A restart of Home Assistant stops automations and scripts that are waiting. They don't continue after the restart.

## Examples

### Automation: Turn off the light 5 minutes after the last motion

When the hallway motion sensor detects motion, this automation turns on the hallway light, waits 5 minutes, and turns the light off again. The automation uses the **Restart** [mode](/docs/automation/modes/): each time the sensor detects new motion, the automation starts over, and the 5 minutes start again. With the default **Single** mode, the light turns off 5 minutes after the first motion, even if the sensor detects new motion in the meantime.

- **Trigger**: State changed
  - **Entity**: Hallway motion (`binary_sensor.hallway_motion`)
  - **To**: Detected
- **Action**: Turn on light
  - **Target**: Hallway light (`light.hallway`)
- **Action**: Wait for time to pass (delay)
  - **Duration**: `5` minutes
- **Action**: Turn off light
  - **Target**: Hallway light (`light.hallway`)
- **Mode**: Restart. To change it, select **Menu** {% icon "mdi:dots-vertical" %} > **Change mode**.

{% details "YAML example" %}

{% example %}
automation: |
  alias: "Turn off the hallway light 5 minutes after the last motion"
  mode: restart
  triggers:
    - trigger: state
      entity_id: binary_sensor.hallway_motion
      to: "on"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
    - delay:
        minutes: 5
    - action: light.turn_off
      target:
        entity_id: light.hallway
{% endexample %}

{% enddetails %}
