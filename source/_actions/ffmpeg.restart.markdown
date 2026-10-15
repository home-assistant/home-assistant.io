---
title: "Restart FFmpeg sensor"
action: ffmpeg.restart
domain: ffmpeg
description: "Stops and starts an FFmpeg-based sensor again."
related_actions:
  - ffmpeg.start
  - ffmpeg.stop
---

Use this action to restart an FFmpeg sensor. The sensor stops analyzing its stream and starts again right away. This helps when a camera stream has dropped and the sensor stopped working.

This action works with the binary sensors of the [FFmpeg motion](/integrations/ffmpeg_motion/) and [FFmpeg noise](/integrations/ffmpeg_noise/) integrations, which use [FFmpeg](/integrations/ffmpeg/) to analyze a camera or audio stream.

{% include actions/ui_header.md %}

To restart an FFmpeg sensor from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Restart**.
6. Optional: In **Entity**, select the FFmpeg sensor. Leave it empty to restart all FFmpeg sensors.
7. Select **Save**.

This action does not support targets. You choose the sensor with the **Entity** option instead.

### Options in the UI

{% options_ui %}
Entity:
  description: The FFmpeg sensor to restart. If you leave it empty, the action applies to all FFmpeg sensors.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ffmpeg.restart`. A basic example looks like this:

{% example %}
action: |
  action: ffmpeg.restart
  data:
    entity_id: binary_sensor.driveway_motion
{% endexample %}

This restarts the `binary_sensor.driveway_motion` sensor.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The FFmpeg sensor or sensors to restart. If omitted, the action applies to all FFmpeg sensors.
  required: false
  type: [string, list]
{% endoptions_yaml %}

## Good to know

- Restarting is the same as stopping the sensor and starting it again.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: restart a sensor that stopped working

If the camera stream drops, the FFmpeg sensor becomes unavailable. This automation restarts it after it has been unavailable for 5 minutes.

- **Trigger**: State changed
  - **Entity**: Driveway motion (`binary_sensor.driveway_motion`)
  - **To**: Unavailable
  - **For at least**: 5 minutes
- **Action**: Restart
  - **Entity**: Driveway motion (`binary_sensor.driveway_motion`)

{% details "YAML example for restarting a sensor that stopped working" %}

{% example %}
automation: |
  alias: "Restart the driveway motion sensor when it stops working"
  triggers:
    - trigger: state
      entity_id: binary_sensor.driveway_motion
      to: "unavailable"
      for:
        minutes: 5
  actions:
    - action: ffmpeg.restart
      data:
        entity_id: binary_sensor.driveway_motion
{% endexample %}

{% enddetails %}

### Automation: restart the sensors every night

Some camera streams slowly get out of sync. Restarting the FFmpeg sensors every night at 03:00 gives them a fresh start.

- **Trigger**: Time
  - **At time**: 03:00
- **Action**: Restart
  - **Entity**: Leave empty to restart all FFmpeg sensors

{% details "YAML example for restarting the sensors every night" %}

{% example %}
automation: |
  alias: "Restart all FFmpeg sensors every night"
  triggers:
    - trigger: time
      at: "03:00:00"
  actions:
    - action: ffmpeg.restart
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
