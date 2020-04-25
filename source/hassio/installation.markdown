---
title: "Installing Home Assistant"
description: "Instructions on how to install Home Assistant."
---

The following will take you through the steps required to install Home Assistant.

1. Download the appropriate install option:

   - As an image for your device:

     - [Raspberry Pi 3 Model B and B+ 32bit][pi3-32] (recommended)
     - [Raspberry Pi 3 Model B and B+ 64bit][pi3-64]
     - [Raspberry Pi 4 Model B 32bit][pi4-32] (recommended)
     - [Raspberry Pi 4 Model B 64bit][pi4-64]
     - [Tinkerboard][tinker]
     - [Odroid-C2][odroid-c2]
     - [Odroid-N2 (Beta)][odroid-n2]
     - [Odroid-XU4][odroid-xu4]
     - [Intel-Nuc][intel-nuc]

   - As a virtual appliance:
  
     - [VMDK][vmdk] (VMWare Workstation)
     - [VHDX][vhdx]
     - [VDI][vdi]
     - [OVA][Virtual Appliance] (not available at this time!)

   - Not recommended Hardware:

     - [Raspberry Pi][pi1]
     - [Raspberry Pi Zero-W][pi0-w]
     - [Raspberry Pi 2][pi2]

2. Install Home Assistant:

   - Flash the downloaded image to an SD card using [balenaEtcher][balenaEtcher]. If using a Pi, we recommend at least a 32 GB SD card to avoid running out of space. On Virtual machine platforms, provide at least 32 GB of disk space for the VM.
   - Load the appliance image into your virtual machine software. Choose 64-bit Linux and UEFI boot.

3. Optional - set up the Wi-Fi or static IP. There are two possible places for that:
   - on a blank USB stick with a FAT32 partition having partition label `CONFIG`, while in its root directory, create the `network/my-network` file, or
   - on the Home Assistant SD card's first, bootable partition (labeled `hassio-boot`, might not be auto mounted in Linux) create the `CONFIG/network/my-network` file.

   For the content of this file, follow the [Home Assistant Operating System howto][hassos-network].

4. For image-based installs insert the SD card (and optional USB stick) into the device.

5. Turn on your device or virtual appliance. On first boot, it downloads the latest version of Home Assistant which takes around 20 minutes (slower/faster depending on the platform and your Internet connection).

   <img src='/images/hassio/screenshots/first-start.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 12px;' width='150' />

6. You will be able to reach your installation at `http://homeassistant.local:8123` (if your router supports mDNS, otherwise see below).

<div class='note warning'>

We used `hassio.local` in the past, if you have a system that is installed before this naming change, you might need to use `hassio.local` instead of `homeassistant.local`.

</div>

<div class='note'>

If your router doesn't support mDNS, then you'll have to use the IP address of your Pi instead of `homeassistant.local`. For example, `http://192.168.0.9:8123`. You should be able to find the IP address of your Pi from the admin interface of your router.

</div>

<div class='note warning'>

If you are using a Raspberry Pi please remember to ensure you're using an [appropriate power supply][pi-power] with your Pi. Mobile chargers may not be suitable since some were only designed to provide just enough power to the device it was designed for by the manufacturer. **Do not** try to power the Pi from the USB port on a TV, computer, or similar.

</div>

Now you can [configure][configure] your install.

## Updating a Home Assistant installation

Best practice for updating a Home Assistant installation:

