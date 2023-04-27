---
title: "Configuring a local assist pipeline"
---

In Home Assistant, the Assist pipelines are made up of various components that together form a voice assistant.

For each component you can choose from different options. We have prepared a speech-to-text and text-to-speech option that runs fully local.

The speech-to-text option is [Whisper](https://github.com/openai/whisper). It's an open source AI model that supports [various languages](https://github.com/openai/whisper#available-models-and-languages). We use a forked version called [faster-whisper](https://github.com/guillaumekln/faster-whisper). On a Raspberry Pi 4, it takes around 8 seconds to process incoming voice commands. On an Intel NUC it is done in under a second.

For text-to-speech we have developed [Piper](https://github.com/rhasspy/piper). Piper is a fast, local neural text to speech system that sounds great and is optimized for the Raspberry Pi 4. It supports [many languages](https://rhasspy.github.io/piper-samples/). On a Raspberry Pi, using medium quality models, it can generate 1.6s of voice in a second.

## Setting up a local voice assistant

1. Install the add-ons to convert text into speech and vice versa.
   * Under **Settings** > **Add-ons** > **Z-Wave JS**, install the {% my supervisor_addon addon="whisper" title="**Whisper**" %} and the {% my supervisor_addon addon="piper" title="**Piper**" %} 
      ![Install the Whisper and Piper add-ons](/images/assist/piper-whisper-install-01.png)
   * Start both add-ons. This may take a while.
   * Once the add-ons are started, head over to the integrations under {% my integrations title="**Settings** > **Devices & Services**" %}.
      * You should now see both being discovered by the [Wyoming integration](/integations/wyoming).
      ![Whisper and Piper integrations](/images/assist/piper-whisper-install-02.png)
   * For both integrations, select **Configure**.
      * Once the setup is complete, you should see both Piper and Whisper in one integration.      
         ![Whisper and Piper integration](/images/assist/piper-whisper-install-03.png)
           * **Whisper** converts speech into text. 
           * **Piper** converts text into speech. 
           * **Wyoming** is the protocol they are both using to communicate.
1. Setup your assistant.
   * Go to **Settings** > **Voice assistants** and select **Add assistant**.
   ![Enter a name for your voice assistant](/images/assist/piper-whisper-install-05.png)
   * Enter a name. You can pick any name that is meaningful to you.
   * Select the language that you want to speak.
   * Under **Conversation agent**, select **Home Assistant**.
   * Under **Speech-to-text**, select **faster-whisper**.
   * Under **Text-to-speech**, select **piper**.
   * Depending on your language, you may be able to select different language variants.
1. That's it. You ensured your voice commands are processed locally on your device.
1. If you haven't done so yet, [expose your devices to Assist](/projects/private-voice-assistant/voice_remote_expose_devices/#exposing-your-devices).
   * Otherwise you won't be able to control them by voice.