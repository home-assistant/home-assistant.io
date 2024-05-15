---
title: "Customize the S3-BOX-3"
product_name: ESP32-S3-BOX-3
device_name_entry: ESP32-S3-BOX-3
related:
  - docs: /voice_control/voice_remote_cloud_assistant/
    title: Home Assistant Cloud
  - docs: /voice_control/voice_remote_local_assistant
    title: Assist Pipeline
  - docs: /voice_control/s3_box_voice_assistant/
    title: ESP32-S3-BOX-3 voice assistant
  - docs: /voice_control/troubleshooting/
    title: General troubleshooting section for Assist
  - docs: /voice_control/troubleshooting_the_s3_box/
    title: Troubleshooting the ESP32-S3-BOX-3
  - docs: /common-tasks/os/#configuring-access-to-files
    title: Access to your configuration files
  - url: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/tree/main
    title: Community image repository
  - url: https://github.com/kahrendt/microWakeWord
    title: microWakeWord
---

## Customize the S3-BOX-3 with your own illustrations

This tutorial will show you how to replace the Home Assistant status illustrations on the Espressif [ESP32-S3-BOX-3](https://www.espressif.com/en/news/ESP32-S3-BOX-3) with your own images.

You can either prepare your own illustrations or import some from a community repository.

<lite-youtube videoid="HQQfaXTbhvc" videotitle="Okay Frenck! Open-source voice assistant running on an Espressif ESP32-S3-Box
"></lite-youtube>

### ESP32-S3-BOX-3 voice assistant status illustrations

The ESP32-S3-BOX-3 voice assistant has 6 illustrations to indicate its state:

<p class='img'>
  <img src='/images/assist/s3-box-status-images.png' alt='Screenshot showing energy price graph.'>
  The ESP32-S3-BOX-3 states: loading, idle, listening, thinking, replying, error.
</p>

The chart shows the default illustrations. The next steps show you how to change those.

### Prerequisites

- Latest version of Home Assistant, installed with the Home Assistant Operating System
- [Home Assistant Cloud](/voice_control/voice_remote_cloud_assistant/) or a manually configured [Assist Pipeline](/voice_control/voice_remote_local_assistant)
- [ESP32-S3-BOX-3](https://www.aliexpress.us/item/1005005920207976.html?gatewayAdapt=4itemAdapt). The ESP32-S3-BOX-Lite or the ESP32-S3-BOX also work, but they are not currently on the market.
- Successfully completed the [ESP32-S3-BOX-3 voice assistant](/voice_control/s3_box_voice_assistant/) tutorial

### Adopting the device in the ESPHome add-on

Before you can import new illustrations, you need to install the ESPHome add-on and adopt the device in the add-on.

1. Make sure the ESP32-S3-BOX-3 is up and running and connected to your Wi-Fi.
2. Go to **Settings** > **Add-ons** and check if you have the **ESPHome** add-on installed.
   - If you haven't done so, go to [**Settings** > **Add-ons** > **ESPHome**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome) to install the add-on.
3. Start the add-on and select **Open web UI**.
4. In the ESPHome add-on dashboard, on the **ESP32-S3-BOX-3** card, select **Adopt**.

   ![Adopt the ESP32-S3-BOX-3 in the ESPHome add-on](/images/assist/esp32-adopt-s3.png)
5. If you like, give it a new name. Then, select **Adopt**.
   - Adopting an ESPHome device allows us to customize the existing software.
   - **Result**: The status will change to **Online**.
6. Now that you have set up the ESPHome add-on, continue with one of the 2 different methods to add custom images:
   - [Option 1: Using images from a community repository](#option-1-using-images-from-a-community-repository)
   - [Option 2: Using your own images](#option-2-using-your-own-illustrations)

### Option 1: Using images from a community repository

If you want new images but don't want to create your own, you can use images from the community.
If you want to use your own images, skip this procedure and go to [Option 2: Using your own images](#option-2-using-your-own-illustrations) instead.

#### To use images from the community

1. On the **ESP32-S3-BOX-3** add-on, select edit.
   - **Result**: An editor opens, showing the configuration file.
   ![ESP32-S3-BOX-3 config file](/images/assist/esp32-adopt-s3-01.png)
2. For inspiration, we have prepared some images for you.
   - Check them out in this [repository](https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/tree/main/frenck/illustrations).
3. For this tutorial, we will use some images of Frenck.
   - Add the following lines into the `substitutions` block.

     ```yaml
     substitutions:
       loading_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/loading.png
       idle_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/idle.png
       listening_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/listening.png
       thinking_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/thinking.png
       replying_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/replying.png
       error_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/error.png
     ```

4. Save the changes and select **Install**:
   - Depending on your environment, the installation process can take a while.
![ESP32-S3-BOX-3 config file](/images/assist/esp32-s3-config-05.png)

5. Once the installation is complete, you can see the new image on the ESP32-S3-BOX-3.
   - Now, speak a command to test the new setting. For example, *OK Nabu, turn off the living room lights*.

### Option 2: Using your own illustrations

There are 2 parts to this:

- [Preparing your own illustrations](#to-prepare-your-own-images)
- [Adding your illustrations to the configuration](#to-add-your-images-to-the-configuration)

#### About the image specifications

Here's what you need to know to get the best result on your ESP32-S3-BOX-3 screen.

##### Using light and dark image background

In the [overview diagram](#esp32-s3-box-3-voice-assistant-status-illustrations), you can see that the default images use different background colors. This is to make it easier to recognize a state change when you look at your screen.

In your images, you could use 2 different background colors:

- For loading and idle: use a dark background
- For listening, thinking, and replying: use a light background
- For error: As you like

If your images have transparency, you can define the background color in the configuration. The procedure below shows how to change the background.

##### Image dimensions and file format

- **Dimensions**: The screen is 320 x 240 pixels. If the image you provide is not in a 4:3 ratio, the remaining area will be filled with background color.
- **File format**: PNG, JPEG, or SVG

#### To prepare your own images

1. Create your own images according to the specifications defined in the section [About the image specifications](#about-the-image-specifications).
   - You could even draw your own!
   - There's a [template](#to-draw-your-own-images) for it.
2. Copy all 6 images into a folder. For example: `voice_assistant_gfx`.
3. Make sure you have [access to your configuration files](/common-tasks/os/#configuring-access-to-files).
   - [Install the Samba add-on](/common-tasks/os/#installing-and-using-the-samba-add-on).
   - This allows you to copy multiple files at once.
4. Copy your image folder into the configuration folder:
   - Open the `config` folder and open the `ESPHome` folder.
   - Copy your image folder in there.
   ![ESP32-S3-BOX-3 config file](/images/assist/s32-s3-add-image-folder.png)

#### To add your images to the configuration

1. In Home Assistant, go to [**Settings** > **Add-ons** > **ESPHome**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome), and **Open Web UI**.
2. On the **ESP32-S3-BOX-3** add-on, select edit.
   - **Result**: An editor opens, showing the configuration file.
   ![ESP32-S3-BOX-3 config file](/images/assist/esp32-adopt-s3-01.png)

3. To add your images, add the following lines into the `substitutions` block.

   ```yaml
   substitutions:
     loading_illustration_file: voice_assistant_gfx/loading.png
     idle_illustration_file: voice_assistant_gfx/idle.png
     listening_illustration_file: voice_assistant_gfx/listening.png
     thinking_illustration_file: voice_assistant_gfx/thinking.png
     replying_illustration_file: voice_assistant_gfx/replying.png
     error_illustration_file: voice_assistant_gfx/error.png
   ```

4. If you used transparency in your images and you want to change the background color, add the following lines into the `substitutions` block:
   - The `000000` stands for black, `FFFFFF` stands for white in [hexadecimal color code](https://www.w3schools.com/html/html_colors_hex.asp).
   - If you want to use different colors, replace the corresponding color code.
   - To find the color code, you can use a tool like the Google color picker.

     ```yaml
     substitutions:
       ...
       loading_illustration_background_color: '000000'
       idle_illustration_background_color: '000000'
       listening_illustration_background_color: 'FFFFFF'
       thinking_illustration_background_color: 'FFFFFF'
       replying_illustration_background_color: 'FFFFFF'
       error_illustration_background_color: '000000'
     ```

5. Save the changes and select **Install**.
   ![ESP32-S3-BOX-3 config file](/images/assist/s32-s3-add-image-config-02.png)
6. Save the changes.
   - Depending on your environment, the installation process can take a while.
7. Once the installation is complete, you can see the new image on the S3-BOX.
   - Now, speak a command to test the new setting. For example, *OK Nabu, turn on the light*.

## To draw your own images

1. We prepared a template for you to draw your own status images.
![ESP32-S3-BOX-3 config file](/images/assist/draw_assist.png)
2. Download the file and start drawing!

      <a href="/images/assist/draw_assist.pdf" Download>
      <img width="60" src="/images/assist/download-file.png" alt="Draw Assist">
      </a>
3. When you are done:
   - Snap a picture of each.
   - [Follow these steps](#to-prepare-your-own-images) to bring them onto your Voice Assistant.

## Customizing on-device wake words (microWakeWord)

You can change the on-device wake word (microWakeWord) that is used on your S3-BOX-3.

### Prerequisites

- Home Assistant 2024.2, installed with the Home Assistant Operating System. If you do not have Home Assistant installed yet, refer to the [installation page](/installation/) for instructions.
- Successfully [installed ESPHome on the S3-BOX-3](/voice_control/s3_box_voice_assistant/)
- ESPHome 2024.2 or later
- Home Assistant server with at least 2&nbsp;GB of RAM free
  - The firmware needs to be compiled on the server before it is installed on the S3-BOX-3.
  - Compiling requires a bit of RAM.
- [On-device wake word installed](#installing-on-device-wake-words-microwakeword) on your S3-BOX-3.

*(It also works on the (now discontinued) S3-BOX and S3-BOX-Lite)*

### To customize the S3-BOX-3 with on-device wake words

1. If you haven't done so already, [adopt the device in the ESPHome add-on](#adopting-the-device-in-the-esphome-add-on).
2. In Home Assistant, go to [**Settings** > **Add-ons** > **ESPHome**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome), and **Open Web UI**.
3. On the **ESP32-S3-BOX-3** entry, select edit.
   - **Result**: An editor opens, showing the configuration file.
   ![ESP32-S3-BOX-3 config file](/images/assist/esp32-adopt-s3-01.png)

4. To change the wake word, add the following line into the `substitutions` block.
   - Instead of `okay_nabu`, you can also use `alexa` or `hey_jarvis`.

     ```yaml
     substitutions:
       ...
       micro_wake_word_model: hey_jarvis
     ```

5. Save the changes and in the top right corner, select **Install**.
   - Depending on your environment, the installation process can take a while.
   - On Home Assistant Green, for example, it takes about 45 minutes.
6. Select the **ESPHome** integration. Under **Devices**, you should see the **ESP32-S3-BOX** listed.
    - On the ESP32-S3-BOX-3 entry, select **Device** to open the device page.
    - Under **Wake word engine location**, select **On device**.

      ![ESP32-S3-BOX-3 on device wake word processing](/images/assist/wake_word_engine_location.png)

7. Now, speak a command to test the new setting. For example, *Hey Jarvis, turn on the light*.

[microWakeWord]: https://github.com/kahrendt/microWakeWord
[Kevin Ahrendt]: https://www.kevinahrendt.com/
