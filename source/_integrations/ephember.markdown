---
description: Instructions on how to integrate EPH Controls EMBER thermostats within Home Assistant.
ha_release: 0.57
ha_domain: ephember
ha_config_flow: true
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **EPH Controls** {% term integration %} lets you control [EPH Controls](https://emberapp.ephcontrols.com/) thermostats and hot water zones.

## Prerequisites

You need an EPH Wi-Fi gateway connected to your EPH system, and an account on the EMBER app.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: The email address you use to sign in to the EMBER app.
Password:
  description: The password you use to sign in to the EMBER app.
{% endconfiguration_basic %}

## Devices and entities

Each zone of your EPH system becomes a device with a climate entity. A single gateway can handle up to 32 connected devices.

Hot water zones show the cylinder temperature and can be switched between modes, but their target temperature can't be changed.

The supported operation modes map to the ON/OFF period selection of your timeswitch / EMBER app:

- **Auto** (`heat_cool`): The timeswitch operates 3 on / off periods per day.
- **Heat** (`heat`): The timeswitch is permanently on.
- **Off** (`off`): The timeswitch is permanently off.

If **All Day** is selected in the EMBER app, it shows as **Auto** in Home Assistant.

## Data updates

The **EPH Controls** integration {% term polling polls %} the EPH Ember cloud every 2 minutes. If the cloud can't be reached, the entities become unavailable until it answers again.

## YAML configuration

Configuring EPH Controls through YAML is deprecated. If you have an existing `ephember` climate platform in your {% term "`configuration.yaml`" %} file, Home Assistant imports it into a config entry automatically, and your existing entities keep their entity IDs. After the import, remove the `ephember` platform from your `configuration.yaml` file. YAML support for this integration is removed in a future Home Assistant release.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
