---
title: "Customize the S3-BOX-3 with your own images"
product_name: ESP32-S3-BOX-3
device_name_entry: ESP32-S3-BOX-3
---

This tutorial will show you how to replace the Home Assistant status images on the Espressif [ESP32-S3-BOX-3](https://www.espressif.com/en/news/ESP32-S3-BOX-3) by custom images.

You can either prepare your own images or use images from a community repository.

<lite-youtube videoid="HQQfaXTbhvc" videotitle="Wake word demo on $13 ATOM Echo in Home Assistant
"></lite-youtube>

## Prerequisites

- Latest version of Home Assistant, installed with the Home Assistant Operating System
- [Home Assistant Cloud](https://www.nabucasa.com) or a manually configured [Assist Pipeline](/voice_control/voice_remote_local_assistant)
- Successfully completed the [ESP32-S3-BOX-3 voice assistant](/voice_control/s3_box_voice_assistant/) tutorial

## Adopting the device in the ESPHome add-on

Before you can import new images, you need to install the ESPHome add-on and adopt the device in the add-on.

1. Make sure the ESP32-S3-BOX-3 is up and running and connected to your Wi-Fi.
2. Go to **Settings** > **Add-ons** and check if you have the **ESPHome** add-on installed.
   - If you haven't done so, install the add-on.
3. Start the add-on.
4. Once the add-on is running, select **Open web UI**.
5. In the ESPHome add-on dashboard, on the **ESP32-S3-BOX-3** card, select **Adopt**.

   ![Adopt the ESP32-S3-BOX-3 in the ESPHome add-on](/images/assist/esp32-adopt-s3.png)
6. If you like, give it a new name. Then, select **Adopt**.
   - Adopting an ESPHome device allows us to customize the existing software on the device.
   - **Result**: The status will change to **Online**.
7. Now that you have set up the ESPHome add-on, continue with one of the 2 different methods to add custom images:
   - [Using images from a community repository](#using-images-from-a-community-repository)
   - [Using your own images](#using-your-own-images)

## Option 1: Using images from a community repository

If you want new images but don't want to create your own, you can use images by the community.
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
       loading_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/loading_320_240.png
       idle_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/idle_320_240.png
       listening_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/listening_320_240.png
       thinking_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/thinking_320_240.png
       replying_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/replying_320_240.png
       error_illustration_file: https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/raw/main/frenck/illustrations/error_320_240.png
     ```

4. Save the changes and select **Install**:
   - Depending on your environment, the installation process can take a while.
![ESP32-S3-BOX-3 config file](/images/assist/esp32-s3-config-05.png)
   
5. Once the installation is complete, you can see the new image on the ESP32-S3-BOX-3.
   - Now, speak a command to test the new setting. For example, *OK Nabu turn off the living room lights*.

## Option 2: Using your own images

There are 2 parts to this:

- [Preparing your own images](#to-prepare-your-own-images)
- [Adding your images to the configuration](#to-add-your-images-to-the-configuration)

### About the images

Here's what you need to know so that the images can be displayed properly on the ESP32-S3-BOX-3 screen.

#### Illustrating 6 different states

There are 6 different states to illustrate:

- loading, idle, listening, thinking, replying, error

![ESP32-S3-BOX-3 config file](/images/assist/s3-box-status-images.png)

#### Using light and dark image background

To make it easier to distinguish the different states when you look at your screen, change the background depending on the state:

- For loading and idle: use a dark background
- For the listening, thinking, replying: use a light background
- For error: As you like
  
If your images have transparency, you change the background in the configuration file. 

#### Image dimensions and file format

- **Dimensions**: The screen is 320 x 240 pixels. If the image you provide is not in a 4:3 ratio, the background color will be shown in the remaining area.
- **File format**: png or jpeg

### To prepare your own images

1. Create your own images according the specifications defined [above](#about-the-images).
2. Copy all 6 images into a folder. For example: `voice_assistant_pictures`.
3. Make sure you have [access to your configuration files](/common-tasks/os/#configuring-access-to-files).
   - [Install the Samba add-on](/common-tasks/os/#installing-and-using-the-samba-add-on).
   - This allows you to copy paste multiple files at once.
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
     loading_illustration_file: /config/esphome/voice_assistant_pictures/loading_320_240.png
     idle_illustration_file: /config/esphome/voice_assistant_pictures/idle_320_240.png
     listening_illustration_file: /config/esphome/voice_assistant_pictures/listening_320_240.png
     thinking_illustration_file: /config/esphome/voice_assistant_pictures/thinking_320_240.png
     replying_illustration_file: /config/esphome/voice_assistant_pictures/replying_320_240.png
     error_illustration_file: /config/esphome/voice_assistant_pictures/error_320_240.png
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
   - Now, speak a command to test the new setting. For example, *OK Nabu turn on the light*.

## Related topics

- [Community image repository](https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/tree/main)
- [Home Assistant Cloud](https://www.nabucasa.com)
- [Assist Pipeline](/voice_control/voice_remote_local_assistant)
- [ESP32-S3-BOX-3 voice assistant](/voice_control/s3_box_voice_assistant/)
- [General troubleshooting section for Assist](/voice_control/troubleshooting/)
- [Access to your configuration files](/common-tasks/os/#configuring-access-to-files)
