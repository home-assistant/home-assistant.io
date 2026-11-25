---
title: "Troubleshooting Assist"
---

This page helps you find out why {% term Assist %} doesn't do what you expect, and how to fix it. Start with the debug information or a sentence test. They show what Assist heard, how it understood your sentence, and what it did. Then check the [common problems](#common-problems).

## Viewing debug information

The debug information shows each recent run of an {% term assistant %}. For each run, you see what the assistant heard, how it understood the sentence, which entities it targeted, and how it responded.

1. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}.
2. Next to your assistant, select the three dots {% icon "mdi:dots-vertical" %}, then select **Debug**.
3. At the top of the page, select the run you're interested in.
   - The list shows the date and time of each run. To step through the runs, select **Older run** {% icon "mdi:ray-end-arrow" %} or **Newer run** {% icon "mdi:ray-start-arrow" %}.
   - Result: The page shows each stage of the run, such as speech-to-text, natural language processing, and text-to-speech.

   ![Screenshot of a debug run with the speech-to-text stage](/images/assist/assistant-debug-02.png)

If the page says **No runs found**, the assistant didn't receive anything. Check that your device or the Assist dialog uses this assistant.

## Testing a sentence without running it

To find out if Assist understands a sentence, use the sentence parser. It shows how the built-in conversation agent understands the sentence, but it doesn't run the command. Your devices don't change.

