---
description: Instructions on how to integrate SmartTub into Home Assistant.
ha_release: 2021.3
ha_domain: smarttub
---

The **SmartTub** {% term integration %} allows you to view and control hot tubs which use the [SmartTub](https://www.jacuzzi.com/en-us/hot-tubs/owners/smarttub-system) system, in Home Assistant.

## Prerequisites

- A hot tub with a SmartTub module
- A SmartTub account (registration is not supported, you can use the SmartTub mobile app)

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: "The email address of your SmartTub account."
Password:
  description: "The password of your SmartTub account."
{% endconfiguration_basic %}

{% include integrations/actions.md %}

## Data updates

The integration {% term polling polls %} the SmartTub cloud every 60 seconds.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
