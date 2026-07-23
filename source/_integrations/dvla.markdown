---
title: DVLA
description: Instructions on how to integrate the DVLA Vehicle Enquiry Service with Home Assistant.
ha_category:
  - Car
  - Sensor
ha_release: 2026.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jampez77'
ha_domain: dvla
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

The **DVLA** {% term integration %} retrieves vehicle information from the UK Driver and Vehicle Licensing Agency (DVLA) [Vehicle Enquiry Service](https://www.gov.uk/get-vehicle-information-from-dvla).

You can use this integration to monitor UK vehicle details in Home Assistant, such as tax status, MOT status, tax due date, make, fuel type, color, engine capacity, CO2 emissions, and other fields returned by DVLA.

## Prerequisites

You need the UK vehicle registration number for each vehicle you want to add.

No DVLA account or individual API key is required.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Vehicle registration number:
    description: The UK vehicle registration number for the vehicle to add.
{% endconfiguration_basic %}

## Supported functionality

The integration creates sensors for supported DVLA vehicle fields. Some sensors may show as unknown if DVLA does not return that field for the configured vehicle.

Common sensor entities include:

- Registration number
- Make
- Tax status
- Tax due date
- MOT status
- MOT expiry date
- Year of manufacture
- Engine capacity
- CO2 emissions
- Fuel type
- Color
- Wheelplan
- Revenue weight
- Euro status
- Real driving emissions
- Date of last V5C issued
- Month of first registration
- Month of first DVLA registration

## Data updates

Vehicle data is refreshed once per day for each configured vehicle.

## Removing the integration

This integration follows the standard integration removal process.

{% include integrations/remove_device_service.md %}
