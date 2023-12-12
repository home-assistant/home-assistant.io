---
title: "ESP32-S3-BOX voice assistant"
product_name: ESP32-S3-BOX
device_name_entry: ESP32-S3-BOX
config_link: /voice_control/s3_box_voice_assistant/#to-delete-the-esp32-s3-box-configuration-from-esphome
---

This tutorial will guide you to turn an ESP32-S3-BOX into a Home Assistant voice assistant.
The tutorial applies to the following three ESP32 devices by Espressif:

- [ESP32-S3-BOX](https://www.espressif.com/en/news/ESP32-S3-BOX_video)
- [ESP32-S3-BOX-3](https://www.espressif.com/en/news/ESP32-S3-BOX-3)
- [ESP32-S3-BOX-Lite](https://www.espressif.com/en/news/ESP32-S3-BOX_video)

The steps are the same for all three product variants. The term *ESP32-S3-BOX* is used to refer to all three variants.

## Prerequisites

- Home Assistant 2023.12, installed with the Home Assistant Operating System
- [Home Assistant Cloud](https://www.nabucasa.com) or a manually configured [Assist Pipeline](/voice_control/voice_remote_local_assistant)
- The password to your 2.4&nbsp;GHz Wi-Fi network
- Chrome or Edge browser on a desktop (not Android/iOS)
- One of the three Espressif ESP32-S3-BOX variants:
  - ESP32-S3-BOX
  - ESP32-S3-BOX-3
  - ESP32-S3-BOX-Lite
- USB-C cable to connect the ESP32-S3-BOX

{% include voice_assistant/add_wake_word_to_voice_assistant.md %}

## Installing the software onto the ESP32-S3-BOX

If you have used the ESP32-S3-BOX on Home Assistant before and have it installed via ESPHome add-on, you first need to remove its configuration.

{% include voice_assistant/install_esp_firmware_delete_firmware.md %}

### To install the software on your ESP32-S3-BOX

Before you can use this device with Home Assistant, you need to install a bit of software on it.

1. While keeping this tutorial page open, open the [ESPHome projects page](https://esphome.io/projects/index.html) in a Chrome or Edge browser on a desktop. It does not work on a tablet or phone.
   - In the **I want to create a** section, select **Voice assistant**.
   - Select the image of the ESP32-S3-BOX.
   - From the list, select the product variant that you have.
   - Select the **Connect** button. If your browser does not support web serial, you will see a warning instead of a button.
   - **For advanced users**: The configuration files are available on GitHub:
     - [ESP32-S3-BOX](https://github.com/esphome/firmware/blob/main/voice-assistant/esp32-s3-box.yaml)
     - [ESP32-S3-BOX-3](https://github.com/esphome/firmware/blob/main/voice-assistant/esp32-s3-box-3.yaml)
     - [ESP32-S3-BOX-Lite](https://github.com/esphome/firmware/blob/main/voice-assistant/esp32-s3-box-lite.yaml)

{% include voice_assistant/install_esp_firmware.md %}

1.  Select the **ESPHome** integration. Under **Devices**, you should see the **ESP32-S3-BOX** listed.
   ![ESP32-S3-BOX discovered](/images/assist/m5stack-atom-echo-discovered-new-03.png)
   - Your ESP32-S3-BOX is connected to Home Assistant over Wi-Fi. You can now move it to any place in your home with a USB power supply.
2.   Congratulations! You can now voice control Home Assistant via a ESP32 device with a display. Now give some commands.

## Controlling Home Assistant over the ESP32-S3-BOX

1. Say your wake word. For this tutorial, use "OK, Nabu".
2. Say a [supported voice command](/voice_control/builtin_sentences/). For example, *Turn on the light*.
   - Once the intent has been processed, the LED lights up in green and Home Assistant confirms the action.
      - Make sure you’re using the area name exactly as you defined it in Home Assistant.
      - You can also ask a question, such as
          - *Is the front door locked?*
          - *Which lights are on in the living room?*
3. Your command is not supported? Add your own commands using [a sentence trigger](/voice_control/custom_sentences/).

## Turning off microphone or screen

1. If you do not want to use a wake word for a while, you can turn off the microphone.
   - Go to {% my integrations title="**Settings** > **Devices & Services**" %} and select the **ESPHome** integration.
      - Under **ESP32-S3-BOX**, select **1 device**.
      - Disable **Use wake word**.
      - The screen of the ESP32-S3-BOX will turn off, too.
   
      ![Toggle to enable/disable wake word](/images/assist/wake_word_disable_on_atom_echo.png)
2. If you want to just use the wake word, but do not want to use see the screen, you can turn off the screen.
   - Go to {% my integrations title="**Settings** > **Devices & Services**" %} and select the **ESPHome** integration.
     - Under **ESP32-S3-BOX**, select **1 device**.
     - Disable **LCD Backlight**.
   
      ![Toggle to enable/disable wake word](/images/assist/s3-box-disable-screen.png)

## Related topics

- [Create your own wake words](/voice_control/create_wake_word/)
- [General troubleshooting section for Assist](/voice_control/troubleshooting/)
- [Access to your configuration files](/common-tasks/os/#configuring-access-to-files)
- [Using a sentence trigger](/voice_control/custom_sentences/)
