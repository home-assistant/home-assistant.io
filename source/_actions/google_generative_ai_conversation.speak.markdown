---
title: "Speak"
action: tts.speak
domain: google_generative_ai_conversation
description: "Speaks a message with Google Gemini text-to-speech."
---

Use this action to send a message to a media player and have Google Gemini text-to-speech speak it aloud.

{% include actions/ui_header.md %}

To speak a message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Google Gemini TTS entity.
6. From the actions shown for that target, select **Speak**.
7. Select the media player and enter the message.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media player entity:
  description: The media player that plays the spoken message.
Message:
  description: The text to speak. You can use natural language to guide the style, accent, pace, and tone.
Cache:
  description: Whether to cache the generated audio.
  required: false
  default: true
Language:
  description: The language to use. Google Gemini detects the input language automatically.
  required: false
Options:
  description: Google Gemini TTS options, such as the voice name.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tts.speak`. A basic example looks like this:

{% example %}
action: |
  action: tts.speak
  target:
    entity_id: tts.google_generative_ai_tts
  data:
    media_player_entity_id: media_player.living_room
    message: "Say cheerfully: Have a wonderful day!"
    options:
      voice: achernar
{% endexample %}

This speaks the message on `media_player.living_room`.

### Options in YAML

{% options_yaml %}
media_player_entity_id:
  description: The media player that plays the spoken message.
  required: true
  type: string
message:
  description: The text to speak. You can use natural language to guide the style, accent, pace, and tone.
  required: true
  type: string
cache:
  description: Whether to cache the generated audio.
  required: false
  type: boolean
  default: true
language:
  description: The language to use. Google Gemini detects the input language automatically.
  required: false
  type: string
options:
  description: Google Gemini TTS options, such as the voice name.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md domain="tts" %}

## Google Gemini TTS options

{% configuration %}
voice:
  description: The voice name to use for the generated speech. The default is `zephyr`.
  required: false
  type: string
{% endconfiguration %}

## Good to know

- The input language is detected automatically.
- For available voices and supported languages, see the Google AI speech generation documentation.

{% include actions/stuck.md %}

{% include actions/related.md %}
