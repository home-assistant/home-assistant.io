---
description: Instructions on monitoring Prusa 3D printers using PrusaLink.
ha_release: '2022.9'
ha_domain: prusalink
related:
  - url: https://help.prusa3d.com/article/prusa-connect-and-prusalink-explained_302608
    title: PrusaLink documentation
  - url: https://help.prusa3d.com/guide/prusalink-and-prusa-connect-setup-mk3-s-_221744
    title: PrusaLink installation guide for Prusa MK3 with Raspberry Pi Zero W
  - url: https://help.prusa3d.com/guide/prusalink-prusa-connect-with-rpi-3-4-usb-mk2-5-s-mk3-s-_469341
    title: PrusaLink installation guide for Prusa MK2.5/MK3 with Raspberry Pi 3/4
---

The **PrusaLink** {% term integration %} allows you to monitor your [Prusa 3D printer](https://www.prusa3d.com) and its progress with your Home Assistant installation. This integration works with Prusa MINI/MINI+, Prusa MK3.9/MK4, Prusa XL, Prusa CORE One, and with the older Raspberry Pi-based Prusa MK2.5/MK3.

This integration has been updated to use the latest v1 API endpoints, which require firmware version 4.7.0 or later. If you own a Prusa MINI/MINI+, please make sure your printer is running firmware 5.1.0 or a more recent version. Firmware versions 4.7.x and 5.0.x are not available for this model. The Prusa CORE One works with its default firmware. For Prusa MK2.5/MK3, this integration requires PrusaLink version 0.7.2 or later.

Firmware update guides can be found here:

 - [Prusa MINI/MINI+](https://help.prusa3d.com/article/firmware-updating-mini-mini_124784)
 - [Prusa MK3.9/MK4/XL](https://help.prusa3d.com/article/how-to-update-firmware-mk4-xl_453086)
 - [Prusa CORE One](https://help.prusa3d.com/article/how-to-update-firmware-core-one-mk4-s-mk3-9-s-mk3-5-s-xl_453086)
 - [Prusa MK2.5/MK3](https://help.prusa3d.com/guide/how-to-update-prusalink-mk2-5-s-mk3-s-_650837)

## Obtaining hostname, username, and password

### Prusa MINI/MINI+/MK3.9/MK4/XL/CORE One

 - On your printer, navigate to **Settings** > **Network** > **PrusaLink**.
 - Find the device's **IP address**. Alternatively, you can look for the printer's IP address or hostname on your router.
 - Note that for some models, the username may not be visible, as it is hardcoded to `maker`.
 - Depending on your model, the password entry may not be called **Password**, but **API key**.

### Prusa MK2.5/MK3

 - The device's **IP address** is displayed on the printer LCD after PrusaLink starts up. Alternatively, you can look for the printer's IP address or hostname on your router.
 - Use the **username** and **password** you entered during the initial PrusaLink setup (not the API key).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your printer. If you leave out `http://` or `https://`, the integration uses `http://`."
Username:
  description: "The PrusaLink username. It defaults to `maker`, the fixed username on some models. On the MK2.5 and MK3, use the username from your PrusaLink setup."
Password:
  description: "The PrusaLink password. Some models call it **API key**. On the MK2.5 and MK3, use the password from your PrusaLink setup, not the API key."
{% endconfiguration_basic %}

## Data updates

The integration {% term polling polls %} the printer every 30 seconds. After you press one of its job buttons, such as pause or resume, it polls every 5 seconds for the next 30 seconds, so the new state shows quickly.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
