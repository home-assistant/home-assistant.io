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
     - [Odroid-N2][odroid-n2]
     - [Odroid-XU4][odroid-xu4]
     - [Intel-Nuc][intel-nuc]

   - As a virtual appliance (x86_64/UEFI):
  
     - [VMDK][vmdk]
     - [VHDX][vhdx]
     - [VDI][vdi]
     - [QCOW2][qcow2]
     - [OVA][Virtual Appliance]

   - Not recommended Hardware:

     - [Raspberry Pi][pi1]
     - [Raspberry Pi Zero-W][pi0-w]
     - [Raspberry Pi 2][pi2]

2. Install Home Assistant:

   - Flash the downloaded image to an SD card using [balenaEtcher][balenaEtcher]. If using a Pi, we recommend at least a 32 GB SD card to avoid running out of space.
   - Load the appliance image into your virtual machine software. (Note: You are free to assign as much resources as you wish to the VM, please assign enough based on your add-on needs)
     - For VirtualBox create a new virtual machine, Select "Other Linux (64Bit) Assign it atleast 2GB of Memory and "Use an existing virtual hard disk file", select the VDI file from above, afterwards edit the "Settings" of the VM and go "System" then Motherboard and Enable EFI, then "Network" "Adapter 1" Bridged and your adapter
     - For Hyper-V create a new virtual machine, Select "Generation 2", Assign it atleast 2GB of Memory and select "Connection -> "Your Virtual Switch that is bridged", then "Use an existing virtual hard disk" and select the VHDX file from above, after creation go to "Settings" -> "Security" and deselect "Enable Secure Boot"
     - For KVM create a new virtual machine in virt-manager, select "Import existing disk image", provide the path to the QCOW2 image above, choose "Generic Default" for the OS, assign atleast 2GB RAM and 1vCPU, check the box for "Customize configuration before install" and select your bridge under "Network Selection", then under customization select "Overview" -> "Firmware" -> "UEFI x86_64: /usr/share/ovmf/x64/OVMF_CODE.fd"
     - For Vmware Workstation create a new virtual machine, select "Custom", make it compatible with the default of Workstation and ESX, Choose "I will install the operating system later", select "Linux" -> "Other Linux 5.x or later kernel 64-bit", give it atleast 2GB RAM and 1vCPU, select "Use Bridged Networking" then "Use an existing virtual disk" and select the VMDK file above, after creation of VM go to "Settings" and "Options" then "Advanced" and select "Firmware type" to "UEFI"

3. Optional - set up the Wi-Fi or a static IP address. There are two possible places for that:
   - on a blank USB stick with a FAT32 partition having partition label `CONFIG`, while in its root directory, create the `network/my-network` file, or
   - on the Home Assistant SD card's first, bootable partition (labeled `hassos-boot`, might not be auto mounted in Linux) create the `CONFIG/network/my-network` file.

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


[balenaEtcher]: https://www.balena.io/etcher
[hassos-network]: https://github.com/home-assistant/operating-system/blob/dev/Documentation/network.md
[pi0-w]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_rpi0-w-4.8.img.gz
[pi1]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_rpi-4.8.img.gz
[pi2]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_rpi2-4.8.img.gz
[pi3-32]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_rpi3-4.8.img.gz
[pi3-64]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_rpi3-64-4.8.img.gz
[pi4-32]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_rpi4-4.8.img.gz
[pi4-64]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_rpi4-64-4.8.img.gz
[tinker]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_tinker-4.8.img.gz
[odroid-c2]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_odroid-c2-4.8.img.gz
[odroid-n2]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_odroid-n2-4.8.img.gz
[odroid-xu4]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_odroid-xu4-4.8.img.gz
[intel-nuc]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_intel-nuc-4.8.img.gz
[vmdk]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_ova-4.8.vmdk.gz
[vhdx]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_ova-4.8.vhdx.gz
[vdi]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_ova-4.8.vdi.gz
[qcow2]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_ova-4.8.qcow2.gz
[Virtual Appliance]: https://github.com/home-assistant/operating-system/releases/download/4.8/hassos_ova-4.8.ova
[local]: http://homeassistant.local:8123
[samba]: /addons/samba/
[ssh]: /addons/ssh/
[pi-power]: https://www.raspberrypi.org/help/faqs/#powerReqs
[configure]: /getting-started/configuration/
