---
title: PrusaLink
description: Instructions on monitoring Prusa 3D printers using PrusaLink.
ha_category:
  - 3D printing
ha_iot_class: Local Polling
ha_release: '2022.9'
ha_config_flow: true
ha_codeowners:
  - '@balloob'
ha_domain: prusalink
ha_integration_type: integration
ha_platforms:
  - binary_sensor
  - button
  - camera
  - sensor
ha_dhcp: true
related:
  - url: https://help.prusa3d.com/article/prusa-connect-and-prusalink-explained_302608
    title: PrusaLink documentation
  - url: https://help.prusa3d.com/guide/prusalink-and-prusa-connect-setup-mk3-s-_221744
    title: PrusaLink installation guide for Prusa MK3 with Raspberry Pi Zero W
  - url: https://help.prusa3d.com/guide/prusalink-prusa-connect-with-rpi-3-4-usb-mk2-5-s-mk3-s-_469341
    title: Sentence trigger
---

The **PrusaLink** {% term integration %} allows you to monitor your [Prusa 3D printer](https://www.prusa3d.com) and its progress with your Home Assistant installation. This integration works with Prusa MINI/MINI+, Prusa MK3.9/MK4, Prusa XL, and with the older Raspberry Pi-based Prusa MK2.5/MK3.

This integration has been updated to utilize the latest v1 API endpoints, which require firmware version 4.7.0 or later. If you own a Prusa MINI/MINI+, please make sure your printer is running firmware 5.1.0 or a more recent version. Firmware versions 4.7.x and 5.0.x are not available for this model. For Prusa MK2.5/MK3, this integration requires PrusaLink version 0.7.2 or later.

Firmware update guides can be found here:

 - [Prusa MINI/MINI+](https://help.prusa3d.com/article/firmware-updating-mini-mini_124784)
 - [Prusa MK3.9/MK4/XL](https://help.prusa3d.com/article/how-to-update-firmware-mk4-xl_453086)
 - [Prusa MK2.5/MK3](https://help.prusa3d.com/guide/how-to-update-prusalink-mk2-5-s-mk3-s-_650837)

## Obtaining hostname, username, and password

### Prusa MINI/MINI+/MK3.9/MK4/XL

 - On your printer, navigate to **Settings** > **Network** > **PrusaLink**.
 - Find the device's **IP address**. Alternatively, you can look for the printer's IP address or hostname on your router.
 - Note that for some models, the username may not be visible, as it is hardcoded to `maker`.
 - Depending on your model, the password entry may not be called **Password**, but **API key**.

### Prusa MK2.5/MK3

 - The device's **IP address** is displayed on the printer LCD after PrusaLink starts up. Alternatively, you can look for the printer's IP address or hostname on your router.
 - Use the **username** and **password** you entered during the initial PrusaLink setup (not the API key).

{% include integrations/config_flow.md %}
