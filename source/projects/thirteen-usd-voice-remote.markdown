---
title: "$13 voice remote for Home Assistant"
---

This tutorial will guide you to turn an ATOM Echo into the
world's most private voice assistant. Pick up the tiny device to talk to
your smart home. Issue commands and get responses!

<lite-youtube videoid="w6QxGdxVMJs" videotitle="$13 voice remote for Home Assistant
"></lite-youtube>

## Required material

* Home Assistant 2023.5 or later
* [Home Assistant Cloud](https://www.nabucasa.com) or a manually configured [Assist Pipeline](/docs/assist/voice_remote_local_assistant)
* The password to your 2.4&nbsp;GHz Wi-Fi network
* Chrome (or a Chromium-based browser like Edge) on desktop (not Android/iOS) 
* [M5Stack ATOM Echo Development Kit](https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit?ref=NabuCasa)
* USB-C cable to connect the ATOM Echo



## Installing the software onto the ATOM Echo

Before you can use this device with Home Assistant, you need to install a bit of software on it.

1. Make sure this page is opened in a Chromium-based browser on a desktop. It does not work on a tablet or phone.
   * Select the **Connect** button below. If your browser does not support web serial, there is no button but a text.

      <script type="module" src="https://unpkg.com/esp-web-tools@9/dist/web/install-button.js?module"></script>
      <esp-web-install-button manifest="https://firmware.esphome.io/voice-assistant/m5stack-atom-echo/manifest.json"></esp-web-install-button>
   * **For advanced users**: The configuration file is available on [GitHub](https://github.com/esphome/media-players/blob/main/m5stack-atom-echo.yaml).

1. Connect the ATOM Echo to your computer.
   * In the popup window, view the available ports.
   * Plug the USB-C cable into the ATOM Echo and connect it to your computer.
   * In the pop-up window, there should now appear a new entry. Select this USB serial port and select **Connect**.
     * Depending on your computer, the entry might look different.
   ![Select USB port](/images/assist/esp32-atom-flash-select-port.png)
   * If no new port shows, your system may be missing a driver. Close the pop-up window.
     * In the dialog, select the CH342 driver, install it, then **Try again**.
   ![Open My link](/images/assist/esp32-atom-flash-no-port.png)
1. Select **Install Voice Assistant**, then **Install**.
     * Follow the instructions provided by the installation wizard.
     * Add the ATOM Echo to your Wi-Fi:
       * When prompted, select your network from the list and enter the credentials to your 2.4&nbsp;GHz Wi-Fi network.
       * Select **Connect**.
       * The ATOM Echo now joined your network. Select **Add to Home Assistant**.
1. This opens the **My** link to Home Assistant. 
   * If you have not used My Home Assistant before, you will need to configure it. If your Home Assistant URL is not accessible on `http://homeassistant.local:8123`, replace it with the URL to your Home Assistant instance.
   * Open the link.
   ![Open My link](/images/assist/esp32-atom-flash-06.png)
1. Select **OK**. 
   
   ![Set up ESPHome](/images/assist/esp32-atom-flash-07.png)
1. To add the newly discovered device, select the ATOM Echo from the list.
   * Add your ATOM Echo to a room and select **Finish**. 
1. You should now see a new **M5Stack Atom Echo** integration.
   ![ATOM Echo discovered](/images/assist/m5stack-atom-echo-discovered-03.png)
   * Your ATOM Echo is connected to Home Assistant over Wi-Fi. You can now move it to any place in your home with a USB power supply. 
1. Congratulations! You can now voice control Home Assistant using a button with build-in microphone. Now give some commands.

## Controlling Home Assistant over the ATOM Echo

1. Press and hold the button on your ATOM Echo.
   * The LED should light up in blue.
1. Say a [supported voice command](/docs/assist/builtin_sentences/). For example, *Turn off the light in the kitchen*.   
      * Make sure you’re using the area name exactly as you defined it in Home Assistant.
      * You can also ask a question, such as
          * *Is the front door locked?*
          * *Which lights are on in the living room?*
1. Let go of the button.
   * The LED should light up in green.
   * Home Assistant will confirm the action.
1. Your command is not supported? [Add your own commands](/integrations/conversation/).

## Troubleshooting

Are things not working as expected?

* Checkout the [general troubleshooting section for Assist](/docs/assist/troubleshooting/).