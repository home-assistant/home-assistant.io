---
title: OneTracker
description: Instructions on how to set up OneTracker sensors within Home Assistant.
ha_category:
  - Postal Service
ha_release: 2023.03
ha_iot_class: Cloud Polling
ha_domain: OneTracker
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `OneTracker` platform allows one to track deliveries by [OneTracker](https://onetracker.app), a service that supports 490+ couriers worldwide. To use the tracking API functionality, the Essentials plan is required. This plan includes 100 shipments per month. There are various paid-for tiers after that.

The sensor value shows the number of packages that are not in `Delivered` state. As attributes are the number of packages per status.

{% include integrations/config_flow.md %}

{% configuration_basic %}
email:
  description: Email used for OneTracker account.
  required: true
  type: string
password:
  description: Password used for OneTracker account.
  required: true
  type: string
{% endconfiguration_basic %}

## Setup

To use this sensor, you need an [OneTracker Account](https://onetracker.app/signin). If you need to create an account you will need to download the [Android](https://play.google.com/store/apps/details?id=app.onetracker.android)
or [iOS](https://itunes.apple.com/us/app/onetracker-package-tracking/id1409295535) application.

## Sensor

The OneTracker integration lets you monitor various states of packages monitored by OneTracker.

Each package is a sensor with the following data:

- Tracking status
- Tracking ID
- Tracking Location
- Carrier Name
- Estimated Delivery Time
- Actual Delivery Time
