---
title: AquaCell
description: Instructions on how to integrate AquaCell with Home Assistant.
ha_category:
  - Sensor
ha_release: 2024.7
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Jordi1990'
ha_domain: aquacell
ha_platforms:
  - sensor
ha_integration_type: device
---

AquaCell is a water-softening device. The [AquaCell](https://www.aquacell-waterontharder.nl/) {% term integration %} allows you to monitor your AquaCell device in Home Assistant.
You will need your Aquacell account information as used in the **AquaCell** app.

This integration also supports [Harvey](https://www.harveywatersofteners.co.uk/) softeners.

## Supported devices

This integration only works for softener models which have an **i-Lid** and are configured through the 'Mijn AquaCell' or 'My Harvey' mobile app.
These models are also recognizable by the required curved salt blocks.
- [AquaCell](https://www.aquacell-waterontharder.nl/aquacell)
- [HarveyArc Water Softener](https://www.harveywatersofteners.co.uk/products/water-softeners/harveyarc-water-softener)

## Prerequisites

The softener needs to be set up with the official app before being able to integrate it in Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email address:
  description: The email address used to log in to the mobile app used to monitor the softener.
  required: true
  type: string
Password:
  description: The password used to log in to the mobile app used to monitor the softener.
  required: true
  type: string
{% endconfiguration_basic %}

## Sensors

This integration provides {% term sensors %} for the following information from the softener device:

- Percentage of salt remaining.
- Time remaining until 0% salt level is reached.
- i-Lid battery level.
- Wi-Fi signal strength.

## Use cases

The integration provides sensors to monitor the salt level of the softener. You can use this information to create automations, for example, to notify you when the salt level is low and a refill is needed.

You can also easily plot the history of the salt level sensors over time, which can give you more insight into usage.

## Examples

The following examples show how to use this integration in Home Assistant automations.

### Send notification when salt is running out

The following example sends a notification to your mobile device when the salt is running out on either side.

```yaml
automation:
  - alias: "Notify when salt is running low"
    triggers:
      - trigger: numeric_state
        entity_id:
          - sensor.my_softener_salt_left_side_percentage
          - sensor.my_softener_salt_right_side_percentage
        below: 10

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "Softener is almost out of salt"
          message: > 
            Place new salt blocks in the softener.
```

## Data updates

The device does not update frequently, the integration is {% term polling %} new data every day from the cloud.

## Known limitations

There are no known limitations for this integration.

## Troubleshooting

There are no commonly known issues with this integration.

## Remove integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
