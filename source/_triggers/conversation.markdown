---
title: "Sentence"
trigger: conversation
domain: conversation
description: "Triggers when Assist matches a sentence that you say or type."
related_triggers:
  - event
  - webhook
---

The **Sentence** trigger is useful when you want to start an automation with your voice, or by typing to Assist. You choose one or more sentences, and the trigger reacts when you say or type one of them. For example, you can say "it's party time" to start a party scene, or ask "is the garage door open" and have Assist answer.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for and select the **Sentence** trigger.
5. In **Add sentence**, enter a sentence that should start the automation, and select **Add sentence** {% icon "mdi:plus" %}.
   - Don't use punctuation, such as a question mark.
   - To add more sentences, repeat this step. Each of the sentences starts the automation.
6. Optional: To have Assist answer, add the [**Set conversation response**](/actions/set_conversation_response/) action.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Add sentence:
  description: A sentence that starts the automation. You can add several sentences. Don't use punctuation. To remove a sentence, select **Delete sentence** {% icon "mdi:close" %} next to it.
  required: true
{% endoptions_ui %}

## Writing sentences

Sentences use the same [template sentence syntax](https://contributors.home-assistant.io/translate/voice/template-syntax/) as custom sentences. Use square brackets for optional words, and parentheses with `|` for alternatives:

{% example %}
trigger: |
  trigger: conversation
  command:
    - "[it's ]party time"
    - "happy (new year|birthday)"
{% endexample %}

The first sentence matches both "party time" and "it's party time". The second sentence matches both "happy new year" and "happy birthday". When Assist matches a sentence, it ignores punctuation and capitalization.

### Sentence wildcards

You can use lists as wildcards to capture text from the matched sentence. The captured text is available in `trigger.slots`. For example, with the sentence `play {album} by {artist}`, `trigger.slots.album` contains the name of the album. For the full data, including `trigger.details`, refer to [Sentence triggers](/docs/automation/trigger-data/#sentence-triggers).

Wildcards match greedily. If a wildcard captures more text than you expect, add words around the wildcard to make the sentence more specific.

### Inline number ranges

To match a number, use a range like `{0..100:brightness}`. This matches numbers from `0` to `100`, and stores the value in the `brightness` slot. It works for digits and words, so the sentence `set brightness to {0..100:brightness} percent` matches both "set brightness to 50 percent" and "set brightness to fifty percent".

In both cases, `trigger.slots.brightness` is `50`. To get the text that was said or typed, use `trigger.details`, such as `trigger.details.brightness.text`.

{% include triggers/yaml_header.md %}

In YAML, use `trigger: conversation`. A basic example looks like this:

{% example %}
trigger: |
  trigger: conversation
  command: "[it's ]party time"
{% endexample %}

This runs when you say or type "party time" or "it's party time".

### Options in YAML

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `conversation`.
  required: true
  type: string
command:
  description: The sentence, or a list of sentences, that starts the automation. Use the [template sentence syntax](https://contributors.home-assistant.io/translate/voice/template-syntax/), and don't use punctuation.
  required: true
  type: [string, list]
{% endoptions_yaml %}

## Good to know

- The trigger works with the Home Assistant conversation agent of Assist. Other conversation agents, such as the ones of the [OpenAI](/integrations/openai_conversation/) and [Google Gemini](/integrations/google_generative_ai_conversation/) integrations, only use sentence triggers when **Prefer handling commands locally** is turned on.
- Home Assistant checks sentence triggers before the built-in sentences. If your sentence also matches a built-in command, such as "turn on the kitchen lights", your automation runs instead of the built-in command.
- Several automations can use the same sentence. They all run. Assist answers with the first response that one of the automations sets with **Set conversation response**. If none of them sets a response, Assist answers "Done".
- For the data that this trigger passes to your conditions and actions, such as `trigger.sentence` and `trigger.slots`, refer to [Sentence triggers](/docs/automation/trigger-data/#sentence-triggers).

{% include triggers/try_it.md %}

For this trigger, open Assist and say or type one of your sentences. For a complete walkthrough, refer to [Adding a custom sentence to trigger an automation](/voice_control/custom_sentences/).

{% include triggers/more_examples.md %}

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

### Automation: play an album by an artist

When you say "play" followed by the name of an album, "by", and the name of an artist, play that album on the living room speaker. The wildcards capture both names. This example uses the **Play media** action of the [Music Assistant](/integrations/music_assistant/) integration, which can find an album by its name.

- **Trigger**: Sentence
  - **Sentence**: `play {album} by {artist}`
- **Action**: Play media (Music Assistant)
  - **Target**: Living room speaker (`media_player.living_room_speaker`)
  - **Media ID(s)**: {% raw %}`{{ trigger.slots.album }}`{% endraw %}
  - **Media type**: Album
  - **Artist name**: {% raw %}`{{ trigger.slots.artist }}`{% endraw %}

{% details "YAML example for playing an album by an artist" %}

{% example %}
automation: |
  alias: "Play an album by an artist"
  triggers:
    - trigger: conversation
      command: "play {album} by {artist}"
  actions:
    - action: music_assistant.play_media
      target:
        entity_id: media_player.living_room_speaker
      data:
        media_id: "{{ trigger.slots.album }}"
        media_type: album
        artist: "{{ trigger.slots.artist }}"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
