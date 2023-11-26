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
  - button
  - camera
  - sensor
ha_dhcp: true
---

The PrusaLink integration allows you to monitor your [Prusa 3D printer](https://www.prusa3d.com) and its progress with your Home Assistant installation. This integration works with Prusa MINI and Prusa MK4.
This integration requires PrusaLink v2. If you have the Prusa MINI, you need to run firmware 4.4.0 or later.

When adding the integration, you will be asked to provide a {% term host %} and an API key. These are the credentials you set up when setting up PrusaLink on or printer.

To obtain the host name and API key/password:

 - On your printer, navigate to **Settings** > **Network** > **PrusaLink**.
 - Find the devices **IP address**. Alternatively, you can look for the printer's IP address or hostname on your router.
 - Depending on your model, the entry may not be called **API key**, but **Password**.

{% include integrations/config_flow.md %}
