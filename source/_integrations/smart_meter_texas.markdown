---
title: Smart Meter Texas
description: Instructions on how to integrate Smart Meter Texas into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.115
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@grahamwetzler'
ha_domain: smart_meter_texas
ha_platforms:
  - sensor
ha_integration_type: integration
---

The [Smart Meter Texas](https://www.smartmetertexas.com/) integration allows Texas residents to integrate their electric meters into Home Assistant. This integration will create a sensor for each meter that shows the current reading.

On its own this sensor is not particularly useful. However, combined with a [`utility_meter`](/integrations/utility_meter/) sensor you can obtain usage over a month, for example.

## Setup

Any Texas electricity consumer can register an account.

1. Go to [Smart Meter Texas](https://www.smartmetertexas.com/)
2. Select _Sign Up_
3. Choose _residential_ as your account type
4. You will need following details which can be found on your electric bill.
    - The name of your retail electric provider
    - Your meter number
    - Your ESIID (Electric Service Identifier)

{% note %}
Due to API limits, this sensor refreshes once per hour. The limit is 24 meter readings per calendar day.
{% endnote %}

{% include integrations/config_flow.md %}
