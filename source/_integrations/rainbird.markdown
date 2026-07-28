---
title: Rain Bird
description: Instructions on how to integrate your Rain Bird LNK WiFi Module within Home Assistant.
ha_category:
  - Binary sensor
  - Calendar
  - Irrigation
  - Sensor
  - Switch
  - Valve
ha_config_flow: true
ha_release: 0.61
ha_iot_class: Local Polling
ha_codeowners:
  - '@konikvranik'
  - '@allenporter'
ha_domain: rainbird
ha_platforms:
  - binary_sensor
  - calendar
  - number
  - sensor
  - switch
  - valve
ha_integration_type: hub
---

The **Rain Bird** {% term integration %} allows interacting with [LNK WiFi](https://www.rainbird.com/products/lnk-wifi-module) module of the Rain Bird Irrigation system in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Calendar](#calendar)
- [Number](#number)
- [Switch](#switch)
- [Valve](#valve)

Home Assistant allows you to control the irrigation values, log details about
the device including optional rain sensor, and allow you to view any upcoming
irrigations schedules on a calendar.

## Prerequisites

1. Follow the Rain Bird instructions for set up of your sprinkler system
1. Follow the setup guide for installing your LNK WiFi Module
1. Complete the necessary steps in the Rain Bird App
1. Home Assistant should auto discover the device on your network based on the mac address. Otherwise you will need to know the devices IP address on your network to let Home Assistant know how to connect to it.

{% include integrations/config_flow.md %}


{% configuration_basic %}
Host:
  description: "The IP address of your Rain Bird device. You can find the IP address under the device in the Rain Bird app under **Controller Settings** > **Network Info**."
Password:
  description: "The password used to authenticate the Rain Bird device."
{% endconfiguration_basic %}

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Default irrigation time:
  description: The number of minutes that the irrigation will run when turning on a zone switch or opening a zone valve. The default is 6 minutes. This can be overridden with an action (see below).
Zone entity type:
  description: >
    Choose whether irrigation zones are exposed as **Switch** entities or **Valve** entities.
    The default is **Switch**, which preserves existing behavior.
    Changing this option and saving will reload the integration, removing the old entities and
    creating new ones of the selected type.
{% endconfiguration_basic %}

## Data updates

The Rain Bird integration fetches available irrigation zones once, then polls
every minute to check the current state of each valve. The irrigation schedule
calendar is only fetched every 15 minutes.

## Supported functionality

### Entities

The Rain Bird integration provides the following entities.

#### Binary sensor

- **Rain sensor**
  - **Description**: The rain sensor will tell if you if the device has detected rain. 
  - **Available for devices**: The rain sensor is an optional add-on for the device purchased from Rain Bird.

#### Calendar

- **Controller irrigation schedule**
  - **Description**: The irrigation schedule {% term calendar %}
    entity is created for each schedule configured in the Rain Bird app. You can view the program schedule
    in the Home Assistant calendar UI, or trigger other automations based on the irrigation start or end time.
  - **Available for devices**: Only available for Rain Bird devices irrigation schedules.

#### Number

- **Rain Delay**
  - **Description**: Lets you set and view the number of days, if any, the automatic irrigation schedule has 
    been delayed due to rain. You may use the number entity with an automation such as increasing the number
    of days to delay irrigation when combined with another weather forecast integration in Home Assistant.
  - **Available for devices**: Only available for Rain Bird devices irrigation schedules.

#### Switch

- **Irrigation Zone**
  - **Description**: Switches are automatically added for all available zones of
    configured controllers when the **Zone entity type** configuration option is set to **Switch** (default).
    Turning on the switch will open the irrigation valve for that zone.
  - **Available for devices**: All

#### Valve

- **Irrigation Zone**
  - **Description**: Valve entities are added for all available zones of configured controllers
    when the **Zone entity type** configuration option is set to **Valve**.
    Opening the valve will start irrigation for that zone.
  - **Available for devices**: All

{% include integrations/actions.md %}

## Known Limitations

The new Rain Bird 2.0 App and Firmware is not compatible with Home Assistant.
The upgrade process will migrate devices to require use of the new Rain Bird
IQ4 cloud, and Home Assistant will not be able to access the device.

The Rain Bird LNK WiFi can only receive one incoming request at a time. It may
not be possible for Home Assistant to send commands to the device while you
are also using the Rain Bird App. Home Assistant tries to carefully limit
connections to the device to avoid failures.

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
