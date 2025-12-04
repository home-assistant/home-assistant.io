---
title: HomeLink
description: Instructions on how to set up your HomeLink devices with Home Assistant.
ha_category:
  - Binary sensor
ha_release: 2025.3
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@niaexa'
  - '@ryanjones-gentex'
ha_domain: gentex_homelink
ha_platforms:
  - binary_sensor
ha_integration_type: integration
ha_quality_scale: bronze
---

The **HomeLink** {% term integration %} allows you to integrate your [HomeLink](https://homelink.com) devices in Home Assistant. The HomeLink app allows [HomeLink](https://homelink.com) owners to trigger smart home routines in a variety of cloud-based home automation platforms from the comfort of your vehicle. When you arrive home, one HomeLink button press can adjust your thermostat, turn on your lights, disarm the security system, unlock the door, and begin playing your favorite music.

## Prerequisites

HomeLink is only compatible with HomeLink devices accessible via the HomeLink App. To prepare for an integration with Home Assistant:

1. Install the HomeLink app through an app store of your choice.
2. Create an account or sign in.
3. Connect to your HomeLink mirror.

## Configuration

Upon enabling the HomeLink integration, you will be prompted to enter the email and password for your HomeLink account.

When you have configured the HomeLink service, you will see your connected HomeLink devices and buttons you have configured on the home screen. These buttons can be connected to events for automations to control lights, music, and more in Home Assistant.

For more information on how to configure automation and scenes, please see Home Assistant's documentation [here](https://www.home-assistant.io/getting-started/automation/).

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
