---
title: Hunter Hydrawise
description: Instructions on how to integrate your Hunter Hydrawise Wi-Fi irrigation control system within Home Assistant.
ha_category:
  - Binary sensor
  - Irrigation
  - Sensor
  - Switch
ha_config_flow: true
ha_release: 0.71
ha_iot_class: Cloud Polling
ha_domain: hydrawise
ha_codeowners:
  - '@dknowles2'
  - '@thomaskistler'
  - '@ptcryan'
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: integration
---

The `hydrawise` integration allows you to integrate your [Hunter Hydrawise](https://hydrawise.com) Wi-Fi irrigation controller system in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)
- [Switch](#switch)

## Prerequisites

1. To set up the Hydrawise integration, you must first set up an online account at
[https://app.hydrawise.com](https://app.hydrawise.com). 
2. Then, use your online credentials to configure the integration.

{% include integrations/config_flow.md %}

## Binary sensor

Binary sensor entities are created for the controller:

- Cloud API availability

{% note %}
The Hydrawise API removed the ability to read the rain sensor status. Therefore it is no longer supported by the Hydrawise integration to Home Assistant.
{% endnote %}

Binary sensor entities are created for each zone:

- Running status

## Sensor

Sensor entities are added to each zone:

- Timestamp for the next scheduled automatic watering cycle
- Remaining time for the current watering cycle

## Switch

Switches are added for each zone, controlling:

- Smart watering features
- Manual watering

### Switch operation

When `auto_watering` is `on` the irrigation zone will follow the Smart Watering schedule set through the Hydrawise [mobile or web app](https://www.hydrawise.com). When the `auto_watering` switch is `off` the zone's Smart Watering schedule is suspended for 1 year.

When `manual_watering` is `on` the zone will run for 15 minutes.

{% note %}
Due to changes in the Hydrawise API the status of the Auto Watering switches has changed. Under normal conditions the Auto Watering switches correctly reflect the Smart Watering schedule on the Hydrawise mobile or web app. However, if a rain sensor is connected to the system and it is active (rain detected), or the zone is running the Auto Watering switch will turn off. After both of those conditions are removed the switch will again show the correct Auto Watering condition.
{% endnote %}
