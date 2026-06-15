---
title: "Ask question on satellite"
action: assist_satellite.ask_question
domain: assist_satellite
description: "Asks a question on an Assist satellite and gets the response."
related_actions:
  - assist_satellite.announce
  - assist_satellite.start_conversation
---

Use this action to ask a question on an Assist satellite, listen for the response, and match it against a list of possible answers. The matched answer is returned in a response variable, so you can decide what to do next in your automation or script.

If you provide the question as text, the satellite converts it to audio using the [text-to-speech](/integrations/tts/) system of its configured [pipeline](/voice_control/voice_remote_local_assistant/). The response is transcribed using the [speech-to-text](/integrations/stt/) system of the same pipeline.

{% include actions/ui_header.md %}

To ask a question from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Ask question on satellite**.
6. Select the **Entity** to ask the question on, set the **Question**, and add the possible **Answers**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The Assist satellite to ask the question on.
Question:
  description: The question to ask. The satellite reads it out using text-to-speech.
  required: false
Question media ID:
  description: A media ID to ask instead of using text-to-speech.
  required: false
Answers:
  description: The possible answers to match the response against. Each answer has an ID and a list of sentence templates.
  required: false
Preannounce:
  description: Play a sound before the question. Turned on by default.
  required: false
Preannounce media ID:
  description: A custom media ID to play before the question instead of the default chime.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `assist_satellite.ask_question`. Pass the satellite as `entity_id` and store the result in a response variable:

{% example %}
action: |
  action: assist_satellite.ask_question
  data:
    entity_id: assist_satellite.kitchen
    question: What kind of music would you like to listen to?
    answers:
      - id: jazz
        sentences:
          - "[some] jazz [music] [please]"
          - something spicy
      - id: rock
        sentences:
          - "[some] rock [music] [please]"
          - something with a beat
  response_variable: answer
{% endexample %}

This asks a question on `assist_satellite.kitchen` and stores the matched answer in the `answer` response variable.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The Assist satellite to ask the question on.
  required: true
  type: string
question:
  description: The question to ask. The satellite reads it out using text-to-speech.
  required: false
  type: string
question_media_id:
  description: A media ID to ask instead of using text-to-speech.
  required: false
  type: string
answers:
  description: The possible answers to match the response against. Each answer has an id and a list of sentences.
  required: false
  type: list
preannounce:
  description: Play a sound before the question.
  required: false
  type: boolean
  default: true
preannounce_media_id:
  description: A custom media ID to play before the question instead of the default chime.
  required: false
  type: string
{% endoptions_yaml %}

Each entry in `answers` has the following structure:

- `id`: A unique identifier for the answer, which is returned when the response matches.
- `sentences`: A list of [sentence templates](https://developers.home-assistant.io/docs/voice/intent-recognition/template-sentence-syntax/#sentence-templates-syntax) to match the response against.

Sentence templates can contain wildcard `{slots}` that capture part of the response. For example, `play {album} by {artist}` matches "play the white album by the beatles", storing "the white album" in `slots.album` and "the beatles" in `slots.artist`.

## Response data

The action returns the matched answer in the response variable, with the following fields:

- `id`: The ID of the matching answer, or empty if nothing matched.
- `sentence`: The transcribed text of the response.
- `slots`: The values captured by any wildcard `{slots}` in the matched sentence.

If you leave out `answers`, the action does not try to match anything, and the transcribed response is available in `sentence`.

## Good to know

- A chime plays before the question by default. To use your own sound, set a preannounce media ID. To turn the chime off, set preannounce to `false`.
- Unlike most actions, this one takes the satellite as an `entity_id` value rather than a target.

{% include actions/stuck.md %}

{% include actions/related.md %}
