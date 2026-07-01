---
title: "Say a TTS message"
action: tts.google_cloud_say
domain: google_cloud
description: "Speaks a message with the legacy Google Cloud TTS platform."
related_actions:
  - tts.say
---

Use this legacy action only if you configured the legacy `google_cloud` text-to-speech platform in `configuration.yaml`.

{% include actions/ui_header.md %}

To use the legacy Google Cloud say action from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select **Google Cloud: Say a TTS message**.
6. Select the media player and enter the message.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entity ID:
  description: The media player that plays the spoken message.
Message:
  description: The text to speak.
Cache:
  description: Whether to cache the generated audio.
  required: false
  default: false
Language:
  description: The language to use.
  required: false
Options:
  description: Google Cloud TTS options.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tts.google_cloud_say`. A basic example looks like this:

{% example %}
action: |
  action: tts.google_cloud_say
  data:
    entity_id: media_player.living_room_display
    message: "This is a test."
    language: en-US
{% endexample %}

This speaks the message on `media_player.living_room_display`.

### Options in YAML

{% options_yaml %}
entity_id:
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
  default: false
language:
  description: The language to use.
  required: false
  type: string
options:
  description: Google Cloud TTS options.
  required: false
  type: map
{% endoptions_yaml %}

This action does not support targets.

## Good to know

New setups should use the Google Cloud TTS entity with the [Speak](/actions/google_cloud.speak/) action. If you still use `tts.google_cloud_say`, keep the legacy `google_cloud` text-to-speech platform in `configuration.yaml` until you migrate to `tts.speak`.

{% include actions/stuck.md %}

{% include actions/related.md %}
