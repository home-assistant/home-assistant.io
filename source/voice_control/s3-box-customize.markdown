---
title: "Customize the S3-BOX with your own images"
product_name: ESP32-S3-BOX
device_name_entry: ESP32-S3-BOX
config_link: /voice_control/thirteen-usd-voice-remote/#to-delete-the-atom-echo-configuration-from-esphome
---

This tutorial will show you how to replace the Home Assistant status images on the ESP32-S3-BOX by custom images. 

You can either prepare your own images or use images from a community repository.
It applies to the following three ESP32 devices by Espressif:

- [ESP32-S3-BOX](https://www.espressif.com/en/news/ESP32-S3-BOX_video)
- [ESP32-S3-BOX-3](https://www.espressif.com/en/news/ESP32-S3-BOX-3)
- [ESP32-S3-BOX-Lite](https://www.espressif.com/en/news/ESP32-S3-BOX_video)

The steps are the same for all three product variants. The term *ESP32-S3-BOX* is used to refer to all three variants.

## Prerequisites

- Latest version of Home Assistant, installed with the Home Assistant Operating System
- [Home Assistant Cloud](https://www.nabucasa.com) or a manually configured [Assist Pipeline](/voice_control/voice_remote_local_assistant)
- Successfully completed the [ESP32-S3-BOX voice assistant](/voice_control/s3_box_voice_assistant/) tutorial

## Adopting the device in the ESPHome add-on

Before you can import new images, you need to install the ESPHome add-on and adopt the device in the add-on.

1. Make sure the ESP32-S3-BOX is up and running and connected to your Wi-Fi.
2. Go to **Settings** > **Add-ons** and check if you have the **ESPHome** add-on installed.
   - If you haven't done so, install the add-on.
3. Start the add-on.
4. Once the add-on is running, select **Open web UI**.
5. In the ESPHome add-on dashboard, on the **ESP32-S3-BOX** card, select **Adopt**.
   ![Adopt the ESP32-S3-BOX in the ESPHome add-on](/images/assist/esp32-adopt-s3.png)
6. If you like, give it a new name. Then, select **Adopt**.
7. Copy the encryption key and store it in a safe place.
   - It will also be available within the UI, but it is always good to keep a copy.
   - **Result**: Once you copied the key, the status will change to **Online**.
8. Now that you have set up the ESPHome add-on, continue with one of the 2 different methods to add custom images:
   - [Using images from a community repository](#using-images-from-a-community-repository)
   - [Using your own images](#using-your-own-images)

## Using images from a community repository

- Perform this procedure, if you want to use ready-made images by the community.
- If you want to use your own images, skip this procedure and go to [Using your own images](#using-your-own-images) instead.

**Duration**: about 30 minutes

### To use images from the community

1. On the **ESP32-S3-BOX** add-on, select edit.
   - **Result**: An editor opens, showing the configuration file.
   ![ESP32-S3-BOX config file](/images/assist/esp32-adopt-s3-01.png)
2. For inspiration, we have prepared some images for you.
   - Check them out in this [repository](https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/tree/main).
3. For this tutorial, we will use some images of Frenck.
   - Add the following lines into the `substitution` block.
    
   {% raw %}
     ```yaml
      loading_illustration_file: https://raw.githubusercontent.com/jlpouffier/home-assistant-s3-box-community-illustrations/main/frenck/illustrations/loading_320_240.png
      idle_illustration_file: https://raw.githubusercontent.com/jlpouffier/home-assistant-s3-box-community-illustrations/main/frenck/illustrations/idle_320_240.png
      listening_illustration_file: https://raw.githubusercontent.com/jlpouffier/home-assistant-s3-box-community-illustrations/main/frenck/illustrations/listening_320_240.png
      thinking_illustration_file: https://raw.githubusercontent.com/jlpouffier/home-assistant-s3-box-community-illustrations/main/frenck/illustrations/thinking_320_240.png
      replying_illustration_file: https://raw.githubusercontent.com/jlpouffier/home-assistant-s3-box-community-illustrations/main/frenck/illustrations/replying_320_240.png
      error_illustration_file: https://raw.githubusercontent.com/jlpouffier/home-assistant-s3-box-community-illustrations/main/frenck/illustrations/error_320_240.png
    ```
   {% endraw %}
4. Save the changes and select **Install**:
   - Depending on your environment, the installation process can take a while.
   - Expect this to take about 25 minutes. The code needs to be compiled before it can be installed.
![ESP32-S3-BOX config file](/images/assist/esp32-s3-config-05.png)
   
5. Once the installation is complete, you can see the new image on the S3-BOX.
   - Reboot the device.
   - Now, speak a command to test the new setting. For example, *OK Nabu turn on the light*.

## Using your own images

Perform this task if you want to use your own images on the S32-S3-BOX.

This task consist of 2 procedures:
- [Preparing your own images](#to-prepare-your-own-images)
- [Adding your images to the configuration](#to-add-your-images-to-the-configuration)
  
**Duration**: ca. 35 minutes, without counting the time to create the images.

### About the images

To make sure the images can be displayed properly on the S3-BOX screen, check out the following requirements.

#### Illustrating 6 different states

There are 6 different states to illustrate:

- loading
- idle
- listening
- thinking
- replying
- error

#### Using light and dark image background

To make it easier to distinguish the different states when you look at your screen, change the background depending on the state:

- For loading and idle: use a dark background
- For the listening, thinking, replying: use a light background
- For error: As you like
  
You can also save the images with transparent background and then change the background in the configuration file.

#### Image dimensions and file format

- **Screen dimensions**: 320 x 240 pixels
- **File format**: png

### To prepare your own images

1. Create your own images according the specifications defined [above](#about-the-images).
2. Paste all 6 images into a folder. For example: `frenck`.
3. Make sure you have [access to your configuration files](/common-tasks/os/#configuring-access-to-files).
   - [Install the Samba add-on](/common-tasks/os/#installing-and-using-the-samba-add-on).
   - Samba allows you to copy paste multiple files at once.
4. Paste your image folder into the configuration folder:
   - Using Samba, open the `config` folder and open the `ESPHome` folder.
   - Paste your image folder in there.
   ![ESP32-S3-BOX config file](/images/assist/s32-s3-add-image-folder.png)

### To add your images to the configuration

1. Go to **Settings** > **Add-ons**, select the **ESPHome** add-on and **Open Web UI**.
2. On the **ESP32-S3-BOX** add-on, select edit.
   - **Result**: An editor opens, showing the configuration file.
   ![ESP32-S3-BOX config file](/images/assist/esp32-adopt-s3-01.png)

3. For this tutorial, we will use some images of Frenck.
   - To add your images, add the following lines into the `substitution` block.
    {% raw %}
     ```yaml
      loading_illustration_file: /config/esphome/frenck/loading_320_240.png
      idle_illustration_file: /config/esphome/frenck/idle_320_240.png
      listening_illustration_file: /config/esphome/frenck/listening_320_240.png
      thinking_illustration_file: /config/esphome/frenck/thinking_320_240.png
      replying_illustration_file: /config/esphome/frenck/replying_320_240.png
      error_illustration_file: /config/esphome/frenck/error_320_240.png
    ```
    {% endraw %}
4. If you used transparency in your images and you want to change the background color, add the following lines:
   - The default is black and white.
   - If you want to use different colors, replace the corresponding hexadecimal color code.
     {% raw %}
     ```yaml      
      loading_illustration_background_color: '000000'
      idle_illustration_background_color: '000000'
      listening_illustration_background_color: 'FFFFFF'
      thinking_illustration_background_color: 'FFFFFF'
      replying_illustration_background_color: 'FFFFFF'
      error_illustration_background_color: '000000'
      ```
   {% endraw %}
5. Save the changes and select **Install**.
   ![ESP32-S3-BOX config file](/images/assist/s32-s3-add-image-config-02.png)
6. Save the changes and restart Home Assistant.
   - Depending on your environment, the installation process can take a while.
   - Expect this to take about 25 minutes. The code needs to be compiled before it can be installed.
7. Once the installation is complete, you can see the new image on the S3-BOX.
   - Reboot the device.
   - Now, speak a command to test the new setting. For example, *OK Nabu turn on the light*.

## Related topics

- [Community image repository](https://github.com/jlpouffier/home-assistant-s3-box-community-illustrations/tree/main)
- [Home Assistant Cloud](https://www.nabucasa.com)
- [Assist Pipeline](/voice_control/voice_remote_local_assistant)
- [ESP32-S3-BOX voice assistant](/voice_control/s3_box_voice_assistant/)
- [General troubleshooting section for Assist](/voice_control/troubleshooting/)
- [Access to your configuration files](/common-tasks/os/#configuring-access-to-files)
