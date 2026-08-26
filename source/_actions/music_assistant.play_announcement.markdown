---
title: "Play announcement"
action: music_assistant.play_announcement
domain: music_assistant
description: "Plays an announcement on a Music Assistant player with fine-grained control options."
related_actions:
  - music_assistant.play_media
  - music_assistant.transfer_queue
---

Use this action to play an announcement on a Music Assistant player. Announce a sound from a URL, for example a doorbell sound when motion is detected, or announce spoken text by providing a message and the [text-to-speech](/integrations/tts/) entity that should speak it. Provide either a message or a URL, not both.

{% include actions/ui_header.md %}

To play an announcement from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Music Assistant media player you want to play the announcement on.
6. From the actions shown for that target, select **Play announcement**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Message:
  description: The text to announce. Requires a text-to-speech entity.
Text-to-speech entity:
  description: The text-to-speech entity that speaks the message.
URL:
  description: The URL to the notification sound.
Use pre-announce:
  description: When enabled, a pre-announcement sound plays before the announcement.
Pre-announce URL:
  description: The URL to the pre-announcement sound.
Announce volume:
  description: A forced volume level for the announcement. Omit to use the player default.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `music_assistant.play_announcement`. A basic example looks like this:

{% example %}
action: |
  action: music_assistant.play_announcement
  target:
    entity_id: media_player.kitchen_speaker
  data:
    url: http://example.com/doorbell.mp3
{% endexample %}

To announce spoken text, provide a message and the text-to-speech entity that speaks it:

{% example %}
action: |
  action: music_assistant.play_announcement
  target:
    entity_id: media_player.kitchen_speaker
  data:
    message: Dinner is ready!
    tts_entity_id: tts.piper
{% endexample %}

### Options in YAML

{% options_yaml %}
message:
  description: The text to announce, spoken by the text-to-speech entity set in `tts_entity_id`. Provide either a message or a URL.
  required: false
  type: string
tts_entity_id:
  description: The text-to-speech entity that speaks the message. Required when `message` is used.
  required: false
  type: string
url:
  description: The URL to the notification sound. Provide either a message or a URL.
  required: false
  type: string
use_pre_announce:
  description: When set to `true`, a pre-announcement sound plays before the announcement.
  required: false
  type: boolean
  default: false
pre_announce_url:
  description: The URL to the pre-announcement sound.
  required: false
  type: string
announce_volume:
  description: A forced volume level for the announcement, from 1 to 100. Omit to use the player default.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
