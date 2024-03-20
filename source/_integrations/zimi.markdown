---
title: Zimi Cloud Controller
description: Access and control your Zimi Cloud Controller and its connected Zimi-based devices.
featured: true
ha_iot_class: Local Polling
ha_release: 0.44
ha_codeowners:
  - '@markhannon'
ha_category:
  - Cover
  - Fan
  - Light
  - Sensor
  - Switch
ha_domain: zimi
---

The Zimi integration allows you to connect your Zimi Cloud Controller to Home Assistant. The Zimi Cloud Controller can control compatible Zimi-based devices connected to it.

{% include integrations/config_flow.md %}

You will be prompted to configure the gateway through the Home Assistant interface. The configuration process is very simple: when prompted, enter the your Zimi Cloud Controller IP and port, or leave the IP blank for auto-discovery on LAN.

<div class='note'>
If you see an "Unexpected error" message, restart the gateway and try again. Don't forget to assign a permanent IP address to your Zimi Cloud Controller on your router.
</div>


## Troubleshooting

### Missing Zimi devices

If there are missing Zimi devices after the initial integration, you may have to run thee discovery process again. To do this, navigate to Settings ->
Devices & services -> Zimi -> Add Hub. This will re-run the discovery process.

### Device Authorization Failure

Due to the authorization lifecycle of the Zimi Cloud Controller, when too many authorization requests are sent in a short period of time the device may
be unable to be connected to. If you are encountering authorization issues, remove the integration from Settings -> Devices & services -> Zimi, wait a short period, then try again.

