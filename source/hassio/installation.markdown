---
title: "Installing Hass.io"
description: "Instructions on how to install Hass.io."
---

The following will take you through the steps required to install Hass.io.

1. Download the appropriate install option:

   - As an image for your device:
  
     - [Raspberry Pi Zero][pi1] (not recommended for more than testing)
     - [Raspberry Pi Zero W][pi0-w] (not recommended for more than testing)
     - [Raspberry Pi 1 Model B][pi1] (not recommended for more than testing)
     - [Raspberry Pi 2 Model B][pi2]
     - [Raspberry Pi 3 Model B and B+ 32bit][pi3-32] (recommended)
     - [Raspberry Pi 3 Model B and B+ 64bit][pi3-64]
     - [(RC) Raspberry Pi 4 Model B 32bit][pi4-32] (recommended)
     - [(RC) Raspberry Pi 4 Model B 64bit][pi4-64]
     - [Tinkerboard][tinker]
     - [Odroid-C2][odroid-c2]
     - [Odroid-XU4][odroid-xu4]
     - [OrangePi-Prime][opi-prime]
     - [Intel-Nuc][intel-nuc]
    
   - As a virtual appliance: 
  
     - [VMDK][vmdk] (VMWare Workstation)
     - [VHDX][vhdx]
     - [VDI][vdi]
     - [OVA][Virtual Appliance] (not available at this time!)
    
2. Install Hass.io:

   - Flash the downloaded image to an SD card using [balenaEtcher][balenaEtcher]. If using a Pi we recommend at least a 32 GB SD card to avoid running out of space. On Virtual machine platforms, provide at least 32 GB of disk space for the VM.
   - Load the appliance image into your virtual machine software. Choose 64-bit Linux and UEFI boot.

3. Optional - set up the WiFi or static IP. There are two possible places for that: 
   - on a blank USB stick with a FAT32 partition having partition label `CONFIG`, while in its root directory, create the `network/my-network` file, or
   - on the Hassio SD card's first, bootable partition (labeled `hassio-boot`, might not be auto mounted in Linux) create the `CONFIG/network/my-network` file.

   For the content of this file, follow the [HassOS howto][hassos-network].

4. For image-based installs insert the SD card (and optional USB stick) into the device.

5. Turn on your device or virtual appliance. On first boot, it downloads the latest version of Home Assistant which takes around 20 minutes (slower/faster depending on the platform and your Internet connection).

   <img src='/images/hassio/screenshots/first-start.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 12px;' width='150' />

6. You will be able to reach your installation at `http://hassio.local:8123` (if your router supports mDNS, otherwise see below).

7. Enable either the [Samba add-on][samba] or the [SSH add-on][ssh] to manage your configuration in `/config/` (From the UI choose **Hass.io** which is located in the sidebar).

<div class='note'>

If your router doesn't support mDNS, then you'll have to use the IP address of your Pi instead of `hassio.local`. For example, `http://192.168.0.9:8123`. You should be able to find the IP address of your Pi from the admin interface of your router.

</div>

<div class='note warning'>

If you are using a Raspberry Pi please remember to ensure you're using an [appropriate power supply][pi-power] with your Pi. Mobile chargers may not be suitable since some were only designed to provide just enough power to the device it was designed for by the manufacturer. **Do not** try to power the Pi from the USB port on a TV, computer, or similar.

</div>

Now you can [configure][configure] your install.

## Updating a Hass.io installation

Best practice for updating a Hass.io installation:

