---
title: "Stop FFmpeg sensor"
action: ffmpeg.stop
domain: ffmpeg
description: "Stops analyzing the stream of an FFmpeg-based sensor."
related_actions:
  - ffmpeg.start
  - ffmpeg.restart
---

Use this action to stop an FFmpeg sensor. The sensor stops analyzing its camera or audio stream, which also saves the processing power FFmpeg uses.

This action works with the binary sensors of the [FFmpeg motion](/integrations/ffmpeg_motion/) and [FFmpeg noise](/integrations/ffmpeg_noise/) integrations, which use [FFmpeg](/integrations/ffmpeg/) to analyze a camera or audio stream.

{% include actions/ui_header.md %}

To stop an FFmpeg sensor from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Stop**.
6. Optional: In **Entity**, select the FFmpeg sensor. Leave it empty to stop all FFmpeg sensors.
7. Select **Save**.

This action does not support targets. You choose the sensor with the **Entity** option instead.

### Options in the UI

{% options_ui %}
Entity:
  description: The FFmpeg sensor to stop. If you leave it empty, the action applies to all FFmpeg sensors.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ffmpeg.stop`. A basic example looks like this:

{% example %}
action: |
  action: ffmpeg.stop
  data:
    entity_id: binary_sensor.driveway_motion
{% endexample %}

This stops the `binary_sensor.driveway_motion` sensor.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The FFmpeg sensor or sensors to stop. If omitted, the action applies to all FFmpeg sensors.
  required: false
  type: [string, list]
{% endoptions_yaml %}

## Good to know

- While a sensor is stopped, it's unavailable.
- A stopped sensor stays stopped until you start it again, or until Home Assistant restarts and the sensor has `initial_state` enabled.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: stop motion analysis when you get home

When you're home, you don't need motion alerts from the driveway camera. Stopping the sensor also saves the processing power FFmpeg uses.

- **Trigger**: Zone
  - **Entity with location**: You (`person.you`)
  - **Zone**: Home
  - **Event**: Enter
- **Action**: Stop
  - **Entity**: Driveway motion (`binary_sensor.driveway_motion`)

{% details "YAML example for stopping motion analysis when you get home" %}

{% example %}
automation: |
  alias: "Stop driveway motion analysis when I get home"
  triggers:
    - trigger: zone
      entity_id: person.you
      zone: zone.home
      event: enter
  actions:
    - action: ffmpeg.stop
      data:
        entity_id: binary_sensor.driveway_motion
{% endexample %}

{% enddetails %}

### Automation: stop listening in the nursery in the morning

Stop the FFmpeg noise sensor of the nursery camera at 07:00, when everyone is up.

- **Trigger**: Time
  - **At time**: 07:00
- **Action**: Stop
  - **Entity**: Nursery noise (`binary_sensor.nursery_noise`)

{% details "YAML example for stopping a noise sensor in the morning" %}

{% example %}
automation: |
  alias: "Stop the nursery noise sensor in the morning"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: ffmpeg.stop
      data:
        entity_id: binary_sensor.nursery_noise
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
