---
title: "Select sound output"
action: webostv.select_sound_output
domain: webostv
description: "Changes the active sound output of an LG webOS TV."
related_actions:
  - webostv.button
  - webostv.command
---

Use this action to change the active sound output of your LG webOS TV. This is handy when you want to switch where the audio plays, for example from the built-in TV speakers to a connected soundbar.

{% include actions/ui_header.md %}

To change the sound output from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **LG webOS TV: Select sound output**.
6. In **Entity**, select the TV you want to control.
7. Set the **Sound output** you want to switch to.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Sound output:
  description: The name of the sound output to switch to, for example tv_speaker or external_speaker.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `webostv.select_sound_output`. A basic example looks like this:

{% example %}
action: |
  action: webostv.select_sound_output
  target:
    entity_id: media_player.lg_webos_tv
  data:
    sound_output: "external_speaker"
{% endexample %}

### Options in YAML

{% options_yaml %}
sound_output:
  description: The name of the sound output to switch to, for example tv_speaker or external_speaker.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" entity_type="LG webOS TV" %}

In the UI, this action has an **Entity** field instead of targets. There, you can select one TV. To use a device, an area, a floor, or a label as the target, select the three dots menu {% icon "mdi:dots-vertical" %} on the action, and then select **Edit in YAML**.

## Response data

This action can return the raw response from the TV, confirming the change. The exact fields depend on your TV. To capture the response, set a `response_variable` and use it in a later step.

## Good to know

- The available sound outputs depend on your TV and what is connected to it. Common values are `tv_speaker`, `external_speaker`, `external_optical`, `external_arc`, and `headphone`.
- You can see the current sound output in the state attributes of the media player entity, under `sound_output`.

{% include actions/stuck.md %}

{% include actions/related.md %}
