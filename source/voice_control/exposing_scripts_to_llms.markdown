---
title: "Exposing scripts to conversation agents that use AI"
related:
  - docs: /voice_control/best_practices/
    title: Best practices with Assist
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /integrations/llm/
    title: LLM
---

A {% term "conversation agent" %} that uses AI can run your {% term scripts %}. When you expose a script to {% term Assist %}, the script becomes an {% term "AI tool" %} in the [**Device control** set](/integrations/llm/#sets-of-ai-tools). The conversation agent can then run the script directly, if **Device control** is selected in its **AI tools** option. {% term "AI apps" %} that use the **Device control** set through the [Model Context Protocol Server](/integrations/mcp_server/) can run it too. If you turn on **Read-only** in the options of that server, its main URL leaves scripts out.

This is more powerful than exposing entities, but it needs a good description. Without one, the conversation agent doesn't know what the script does or when to use it.

This page explains how to expose a script, and how to describe it so that the conversation agent uses it reliably.

## Exposing a script to Assist

Exposed {% term scripts %} don't appear in the list of {% term entities %} that the {% term "conversation agent" %} gets. They appear as {% term "AI tools" %} instead.

To expose a script to Assist:

1. Go to {% my scripts title="**Settings** > **Automations & scenes** > **Scripts**" %} and select the script.
2. Select **Menu** {% icon "mdi:dots-vertical" %} > **Settings**.
3. Select **Voice assistants**.
4. Under **Expose**, turn on **Assist**.
   - Result: The change takes effect right away.
5. Repeat these steps for each script that you want the conversation agent to use.

{% note %}
Some AI services limit how many AI tools a conversation agent can use at once. This number includes all AI tools, not only your scripts. If you expose many scripts, check the limits of your AI service.
{% endnote %}

## Adding a description to your script

The description is the most important part of an exposed {% term script %}. Without a description, the {% term "conversation agent" %} only gets the name of the {% term "AI tool" %}, which is based on the entity ID, and the aliases of the script. By default, the aliases include the name of the script. That's often not enough to know what the script does or when to use it.

To add or change the description of your script:

1. Go to {% my scripts title="**Settings** > **Automations & scenes** > **Scripts**" %} and select the script.
2. Select **Menu** {% icon "mdi:dots-vertical" %} > **Rename**.
   - The **Rename** dialog also contains the description.
3. Enter the description in the **Description** field.
   - If there is no **Description** field yet, select **Add description** first.
   - For what to include, refer to [What to write in the description](#what-to-write-in-the-description).
   - Keep the description short and to the point. Some AI services limit the length of the description.
4. Select **Rename**.
5. Select **Save**.

### What to write in the description

Write a clear explanation of what the {% term script %} does and when the {% term "conversation agent" %} should use it. Imagine you're writing instructions for someone who knows nothing else about your home. A good description answers the following questions:

- What does this script do?
- In which situations should the conversation agent use it?
- What should the conversation agent tell you after the script runs?

For example, the [Music Assistant voice support project](https://github.com/music-assistant/voice-support) uses the following description:

> This script is used to play music based on a voice request. The tool takes the following arguments: media_type, artist, album, media_id, radio_mode, area. media_id and media_type are always required and must always be supplied as arguments to this tool. An area or Music Assistant media player can optionally be provided in the voice request as well. Use this tool whenever the user requests to play music.

## Adding descriptions to script fields

If your {% term script %} has [fields](/docs/script/#adding-fields-to-a-script), give each field its own description. The {% term "conversation agent" %} uses these descriptions to decide which value to pass. If a field has no description, the conversation agent only gets the field key and the name of the field.

In the script editor, the description of a field is called a note.

To add descriptions to script fields:

1. Go to {% my scripts title="**Settings** > **Automations & scenes** > **Scripts**" %} and select the script.
2. Under **Fields**, select **Menu** {% icon "mdi:dots-vertical" %} > **Add note** on the field.
   - If the field already has a note, the menu shows **Edit note** instead.
3. Enter the description in the **Note** field.
   - Keep it short and precise. Say what the field represents, which format it expects, and which values are allowed.
4. Select **Submit**.
5. Select **Save**.

## Returning a result from your script

When the {% term "conversation agent" %} runs a {% term script %}, it gets the response of the script. If the script has no response, the conversation agent gets an empty result. It then can't tell what happened, and it might make up an answer.

To return a result from your script:

1. Before the end of the script, store the result in a variable. Do one of the following:
   - If an {% term action %} in the script returns data, enter a name in the **Response variable** of that action.
   - Otherwise, add a [**Define variables**](/building-blocks/variables/) action. It opens in {% term YAML %}. Under `variables`, enter a variable with keys and values. A variable with only text doesn't work. For example, with `result: "done"`, the conversation agent gets an error instead of the result. This example works:

     ```yaml
     variables:
       result:
         temperature: "{{ states('sensor.outdoor_temperature') }}"
     ```

2. At the end of the script, add a [**Stop**](/building-blocks/stop/) action.
3. In **The name of the variable to use as response**, enter the name of that variable.
   - To tell the conversation agent that something went wrong, leave **Stop because of an unexpected error** off. Describe the problem in the variable instead.
4. Select **Save**.
   - Result: The conversation agent gets the content of that variable.

The text in **Reason for stopping** doesn't reach the conversation agent. It only appears in the trace of the script. If you turn on **Stop because of an unexpected error**, the conversation agent gets an empty result. In that case, Home Assistant ignores the response variable.

## Checking that the conversation agent uses your script

Scripts don't appear in the list of {% term entities %} that the {% term "conversation agent" %} gets. To check that the conversation agent can use your {% term script %}, ask it to do something that the script does.

Prerequisites:

- A conversation agent that uses AI. To add one, set up an [AI integration](/integrations/category/ai_voice/ai_models/). Examples are [OpenAI](/integrations/openai_conversation/) and [Google Gemini](/integrations/google_generative_ai_conversation/).
- An [assistant](/voice_control/#assistants) that uses this conversation agent.
- **Device control** is selected in the **AI tools** option of the conversation agent.
- The script is [exposed to Assist](#exposing-a-script-to-assist).
- **Prefer handling commands locally** is turned off in the {% term assistant %}, at least while you test. Otherwise, the built-in conversation agent might run the script itself, without {% term "AI tools" %}.

To check that the conversation agent uses your script:

1. On a dashboard, in the top-right corner, select **Assist** {% icon "mdi:comment-processing-outline" %}.
   - On a narrow screen, it's under **Menu** {% icon "mdi:dots-vertical" %}. On a computer, you can also press <kbd>A</kbd>.
2. At the top of the dialog, select the name of the assistant, and choose the assistant that uses your conversation agent.
3. Ask for something that the script should do.
4. Above the answer, select **Show details**.
   - Result: The details list the AI tools that the conversation agent used, with the values it passed and the result it got back. Your script appears as `script__` followed by the part of its entity ID after `script.`. Its result contains the content of the response variable of the script.
   - For example, `script.play_music` appears as `script__play_music`.
   - If **Show details** is missing, the conversation agent didn't use any AI tools, so it didn't run your script. In that case, [check the description of the script](#adding-a-description-to-your-script).
