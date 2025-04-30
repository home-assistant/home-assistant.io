---
title: Hunter Hydrawise
description: Instructions on how to integrate your Hunter Hydrawise Wi-Fi irrigation control system within Home Assistant.
ha_category:
  - Binary sensor
  - Irrigation
  - Sensor
  - Switch
  - Valve
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
  - valve
ha_integration_type: integration
---

The `hydrawise` integration allows you to integrate your [Hunter Hydrawise](https://hydrawise.com) Wi-Fi irrigation controller system in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)
- [Switch](#switch)
- [Valve](#valve)

## Prerequisites

1. To set up the Hydrawise integration, you must first set up an online account at
[https://app.hydrawise.com](https://app.hydrawise.com). 
2. Then, use your online credentials to configure the integration.

{% include integrations/config_flow.md %}

## Binary sensor

Binary sensor entities are created for the controller:

- Cloud API availability
- Rain sensor moisture detection (if a rain sensor is attached to the controller)

Binary sensor entities are created for each irrigation zone:

- Running status

## Sensor

Sensor entities are created for the controller:

- Daily total water use (if a flow sensor is attached to the controller)
- Daily active water use (if a flow sensor is attached to the controller)
- Daily inactive water use (if a flow sensor is attached to the controller)

Sensor entities are created for each irrigation zone:

- Timestamp for the next scheduled automatic watering cycle
- Remaining time (in minutes) for the current watering cycle
- Daily active water use for the zone (if a flow sensor is attached to the irrigation zone)

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

## Actions

The Hydrawise integration makes various custom {% term actions %} available.

### Action `hydrawise.start_watering`

Starts a watering cycle in an irrigation zone.

| Data attribute | Optional | Description                                                                                                                                                                                     |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`    | no       | The irrigation zone in which to start watering.                                                                                                                                                 |
| `duration`     | yes      | The length of time (in minutes) to run a watering cycle. If not specified (or zero), the default watering duration set in the Hydrawise mobile or web app for the irrigation zone will be used. |

### Action `hydrawise.suspend`

Suspends automatic watering in an irrigation zone until a specified date.

| Data attribute | Optional | Description                                                                                |
| -------------- | -------- | ------------------------------------------------------------------------------------------ |
| `entity_id`    | no       | The irrigation zone in which to suspend watering.                                          |
| `until`        | no       | The date & time when automatic watering should be resumed. For example, `2024-08-30 08:30` |

### Action `hydrawise.resume`

Resumes automatic watering in an irrigation zone.

| Data attribute | Optional | Description                                      |
| -------------- | -------- | ------------------------------------------------ |
| `entity_id`    | no       | The irrigation zone in which to resume watering. |

## Valve

A valve is added for each zone allowing manual control of zone watering.

When a zone's valve is opened through Home Assistant, it will have an automatic shutoff time set to the zone's default watering duration configured in the Hydrawise [mobile or web app](https://www.hydrawise.com).
