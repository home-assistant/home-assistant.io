---
title: "Setting up an analog phone to control Home Assistant"
---

This tutorial will guide you to turn your old landline phone into the
world's most private voice assistant. Pick up the phone to talk to
your smart home and issue commands and get responses.

<lite-youtube videoid="0YJzLIMrnGk" videotitle="Using an analog phone to control Home Assistant"></lite-youtube>

## Required material

* Latest version of Home Assistant installed on your Home Assistant device
* [Analog phone](#about-the-analog-phone)
* Analog telephone adapter 
  [Grandstream HT801](https://amzn.to/40k7mRa)
  * includes a 5&nbsp;V power adapter and an Ethernet cable
* RJ11 phone cable to connect the phone to the Grandstream
* [Home Assistant Cloud](https://www.nabucasa.com) or a manually configured [Assist Pipeline](/integrations/assist_pipeline)

## Setting up Grandstream

1. Connect the RJ11 cable from the phone to the green socket on the Grandstream.
   ![Grandstream HT801 ports](/images/assist/grandstream-ht801-interfaces.png)
1. Connect the Grandstream to your network: 
   * Plug the Ethernet cable into the blue socket and connect it to your router.
1. Start up the Grandstream.
   * Connect the power supply.
   * Once the Grandstream has booted, the two LEDs for power and Ethernet light up solid blue. The phone LED won't light up.
1. Identify the IP address of the Grandstream.
   * If your phone has a star * key, you can get your phone to tell you it's IP address:
      *  Press *** (press the star key three times) and wait until you hear *Enter the menu option*.
      *  Press 02 and the phone will tell you its IP address.
   * If your phone does not have a star * key, log onto your router to find the IP address.
1. Enter the IP address into a browser window and log onto the Grandstream *Device Configuration* software.
   * The default credentials are:
     * **Username**: `admin`
     * **Password**: `admin`  
   ![Login to Grandstream](/images/assist/grandstream_login.png)
1. Open the **FXS Port** tab and in the **Offhook Auto-Dial** field, enter the Home Assistant IP address in the following format:
   * \*47192\*168\*1\*100\*5060
   ![Define IP for autodial](/images/assist/grandstream_autodial.png)
   * Note: instead of 192\*168\*1\*100\*, enter the IP address of your Home Assistant instance.
   * At the bottom of the page, select **Apply**. 
   ![Define IP for autodial](/images/assist/grandstream_apply.png)
   * *Offhook Auto-Dial* means that when you pick up the phone, it directly calls Home Assistant. No need to dial.

## Setting up the phone in Home Assistant

1. In Home Assistant, go to {% my config_flow_start domain="voip" title="**Settings** > **Devices & Services** > **Add integration**" %} and add the **Voice over IP** integration.
    ![Voice over IP integration](/images/assist/voip_install.png)
1. Once you see the integration, pick up the phone.
   * You should now hear the message *This is your smart home speaking. Your phone is connected, but you must configure it within Home Assistant.*
   * The integration should now include a device and entities.
    ![Voice over IP integration with device and entities](/images/assist/voip_device_available.png)
   * Don't hear the voice? Try these [troubleshooting steps](/projects/private-voice-assistant/#troubleshoot-grandstream).
1. Allow calls.
   * Calls from new devices are blocked by default since voice commands could be used to control sensitive devices, such as locks and garage doors.
   * In the **Voice over IP** integration, select the **device** link.
   * To allow this phone to control your smart home, under **Configuration**, enable **Allow calls**.   
   ![Voice over IP integration - allow calls](/images/assist/voip_configuration.png) 
1. Congratulations! You set up your analog phone to work with Home Assistant. Now pick up the phone and control your device. 
   * Say a [supported voice command](/docs/assist/builtin_sentences/). For example, *Turn off the light in the kitchen*.
   * You can also ask a question, such as
     *  *Is the front door locked?*
     *  *Which lights are on in the living room?*
   * Make sure you're using the area name as you defined it in Home Assistant. If you have a room called *bathroom*, the phrase *Turn on the lights in the bath* won't work.

## Troubleshoot Grandstream

If you’re unable to call Home Assistant, confirm the following settings in your Grandstream device’s web interface.

1. On the **FXS Port** tab, check the **Preferred Vocoder** list. 
   * Make sure that **OPUS** is selected for one of the choices:
   ![Vocoder OPUS option](/images/assist/grandstream_vocoder.png) 
1. Under **OPUS Payload type**, make sure the value is `123`. It's the default option.
   ![Vocoder OPUS payload type](/images/assist/grandstream_opus_payload.png)
1. At the bottom of the page, select **Apply**.
1. Pick up the phone again and check if you hear the voice.

## Other troubleshooting steps

Are things still not working as expected? 

* Checkout the [general troubleshooting section for Assist](/projects/private-voice-assistant/troubleshooting-assist).

## FAQ

**Which languages are supported?**
[These are the languages supported by Home Assistant](https://developers.home-assistant.io/docs/voice/intent-recognition/supported-languages/).

## About the analog phone

You can use any analog landline phone with an RJ11 socket.
During the creation of this tutorial, this classic phone from 1953 was used:
[*Tischstation Mod.29 HF-TR* by Autophon AG](https://www.radiomuseum.org/r/autophon_tischstation_mod29_hf_tr.html).
![Analog phone Tischstation Mod.29 by Autophon AG](/images/assist/autophon-mod-29.jpg)
