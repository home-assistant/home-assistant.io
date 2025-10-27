---
title: "Setting up custom sentences in configuration.yaml"
related:
  - docs: /voice_control/aliases/
    title: Create aliases
  - docs: /docs/scripts/#respond-to-a-conversation
    title: Conversation response script action
  - docs: /docs/automation/trigger/#sentence-trigger
    title: Sentence triggers
  - docs: /docs/automation/trigger/#sentence-wildcards
    title: Sentence wildcards
  - url: https://developers.home-assistant.io/docs/intent_builtin/
    title: View existing intents
---

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

## Setting up sentences in the config directory

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

## Customizing responses

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

## Related devices and installation tutorials

- [Custom sentences main page](/voice_control/custom_sentences)
- [$13 voice assistant for Home Assistant](/voice_control/thirteen-usd-voice-remote/)
- [S3-BOX-3 voice assistant](/voice_control/s3_box_voice_assistant/)