1. Backup your installation, using the snapshot functionality Hass.io offers.
2. Check the release notes for breaking changes on [Home Assistant release notes](https://github.com/home-assistant/home-assistant/releases). Be sure to check all release notes between the version you are running and the one you are upgrading to. Use the search function in your browser (`CTRL + f`) and search for **Breaking Changes**.
3. Check your configuration using the [Check Home Assistant configuration](/addons/check_config/) add-on. 
4. If the check passes, you can safely update. If not, update your configuration accordingly.
5. Select _Dashboard_ from the _Hass.io_ menu, and then select _Update_.

## Run a specific version on Hass.io

SSH to your Hass.io system, or connect to the console, and run:

```bash
hassio ha update --version=0.XX.X
```

## Run the beta version on Hass.io

If you would like to test next release before anyone else, you can install the beta version released every two weeks:

1. Backup your installation, using the snapshot functionality Hass.io offers.
2. Check the RC release notes for breaking changes on [Home Assistant release notes](https://rc--home-assistant-docs.netlify.com/latest-release-notes/). Be sure to check all release notes between the version you are running and the one you are upgrading to. Use the search function in your browser (`CTRL + f`) and search for **Breaking Changes**.
3. Select _System_ from the _Hass.io_ menu, then select _Join Beta Channel_ under _Hass.io supervisor_, then select _Reload_.
4. Select _Dashboard_ from the _Hass.io_ menu, and then select _Update_.

## Alternative: install on a generic Linux host

For advanced users, it is also possible to try Hass.io on your [Linux server or inside a virtual machine][linux].
Examples given here are tested on Ubuntu and Arch Linux, but the instructions should work as a guideline for installing on other Linux distrubutions.

The packages you need to have available on your system that will run Hass.io may vary.

### Debian/Ubuntu

 - apparmor-utils
 - apt-transport-https
 - avahi-daemon
 - ca-certificates
 - curl
 - dbus
 - jq
 - socat
 - software-properties-common

Optional:

 - network-manager

<div class='note warning'>

   Without the NetworkManager, you will be not able to control your host network setup over the UI. The `modemmanager` package will interfere with any Z-Wave or Zigbee stick and should be removed or disabled. Failure to do so will result in random failures of those integrations. For example you can disable with `sudo systemctl disable ModemManager` and remove with `sudo apt-get purge modemmanager`

</div>

### Arch Linux

 - apparmor
 - avahi
 - ca-certificates
 - curl
 - dbus
 - docker
 - jq
 - socat

You also need to have Docker-CE installed. There are well-documented procedures for installing Docker on Ubuntu at [Docker.com](https://docs.docker.com/install/linux/docker-ce/ubuntu/), you can find installation steps for your Linux distribution in the menu on the left.

<div class='note warning'>

  Some distributions, like Ubuntu, have a `docker.io` package available. Using that packages will cause issues!
  Be sure to install the official Docker-CE from the above listed URL.
  
  Docker is not always ready with a release when a new Ubuntu version is out. Check if your version of Ubuntu is supported by docker [here](https://docs.docker.com/install/linux/docker-ce/ubuntu/).

</div>

### Preparation

To prepare your machine for the Hass.io installation, run the following commands:

For Ubuntu:

```bash
add-apt-repository universe
```

Debian/Ubuntu:

```bash
sudo -i
apt-get install software-properties-common
apt-get update
apt-get install -y apparmor-utils apt-transport-https avahi-daemon ca-certificates curl dbus jq network-manager socat
curl -fsSL get.docker.com | sh
```

The following script will then install Hass.io on a variety of operating systems and machine types.

```bash
curl -sL "https://raw.githubusercontent.com/home-assistant/hassio-installer/master/hassio_install.sh" | bash -s
```

Some installation types require flags to identify the computer type, for example, when using a Raspberry Pi 3, the flag `-- -m raspberrypi3` is required. The install script would then look like this:

```bash
curl -sL "https://raw.githubusercontent.com/home-assistant/hassio-installer/master/hassio_install.sh" | bash -s -- -m raspberrypi3
```

#### Other machine types
 
 - `intel-nuc`
 - `raspberrypi`
 - `raspberrypi2`
 - `raspberrypi3`
 - `raspberrypi3-64`
 - `odroid-c2`
 - `odroid-cu2`
 - `odroid-xu`
 - `orangepi-prime`

<div class='note'>
When you use this installation method, the core SSH add-on may not function correctly. If that happens, use the community SSH add-on. Some of the documentation might not work for your installation either.
</div>

A detailed guide about running Hass.io as a virtual machine is available in the [blog][hassio-vm].

[balenaEtcher]: https://www.balena.io/etcher
[Virtual Appliance]: https://github.com/home-assistant/hassos/blob/dev/Documentation/boards/ova.md
[hassos-network]: https://github.com/home-assistant/hassos/blob/dev/Documentation/network.md
[pi0-w]: https://github.com/home-assistant/hassos/releases/download/2.12/hassos_rpi0-w-2.12.img.gz
[pi1]: https://github.com/home-assistant/hassos/releases/download/2.12/hassos_rpi-2.12.img.gz
[pi2]: https://github.com/home-assistant/hassos/releases/download/2.12/hassos_rpi2-2.12.img.gz
[pi3-32]: https://github.com/home-assistant/hassos/releases/download/2.12/hassos_rpi3-2.12.img.gz
[pi3-64]: https://github.com/home-assistant/hassos/releases/download/2.12/hassos_rpi3-64-2.12.img.gz
[pi4-32]: https://github.com/home-assistant/hassos/releases/download/3.5/hassos_rpi4-3.5.img.gz
[pi4-64]: https://github.com/home-assistant/hassos/releases/download/3.5/hassos_rpi4-64-3.5.img.gz
[tinker]: https://github.com/home-assistant/hassos/releases/download/2.12/hassos_tinker-2.12.img.gz
[odroid-c2]: https://github.com/home-assistant/hassos/releases/download/2.12/hassos_odroid-c2-2.12.img.gz
[odroid-xu4]: https://github.com/home-assistant/hassos/releases/download/2.12/hassos_odroid-xu4-2.12.img.gz
[opi-prime]: https://github.com/home-assistant/hassos/releases/download/2.12/hassos_opi-prime-2.12.img.gz
[intel-nuc]: https://github.com/home-assistant/hassos/releases/download/2.12/hassos_intel-nuc-2.12.img.gz
[vmdk]: https://github.com/home-assistant/hassos/releases/download/2.12/hassos_ova-2.12.vmdk.gz
[vhdx]: https://github.com/home-assistant/hassos/releases/download/2.12/hassos_ova-2.12.vhdx.gz
[vdi]: https://github.com/home-assistant/hassos/releases/download/2.12/hassos_ova-2.12.vdi.gz
[linux]: https://github.com/home-assistant/hassio-installer
[local]: http://hassio.local:8123
[samba]: /addons/samba/
[ssh]: /addons/ssh/
[pi-power]: https://www.raspberrypi.org/help/faqs/#powerReqs
[hassio-vm]: /blog/2017/11/29/hassio-virtual-machine/
[configure]: /getting-started/configuration/
