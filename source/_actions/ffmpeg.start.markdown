---
title: "Start FFmpeg sensor"
action: ffmpeg.start
domain: ffmpeg
description: "Starts analyzing the stream of an FFmpeg-based sensor."
related_actions:
  - ffmpeg.stop
  - ffmpeg.restart
---

Use this action to start an FFmpeg sensor, so it begins analyzing its camera or audio stream again. For example, you only want motion detection on the driveway camera while you're away.

This action works with the binary sensors of the [FFmpeg motion](/integrations/ffmpeg_motion/) and [FFmpeg noise](/integrations/ffmpeg_noise/) integrations, which use [FFmpeg](/integrations/ffmpeg/) to analyze a camera or audio stream.

{% include actions/ui_header.md %}

To start an FFmpeg sensor from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Start**.
6. Optional: In **Entity**, select the FFmpeg sensor. Leave it empty to start all FFmpeg sensors.
7. Select **Save**.

This action does not support targets. You choose the sensor with the **Entity** option instead.

### Options in the UI

{% options_ui %}
Entity:
  description: The FFmpeg sensor to start. If you leave it empty, the action applies to all FFmpeg sensors.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ffmpeg.start`. A basic example looks like this:

{% example %}
action: |
  action: ffmpeg.start
  data:
    entity_id: binary_sensor.driveway_motion
{% endexample %}

This starts the `binary_sensor.driveway_motion` sensor.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The FFmpeg sensor or sensors to start. If omitted, the action applies to all FFmpeg sensors.
  required: false
  type: [string, list]
{% endoptions_yaml %}

## Good to know

- A sensor set up with `initial_state: false` doesn't start by itself when Home Assistant starts. Use this action to start it.
- If the sensor is already running, this action has no effect.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: start motion analysis when you leave

When nobody is home, you want to know about motion on the driveway camera. This automation starts the FFmpeg motion sensor when you leave.

- **Trigger**: Zone
  - **Entity with location**: You (`person.you`)
  - **Zone**: Home
  - **Event**: Leave
- **Action**: Start
  - **Entity**: Driveway motion (`binary_sensor.driveway_motion`)

{% details "YAML example for starting motion analysis when you leave" %}

{% example %}
automation: |
  alias: "Start driveway motion analysis when I leave"
  triggers:
    - trigger: zone
      entity_id: person.you
      zone: zone.home
      event: leave
  actions:
    - action: ffmpeg.start
      data:
        entity_id: binary_sensor.driveway_motion
{% endexample %}

{% enddetails %}

### Automation: start listening in the nursery at bedtime

Start the FFmpeg noise sensor of the nursery camera at 19:30, so you know when the baby wakes up.

- **Trigger**: Time
  - **At time**: 19:30
- **Action**: Start
  - **Entity**: Nursery noise (`binary_sensor.nursery_noise`)

{% details "YAML example for starting a noise sensor at bedtime" %}

{% example %}
automation: |
  alias: "Start the nursery noise sensor at bedtime"
  triggers:
    - trigger: time
      at: "19:30:00"
  actions:
    - action: ffmpeg.start
      data:
        entity_id: binary_sensor.nursery_noise
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
