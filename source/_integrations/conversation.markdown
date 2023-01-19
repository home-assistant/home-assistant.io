---
title: Conversation
description: Instructions on how to have conversations with your Home Assistant.
ha_category:
  - Voice
ha_release: 0.7
ha_quality_scale: internal
ha_iot_class: Local Push
ha_codeowners:
  - '@home-assistant/core'
ha_domain: conversation
ha_integration_type: system
---

The conversation integration allows you to converse with Home Assistant. You can either converse by pressing the microphone in the frontend (supported browsers only (no iOS)) or by calling the `conversation/process` service with the transcribed text.

<p class='img'>
  <img src="/images/screenshots/voice-commands.png" />
  Screenshot of the conversation interface in Home Assistant.
</p>

```yaml
# Example base configuration.yaml entry
conversation:
```

## Default sentences

By default, a collection of [community contributed sentences](https://github.com/home-assistant/intents/) are supported in a growing [list of languages](https://developers.home-assistant.io/docs/voice/intent-recognition/supported-languages).

In English, you can say things like "turn on kitchen lights" or "turn off lights in the bedroom" if you have an area named "bedroom".

## Adding custom sentences

Custom sentences can be mapped to your own [intents](https://developers.home-assistant.io/docs/intent_index) and then linked to any action in Home Assistant with the [intent script integration](/integrations/intent_script/).

To get started, create a `custom_sentences/<language>` directory in your Home Assistant `config` directory where `<language>` is the [language code](https://developers.home-assistant.io/docs/voice/intent-recognition/supported-languages) you've configured, such as `en` for English.

For an English example, create the file `config/custom_sentences/en/temperature.yaml` and add:

{% raw %}

```yaml
# Example temperature.yaml entry
language: "en"
intents:
  OutsideHumidity:
    data:
      - sentences:
          - "What is the humidity outside"
```

{% endraw %}

To produce a response, create an `intent_script` entry in your `configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml entry
intent_script:
  OutsideHumidity:
    speech:
      text: "It is currently {{ states("sensor.outside_humidity") }} percent humidity outside."
```

{% endraw %}

## Adding advanced custom sentences

Sentences can contain a specialized [template syntax](https://developers.home-assistant.io/docs/voice/intent-recognition/template-sentence-syntax), such as optional words and references to lists of names or numbers.

The following configuration can handle sentences like "set living room volume to 100" and "change volume in the bedroom to 50".

In `config/custom_sentences/en/media_player.yaml`:

{% raw %}

```yaml
# Example media_player.yaml entry
language: "en"
intents:
  SetVolume:
    data:
      - sentences:
          - "(set|change) {media_player} volume to {volume} [percent]"
          - "(set|change) volume in [the] {media_player} to {volume} [percent]"
lists:
  media_player:
    values:
      - in: "living room"
        out: "media_player.living_room"
      - in: "bedroom"
        out: "media_player.bedroom"
  volume:
    range:
      from: 0
      to: 100
```

{% endraw %}

The `media_player` list is referenced as `{media_player}` in the sentence templates. Its values contain both an `in` and `out` part, where `in` is the input text and `out` is the output value (`entity_id`) used in `intent_script` to call the `media_player.volume_set` service.

In `configuration.yaml`:

{% raw %}

```yaml
# Example configuration.yaml entry
intent_script:
  SetVolume:
    action:
      service: "media_player.volume_set"
      data:
        entity_id: "{{ media_player }}"
        volume_level: "{{ volume / 100.0 }}"
    speech:
      text: "Volume changed to {{ volume }}"
```

{% endraw %}

## Service `conversation.process`

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `text`                 |      yes | Transcribed text                                 |

## Service `conversation.reload`

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `language`             |      yes | Language to clear intent cache for               |
