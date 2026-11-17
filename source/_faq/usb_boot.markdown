---
title: "Can I run Home Assistant from a USB drive on a Raspberry Pi 4?"
description: "Yes, with caveats. The recommended option is to keep the SD card and offload your data to a USB drive using the data disk feature."
ha_category: Home Assistant
---

Yes, but with caveats. There are two ways to use a USB drive with a Raspberry Pi 4.

### Recommended: data disk on USB

{% term "Home Assistant Operating System" %} has a data disk feature that moves all your data to an attached USB drive (such as an SSD), while the SD card stays in place to boot the operating system. This gives you most of the speed and reliability benefits of an SSD without the complexity of booting from USB. See [using an external data disk](/common-tasks/os/#using-external-data-disk) for instructions.

### Booting fully from USB

Booting Home Assistant Operating System completely from a USB drive (without an SD card) is possible with _some_ devices, but it is delicate. The boot process passes through firmware, U-Boot, and the operating system, each of which has to negotiate with the USB device, and there is a real chance of the boot failing at one of these stages.

USB drives that are known to work with Raspberry Pi OS (see the Raspberry Pi forum) are more likely to work with Home Assistant Operating System. However, because Home Assistant Operating System has U-Boot in the boot chain, some drives that work fine on Raspberry Pi OS do _not_ work on Home Assistant Operating System. Finding the right combination of hardware can take some experimentation.

If you simply want a more reliable storage setup than an SD card, the data disk option above is the safer route.
