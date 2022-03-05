---
title: KDE Connect
description: Instructions on how to integrate KDE Connect devices in Home Assistant.
ha_category:
    - Sensor
    - Binary Sensor
ha_release: 2022.4
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@freundTech'
ha_domain: kdeconnect
ha_platforms:
  - sensor
  - binary_sensor
---

The `kdeconnect` integration lets you control and view sensor data from [KDE Connect](https://kdeconnect.kde.org/) compatible devices, including mobile phones and computers.

{% include integrations/config_flow.md %}