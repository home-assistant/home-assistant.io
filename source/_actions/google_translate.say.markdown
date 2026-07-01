---
title: "Say a TTS message"
action: tts.google_translate_say
domain: google_translate
description: "Says a message on a media player using the legacy Google Translate text-to-speech platform."
related_actions:
  - tts.say
---

Use this action to turn text into speech with the legacy Google Translate text-to-speech platform set up in {% term "configuration.yaml" %}. If you set up Google Translate text-to-speech from the UI, use [Speak](/actions/google_translate.speak/) instead.

{% include actions/ui_header.md %}

To say a message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Say a TTS message**.
6. Select the **Entity** to play the message on, enter the **Message**, and set any other options.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The media player to play the message on.
Message:
  description: The text you want to convert into speech.
Cache:
  description: Store this message locally so that when the same text is requested again, the output can be produced more quickly. The default is `false`.
  required: false
Language:
  description: The language to speak the message in.
  required: false
Options:
  description: Additional Google Translate text-to-speech settings, such as `tld`.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tts.google_translate_say`. A basic example looks like this:

{% example %}
action: |
  action: tts.google_translate_say
  data:
    entity_id: media_player.living_room
    message: "May the force be with you."
{% endexample %}

### Options in YAML

{% options_yaml %}
entity_id:
  description: The media player to play the message on. To play on every media player, set `entity_id` to `all`.
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
  description: The language to speak the message in.
  required: false
  type: string
options:
  description: Additional Google Translate text-to-speech settings, such as `tld`.
  required: false
  type: map
{% endoptions_yaml %}

## Good to know

- This action takes the media player as an `entity_id` value rather than a target.
- You can set the Google Translate top-level domain with `options.tld`, for example `co.uk` for UK English.
- The action name can be customized with the `service_name` configuration option in the legacy platform configuration.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: say a message in French

Speak a French message on the living room media player.

- **Trigger**: State, door changes to open
- **Action**: Say a TTS message
  - **Entity**: Living room
  - **Message**: La porte est ouverte.
  - **Language**: fr

{% details "YAML example for playing a French message" %}

{% example %}
automation: |
  alias: "Say a French message when the door opens"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  actions:
    - action: tts.google_translate_say
      data:
        entity_id: media_player.living_room
        message: "La porte est ouverte."
        language: "fr"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
