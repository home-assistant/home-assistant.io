---
title: Fressnapf Tracker
description: Instructions on how to integrate Fressnapf GPS Trackers into Home Assistant.
ha_category:
  - Presence detection
ha_iot_class: Cloud Polling
ha_release: 2026.1
ha_config_flow: true
ha_codeowners:
  - '@eifinger'
ha_domain: fressnapf_tracker
ha_platforms:
  - binary_sensor
  - device_tracker
  - light
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Fressnapf Tracker** {% term integration %} allows you to integrate [Fressnapf GPS Trackers](https://tracker.fressnapf.de/) into Home Assistant.

You can use this integration to track the location of your pets and monitor their activity in Home Assistant.

## Supported functionality

### Entities

The **Fressnapf Tracker** integration provides the following entities.

- **Device tracker**
  - **Description**: Shows the current location of your pet.
- **Battery**
  - **Description**: Shows the current battery level of your tracker.
- **Charging status**
  - **Description**: Indicates whether the tracker is currently charging.
- **Flashlight**
  - **Description**: Allows you to turn on the flashlight of the tracker to help locate your pet in the dark.
- **Sleep mode**
  - **Description**: Allows you to control the sleep mode of the tracker to conserve battery.
  
## Prerequisites

You have to use the mobile app to add the trackers to your Fressnapf Tracker account.
The phone number you used to register can then be used to set up the integration.

During the setup, you will receive a verification code via SMS to confirm your identity.

{% include integrations/config_flow.md %}

## Defining a custom polling interval

The **Fressnapf Tracker** {% term polling polls %} data from the cloud every 15 minutes.

{% include common-tasks/define_custom_polling.md %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
