---
title: "Speak"
action: tts.speak
domain: elevenlabs
description: "Speaks a message with ElevenLabs text-to-speech."
---

Use this action to send a message to a media player and have ElevenLabs text-to-speech speak it aloud.

{% include actions/ui_header.md %}

To speak a message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the ElevenLabs TTS entity.
6. From the actions shown for that target, select **Speak**.
7. Select the media player and enter the message.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media player entity:
  description: The media player that plays the spoken message.
Message:
  description: The text to speak.
Cache:
  description: Whether to cache the generated audio.
  required: false
  default: true
Language:
  description: The language to use.
  required: false
Options:
  description: ElevenLabs TTS options, such as the voice ID and model ID.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tts.speak`. A basic example looks like this:

{% example %}
action: |
  action: tts.speak
  target:
    entity_id: tts.elevenlabs
  data:
    media_player_entity_id: media_player.living_room
    message: "Hello, can you hear me now?"
    options:
      voice: VOICE_ID
      model: MODEL_ID
{% endexample %}

This speaks the message on `media_player.living_room`.

### Options in YAML

{% options_yaml %}
media_player_entity_id:
  description: The media player that plays the spoken message.
  required: true
  type: string
message:
  description: The text to speak.
  required: true
  type: string
cache:
  description: Whether to cache the generated audio.
  required: false
  type: boolean
  default: true
language:
  description: The language to use.
  required: false
  type: string
options:
  description: ElevenLabs TTS options, such as the voice ID and model ID.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md domain="tts" %}

## ElevenLabs TTS options

{% configuration %}
voice:
  description: The voice ID for the ElevenLabs voice to use. This overrides the default voice of the entity.
  required: false
  type: string
model:
  description: The model ID for the text-to-speech model to use. This overrides the default model of the entity.
  required: false
  type: string
{% endconfiguration %}

## Good to know

- You can find the available voices in your ElevenLabs VoiceLab.
- You can find model IDs in the ElevenLabs models documentation.

{% include actions/stuck.md %}

{% include actions/related.md %}
