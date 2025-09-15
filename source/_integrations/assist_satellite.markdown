---
title: Assist Satellite
description: Remote satellites that use Assist.
ha_category:
  - Voice
ha_release: '2024.10'
ha_codeowners:
  - '@home-assistant/core'
  - '@synesthesiam'
ha_domain: assist_satellite
ha_integration_type: entity
ha_quality_scale: internal
---

This is an {% term integration %} for remote satellites that use [Assist](/voice_control/) to control and interact with Home Assistant. This allows other integrations to represent these satellites in a consistent manner.

{% include integrations/building_block_integration.md %}

## Actions

An Assist satellite entity exposes additional actions to remotely control the satellite in automations or scripts. These actions can be created via the UI, but are
also available in YAML (examples below).

### Action `assist_satellite.announce`

The {% my developer_call_service service="assist_satellite.announce" %} action announces a message or media id on the satellite. If a message is to be announced, it will first be converted to a media id using the [text-to-speech](/integrations/tts) system of the satellite's configured [pipeline](/voice_control/voice_remote_local_assistant/).


{% my developer_call_service badge service="assist_satellite.announce" %}

Examples in YAML:

```yaml
action: assist_satellite.announce
target:
  entity_id: assist_satellite.my_entity
  message: "Dinner is ready!"
```

```yaml
action: assist_satellite.announce
target:
  entity_id: assist_satellite.my_entity
  media_id: ITEM_ID
```

A chime is automatically played before the announcement. You can override this with your own sound by setting `preannounce_media_id`, or disable the chime entirely by setting `preannounce` to `false`.

Examples in YAML:

```yaml
action: assist_satellite.announce
target:
  entity_id: assist_satellite.my_entity
  message: "Dinner is ready!"
  preannounce_media_id: ITEM_ID  # custom chime
```

```yaml
action: assist_satellite.announce
target:
  entity_id: assist_satellite.my_entity
  message: "Dinner is ready!"
  preannounce: false  # chime disabled
```

### Action `assist_satellite.start_conversation`

The {% my developer_call_service service="assist_satellite.start_conversation" %} action first announces a message or media id on the satellite and then listens for one or more voice commands. The satellite's configured [pipeline](/voice_control/voice_remote_local_assistant/) must use a supported [conversation agent](/integrations/conversation), such as [OpenAI](/integrations/openai_conversation) or [Google Generative AI](/integrations/google_generative_ai_conversation). The builtin Assist conversation agent does not support conversations yet.

If a message is to be announced, it will first be converted to a media id using the [text-to-speech](/integrations/tts) system of the satellite's configured [pipeline](/voice_control/voice_remote_local_assistant/).

The `extra_system_prompt` is passed to the [conversation agent](/integrations/conversation) of the satellite's configured [pipeline](/voice_control/voice_remote_local_assistant/). For large language models (LLMs) this will be appended to the prompt given to the model, allowing the LLM to understand the context of a response like "yes" or "no".

{% my developer_call_service badge service="assist_satellite.start_conversation" %}

Examples in YAML:

```yaml
action: assist_satellite.start_conversation
target:
  entity_id: assist_satellite.my_entity
  start_message: "You left the lights on in the living room. Turn them off?"
  extra_system_prompt: "The user has left the lights on in the living room and is being asked if they'd like to turn them off."
```

```yaml
action: assist_satellite.start_conversation
target:
  entity_id: assist_satellite.my_entity
  start_media_id: ITEM_ID
```

A chime is automatically played before the start message or media. You can override this with your own sound by setting `preannounce_media_id`, or disable the chime entirely by setting `preannounce` to `false`.

Examples in YAML:

```yaml
action: assist_satellite.start_conversation
target:
  entity_id: assist_satellite.my_entity
  start_message: "You left the lights on in the living room. Turn them off?"
  extra_system_prompt: "The user has left the lights on in the living room and is being asked if they'd like to turn them off."
  preannounce_media_id: ITEM_ID  # custom chime
```

