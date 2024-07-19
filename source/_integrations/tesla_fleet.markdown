---
title: Tesla Fleet
description: Instructions on how to integrate the Tesla Fleet API within Home Assistant.
ha_category:
  - Car
  - Sensor
ha_release: 2024.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: tesla_fleet
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Tesla Fleet API {% term integration %} exposes various sensors from Tesla vehicles and energy sites.

## Prerequisites

You must have a [Tesla](https://tesla.com) account and a Tesla vehicle, PowerWall, Solar, or Wall Connector.

{% include integrations/config_flow.md %}

## Scopes

When connecting your Tesla account to Home Assistant, you **must** select the `Vehicle Information` or `Energy Product Information` scope. It is recommended you select all scopes for full functionality.

## Rate limits

Tesla restricts open-source integrations to the ["Discovery tier"](https://developer.tesla.com/docs/fleet-api#membership-levels) which only allows for 200 vehicle data requests per day. The integration will stop polling for vehicle updates when it hits this limit, and will wait the appropriate time specified in the **Retry-After** header.

## Entities

These are the entities available in the Tesla Fleet integration. Not all entities are enabled by default, and not all values are always available.

### Vehicles

|Domain|Name|Enabled|
|---|---|---|
|Sensor|Battery level|Yes|
|Sensor|Battery range|Yes|
|Sensor|Charge cable|No|
|Sensor|Charge energy added|Yes|
|Sensor|Charge rate|Yes|
|Sensor|Charger current|Yes|
|Sensor|Charger power|Yes|
|Sensor|Charger voltage|Yes|
|Sensor|Charging|Yes|
|Sensor|Distance to arrival|Yes|
|Sensor|Driver temperature setting|No|
|Sensor|Estimate battery range|No|
|Sensor|Exterior color|No|
|Sensor|Fast charger type|No|
|Sensor|Ideal battery range|No|
|Sensor|Inside temperature|Yes|
|Sensor|Odometer|No|
|Sensor|Outside temperature|Yes|
|Sensor|Passenger temperature setting|No|
|Sensor|Power|No|
|Sensor|Roof color|No|
|Sensor|Scheduled charging mode|No|
|Sensor|Scheduled charging start time|No|
|Sensor|Scheduled departure time|No|
|Sensor|Shift state|No|
|Sensor|Speed|No|
|Sensor|State of charge at arrival|No|
|Sensor|Time at arrival|Yes|
|Sensor|Time at full charge|Yes|
|Sensor|Time to arrival|Yes|
|Sensor|Time to full charge|Yes|
|Sensor|Tire pressure front left|No|
|Sensor|Tire pressure front right|No|
|Sensor|Tire pressure last measured front left|No|
|Sensor|Tire pressure last measured front right|No|
|Sensor|Tire pressure last measured rear left|No|
|Sensor|Tire pressure last measured rear right|No|
|Sensor|Tire pressure rear left|No|
|Sensor|Tire pressure rear right|No|
|Sensor|Traffic delay|No|
|Sensor|Usable battery level|No|

### Energy sites

|Domain|Name|Enabled|
|---|---|---|
|Sensor|Battery power|Yes|
|Sensor|Energy left|Yes|
|Sensor|Generator power|No|
|Sensor|Grid power|Yes|
|Sensor|Grid services power|Yes|
|Sensor|Island status|Yes|
|Sensor|Load power|Yes|
|Sensor|Percentage charged|Yes|
|Sensor|Solar power|Yes|
|Sensor|Total pack energy|No|
|Sensor|VPP backup reserve|Yes|
|Sensor|Version|Yes|

### Wall connector

|Domain|Name|Enabled|
|---|---|---|
|Sensor|Fault state|No|
|Sensor|Power|Yes|
|Sensor|State|Yes|
|Sensor|Vehicle|Yes|

## Vehicle sleep

Constant API polling will prevent most Model S and Model X vehicles manufactured before 2021 from sleeping, so the integration will stop polling these vehicles for 15 minutes, after 15 minutes of inactivity. You can call the `homeassistant.update_entity` service to force polling the API, which will reset the timer.
