---
title: "Enabling a wake word"
---

To use wake words, you need to install the openWakeWord add-on.

## Prerequisites

- Home Assistant version 2023.10 or later, installed with the Home Assistant Operating System

## Installing the openWakeWord add-on

1. Go to {% my supervisor_addon addon="core_openwakeword" title="**Settings** > **Add-ons** > **openWakeWord**" %} and select **Install**.
2. Start the add-on.
3. Go to {% my integrations title="**Settings** > **Devices & Services**" %}.
   - Under **Discovered**, you should now see the **Wyoming** integration.
   - Select **Configure** and **Submit**.
   - **Result**: You have successfully installed the openWakeWord add-on and Wyoming integration.
4. Under {% my voice_assistants title="**Settings** > **Voice assistants**" %}, when you select a voice assistant, in the **Wake word** section, you should now see the wake word options that are available out of the box.
   ![Select wake word](/images/blog/2023-10-12-year-of-the-voice-chapter-4/pick-wake-word.png)
5. If you do not like the available options, you can [create your own wake word](/voice_control/create_wake_word/).

## Related topics

- [Create your own wake words](/voice_control/create_wake_word/)
- [About wake words](/voice_control/about_wake_word/)
- [Create a cloud assistant](/voice_control/voice_remote_cloud_assistant/)
