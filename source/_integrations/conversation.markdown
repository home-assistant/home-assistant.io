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

{% configuration %}
intents:
  description: Intents that the conversation integration should understand.
  required: false
  type: map
  keys:
    '`<INTENT NAME>`':
      description: Sentences that should trigger this intent.
      required: true
      type: list
{% endconfiguration %}

## Adding custom sentences

By default, it will support turning devices on and off. You can say things like "turn on kitchen lights" or "turn the living room lights off". You can also configure your own sentences to be processed. This works by mapping sentences to intents and then configure the [intent script integration](/integrations/intent_script/) to handle these intents.

Here is a simple example to be able to ask what the temperature in the living room is.

{% raw %}

```yaml
# Example configuration.yaml entry
conversation:
  intents:
    LivingRoomTemperature:
     - What is the temperature in the living room

intent_script:
  LivingRoomTemperature:
    speech:
      text: It is currently {{ states.sensor.temperature }} degrees in the living room.
```

{% endraw %}

## Adding advanced custom sentences

Sentences can contain slots (marked with curly braces: `{name}`) and optional words (marked with square brackets: `[the]`). The values of slots will be passed on to the intent and are available inside the templates.

The following configuration can handle the following sentences:

- Change the lights to red
- Change the lights to green
- Change the lights to blue
- Change the lights to the color red
- Change the lights to the color green
- Change the lights to the color blue

{% raw %}

```yaml
# Example configuration.yaml entry
conversation:
  intents:
    ColorLight:
     - Change the lights to [the color] {color}
intent_script:
  ColorLight:
    speech:
      text: Changed the lights to {{ color }}.
    action:
      service: light.turn_on
      data:
        rgb_color:
          - "{% if color == 'red' %}255{% else %}0{% endif %}"
          - "{% if color == 'green' %}255{% else %}0{% endif %}"
          - "{% if color == 'blue' %}255{% else %}0{% endif %}"
```

{% endraw %}

## Service `conversation.process`

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `text`                 |      yes | Transcribed text                                 |
