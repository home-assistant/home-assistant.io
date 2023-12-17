---
title: "ESP32-S3-BOX-3 voice assistant"
product_name: ESP32-S3-BOX-3
device_name_entry: ESP32-S3-BOX-3
config_link: /voice_control/s3_box_voice_assistant/#to-delete-the-configuration-from-esphome
---

This tutorial will guide you to turn an ESP32-S3-BOX-3 into a Home Assistant voice assistant.

<lite-youtube videoid="erf7HqTwCGs" videotitle="Okay Nabu! Open-source voice assistant running on an Espressif ESP32-S3-Box
"></lite-youtube>

## Prerequisites

- Home Assistant 2023.12, installed with the Home Assistant Operating System
- [Home Assistant Cloud](/voice_control/voice_remote_cloud_assistant/) or a manually configured [Assist Pipeline](/voice_control/voice_remote_local_assistant)
- Have [enabled a wake word](/voice_control/install_wake_word_add_on/) for your voice assistant
- The password to your 2.4&nbsp;GHz Wi-Fi network
- Chrome or Edge browser on a desktop (not Android/iOS)
- One of the three Espressif ESP32-S3-BOX variants:
  - [ESP32-S3-BOX-3](https://www.aliexpress.us/item/1005005920207976.html?gatewayAdapt=4itemAdapt)
  - ESP32-S3-BOX or ESP32-S3-BOX-Lite (not currently on the market)
- USB-C cable to connect the ESP32-S3-BOX-3

## Installing the software onto the ESP32-S3-BOX-3

Before you can use this device with Home Assistant, you need to install a bit of software on it.

1. Make sure this page is opened in a Chromium-based browser on a desktop. It does not work on a tablet or phone.

   - If you have an ESP32-S3-BOX-3, select the **Connect** button below. If your browser does not support web serial, you will see a warning instead of a button.
     - If your device does not readily connect for flashing, you may need to put your ESP32-S3-BOX-3 into "flash mode" by holding the "boot" button (left side upper button), tapping the "reset" button (left side lower button), and then releasing them both. Wait a few seconds before attempting to connect.


      <script type="module" src="https://unpkg.com/esp-web-tools@9/dist/web/install-button.js?module"></script>
      <esp-web-install-button manifest="https://firmware.esphome.io/voice-assistant/esp32-s3-box-3/manifest.json"></esp-web-install-button>


   - If you have an ESP32-S3-BOX or ESP32-S3-BOX-Lite, open the [ESPHome projects](https://esphome.io/projects/index.html?type=voice) page, select your variant and follow the installation instructions.
   - **For advanced users**: The configuration files are available on GitHub:
     - [ESP32-S3-BOX-3](https://github.com/esphome/firmware/blob/main/voice-assistant/esp32-s3-box-3.yaml)

{% include voice_assistant/install_esp_firmware.md %}

9. Select the **ESPHome** integration. Under **Devices**, you should see the **ESP32-S3-BOX-3** listed.
   ![ESP32-S3-BOX-3 discovered](/images/assist/s32-s3-box-3-discovered.png)

   - Your ESP32-S3-BOX-3 is connected to Home Assistant over Wi-Fi. You can now move it to any place in your home with a USB power supply.

10. Congratulations! You can now voice control Home Assistant via a ESP32 device with a display. Now give some commands.

## Controlling Home Assistant

1. Say your wake word. For this tutorial, use "OK, Nabu".
2. Say a [supported voice command](/voice_control/builtin_sentences/). For example, *Turn on the light*.
   - Once the intent has been processed, the LED lights up in green and Home Assistant confirms the action.
      - Make sure you’re using the area name exactly as you defined it in Home Assistant.
      - You can also ask a question, such as
          - *Is the front door locked?*
          - *Which lights are on in the living room?*
3. Your command is not supported? Add your own commands using [a sentence trigger](/voice_control/custom_sentences/).

## Turning off microphone or screen

1. If you do not want to Assist to listen for a while, you can turn off the microphone.
   - Go to {% my integrations title="**Settings** > **Devices & Services**" %} and select the **ESPHome** integration.
      - Under **ESP32-S3-BOX-3**, select **1 device**.
      - Enable **Mute**.
      - The screen of the ESP32-S3-BOX-3 will turn off, too.

      ![Toggle to enable/disable Mute](/images/assist/wake_word_disable.png)
2. If you want to just use the wake word, but do not want to use the screen, you can turn it off.
   - Go to {% my integrations title="**Settings** > **Devices & Services**" %} and select the **ESPHome** integration.
     - Under **ESP32-S3-BOX-3**, select **1 device**.
     - Disable **LCD Backlight**.

      ![Toggle to enable/disable wake word](/images/assist/s3-box-disable-screen.png)

## Related topics

- [Enable a wake word](/voice_control/install_wake_word_add_on/)
- [General troubleshooting section for Assist](/voice_control/troubleshooting/)
- [Troubleshooting the ESP32-S3-BOX-3](/voice_control/troubleshooting_the_s3_box/)
- [ESPHome projects page](https://esphome.io/projects/index.html)
- [Access to your configuration files](/common-tasks/os/#configuring-access-to-files)
