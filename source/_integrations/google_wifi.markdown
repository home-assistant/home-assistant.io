---
title: Google Wifi
description: Instructions on how to integrate Google Wifi/OnHub routers into Home Assistant.
ha_category:
  - System monitor
ha_iot_class: Local Polling
ha_release: '2026.2.3'
ha_domain: google_wifi
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
ha_codeowners:
  - '@EpicBurrito'
ha_quality_scale: legacy
---

The **Google Wifi** {% term integration %} is displaying the exposed status of a Google Wifi, Nest Wifi, or OnHub router.

The {% term integration %} is able to report network status, up-time, model number, current IP address and firmware versions.

## Configuration

Enter the IP Address of your router / access point, along with the device name.
Google/Nest IP addresses default to the 192.168.86.1-255 range. Your primary router will be assigned 192.168.86.1, while all additional points added to the system will be assigned a number correponsing to the order in which devices are added to the network. Unfortunately, if you are using the internal DHCP services provided by these routers, you can not assign a static IP to the access points - only to client devices.


## Data updates

The integration normally updates every 30 seconds.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

## Supported functionality

The {% term integration %} connects to your router at the API endpoint '/api/v1/status'. From there, it scrapes the following information:

- system/modelID - For setting the model ID in the Home Assistant device.
- software/softwareVersion - For setting the Firmware version in the Home Assistant device.
- software/updateNewVersion - Lets you know if an update is available or not.
- system/groupRole - Shows if the router is acting as the root of the network tree or a leaf.
- system/uptime - Creates one sensor showing uptime in days, and a second one showing the last system restart.
- wan/localIpAddress - Shows your Public IP address.
- wan/online - Shows system Online/Offline status.
