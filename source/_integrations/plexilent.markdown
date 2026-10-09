---
title: Plexilent
description: Instructions on how to control Plexilent lights with Home Assistant.
ha_category:
  - Light
ha_release: 2026.11
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@plexilentpvtltd'
ha_domain: plexilent
ha_platforms:
  - light
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Plexilent** {% term integration %} lets you control [Plexilent](https://plexilent.com/) smart lights from Home Assistant: switch them on and off, dim them, and set their white temperature or colour.

Plexilent lights form a Bluetooth mesh that a Plexilent Wi-Fi gateway connects to the Plexilent cloud. This integration talks to that cloud with the same account you use in the Plexilent app, so it works wherever Home Assistant has internet access.

## Supported devices

Every light in your Plexilent homes that a Wi-Fi gateway can reach:

- **Colour lights**: on/off, brightness, white temperature and colour.
- **Tunable white lights**: on/off, brightness and white temperature, within the range set for each light in the app.
- **Dimmable lights**: on/off and brightness.
- **On/off lights**.

## Prerequisites

1. Set up your lights in the Plexilent app.
2. Add a Plexilent Wi-Fi gateway to each home you want to control, and keep it online.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: "The email address you sign in to the Plexilent app with."
Password:
  description: "Your Plexilent app password. It is used once to sign in and is not stored; Home Assistant keeps only a sign-in token."
{% endconfiguration_basic %}

## Data updates

The integration asks the Plexilent cloud for the state of your lights every 30 seconds. A change you make in Home Assistant shows immediately; a change made in the app or at a wall switch can take up to 30 seconds to appear.

Lights added in the app appear in Home Assistant automatically, and each light is placed in the area named after its room in the app.

## Known limitations

- A light shows as unavailable while its home's gateway is offline.
- Plexilent sensors, wall switch panels, fans, and curtains are not supported yet.

## Troubleshooting

### All lights in a home are unavailable

The home's Wi-Fi gateway is offline. Check that it is powered and connected to Wi-Fi in the Plexilent app.

### Home Assistant asks me to sign in again

Your password was changed, or the account was signed out. Enter your current Plexilent app password when Home Assistant asks.

## Removing the integration

This integration follows standard integration removal. Removing it also signs Home Assistant out of your Plexilent account.

{% include integrations/remove_device_service.md %}
