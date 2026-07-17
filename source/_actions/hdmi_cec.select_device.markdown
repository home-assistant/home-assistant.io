---
title: "Select device"
action: hdmi_cec.select_device
domain: hdmi_cec
description: "Makes an HDMI-CEC device the active source."
related_actions:
  - hdmi_cec.power_on
  - hdmi_cec.standby
  - hdmi_cec.update
  - hdmi_cec.send_command
  - hdmi_cec.volume
---

The **Select device** action makes one HDMI-CEC device the active source, so your TV switches to its input. It is the CEC equivalent of pressing the input button on your remote and choosing, for example, your media player or game console.

Use it to jump straight to the right input as part of an automation, such as switching the TV to your streaming box when you start a movie.

{% include actions/ui_header.md %}

To switch to an HDMI-CEC device from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HDMI-CEC: Select device**.
6. Enter the **Device** you want to make the active source.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Device:
  description: The device to select. Use an entity ID, a physical address, or an alias from your configuration.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hdmi_cec.select_device`. A basic example looks like this:

{% example %}
action: |
  action: hdmi_cec.select_device
  data:
    device: "Chromecast"
{% endexample %}

This makes the device you name the active source on your TV.

### Options in YAML

{% options_yaml %}
device:
  description: >
    The device to select. Use an entity ID, a physical address, or an
    alias from your configuration.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- You can refer to the device in three ways: by an alias from your `hdmi_cec` configuration (`"Chromecast"`), by an entity ID (`"switch.hdmi_3"`), or by a physical address (`"1.1.0.0"`).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: switch to the streaming box for movie night

When movie night starts, make your streaming box the active source so the TV shows the right input.

- **Trigger**: A movie-night helper turns on
- **Action**: HDMI-CEC: Select device

{% details "YAML example for switching to a device" %}

{% example %}
automation: |
  alias: "Switch to streaming box"
  triggers:
    - trigger: state
      entity_id: input_boolean.movie_night
      to: "on"
  actions:
    - action: hdmi_cec.select_device
      data:
        device: "Chromecast"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
