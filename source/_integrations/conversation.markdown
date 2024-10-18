---
title: Conversation
description: Instructions on how to have conversations with your Home Assistant.
ha_category:
  - Voice
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
  - '@synesthesiam'
ha_domain: conversation
ha_integration_type: system
---

The **Conversation** {% term integration %} allows you to converse with Home Assistant. You can either converse by pressing the microphone in the frontend (supported browsers only (no iOS)) or by calling the `conversation/process` action with the transcribed text.

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

You can add your own [sentence templates](https://developers.home-assistant.io/docs/voice/intent-recognition/template-sentence-syntax) to teach Home Assistant about new sentences. These sentences can work with the [built-in intents](https://developers.home-assistant.io/docs/intent_builtin/) or trigger a custom action by defining custom {% term intents %} with the [intent script integration](/integrations/intent_script/).

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

To teach Home Assistant how to handle the custom `CustomOutsideHumidity` {% term intent %}, create an `intent_script` entry in your {% term "`configuration.yaml`" %} file:

{% raw %}

```yaml
# Example configuration.yaml entry
intent_script:
  CustomOutsideHumidity:
    speech:
      text: "It is currently {{ states('sensor.outside_humidity') }} percent humidity outside."
```

{% endraw %}

More complex [actions](/docs/scripts/) can be done in `intent_script`, such as performing actions and firing events.

## Extending built-in intents

Extending the built-in {% term intents %}, such as `HassTurnOn` and `HassTurnOff`, can be done as well.

For example, create the file `config/custom_sentences/en/on_off.yaml` and add:

{% raw %}

```yaml
# Example on_off.yaml entry
language: "en"
intents:
  HassTurnOn:
    data:
      - sentences:
          - "engage [the] kitchen lights"
        slots:
          name: "kitchen lights"
  HassTurnOff:
    data:
      - sentences:
          - "disengage [the] kitchen lights"
        slots:
          name: "kitchen lights"
```

{% endraw %}

Now when you say "engage the kitchen lights", it will turn on a light named "kitchen lights". Saying "disengage kitchen lights" will turn it off.

Let's generalize this to other entities. The built-in `{name}` and `{area}` lists contain the names of your Home Assistant entities and areas.

Adding `{name}` to `config/custom_sentences/en/on_off.yaml`:

{% raw %}

```yaml
# Example on_off.yaml entry
language: "en"
intents:
  HassTurnOn:
    data:
      - sentences:
          - "engage [the] {name}"
  HassTurnOff:
    data:
      - sentences:
          - "disengage [the] {name}"
```

{% endraw %}

You can now "engage" or "disengage" any entity.

Lastly, let's add sentences for turning lights on and off in specific areas:

{% raw %}

```yaml
# Example on_off.yaml entry
language: "en"
intents:
  HassTurnOn:
    data:
      - sentences:
          - "engage [the] {name}"
      - sentences:
          - "engage [all] lights in [the] {area}"
        slots:
          name: "all"
          domain: "light"
  HassTurnOff:
    data:
      - sentences:
          - "disengage [the] {name}"
      - sentences:
          - "disengage [all] lights in [the] {area}"
        slots:
          name: "all"
          domain: "light"
```

{% endraw %}

It's now possible to say "engage all lights in the bedroom", which will turn on every light in the area named "bedroom".


## Action `conversation.process`

Send a message to a conversation agent for processing.

| Data attribute | Optional | Description                                                                                                               |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `text`                 | no       | Transcribed text input                                                                                                    |
| `language`             | yes      | Language of the text                                                                                                      |
| `agent_id`             | yes      | ID of conversation agent. The conversation agent is the brains of the assistant. It processes the incoming text commands. |
| `conversation_id`      | yes      | ID of a new or previous conversation. Will continue an old conversation or start a new one.                               |

This action is able to return [response data](/docs/scripts/perform-actions/#use-templates-to-handle-response-data). The response is the same response as for the
[`/api/conversation/process` API](https://developers.home-assistant.io/docs/intent_conversation_api#conversation-response).

## Action `conversation.reload`

| Data attribute | Optional | Description                                                              |
| ---------------------- | -------- | ------------------------------------------------------------------------ |
| `language`             | yes      | Language to clear intent cache for. No value clears all languages        |
| `agent_id`             | yes      | ID of conversation agent. Defaults to the built-in Home Assistant agent. |
