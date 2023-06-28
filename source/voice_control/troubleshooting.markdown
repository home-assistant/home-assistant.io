---
title: "Troubleshooting Assist"
---

This section lists a few steps that may help you troubleshoot issues with Assist. 

## View debug information

1. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}.
1. From the list of assistants, select your assistant.
   ![Select your assistant](/images/assist/assistant-select.png)
1. In the dialog, select **Debug**.
![Open the debug dialog](/images/assist/assistant-debug-03.png)
1. At the top of the screen, from the dropdown menu, select the run you are interested in.
![Debug speech-to-text](/images/assist/assistant-debug-02.png)

## Test if the phrase works without voice

1. [Open the debug view](#view-debug-information).
1. In the top right corner, select the icon.
![Open the pipeline debug dialog](/images/assist/assistant-debug-04.png)
1. Select **Run text pipeline**.
![Open the pipeline debug dialog](/images/assist/assistant-debug-pipeline-01.png)
1. Enter the phrase you want to test and select **Run**.
![Open the pipeline debug dialog](/images/assist/assistant-debug-pipeline-02.png)
1. Check if it worked.
![Open the pipeline debug dialog](/images/assist/assistant-debug-pipeline-03.png)

## If the phrase did not work, even without voice

1. Try a variant. For example, if *Turn off the light* doesn't work, try: *Turn off the lights in the kitchen*.
1. Check if the phrase is [supported](/voice_control/builtin_sentences/).
1. Check if the devices are exposed to Assist.
   * Under {% my voice_assistants title="**Settings** > **Voice assistants**" %}, open the **Expose** tab.
   * If you do not see the device in the list, select **Expose entities** and add the device.
1. If the phrase includes an area, make sure the device is added to that area.
   * Under **{% my integrations title="Settings > Devices & Services" %}**, on the integration, select devices.
   * From the list of devices, select the device of interest.
   * In the top right corner, select the pencil item.
   * Add the device to that area.
1. Make sure you are using the name of the area exactly as it is defined in Home Assistant.

## I do not see any assistant

If under {% my voice_assistants title="**Settings** > **Voice assistants**" %} you do not see any assistants, you are not using the default configuration. The image below shows the **Assist** section. 

![Open the pipeline debug dialog](/images/assist/assist-assistants-page.png)

If the **Assist** section is missing entirely, you need to add the following to your `configuration.yaml` file:

   ```yaml
   # Example configuration.yaml entry
   assist_pipeline:
   ```
