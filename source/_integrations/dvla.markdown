---
title: DVLA
description: Instructions on how to integrate the DVLA Vehicle Enquiry Service with Home Assistant.
ha_category:
  - Binary sensor
  - Calendar
  - Car
  - Sensor
ha_release: 2026.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jampez77'
ha_domain: dvla
ha_platforms:
  - binary_sensor
  - calendar
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

The **DVLA** {% term integration %} retrieves vehicle information from the UK Driver and Vehicle Licensing Agency (DVLA) Vehicle Enquiry Service.

You can use this integration to monitor UK vehicle details in Home Assistant, such as tax status, MOT status, tax due date, make, fuel type, color, engine capacity, CO2 emissions, and other fields returned by DVLA.

## Prerequisites

You need the UK vehicle registration number for each vehicle you want to add.

No DVLA account or individual API key is required.

{% include integrations/config_flow.md %}

During setup, enter the vehicle registration number and choose how calendar events should be handled.

You can either:

- Create a dedicated DVLA calendar entity for the vehicle.
- Add the vehicle date events to existing calendar entities that support event creation.

## Options

The integration options allow you to change the selected calendar targets after setup.

## Entities

The entities created depend on the vehicle data returned by DVLA. Some fields may not be available for every vehicle.

### Sensor

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

### Binary sensor

Common binary sensor entities include:

- Taxed
- MOT valid
- Marked for export
- Automated vehicle

### Calendar

The calendar entity exposes upcoming vehicle date fields as calendar events. This can include the tax due date and MOT expiry date when those values are available from DVLA.

## Data updates

Vehicle data is refreshed once per day for each configured vehicle.

## Actions

The integration provides the `dvla.lookup` action for ad-hoc vehicle lookups.

This action performs a one-off request to DVLA and returns the vehicle data in the action response. It does not add the vehicle to Home Assistant and does not create entities.
