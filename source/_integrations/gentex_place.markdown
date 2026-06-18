---
title: Place
description: Instructions on how to set up your Place devices with Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.1
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@niaexa'
  - '@andrewtran-gentex'
ha_domain: gentex_place
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: bronze
---

The **Place** {% term integration %} allows you to integrate your [Place](https://placehomesolutions.com) devices in Home Assistant. The Place app allows [Place](https://placehomesolutions.com) owners to receive notifications for alarm events such as smoke, carbon monoxide, and heat alarms.

## Prerequisites

1. Install the Place home solutions app.
2. Create an account.
3. Add a Place device to the app.

To prepare for an integration with Home Assistant:

{% include integrations/config_flow.md %}

## Configuration

{% configuration_basic %}
Email:
    description: "The email for your Place account."
Password:
    description: "The password for your Place account."
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
