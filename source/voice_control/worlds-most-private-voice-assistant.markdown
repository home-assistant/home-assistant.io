---
title: "World's most private voice assistant"
related:
  - docs: /voice_control/voice_remote_cloud_assistant/
    title: Creating a Cloud assistant
  - docs: /voice_control/voice_remote_local_assistant/
    title: Creating a local assistant
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Creating an assistant personality with AI
  - url: https://amzn.to/40k7mRa
    title: Grandstream HT801
  - url: https://www.nabucasa.com
    title: Home Assistant Cloud
---

This tutorial will guide you to turn your old landline phone into the
world's most private voice assistant. Pick up the phone to talk to
your smart home and issue commands and get responses.

<lite-youtube videoid="0YJzLIMrnGk" videotitle="Using an analog phone to control Home Assistant"></lite-youtube>

## Required material

- Home Assistant 2023.5 or later, installed with the Home Assistant Operating System. If you do not have Home Assistant installed yet, refer to the [installation page](/installation/) for instructions.
- An [analog phone](#about-the-analog-phone) with an RJ11 socket
- An analog telephone adapter
  [Grandstream HT801](https://amzn.to/40k7mRa)
  - includes a 5&nbsp;V power adapter and an Ethernet cable
- RJ11 phone cable to connect the phone to the Grandstream
- [Cloud assistant pipeline](/voice_control/voice_remote_cloud_assistant/) or a manually configured [local assistant pipeline](/voice_control/voice_remote_local_assistant/)

## Setting up Grandstream

1. Connect the RJ11 cable from the phone to the green socket on the Grandstream.
   ![Grandstream HT801 ports](/images/assist/grandstream-ht801-interfaces.png)
2. Connect the Grandstream to your network:
   - Plug the Ethernet cable into the blue socket and connect it to your router.
3. Start up the Grandstream.
   - Connect the power supply.
   - Once the Grandstream has booted, the two LEDs for power and Ethernet light up solid blue. The phone LED won't light up.
4. Identify the IP address of the Grandstream.
   - If your phone has a star * key, you can get your phone to tell you it's IP address:
      - Press *** (press the star key three times) and wait until you hear *Enter the menu option*.
      - Press 02 and the phone will tell you its IP address.
   - If your phone does not have a star * key, log onto your router to find the IP address.
5. Enter the IP address into a browser window and log onto the Grandstream *Device Configuration* software.
   - The default credentials are:
     - **Username**: `admin`
     - **Password**: `admin`  
   ![Login to Grandstream](/images/assist/grandstream_login.png)
6. Open the **FXS Port** tab and in the **Offhook Auto-Dial** field, enter the Home Assistant IP address in the following format:
   - \*47192\*168\*1\*100\*5060
   ![Define IP for autodial](/images/assist/grandstream_autodial.png)
   - Note: instead of 192\*168\*1\*100\*, enter the IP address of your Home Assistant instance.
   - At the bottom of the page, select **Apply**.
   ![Define IP for autodial](/images/assist/grandstream_apply.png)
   - *Offhook Auto-Dial* means that when you pick up the phone, it directly calls Home Assistant. No need to dial.

## Setting up the phone in Home Assistant

1. In Home Assistant, go to {% my config_flow_start domain="voip" title="**Settings** > **Devices & Services** > **Add integration**" %} and add the **Voice over IP** integration.
    ![Voice over IP integration](/images/assist/voip_install.png)
2. Once you see the integration, pick up the phone.
   - You should now hear the message *This is your smart home speaking. Your phone is connected, but you must configure it within Home Assistant.*
   - The integration should now include a device and entities.
    ![Voice over IP integration with device and entities](/images/assist/voip_device_available.png)
   - Don't hear the voice? Try these [troubleshooting steps](/voice_control/worlds-most-private-voice-assistant/#troubleshoot-grandstream).
3. Allow calls.
   - Calls from new devices are blocked by default since voice commands could be used to control sensitive devices, such as locks and garage doors.
   - In the **Voice over IP** integration, select the **device** link.
   - To allow this phone to control your smart home, under **Configuration**, enable **Allow calls**.
   ![Voice over IP integration - allow calls](/images/assist/voip_configuration.png)
4. Congratulations! You set up your analog phone to work with Home Assistant. Now pick up the phone and control your device.
   - Say a [supported voice command](/voice_control/builtin_sentences/). For example, *Turn off the light in the kitchen*.
   - You can also ask a question, such as
     - *Is the front door locked?*
     - *Which lights are on in the living room?*
   - Make sure you're using the area name as you defined it in Home Assistant. If you have a room called *bathroom*, the phrase *Turn on the lights in the bath* won't work.
   - Your command is not supported? [Add your own commands](/integrations/conversation/).

## Give your voice assistant personality using the OpenAI integration

<lite-youtube videoid="eLx8_NAqptk" videotitle="Give your voice assistant personality using the OpenAI integration"></lite-youtube>

To reproduce this example, follow these steps:

Note: this procedure requires an OpenAI account. To just run the example, the free trial option is sufficient. No need to leave your credit card information.

1. [Create a Mario personality](/voice_control/assist_create_open_ai_personality/).
2. In the **Voice over IP** integration, under **Configuration**, select the Mario assistant you just created.

      ![VoIP: select OpenAI](/images/assist/assistant-openai-mario-03.png)
3. That's it! Pick up your phone and ask Mario a question.
4. You can repeat this with other OpenAI personalities. You can add as many OpenAI Conversation integrations as you would like.
   - To add a new personality, you need to create a new API key. Then, add a new OpenAI Conversation integration with that API key.

## Troubleshoot Grandstream

### The test call does not work

If you’re unable to call Home Assistant, confirm the following settings in your Grandstream device’s web interface.

1. On the **FXS Port** tab, check the **Preferred Vocoder** list.
   - Make sure that **OPUS** is selected for one of the choices:
   ![Vocoder OPUS option](/images/assist/grandstream_vocoder.png)
2. Under **OPUS Payload type**, make sure the value is `123`. It's the default option.
   ![Vocoder OPUS payload type](/images/assist/grandstream_opus_payload.png)
3. At the bottom of the page, select **Apply**.
4. Pick up the phone again and check if you hear the voice.

### The Voice over IP integration no longer works

**Symptom**
You were able to control Home Assistant over the phone but it no longer works. When picking up the phone, no sound is played. 
The [debug information](/voice_control/troubleshooting#view-debug-information) shows no runs.

**Potential remedy**

1. Log onto the Grandstream *Device Configuration* software.
2. On the **Status** page, check if the **Hook** status changes from **On Hook** to **In Use** after you picked up the phone.
   ![Check the Grandstream status](/images/assist/grandstream-troubleshoot-10.png)
   - The software is quite slow. Refresh the page and wait for a while before hanging up again.
3. If the status does not change, reboot the Grandstream and try calling Home Assistant again.

## Other troubleshooting steps

Are things still not working as expected?

- Checkout the [general troubleshooting section for Assist](/voice_control/troubleshooting).

## About the analog phone

You can use any analog landline phone with an RJ11 socket.

The phone shown in the video by TheFes is a *Heemaf type 1955*, which was used by the Dutch telephone company PTT at the time.

The phone used during creation of this tutorial is a 1953 [*Tischstation Mod.29 HF-TR* by Autophon AG](https://www.radiomuseum.org/r/autophon_tischstation_mod29_hf_tr.html).
![Analog phone Tischstation Mod.29 by Autophon AG](/images/assist/autophon-mod-29.jpg)
