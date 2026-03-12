---
title: HomeLink
description: Instructions on how to set up your HomeLink devices with Home Assistant.
ha_category:
  - Binary sensor
ha_release: 2026.1
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@niaexa'
  - '@ryanjones-gentex'
ha_domain: gentex_homelink
ha_platforms:
  - event
ha_integration_type: integration
ha_quality_scale: bronze
---

The **HomeLink** {% term integration %} allows you to integrate your [HomeLink](https://homelink.com) devices in Home Assistant. The HomeLink app allows [HomeLink](https://homelink.com) owners to trigger smart home routines in a variety of cloud-based home automation platforms from the comfort of their vehicle. When you arrive home, one HomeLink button press can adjust the thermostat, turn on lights, disarm the security system, unlock the door, and begin playing your favorite music.

## Prerequisites

HomeLink is only compatible with HomeLink devices accessible via the HomeLink App. To prepare for an integration with Home Assistant:

{% include integrations/config_flow.md %}

## Configuration

{% configuration_basic %}
Email:
    description: "The email for your HomeLink account."
Password:
    description: "The password for your HomeLink account."
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
