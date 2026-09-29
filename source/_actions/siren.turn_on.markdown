---
title: "Turn on siren"
action: siren.turn_on
domain: siren
description: "Turns on a siren."
related_actions:
  - siren.turn_off
  - siren.toggle
---

Use this action to turn on a siren or chime, for example to sound an alarm when a door opens while you are away.

{% include actions/ui_header.md %}

To turn on a siren from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the siren you want to turn on.
6. From the actions shown for that target, select **Turn on siren**.
7. Optionally, set a tone, volume, or duration if your siren supports them.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Tone:
  description: The tone to emit. Your siren must support tones, and you can use either the key or the value from its list of available tones.
  required: false
Volume:
  description: The volume to play at, from 0 (inaudible) to 1 (maximum). Your siren must support setting the volume.
  required: false
Duration:
  description: The number of seconds the sound is played. Your siren must support setting a duration.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `siren.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: siren.turn_on
  target:
    entity_id: siren.entry
{% endexample %}

This turns on `siren.entry`.

### Options in YAML

{% options_yaml %}
tone:
  description: The tone to emit. Your siren must support tones, and you can use either the key or the value from its list of available tones.
  required: false
  type: string
volume_level:
  description: The volume to play at, from 0 (inaudible) to 1 (maximum). Your siren must support setting the volume.
  required: false
  type: float
duration:
  description: The number of seconds the sound is played. Your siren must support setting a duration.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with sirens that support being turned on.
- The tone, volume, and duration options only work if your siren supports them. Check the documentation of the integration that provides the siren.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: sound the siren when a door opens while away

Turn on a siren when a door opens and nobody is home.

- **Trigger**: State: Front door opens
- **Condition**: Nobody is home
- **Action**: Turn on siren
  - **Target**: Entry siren

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Sound the siren when the door opens while away"
    triggers:
      - trigger: state
        entity_id: binary_sensor.front_door
        to: "on"
    conditions:
      - condition: state
        entity_id: zone.home
        state: "0"
    actions:
      - action: siren.turn_on
        target:
          entity_id: siren.entry
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
