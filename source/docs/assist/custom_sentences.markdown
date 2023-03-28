---
title: "Assist - Custom Sentences"
---

You may add your own sentences to the intent recognizer by either extending an [existing intent](https://developers.home-assistant.io/docs/intent_builtin/) or creating a new one. You may also [customize responses](#customizing-responses) for existing intents.

## In configuration.yaml

Intents and sentences may be added in the [`conversation`](/integrations/conversation/) config in your `configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml
conversation:
  intents:
    HassTurnOn:
      - "activate [the] {name}"
```

{% endraw %}

This extends the default English sentences for the `HassTurnOn` intent, allowing you to say "activate the kitchen lights" as well as "turn on the kitchen lights".

New intents can also be added, with their responses and actions defined using the [`intent_script`](/integrations/intent_script/) integration:

{% raw %}

```yaml
# Example configuration.yaml
conversation:
  intents:
    YearOfVoice:
      - "how is the year of voice going"
      
intent_script:
  YearOfVoice:
    speech:
      text: "Great! We're at over 40 languages and counting."
```

{% endraw %}

Besides a text response, `intent_script` can trigger any `action` available in Home Assistant, such as calling a service or firing an event.

## In config directory

More advanced customization can be done in Home Assistant's `config` directory. YAML files in `config/custom_sentences/en`, for example, will be loaded when English sentences (language code `en`) are requested.

The following example creates a new `SetVolume` intent that changes the volume on one of two media players:

{% raw %}

```yaml
# Example config/custom_sentences/en/media.yaml
language: "en"
intents:
  SetVolume:
    data:
      - sentences:
          - "(set|change) {media_player} volume to {volume} [percent]"
          - "(set|change) [the] volume for {media_player} to {volume} [percent]"
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

As mentioned above, you can then use the `intent_script` integration to implement an action and provide a response for `SetVolume`:

{% raw %}

```yaml
# Example configuration.yaml
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

## Customizing Responses

Responses for existing intents can be customized as well in `config/custom_sentences/<language>`:

{% raw %}

```yaml
# Example config/custom_sentences/en/responses.yaml
language: "en"
responses:
  intents:
    HassTurnOn:
      default: "I have turned on the {{ slots.name }}"
```

{% endraw %}
