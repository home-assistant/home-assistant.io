---
title: "$13 voice assistant for Home Assistant"
product_name: ATOM Echo
device_name_entry: M5Stack Atom Echo a61920
config_link: /voice_control/thirteen-usd-voice-remote/#to-delete-the-atom-echo-configuration-from-esphome
related:
  - docs: /voice_control/install_wake_word_add_on/
    title: Enable a wake word
  - docs: /voice_control/create_wake_word/
    title: Create your own wake words
  - docs: /voice_control/voice_remote_cloud_assistant/
    title: Creating a Cloud assistant
  - docs: /voice_control/troubleshooting/
    title: General troubleshooting section for Assist
  - docs: /voice_control/voice_remote_local_assistant
    title: Manually configured Assist pipeline
  - docs: /voice_control/custom_sentences/
    title: Using a sentence trigger
  - docs: /common-tasks/os/#configuring-access-to-files
    title: Access to your configuration files
---

This tutorial will guide you to turn an ATOM Echo into a voice assistant. Pick up the tiny device to talk to
your smart home. Issue commands and get responses!

<lite-youtube videoid="ziebKt4XLZQ" videotitle="Wake word demo on $13 ATOM Echo in Home Assistant
"></lite-youtube>

## Prerequisites

- Home Assistant 2023.10 or later, installed with the Home Assistant Operating System. If you do not have Home Assistant installed yet, refer to the [installation page](/installation/) for instructions.
- [Home Assistant Cloud](/voice_control/voice_remote_cloud_assistant/) or a manually configured [Assist Pipeline](/voice_control/voice_remote_local_assistant)
- Have [enabled a wake word](/voice_control/install_wake_word_add_on/) for your voice assistant
- The password to your 2.4&nbsp;GHz Wi-Fi network
- Chrome (or a Chromium-based browser like Edge) on desktop (not Android/iOS)
- [M5Stack ATOM Echo Development Kit](https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit?ref=NabuCasa)
- USB-C cable to connect the ATOM Echo

## Installing the software onto the ATOM Echo

Before you can use this device with Home Assistant, you need to install a bit of software on it.

1. Make sure this page is opened in a Chromium-based browser on a desktop. It does not work on a tablet or phone.
   - Select the **Connect** button below. If your browser does not support web serial, you will see a warning instead of a button.

      <script type="module" src="https://unpkg.com/esp-web-tools@10/dist/web/install-button.js?module"></script>
      <esp-web-install-button manifest="https://firmware.esphome.io/wake-word-voice-assistant/m5stack-atom-echo/manifest.json"></esp-web-install-button>
   - **For advanced users**: The configuration file is available on [GitHub](https://github.com/esphome/wake-word-voice-assistants/blob/main/m5stack-atom-echo/m5stack-atom-echo.yaml).

2. To connect the ATOM Echo to your computer, follow these steps:
   - In the pop-up window, view the available ports.
   - Plug the USB-C cable into the ATOM Echo and connect it to your computer.
   - In the pop-up window, there should now appear a new entry. Select this USB serial port and select **Connect**.
   - **Troubleshooting**: If no new port shows, your system may be missing a driver. Close the pop-up window.
     - In the dialog, select the CH342 driver, install it, then **Try again**.
   ![Open My link](/images/assist/esp32-atom-flash-no-port.png)
3. Select **Install Voice Assistant**, then **Install**.
     - Once the installation is complete, select **Next**.
     - Add the ATOM Echo to your Wi-Fi:
       - When prompted, select your network from the list and enter the credentials to your 2.4&nbsp;GHz Wi-Fi network.
       - Select **Connect**.
       - The ATOM Echo now joined your network. Select **Add to Home Assistant**.
4. This opens the **My** link to Home Assistant.
   - If you have not used My Home Assistant before, you will need to configure it. If your Home Assistant URL is not accessible on `http://homeassistant.local:8123`, replace it with the URL to your Home Assistant instance.
   - Open the link.

     ![Open My link](/images/assist/esp32-atom-flash-06.png)

5. Select **OK**.

   ![Set up ESPHome](/images/assist/esp32-atom-flash-07.png)

6. To add the newly discovered device, select the ATOM Echo from the list.
   - Add your ATOM Echo to a room and select **Finish**.
7. You should now see the **ESPHome** integration.
   ![New ESPHome device discovered](/images/assist/m5stack-atom-echo-discovered-33.png)
8. Select the **ESPHome** integration. Under **Devices**, you should see the **M5Stack Atom Echo** listed.
   ![ATOM Echo discovered](/images/assist/m5stack-atom-echo-discovered-new-03.png)
   - Your ATOM Echo is connected to Home Assistant over Wi-Fi. You can now move it to any place in your home with a USB power supply.
9. Congratulations! You can now voice control Home Assistant. Now give some commands.

## Controlling Home Assistant over the ATOM Echo

1. Say your wake word. For this tutorial, use "OK, Nabu".
   - Wait for the LED to start blinking in blue.
2. Say a [supported voice command](/voice_control/builtin_sentences/). For example, *Turn off the light in the kitchen*.
   - While you are speaking, the blue LED keeps pulsing.
   - Once the intent has been processed, the LED lights up in green and Home Assistant confirms the action.
      - Make sure you’re using the area name exactly as you defined it in Home Assistant.
      - You can also ask a question, such as
          - *Is the front door locked?*
          - *Which lights are on in the living room?*
3. Your command is not supported? Add your own commands using [a sentence trigger](/voice_control/custom_sentences/).
4. You find ATOM Echo takes too long to start processing your command?
   - Adjust the silence detection settings.
   - Go to {% my integrations title="**Settings** > **Devices & Services**" %} and select the **ESPHome** integration.
   - Under **M5Stack ATOM Echo**, select **1 device**. Under **Configuration**, change the **Finish speaking detection**.
   - This setting defines how much silence is needed for Assist to find you're done speaking and it can start processing your command.

     ![Open My link](/images/assist/esp32-atom_silence_detection_01.png)

## Troubleshooting

Are things not working as expected?

- Checkout the [general troubleshooting section for Assist](/voice_control/troubleshooting/).
