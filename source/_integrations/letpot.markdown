---
title: LetPot
description: Instructions on how to integrate LetPot hydroponic gardens into Home Assistant.
ha_category:
  - Time
ha_release: 2025.2
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@jpelgrom'
ha_domain: letpot
ha_integration_type: hub
ha_platforms:
  - time
ha_quality_scale: bronze
---

The **LetPot** {% term integration %} allows you to integrate your [LetPot](https://letpot.com/) hydroponic gardens/systems into Home Assistant.

## Supported devices

The following devices are supported by this integration:

- LetPot Air (LPH-AIR)
- LetPot Max (LPH-MAX)
- LetPot Mini (LPH-MINI)
- LetPot Pro (LPH-PRO)
- LetPot Senior (LPH-SE)

## Prerequisites

To use this integration, you must first create a LetPot account and connect your hydroponic garden to Wi-Fi using the official app.

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Email:
    description: "The email address of your LetPot account."
    required: true
    type: string
Password:
    description: "The password of your LetPot account."
    required: true
    type: string
{% endconfiguration_basic %}

## Supported functionality

### Entities

The LetPot integration provides the following entities.

#### Times

- **Light on**: Time when the built-in light turns on.
- **Light off**: Time when the built-in light turns off.

{% note %}

When **Light on** and **Light off** are set to the same time, the built-in light will be turned off.

{% endnote %}

## Data updates

The integration receives updates when the device state changes, enabling immediate updates of the data in Home Assistant.

## Remove integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
