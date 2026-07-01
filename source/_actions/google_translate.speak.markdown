---
title: "Speak"
action: tts.speak
domain: google_translate
description: "Speaks a message on a media player using Google Translate text-to-speech."
related_actions:
  - tts.speak
---

Use this action to turn text into speech with a Google Translate text-to-speech entity and play it on a media player. This is the recommended action when you set up Google Translate text-to-speech from the UI.

{% include actions/ui_header.md %}

To speak a message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Google Translate text-to-speech entity you want to use.
6. From the actions shown for that target, select **Speak**.
7. Select the **Media player entity** to play the message on, and enter the **Message**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media player entity:
  description: The media player to play the message on.
Message:
  description: The text you want to convert into speech.
Cache:
  description: Store this message locally so that when the same text is requested again, the output can be produced more quickly. The default is `true`.
  required: false
Language:
  description: The language to speak the message in.
  required: false
Options:
  description: Additional settings for Google Translate text-to-speech, such as `tld`.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tts.speak`. A basic example looks like this:

{% example %}
action: |
  action: tts.speak
  target:
    entity_id: tts.google_en_com
  data:
    media_player_entity_id: media_player.living_room
    message: "Hello, can you hear me now?"
{% endexample %}

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
  description: The language to speak the message in.
  required: false
  type: string
options:
  description: Additional Google Translate text-to-speech settings, such as `tld`.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md domain="tts" %}

## Good to know

- The Google Translate text-to-speech entity is named for the language you created it with.
- For more information about text-to-speech options, see the [TTS documentation](/integrations/tts/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: announce that the door is open

Speak a short message on the living room media player when the front door opens.

- **Trigger**: State, front door changes to open
- **Action**: Speak
  - **Target**: Google Translate text-to-speech entity
  - **Media player entity**: Living room
  - **Message**: The front door is open.

{% details "YAML example for announcing an open door" %}

{% example %}
automation: |
  alias: "Announce when the front door opens"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  actions:
    - action: tts.speak
      target:
        entity_id: tts.google_en_com
      data:
        media_player_entity_id: media_player.living_room
        message: "The front door is open."
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
