---
title: "Wake words for Assist"
related:
  - docs: /voice_control/thirteen-usd-voice-remote/
    title: $13 voice assistant for Home Assistant
  - docs: /voice_control/custom_sentences/
    title: Custom Sentences
  - docs: /common-tasks/os/#configuring-access-to-files
    title: Installing the Samba add-on
  - docs: /voice_control/about_wake_word/
    title: About wake words
  - url: https://colab.research.google.com/drive/1q1oe2zOyZp7UsB3jJiQ1IFn8z5YfjwEb?usp=sharing#scrollTo=1cbqBebHXjFD
    title: Wake word training environment
  - url: https://github.com/dscripka/openWakeWord
    title: openWakeWord
---

Wake words are special words or phrases that tell a voice assistant that a command is about to be spoken. The device then switches from passive to active listening. Examples are: Hey Google, Hey Siri, or Alexa. Home Assistant supports its own wake words, such as Hey Nabu.

If you want to know more about this topic check [the Home Assistant approach to wake words](/voice_control/about_wake_word/).

## Enabling a wake word

This tutorial shows how you can *enable* a wake word in Home Assistant. It does not describe how to *use* it. 

To *use* the wake word, you need some extra hardware. A low cost option is the [M5Stack ATOM Echo Development Kit](https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit?ref=NabuCasa). To set that up, follow the [$13 voice assistant for Home Assistant](/voice_control/thirteen-usd-voice-remote/).

Enabling a wake word consists of 2 steps:

1. Installing the openWakeWord add-on.
2. Enabling the wake word for a specific voice assistant.

### Prerequisites

- Home Assistant version 2023.10 or later, installed with the Home Assistant Operating System
- Assist configured either with [Home Assistant Cloud](/voice_control/voice_remote_cloud_assistant/) or a manually configured [local Assist pipeline](/voice_control/voice_remote_local_assistant)
- All the [Best Practices](/voice_control/best_practices) we recommend.

### Installing the openWakeWord add-on

1. Go to {% my supervisor_addon addon="core_openwakeword" title="**Settings** > **Add-ons** > **openWakeWord**" %} and select **Install**.
2. **Start** the add-on.
3. Go to {% my integrations title="**Settings** > **Devices & Services**" %}.
   - Under **Discovered**, you should now see the **openWakeWord** component of the **Wyoming** integration.
   - Select **Configure** and **Submit**.
   - **Result**: You have successfully installed the **openWakeWord** add-on and **Wyoming** integration.

### To enable wake word for your voice assistant

1. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}
2. Choose the Assistant:
   - To enable wake word for an existing assistant, select the Assistant and continue with step 6.
   - To create a new Assistant: select **Add assistant**.
