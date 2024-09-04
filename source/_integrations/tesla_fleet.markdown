---
title: Tesla Fleet
description: Instructions on how to integrate the Tesla Fleet API within Home Assistant.
ha_category:
  - Binary sensor
  - Car
  - Device tracker
  - Sensor
ha_release: 2024.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: tesla_fleet
ha_platforms:
  - binary_sensor
  - device_tracker
  - diagnostics
  - sensor
ha_quality_scale: gold
ha_integration_type: integration
---

The Tesla Fleet API {% term integration %} exposes various sensors from Tesla vehicles and energy sites.

## Prerequisites

You must have a [Tesla](https://tesla.com) account and a Tesla vehicle, PowerWall, Solar, or Wall Connector, and must not have disabled the [My Home Assistant](/integrations/my/) integration.

{% details "Use a custom OAuth application" %}

The integration has a built-in OAuth application that will be suitable for most users. However, you can [create your own application](https://developer.tesla.com/dashboard) for the Tesla Fleet API and configure it as an [application credential](https://my.home-assistant.io/redirect/application_credentials). When creating the application, you must set `https://my.home-assistant.io/redirect/oauth` as the redirect URL.

You will be prompted to pick your custom application credential when creating a Tesla Fleet config entry.

{% enddetails %}

{% include integrations/config_flow.md %}

## Scopes

When connecting your Tesla account to Home Assistant, you **must** select the `Vehicle Information` or `Energy Product Information` scope. It is recommended you select all scopes for full functionality.

## Rate limits

Tesla restricts open-source integrations to the ["Discovery" plan](https://developer.tesla.com/docs/fleet-api/getting-started/subscription-plans) which only allows for 200 vehicle data requests per day. The integration will initially poll every 90 seconds, making vehicle data requests only when the vehicle is awake, and then dynamically slow down polling based on how many vehicle data requests have been made in the last 24 hours.

## Entities

These are the entities available in the Tesla Fleet integration. Not all entities are enabled by default, and not all values are always available.

### Vehicles

|Domain|Name|Enabled|
|---|---|---|
|Binary sensor|Battery heater|No|
|Binary sensor|Cabin overheat protection actively cooling|No|
|Binary sensor|Charge cable|Yes|
|Binary sensor|Charger has multiple phases|No|
|Binary sensor|Dashcam|No|
|Binary sensor|Front driver door|Yes|
|Binary sensor|Front driver window|Yes|
|Binary sensor|Front passenger door|Yes|
|Binary sensor|Front passenger window|Yes|
|Binary sensor|Preconditioning enabled|No|
|Binary sensor|Preconditioning|No|
|Binary sensor|Rear driver door|Yes|
|Binary sensor|Rear driver window|Yes|
|Binary sensor|Rear passenger door|Yes|
|Binary sensor|Rear passenger window|Yes|
|Binary sensor|Scheduled charging pending|No|
|Binary sensor|Status|Yes|
|Binary sensor|Tire pressure warning front left|No|
|Binary sensor|Tire pressure warning front right|No|
|Binary sensor|Tire pressure warning rear left|No|
|Binary sensor|Tire pressure warning rear right|No|
|Binary sensor|Trip charging|No|
|Binary sensor|User present|Yes|
|Device tracker|Location|Yes|
|Device tracker|Route|Yes|
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
|Binary sensor|Backup capable|Yes|
|Binary sensor|Grid services active|Yes|
|Binary sensor|Grid services enabled|Yes|
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
