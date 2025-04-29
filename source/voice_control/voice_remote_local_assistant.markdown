---
title: "Getting started - Local"
related:
  - docs: /voice_control/best_practices/
    title: Best practices with Assist
  - docs: /voice_control/expanding_assist/
    title: Expanding Assist
  - docs: /voice_control/voice_remote_local_assistant/
    title: Creating a local assistant
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing devices to Assist
  - url: https://voice-pe.home-assistant.io/documentation/
    title: Voice Preview Edition - Documentation
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

There are speech-to-text and text-to-speech options that run entirely local. No data is sent to external servers for processing.

### Speech-to-text engines

There are currently two options to run speech-to-text locally: **Speech-to-Phrase** and **Whisper**.

#### Speech-to-Phrase
[Speech-to-Phrase](https://github.com/OHF-voice/speech-to-phrase) is a close-ended speech model. 

- It transcribes what it knows.
- Extremely fast transcription even on a Home Assistant Green or Raspberry Pi 4 (under one second).
- Only supports a subset of Assist’s voice commands.
   - More open-ended items such as shopping lists, naming a timer, and broadcasts are *not* usable out of the box.
- Speech-to-Phrase supports [various languages](https://github.com/OHF-voice/speech-to-phrase?tab=readme-ov-file#supported-languages).
- These qualities make it a great option for Home control!

#### Whisper

[Whisper](https://github.com/openai/whisper) is an open-ended speech model.

- It will try to transcribe everything.
- The cost is slower processing speed: 
    - On a Raspberry Pi 4, it takes around 8 seconds to process incoming voice commands. 
    - On an Intel NUC, it is done in under a second.
- Supports [various languages](https://github.com/openai/whisper#available-models-and-languages).
- Whisper is only a great option in the following case: 
    1. You have powerful hardware at home.
    2. You plan to extend your voice set-up beyond simple home control. For example, by pairing your assistant with an LLM-based agent.

### Text-to-speech engine

For text-to-speech, we have developed [Piper](https://github.com/rhasspy/piper). Piper is a fast, local neural text-to-speech system that sounds great and is optimized for the Raspberry Pi 4. It supports [many languages](https://rhasspy.github.io/piper-samples/). On a Raspberry Pi, using medium quality models, it can generate 1.6s of voice in a second.

Please be sure to check how either option will work in your language, since quality can change quite a bit.

## Installing a local Assist pipeline

For the quickest way to get your local Assist pipeline started, follow these steps:

1. Install the add-ons to convert text into speech and vice versa.
   - Install the speech-to-text add-on of your choice, either {% my supervisor_addon addon="core_speech-to-phrase" title="**Speech-to-Phrase**" %} or {% my supervisor_addon addon="core_whisper" title="**Whisper**" %}.
   - Install {% my supervisor_addon addon="core_piper" title="**Piper**" %} for text-to-speech.
   - Start the add-ons.
   - Once the add-ons are started, head over to the integrations under {% my integrations title="**Settings** > **Devices & Services**" %}.
     - You should now see both services being discovered by the [Wyoming integration](/integrations/wyoming/).
       ![Whisper and Piper integrations](/images/assist/piper-whisper-install-new-02.png)
   - For each integration, select **Add**.
   - You now have integrated a local speech-to-text engine of your choice (either {% my supervisor_addon addon="core_speech-to-phrase" title="**Speech-to-Phrase**" %} or {% my supervisor_addon addon="core_whisper" title="**Whisper**" %}) and a text-to-speech engine ({% my supervisor_addon addon="core_piper" title="**Piper**" %}).

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
   - Under **Speech-to-text**, select the speech-to-text engine you choose in the previous step (either **Whisper** or **Speech-to-Phrase**). Select the language.
   - Under **Text-to-speech**, select **Piper**. Select the language.
     - Depending on your language, you may be able to select different language variants.

3. That's it. You ensured your voice commands can be processed locally on your device.
4. If you haven't done so yet, [expose your devices to Assist](/voice_control/voice_remote_expose_devices/#exposing-your-devices).
   - Otherwise you won't be able to control them by voice.

## Fine-tuning Whisper and Piper for your setup

You would like to tweak the configuration for better performance or accuracy?
View some of the options in the video below. Explained by Mike Hansen, creator of Rhasspy, Piper, and Wyoming.

<lite-youtube videoid="Tk-pnm7FY7c" videoStartAt="1589" videotitle="Configure your local Assist pipeline for your setup"></lite-youtube>

The options are also documented in the add-on itself. Go to the {% my supervisor_addon addon="core_whisper" title="**Whisper**" %} or the {% my supervisor_addon addon="core_piper" title="**Piper**" %} add-on and open the **Documentation** page.

Also be sure to check the specific tutorial for [using Piper in Automations](voice_control/using_tts_in_automation/)

## Learning more about Speech-to-Phrase

You can check out [Voice Chapter 9](/blog/2025/02/13/voice-chapter-9-speech-to-phrase/) to learn more about why we introduced Speech-to-Phrase, and why it's a great option for home control.

<lite-youtube videoid="k6VvzDSI8RU" videotitle="Voice Chapter 9"></lite-youtube>

## Next steps
Once Assist is configured, now can now start using it. You can now talk through your device ([Android](/voice_control/android/), [iOS](/voice_control/apple/) or [Voice Preview edition](https://voice-pe.home-assistant.io/getting-started/)).

To get the best out of the voice interaction, don't forget to check the [best practices](/voice_control/best_practices/).
