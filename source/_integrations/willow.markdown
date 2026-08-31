---
title: Willow
description: Integrate Willow plant monitoring sensors into Home Assistant.
ha_category:
  - Sensor
ha_release: "2026.8"
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: willow
ha_codeowners:
  - "@paxprz"
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Willow** {% term integration %} allows you to monitor the health of your indoor plants in Home Assistant using Willow sensors.

Willow sensors periodically collect environmental and soil measurements and upload them to the Willow cloud platform. Home Assistant retrieves this information from the Willow cloud service, allowing you to visualize plant conditions and create automations based on sensor readings.

This integration communicates with the Willow cloud API using the open source [pywillow](https://github.com/PlantWithWillow/pywillow) Python library (available on [PyPI](https://pypi.org/project/pywillow/)).

## Supported devices

The following devices are supported by the integration:

- Willow Sensor

## Prerequisites

Before setting up the integration, you need:

- A Willow account.
- At least one Willow sensor paired with your account.
- An active internet connection.

{% include integrations/config_flow.md %}

After authentication is complete, Home Assistant automatically discovers and creates entities for all Willow sensors associated with your account.

## Supported functionality

Each Willow sensor provides the following sensor entities in Home Assistant:

### Sensors

- **Temperature**: Ambient temperature around the plant.
- **Humidity**: Ambient relative humidity.
- **Moisture**: Soil moisture level.
- **Illuminance**: Light exposure in lux.
- **Battery life**: Sensor battery percentage.

## Willow automation examples

Willow entities can be used in automations and scripts like other Home Assistant sensors. For example, you can create an automation that notifies you when a plant needs watering.

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when soil moisture is low

This example creates a persistent notification when the soil moisture level drops below 30.

{% details "YAML example for a low soil moisture notification" %}

{% example %}
automation: |
  alias: "Notify when soil moisture is low"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.ficus_moisture
      below: 30
  actions:
    - action: persistent_notification.create
      data:
        title: "Willow plant alert"
        message: "The soil moisture level is below 30. Your plant may need watering."
{% endexample %}

{% enddetails %}

## Data updates

The **Willow** integration uses cloud {% term polling %} to retrieve the latest sensor readings approximately every 15 minutes.

## Known limitations

- A cloud connection is required for operation.
- Historical sensor data stored in the Willow platform is not exposed through this integration.
- If a Willow sensor goes offline, Home Assistant retains the last successfully retrieved values until new data becomes available.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Troubleshooting

### Sensor data is missing

#### Symptom

One or more Willow sensors stop updating in Home Assistant.

#### Resolution

To resolve this issue, try the following steps:

1. Verify the sensor is connected in the Willow application.
2. Confirm the sensor has sufficient battery power.
3. Verify your Willow account can access the device.
4. Reload the integration from **Settings** > **Devices & services**.
