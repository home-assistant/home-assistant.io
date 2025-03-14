---
title: "Raspberry Pi"
description: "Install Home Assistant on a Raspberry Pi"
installation_type: raspberrypi
---
{% comment %}
Included section for this page is located under source/_includes/installation
{% endcomment %}

{% assign board = "Raspberry Pi" %}
{% assign installation_media = "SD card" %}

## Suggested hardware

We will need a few things to get started with installing Home Assistant.

- [Raspberry Pi 5](https://amzn.to/3UH6TcD) or [Raspberry Pi 4](https://amzn.to/2S0Gcl1) with [power supply](https://amzn.to/2ReZ2Vq) (Raspberry Pi 3 Model B is ok to get started, but the Model A does not have enough RAM).
- [Micro SD Card](https://amzn.to/2X0Z2di).
  - Ideally get one that is [Application Class 2](https://www.sdcard.org/developers/overview/application/index.html). Check for the label **A2** on the card. Application Class 2 cards perform better especially on small read and write operations and are better suited to host applications.
  - Make sure to use a card that provides at least 32&nbsp;GB.
- SD Card reader. This is already part of most laptops, but you can purchase a [standalone USB adapter](https://amzn.to/2WWxntY) if you don't have one. The brand doesn't matter, just pick the cheapest.
- [Ethernet cable](https://amzn.com/dp/B00N2VISLW). Required for installation. After installation, Home Assistant can work with Wi-Fi, but an Ethernet connection is more reliable and highly recommended.

{% note %}
Remember to ensure you're using an [appropriate power supply](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#power-supply) with your Raspberry Pi. Mobile chargers may not be suitable, since some are designed to only provide the full power with that manufacturer's handsets. USB ports on your computer also will not supply enough power and must not be used.
{% endnote %}

## Install Home Assistant Operating System

This guide shows how to install the {% term "Home Assistant Operating System" %} onto your Raspberry Pi using Raspberry Pi Imager.

### Write the image to your SD card

1. Download and install the Raspberry Pi Imager on your computer as described under [https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/).
   - **Troubleshooting**: If Raspberry Pi Imager is not supported by your platform, you can [download the Home Assistant image](#downloading-the-home-assistant-image) and use another imaging tool, such as Balena Etcher.
2. Open the Raspberry Pi Imager and select your Raspberry Pi device.
    ![Open Raspberry Pi Imager](/images/installation/rpi_imager_start.png)
3. Choose the operating system:
   1. Select **Choose OS**.
   2. Select **Other specific-purpose OS** > **Home assistants and home automation** > **Home Assistant**.
   3. Choose the Home Assistant OS that matches your hardware (RPi&nbsp;3, RPi&nbsp;4, or RPi&nbsp;5).
    ![Choose the operating system](/images/installation/rpi-ha.webp)
4. Choose the storage:
   1. Insert the SD card into the computer. Note: the contents of the card will be overwritten.
   2. Select your SD card.
    ![Select the storage](/images/installation/rpi-select-sd-card.png)
5. Write the installer onto the SD card:
   1. To start the process, select **Next**.
   2. Wait for the Home Assistant OS to be written to the SD card.
    ![Select write](/images/installation/rpi_choose_next.png)
6. Eject the SD card.

### Start up your Raspberry Pi

1. Insert the SD card into your Raspberry Pi.
2. Plug in an Ethernet cable and make sure the Raspberry Pi is connected to the same network as your computer and is connected to the internet.
3. Connect the power supply to start up the device.

### Access Home Assistant

Within a few minutes after connecting the Raspberry Pi, you will be able to reach your new Home Assistant.

- In the browser of your desktop system, enter <a href="http://homeassistant.local:8123" target="_blank">homeassistant.local:8123</a>.

{% note %}
If you are running an older Windows version or have a stricter network configuration, you might need to access Home Assistant at <a href="http://homeassistant:8123" target="_blank">homeassistant:8123</a> or `http://X.X.X.X:8123` (replace X.X.X.X with your Raspberry Pi’s IP address).
{% endnote %}

- The time it takes for this page to become available depends on your hardware. On a Raspberry Pi 4 or 5, this page should be available within a minute.
  - If it does not show up after 5 minutes on a Pi 4 or 5, maybe the image was not written properly.
    - Try to flash the SD card again, possibly even try a different SD card.
  - If this did not help, view the console output on the Raspberry Pi.
    - To do this, connect a monitor via HDMI.

Congratulations! You finished the Raspberry Pi setup!

### Downloading the Home Assistant image

If Raspberry Pi Imager is not supported by your platform, you can download the Home Assistant image and use another imaging tool, such as Balena Etcher.

To download the image to your computer, copy the correct URL for the Raspberry Pi 3, 4 or 5 (Note: there are 3 different links below!):

{% tabbed_block %}
{% for variant in site.installation.types[page.installation_type].variants %}

- title: {{ variant.name }}
  content: |

    ```text
    https://github.com/home-assistant/operating-system/releases/download/{{site.data.version_data.hassos[variant.key]}}/haos_{{ variant.key }}-{{site.data.version_data.hassos[variant.key]}}.img.xz
    ```    

{% endfor %}
{% endtabbed_block %}

{% include installation_survey.html %}

With the Home Assistant Operating System installed and accessible, you can now continue with onboarding.

{% include getting-started/next_step.html step="Onboarding" link="/getting-started/onboarding/" %}


<div style="margin-top:50px">
<p>
    <i>We get commissions for purchases made through links in this post.</i></p>
</div>
