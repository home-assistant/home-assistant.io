---
title: "Configuring a local voice assistant"
---

If you have Home Assistant Cloud, the voice assistant uses Home Assistant Cloud by default.
This is because the Cloud version currently still performs better than the local version.
The performance depends a bit on the hardware you run it on. To set up a fully local, private voice assistant, follow these steps.

## Setting up a local voice assistant

1. Install the add-ons to convert text into speech and vice versa.
   * Under **Settings** > **Add-ons** > **Z-Wave JS**, install the {% my supervisor_addon addon="whisper" title="**Whisper**" %} and the {% my supervisor_addon addon="piper" title="**Piper**" %} 
      ![Install the Whisper and Piper add-ons](/images/assist/piper-whisper-install-01.png)
   * Start both add-ons. This may take a while.
   * Once the add-ons are started, head over to the integrations under {% my integrations title="**Settings** > **Devices & Services**" %}.
      * You should now see both integrations.
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