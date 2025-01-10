---
title: "Getting started - Local"
related:
  - docs: /voice_control/voice_remote_expose_devices/#exposing-your-devices
    title: Expose your devices to Assist
  - docs: /voice_control/create_wake_word/
    title: Create your own wake words
  - url: https://github.com/openai/whisper
    title: Whisper for speech-to-text
  - url: https://github.com/rhasspy/piper
    title: Piper for text-to-speech
  - docs: /voice_control/best_practices/
    title: Best practices with Assist
---

The simplest and most effective way to use Assist is to leverage the voice providers (for speech-to-text and text-to-speech) included in [Home Assistant Cloud](/voice_control/voice_remote_cloud_assistant/) 

If you are interested in setting up a fully local voice assistant, follow this setup:


## Prerequisites

For Assist to be able to talk to your Home Assistant setup your setup needs to be able to listen, understand and then talk back. 

In Home Assistant, the Assist pipelines are made up of various components that together form a voice assistant. For each component, you can choose from different options.

- For listening and talking back, it needs your phone with the Home Assistant app, or a voice activated device.
- For understanding, it needs to have a text-to-speech and speech-to-text software integrated. 
- For running all together, it needs to have the Home Assistant Operating System running.

## Some options for speech-to-text and text-to-speech

There is a speech-to-text and text-to-speech option that runs entirely local. No data is sent to external servers for processing.

The speech-to-text option is [Whisper](https://github.com/openai/whisper). It’s an open source AI model that supports [various languages](https://github.com/openai/whisper#available-models-and-languages). We use a forked version called [faster-whisper](https://github.com/SYSTRAN/faster-whisper). On a Raspberry Pi 4, it takes around 8 seconds to process incoming voice commands. On an Intel NUC, it is done in under a second.
For text-to-speech, we have developed [Piper](https://github.com/rhasspy/piper). Piper is a fast, local neural text-to-speech system that sounds great and is optimized for the Raspberry Pi 4. It supports [many languages](https://rhasspy.github.io/piper-samples/). On a Raspberry Pi, using medium quality models, it can generate 1.6s of voice in a second.

Please be sure to check how either option will work in your language, since quality can change quite a bit.

## Installing a local Assist pipeline

For the quickest way to get your local Assist pipeline started, follow these steps:

1. Install the add-ons to convert text into speech and vice versa.
   - Install the {% my supervisor_addon addon="core_whisper" title="**Whisper**" %} and the {% my supervisor_addon addon="core_piper" title="**Piper**" %} add-ons.
     ![Install the Whisper and Piper add-ons](/images/assist/piper-whisper-install-01.png)
   - If you want to use a wake word, also install the {% my supervisor_addon addon="core_openwakeword" title="**openWakeWord**" %} add-on.
   - Start the add-ons.
   - Once the add-ons are started, head over to the integrations under {% my integrations title="**Settings** > **Devices & Services**" %}.
     - You should now see Piper and Whisper being discovered by the [Wyoming integration](/integrations/wyoming/).
       ![Whisper and Piper integrations](/images/assist/piper-whisper-install-new-02.png)
   - For each integration, select **Add**.
     - Once the setup is complete, you should see both Piper and Whisper (and, optionally, also openWakeword) in one integration.
   
       ![Whisper and Piper integration](/images/assist/piper-whisper-install-new-03.png)
       - **Whisper** converts speech into text.
       - **Piper** converts text into speech.
       - **Wyoming** is the protocol they are both using to communicate.
2. Setup your assistant.

   - Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %} and select **Add assistant**.
     ![Enter a name for your voice assistant](/images/assist/piper-whisper-install-05.png)

     - **Troubleshooting**: If you do not see any assistants here, you are not using the default configuration. In this case, you need to add the following to your {% term "configuration.yaml" %} file:

       ```yaml
       # Example configuration.yaml entry
       assist_pipeline:
       ```

   - Enter a name. You can pick any name that is meaningful to you.
   - Select the language that you want to speak.
   - Under **Conversation agent**, select **Home Assistant**.
   - Under **Speech-to-text**, select **faster-whisper**. Select the language.
   - Under **Text-to-speech**, select **piper**. Select the language.
     - Depending on your language, you may be able to select different language variants.
   - If you like, pick one of the predefined wake words.
     ![Select wake word](/images/assist/assist_predefined_wakeword.png)
     - You can even [define your own wake word](/voice_control/create_wake_word/). This is not difficult to do, but you will need to set aside a bit of time for this.
     - Once you defined your own wake word, it will show in this pick list.

3. That's it. You ensured your voice commands can be processed locally on your device.
4. If you haven't done so yet, [expose your devices to Assist](/voice_control/voice_remote_expose_devices/#exposing-your-devices).
   - Otherwise you won't be able to control them by voice.

## Fine-tuning Whisper and Piper for your setup

You would like to tweak the configuration for better performance or accuracy?
View some of the options in the video below. Explained by Mike Hansen, creator of Rhasspy, Piper, and Wyoming.

<lite-youtube videoid="Tk-pnm7FY7c" videoStartAt="1589" videotitle="Configure your local Assist pipeline for your setup"></lite-youtube>

The options are also documented in the add-on itself. Go to the {% my supervisor_addon addon="core_whisper" title="**Whisper**" %} or the {% my supervisor_addon addon="core_piper" title="**Piper**" %} add-on and open the **Documentation** page.

Also be sure to check the specific tutorial for [using Piper in Automations](voice_control/using_tts_in_automation/)

## Next steps
Once the pipeline is configured, you are ready to jump into the basic conversation setup in Best Practices
