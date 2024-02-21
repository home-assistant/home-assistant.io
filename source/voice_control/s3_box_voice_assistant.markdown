---
title: "ESP32-S3-BOX voice assistant"
product_name: ESP32-S3-BOX
device_name_entry: ESP32-S3-BOX
config_link: /voice_control/s3_box_voice_assistant/#to-delete-the-configuration-from-esphome
---

This tutorial will guide you to turn an ESP32-S3-BOX, ESP32-S3-BOX-3, or an ESP32-S3-BOX-Light into a Home Assistant voice assistant. Note, the term ESP32-S3-BOX is used to refer to any of the 3 product variants.

<lite-youtube videoid="erf7HqTwCGs" videotitle="Okay Nabu! Open-source voice assistant running on an Espressif ESP32-S3-Box
"></lite-youtube>

## Prerequisites

- Home Assistant 2023.12 or later, installed with the Home Assistant Operating System. If you do not have Home Assistant installed yet, refer to the [installation page](/installation/) for instructions.
- [Home Assistant Cloud](/voice_control/voice_remote_cloud_assistant/) or a manually configured [Assist Pipeline](/voice_control/voice_remote_local_assistant)
- The password to your 2.4&nbsp;GHz Wi-Fi network
- Chrome or Edge browser on a desktop (not Android/iOS)
- One of the three Espressif ESP32-S3-BOX variants:
  - [ESP32-S3-BOX-3](https://www.aliexpress.us/item/1005005920207976.html?gatewayAdapt=4itemAdapt)
  - ESP32-S3-BOX or ESP32-S3-BOX-Lite (not currently on the market)
- USB-C cable to connect the ESP32-S3-BOX

## Installing the software onto the ESP32-S3-BOX

Before you can use this device with Home Assistant, you need to install a bit of software on it.

1. Make sure this page is opened in a Chromium-based browser on a **desktop**. The software installation does not work with a tablet or phone.

   - If you have an ESP32-S3-BOX-3, select the **Connect** button below to display a list of available USB devices. Do not connect the ESP32-S3-BOX-3 yet. We want to see the list of available USB devices first, so that it is easier to recognize the ESP device afterwards.
   - If your browser does not support web serial, you will see a warning message indicating this instead of a button.

      <script type="module" src="https://unpkg.com/esp-web-tools@9/dist/web/install-button.js?module"></script>
      <esp-web-install-button manifest="https://firmware.esphome.io/voice-assistant/esp32-s3-box-3/manifest.json"></esp-web-install-button>


   - If you have an ESP32-S3-BOX or ESP32-S3-BOX-Lite, open the [ESPHome projects](https://esphome.io/projects/index.html?type=voice) page, select your variant and follow the installation instructions.
   - **For advanced users**: The configuration files are available on GitHub:
     - [ESP32-S3-BOX-3](https://github.com/esphome/firmware/blob/main/voice-assistant/esp32-s3-box-3.yaml)

{% include voice_assistant/install_esp_firmware.md %}

9. Select the **ESPHome** integration. Under **Devices**, you should see the **ESP32-S3-BOX** listed.
   ![ESP32-S3-BOX-3 discovered](/images/assist/s32-s3-box-3-discovered.png)

   - Your ESP32-S3-BOX is connected to Home Assistant over Wi-Fi. You can now move it to any place in your home with a USB power supply.

10. If you want, you can process the wake word on the ESP32-S3 device, rather than on your Home Assistant server. (The server is the device where Home Assistant is installed, for example on Home Assistant Green).
    - Under **Devices**, on the ESP32-S3-BOX entry, select **Device** to open the device page.
    - Under **Wake word engine location**, select **On device**, if you want your wake word to be processed locally.
      - Local processing is faster.
      - The wake word is now *Okay Nabu*.

      ![ESP32-S3-BOX-3 on device wake word processing](/images/assist/wake_word_engine_location.png)

11. If you chose on-device wake word, but you do not want to use *Okay Nabu*, you can change the on-device wake word.
    - Currently, *Hey Jarvis* or *Alexa* are the supported alternatives.
    - To change your wake word, follow the steps in [Customizing the S3-BOX with on-device wake words](/voice_control/s3-box-customize/#customizing-on-device-wake-words-microwakeword).
12. Congratulations! You can now voice control Home Assistant via a ESP32 device with a display. Now give some commands.

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

- [General troubleshooting section for Assist](/voice_control/troubleshooting/)
- [Troubleshooting the ESP32-S3-BOX-3](/voice_control/troubleshooting_the_s3_box/)
- [ESPHome projects page](https://esphome.io/projects/index.html)
- [Access to your configuration files](/common-tasks/os/#configuring-access-to-files)
- [Customizing the S3-BOX with on-device wake words](/voice_control/s3-box-customize/#customizing-on-device-wake-words-microwakeword)
