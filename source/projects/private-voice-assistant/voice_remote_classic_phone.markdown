---
title: "Setting up an analog phone to control Home Assistant"
---

This tutorial shows how to set up an analog phone to control Home Assistant with your voice.
The phone is used to implement a push-to-talk mechanism. 
In this way, the beginning and end of a voice stream are clearly defined.
This reduces the complexity of voice processing. 

It also means that Home Assistant only listens when you want it to.

<lite-youtube videoid="bPDyDFUHDCk" videotitle="Using an analog phone to control Home Assistant"></lite-youtube>

## Required material

* Latest version of Home Assistant installed on your Home Assistant device
* [Analog phone](#about-the-analog-phone)
* Analog telephone adapter 
  [Grandstream HT801](https://www.grandstream.com/products/gateways-and-atas/analog-telephone-adaptors/product/ht801) or 
  [HT802](https://www.grandstream.com/products/gateways-and-atas/analog-telephone-adaptors/product/ht802)
  * includes a 5&nbsp;V power adapter and an Ethernet cable
* RJ11 cable to connect the phone to the Grandstream

## Setting up Grandstream

1. Connect the RJ11 cable from the phone to the green socket on the Grandstream.
   ![Grandstream HT801 ports](/images/assist/grandstream-ht801-interfaces.png)
1. Connect the Grandstream to your network: 
   * Plug the Ethernet cable into the blue socket and connect it to your router.
1. Start up the Grandstream.
   * Connect the power supply.
   * Once the Grandstream has booted, the two LEDs for power and Ethernet light up solid blue. The phone LED won't light up.
1. Log onto your router and identify the IP address of the Grandstream.
1. Enter the IP address into a browser window and log onto the Grandstream *Device Configuration* software.
   * The default credentials are:
     * **Username**: `admin`
     * **Password**: `admin`  
   ![Login to Grandstream](/images/assist/grandstream_login.png)
1. Open the **FXS Port** tab and in the **Offhook Auto-Dial** field, enter the Home Assistant IP address in the following format:
   * \*47192\*168\*1\*100\*5060
   ![Define IP for autodial](/images/assist/grandstream_autodial.png)
   * Note: instead of 192\*168\*1\*100\*, enter the IP address of your Home Assistant instance.
   * If you have a Grandstream HT802, there are two ports to configure. Repeat this step for the second port.
   * On the bottom of the page, select **Apply**. 
   ![Define IP for autodial](/images/assist/grandstream_apply.png)
   * *Offhook Auto-Dial* means that when you pick up the phone, it directly calls Home Assistant. No need to dial.

## Setting up the phone in Home Assistant

1. In Home Assistant, go to {% my integrations title="**Settings** > **Devices & Services**" %} and select **Add integration**.
1. Add the **Voice over IP** integration.   
    ![Voice over IP integration](/images/assist/voip_install.png)
1. Once you see the integration, pick up the phone.
   * You should now hear the message *This is your smart home speaking. Your phone is connected, but you must configure it within Home Assistant.*
   * The integration should now include a device and entities.
    ![Voice over IP integration with device and entities](/images/assist/voip_device_available.png)
   * Don't hear the voice? Try these [troubleshooting steps](projects/private-voice-assistant/voice_remote_classic_phone/#troubleshoot-grandstream).
1. Allow calls.
   * Calls from new devices are blocked by default since voice commands could be used to control sensitive devices, such as locks and garage doors.
   * In the **Voice over IP** integration, select the **device** link.
   * To allow this phone to control your smart home, under **Configuration**, enable **Allow calls**.   
   ![Voice over IP integration - allow calls](/images/assist/voip_configuration.png) 
1. Your phone is set up in Home Assistant. The next step is to set up a voice assistant.

## Setting up a Home Assistant voice assistant

1. Set up text-to-speech in Home Assistant Cloud.
   * Once the pipeline is further developed, the cloud won't be necessary. It will be possible to process speech locally. 
   * Go to {% my cloud title="**Settings** > **Home Assistant Cloud**" %}.
   * If you have multiple Home Assistance instances running, make sure you are not logged in to Home Assistance Cloud on another instance. 
   * On your current instance, log in to your Home Assistant Cloud.
   * Under **Text-to-speech**, select the default language and select whether you want the voice to sound more female or male.
   ![Home Assistant cloud language settings](/images/assist/ha-cloud-tts-01.png) 
1. Go to **Settings** > **Voice assistants** and select **Add assistant**.
   * Enter a name. You can pick any name that is meaningful to you.
   ![Enter a name for your voice assistant](/images/assist/assistant-give-name.png)
   * Select a **Conversation agent**. This is the software that processes your voice stream. 
   For this tutorial, select **Home Assistant**.
     * Select the **Language** that you want to speak.
      ![Select the language you want to speak](/images/assist/assistant-conversation-agent.png)
   * In the **Speech-to-text** and **Text-to-speech** drop-down menus, select an assistant. For this tutorial, select **Home Assistant Cloud**.
   * Under **Text-to-speech**, select the **voice** of the assistant. For this tutorial, use the default voice.
   * Select **Save**.
   ![Enter a name for your voice assistant](/images/assist/assistant-stt-tts-define.png)
1. To be able to control your devices over a voice command, you must expose your entities to Assist:
   * Open the **Expose** tab.
   ![Expose entities tab](/images/assist/assistant-expose-01.png) 
   * Select **Expose entities**.
   * Select all entities you want to be able to control by voice.
1. Activate your newly created assistant. 
   * Go to {% my integrations title="**Settings** > **Devices & Services**" %} and in the **Voice over IP** integration, select **Devices**.
   * Under **Configuration**, in the **Assist pipeline** menu, select your newly created assistant from the list.   
      ![Activate your newly created assistant](/images/assist/voip-select-pipline.png)
1. Congratulations! You set up your analog phone to work with Home Assistant. Now pick up the phone and control your device. 
   * Say a [supported voice command](/docs/assist/builtin_sentences/). For example, *Turn off the light in the kitchen*.
   * You can also ask a question, such as
     *  *Is the front door locked?*
     *  *Which lights are on in the living room?*.


## Troubleshooting

Things are not working as expected? This section lists a few steps that may help you troubleshoot issues.

### Troubleshoot Grandstream

If you’re unable to call Home Assistant, confirm the following settings in your Grandstream device’s web interface.

1. On the **FXS Port** tab, check the **Preferred Vocoder** list. 
   * Make sure that **OPUS** is selected for one of the choices:
   ![Vocoder OPUS option](/images/assist/grandstream_vocoder.png) 
1. Under **OPUS Payload type**, make sure the value is `123`. It's the default option.
   ![Vocoder OPUS payload type](/images/assist/grandstream_opus_payload.png) 


### Test if the phrase works without voice

Use this procedure to test if the phrase itself works, without using the voice.

1. Go to the **Developer Tools** and open the **Services** tab.
1. Under **Service**, select **Conversation: Process**.
1. If you are using another language than the one defined under your user settings:
   * Select the **Language** checkbox and enter the language code. 
1. Select the **Text** checkbox and enter the phrase you are using.
1. Select **Call service**.
![Call a conversation process from the services tab](/images/assist/conversation-service-01.png)
   * If the phrase does not work, try a variant. For example, if *Turn on the lights* doesn't work, try: *Turn on the lights in the kitchen*.
   * Check if your phrase is [supported](/docs/assist/builtin_sentences/).

### View debug information

1. Go to **Settings** > **Voice assistants**.
1. From the list of assistants, select your assistant.
1. In the dialog, select **Debug**.
1. At the top of the screen, from the dropdown menu, select the run you are interested in.
![Debug speech-to-text](/images/assist/assistant-debug-02.png)

### View the logs

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %}.
![View system logs](/images/assist/assistant-view-system-logs-01.png)
   * Click on the log entry to view a more detailed description.

## About the analog phone

You can use any analog landline phone, ideally one that already has an RJ11 socket.
During creation of this tutorial this classic phone from 1953 was used:
[*Tischstation Mod.29 HF-TR* by Autophon AG](https://www.radiomuseum.org/r/autophon_tischstation_mod29_hf_tr.html).
![Analog phone Tischstation Mod.29 by Autophon AG](/images/assist/autophon-mod-29.jpg)

## FAQ

**Which languages are supported?**
[These](https://developers.home-assistant.io/docs/voice/intent-recognition/supported-languages/) are the languages supported by Home Assistant.
