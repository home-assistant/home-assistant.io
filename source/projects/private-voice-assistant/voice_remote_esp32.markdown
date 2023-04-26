---
title: "$13 voice remote that controls Home Assistant"
---

This tutorial will guide you to turn an ESP32 (ATOM Echo by M5) into the
world's most private voice assistant. Pick up the tiny device to talk to
your smart home. Issue commands and get responses!

## Required material

* Latest version of Home Assistant installed on your Home Assistant device 
* [Home Assistant Cloud](https://www.nabucasa.com) or a manually configured [Assist Pipeline](/integrations/assist_pipeline)
* The password to your 2.4&nbsp;GHz Wi-Fi network
* Chrome (or a Chromium-based browser like Edge) on desktop (not Android/iOS) 
* [M5Stack ATOM Echo Development Kit](https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit?ref=NabuCasa)
* USB-C cable to connect the ATOM Echo

## Flashing the firmware onto the ATOM Echo

1. Plug the USB-C cable into the M5Stack ATOM Echo Development Kit and connect it to your computer.
1. Make sure this page is opened in a Chromium-based browser and select the **Connect** button below.

   <script type="module" src="https://unpkg.com/esp-web-tools@9/dist/web/install-button.js?module"></script>
   <esp-web-install-button manifest="https://firmware.esphome.io/voice-assistant/m5stack-atom-echo/manifest.json"></esp-web-install-button>

   * In the pop-up window, select the USB serial port and select **Connect**.
        * Select **Install Voice Assistant**, then **Install**.
        * Follow the instructions provided by the installation wizard.
        * When prompted, enter the credentials to your 2.4&nbsp;GHz Wi-Fi network.
          * As the **Network name**, enter the SSID of your 2.4&nbsp;GHz Wi-Fi.
          * The ATOM Echo now joined your network.
1. In Home Assistant, go to {% my integrations title="**Settings** > **Devices & Services**" %}.
   * You should now see a new **M5Stack Atom Echo** integration.
   * Select **Configure** and then **Submit**.
   * The ESPHome config entry should now show all the entities.
   ![atom echo discovered](/images/assist/m5stack-atom-echo-discovered-03.png)
1. Congratulations! You've setup your ATOM Echo device to voice control Home Assistant. Now give some commands.
   * Press the button on your ATOM Echo.
     * The LED should light up in blue.
     * Say a [supported voice command](/docs/assist/builtin_sentences/). For example, *Turn off the light in the kitchen*.
     * You can also ask a question, such as
        * *Is the front door locked?*
        * *Which lights are on in the living room?*
        * Make sure you’re using the area name as you defined it in Home Assistant. If you have a room called bathroom, the phrase *Turn on the lights in the bath* won’t work.
   * Let go of the button.
     * The LED should light up in green.
     * Home Assistant will confirm the action.
1. Your command was not recognized? Test if the command works:
   * On the **Dashboard**, select the Assist icon in the top right corner.
   ![atom echo discovered](/images/assist/assist-icon-01.png)
   * Enter your phrase to test if the setup works with your device.
   ![atom echo discovered](/images/assist/assist-test-sentence-01.png)

## Troubleshooting

Are things not working as expected?
* Checkout the [general troubleshooting section for Assist](/projects/private-voice-assistant/troubleshooting-assist/).