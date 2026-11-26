---
title: "Clear sleep timer"
action: music_assistant.clear_sleep_timer
domain: music_assistant
description: "Clears the sleep timer of a Music Assistant player."
related_actions:
  - music_assistant.set_sleep_timer
---

Use this action to cancel the sleep timer of a Music Assistant player, so playback continues instead of stopping. If no sleep timer is set, nothing changes.

{% include actions/ui_header.md %}

To use this action from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Music Assistant media player whose sleep timer you want to clear.
6. From the actions shown for that target, under **Music Assistant**, select **Clear sleep timer**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Username:
  description: Run the action as this Music Assistant user. When omitted, the action runs as the Home Assistant user who started it, if that user is linked to a Music Assistant user. If there is no linked user, the action runs as the default account.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `music_assistant.clear_sleep_timer`. A basic example looks like this:

{% example %}
action: |
  action: music_assistant.clear_sleep_timer
  target:
    entity_id: media_player.bedroom_speaker
{% endexample %}

This clears the sleep timer of the bedroom speaker.

### Options in YAML

{% options_yaml %}
username:
  description: Run the action as this Music Assistant user. When omitted, the action runs as the Home Assistant user who started it, if that user is linked to a Music Assistant user. If there is no linked user, the action runs as the default account.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- For a player that plays along with another player, the action clears the sleep timer of that other player.
- Running the action as a specific Music Assistant user requires Music Assistant server version 2.11 or later.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Script: keep listening

Changed your mind and want to hear the rest of the album? Start this script from a dashboard button to keep the bedroom speaker playing.

- **Action**: Clear sleep timer
  - **Target**: Bedroom speaker

{% details "YAML example for keeping the music playing" %}

{% example %}
script: |
  alias: "Keep listening in the bedroom"
  sequence:
    - action: music_assistant.clear_sleep_timer
      target:
        entity_id: media_player.bedroom_speaker
{% endexample %}

{% enddetails %}

### Automation: cancel the sleep timer when you get up

When the bedroom light turns on, you are awake again. Clear the sleep timer, so the music you start doesn't stop on its own.

- **Trigger**: Light turned on
  - **Target**: Bedroom light
- **Action**: Clear sleep timer
  - **Target**: Bedroom speaker

{% details "YAML example for cancelling the sleep timer when you get up" %}

{% example %}
automation: |
  alias: "Cancel the sleep timer when the bedroom light turns on"
  triggers:
    - trigger: light.turned_on
      target:
        entity_id: light.bedroom
  actions:
    - action: music_assistant.clear_sleep_timer
      target:
        entity_id: media_player.bedroom_speaker
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
