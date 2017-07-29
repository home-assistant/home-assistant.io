---
layout: page
title: "Installing Hassbian"
description: "Instructions to flash the Home Assistant HASSbian image on a Raspberry Pi."
date: 2016-09-26 21:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /docs/hassbian/installation/
---

The easiest way to install Home Assistant on your Raspberry Pi is by using HASSbian: a Raspberry Pi image with Home Assistant built-in. The image will install the latest version of Home Assistant on initial boot (~10 minutes).

 1. [Download the Hassbian image][image-download] (364 MB)
 2. Use [Etcher][etcher] to flash the image to your SD card
 3. Ensure your Raspberry Pi has wired access to the internet for the entire process or configure your wireless network (details below).
 4. Insert SD card to Raspberry Pi and turn it on. Initial installation of Home Assistant will take about 5 minutes.

These instructions are also available as a [video](https://www.youtube.com/watch?v=iIz6XqDwHEk).  Additional information is available in this [video](https://www.youtube.com/watch?v=tCGlQSsQ-Mc).

After initial boot an installer will run in the background and takes around 15 minutes to complete, after it has finished you can reach Home Assistant in your browser at [http://hassbian.local:8123]. If you want to login via SSH, the default username is `pi` and password is `raspberry` (please change this by running `passwd`). The Home Assistant configuration is located at `/home/homeassistant/.homeassistant/`.

If you find that the web page is not reachable after 30 minutes or so, check that you have files in `/home/homeassistant/.homeassistant/`, if there are no files in this location then run the installer manually using this command: `sudo systemctl start install_homeassistant.service`.


The following extras are included on the image:

 - GPIO pins are ready to use.
 - Bluetooth is ready to use (supported models only, no Bluetooth LE).
 - SSH server is enabled.
 - A tool called `hassbian-config`. 

### {% linkable_title Wireless Network %}

After flashing the image to your SD Card open the partition `boot` and create a new file `wpa_supplicant.conf`. Edit the file and enter your network credentials. For more information visit [Setting up Wifi for Raspbian][wifi-setup]. During start the file will automatically be copied in the right folder and the network connection will be established. The file could look like this:

```conf
network={
    ssid="YOUR_SSID"
    psk="YOUR_PASSWORD"
}
```

### {% linkable_title Technical Details %}

 - Home Assistant is installed in a virtual Python environment at `/srv/homeassistant/`
 - Home Assistant will be started as a service run by the user `homeassistant`
 - The configuration is located at `/home/homeassistant/.homeassistant`

[image-download]: https://github.com/home-assistant/pi-gen/releases/latest
[etcher]: https://etcher.io/
[http://hassbian.local:8123]: http://hassbian.local:8123
[wifi-setup]: https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md

