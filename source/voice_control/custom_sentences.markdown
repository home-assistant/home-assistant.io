---
title: "Adding a custom sentence to trigger an automation"
related:
  - docs: /voice_control/aliases/
    title: Create aliases
  - docs: /docs/scripts/#respond-to-a-conversation
    title: Conversation response script action
  - docs: /docs/automation/trigger/#sentence-trigger
    title: Sentence triggers
  - docs: /docs/automation/trigger/#sentence-wildcards
    title: Sentence wildcards
  - docs: voice_control/custom_sentences_yaml
    title: Customize responses
  - url: https://developers.home-assistant.io/docs/intent_builtin/
    title: View existing intents
---

You may add your own sentences to the intent recognizer by either extending an [existing intent](https://developers.home-assistant.io/docs/intent_builtin/) or creating a new one. You may also [customize responses](/voice_control/custom_sentences_yaml#customizing-responses) for existing intents.

## Prerequisites

### Prerequisites

You need a working Assist configuration. If you haven't done so yet, check [Assist's starting page](/voice_control/) to get you ready with your setup.


### To add a custom sentence to trigger an automation

This is the easiest method to get started with custom sentences for automations.

1. Under **{% my automations title="Settings > Automations & Scenes" %}**, in the bottom right corner, select **Create automation**.
2. In the **Trigger** drop-down menu, select **Sentence**.
3. Enter one or more sentences that you would like to trigger an automation.
   - Do not use punctuation.
   - You can add multiple sentences. They will then all trigger that automation.
   ![Add a custom sentence](/images/assist/sentence_trigger_01.png)
4. To add a custom response, select **Add action**. Scroll all the way down and select **Other actions**.
   - Then, select **Set conversation response**.
     ![Set conversation response](/images/assist/assist_set-conversation-response.png)
5. In the text field, enter the response you want to hear from Assist and select **Save**.

   ![Enter the response text](/images/assist/assist_set-conversation-response_02.png)  

   - You can also use [wildcards](/docs/automation/trigger/#sentence-wildcards). For example, the trigger:

      ```yaml
      play {album} by {artist}
      ```

      could have the response:

      {% raw %}

      ```yaml
      Playing {{ trigger.slots.album }} by {{ trigger.slots.artist }}
      ```

      {% endraw %}

   - For more details, refer to [conversation response script action](/docs/scripts/#respond-to-a-conversation).
 
6. To test the automation, go to **Overview** and in the top right corner, open Assist.
   - Enter one of the sentences.
7. If it did not work out, checkout the [troubleshooting](/voice_control/troubleshooting/) section.
   - One of the causes could be that the device you're targeting has not been exposed to Assist.
8. Pick up your voice control device and speak the custom sentence.
   - Your automation should now be triggered.

### Setting up custom sentences in configuration.yaml
To set up custom sentences in your configuration file follow [this tutorial](/voice_control/custom_sentences_yaml/).


## Related devices and installation tutorials

- [$13 voice assistant for Home Assistant](/voice_control/thirteen-usd-voice-remote/)
- [S3-BOX-3 voice assistant](/voice_control/s3_box_voice_assistant/)
- [Assist for Apple](/voice_control/apple/)
- [Assist for Android](/voice_control/android/)
