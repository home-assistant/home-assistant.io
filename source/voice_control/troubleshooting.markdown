---
title: "Troubleshooting Assist"
---

This page helps you find out why {% term Assist %} doesn't do what you expect, and how to fix it. Start with the debug information or a sentence test. They show what Assist heard, how it understood your sentence, and what it did. Then check the [common problems](#common-problems).

## View debug information

1. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}.
2. From the list of assistants, go to your assistant and select **Debug** in the dialog.
![Open the debug dialog](/images/assist/assistant-debug-03.png)
3. At the top of the screen, from the dropdown menu, select the run you are interested in.
![Debug speech-to-text](/images/assist/assistant-debug-02.png)

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

In the settings of your assistant, a text-to-speech or speech-to-text service isn't in the list of options. For example, Home Assistant Cloud is missing.

#### Description

Home Assistant doesn't list a disabled entity as an option. Each service has a `tts` or `stt` entity. For example, Home Assistant Cloud has `tts.home_assistant_cloud` and `stt.home_assistant_cloud`.

#### Resolution

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.
2. In **Filters**, under **Status**, select **Disabled**.
3. Look for the `tts` or `stt` entity of the service. If it's there, [enable it](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).

{% enddetails %}

{% details "Assist doesn't understand my question about the weather" %}

### Symptom: Assist doesn't understand my question about the weather

You ask Assist about the weather, and it doesn't understand you or answers about the wrong place. The same checks apply to other entities too.

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
   - [Open the debug information](#view-debug-information) of the assistant, and select the run. Look at the text under speech-to-text.
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

## Tweaking the Assist audio configuration for your device

You think there is an issue with background noise or speaker volume? In some cases, it can help to tweak settings such as noise suppression and gain of your voice assistant device (such as the S32-S3-BOX-3).

### To tweak the Assist audio configuration for your device

1. Make sure you have the ESPHome app (formerly known as an add-on) installed:
   - Go to {% my supervisor_store title="**Settings** > **Apps** > **Install app**" %}.
   - If you do not have the **ESPHome** app installed, install it.
2. Start the ESPHome app, and select **Open Web UI**.
3. Adopt your device to the ESPHome app:
   - Once the ESPHome app is started, you see your device as **Discovered**.
   - Select **Adopt**.
   - When prompted, enter the Network credentials of your local 2.4 GHz Wi-Fi network and select **Adopt**.

4. If you see a notification that there is an update available for this device, select **Update**.
5. Make sure you have access to the configuration file.
   - If you are unsure what method to use, [install the File editor](/common-tasks/os/#installing-and-using-the-file-editor-app) app.
   - In the File Editor configuration, make sure the **Enforce basepath** option is disabled.
6. Edit the general configuration to enable debug mode:
   - Access the `config` folder and open the `configuration.yaml` file.
   - Enter the following text:

      ```yaml
      assist_pipeline:
         debug_recording_dir: /share/assist_pipeline
      ```

7. Save the changes and restart Home Assistant.
8. Navigate to `/share/assist_pipeline`.
   - For each voice command you gave, you will find a subfolder with the audio file in `.wav` format.
9. Listen to the audio file of interest.
10. Open the configuration file:
    - In the ESPHome app, on your device, select **Edit**.
    - This lets you edit the configuration file of that device.
11. To add a section to adjust noise suppression and volume, add the following lines:

      ```yaml
      voice_assistant:
         noise_suppression_level: 3
         auto_gain: 31dBFS
         volume_multiplier: 10.0
      ```

12. Adjust the settings:
    - If the audio is too noisy, increase the `noise_suppression_level` (max.&nbsp;4).
    - If the audio is too quiet, increase either the `auto_gain` (max.&nbsp;31) or the `volume_multiplier` (no maximum, but a too high value will cause distortion eventually).
13. Note: Collecting debug recordings impacts your disk space.
    - Once you have found a configuration that works, delete the folder with the audio files.
    - In the `configuration.yaml` file, delete the `assist_pipeline` entry and restart Home Assistant.
