---
title: "ESP32-S3-BOX voice assistant"
product_name: ESP32-S3-BOX
device_name_entry: ESP32-S3-BOX
config_link: /voice_control/s3_box_voice_assistant/#to-delete-the-configuration-from-esphome
related:
  - docs: /voice_control/troubleshooting/
    title: General troubleshooting section for Assist
  - docs: /voice_control/troubleshooting_the_s3_box/
    title: Troubleshooting the ESP32-S3-BOX-3
  - docs: /common-tasks/os/#configuring-access-to-files
    title: Access to your configuration files
  - docs: /voice_control/about_wake_word/
    title: Enable wake word
  - docs: /voice_control/s3-box-customize/#customizing-on-device-wake-words-microwakeword
    title: Customizing the S3-BOX with on-device wake words
  - url: https://esphome.io/projects/index.html
    title: ESPHome projects page
---

This tutorial will guide you to turn an ESP32-S3-BOX, ESP32-S3-BOX-3, or an ESP32-S3-BOX-Lite into a Home Assistant voice assistant. Note, the term ESP32-S3-BOX may be used to refer to any of the 3 product variants.

<lite-youtube videoid="erf7HqTwCGs" videotitle="Okay Nabu! Open-source voice assistant running on an Espressif ESP32-S3-Box
"></lite-youtube>

## Prerequisites

- Home Assistant 2023.12 or later, installed with the Home Assistant Operating System. If you do not have Home Assistant installed yet, refer to the [installation page](/installation/) for instructions.
- [Home Assistant Cloud](/voice_control/voice_remote_cloud_assistant/) or a manually configured [Assist Pipeline](/voice_control/voice_remote_local_assistant)
- The password to your 2.4&nbsp;GHz Wi-Fi network
- Chrome or Edge browser on a desktop (not Android/iOS)
- One of the three Espressif ESP32-S3-BOX variants:
  - ESP32-S3-BOX-3B
  - ESP32-S3-BOX-3, ESP32-S3-BOX, or ESP32-S3-BOX-Lite (not currently on the market)
- USB-C cable to connect the ESP32-S3-BOX

## Installing the software onto the ESP32-S3-BOX

Before you can use this device with Home Assistant, you need to install a bit of software on it.

{% tabbed_block %}

