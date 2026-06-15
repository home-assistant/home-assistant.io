---
title: "Speak"
action: tts.speak
domain: tts
description: "Speaks a message on a media player using text-to-speech."
related_actions:
  - tts.say
  - tts.clear_cache
---

Use this action to turn text into speech and play it on a media player. Each text-to-speech entity represents one speech provider, so you pick the entity for the voice you want, then pick the media player that plays the sound.

{% include actions/ui_header.md %}

To speak a message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the text-to-speech entity you want to use.
6. From the actions shown for that target, select **Speak**.
7. Select the **Media player entity** to play the message on, set the **Message**, and any other options.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media player entity:
  description: The media player to play the message on.
Message:
  description: The text you want to convert into speech.
Cache:
  description: Store this message locally so that when the same text is requested again, the output can be produced more quickly.
  required: false
Language:
  description: The language to speak the message in, using the format required by the text-to-speech entity.
  required: false
Options:
  description: Additional settings specific to the text-to-speech entity, such as voice or audio format.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tts.speak`. A basic example looks like this:

{% example %}
action: |
  action: tts.speak
  target:
    entity_id: tts.example
  data:
    media_player_entity_id: media_player.kitchen
    message: May the force be with you.
{% endexample %}

This speaks a message on `media_player.kitchen` using the `tts.example` entity.

### Options in YAML

{% options_yaml %}
media_player_entity_id:
  description: The media player to play the message on.
  required: true
  type: string
message:
  description: The text you want to convert into speech.
  required: true
  type: string
cache:
  description: Store this message locally so that when the same text is requested again, the output can be produced more quickly.
  required: false
  type: boolean
  default: true
language:
  description: The language to speak the message in, using the format required by the text-to-speech entity.
  required: false
  type: string
options:
  description: Additional settings specific to the text-to-speech entity, such as voice or audio format.
  required: false
  type: map
{% endoptions_yaml %}

The `options` setting can include [preferred audio settings](/integrations/tts/#preferred-audio-settings), along with any other settings the text-to-speech entity supports, such as voice or speed. Check the documentation of your text-to-speech integration for the settings it accepts.

{% include actions/targets.md %}

## Good to know

- Caching stores the spoken result so the same message plays faster next time. For more details, see the [cache section](/integrations/tts/#cache).
- If a media player cannot play the audio format a provider produces, set [preferred audio settings](/integrations/tts/#preferred-audio-settings) in `options` to convert it.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: announce the weather every morning

Each morning, speak the current weather on the kitchen media player.

- **Trigger**: Time: 07:00
- **Action**: Speak
  - **Target**: Text-to-speech entity
  - **Media player entity**: Kitchen
  - **Message**: Good morning. Today's weather is sunny.

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Speak the weather every morning"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: tts.speak
      target:
        entity_id: tts.example
      data:
        media_player_entity_id: media_player.kitchen
        message: Good morning. Today's weather is sunny.
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
