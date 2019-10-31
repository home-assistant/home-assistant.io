---
title: "Installing Hassbian"
description: "Instructions to flash the Home Assistant Hassbian image on a Raspberry Pi."
redirect_from: /docs/hassbian/installation/
---

One of the easiest ways to install Home Assistant on your Raspberry Pi (Zero, 2, 3, 4) is by using Hassbian, a Raspberry Pi image with Home Assistant built-in. The image will install the latest version of Home Assistant on initial boot (in about 10 minutes).

 1. [Download the latest Hassbian image][image-download]
 2. Use [balenaEtcher][balenaEtcher] to flash the image to an SD card for your Pi. We recommend at least a 32 GB SD card to avoid running out of space.
 3. Ensure your Raspberry Pi has wired access to the internet for the entire process or configure your [wireless network settings](#wireless-network) **before proceeding to step 4**.
 4. Insert the SD card into Raspberry Pi and turn it on. Initial installation of Home Assistant will take about 10 minutes.

<div class='note warning'>

Please remember to ensure you're using an [appropriate power supply](https://www.raspberrypi.org/documentation/faqs/#pi-power) with your Pi. Mobile chargers may not be suitable since some are only designed to provide just enough power to the device it was designed for by the manufacturer. **Do not** try to power the Pi from the USB port on a TV, computer, or similar.

</div>

These instructions are also available as a [video](https://www.youtube.com/watch?v=iIz6XqDwHEk).  
Additional information is available in this [video](https://www.youtube.com/watch?v=tCGlQSsQ-Mc).

After initial boot an installer will run in the background. This will download and install the newest version of [hassbian-config](https://github.com/home-assistant/hassbian-scripts) and Home Assistant, which takes around 10 minutes to complete. After it has finished, you will be prompted to login: `hassbian login:`. The default username is `pi` and the password is `raspberry`. Installation is complete at this point. 

Open a browser on a device that's connected to the same network as your Raspberry Pi and point it to Home Assistant at `http://hassbian.local:8123`. If you want to login via SSH, the default username is `pi` and password is `raspberry` (please change this by running `passwd`). The Home Assistant configuration is located at `/home/homeassistant/.homeassistant/`.

If you find that the web page is not reachable after 30 minutes or so, check that you have files in `/home/homeassistant/.homeassistant/`. If there are no files in this location then run the installer manually using this command: `sudo systemctl start install_homeassistant.service`.

The following extras are included on the image:

- GPIO pins are ready to use.
- Bluetooth is ready to use (supported models only, no Bluetooth LE).
- SSH server is enabled.
- A tool called [`hassbian-config`](https://github.com/home-assistant/hassbian-scripts#hassbian-scripts).

### Wireless Network

After flashing the image to your SD Card open the partition `boot` and create a new file `wpa_supplicant.conf`. Edit the file and enter your network credentials. For more information visit [Setting up WiFi for Raspbian][wifi-setup]. During startup the file will automatically be copied in the right folder (`/etc/wpa_supplicant/`) and the network connection will be established. The file could look like this:

```conf
country=SE
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="YOUR_SSID"
    psk="YOUR_PASSWORD"
}
```

You may need to adjust the country code depending upon where you are. A list of codes can be found [here](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).

If you are using a [hidden SSID](https://en.wikipedia.org/wiki/Network_cloaking) for your WiFi network , you must add `scan_ssid=1` to the `network` section to be able to connect.

If you are running into trouble with your WiFi connection (for [further details](https://www.raspberrypi.org/forums/viewtopic.php?t=207882)), check the output of the following command:

```bash
$ sudo rfkill list
0: phy0: Wireless LAN
Soft blocked: yes
Hard blocked: no
```

To unblock it, execute `$ sudo rfkill unblock wifi`.

### Technical Details

- Home Assistant is installed in a Python virtual environment at `/srv/homeassistant/`
- Home Assistant will be started as a service run by the user `homeassistant` (a system account with no password)
- The configuration is located at `/home/homeassistant/.homeassistant`

[image-download]: https://github.com/home-assistant/pi-gen/releases/latest
[balenaEtcher]: https://www.balena.io/etcher
[http://hassbian.local:8123]: http://hassbian.local:8123
[wifi-setup]: https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md

## Updating

The [Hassbian Scripts](https://github.com/home-assistant/hassbian-scripts) are the easiest way of updating both the host operating system, and Home Assistant:

### Updating Home Assistant

SSH to your system as the user `pi` and run:

```bash
$ sudo hassbian-config upgrade homeassistant
```

### Updating the host operating system

SSH to your system as the user `pi` and run:

```bash
$ sudo hassbian-config upgrade hassbian
```

## Run a specific version

In the event that a Home Assistant version doesn't play well with your hardware setup, you can downgrade to a previous release. For example:

```bash
$ sudo hassbian-config upgrade homeassistant=0.XX.X
```

#### Run the beta version

If you would like to test next version before it is released, you can install the beta version, for example:

```bash
$ sudo hassbian-config upgrade homeassistant --beta
```

## Run the development version

If you want to stay on the bleeding edge Home Assistant development branch, you can upgrade to `dev`.

<div class='note warning'>
  The "dev" branch is likely to be unstable. Potential consequences include loss of data and instance corruption.
</div>

For example:

```bash
$ sudo hassbian-config upgrade homeassistant --dev
```
