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

To obtain the API key:
 - On your printer, navigate to **Settings** > **Network** > **PrusaLink**. 
 - The API key is shown at the bottom of the screen.

{% include integrations/config_flow.md %}