- title: Using the ESP32-S3-BOX
  content: |

    1. Make sure this page is opened in a Chromium-based browser on a **desktop**. The software installation does not work with a tablet or phone.

       - If your browser does not support web serial, you will see a warning message indicating this instead of a button.

           <script type="module" src="https://unpkg.com/esp-web-tools@10/dist/web/install-button.js?module"></script>
           <esp-web-install-button manifest="https://firmware.esphome.io/wake-word-voice-assistant/esp32-s3-box/manifest.json"></esp-web-install-button>

       - **For advanced users**: The configuration files are available on GitHub:
         - [ESP32-S3-BOX config on GitHub](https://github.com/esphome/firmware/blob/main/wake-word-voice-assistant/esp32-s3-box.yaml)

    2. To connect the ESP32-S3-BOX to your computer, follow these steps:
       - In the pop-up window, view the available ports.
       - Plug the USB-C cable into the ESP32-S3-BOX and connect it to your computer.
    3. Select **Install Voice Assistant**, then **Install**.
         - Once the installation is complete, select **Next**.
         - Add the ESP32-S3-BOX to your Wi-Fi:
           - When prompted, select your network from the list and enter the credentials to your 2.4&nbsp;GHz Wi-Fi network.
           - Select **Connect**.
           - The ESP32-S3-BOX now joined your network. Select **Add to Home Assistant**.
    4. This opens the **My** link to Home Assistant.
       - If you have not used My Home Assistant before, you will need to configure it. If your Home Assistant URL is not accessible on `http://homeassistant.local:8123`, replace it with the URL to your Home Assistant instance.
       - Open the link.
       ![Open My link](/images/assist/esp32-atom-flash-06.png)
    5. Select **OK**.
       ![Set up ESPHome](/images/assist/esp32-atom-flash-07.png)
    6. To add the newly discovered device, select the ESP32-S3-BOX from the list.
       - Add your ESP32-S3-BOX to a room and select **Finish**.
    7. You should now see the **ESPHome** integration.
       ![New ESPHome device discovered](/images/assist/m5stack-atom-echo-discovered-33.png)
    8. Select the **ESPHome** integration. Under **Devices**, you should see the **ESP32-S3-BOX** listed.
        ![ESP32-S3-BOX-3 discovered](/images/assist/s32-s3-box-3-discovered.png)

        - Your ESP32-S3-BOX is connected to Home Assistant over Wi-Fi. You can now move it to any place in your home with a USB power supply.

- title: Using the ESP32-S3-BOX-3(B)
  content: |

    1. These steps apply both to the ESP32-S3-BOX-3 and the ESP32-S3-BOX-3B. Make sure this page is opened in a Chromium-based browser on a **desktop**. The software installation does not work with a tablet or phone.

       - Select the **Connect** button below to display a list of available USB devices. Do not connect the ESP32-S3-BOX-3 yet. We want to see the list of available USB devices first, so that it is easier to recognize the ESP device afterward.
       - If your browser does not support web serial, you will see a warning message indicating this instead of a button.

           <script type="module" src="https://unpkg.com/esp-web-tools@10/dist/web/install-button.js?module"></script>
           <esp-web-install-button manifest="https://firmware.esphome.io/wake-word-voice-assistant/esp32-s3-box-3/manifest.json"></esp-web-install-button>

       - **For advanced users**: The configuration files are available on GitHub:
         - [ESP32-S3-BOX-3 config on GitHub](https://github.com/esphome/firmware/blob/main/wake-word-voice-assistant/esp32-s3-box-3.yaml)

    2. To connect the ESP32-S3-BOX-3 to your computer, follow these steps:
       - In the pop-up window, view the available ports.
       - Plug the USB-C cable into the box directly, not into the docking station (not into the blue part) and connect it to your computer.
       - **Troubleshooting**: If your ESP32-S3-BOX-3 does not appear in the list of devices presented by your browser, you need to manually invoke "flash mode":
         - Hold the "boot" button (left side upper button) as you tap the "reset" button (left side lower button).
         - After a few seconds, the ESP32-S3-BOX-3 should appear in the list of USB devices presented by your browser.
         - Follow the steps until step 3. After selecting the **Next** button, on the S3-Box-3, tap the "Reset" button again.
         - Then, select the blue **Connect button** again, select the USB device and follow the prompts to configure the Wi-Fi.
         - In the pop-up window, there should now appear a new entry. Select this USB serial port and select **Connect**.
    3. Select **Install Voice Assistant**, then **Install**.
         - Once the installation is complete, select **Next**.
         - Add the ESP32-S3-BOX-3 to your Wi-Fi:
           - When prompted, select your network from the list and enter the credentials to your 2.4&nbsp;GHz Wi-Fi network.
           - Select **Connect**.
           - The ESP32-S3-BOX-3 now joined your network. Select **Add to Home Assistant**.
    4. This opens the **My** link to Home Assistant.
       - If you have not used My Home Assistant before, you will need to configure it. If your Home Assistant URL is not accessible on `http://homeassistant.local:8123`, replace it with the URL to your Home Assistant instance.
       - Open the link.
       ![Open My link](/images/assist/esp32-atom-flash-06.png)
    5. Select **OK**.

       ![Set up ESPHome](/images/assist/esp32-atom-flash-07.png)
    6. To add the newly discovered device, select the ESP32-S3-BOX-3 from the list.
       - Add your ESP32-S3-BOX-3 to a room and select **Finish**.
    7. You should now see the **ESPHome** integration.
       ![New ESPHome device discovered](/images/assist/m5stack-atom-echo-discovered-33.png)

    8. Select the **ESPHome** integration. Under **Devices**, you should see the **ESP32-S3-BOX** listed.
        ![ESP32-S3-BOX-3 discovered](/images/assist/s32-s3-box-3-discovered.png)

        - Your ESP32-S3-BOX is connected to Home Assistant over Wi-Fi. You can now move it to any place in your home with a USB power supply.

- title: Using the ESP32-S3-BOX-Lite
  content: |

    1. Make sure this page is opened in a Chromium-based browser on a **desktop**. The software installation does not work with a tablet or phone.

       - If your browser does not support web serial, you will see a warning message indicating this instead of a button.

           <script type="module" src="https://unpkg.com/esp-web-tools@10/dist/web/install-button.js?module"></script>
           <esp-web-install-button manifest="https://firmware.esphome.io/wake-word-voice-assistant/esp32-s3-box-lite/manifest.json"></esp-web-install-button>

       - **For advanced users**: The configuration files are available on GitHub:
         - [ESP32-S3-BOX-Lite config on GitHub](https://github.com/esphome/firmware/blob/main/wake-word-voice-assistant/esp32-s3-box-lite.yaml)

    2. To connect the ESP32-S3-BOX-Lite to your computer, follow these steps:
       - In the pop-up window, view the available ports.
       - Plug the USB-C cable into the ESP32-S3-BOX-Lite and connect it to your computer.
    3. Select **Install Voice Assistant**, then **Install**.
         - Once the installation is complete, select **Next**.
         - Add the ESP32-S3-BOX-Lite to your Wi-Fi:
           - When prompted, select your network from the list and enter the credentials to your 2.4&nbsp;GHz Wi-Fi network.
           - Select **Connect**.
           - The ESP32-S3-BOX-Lite now joined your network. Select **Add to Home Assistant**.
    4. This opens the **My** link to Home Assistant.
       - If you have not used My Home Assistant before, you will need to configure it. If your Home Assistant URL is not accessible on `http://homeassistant.local:8123`, replace it with the URL to your Home Assistant instance.
       - Open the link.
       ![Open My link](/images/assist/esp32-atom-flash-06.png)
    5. Select **OK**.
       ![Set up ESPHome](/images/assist/esp32-atom-flash-07.png)
    6. To add the newly discovered device, select the ESP32-S3-BOX-Lite from the list.
       - Add your ESP32-S3-BOX-Lite to a room and select **Finish**.
    7. You should now see the **ESPHome** integration.
       ![New ESPHome device discovered](/images/assist/m5stack-atom-echo-discovered-33.png)
    8. Select the **ESPHome** integration. Under **Devices**, you should see the **ESP32-S3-BOX-Lite** listed.
        ![ESP32-S3-BOX-3 discovered](/images/assist/s32-s3-box-3-discovered.png)

        - Your ESP32-S3-BOX-Lite is connected to Home Assistant over Wi-Fi. You can now move it to any place in your home with a USB power supply.

{% endtabbed_block %}

## Checking wake word settings

1. Make sure your assistant has [wake word enabled](/voice_control/about_wake_word/), using "OK Nabu".
2. Under **Devices**, on the ESP32-S3-BOX* entry, select **Device** to open the device page.
3. Check the device settings:
    - If you want, you can process the wake word on the ESP32-S3 device, rather than on your Home Assistant server.   (The server is the device where Home Assistant is installed, for example on Home Assistant Green):
    - Under **Wake word engine location**, select **On device**, if you want your wake word to be processed on the device itself, and not in Home Assistant.
      - Local processing is faster.
      - The wake word is now *Okay Nabu*.
    - If **Display conversation** is enabled, the conversation is shown on the ESP32-S3-BOX* display.

      ![ESP32-S3-BOX-3 on device wake word processing](/images/assist/wake_word_engine_location.png)

4. If you chose on-device wake word, but you do not want to use *Okay Nabu*, you can change the on-device wake word.
   - Currently, *Hey Jarvis* or *Alexa* are the supported alternatives.
   - To change your wake word, follow the steps in [Customizing the S3-BOX-3 with on-device wake words](/voice_control/s3-box-customize/#customizing-on-device-wake-words-microwakeword).
5. Congratulations! You can now voice control Home Assistant via a ESP32 device with a display. Now give some commands.

## Controlling Home Assistant

1. Say your wake word. For this tutorial, use "OK Nabu".
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
