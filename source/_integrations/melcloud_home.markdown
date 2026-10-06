---
title: MELCloud Home
description: Instructions on how to integrate MELCloud Home with Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Number
  - Sensor
  - Switch
  - Water heater
ha_release: 2026.7
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@erwindouna'
ha_domain: melcloud_home
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - number
  - sensor
  - switch
  - water_heater
ha_integration_type: hub
ha_quality_scale: silver
---

The **MELCloud Home** {% term integration %} connects Home Assistant to [MELCloud Home](https://www.melcloudhome.com/), Mitsubishi Electric's cloud service for managing their air conditioning and heat pump products.

## Use cases

- Control your air conditioners and heat pump zones from Home Assistant dashboards, scripts, and automations.
- Turn off the air conditioning when a window opens, or when nobody is home.
- Track the monthly energy consumption of your units in the energy dashboard.
- Get notified when a unit reports an error.

## Supported devices

The integration supports the Mitsubishi Electric units you have added to your MELCloud Home account:

- **Air-to-Air (ATA) units**: air conditioners and air-to-air heat pump indoor units.
- **Air-to-Water (ATW) units**: air-to-water heat pumps, such as the Ecodan range, with one or two heating zones and an optional hot water tank.

MELCloud Home is a different service than the classic MELCloud. If you use the classic MELCloud app, use the [MELCloud](/integrations/melcloud/) integration instead.

## Prerequisites

During setup of the integration, you will need the following information:

- The email address you used to create your MELCloud Home account
- The password associated with the MELCloud Home account

Your units must already be added to your account in the MELCloud Home app.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
    description: "The email address you used to create your MELCloud Home account."
Password:
    description: "The password associated with the MELCloud Home account."
{% endconfiguration_basic %}

To change the email address or password later, reconfigure the integration.

## Supported functionality

The **MELCloud Home** {% term integration %} creates a device for each unit, with the following entities. Some entities are only created when the unit reports that it supports the feature.

### Binary sensors

For both Air-to-Air and Air-to-Water units:

- **Error**: Indicates if the unit reported an error.
- **Standby**: Indicates if the unit is in standby mode.
- **Holiday mode**: Indicates if holiday mode is enabled.
- **Frost protection**: Indicates if frost protection is enabled.
- **Overheat protection**: Indicates if overheat protection is enabled.

For Air-to-Water units only:

- **Forced hot water**: Indicates if forced hot water mode is active.

### Climate

The integration creates one climate entity per Air-to-Air unit and one per Air-to-Water zone.

#### Air-to-Air (ATA) units

Each air conditioner or heat pump indoor unit is exposed as a climate entity with the following capabilities (availability depends on the physical unit):

- **HVAC modes**: Off, Heat, Cool, Auto, Dry, Fan only
- **Fan speed**: Auto, Speed 1–5 (depending on the number of speeds of your unit)
- **Vertical vane**: Auto, Swing, Position 1–5
- **Horizontal vane**: Auto, Swing, Left, Left centre, Centre, Right centre, Right
- **Target temperature**
- **Current room temperature**

#### Air-to-Water (ATW) units

Each heating zone of an air-to-water heat pump is exposed as a separate climate entity, named **Zone 1** and **Zone 2**. Zone 2 is only created when the unit reports zone 2 support.

- **HVAC modes**: Off, Heat, Cool (if supported by the unit)
- **HVAC action**: Heating, Cooling, Idle (while the unit is stopped or heating the hot water tank), or Off
- **Target temperature** (per zone)
- **Current room temperature** (per zone)

### Numbers

For both Air-to-Air and Air-to-Water units:

- **Frost protection minimum temperature** and **Frost protection maximum temperature**: The temperature range of the frost protection, between 0 °C and 30 °C.
- **Overheat protection minimum temperature** and **Overheat protection maximum temperature**: The temperature range of the overheat protection, between 31 °C and 40 °C for Air-to-Air units, and between 20 °C and 60 °C for Air-to-Water units.

These numbers are only available while the matching protection is enabled. The minimum temperature must stay below the maximum temperature.

### Sensors

For both Air-to-Air and Air-to-Water units:

- **Energy consumed (monthly)**: The energy the unit used in the current month. Only created for units with an energy meter.
- **Signal strength**: The Wi-Fi signal strength of the unit. This entity is disabled by default.

For Air-to-Air units only:

- **Room temperature**: The current measured room temperature.
- **Outdoor temperature**: The temperature measured by the outdoor unit. Only created for units with an outdoor temperature sensor.

For Air-to-Water units only:

- **Zone 1 room temperature** and **Zone 2 room temperature**: The room temperature of each zone. Zone 2 is only created when the unit reports zone 2 support.
- **Tank water temperature**: The current measured tank water temperature.
- **Operation status**: What the heat pump is doing: **Idle**, **Heating water**, **Heating zones**, or **Cooling**.

### Switches

For both Air-to-Air and Air-to-Water units:

- **Frost protection**: Turns the frost protection on or off.
- **Overheat protection**: Turns the overheat protection on or off.
- **Standby**: Puts the unit in or out of standby mode. Only created for units that support standby.

### Water heater

Air-to-Water units with a hot water tank get a **Hot water** water heater:

- **Target temperature**: The tank water temperature to heat to, within the limits reported by the unit.
- **Operation mode**: **Heat pump** for normal operation, or **High demand** to force hot water, which heats the tank with priority over the heating zones.

The water heater shows as off while the unit is powered off or in standby. It can't turn the unit on or off, as that would also affect the heating zones. To see whether the tank is being heated right now, use the **Operation status** sensor.

## Data updates

The integration {% term polling polls %} the MELCloud Home API every 60 seconds for the state of your units. The energy consumption and outdoor temperature are fetched every 15 minutes.

Units you add to or remove from your MELCloud Home account are added to or removed from Home Assistant automatically.

## MELCloud Home automation examples

Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Turn off the air conditioning when a window opens

Turn off the air conditioning when a window has been open for 2 minutes, so you don't cool or heat the outdoors.

- **Trigger**: Entity: the window sensor turns on, for 2 minutes
- **Action**: Climate: turn off the air conditioning

{% details "YAML example for turning off the air conditioning when a window opens" %}

{% example %}
automation: |
  alias: "Turn off the air conditioning when the window opens"
  triggers:
    - trigger: state
      entity_id: binary_sensor.living_room_window
      to: "on"
      for:
        minutes: 2
  actions:
    - action: climate.turn_off
      target:
        entity_id: climate.living_room_ac
{% endexample %}

{% enddetails %}

### Automation: Notify when a unit reports an error

Get a notification on your phone when a unit reports an error.

- **Trigger**: Entity: the **Error** binary sensor of the unit turns on
- **Action**: Notifications: send a notification message to your phone

{% details "YAML example for a notification when a unit reports an error" %}

{% example %}
automation: |
  alias: "Notify when the air conditioning reports an error"
  triggers:
    - trigger: state
      entity_id: binary_sensor.living_room_ac_error
      to: "on"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_phone
      data:
        title: "Air conditioning"
        message: >-
          The living room air conditioning reported an error.
          Check the MELCloud Home app for details.
{% endexample %}

{% enddetails %}

## Known limitations

- The integration uses the cloud. It doesn't work without an internet connection, and changes you make with the remote control or the MELCloud Home app can take up to 60 seconds to show up in Home Assistant.
- An Air-to-Water zone in heat mode is shown as **Heat**, whether the unit controls on room temperature, flow temperature, or heating curve. Setting the zone to **Heat** or **Cool** from Home Assistant always selects room temperature control.
- The monthly energy consumption starts counting at midnight UTC on the first day of the month.

## Troubleshooting

### Can't set up the integration

Check that you can sign in to the MELCloud Home app with the same email address and password. If you use the classic MELCloud app, use the [MELCloud](/integrations/melcloud/) integration instead.

### The integration asks you to re-authenticate

This happens when your password changed or your login is no longer accepted. Follow the re-authentication prompt on the integration and enter your current password.

### An entity is missing

Some entities are only created when your unit reports that it supports the feature, such as the energy meter, the outdoor temperature sensor, zone 2, or standby mode. Check the capabilities of your unit in the MELCloud Home app.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
