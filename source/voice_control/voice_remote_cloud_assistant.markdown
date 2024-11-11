---
title: "Creating a cloud Assist pipeline"
related:
  - docs: /voice_control/install_wake_word_add_on/
    title: Enabling a wake word
  - docs: /voice_control/create_wake_word/
    title: Create your own wake word
  - docs: /voice_control/voice_remote_local_assistant/
    title: Creating a local assistant
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing devices to Assist
---

In Home Assistant, the Assist pipelines are made up of various components that together form a voice assistant.

You can use Assist out of the box by typing into its text field. But the main goal is to use a voice command. A speech-to-text engine is used so that you can speak to the assistant. For Assist to be able to talk to you, you need to set up a text-to-speech engine. You can use these engines fully locally on your own hardware. To learn how, [follow this procedure](/voice_control/create_wake_word/).

If you have Home Assistant Cloud, there is a default assistant set up automatically. The advantage of using Home Assistant Cloud is that there is more powerful hardware at play. This makes for faster processing and an overall more smooth experience. This procedure shows how to tweak the settings of the assistant that is set up with Home Assistant Cloud.

## Prerequisites

- In this procedure, Home Assistant Cloud will be used
- Home Assistant Cloud is a paid subscription. It helps run servers and pay for things like development and security audits. If you just want to try this for the fun of it, you can start a free 1 month trial and then cancel.

## Setting up a cloud Assist pipeline

To have the fastest processing voice assistant experience, follow these steps:

1. If you haven't done this already, [enable Home Assistant Cloud](https://www.nabucasa.com/config/).
2. As soon as you're connected to Home Assistant Cloud, a voice assistant has been created for you.
   - This voice assistant is using text-to-speech and speech-to-text engines based on the region settings of your Home Assistant user.
3. To view the settings, go to {% my voice_assistants title="**Settings** > **Voice assistants**" %} and under **Assist**, select **Home Assistant Cloud**.
     ![Select the Home Assistant Cloud voice assistant](/images/assist/assistants_ha_cloud.png)

     - **Troubleshooting**: If you do not see any assistants here, you are not using the default configuration. In this case, you need to add the following to your `configuration.yaml` file:

       ```yaml
       # Example configuration.yaml entry
       assist_pipeline:
       ```
4. If the predefined language settings work for you, skip the next step.
5. If you want to make some changes:
   - If you like, change the name. You can pick any name that is meaningful to you.
   - If you do not agree with the predefined language, select the language that you want to speak.
   - Under **Conversation agent**, select **Home Assistant**.
   - Under **Speech-to-text**, select the language you want to speak.
   - Under **Text-to-speech**, select the language you want Assist to use when speaking to you.
   - Depending on your language, you may be able to select different language variants.
   - If you want to use a wake word, [install the openWakeWord add-on](/voice_control/install_wake_word_add_on/).

6. That's it. You can now speak to your device, and the device can answer in the language you defined.
7. If you haven't done so yet, [expose your devices to Assist](/voice_control/voice_remote_expose_devices/#exposing-your-devices).
   - Otherwise you won't be able to control them by voice.
