---
layout: page
title: "Installing Hass.io"
description: "Instructions on how to install Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

The following will take you through the steps required to install Hass.io.

1. Download the appropriate install option:

   - As an image for your device:
  
     - [Raspberry Pi Zero][pi1]
     - [Raspberry Pi Zero W][pi0-w]
     - [Raspberry Pi 1 Model B][pi1]
     - [Raspberry Pi 2 Model B][pi2]
     - [Raspberry Pi 3 Model B and B+ 32bit][pi3-32] (recommended)
     - [Raspberry Pi 3 Model B and B+ 64bit][pi3-64]
     - [Tinkerboard (Beta)][tinker]
     - [Odroid-C2 (Beta)][odroid-c2]
     - [OrangePi-Prime (Beta)][opi-prime]
     - [Intel-Nuc (Beta)][intel-nuc]
    
   - As a virtual appliance: 
  
     - [VMDK][vmdk] (VMWare Workstation)
     - [VHDX (beta)][vhdx]
     - [VDI (beta)][vdi]
     - [OVA][Virtual Appliance] (not available at this time!)
    
2. Install Hass.io:

   - Flash the downloaded image to an SD card using [Etcher][etcher]. We recommend at least a 32 GB SD card to avoid running out of space.
   - Load the appliance image into your virtual machine software.

3. Optional - set up the WiFi or static IP: On a USB stick, create the `network/my-network` file and follow the [HassOS howto][hassos-network].

4. For image-based installs insert the SD card (and optional USB stick) into the device.

5. Turn on your device or virtual appliance. On first boot, it downloads the latest version of Home Assistant which takes around 20 minutes (slower/faster depending on the platform and your Internet connection).

   <img src='/images/hassio/screenshots/first-start.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 12px;' width='150' />

6. You will be able to reach your installation at [http://hassio.local:8123][local] (if your router supports mDNS, otherwise see below).

7. Enable either the [Samba add-on][samba] or the [SSH add-on][ssh] to manage your configuration in `/config/` (From the UI choose **Hass.io** which is located in the sidebar).

<p class='note'>
If your router doesn't support mDNS, then you'll have to use the IP address of your Pi instead of `hassio.local`. For example, `http://192.168.0.9:8123`. You should be able to find the IP address of your Pi from the admin interface of your router.
</p>

<p class='note warning'>
If you are using a Raspberry Pi please remember to ensure you're using an [appropriate power supply][pi-power] with your Pi. Mobile chargers may not be suitable since some were only designed to provide just enough power to the device it was designed for by the manufacturer. **Do not** try to power the Pi from the USB port on a TV, computer, or similar.
</p>

Now you can [configure][configure] your install.

### {% linkable_title Migrating from a non-Hass.io install %}

If you copy over your existing Home Assistant configuration, make sure to enable the Hass.io panel by adding either `discovery:` or `hassio:` to your configuration.

## {% linkable_title Alternative: install on generic Linux server %}

For advanced users, it is also possible to try Hass.io on your [Linux server or inside a virtual machine][linux].
Examples given here are tested on Ubuntu, but the instructions should work as a guideline for installing on other Linux distrubutions.

This is the list of packages you need to have available on your system that will run Hass.io if you are using Debian/Ubuntu:

 - apparmor-utils
 - apt-transport-https
 - avahi-daemon
 - ca-certificates
 - curl
 - dbus
 - jq
 - network-manager
 - socat
 - software-properties-common

You also need to have Docker-CE installed. There are well-documented procedures for installing Docker on Ubuntu at [Docker.com](https://docs.docker.com/install/linux/docker-ce/ubuntu/), you can find installation steps for your Linux distribution in the menu on the left.

<p class='note warning'>
  Some distributions, like Ubuntu, have a `docker.io` package available. Using that packages will cause issues!
  Be sure to install the official Docker-CE from the above listed URL.
</p>

To perform the Hass.io installation, run the following commands:

```bash
sudo -i

add-apt-repository universe

apt-get update

apt-get install -y apparmor-utils apt-transport-https avahi-daemon ca-certificates curl dbus jq network-manager socat software-properties-common

curl -sL "https://raw.githubusercontent.com/home-assistant/hassio-build/master/install/hassio_install" | bash -s
```

<p class='note'>
When you use this installation method, the core SSH add-on may not function correctly. If that happens, use the community SSH add-on. Some of the documentation might not work for your installation either.
</p>

A detailed guide about running Hass.io as a virtual machine is available in the [blog][hassio-vm].

[etcher]: https://etcher.io/
[Virtual Appliance]: https://github.com/home-assistant/hassos/blob/dev/Documentation/boards/ova.md
[hassos-network]: https://github.com/home-assistant/hassos/blob/dev/Documentation/network.md
[pi0-w]: https://github.com/home-assistant/hassos/releases/download/1.13/hassos_rpi0-w-1.13.img.gz
[pi1]: https://github.com/home-assistant/hassos/releases/download/1.13/hassos_rpi-1.13.img.gz
[pi2]: https://github.com/home-assistant/hassos/releases/download/1.13/hassos_rpi2-1.13.img.gz
[pi3-32]: https://github.com/home-assistant/hassos/releases/download/1.13/hassos_rpi3-1.13.img.gz
[pi3-64]: https://github.com/home-assistant/hassos/releases/download/1.13/hassos_rpi3-64-1.13.img.gz
[tinker]: https://github.com/home-assistant/hassos/releases/download/2.5/hassos_tinker-2.5.img.gz
[odroid-c2]: https://github.com/home-assistant/hassos/releases/download/2.5/hassos_odroid-c2-2.5.img.gz
[opi-prime]: https://github.com/home-assistant/hassos/releases/download/2.5/hassos_opi-prime-2.5.img.gz
[intel-nuc]: https://github.com/home-assistant/hassos/releases/download/2.5/hassos_intel-nuc-2.5.img.gz
[vmdk]: https://github.com/home-assistant/hassos/releases/download/1.13/hassos_ova-1.13.vmdk.gz
[vhdx]: https://github.com/home-assistant/hassos/releases/download/2.5/hassos_ova-2.5.vhdx.gz
[vdi]: https://github.com/home-assistant/hassos/releases/download/2.5/hassos_ova-2.5.vdi.gz
[linux]: https://github.com/home-assistant/hassio-build/tree/master/install#install-hassio
[local]: http://hassio.local:8123
[samba]: /addons/samba/
[ssh]: /addons/ssh/
[pi-power]: https://www.raspberrypi.org/help/faqs/#powerReqs
[hassio-vm]: /blog/2017/11/29/hassio-virtual-machine/
[configure]: /getting-started/configuration/
