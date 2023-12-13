---
title: "Customize the S3-BOX-3 with your own illustrations"
product_name: ESP32-S3-BOX-3
device_name_entry: ESP32-S3-BOX-3
---

This tutorial will show you how to replace the Home Assistant status illustrations on the Espressif [ESP32-S3-BOX-3](https://www.espressif.com/en/news/ESP32-S3-BOX-3) with your own images.

You can either prepare your own illustrations or import some from a community repository.

<lite-youtube videoid="HQQfaXTbhvc" videotitle="Okay Frenck! Open-source voice assistant running on an Espressif ESP32-S3-Box-3
"></lite-youtube>

## ESP32-S3-BOX-3 voice assistant status illustrations

The ESP32-S3-BOX-3 voice assistant has 6 illustrations to indicate its state:

<p class='img'>
  <img src='/images/assist/s3-box-status-images.png' alt='Screenshot showing energy price graph.'>
  The ESP32-S3-BOX-3 states: loading, idle, listening, thinking, replying, error.
</p>

The chart shows the default illustrations. The next steps show you how to change those.

## Prerequisites

- Latest version of Home Assistant, installed with the Home Assistant Operating System
- [Home Assistant Cloud](https://www.nabucasa.com) or a manually configured [Assist Pipeline](/voice_control/voice_remote_local_assistant)
- [ESP32-S3-BOX-3](https://www.aliexpress.us/item/1005005920207976.html?gatewayAdapt=4itemAdapt). The ESP32-S3-BOX-Lite or the ESP32-S3-BOX also work, but they are not currently on the market.
- Successfully completed the [ESP32-S3-BOX-3 voice assistant](/voice_control/s3_box_voice_assistant/) tutorial

## Adopting the device in the ESPHome add-on

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
   - [Using images from a community repository](#using-images-from-a-community-repository)
   - [Using your own images](#using-your-own-images)

## Option 1: Using images from a community repository

If you want new images but don't want to create your own, you can use images from the community.
If you want to use your own images, skip this procedure and go to [Using your own images](#using-your-own-images) instead.

### To use images from the community

1. On the **ESP32-S3-BOX-3** add-on, select edit.
   - **Result**: An editor opens, showing the configuration file.
   ![ESP32-S3-BOX-3 config file](/images/assist/esp32-adopt-s3-01.png)
2. For inspiration, we have prepared some images for you.
   - Check them out in this [repository](https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/tree/main/frenck/illustrations).
3. For this tutorial, we will use some images of Frenck.
   - Add the following lines into the `substitution` block.

     ```yaml
     substitution:
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

## Option 2: Using your own illustrations

There are 2 parts to this:

- [Preparing your own illustrations](#to-prepare-your-own-images)
- [Adding your illustrations to the configuration](#to-add-your-images-to-the-configuration)

### About the image specifications

Here's what you need to know to get the best result on your ESP32-S3-BOX-3 screen.

#### Using light and dark image background

In the [Chart](#esp32-s3-box-3-voice-assistant-status-illustrations), you can see that the default images use different background colors. This is to make it easier to recognize a state change when you look at your screen.

In your images, you could use 2 different background colors:

- For loading and idle: use a dark background
- For listening, thinking, and replying: use a light background
- For error: As you like
  
If your images have transparency, you can define the background color in the configuration. The procedure below shows how to change the background.

#### Image dimensions and file format

- **Dimensions**: The screen is 320 x 240 pixels. If the image you provide is not in a 4:3 ratio, the background color will be shown in the remaining area.
- **File format**: PNG, JPEG, or SVG

### To prepare your own images

1. Create your own images according to the specifications defined in the section [About the image specifications](#about-the-image-specifications).
   - You could even draw your own! 
   - There's a [template for it](#to-draw-your-own-images).
2. Copy all 6 images into a folder. For example: `voice_assistant_gfx`.
3. Make sure you have [access to your configuration files](/common-tasks/os/#configuring-access-to-files).
   - [Install the Samba add-on](/common-tasks/os/#installing-and-using-the-samba-add-on).
   - This allows you to copy multiple files at once.
4. Copy your image folder into the configuration folder:
   - Open the `config` folder and open the `ESPHome` folder.
   - Copy your image folder in there.
   ![ESP32-S3-BOX-3 config file](/images/assist/s32-s3-add-image-folder.png)

### To add your images to the configuration

1. In Home Assistant, go to [**Settings** > **Add-ons** > **ESPHome**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome), and **Open Web UI**.
2. On the **ESP32-S3-BOX-3** add-on, select edit.
   - **Result**: An editor opens, showing the configuration file.
   ![ESP32-S3-BOX-3 config file](/images/assist/esp32-adopt-s3-01.png)

3. To add your images, add the following lines into the `substitution` block.

   ```yaml
   substitution:
     loading_illustration_file: voice_assistant_gfx/loading.png
     idle_illustration_file: voice_assistant_gfx/idle.png
     listening_illustration_file: voice_assistant_gfx/listening.png
     thinking_illustration_file: voice_assistant_gfx/thinking.png
     replying_illustration_file: voice_assistant_gfx/replying.png
     error_illustration_file: voice_assistant_gfx/error.png
   ```

4. If you used transparency in your images and you want to change the background color, add the following lines into the `substitution` block:
   - The `000000` stands for black, `FFFFFF` stands for white in [hexadecimal color code](https://www.w3schools.com/html/html_colors_hex.asp).
   - If you want to use different colors, replace the corresponding color code.
   - To find the color code, you can use a tool like the Google color picker.

     ```yaml
     substitution:
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

## Related topics

- [Community image repository](https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/tree/main)
- [Home Assistant Cloud](https://www.nabucasa.com)
- [Assist Pipeline](/voice_control/voice_remote_local_assistant)
- [ESP32-S3-BOX-3 voice assistant](/voice_control/s3_box_voice_assistant/)
- [General troubleshooting section for Assist](/voice_control/troubleshooting/)
- [Access to your configuration files](/common-tasks/os/#configuring-access-to-files)
