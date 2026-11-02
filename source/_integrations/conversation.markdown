---
description: Instructions on how to have conversations with your Home Assistant.
ha_release: 0.7
ha_domain: conversation
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

By default, a collection of [community contributed sentences](https://github.com/home-assistant/intents/) are supported in a growing [list of languages](https://contributors.home-assistant.io/translate/voice/languages/).

In English, you can say things like "turn on kitchen lights" or "turn off lights in the bedroom" if you have an area named "bedroom".

## Sentence triggers

<a id="sentence-wildcards"></a>
<a id="inline-number-ranges"></a>

To start an automation when Assist matches a sentence that you say or type, use the [**Sentence** trigger](/triggers/conversation/). It also explains wildcards and number ranges.

## Adding custom sentences

You can add your own [sentence templates](https://contributors.home-assistant.io/translate/voice/template-syntax/) to teach Home Assistant about new sentences. These sentences can work with the [built-in intents](https://contributors.home-assistant.io/core/internals/built-in-intents/) or trigger a custom action by defining custom {% term intents %} with the [intent script integration](/integrations/intent_script/).

To get started, create a `custom_sentences/<language>` directory in your Home Assistant `config` directory where `<language>` is the [language code](https://contributors.home-assistant.io/translate/voice/languages/) of your language, such as `en` for English. These YAML files are automatically merged, and may contain intents, lists, or expansion rules.

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


More complex [actions](/docs/automation/building-blocks/) can be done in `intent_script`, such as performing actions and firing events.

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

{% include integrations/triggers.md %}

{% include integrations/actions.md %}

## Conversation automation examples

With the [**Sentence** trigger](/triggers/conversation/), you can start an automation by saying or typing a sentence to Assist. Here is an idea to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: answer whether the garage door is open

When you ask Assist "Is the garage door open?", this automation answers with the current state of the garage door, for example, "The garage door is closed."

- **Trigger**: Sentence
  - **Sentence**: `Is the garage door open`
- **Action**: Set conversation response
  - **Set conversation response**: {% raw %}`The garage door is {{ states('cover.garage_door') }}.`{% endraw %}

{% details "YAML example for answering whether the garage door is open" %}

{% example %}
automation: |
  alias: "Answer whether the garage door is open"
  triggers:
    - trigger: conversation
      command: "Is the garage door open"
  actions:
    - set_conversation_response: >
        The garage door is {{ states('cover.garage_door') }}.
{% endexample %}

{% enddetails %}
