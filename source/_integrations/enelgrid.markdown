---
title: EnelGrid
description: Integration for Enel Grid consumption data in Home Assistant
iot_class: cloud_polling
integration_type: service
dependencies:
  - recorder
codeowners:
  - "@sathia-musso"
ha_release: 2025.4
ha_domain: enelgrid
ha_integration_type: integration
---

The **EnelGrid** integration connects Home Assistant with **Enel Italia**, allowing users to import and monitor their electricity consumption data.

## Features

- Fetches hourly electricity consumption data
- Tracks daily and cumulative monthly usage
- Integrates with the Home Assistant Energy Dashboard
- Automatically updates daily
- Supports secure re-authentication if needed

## Configuration

During setup, you’ll be prompted to enter:

- **Username**: Your Enel account email address
- **Password**: Your Enel account password
- **POD Number**: Found on your Enel electricity bill
- **User Number**: Also found on your bill
- **Price per kWh**: Estimated based on your billing rate (total cost ÷ total kWh consumed)

All credentials are stored securely by Home Assistant’s configuration system.

## Energy Dashboard Setup

After configuration is complete, go to **Settings → Energy** and add your new consumption sensor to the dashboard:

![Energy Dashboard Configuration screenshot](https://github.com/sathia-musso/enelgrid/raw/main/assets/energy_config.jpg)

If everything is working correctly, your dashboard may look similar to the following:

![Example of Home Assistant Energy Dashboard displaying the EnelGrid sensor](https://github.com/sathia-musso/enelgrid/raw/main/assets/example.jpg)

## Supported Features

| Feature                      | Supported |
|------------------------------|-----------|
| Hourly Consumption Data      | ✅         |
| Daily Consumption Data       | ✅         |
| Monthly Cumulative Sensor    | ✅         |
| Energy Dashboard Integration | ✅         |
| Automatic Authentication     | ✅         |
| Automatic Daily Sync         | ✅         |
| Re-authentication Support    | ✅         |

## Troubleshooting

- If your sensor shows no data, ensure your Enel account is active and the credentials are correct.
- Data may not appear immediately; availability is subject to delays from Enel's data release policies.
