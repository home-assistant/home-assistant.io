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

You can add your own [sentence templates](https://developers.home-assistant.io/docs/voice/intent-recognition/template-sentence-syntax) to teach Home Assistant about new sentences. These sentences can work with the [built-in intents](https://developers.home-assistant.io/docs/intent_builtin/) or trigger a custom action by defining custom intents with the [intent script integration](/integrations/intent_script/).

To get started, create a `custom_sentences/<language>` directory in your Home Assistant `config` directory where `<language>` is the [language code](https://developers.home-assistant.io/docs/voice/intent-recognition/supported-languages) of your language, such as `en` for English. These YAML files are automatically merged, and may contain intents, lists, or expansion rules.

For an English example, create the file `config/custom_sentences/en/temperature.yaml` and add:

{% raw %}

```yaml
# Example temperature.yaml entry
language: "en"
intents:
  CustomOutsideHumidity:
    data:
      - sentences:
          - "What is the humidity outside"
```

{% endraw %}

To teach Home Assistant how to handle the custom `CustomOutsideHumidity` intent, create an `intent_script` entry in your `configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml entry
intent_script:
  CustomOutsideHumidity:
    speech:
      text: "It is currently {{ states("sensor.outside_humidity") }} percent humidity outside."
```

{% endraw %}

More complex [actions](https://www.home-assistant.io/docs/scripts/) can be done in `intent_script`, such as calling services and firing events.


## Service `conversation.process`

| Service data attribute | Optional | Description      |
|------------------------|----------|------------------|
| `text`                 | yes      | Transcribed text |

## Service `conversation.reload`

| Service data attribute | Optional | Description                                                              |
|------------------------|----------|--------------------------------------------------------------------------|
| `language`             | yes      | Language to clear intent cache for. Defaults to Home Assistant language. |
