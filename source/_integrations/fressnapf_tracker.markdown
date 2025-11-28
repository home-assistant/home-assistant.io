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
  - device_tracker
ha_integration_type: device
---

The Fressnapf Tracker integration allows you to integrate (Fressnapf GPS Trackers)[https://tracker.fressnapf.de/] into Home Assistant.

## Prerequisites

You have to use the mobile app to add the trackers to your Fressnapf Tracker account.
The phone number you used to register can then be used to set up the integration.

During the setup, you will receive a verification code via SMS to confirm your identity.

{% include integrations/config_flow.md %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
