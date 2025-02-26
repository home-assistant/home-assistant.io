---
title: "Enabling a wake word"
---

This tutorial shows how you can *enable* a wake word in Home Assistant. It does not describe how to *use* it. 

To *use* the wake word, you need some extra hardware. A low cost option is the [M5Stack ATOM Echo Development Kit](https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit?ref=NabuCasa). To set that up, follow the [$13 voice assistant for Home Assistant](/voice_control/thirteen-usd-voice-remote/).

## To enable a wake word

Enabling a wake word consists of 2 steps:

1. Installing the openWakeWord add-on.
2. Enabling the wake word for a specific voice assistant.

### Prerequisites

- Home Assistant version 2023.10 or later, installed with the Home Assistant Operating System
- [Home Assistant Cloud](/voice_control/voice_remote_cloud_assistant/) or a manually configured [local Assist pipeline](/voice_control/voice_remote_local_assistant)

### Installing the openWakeWord add-on

1. Go to {% my supervisor_addon addon="core_openwakeword" title="**Settings** > **Add-ons** > **openWakeWord**" %} and select **Install**.
2. **Start** the add-on.
3. Go to {% my integrations title="**Settings** > **Devices & Services**" %}.
   - Under **Discovered**, you should now see the **openWakeWord** component of the **Wyoming** integration.
   - Select **Configure** and **Submit**.
   - **Result**: You have successfully installed the openWakeWord add-on and Wyoming integration.

### Enabling wake word for your voice assistant

1. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}
2. Choose the Assistant:
   - To enable wake word for an existing assistant, select the Assistant and continue with step 6.
   - To create a new Assistant: select **Add assistant**.
3. Give your assistant a name, for example the wake word you are going to use.
4. Select the language you are going to use to speak to Home Assistant.
   - If the **Text-to-speech** and **Speech-to-text** sections do not provide language selectors, this means you do not have an Assist pipeline set up.
   - Set up [Home Assistant Cloud](https://www.nabucasa.com) or a manually configured [Assist pipeline](/voice_control/voice_remote_local_assistant).
5. Under **Text-to-speech**, select the language and voice you want Home Assistant to use when speaking to you.
6. To define the wake word engine, in the top-right corner of the dialog, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Add streaming wake word**.
   - **Troubleshooting**: If you don't see the three dots {% icon "mdi:dots-vertical" %} menu, go to {% my integrations title="**Settings** > **Devices & Services**" %} and make sure the **openWakeWord** component of the **Wyoming** integration is added.
   - **Result**: on the bottom of the page, you now see a new section **Streaming wake word engine**.
   - Select **openwakeword**, then select **ok nabu**.
   - If you created a new assistant, select **Create**.
   - If you edited an existing assistant, select **Update**.
   - **Result**: You now have a voice assistant that listens to a wake word.
7. For the first run, it is recommended to use **ok nabu**, just to test the setup.
   - Once you have it all set up, you can [create your own wake words](/voice_control/create_wake_word/).

## Related topics

### About wake words and assistants

- [Create your own wake words](/voice_control/create_wake_word/)
- [About wake words](/voice_control/about_wake_word/)
- [Create a cloud assistant](/voice_control/voice_remote_cloud_assistant/)
- [Create a local assistant](/voice_control/voice_remote_local_assistant)

### Extra hardware to use wake word

- [M5Stack ATOM Echo Development Kit](https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit?ref=NabuCasa)
  - [Tutorial: $13 voice assistant for Home Assistant](/voice_control/thirteen-usd-voice-remote/)
- [ESP32-S3-BOX-3](https://www.aliexpress.us/item/1005005920207976.html?gatewayAdapt=4itemAdapt)
  - [Tutorial: ESP32-S3-BOX-3 voice assistant](/voice_control/s3_box_voice_assistant/)