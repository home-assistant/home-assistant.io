---
title: Silla Prism
description: Instructions on how to integrate your Silla Prism EV wallbox with Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Car
  - Number
  - Select
  - Sensor
  - Switch
ha_platforms:
  - binary_sensor
  - button
  - number
  - select
  - sensor
  - switch
ha_iot_class: Local Push
ha_codeowners:
  - '@ebaschiera'
ha_release: 2026.9
ha_domain: silla_prism
ha_integration_type: device
ha_config_flow: true
ha_quality_scale: bronze
---

The **Silla Prism** {% term integration %} lets you monitor and control a [Silla Prism](https://silla.industries) electric vehicle wallbox from Home Assistant over its native MQTT protocol. [Silla](https://silla.industries) is an Italian manufacturer of EV charging equipment.

Besides monitoring the charging session, the integration can control the Prism current limit and port mode, expose touch gestures from the wallbox, and optionally balance EV charging against photovoltaic surplus and a home battery.

## Prerequisites

This integration communicates with the Prism through an MQTT broker; the wallbox itself acts as an MQTT client. Before adding it, you need:

1. The [MQTT integration](/integrations/mqtt/) set up in Home Assistant with a broker.
2. MQTT enabled on the Prism, pointed at the same broker. Configure it in the **Silla** app, under the device's MQTT settings, and note the **base topic** (the default is `prism`).

The base topic is configurable in the Silla app, so it can differ between installations. Whatever value you set there must match the one Home Assistant uses.

{% include integrations/config_flow.md %}

When the Prism reconnects to the broker, it announces itself and Home Assistant offers to set it up automatically. Automatic discovery only works when the base topic is left at its default value (`prism`), because the discovery topic is fixed. If you changed the base topic in the Silla app, add the integration manually and enter that topic instead.

To use more than one Prism, give each unit its own base topic in the Silla app, then add each one separately. Units that share the same base topic publish to the same MQTT topics and cannot be told apart.

{% configuration_basic %}
Base topic:
  description: "The MQTT topic prefix the Prism publishes to, as configured in the Silla app. It must match exactly, without a trailing slash. The default is `prism`."
Number of available ports:
  description: "Number of physical Prism outputs. Use `1` for a single Prism and `2` for a Prism DUO."
Maximum settable current:
  description: "Upper current limit that Home Assistant may send to the Prism, from 6 A to 32 A."
Solar battery balancing:
  description: "Enable entities that calculate photovoltaic surplus and automatically adjust the Prism current while the port is in solar mode."
Battery power sensor:
  description: "Home Assistant sensor that reports the home battery charge or discharge power in W. It is required when solar battery balancing is enabled."
Solar production sensor:
  description: "Optional Home Assistant sensor that reports photovoltaic production in W. Use it together with the home load sensor when the Prism solar power topic is not populated."
Home load sensor:
  description: "Optional Home Assistant sensor that reports house consumption in W."
Home load sensor includes the EV charger:
  description: "Enable this when the home load sensor is a total-load sensor that also includes EV charging. The balancer subtracts EV power before calculating surplus."
Battery SOC sensor:
  description: "Optional Home Assistant sensor for the home battery state of charge in percent. When provided, the reserve power changes at the configured SOC thresholds."
Battery discharge is a positive value:
  description: "Controls the sign convention for the battery power sensor. Enable it when positive values mean discharge and negative values mean charge."
Solar balance dry run:
  description: "Calculate and expose the balancing decision without sending current or mode commands to the Prism."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one device per configured Prism or charging port with the following entities.

### Sensors

- **Solar balance status**: Current state of the optional solar battery balancer.
- **Solar surplus current**: Current that the available surplus can support.
- **Stable surplus countdown**: Remaining time before charging can restart after surplus becomes stable.
- **Calculated total surplus**: Power considered available for EV charging after grid, home load, PV and battery reserve calculations.
- **Calculated target current**: Current the balancer wants to set on the Prism.
- **Decision reason** and **Decision summary**: Diagnostics explaining why the balancer is waiting, holding at 6 A, ramping, or charging from surplus.
- **Status**: The charging state of the port (idle, waiting, charging, or paused).
- **Power**: Power currently delivered to the vehicle.
- **Current**: Current currently delivered to the vehicle.
- **Voltage**: Measured line voltage.
- **Pilot current**: Current signaled to the vehicle over the control pilot.
- **Session energy**: Energy delivered during the current charging session.
- **Total energy**: Lifetime energy delivered by the Prism.
- **Session start**: When the vehicle was connected. The Prism only reports the elapsed session time, once a minute, so Home Assistant derives the start time from it. The frontend then shows a duration that stays accurate between updates. It is unknown while no vehicle is connected, and the clock keeps running while charging is paused.
- **Error**: The fault reported by the port. The Prism MQTT protocol only documents the "no error" condition, so any other code is reported as unknown.
- **Temperature**: Internal temperature of the Prism.
- **Grid power**: Power drawn from the grid. Positive values are imports, negative values are exports.

### Binary sensors

- **Connection status**: Whether retained MQTT status has been received recently.
- **Error status**: Whether the port reports an error code.
- **Single touch**, **Double touch**, and **Long touch**: Short-lived entities that turn on when the Prism touch input reports the matching gesture.

### Numbers

- **Current limit**: Current limit sent to the Prism port.
- **Current limited by user**: User maximum current used by the Prism and by the balancer.

### Selects

- **Set port output mode**: Changes the Prism port mode. Available options are **Solar**, **Normal**, **Paused**, and **Hybrid**.

### Switches

- **Solar battery balancing**: Enables or disables automatic current control from photovoltaic surplus and home battery data. The balancer only sends commands while the Prism port is in solar mode. If charging was stopped because surplus was too low, it restarts from 6 A instead of jumping to the previously reported current.

### Buttons

- **Set mode traps auth** and **Set mode traps noauth**: Send the Prism authorization trap commands.

## Data updates

The Prism pushes an MQTT message whenever a value changes, so entities update in real time. Status topics are retained on the broker, so Home Assistant restores the current values immediately after a restart. The session time is the exception: the Prism publishes it without the retain flag, about once a minute, so the session start sensor stays unknown for up to a couple of minutes after a restart.

When solar battery balancing is enabled, Home Assistant also listens to the configured battery, solar production, home load, and battery SOC sensors. Any change to those sensors or to the Prism MQTT status causes the balancer to recalculate the current limit.

## Known limitations

- The fixed MQTT discovery topic only discovers devices that use the default `prism` base topic. Add devices with custom base topics manually.
- Solar and home power flows are only meaningful when a Powerwall, compatible meter, or matching Home Assistant sensors are configured.
- Solar battery balancing depends on accurate external power sensors. If those sensors are unavailable, the balancer waits and does not change the charging current.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
