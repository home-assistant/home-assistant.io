---
title: FENIX Control
description: Instructions on how to integrate FENIX TFT Wi-Fi thermostats with Home Assistant.
ha_categories:
  - climate.thermostats_heating
ha_release: 2026.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@baracudaz'
ha_domain: fenix_control
ha_platforms:
  - climate
ha_integration_type: hub
ha_quality_scale: bronze
---

The **FENIX Control** {% term integration %} lets you control [FENIX](https://www.fenixgroup.cz/en/) TFT Wi-Fi thermostats from Home Assistant. FENIX makes electric underfloor heating systems, and the TFT Wi-Fi thermostat regulates them per room. For the product range, see the [Wi-Fi thermostats](https://www.fenixgroup.cz/en/product-category/thermostats-and-controls/for-households-wi-fi/) on the FENIX website.

The thermostats connect to the FENIX Control cloud, the same service the FENIX Control mobile app uses. The integration signs in with your FENIX Control account and creates a climate entity for every thermostat in your account. You can see the room temperature and whether the thermostat is heating, switch between the thermostat's operating modes, and set the target temperature.

## Supported devices

The integration has been tested with the following device:

- FENIX TFT Wi-Fi thermostat

## Prerequisites

1. Install the FENIX Control app on your phone and create an account.
2. Connect your thermostats to your Wi-Fi network and add them to your account in the app.
3. Make sure you can control the thermostats from the app.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: "The email address you use to sign in to the FENIX Control app."
Password:
  description: "The password of your FENIX Control app account."
{% endconfiguration_basic %}

## Supported functionality

### Climate

The integration creates a climate entity for each thermostat. The entity is named after the installation (home) and the room you set up in the FENIX Control app.

The climate entity shows the room temperature measured by the thermostat, the target temperature, and whether the thermostat is currently heating.

#### HVAC modes

- **Off**: The thermostat is switched off.
- **Auto**: The thermostat follows its weekly program.
- **Heat**: The thermostat keeps the target temperature you set (manual mode).

Turning the thermostat on switches it back to the last HVAC mode it had since Home Assistant started, or to **Auto** if it has been off since then.

#### Presets

- **Home**: The thermostat follows its weekly program, like the **Auto** HVAC mode.
- **Away**: The thermostat's Defrost (anti-freeze) mode. The thermostat heats to its Defrost temperature, which can only be set on the thermostat.
- **Boost**: The thermostat's Boost mode. The thermostat heats to its Boost temperature for a limited time. The Boost temperature can only be set on the thermostat; the duration can be changed in the FENIX Control app.

When the thermostat is in a preset, the HVAC mode shows **Auto**.

#### Target temperature

You can set the target temperature between 5 °C and 35 °C in steps of 0.5 °C. The target temperature can only be changed in the **Heat** HVAC mode. To set a temperature from an automation while the thermostat is in **Auto** or **Off**, first set the HVAC mode to **Heat**.

### Holidays

Holidays are set in the FENIX Control app and apply to all thermostats of an installation. While a holiday is active, the thermostats can't be controlled from Home Assistant: the climate entity offers no controls and shows the **Auto** HVAC mode. The controls return when the holiday ends or is canceled in the app.

## Data updates

The integration {% term polling polls %} the FENIX Control cloud every 5 minutes. When you change a mode, preset, or temperature in Home Assistant, the new state is shown immediately, and the next update confirms it.

If the cloud can't be reached, the thermostats show as unavailable until the next successful update.

## Known limitations

- The integration needs the FENIX Control cloud. The thermostats have no local API.
- Holidays can't be set or canceled from Home Assistant. Use the FENIX Control app.
- The weekly program can't be changed from Home Assistant.
- Home Assistant can't change the Defrost or Boost temperature or the Boost duration. The target temperature can be set in Heat (manual) mode only.
- The integration doesn't provide sensor entities.

## Troubleshooting

### The integration asks you to sign in again

#### Description

Home Assistant asks you to sign in to FENIX Control again, and the thermostats are unavailable. This happens when the FENIX Control cloud no longer accepts the saved credentials, for example, after you changed your password or email address in the app.

#### Resolution

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **FENIX Control**.
2. Under **Needs attention**, select **Reconfigure** next to your account.
3. Enter the email address and password of your FENIX Control account. The email address is already filled in; change it if you changed it in the app.

### The thermostats are unavailable

#### Description

All thermostats show as unavailable, but Home Assistant doesn't ask you to sign in again.

#### Resolution

1. Check that Home Assistant has internet access.
2. Check that the thermostats can be controlled from the FENIX Control app. If the app can't reach them either, the problem is with the thermostats' Wi-Fi connection or the FENIX Control cloud.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
