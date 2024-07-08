---
title: AfterShip
description: Instructions on how to set up AfterShip sensors within Home Assistant.
ha_category:
  - Postal service
ha_release: 0.85
ha_iot_class: Cloud Polling
ha_domain: aftership
ha_platforms:
  - sensor
ha_integration_type: integration
ha_config_flow: true
---

The `aftership` platform allows one to track deliveries by [AfterShip](https://www.aftership.com), a service that supports 490+ couriers worldwide. To use the tracking API functionality, the Essentials plan is required. This plan includes 100 shipments per month. There are various paid-for tiers after that.

The sensor value shows the number of packages that are not in `Delivered` state. As attributes are the number of packages per status.

## Setup

To use this sensor, you need an [AfterShip Account](https://accounts.aftership.com/register) and set up an API Key. To set up an API Key go to [AfterShip API](https://admin.aftership.com/settings/api-keys) page, and copy existing key or generate a new one.

{% important %}
AfterShip removed the Tracking API functionality from the Forever Free plan, and also no longer offers it in the Essentials plan. Using this integration now requires at least the [Pro](https://www.aftership.com/pricing/tracking) plan.
{% endimportant %}

{% include integrations/config_flow.md %}

## Service `add_tracking`

 You can use the service `aftership.add_tracking` to add trackings to AfterShip.

| Service data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `tracking_number` | `True` | string | Tracking number
| `slug` | `False` | string | Carrier e.g.,  `fedex`
| `title` | `False` | string | Friendly name of package

## Service `remove_tracking`

 You can use the service `aftership.remove_tracking` to remove trackings from AfterShip.

| Service data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `tracking_number` | `True` | string | Tracking number
| `slug` | `True` | string | Carrier e.g.,  `fedex`

{% note %}
This integration retrieves data from AfterShip public REST API, but the integration is not affiliated with AfterShip.
{% endnote %}
