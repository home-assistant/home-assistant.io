---
title: Anglian Water
description: The Anglian Water integration allows you to access your smart meter data within Home Assistant.
ha_release: 2025.12
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@pantherale0'
ha_domain: anglian_water
ha_integration_type: service
ha_platforms:
  - sensor
ha_category:
  - Sensor
ha_quality_scale: bronze
ha_config_flow: true
---

The **Anglian Water** {% term integration %} is used to integrate with the smart meters of [Anglian Water](https://www.anglianwater.co.uk).

## Supported devices

- Smart water meters
- Enhanced smart water meters

## Unsupported devices

The following devices are not supported by the integration:

- Basic water meters that require manual readings

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
    description: "The username / email used to login to your Anglian Water account."
Password:
    description: "The password used to login to your Anglian Water account."
Account number:
    description: "If a valid smart meter is not associated with the default billing account linked to your Anglian Water login, please have your latest bill handy. You will be asked to provide the account number found at the top."
{% endconfiguration_basic %}

## Supported functionality

The **Anglian Water** integration provides the following entities.

### Sensors

- **Latest reading**
  - **Description**: Latest reading of your smart water meter.

- **Yesterday cost**
  - **Description**: The total cost of yesterday's water consumption.

- **Yesterday consumption**
  - **Description**: Yesterday's total water consumption in litres (this may not update until after 12pm).

## Data updates

The **Anglian Water** integration {% term polling polls %} data from the service every 60 minutes by default.

## Known limitations

Data is delayed by up to 24 hours (and can even last longer if there are issues with the smart metering service).

Home Assistant will only poll the API for new data once every 60 minutes as your smart meter does not frequently report changes.

Yesterday's cost sensor is provided by Anglian Water, as of 25th November 2025 this does not include standing charges or sewerage costs.

## Troubleshooting

### Readings are not updated

This can happen if the smart metering service is experiencing capacity problems or an outage. Check the Anglian Water website before logging an issue.

### Smart meter unavailable

This means that the account number detected (or provided) does not have an active and supported smart meter and therefore cannot be used with this integration.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
