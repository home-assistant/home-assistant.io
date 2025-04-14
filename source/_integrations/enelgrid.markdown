---
title: EnelGrid
description: Integration for Enel Grid consumption data in Home Assistant
stage: integration
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

## 📋 Features

- 🕒 Fetches hourly energy consumption (Enel provides data with a three-day delay)
- 📈 Tracks daily and cumulative monthly usage
- 💡 Integrates with the Home Assistant **Energy Dashboard**
- 🔄 Automatic updates every day
- 🔐 Re-authentication support

## ⚙️ Configuration

During setup, you’ll be prompted to enter:

- **Username**: Your Enel account email
- **Password**: Your Enel account password
- **POD Number**: Available on your Enel energy bill
- **User Number**: Also found on your bill
- **Price per kWh**: Estimate based on your billing rate (total € / total kWh)

These credentials are stored securely by Home Assistant’s configuration system.

## 📊 Energy Dashboard Setup

Once configured, head to **Settings → Energy** and add your new consumption sensor to the dashboard:

![Energy Dashboard Configuration screenshot](https://github.com/sathia-musso/enelgrid/raw/main/assets/energy_config.jpg)

If everything is working correctly, your dashboard might look like this:

![Example of Home Assistant Energy Dashboard displaying the EnelGrid sensor](https://github.com/sathia-musso/enelgrid/raw/main/assets/example.jpg)

## 🏷️ Supported Features

| Feature                            | Supported |
|------------------------------------|-----------|
| Hourly Energy Data                 | ✅         |
| Daily Energy Data                  | ✅         |
| Monthly Cumulative Sensor          | ✅         |
| Energy Dashboard Integration       | ✅         |
| Automatic Login                    | ✅         |
| Automatic Daily Fetch              | ✅         |
| Re-authentication Support          | ✅         |

## Additional information

- **Link to related core PR:** [home-assistant/core#142742](https://github.com/home-assistant/core/pull/142742)  
- **Link to parent pull request in the Brands repository:** [home-assistant/brands#6873](https://github.com/home-assistant/brands/pull/6873)  
- This PR fixes or closes issue: N/A

