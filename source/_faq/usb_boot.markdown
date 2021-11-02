---
title: "Is USB Boot for the Raspberry Pi 4 supported?"
ha_category: Home Assistant
---

Due to the complexity of USB and the USB mass storage device class, booting from a USB device is brittle. When booting from a USB drive this process has to be done multiple times (firmware/boot loader and the operating system), and there is a high chance that this process doesn't complete during one of these stages. In general, the Linux USB stack is solid, so it is recommended to boot Home Assistant OS from an SD card and use a USB attached flash drive as data partition only. The data move can be accomplished through the `datactl` command on the host or through the UI. For more information, see [Using external Data Disk](/common-tasks/os/#using-external-data-disk)


That said, booting Home Assistant OS completely from a USB drive (SSD or any other USB mass storage device) works with *some* USB devices. USB Devices that are known to work with Raspberry Pi OS (check the Raspberry Pi Forum) are more likely to work with Home Assistant OS. However, because Home Assistant OS has also U-Boot in the boot chain, there are devices which are known to work with Raspberry Pi OS but do *not* work with Home Assistant OS.
