---
title: "Troubleshooting Assist"
---

This section lists a few steps that may help you troubleshoot issues with Assist. 

## View debug information

1. Go to **Settings** > **Voice assistants**.
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
   * If the phrase does not work, try a variant. For example, if *Turn off the light* doesn't work, try: *Turn off the lights in the kitchen*.
   * Check if your phrase is [supported](/docs/assist/builtin_sentences/).
   * Make sure you are using the name of the area as it is defined in Home Assistant. If you have a room called *bathroom*, the phrase *Turning on the lights in the bath* won’t work.
