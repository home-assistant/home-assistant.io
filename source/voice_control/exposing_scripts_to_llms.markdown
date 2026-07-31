---
title: "Exposing scripts to LLM conversation agents"
related:
  - docs: /voice_control/best_practices/
    title: Best practices with Assist
  - docs: /voice_controll/voice_remote_expose_devices/
    title: Exposing entities to Assist
---

When using an LLM-based conversation agent (such as OpenAI, Google Generative AI, or a local model), Home Assistant scripts are not exposed as entities — they are converted into tools that the LLM can call directly. This is more powerful than entity exposure, but it requires a bit more care: without a good description, the LLM will simply not know the script exists or when to use it.

This page explains how to expose a script to an LLM, and how to write descriptions that make it reliable.

## Prerequisites

- An LLM conversation integration must be set up and used in your voice pipeline, for example [OpenAI Conversation](/integrations/openai_conversation/) or [Google Generative AI](/integrations/google_generative_ai_conversation/).
- The integration must be configured to allow **home control**, that is, **Assist mode**, not **No control**.

## Exposing a script to Assist

Scripts do not appear in the static entity list that the LLM sees — they appear as callable tools. To expose a script:

1. Open the script in the **Scripts** panel.
2. Select the three-dot menu ({% icon "mdi:dots-vertical" %}) and choose **Settings**.
3. Under the **Voice assistants** section, toggle the script on for Assist.
4. **Save** your changes.

Repeat this for each script you want the LLM to use.

{% note %}
**Limit:** Do not expose more than 128 scripts/tools in total. Exceeding this limit will cause the conversation engine to fail with a hard limit error inherited from the underlying LLM API.
{% endnote %}

## Adding a description to your script

This is the most important step. Without a description, the LLM cannot determine what your script does or when to call it.

To add or edit the description:

1. Open the script in the **Scripts** panel.
2. Select the three-dot menu ({% icon "mdi:dots-vertical" %}) and choose **Rename**.
3. Add a description in the description field.

{% note %}
Keep your script description concise. Some LLM APIs enforce a maximum description length, often around **1024 characters**, and may reject or truncate longer descriptions. The exact limit depends on the conversation integration you use, so check that integration’s documentation if you need very long descriptions.
{% endnote %}

### What to write in the description

Write a dense, clear explanation of what the script does and **when the LLM should call it**. Think of it as instructions to a capable assistant who has no other context. A good description answers:

- What does this script do?
- In what situation should it be triggered?
- What should the LLM tell the user after it runs?

**Example** (from the [Music Assistant voice support project](https://github.com/music-assistant/voice-support)):

> This script is used to play music based on a voice request. The tool takes the following arguments: media_type, artist, album, media_id, radio_mode, area. media_id and media_type are always required and must always be supplied as arguments to this tool. An area or Music Assistant media player can optionally be provided in the voice request as well. Use this tool whenever the user requests to play music.

## Adding descriptions to script fields (parameters)

If your script accepts input fields (parameters), each field should also have its own description. The LLM uses these to understand what value to pass.

{% note %}
Each field description must not exceed **128 characters**. Exceeding this will cause errors.
{% endnote %}

Keep field descriptions precise: state what the field represents, its expected format, and any constraints.

## Returning a result from your script

When the LLM calls a script, it expects a result it can relay to the user. You can do that by adding a **Stop** action at the end of the sequence. This action has two values you can set:

- The reason for stopping, with either a **success message** describing what was done or, in case of failure, an **error message** explaining what went wrong and how to recover.
- Optionally, the name of a variable (used within the script) to use as a response, to be further evaluated by the LLM.

This prevents the LLM from making up a response or treating a silent return as a failure.

## Verifying your setup

Unlike exposed entities, scripts do not appear in the static context shown in the Assist **Debug** view. This is expected, because they are registered as tools, not entities. To verify that a script is available to the LLM, start a test Assist conversation, open the Assist **Debug** dialog (see [Troubleshooting Assist](/voice_control/troubleshooting/)), and check in the actions or tool calls that your script is invoked when you issue a matching voice command.

