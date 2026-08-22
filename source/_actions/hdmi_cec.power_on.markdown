---
title: "Power on"
action: hdmi_cec.power_on
domain: hdmi_cec
description: "Powers on all devices on the HDMI-CEC bus that support this function."
related_actions:
  - hdmi_cec.standby
  - hdmi_cec.select_device
  - hdmi_cec.update
  - hdmi_cec.send_command
  - hdmi_cec.volume
---

The **Power on** action wakes up every device on the HDMI-CEC bus that supports being powered on over CEC. It sends a single command that the connected devices, such as your TV, AV receiver, or media player, act on together.

This is handy as the start of a "movie night" automation, where one tap powers on your screen and sound system at the same time.

{% include actions/ui_header.md %}

To power on your HDMI-CEC devices from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HDMI-CEC: Power on**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hdmi_cec.power_on`. A basic example looks like this:

{% example %}
action: |
  action: hdmi_cec.power_on
{% endexample %}

This powers on all CEC devices that support the command.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- Only devices that support the CEC power-on command respond. Some devices ignore it or only wake when they are the active source.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: power on the screen and sound for movie night

When you start a movie night, power on every connected CEC device at once.

- **Trigger**: A movie-night helper turns on
- **Action**: HDMI-CEC: Power on

{% details "YAML example for powering on devices at movie night" %}

{% example %}
automation: |
  alias: "Power on for movie night"
  triggers:
    - trigger: state
      entity_id: input_boolean.movie_night
      to: "on"
  actions:
    - action: hdmi_cec.power_on
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
