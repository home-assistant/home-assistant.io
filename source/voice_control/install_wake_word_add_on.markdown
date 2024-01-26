---
title: "Enabling a wake word"
---

Enabling a wake word consists of 2 steps:

1. Installing the openWakeWord add-on.
2. Enabling the wake word for a specific voice assistant.

## Prerequisites

- Home Assistant version 2023.10 or later, installed with the Home Assistant Operating System
- [Home Assistant Cloud](/voice_control/voice_remote_cloud_assistant/) or a manually configured [local Assist pipeline](/voice_control/voice_remote_local_assistant)

## Installing the openWakeWord add-on

1. Go to {% my supervisor_addon addon="core_openwakeword" title="**Settings** > **Add-ons** > **openWakeWord**" %} and select **Install**.
2. Start the add-on.
3. Go to {% my integrations title="**Settings** > **Devices & Services**" %}.
   - Under **Discovered**, you should now see the **Wyoming** integration.
   - Select **Configure** and **Submit**.
   - **Result**: You have successfully installed the openWakeWord add-on and Wyoming integration.

## Enabling wake word for your voice assistant

1. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %} and select **Add assistant**.
2. Give your assistant a name, for example the wake word you are going to use.
3. Select the language you are going to use to speak to Home Assistant.
   - If the **Text-to-speech** and **Speech-to-text** sections do not provide language selectors, this means you do not have an Assist pipeline set up.
   - Set up [Home Assistant Cloud](https://www.nabucasa.com) or a manually configured [Assist pipeline](/voice_control/voice_remote_local_assistant).
4. Under **Text-to-speech**, select the language and voice you want Home Assistant to use when speaking to you.
5. To define the wake word engine, under **Wake word**, select **openWakeWord**.
   - Then, select **ok nabu**.
   - If you created a new assistant, select **Create**.
   - If you edited an existing assistant, select **Update**.
   - **Result**: You now have a voice assistant that listens to a wake word.
6. For the first run, it is recommended to use **ok nabu**, just to test the setup.
   - Once you have it all set up, you can [create your own wake words](/voice_control/create_wake_word/).

## Related topics

- [Create your own wake words](/voice_control/create_wake_word/)
- [About wake words](/voice_control/about_wake_word/)
- [Create a cloud assistant](/voice_control/voice_remote_cloud_assistant/)
- [Create a local assistant](/voice_control/voice_remote_local_assistant)
