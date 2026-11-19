---
title: "Troubleshooting Assist"
---

This section lists a few steps that may help you troubleshoot issues with Assist. 

## Viewing debug information

The debug information shows each recent run of an {% term assistant %}. For each run, you see what the assistant heard, how it understood the sentence, which entities it targeted, and how it responded.

1. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}.
2. Next to your assistant, select the three dots {% icon "mdi:dots-vertical" %}, then select **Debug**.
   ![Screenshot of the assistant menu with the Debug option](/images/assist/assistant-debug-03.png)
3. At the top of the page, select the run you're interested in.
   - The list shows the date and time of each run. To step through the runs, select **Older run** {% icon "mdi:ray-end-arrow" %} or **Newer run** {% icon "mdi:ray-start-arrow" %}.
   - Result: The page shows each stage of the run, such as speech-to-text, natural language processing, and text-to-speech.
   ![Screenshot of a debug run with the speech-to-text stage](/images/assist/assistant-debug-02.png)

If the page says **No runs found**, the assistant didn't receive anything. Check that your device or the Assist dialog uses this assistant.

## Test a sentence per language without voice: without executing commands

If you want to test if a sentence works in a specific language without actually executing the commands, use the sentence parser in **Tools**.

1. Go to {% my tools_assist title="**Settings** > **Tools** > **Assist**" %}.
2. In the sentence parser, select the language and enter the sentence you want to test.
3. The debug tool shows you the following:
   - The intent triggered.
   - The entities that were targeted.
   - Which of the targeted entities were matched.
![Open the Assist developer tool sentence parser](/images/assist/assistant-debug-06.png)

## Test a sentence per assistant without voice: while executing the commands

If you want to test if a sentence works with a specific assistant while actively executing the commands, use the sentence parser in the **Debug** view.

1. [Open the debug view](#viewing-debug-information).
2. In the top right corner, select the icon.
![Open the pipeline debug dialog](/images/assist/assistant-debug-04.png)
3. Select the assistant you want to test.
4. Select **Run text pipeline**.
![Open the pipeline debug dialog](/images/assist/assistant-debug-pipeline-01.png)
5. Enter the phrase you want to test and select **Run**.
![Open the pipeline debug dialog](/images/assist/assistant-debug-pipeline-02.png)
6. Check if it worked.
![Open the pipeline debug dialog](/images/assist/assistant-debug-pipeline-03.png)
   - If the phrase does not work, try a variant. For example, if *Turn off the light* doesn't work, try: *Turn off the lights in the kitchen*.
   - Check if your phrase is [supported](/voice_control/builtin_sentences/).
   - Make sure you are using the name of the area as it is defined in Home Assistant. If you have a room called *bathroom*, the phrase *Turning on the lights in the bath* won’t work.

## I do not see any assistant

If under {% my voice_assistants title="**Settings** > **Voice assistants**" %} you do not see any assistants, you are not using the default configuration. The image below shows the **Assist** section.

![Open the pipeline debug dialog](/images/assist/assist-assistants-page.png)

If the **Assist** section is missing entirely, you need to add the following to your `configuration.yaml` file:

   ```yaml
   # Example configuration.yaml entry
   assist_pipeline:
   ```

## I do not see a text-to-speech or speech-to-text option

If a text-to-speech or speech-to-text service is missing from the options of your assistant, its entity may be disabled. Home Assistant does not offer a disabled entity as an option. This can also happen with Home Assistant Cloud, for example with the entities `tts.home_assistant_cloud` and `stt.home_assistant_cloud`.

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.
2. In **Filters**, under **Status**, select **Disabled**.
3. Look for the `tts` or `stt` entity of the service. If it is there, [enable it](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).

## Assist does not understand my question about the weather forecast

The example below shows common pitfalls when enquiring about the weather. While some steps are specific to the weather, the general mechanics apply to other entities as well.

1. Make sure you have a [weather service](/integrations/#weather) installed.
   - By default, [Met.no](/integrations/met/) is installed.
2. Make sure you have an entity set up for the location you are interested in.
   - For example, if you are interested in the weather in Berlin, add an entity for Berlin.
  
     ![Create weather entity](/images/assist/metno_weather_entity.png)
3. Make sure the entity is exposed to Assist:
   - Under {% my entities title="**Settings** > **Devices & services** > **Entities**" %}, select the weather entity for that location.
   - In the details view that opens, select the cogwheel {% icon "mdi:cog-outline" %}, then select **Voice Assistant**.
  
     ![Select voice assistants](/images/assist/weather_entity_voice_assistant.png)

   - Make sure the entity is exposed to Assist.
  
     ![Expose entity to Assist](/images/assist/expose_entity_dialog.png)

4. Make sure you use the exact entity name when talking to Assist.
   - To view the entity name, check the list under {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.
   - For example, if the entity is called *Forecast Berlin*, you have to say "What is the weather in forecast Berlin like".
   - Assist would not recognize it if you ask "What is the weather in Berlin like".
   - If you want to use Berlin instead of *Forecast Berlin*, you can create an entity name alias.
     - You can create as many aliases as you like.

     ![Create alias for entity name](/images/assist/assist_create_alias.png)
5. If you just ask "What is the weather" when you have forecast entities for multiple entities, Assist always returns the data for the place that was first added. Currently, there is no way to change that.

## I don't get a voice response

My voice assistant understands me and processes the command, but I don't get a voice response.

The voice response is generated in Home Assistant by one of our supported text-to-speech (or {% term TTS %}) engines.
The voice assistant device then fetches the audio file from Home Assistant and plays it back.

### Local Network Settings
For this fetching process to work, Home Assistant must communicate its own URL to the device.
If you have a complex network setup, or if you changed this setting in the past, the URL communicated could be wrong.

To fix the URL, follow these steps:

1. Go to {% my network title="**Settings** > **System** > **Network**" %}.
2. Change your Local Network Home Assistant URL to a URL that can be reached locally and that points to Home Assistant
  - For most users, the **Automatic** option works and is recommended.
   ![Create alias for entity name](/images/assist/local_url.png)

### Missing Media Source
If you are using YAML configuration and do not have `default_config:` make sure `media_source:` is present.
