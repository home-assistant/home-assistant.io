---
title: "Set music mode"
action: yeelight.set_music_mode
domain: yeelight
description: "Enables or disables music mode on a Yeelight light."
related_actions:
  - yeelight.set_mode
  - yeelight.start_flow
  - yeelight.set_color_flow_scene
---

The **Set music mode** action enables or disables music mode on a Yeelight light.

Music mode opens a direct connection to the light, which lets Home Assistant send many commands in quick succession without hitting the rate limit the light normally applies. This is useful for smooth, fast effects, such as light shows that follow your music.

{% include actions/ui_header.md %}

To enable or disable music mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Yeelight light you want to control.
6. From the actions shown for that target, select **Set music mode**.
7. Enable or disable **Music mode**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Music mode:
  description: Turn music mode on or off.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `yeelight.set_music_mode`. A basic example looks like this:

{% example %}
action: |
  action: yeelight.set_music_mode
  target:
    entity_id: light.living_room
  data:
    music_mode: true
{% endexample %}

### Options in YAML

{% options_yaml %}
music_mode:
  description: Turn music mode on or off.
  required: true
  type: boolean
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
