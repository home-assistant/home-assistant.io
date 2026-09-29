---
title: "Update setting"
action: vizio.update_setting
domain: vizio
description: "Updates the value of a setting on a VIZIO SmartCast device."
---

Use this action to update a setting on a VIZIO SmartCast device. You need to know the type and name of the setting you want to change.

You can find these in the SmartCast app, under the device settings for your device. The setting type is the lowercase version of the first menu item you select, such as `display`, `audio`, or `system`. The setting name is what you see in the app, in lowercase and with spaces replaced by underscores, so "AV delay" becomes `av_delay`.

{% include actions/ui_header.md %}

To update a setting from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **VIZIO SmartCast: Update setting**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select your VIZIO media player entity.
7. Enter the **Setting type**, **Setting name**, and **New value**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Setting type:
  description: "The type of setting to change, such as audio, display, or system."
  required: true
Setting name:
  description: "The name of the setting to change, such as eq."
  required: true
New value:
  description: The new value for the setting.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `vizio.update_setting`. A basic example looks like this:

{% example %}
action: |
  action: vizio.update_setting
  target:
    entity_id: media_player.vizio_smartcast
  data:
    setting_type: audio
    setting_name: eq
    new_value: Music
{% endexample %}

This sets the audio equalizer preset to "Music".

### Options in YAML

{% options_yaml %}
setting_type:
  description: >
    The type of setting to change, such as `audio`, `display`, or `system`.
  required: true
  type: string
setting_name:
  description: >
    The name of the setting to change, such as `eq`.
  required: true
  type: string
new_value:
  description: The new value for the setting.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: switch the equalizer when a movie starts

This automation switches the TV's audio equalizer to the "Movie" preset whenever the VIZIO media player starts playing, giving you better sound for films.

- **Trigger**: The VIZIO media player starts playing
- **Action**: VIZIO SmartCast: Update setting

{% details "YAML example for switching the equalizer on playback" %}

{% example %}
automation: |
  alias: "VIZIO movie equalizer"
  triggers:
    - trigger: state
      entity_id: media_player.vizio_smartcast
      to: "playing"
  actions:
    - action: vizio.update_setting
      target:
        entity_id: media_player.vizio_smartcast
      data:
        setting_type: audio
        setting_name: eq
        new_value: Movie
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