```yaml
action: assist_satellite.start_conversation
target:
  entity_id: assist_satellite.my_entity
  start_message: "You left the lights on in the living room. Turn them off?"
  extra_system_prompt: "The user has left the lights on in the living room and is being asked if they'd like to turn them off."
  preannounce: false  # chime disabled
```

### Action `assist_satellite.ask_question`

The {% my developer_call_service service="assist_satellite.ask_question" %} action asks a question on the satellite, listens for a response, and matches it against a predefined list of possible answers. Information about the matched answer is stored in a `response_variable` so the appropriate next steps can be taken in your automation or script.

The question may be provided as text or a media id. If text is used, it will first be converted to a media id using the [text-to-speech](/integrations/tts) system of the satellite's configured [pipeline](/voice_control/voice_remote_local_assistant/).

Audio from the user's response is transcribed using the [speech-to-text](/integrations/stt) system of the satellite's configured [pipeline](/voice_control/voice_remote_local_assistant/).

The `answers` are given as a list of objects with the following structure:

- `id` - unique id of the answer
- `sentences` - list of [sentence templates](https://developers.home-assistant.io/docs/voice/intent-recognition/template-sentence-syntax/#sentence-templates-syntax)

Sentence templates may contain wildcard `{slots}` that will be stored in the answer's `slots` field. For example, `play {album} by {artist}` will match "play the white album by the beatles" with "white album" stored in `slots.album` and "the beatles" in `slots.artist`.

The matched answer will be stored in a `response_variable` with the structure:

- `id` - unique id of the matching answer (or `None` if no match)
- `sentence` - response text from user
- `slots` - values of wildcard `{slots}` from matching answer

{% my developer_call_service badge service="assist_satellite.ask_question" %}

Examples in YAML:

{% raw %}

```yaml
actions:
  - action: assist_satellite.ask_question
    data:
      question: "Welcome home! What kind of music would you like to listen to?"
      entity_id: assist_satellite.my_entity
      answers:
        - id: jazz
          sentences:
            - "[some] jazz [music] [please]"
            - "something spicy"
        - id: rock
          sentences:
            - "[some] rock [music] [please]"
            - "something with a beat"
        - id: nothing
          sentences:
            - "nothing [for now] [please]"
            - "nevermind"
            - "cancel"
    response_variable: answer
  - choose:
      - conditions:
          - condition: template
            value_template: "{{ answer.id == 'jazz' }}"
        sequence:
          - action: play_jazz_action
      - conditions:
          - condition: template
            value_template: "{{ answer.id == 'rock' }}"
        sequence:
          - action: play_rock_action
    default:
      - action: assist_satellite.announce
        data:
          message: "OK, maybe some other time."
        target:
          entity_id: assist_satellite.my_entity
```

{%endraw %}


Instead of text, the question can also be a media ID:

```yaml
action: assist_satellite.ask_question
data:
  entity_id: assist_satellite.my_entity
  question_media_id: ITEM_ID
  answers: ANSWERS
response_variable: answer
```

A chime is automatically played before the question. You can override this with your own sound by setting `preannounce_media_id`, or disable the chime entirely by setting `preannounce` to `false`.

Examples in YAML:

```yaml
action: assist_satellite.ask_question
data:
  entity_id: assist_satellite.my_entity
  preannounce_media_id: ITEM_ID  # custom chime
  question: QUESTION
  answers: ANSWERS
response_variable: answer
```

```yaml
action: assist_satellite.ask_question
data:
  entity_id: assist_satellite.my_entity
  preannounce: false  # chime disabled
  question: QUESTION
  answers: ANSWERS
response_variable: answer
```

If `answers` is omitted, the response text from the user will be available in the `sentence` text of the `response_variable`.

Examples in YAML:

{% raw %}

```yaml
actions:
  - action: assist_satellite.ask_question
    data:
      question: "Say something"
      entity_id: assist_satellite.my_entity
    response_variable: answer
  - action: assist_satellite.announce
    data:
      message: "You said {{ answer.sentence }}"
    target:
      entity_id: assist_satellite.my_entity
```

{% endraw %}