The sentence parser only tests the built-in **Home Assistant** conversation agent. If your assistant uses another {% term "conversation agent" %}, [test the sentence with your assistant](#testing-a-sentence-with-an-assistant) instead.

1. Go to {% my tools_assist title="**Settings** > **Tools** > **Assist**" %}.
2. Under **Language**, select the language of the sentence.
3. Under **Sentences**, enter the sentence you want to test.
   - To test several sentences at once, enter each one on its own line.
4. Select **Parse sentences**.
   - Result: For each sentence, you see the intent that fits it best, the entities it targets, and which of them matched.
   - If the result shows **No intent matched**, Assist doesn't understand this sentence.
   - If the result shows `match: false`, Assist recognized the type of command, but not the entire sentence. `unmatched_slots` shows the part it didn't recognize. For example, an area name that doesn't exist.

   ![Screenshot of the sentence parser with a result](/images/assist/assistant-debug-06.png)

## Testing a sentence with an assistant

To test a sentence with a specific assistant and its conversation agent, run it from the debug view. Unlike the sentence parser, this runs the command. For example, if you test "Turn on the kitchen light", the kitchen light turns on.

1. [Open the debug information](#viewing-debug-information) of your assistant.
2. In the upper-right corner, select **Start debug run** {% icon "mdi:microphone-message" %}.

   ![Screenshot of the debug page with the Start debug run button](/images/assist/assistant-debug-04.png)

3. Select the assistant you want to test.
4. Select **Run text pipeline**.

   ![Screenshot of the Run text pipeline button](/images/assist/assistant-debug-pipeline-01.png)

5. Under **Input text**, enter the sentence you want to test, and select **Run**.
6. Check the result.
   - Result: You see each stage of the run, including the response of the assistant.
   - To continue the conversation, enter your reply under **Response**, and select **Send**.

   ![Screenshot of the result of a text pipeline run](/images/assist/assistant-debug-pipeline-03.png)

If the sentence doesn't work, try the following:

- Try a variant of the sentence. For example, if "Turn off the light" doesn't work, try "Turn off the lights in the kitchen".
- If your assistant uses the built-in **Home Assistant** conversation agent, check if the sentence is [supported by the built-in sentences](/voice_control/builtin_sentences/).
- Use the names of your entities and areas exactly as they're defined in Home Assistant. For example, if your area is called "Bathroom", the sentence "Turn on the lights in the bath" doesn't work. To use other names, [add aliases](/voice_control/aliases/).

## Common problems

{% details "There are no assistants under Settings > Voice assistants" %}

### Symptom: No assistants under Settings > Voice assistants

Under {% my voice_assistants title="**Settings** > **Voice assistants**" %}, you don't see any assistants. Or the entire **Assist** section is missing.

#### Description

The assistants come from the [Assist pipeline](/integrations/assist_pipeline/) integration. It's part of the default configuration of Home Assistant. If you removed `default_config:` from your {% term "`configuration.yaml`" %} file, Home Assistant doesn't load it.

#### Resolution

Add the following to your {% term "`configuration.yaml`" %} file, and restart Home Assistant:

```yaml
# Example configuration.yaml entry
assist_pipeline:
```

{% enddetails %}

{% details "A text-to-speech or speech-to-text service is missing from the assistant settings" %}

### Symptom: A text-to-speech or speech-to-text service is missing

In the settings of your assistant, a text-to-speech or speech-to-text service isn't in the list of options. For example, Home Assistant Link is missing.

#### Description

Home Assistant doesn't list a disabled entity as an option. Each service has a `tts` or `stt` entity. For example, Home Assistant Link has `tts.home_assistant_link` and `stt.home_assistant_link`. If you set up Home Assistant Link before it was renamed, the entities are `tts.home_assistant_cloud` and `stt.home_assistant_cloud`.

#### Resolution

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.
2. In **Filters**, under **Status**, select **Disabled**.
3. Look for the `tts` or `stt` entity of the service. If it's there, [enable it](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).

{% enddetails %}

{% details "Assist doesn't understand my question about the weather" %}

### Symptom: Assist doesn't understand my question about the weather

You ask Assist about the weather, and it doesn't understand you or answers about the wrong place. The same checks apply to other entities too.

#### Description

Assist can only answer about weather entities that are exposed to it. It recognizes them by their exact name or by an alias.

#### Resolution

1. Make sure you have a [weather integration](/integrations/#weather).
   - By default, Home Assistant sets up the [Met.no](/integrations/met/) integration.
2. Make sure you have a weather entity for the location you're interested in.
   - For example, if you're interested in the weather in Berlin, add an entity for Berlin.

   ![Screenshot of the Met.no setup with a location](/images/assist/metno_weather_entity.png)

3. Make sure the weather entity is exposed to Assist.
   - For the steps, refer to [Exposing entities to voice assistants](/voice_control/voice_remote_expose_devices/).
4. Use the exact name of the entity when you talk to Assist.
   - To see the name, check the list under {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.
   - For example, if the entity is called "Forecast Berlin", say "What is the weather like in Forecast Berlin". Assist doesn't recognize "What is the weather like in Berlin".
   - To use "Berlin" instead, add it as an alias of the entity. For the steps, refer to [Adding an alias of an entity](/voice_control/aliases/#adding-an-alias-of-an-entity).

If you have several weather entities and ask "What is the weather" without a name, Assist answers with one of them. You can't choose which one.

{% enddetails %}

{% details "Assist often doesn't understand what I say" %}

### Symptom: Assist often doesn't understand what I say

When you talk to a {% term "voice satellite" %}, Assist often gets your words wrong. In the debug information, the text under speech-to-text isn't what you said.

#### Description

Speech-to-text can only understand what the microphone picks up. Background noise or a low volume might make your voice hard to recognize.

#### Resolution

1. Check what speech-to-text understood.
   - [Open the debug information](#viewing-debug-information) of the assistant, and select the run. Look at the text under speech-to-text.
2. Listen to what Home Assistant received from the device.
   - For the steps, refer to [Recording voice commands for debugging](/integrations/assist_pipeline/#recording-voice-commands-for-debugging).
   - If your voice is clear in the recording, but speech-to-text still gets it wrong, the problem is in speech-to-text, not in the device.
3. When you're done, [turn off debug recording](/integrations/assist_pipeline/#turning-off-debug-recording), and delete the recordings.

{% enddetails %}

{% details "Assist understands the command, but there's no voice response" %}

### Symptom: No voice response

Your voice satellite understands you and runs the command, but you don't hear a voice response.

#### Description

A {% term "text-to-speech" %} integration creates the voice response in Home Assistant. The voice satellite then downloads the audio file from Home Assistant and plays it. For this, Home Assistant tells the device its own URL. If you have a complex network setup, or if you changed this setting in the past, that URL might be wrong.

#### Resolution

1. Go to {% my network title="**Settings** > **System** > **Network**" %}.
2. Under **Home Assistant URL**, check the **Local network** URL. It must point to Home Assistant, and the device must be able to reach it in your network.
   - In most cases, **Automatic** works.

   ![Screenshot of the Local network URL setting](/images/assist/local_url.png)

{% enddetails %}
