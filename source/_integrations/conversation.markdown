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
  - '@arturpragacz'
ha_domain: conversation
ha_integration_type: entity
---

The **Conversation** {% term integration %} allows you to converse with Home Assistant. You can either converse by pressing the microphone in the frontend (supported browsers only (no iOS)) or by calling the `conversation.process` action with the transcribed text.

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

## Sentence triggers

Sentence triggers run an automation when Assist matches a sentence. They use the default conversation agent and work with Home Assistant Assist. External conversation agents, such as OpenAI Conversation or Google Generative AI Conversation, only use sentence triggers when **Prefer handling commands locally** is enabled.

Sentence triggers use the same [template sentence syntax](https://developers.home-assistant.io/docs/voice/intent-recognition/template-sentence-syntax) as custom sentences. You can define optional words with square brackets and alternatives with parentheses.

{% example %}
automation: |
  triggers:
    - trigger: conversation
      command:
        - "[it's ]party time"
        - "happy (new year|birthday)"
{% endexample %}

The first example matches both "party time" and "it's party time". The second example matches both "happy new year" and "happy birthday". Punctuation and capitalization are ignored.

For a complete example, see [adding a custom sentence to trigger an automation](/voice_control/custom_sentences/#adding-a-custom-sentence-to-trigger-an-automation).

### Sentence wildcards

You can use lists as wildcards to capture text from the matched sentence. Captured text is available in `trigger.slots`. For the full data structure, including `trigger.details`, see [sentence trigger data](/docs/automation/templating/#sentence).

{% example %}
automation: |
  triggers:
    - trigger: conversation
      command: "play {album} by {artist}"
  actions:
    - action: media_player.play_media
      target:
        entity_id: media_player.living_room
      data:
        media_content_id: "{{ trigger.slots.album }}"
        media_content_type: "album"
{% endexample %}

Wildcards match greedily. If a wildcard captures more text than expected, add extra words around the wildcard to make the sentence more specific.

### Inline number ranges

Number ranges can be matched with ranges like `{0..100:brightness}`. This matches numbers from `0` to `100` and stores the value in the `brightness` slot. It works for digits and words, so the sentence `set brightness to {0..100:brightness} percent` matches both "set brightness to 50 percent" and "set brightness to fifty percent".

In both cases, `trigger.slots.brightness` is `50`. To get the spoken or written text, use `trigger.details`, such as `trigger.details.brightness.text`.

## Adding custom sentences

You can add your own [sentence templates](https://developers.home-assistant.io/docs/voice/intent-recognition/template-sentence-syntax) to teach Home Assistant about new sentences. These sentences can work with the [built-in intents](https://developers.home-assistant.io/docs/intent_builtin/) or trigger a custom action by defining custom {% term intents %} with the [intent script integration](/integrations/intent_script/).

To get started, create a `custom_sentences/<language>` directory in your Home Assistant `config` directory where `<language>` is the [language code](https://developers.home-assistant.io/docs/voice/intent-recognition/supported-languages) of your language, such as `en` for English. These YAML files are automatically merged, and may contain intents, lists, or expansion rules.

For an English example, create the file `config/custom_sentences/en/temperature.yaml` and add:


```yaml
# Example temperature.yaml entry
language: "en"
intents:
  CustomOutsideHumidity:
    data:
      - sentences:
          - "What is the humidity outside"
```


To teach Home Assistant how to handle the custom `CustomOutsideHumidity` {% term intent %}, create an `intent_script` entry in your {% term "`configuration.yaml`" %} file:


```yaml
# Example configuration.yaml entry
intent_script:
  CustomOutsideHumidity:
    speech:
      text: "It is currently {{ states('sensor.outside_humidity') }} percent humidity outside."
```


More complex [actions](/docs/scripts/) can be done in `intent_script`, such as performing actions and firing events.

## Extending built-in intents

Extending the built-in {% term intents %}, such as `HassTurnOn` and `HassTurnOff`, can be done as well.

For example, create the file `config/custom_sentences/en/on_off.yaml` and add:


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


Now when you say "engage the kitchen lights", it will turn on a light named "kitchen lights". Saying "disengage kitchen lights" will turn it off.

Let's generalize this to other entities. The built-in `{name}` and `{area}` lists contain the names of your Home Assistant entities and areas.

Adding `{name}` to `config/custom_sentences/en/on_off.yaml`:


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


You can now "engage" or "disengage" any entity.

Lastly, let's add sentences for turning lights on and off in specific areas:


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


It's now possible to say "engage all lights in the bedroom", which will turn on every light in the area named "bedroom".

{% include integrations/actions.md %}
