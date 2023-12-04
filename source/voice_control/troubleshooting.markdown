---
title: "Troubleshooting Assist"
---

This section lists a few steps that may help you troubleshoot issues with Assist. 

## View debug information

1. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}.
2. From the list of assistants, select your assistant.
   ![Select your assistant](/images/assist/assistant-select.png)
3. In the dialog, select **Debug**.
![Open the debug dialog](/images/assist/assistant-debug-03.png)
4. At the top of the screen, from the dropdown menu, select the run you are interested in.
![Debug speech-to-text](/images/assist/assistant-debug-02.png)

## Test a sentence per language without voice: without executing commands

If you want to test if a sentence works in a specific language without actually executing the commands, use the sentence parser in the **Developer tools**.

1. Go to  {% my developer_assist title="**Developer tools** > **Assist**" %}.
2. In the sentence parser, select the language and enter the sentence you want to test.
3. The debug tool shows you the following:
   - The intent triggered.
   - The entities that were targeted.
   - Which of the targeted entities were matched.
![Open the Assist developer tool sentence parser](/images/assist/assistant-debug-06.png)


## Test a sentence per assistant without voice: while executing the commands

If you want to test if a sentence works with a specific assistant while actively executing the commands, use the sentence parser in the **Debug** view.

1. [Open the debug view](#view-debug-information).
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

## Assist does not understand my question about the weather forecast

The example below shows common pitfalls when enquiring about the weather. While some steps are specific to the weather, the general mechanics apply to other entities as well.

1. Make sure you have a [weather service](/integrations/#weather) installed.
   - By default, [Met.no](/integrations/met/) is installed.
2. Make sure you have an entity set up for the location you are interested in.
   - For example, if you are interested in the weather in Berlin, add an entity for Berlin.
  
     ![Create weather entity](/images/assist/metno_weather_entity.png)
3. Make sure the entity is exposed to Assist:
   - Under {% my entities title="**Settings** > **Devices & services** > **Entities**" %}, select the weather entity for that location.
   - In the details view that opens, select the cogwheel, then select **Voice Assistant**.
  
     ![Select voice assistants](/images/assist/weather_entity_voice_assistant.png)

   - Make sure the entity is exposed to Assist.
  
     ![Expose entity to Assist](/images/assist/expose_entity_dialog.png)

4. Make sure you use the exact entity name when talking to Assist.
   - To view the entity name, check the list under {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.
   - For example, if the entity is called *Forecast Berlin*, you have to say "What is the weather in forecast Berlin like".
   - Assist would not recognize it if you ask "What is the weather in Berlin like".
5. If you just ask "What is the weather" when you have weather forecast entities for multiple entities, Assist returns the weather data for the one with the oldest timestamp.

