---
title: "Is USB Boot for the Raspberry Pi 4 supported?"
ha_category: Home Assistant
---

Due to the complexity of USB and the USB mass storage device class booting from a USB device is brittle. Since booting from a USB drive this process has to be done multiple times (firmware/boot loader and the operating system), there is a high chance that this process doesn't complete in one of these stages. In general, the Linux USB stack is solid. Due to this, it is recommended to boot Home Assistant OS from an SD card and use a USB attached flash drive as data partition only. The `datactl` command, available on the OS shell, allows moving of the data partition.

That said, booting Home Assistant OS completely from a USB drive (SSD or any other USB mass storage device) works with *some* USB devices. USB Devices that are known to work with Raspberry Pi OS (check the Raspberry Pi Forum) are more likely to work with Home Assistant OS. However, because Home Assistant OS has also U-Boot in the boot chain, there are devices which are known to work with Raspberry Pi OS but do *not* work with Home Assistant OS.