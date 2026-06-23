---
title: "Set system properties"
action: simplisafe.set_system_properties
domain: simplisafe
description: "Sets one or more properties on a SimpliSafe system."
related_actions:
  - simplisafe.set_pin
  - simplisafe.remove_pin
---

The **Set system properties** action changes the settings of your SimpliSafe base station, such as how long the alarm sounds, the entry and exit delays, the chime and voice prompt volumes, and whether the base station light shows when the system is armed.

You only need to provide the properties you want to change. Anything you leave out keeps its current value. This is handy for adapting your system to the time of day, for example using a longer entry delay during the day and a shorter one at night.

{% include actions/ui_header.md %}

To change system properties from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **SimpliSafe: Set system properties**.
6. Choose the **System**, then set the properties you want to change.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
System:
  description: The SimpliSafe system whose properties should be set.
  required: true
Alarm duration:
  description: The length, in seconds, of a triggered alarm (30 to 480).
  required: false
Alarm volume:
  description: The volume level of a triggered alarm. One of `off`, `low`, `medium`, or `high`.
  required: false
Chime volume:
  description: The volume level of the door chime. One of `off`, `low`, `medium`, or `high`.
  required: false
Entry delay away:
  description: How long, in seconds, to delay triggering when entering while armed away (30 to 255).
  required: false
Entry delay home:
  description: How long, in seconds, to delay triggering when entering while armed home (0 to 255).
  required: false
Exit delay away:
  description: How long, in seconds, to delay triggering when exiting while armed away (45 to 255).
  required: false
Exit delay home:
  description: How long, in seconds, to delay triggering when exiting while armed home (0 to 255).
  required: false
Light:
  description: Whether the base station light shows when the system is armed.
  required: false
Voice prompt volume:
  description: The volume level of the voice prompts. One of `off`, `low`, `medium`, or `high`.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `simplisafe.set_system_properties`. A basic example looks like this:

{% example %}
action: |
  action: simplisafe.set_system_properties
  data:
    device_id: a1b2c3d4e5f6
    alarm_duration: 120
    chime_volume: "high"
{% endexample %}

This sets the alarm duration to 120 seconds and the chime volume to high on the selected system.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The SimpliSafe system whose properties should be set.
  required: true
  type: string
alarm_duration:
  description: >
    The length, in seconds, of a triggered alarm (30 to 480).
  required: false
  type: integer
alarm_volume:
  description: >
    The volume level of a triggered alarm. One of `off`, `low`,
    `medium`, or `high`.
  required: false
  type: string
chime_volume:
  description: >
    The volume level of the door chime. One of `off`, `low`, `medium`,
    or `high`.
  required: false
  type: string
entry_delay_away:
  description: >
    How long, in seconds, to delay triggering when entering while armed
    away (30 to 255).
  required: false
  type: integer
entry_delay_home:
  description: >
    How long, in seconds, to delay triggering when entering while armed
    home (0 to 255).
  required: false
  type: integer
exit_delay_away:
  description: >
    How long, in seconds, to delay triggering when exiting while armed
    away (45 to 255).
  required: false
  type: integer
exit_delay_home:
  description: >
    How long, in seconds, to delay triggering when exiting while armed
    home (0 to 255).
  required: false
  type: integer
light:
  description: >
    Whether the base station light shows when the system is armed.
  required: false
  type: boolean
  default: true
voice_prompt_volume:
  description: >
    The volume level of the voice prompts. One of `off`, `low`,
    `medium`, or `high`.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
