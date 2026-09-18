---
title: gridX
description: Instructions on how to integrate gridX energy systems within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2026.5
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@unl0ck'
ha_domain: gridx
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **gridX** integration connects Home Assistant to the [gridX](https://gridx.de) energy management platform.

It lets you monitor a gridX-based home energy system from Home Assistant, including live power flows for supported devices such as photovoltaic systems, batteries, EV chargers, heat pumps, and smart heaters.

## Use cases

The gridX integration is useful if you want to:

- Monitor your household's live energy flow between solar production, home consumption, battery storage, and the grid.
- Track cumulative grid import and export values for use in dashboards and automations.
- Watch optional subsystems such as an EV charger, heat pump, or smart heater when they are present in your installation.
- Build automations around self-consumption, battery charge level, or current grid import/export.

## Prerequisites

Before setting up the integration, make sure you have:

- A gridX-compatible energy system that is visible in the provider app.
- A valid account for the provider's gridX app.

At the moment, the Home Assistant integration supports **E.ON Home** accounts.

## Supported devices

The integration supports gridX-based home energy systems that expose data through the gridX cloud platform.

Depending on your installation, Home Assistant can surface sensors for:

- Photovoltaic production
- Household consumption
- Grid import and export
- Battery state of charge, power, and energy values
- EV charging station power, state of charge, currents, and total charged energy
- Heat pump power
- Smart heater power and temperature

Optional sensors are only created with usable values when the corresponding subsystem is available in your gridX installation.

## Setup

{% include integrations/config_flow.md %}

The integration provides the following fields during setup:

{% configuration_basic %}
Username:
  description: The email address of your gridX (E.ON Home) account.
Password:
  description: The password of your gridX (E.ON Home) account.
{% endconfiguration_basic %}

## Supported functionality

### Sensors

Each gridX system of the account becomes a device in Home Assistant. The integration creates live power sensors per system and, when available, for attached subsystems.

Examples include:

- **Live power sensors** for photovoltaic production, consumption, grid power, self-consumption, and self-sufficiency.
- **Grid meter sensors** for cumulative import and export energy.
- **Battery sensors** for state of charge, power, remaining charge, and capacity. Positive battery power means discharging, negative means charging.
- **EV charger sensors** for charging power, state of charge, per-phase current, and total charged energy.
- **Heat pump and heater sensors** when those devices are exposed by the gridX account.

Some optional sensors are disabled by default to avoid clutter when they are less commonly used.

## Data updates

The integration polls the gridX cloud API every 60 seconds for the live data of all systems of the account.

## Known limitations

- The integration currently supports only the **E.ON Home** gridX realm.
- The integration depends on the availability of the gridX cloud service and your provider account.
- Sensors for batteries, EV chargers, heat pumps, and heaters are only available when those devices are part of your installation and exposed by the gridX API.
- If the account authenticates successfully but no systems are returned, the integration cannot be set up.
- Systems added to the account after setup are only picked up after reloading the integration.

## Troubleshooting

### Setup fails with an authentication error

If setup reports invalid authentication:

1. Verify that you can still sign in to the provider's gridX app with the same credentials.
2. Re-enter the password carefully, especially if it was copied from a password manager.

### Setup fails because no data is available

If setup completes authentication but still fails to connect:

1. Make sure the account is linked to an active gridX-based energy system.
2. Check in the provider app whether the installation is visible and current data is available.
3. Wait a few minutes and try again if the provider cloud service is temporarily unavailable.

### Sensors become unavailable

If the integration was working previously and sensors become unavailable:

1. Check your internet connection.
2. Verify that the provider app can still show current system data.
3. Reload the integration from **Settings** > **Devices & services**.
4. If your account password changed, add the integration again with the same email address; the stored password is updated.

## Removing the integration

This integration follows standard integration removal. No extra cleanup steps are required.

{% include integrations/remove_device_service.md %}