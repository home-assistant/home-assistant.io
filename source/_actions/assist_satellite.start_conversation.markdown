---
title: "Start conversation on satellite"
action: assist_satellite.start_conversation
domain: assist_satellite
description: "Starts a conversation from an Assist satellite."
related_actions:
  - assist_satellite.announce
  - assist_satellite.ask_question
---

Use this action to start a conversation from an Assist satellite. The satellite announces a message and then listens for one or more voice commands.

The satellite's configured [pipeline](/voice_control/voice_remote_local_assistant/) must use a [conversation agent](/integrations/conversation/) that supports conversations, such as [OpenAI](/integrations/openai_conversation/) or [Google Generative AI](/integrations/google_generative_ai_conversation/). The built-in Assist conversation agent does not support conversations yet.

If you provide text, the satellite converts it to audio using the [text-to-speech](/integrations/tts/) system of its configured pipeline.

{% include actions/ui_header.md %}

To start a conversation from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the satellite you want to start the conversation on.
6. From the actions shown for that target, select **Start conversation on satellite**.
7. Set the **Message** to start with, or a **Media ID**, and any other options.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Message:
  description: The message to start the conversation with. The satellite reads it out using text-to-speech.
  required: false
Media ID:
  description: A media ID to start with instead of using text-to-speech.
  required: false
Extra system prompt:
  description: Background information about the request, passed to the conversation agent. This helps the agent understand a short reply like yes or no.
  required: false
Preannounce:
  description: Play a sound before the start message or media. Turned on by default.
  required: false
Preannounce media ID:
  description: A custom media ID to play before the start message or media instead of the default chime.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `assist_satellite.start_conversation`. A basic example looks like this:

{% example %}
action: |
  action: assist_satellite.start_conversation
  target:
    entity_id: assist_satellite.living_room
  data:
    start_message: You left the lights on in the living room. Turn them off?
    extra_system_prompt: >-
      The user left the lights on in the living room and is being asked
      whether to turn them off.
{% endexample %}

This starts a conversation on `assist_satellite.living_room`.

### Options in YAML

{% options_yaml %}
start_message:
  description: The message to start the conversation with. The satellite reads it out using text-to-speech.
  required: false
  type: string
start_media_id:
  description: A media ID to start with instead of using text-to-speech.
  required: false
  type: string
extra_system_prompt:
  description: Background information about the request, passed to the conversation agent. This helps the agent understand a short reply like yes or no.
  required: false
  type: string
preannounce:
  description: Play a sound before the start message or media.
  required: false
  type: boolean
  default: true
preannounce_media_id:
  description: A custom media ID to play before the start message or media instead of the default chime.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Provide either a start message or a media ID. A message is read out with text-to-speech, while a media ID plays your own audio.
- A chime plays before the start message by default. To use your own sound, set a preannounce media ID. To turn the chime off, set preannounce to `false`.
- The extra system prompt gives the conversation agent context, so it can correctly interpret short replies like yes or no.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: ask whether to turn off the lights at bedtime

At bedtime, if the living room lights are still on, start a conversation asking whether to turn them off.

- **Trigger**: Time: 23:00
- **Condition**: Living room lights are on
- **Action**: Start conversation on satellite
  - **Target**: Living room satellite
  - **Message**: You left the lights on in the living room. Turn them off?

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Ask whether to turn off the lights at bedtime"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: state
      entity_id: light.living_room
      state: "on"
  actions:
    - action: assist_satellite.start_conversation
      target:
        entity_id: assist_satellite.living_room
      data:
        start_message: You left the lights on in the living room. Turn them off?
        extra_system_prompt: >-
          The user left the lights on in the living room and is being asked
          whether to turn them off.
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
