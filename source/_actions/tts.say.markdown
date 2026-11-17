---
title: "Say a TTS message"
action: tts.say
domain: tts
description: "Says a message on a media player using a legacy text-to-speech platform."
related_actions:
  - tts.speak
  - tts.clear_cache
---

Use this action to turn text into speech and play it on a media player using a legacy text-to-speech platform set up through YAML. If you set up text-to-speech through the UI, use [Speak](/actions/tts.speak/) instead.

Each legacy platform registers its own version of this action, named after the platform. For example, the Google Translate platform registers it as `tts.google_translate_say`. Replace the platform part with the platform you use.

{% include actions/ui_header.md %}

To say a message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Say a TTS message** for the platform you use.
6. Select the **Entity** to play the message on, set the **Message**, and any other options.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The media player to play the message on.
Message:
  description: The text you want to convert into speech.
Cache:
  description: Store this message locally so that when the same text is requested again, the output can be produced more quickly.
  required: false
Language:
  description: The language to speak the message in, using the format required by the platform.
  required: false
Options:
  description: Additional settings specific to the platform, such as voice or audio format.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action by its platform-specific name, such as `tts.google_translate_say`. Pass the media player as `entity_id`:

{% example %}
action: |
  action: tts.google_translate_say
  data:
    entity_id: media_player.living_room
    message: "May the force be with you."
{% endexample %}

This speaks a message on `media_player.living_room` using the Google Translate platform. To play on every media player, set `entity_id` to `all`.

### Options in YAML

{% options_yaml %}
entity_id:
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
  default: false
language:
  description: The language to speak the message in, using the format required by the platform.
  required: false
  type: string
options:
  description: Additional settings specific to the platform, such as voice or audio format.
  required: false
  type: map
{% endoptions_yaml %}

The `options` setting can include [preferred audio settings](/integrations/tts/#preferred-audio-settings), along with any other settings the platform supports, such as voice or speed. Check the documentation of your text-to-speech platform for the settings it accepts.

## Good to know

- This action takes the media player as an `entity_id` value rather than a target.
- Caching stores the spoken result so the same message plays faster next time. For more details, see the [cache section](/integrations/tts/#cache).
- If a media player cannot play the audio format a platform produces, set [preferred audio settings](/integrations/tts/#preferred-audio-settings) in `options` to convert it.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
