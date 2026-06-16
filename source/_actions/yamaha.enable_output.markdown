---
title: "Enable output"
action: yamaha.enable_output
domain: yamaha
description: "Enables or disables an output port on a Yamaha receiver."
related_actions:
  - yamaha.menu_cursor
  - yamaha.select_scene
---

Use this action to enable or disable an output port, such as an HDMI port, on a Yamaha receiver.

{% include actions/ui_header.md %}

To enable or disable an output from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the receiver you want to control.
6. From the actions shown for that target, select **Yamaha: Enable output**.
7. Set the **Port** and turn **Enabled** on or off.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Port:
  description: The output port to enable or disable, for example `hdmi1`.
  required: true
Enabled:
  description: Turn on to enable the port, turn off to disable it.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `yamaha.enable_output`. A basic example looks like this:

{% example %}
action: |
  action: yamaha.enable_output
  target:
    entity_id: media_player.living_room_stereo
  data:
    port: hdmi1
    enabled: true
{% endexample %}

This enables the `hdmi1` output on `media_player.living_room_stereo`.

### Options in YAML

{% options_yaml %}
port:
  description: The output port to enable or disable, for example `hdmi1`.
  required: true
  type: string
enabled:
  description: Set to `true` to enable the port, or `false` to disable it.
  required: true
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
