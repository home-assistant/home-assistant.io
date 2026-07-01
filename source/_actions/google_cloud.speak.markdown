---
title: "Speak"
action: tts.speak
domain: google_cloud
description: "Speaks a message with Google Cloud text-to-speech."
---

Use this action to send a message to a media player and have Google Cloud text-to-speech speak it aloud.

{% include actions/ui_header.md %}

To speak a message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Google Cloud TTS entity.
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
  description: Google Cloud TTS options, such as voice, gender, speed, pitch, gain, text type, and audio profiles.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tts.speak`. A basic example looks like this:

{% example %}
action: |
  action: tts.speak
  target:
    entity_id: tts.google_cloud
  data:
    media_player_entity_id: media_player.living_room_display
    message: "This is a test."
    language: en-US
    options:
      gender: male
      voice: en-US-Wavenet-F
      encoding: linear16
      speed: 0.9
      pitch: -2.5
      gain: -5.0
      text_type: ssml
      profiles:
        - telephony-class-application
        - wearable-class-device
{% endexample %}

This speaks the message on `media_player.living_room_display`.

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
  description: Google Cloud TTS options, such as voice, gender, speed, pitch, gain, text type, and audio profiles.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md domain="tts" %}

## Google Cloud TTS options

{% configuration %}
gender:
  description: The voice gender to use.
  required: false
  type: string
voice:
  description: The voice to use.
  required: false
  type: string
encoding:
  description: The audio encoding to use.
  required: false
  type: string
speed:
  description: The speaking rate to use.
  required: false
  type: float
pitch:
  description: The pitch of the voice.
  required: false
  type: float
gain:
  description: The volume gain of the voice.
  required: false
  type: float
text_type:
  description: The text type. Use `text` or `ssml`.
  required: false
  type: string
profiles:
  description: The audio effects profile to apply. This option also accepts a list of profile IDs.
  required: false
  type: string
{% endconfiguration %}

## Good to know

- For SSML, set `text_type` to `ssml`.
- For supported voices and audio profiles, see the Google Cloud text-to-speech documentation.

{% include actions/stuck.md %}

{% include actions/related.md %}
