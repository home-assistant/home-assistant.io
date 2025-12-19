---
title: "Rotarex DIMES SRG"
description: "Instructions on how to integrate your Rotarex gas tanks into Home Assistant."
documentation: https://rotarexsrg.com/category/digital-measurement-system
ha_release: 2026.1
ha_domain: rotarex
ha_iot_class: cloud_polling
ha_codeowners:
  - '@Rotarex'
---

The Rotarex DIMES SRG {% term integration %} allows you to monitor the level, battery, and last sync time of your Rotarex DIMES SRG Camping gas tanks in Home Assistant.

This integration uses the official Rotarex cloud API to fetch the latest data.

## Configuration

To add the **Rotarex DIMES SRG** integration to your Home Assistant instance, use this My button:

[![Open your Home Assistant instance and start setting up a new integration.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=rotarex)

1. In the pop-up, you will be asked to enter the **Email** and **Password** you use for the Rotarex DIMES SRG Camping mobile app.
2. After you submit the credentials, the integration is set up, and a device is created for each tank associated with your account.

## Sensors

This integration creates a device for each tank found in your account. Each device has the following sensors:

- **Level**: The remaining gas level in the tank (in %).
- **Battery**: The battery level of the tank's monitoring device (in %).
- **Last Synchronization**: The date and time of the last successful data sync with the Rotarex service.

The Level sensor also provides the following state attributes:

- `temperature`: The last recorded temperature.
- `last_synch`: The timestamp of the last data update.