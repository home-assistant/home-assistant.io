---
title: "Volume"
action: hdmi_cec.volume
domain: hdmi_cec
description: "Changes the volume or mute state of the HDMI-CEC audio system."
related_actions:
  - hdmi_cec.power_on
  - hdmi_cec.standby
  - hdmi_cec.select_device
  - hdmi_cec.update
  - hdmi_cec.send_command
---

The **Volume** action changes the volume on your HDMI-CEC audio system, such as a TV or AV receiver. You can step the volume up or down by a number of levels, or mute and unmute the audio.

Use it to give a dashboard button or an automation control over the volume, for example lowering it automatically when a doorbell rings.

{% include actions/ui_header.md %}

To change the volume from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HDMI-CEC: Volume**.
6. Set how many levels to step **Up** or **Down**, or choose a **Mute** option.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Up:
  description: The number of levels to increase the volume by.
  required: false
Down:
  description: The number of levels to decrease the volume by.
  required: false
Mute:
  description: Mute, unmute, or toggle the audio system.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hdmi_cec.volume`. A basic example looks like this:

{% example %}
action: |
  action: hdmi_cec.volume
  data:
    down: 3
{% endexample %}

This decreases the volume by three levels.

### Options in YAML

{% options_yaml %}
up:
  description: >
    The number of levels to increase the volume by.
  required: false
  type: integer
down:
  description: >
    The number of levels to decrease the volume by.
  required: false
  type: integer
mute:
  description: >
    Mute, unmute, or toggle the audio system. One of `on`, `off`, or
    `toggle`.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- Use one option per call. Combine separate **Volume** actions if you need to do more than one thing.
- The audio system must support volume control over CEC for this action to have an effect.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: lower the volume when the doorbell rings

When someone rings the doorbell, step the volume down so you can hear them.

- **Trigger**: The doorbell button is pressed
- **Action**: HDMI-CEC: Volume

{% details "YAML example for lowering the volume on a doorbell press" %}

{% example %}
automation: |
  alias: "Lower volume on doorbell"
  triggers:
    - trigger: state
      entity_id: binary_sensor.doorbell
      to: "on"
  actions:
    - action: hdmi_cec.volume
      data:
        down: 5
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
