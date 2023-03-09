---
title: "Is USB Boot for the Raspberry Pi 4 supported?"
ha_category: Home Assistant
---

Home Assistant offers a data disk feature that offloads all data to an attached USB hard drive. The SD card is still in use but is only used to serve the Home Assistant OS. [Learn more about the data disk feature.](/common-tasks/os/#using-external-data-disk)

**Booting from USB**

Due to the complexity of USB and the USB mass storage device class, booting from a USB device is delicate. When booting from a USB drive this process has to be done multiple times (firmware/boot loader and the operating system), and there is a high chance that it doesn't complete during one of these stages.

That said, booting Home Assistant OS completely from a USB drive (SSD or any other USB mass storage device) works with *some* USB devices. USB Devices that are known to work with Raspberry Pi OS (check the Raspberry Pi Forum) are more likely to work with Home Assistant OS. However, because Home Assistant OS also has U-Boot in the boot chain, there are devices which are known to work with Raspberry Pi OS but do *not* work with Home Assistant OS. Finding the right combination of hardware can require experimentation.
