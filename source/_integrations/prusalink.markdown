---
title: PrusaLink
description: Instructions on monitoring Prusa 3D printers using PrusaLink.
ha_category:
  - 3D Printing
ha_iot_class: Local Polling
ha_release: '2022.9'
ha_config_flow: true
ha_codeowners:
  - '@balloob'
  - '@Skaronator'
ha_domain: prusalink
ha_integration_type: integration
ha_platforms:
  - button
  - camera
  - sensor
ha_dhcp: true
---

The PrusaLink integration allows you to monitor your [Prusa 3D printer](https://www.prusa3d.com) and its progress with your Home Assistant installation. This integration works with Prusa MINI, Prusa MK3.9/MK4 and Prusa XL. It does not work with the older Raspberry Pi Prusa Link printers.

This integration integration has been updated to utilize the latest v1 API endpoints, which require firmware version 4.7.0 or later. If you own a Prusa Mini, please make sure your printer is running firmware 5.1.0 or a more recent version, as firmware versions 4.7.x and 5.0.x are not available for this model.

Firmware update guides can be found here:

 - [Prusa Mini](https://help.prusa3d.com/article/firmware-updating-mini-mini_124784)
 - [Prusa MK4/XL](https://help.prusa3d.com/article/how-to-update-firmware-mk4-xl_453086)

To obtain the host name, username and password:

 - On your printer, navigate to **Settings** > **Network** > **PrusaLink**.
 - Find the device's **IP address**. Alternatively, you can look for the printer's IP address or hostname on your router.
 - Note that for some models, the username may not be visible, as it is hardcoded to `maker`.
 - Depending on your model, the entry may not be called **Password**, but **API key**.

{% include integrations/config_flow.md %}

## Related topics

- [PrusaLink documentation](https://help.prusa3d.com/article/prusa-connect-and-prusalink-explained_302608)