1. Backup your installation, using the snapshot functionality Home Assistant offers.
2. Check the release notes for breaking changes on [Home Assistant release notes](https://github.com/home-assistant/home-assistant/releases). Be sure to check all release notes between the version you are running and the one you are upgrading to. Use the search function in your browser (`CTRL + f`) and search for **Breaking Changes**.
3. Check your configuration using the [Check Home Assistant configuration](/addons/check_config/) add-on.
4. If the check passes, you can safely update. If not, update your configuration accordingly.
5. Select _Dashboard_ from the _Supervisor_ menu, and then select _Update_.

## Run a specific version on Home Assistant

For this you would need to install the [Terminal & SSH add-on][ssh] or use the console
that is available on your device by connecting a keyboard and screen.

To install the Terminal & SSH add-on, choose **Supervisor**, which is located in the sidebar and then the add-on store.

Use the web-based terminal or SSH to your Home Assistant system, or connect to the console, and run:

```bash
ha core update --version=0.XX.X
```

## Run the beta version on Home Assistant

If you would like to test next release before anyone else, you can install the beta version released every three weeks:

1. Backup your installation, using the snapshot functionality Home Assistant offers.
2. Check the [Home Assistant Beta release notes](https://rc.home-assistant.io/latest-release-notes/) for breaking changes. Be sure to check all release notes between the version you are running and the one you are upgrading to. Use the search function in your browser (`CTRL + f`) and search for **Breaking Changes**.
3. Select _System_ tab from the _Supervisor_ menu, then select _Join Beta Channel_ under _Supervisor_, then select _Reload_.
4. Select _Dashboard_ tab from the _Supervisor_ menu, and then select _Update_.

## Alternative: install Home Assistant Supervised on a generic Linux host

You can also install Home Assistant on a Linux operating system of choice, called Home Assistant Supervised.

Home Assistant Supervised, will still give you access to most features Home Assistant has to offer, including add-ons.

<div class='note warning'>

The Supervisord system is designed to provide a full-featured environment that is comparable with Kubernetes, which is also a bad idea to run it by the side of another orchestrator on the same Host. The Supervisor is also not caring for other software they run on your Host, and it can affect things bad on both sides. You also need to know that the Home Assistant OS runs with less overhead on your Proxmox or other Hypervisor as if you install first Debian and Ubuntu. In most cases, it's not the best choice to run the Supervisord on top of a Linux, if you not 100% sure what you do. **It is not just a container inside Docker!**

</div>

### Supported systems and limitations

While Home Assistant Supervised can be run on practically any Linux systems,
the Home Assistant project limits support for this installation method.

Only the use of Debian (including Raspbian) or Ubuntu is supported. Other Linux-based system may work
but is not part of our testing and thus not supported.

Furthermore, if you choose to run Home Assistant Supervised, the operating
system of your choosing (including Debian/Ubuntu) is **your** responsibility.
Both in terms of systems upgrade and system configuration.

Customizations to your custom operating system may interfere with Home Assistant.
For that reason, please be sure you have to knowledge to manage, configure and
maintain the operating system of your choosing.

When in doubt, we highly recommend using the regular installation of Home
Assistant as provided above. In that case, Home Assistant will manage and update
the Home Assistant Operating System for you.

### Preparation

To prepare your machine for the Home Assistant installation, run the following commands:

If you run Ubuntu, first run this command:

```bash
sudo add-apt-repository universe
```

Next run the following commands (for both Debian and Ubuntu):

```bash
sudo -i
apt-get update
apt-get install -y software-properties-common apparmor-utils apt-transport-https avahi-daemon ca-certificates curl dbus jq network-manager socat
systemctl disable ModemManager
systemctl stop ModemManager
curl -fsSL get.docker.com | sh
```

### Installation of Home Assistant Supervised

The following script will then install Home Assistant on a variety of operating systems and machine types.

```bash
curl -sL "https://raw.githubusercontent.com/home-assistant/supervised-installer/master/installer.sh" | bash -s
```

Some installation types require flags to identify the computer type, for example, when using a Raspberry Pi 4, the flag `-- -m raspberrypi4` is required. The install script would then look like this:

```bash
curl -sL "https://raw.githubusercontent.com/home-assistant/supervised-installer/master/installer.sh" | bash -s -- -m raspberrypi4
```

#### Other machine types

- `intel-nuc`
- `raspberrypi`
- `raspberrypi2`
- `raspberrypi3`
- `raspberrypi3-64`
- `raspberrypi4`
- `raspberrypi4-64`
- `odroid-c2`
- `odroid-n2`
- `odroid-xu`
- `tinker`
- `qemuarm`
- `qemuarm-64`
- `qemux86`
- `qemux86-64`

See the [installer](https://github.com/home-assistant/supervised-installer) GitHub page for an up-to-date listing of supported machine types.

If you can not find your machine type in the list, you should pick the `qemu` release. i.e., `qemux86-64` for a normal 64-bit Linux distribution, or `qemuarm-64` for most modern ARM-based target like Raspberry Pi clones, or TV boxes.

[balenaEtcher]: https://www.balena.io/etcher
[Virtual Appliance]: https://github.com/home-assistant/operating-system/blob/dev/Documentation/boards/ova.md
[hassos-network]: https://github.com/home-assistant/operating-system/blob/dev/Documentation/network.md
[pi0-w]: https://github.com/home-assistant/operating-system/releases/download/3.13/hassos_rpi0-w-3.13.img.gz
[pi1]: https://github.com/home-assistant/operating-system/releases/download/3.13/hassos_rpi-3.13.img.gz
[pi2]: https://github.com/home-assistant/operating-system/releases/download/3.13/hassos_rpi2-3.13.img.gz
[pi3-32]: https://github.com/home-assistant/operating-system/releases/download/3.13/hassos_rpi3-3.13.img.gz
[pi3-64]: https://github.com/home-assistant/operating-system/releases/download/3.13/hassos_rpi3-64-3.13.img.gz
[pi4-32]: https://github.com/home-assistant/operating-system/releases/download/3.13/hassos_rpi4-3.13.img.gz
[pi4-64]: https://github.com/home-assistant/operating-system/releases/download/3.13/hassos_rpi4-64-3.13.img.gz
[tinker]: https://github.com/home-assistant/operating-system/releases/download/3.13/hassos_tinker-3.13.img.gz
[odroid-c2]: https://github.com/home-assistant/operating-system/releases/download/3.13/hassos_odroid-c2-3.13.img.gz
[odroid-n2]: https://github.com/home-assistant/operating-system/releases/download/4.4/hassos_odroid-n2-4.4.img.gz
[odroid-xu4]: https://github.com/home-assistant/operating-system/releases/download/3.13/hassos_odroid-xu4-3.13.img.gz
[intel-nuc]: https://github.com/home-assistant/operating-system/releases/download/3.13/hassos_intel-nuc-3.13.img.gz
[vmdk]: https://github.com/home-assistant/operating-system/releases/download/3.13/hassos_ova-3.13.vmdk.gz
[vhdx]: https://github.com/home-assistant/operating-system/releases/download/3.13/hassos_ova-3.13.vhdx.gz
[vdi]: https://github.com/home-assistant/operating-system/releases/download/3.13/hassos_ova-3.13.vdi.gz
[linux]: https://github.com/home-assistant/supervised-installer
[local]: http://homeassistant.local:8123
[samba]: /addons/samba/
[ssh]: /addons/ssh/
[pi-power]: https://www.raspberrypi.org/help/faqs/#powerReqs
[configure]: /getting-started/configuration/
