---
title: Ituran
description: Instructions on how to add Ituran to Home Assistant.
ha_category:
  - Car
  - Device Tracker
  - Presence detection
ha_release: '2024.12'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@shmuelzon'
ha_domain: ituran
ha_platforms:
  - device_tracker
ha_integration_type: integration
---

The **Ituran** {% term integration %} allows you to retrieve information from your Ituran-equipped vehicle.

{% note %}
The information is pulled every 5 minutes from the Ituran web service; however, the data is updated at intervals determined by Ituran based on whether the vehicle is stationary or not.
{% endnote %}

## Prerequisites

You must have an Ituran account for use with the Ituran APP ([Android](https://play.google.com/store/apps/details?id=com.ituran.forall)/[iOS](https://apps.apple.com/app/id1227756834)).

{% include integrations/config_flow.md %}

{% configuration_basic %}
ID or passport number:
  description: Your government ID or passport number used to sign-up with Ituran.
Mobile phone number:
  description: The mobile phone number used to sign-up with Ituran. A one-time-password will be sent to this number.
Mobile ID:
  description: A unique identifier used for registration with Ituran services. Leave this blank to generate a new ID automatically. Only provide a value if you want to share an existing Mobile ID from another device (e.g., your phone's Ituran app) to keep both devices active simultaneously.
{% endconfiguration_basic %}

## Platforms

### Device Tracker

The Ituran {% term integration %} will track the location of each vehicle registered to your account.

In addition, a few attributes are included:
| Attribute | Description | Example |
|-----------|-------------|---------|
| address | The detected address from GPS coordinates | "123 Main St, City" |
| heading | Vehicle's current direction, in degrees, relative to the north | 180 |
| last_update | Timestamp of last data update, as sent by the vehicle | "2024-01-01 12:00:00" |