3. Give your assistant a name, for example the wake word you are going to use.
4. Select the language you are going to use to speak to Home Assistant.
   - If the **Text-to-speech** and **Speech-to-text** sections do not provide language selectors, this means you do not have an Assist pipeline set up.
   - Set up [Home Assistant Cloud](https://www.nabucasa.com) or a manually configured [Assist pipeline](/voice_control/voice_remote_local_assistant).
5. Under **Text-to-speech**, select the language and voice you want Home Assistant to use when speaking to you.
6. To define the wake word engine, in the top-right corner of the dialog, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Add streaming wake word**.
   - **Troubleshooting**: If you don't see the three dots {% icon "mdi:dots-vertical" %} menu, go to {% my integrations title="**Settings** > **Devices & Services**" %} and make sure the **openWakeWord** component of the **Wyoming** integration is added.
   - **Result**: on the bottom of the page, you now see a new section **Streaming wake word engine**.
   - Select **openwakeword**, then select **ok nabu**.
   - If you created a new assistant, select **Create**.
   - If you edited an existing assistant, select **Update**.
   - **Result**: You now have a voice assistant that listens to a wake word.
7. For the first run, it is recommended to use **ok nabu**, just to test the setup.
   - Once you have it all set up, you can create your own wake words.

## Try it! 

Right now, there are two easy options to get started using wake words:
- Follow the [guide to the $13 voice assistant](/voice_control/thirteen-usd-voice-remote/). This tutorial is using the tiny ATOM Echo, detecting wake words with openWakeWord.
- Follow the [guide to set up an ESP32-S3-BOX-3 voice assistant](/voice_control/s3_box_voice_assistant/). This tutorial is using the bigger S3-BOX-3 device which features a display. It can detect wake words using openWakeWord. But it can also do on-device wake word detection using microWakeWord.

## Creating your own wake word

You can now create your own wake word to use with Home Assistant. The procedure below will guide you to train a model. The model is trained using voice clips generated by our local neural text-to-speech system [Piper](https://github.com/rhasspy/piper).

_Want to know more about how this all works? Check out the [openWakeWord](https://github.com/dscripka/openWakeWord) project by David Scripka.)_

Depending on the word, training a model on your own wake word may take a few iterations and a bit of tweaking. This guide will take you through the process step by step.

### Prerequisites

- Latest version of Home Assistant, installed with the Home Assistant Operating System
- [M5Stack ATOM Echo Development Kit](https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit?ref=NabuCasa)
- Successfully completed the [$13 voice assistant for Home Assistant](/voice_control/thirteen-usd-voice-remote/) tutorial

### To create your own wake word

1. Think of a wake word.
   - A word or short phrase (3-4 syllables) that is not commonly used so that it does not trigger Assist by mistake.
   - Currently, only wake words in English are supported.
2. Open the [wake word training environment](https://colab.research.google.com/drive/1q1oe2zOyZp7UsB3jJiQ1IFn8z5YfjwEb?usp=sharing#scrollTo=1cbqBebHXjFD).
3. In section 1, enter your wake word in the **target_word** field.
![Enter wake word in target field](/images/assist/wake_word_enter_target_word.png)
4. In the code section next to the **target_word**, select the play button. The first time this can take up to 30 seconds.
   - If the play button does not appear, make sure your cursor is placed in the **target_word** field.
     ![Select play button](/images/assist/wake_word_press_play_button.png)
   - If it still does not show up, in the top right corner of the document, make sure it says **Connected**.
     - If it is not connected, select **Connect to a hosted runtime**.
     ![Connect to hosted runtime](/images/assist/wake_word_connect_to_hosted_runtime.png)
   - **Result**: The pronunciation of your wake word is being created.
     - Once it is finished, at the bottom of the section, you see an audio file. Listen to it.
  
     ![Listen to demo of your wake word](/images/assist/wake_word_listen_demo.png)
5. If the word does not sound correct to you:
   - Follow the instructions in the document to tweak the spelling of the word and press play again.
   - The word should sound the way you pronounce it.
6. Once you are satisfied with the result, in the menu on top of the screen, select **Runtime** > **Run all**.
   - This will take around an hour. Feel free to do something else but make sure to leave the browser tab open.
   ![Runtime: run all](/images/assist/wake_word_runtime_run_all.png)
   - **Result**: Once this process is finished, you should have 2 files in your downloads folder:
     - `.tflite` and `.onnx` files (only `.tflite` is used)

7. Congratulations! You just applied machine learning to create your own wake word model!
   - The next step is to add it to Home Assistant.

### To add your personal wake word to Home Assistant

1. Make sure you have the [Samba add-on installed](/common-tasks/os/#configuring-access-to-files).
2. On your computer, access your Home Assistant server via Samba.
   - Open the `share` folder and create a new folder `openwakeword` so that you have `/share/openwakeword`.
3. Drop your shiny new wake word model file (`.tflite`) into that folder.
4. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %}.
   - Either create a new assistant and select **Add assistant**.
   - Or, edit an existing assistant.
5. Under **Wake word**, select **openwakeword**.
   - Then, select your own personal wake word.
   - If there is no **Wake word** option, make sure you have the add-on installed and successfully completed the [$13 voice assistant for Home Assistant](/voice_control/thirteen-usd-voice-remote/) tutorial.
6. Enable this new assistant on your ATOM Echo device.
   - Go to {% my integrations title="**Settings** > **Devices & Services**" %} and select the **ESPHome** integration.
      - Under **M5Stack ATOM Echo**, select **1 device**.
   - Under **Configuration**, make sure **Use wake word** is enabled.
   - Select the assistant with your wake word.

     ![Select the assistant with your wake word](/images/assist/wake_word_select_assistant.png)
7. Test your new wake word.
   - Speak your wake word followed by a command, such as "Turn on the lights in the kitchen".
   - When the ATOM Echo picks up the wake word, it starts blinking blue.

## Troubleshooting

### Troubleshooting wake word recognition

1. If the ATOM Echo does not start blinking blue when you say the wake word, there are a few things you can try.
2. Go to {% my integrations title="**Settings** > **Devices & Services**" %} and select the **ESPHome** integration.
   - Under **M5Stack ATOM Echo**, select **1 device**.
   - Under **Controls**, make sure **Use wake word** is enabled.
3. If this was not the issue, you may need to tweak the wake word model.
     - Go back to the [wake word training environment](https://colab.research.google.com/drive/1q1oe2zOyZp7UsB3jJiQ1IFn8z5YfjwEb?usp=sharing#scrollTo=1cbqBebHXjFD).
     - In section 3 of the document, follow the instructions on tweaking the settings and create a new model.

### Troubleshooting performance issues of the training environment

The environment on the Colab space runs on resources offered by Google. They are intended for small-scale, non-commercial personal use. There is no guarantee that resources are available.
If many people use this environment at the same time or if the request itself uses a lot of resources, the execution might be very slow or won't run at all.

It may take 30-60 minutes for the run to complete. This is expected behavior.

Things you can try if the execution is very slow:

1. Free of charge solution: This environment has worked for all the wake word models that were trained to create and test this procedure. There is a good chance that it will work for you. If it does not, try training your model another time. Maybe many people are using it right now.
2. You can pay for more computing resources: In the top right corner, select the RAM | Disk icon.
   - Select the link to **Upgrade to Colab Pro**.
   - Select your price plan and follow the instructions on screen.
   ![Connect to hosted runtime](/images/assist/wake_word_upgrade_to_colab.png)
