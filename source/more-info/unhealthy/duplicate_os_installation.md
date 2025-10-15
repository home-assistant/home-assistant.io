---
title: "Duplicate Home Assistant OS installation"
description: "How to resolve issues caused by having multiple Home Assistant OS installations on the same system."
---

## The issue

Multiple Home Assistant OS installations have been detected, which can lead to non-bootable systems, especially after updates. This problem typically occurs when you have installed Home Assistant OS multiple times on different storage devices (like SD cards, USB drives, or internal storage) that are all connected to the same device. This mismatch can lead to:

- Your system booting into an old version of Home Assistant OS even after updating.
- Complete boot failure, leaving your system unable to start.
- Other forms of unpredictable behavior.

## The solution

Make sure you have only one Home Assistant OS installation on your system. To do that, follow these steps:

1. Create a [full backup][backup] of your system.
2. Store the backup safely on another device. 
3. Shut down your Home Assistant system and disconnect all storage devices.
4. [Install Home Assistant OS][installation] on the storage device you want to use, wiping the other devices.
5. Upload the backup during the [onboarding][onboarding] to restore your previous configuration.

Following these steps ensures that Home Assistant OS is installed on only a single storage device. In case you are using the [external data disk][data-disk] feature, wipe this disk as well prior to starting the device for the first time with this storage device connected.

### Note on devices with non-removable storage

If you have Home Assistant Yellow or any other device with non-removable storage, you may need to wipe this storage as well before proceeding with the installation. This method may be different depending on the device you are using.

For Home Assistant Yellow, the easiest way is to follow the [steps for reinstalling Home Assistant OS][yellow-rpiboot], but at the step where you would normally select the Home Assistant OS image, select the **Erase** option instead. Alternatively, once the device is initialized using the `rpiboot` utility, use any disk management tool to wipe the eMMC storage.

[backup]: /common-tasks/general/#backups
[installation]: /installation/
[onboarding]: /getting-started/onboarding/
[data-disk]: /common-tasks/general/#external-data-disk
[yellow-rpiboot]: https://support.nabucasa.com/hc/en-us/articles/25485061432093-Reinstall-the-Home-Assistant-Operating-System-on-Raspberry-Pi-CM5
