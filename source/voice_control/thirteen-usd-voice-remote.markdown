---
title: "$13 voice assistant for Home Assistant"
---

This tutorial will guide you to turn an ATOM Echo into the
world's most private voice assistant. Pick up the tiny device to talk to
your smart home. Issue commands and get responses!

<lite-youtube videoid="ziebKt4XLZQ" videotitle="Wake word demo on $13 ATOM Echo in Home Assistant
"></lite-youtube>

## Prerequisites

- Home Assistant 2023.10, installed with the Home Assistant Operating System
- [Home Assistant Cloud](https://www.nabucasa.com) or a manually configured [Assist Pipeline](/voice_control/voice_remote_local_assistant)
- The password to your 2.4&nbsp;GHz Wi-Fi network
- Chrome (or a Chromium-based browser like Edge) on desktop (not Android/iOS)
- [M5Stack ATOM Echo Development Kit](https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit?ref=NabuCasa)
- USB-C cable to connect the ATOM Echo

## Adding a wake word to your voice assistant

1. Install the openWakeWord add-on:
   - Follow steps 1-3 of the procedure on [enabling a wake word](/voice_control/install_wake_word_add_on). 
2. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %} and select **Add assistant**.
3. Give your assistant a name, for example the wake word you are going to use.
4. Select the language you are going to use to speak to Home Assistant.
   - If the **Text-to-speech** and **Speech-to-text** sections do not provide language selectors, this means you do not have an Assist pipeline set up.
   - Set up [Home Assistant Cloud](https://www.nabucasa.com) or a manually configured [Assist pipeline](/voice_control/voice_remote_local_assistant).
5. Under **Text-to-speech**, select the language and voice you want Home Assistant to use when speaking to you.
6. To define the wake word engine, under **Wake word**, select **openWakeWord**.
   - Then, select **ok nabu**.
   - If you created a new assistant, select **Create**.
   - If you edited an existing assistant, select **Update**.
   - **Result**: You now have a voice assistant that listens to a wake word.
7. For the first run, it is recommended to use **ok nabu**, just to test the setup.
   - Once you have it all set up, you can [create your own wake words](/voice_control/create_wake_word/).

## Installing the software onto the ATOM Echo

If you have used the ATOM Echo on Home Assistant before and have it installed via ESPHome add-on, you first need to remove its configuration.

### To delete the ATOM Echo configuration from ESPHome

1. Go to {% my integrations title="**Settings** > **Devices & Services**" %}, and select the ESPHome integration.
   - Under **Devices**, next to the **M5Stack Atom Echo a61920** entry, select the three-dots menu.
   - Select **Delete**.
2. Make sure you have [access to the configuration files](/common-tasks/os/#configuring-access-to-files).
   - If you have never done this before, [install the file editor add-on](/common-tasks/os/#installing-and-using-the-file-editor-add-on).
3. Access the config files and open the **esphome** folder.
4. If there is a configuration file for the ATOM Echo, delete it.

### To install the software on your ATOM Echo

Before you can use this device with Home Assistant, you need to install a bit of software on it.

1. Make sure this page is opened in a Chromium-based browser on a desktop. It does not work on a tablet or phone.
   - Select the **Connect** button below. If your browser does not support web serial, you will see a warning instead of a button.

      <script type="module" src="https://unpkg.com/esp-web-tools@9/dist/web/install-button.js?module"></script>
      <esp-web-install-button manifest="https://firmware.esphome.io/voice-assistant/m5stack-atom-echo/manifest.json"></esp-web-install-button>
   - **For advanced users**: The configuration file is available on [GitHub](https://github.com/esphome/firmware/blob/main/voice-assistant/m5stack-atom-echo.yaml).

2. Connect the ATOM Echo to your computer.
   - In the pop-up window, view the available ports.
   - Plug the USB-C cable into the ATOM Echo and connect it to your computer.
   - In the pop-up window, there should now appear a new entry. Select this USB serial port and select **Connect**.
     - Depending on your computer, the entry might look different.
   ![Select USB port](/images/assist/esp32-atom-flash-select-port.png)
   - If no new port shows, your system may be missing a driver. Close the pop-up window.
     - In the dialog, select the CH342 driver, install it, then **Try again**.
   ![Open My link](/images/assist/esp32-atom-flash-no-port.png)
3. Select **Install Voice Assistant**, then **Install**.
     - Follow the instructions provided by the installation wizard.
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
6. If, at this stage, a dialog opens, prompting you to enter the connection settings of your ESPHome node, it means there is already a configuration set up for that ESPHome device.
   - Close the dialog and perform the procedure on [deleting the ATOM Echo configuration from ESPHome](/voice_control/thirteen-usd-voice-remote/#to-delete-the-atom-echo-configuration-from-esphome).
   - Restart Home Assistant.
   - Then, under {% my integrations title="**Settings** > **Devices & Services**" %}, your ATOM Echo should be discovered.
7. To add the newly discovered device, select the ATOM Echo from the list.
   - Add your ATOM Echo to a room and select **Finish**.
8. You should now see the **ESPHome** integration.
   ![New ESPHome device discovered](/images/assist/m5stack-atom-echo-discovered-33.png)
9.  Select the **ESPHome** integration. Under **Devices**, you should see the **M5Stack Atom Echo** listed.
   ![ATOM Echo discovered](/images/assist/m5stack-atom-echo-discovered-new-03.png)
   - Your ATOM Echo is connected to Home Assistant over Wi-Fi. You can now move it to any place in your home with a USB power supply.
10. Congratulations! You can now voice control Home Assistant using a button with a built-in microphone. Now give some commands.

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
   - Adjust the silence detection settings. This setting defines how much silence is needed for Assist to find you're done speaking and it can start processing your command.
   - Go to {% my integrations title="**Settings** > **Devices & Services**" %} and select the **ESPHome** integration.
   - Under **M5Stack ATOM Echo**, select **1 device**.
   ![Open My link](/images/assist/esp32-atom_silence_detection_01.png)

## Disabling wake word and use push-to-talk

1. If you do not want to use a wake word, but prefer to use the microphone by pressing a button, you can disable the wake word.
2. Go to {% my integrations title="**Settings** > **Devices & Services**" %} and select the **ESPHome** integration.
   - Under **M5Stack ATOM Echo**, select **1 device**.
3. Disable **Use wake word**.
   
   ![Toggle to enable/disable wake word](/images/assist/wake_word_disable_on_atom_echo.png)
4. To start using push-to-talk, press the flat button with rounded shape on your ATOM Echo.
   - The rectangular button on the side is the reset button. Do not press that one.
   - As soon as you press the button, the LED will start blinking in blue. If it does not light up, press again.
   - While you are speaking, the blue LED is pulsing.
   - Once the intent has been processed, the LED lights up in green and Home Assistant confirms the action.

## Troubleshooting

Are things not working as expected?

- Checkout the [general troubleshooting section for Assist](/voice_control/troubleshooting/).
- You think there is a problem with noise or volume? Checkout the procedure below.

### Tweaking the ATOM Echo configuration

1. Make sure you have [access to your configuration files](/common-tasks/os/#configuring-access-to-files).
2. Edit the general configuration:
   - Access the `config` folder and open the `configuration.yaml` file.
   - Enter the following text:
      ```yaml
      assist_pipeline:
         debug_recording_dir: /share/assist_pipeline
      ```
3. Save the changes and restart Home Assistant.
4. Make sure you have the [Samba add-on installed](/common-tasks/os/#configuring-access-to-files).
5. On your computer, access your Home Assistant server via Samba.
   - Navigate to `/share/assist_pipeline`.
   - For each voice command you gave, you will find a subfolder with the audio file in `.wav` format.
6. Listen to the audio file of interest.
7. Adjust noise suppression and volume, if needed:
   - Access the `config` folder and open the `esphome/m5stack-atom-echo-wake-word.yaml` file.
   - Find the `voice_assistant` section.
   - If the audio is too noisy, increase the `noise_suppression_level` (max.&nbsp;4).
   - If the audio is too quiet, increase either the `auto_gain` (max.&nbsp;31) or the `volume_multiplier` (no maximum, but a too high value will cause distortion eventually).
8. Collecting the debug recordings impacts your disk space.
   - Once you have found a configuration that works, delete the folder with the audio files.
   - In the `configuration.yaml` file, delete the `assist_pipeline entry` and restart Home Assistant.

## Related topics

- [Create your own wake words](/voice_control/create_wake_word/)
- [General troubleshooting section for Assist](/voice_control/troubleshooting/)
- [Access to your configuration files](/common-tasks/os/#configuring-access-to-files)
- [Using a sentence trigger](/voice_control/custom_sentences/)
