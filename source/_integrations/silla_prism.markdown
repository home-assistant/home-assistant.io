---
title: Silla Prism
description: Instructions on how to integrate your Silla Prism EV wallbox with Home Assistant.
ha_category:
  - Car
  - Number
  - Select
  - Sensor
ha_platforms:
  - number
  - select
  - sensor
ha_iot_class: Local Push
ha_codeowners:
  - '@ebaschiera'
ha_release: 2026.8
ha_domain: silla_prism
ha_integration_type: device
ha_config_flow: true
ha_quality_scale: bronze
---

The **Silla Prism** {% term integration %} lets you monitor and control a [Silla Prism](https://silla.industries) electric vehicle wallbox from Home Assistant over its native MQTT protocol. [Silla](https://silla.industries) is an Italian manufacturer of EV charging equipment.

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
{% endconfiguration_basic %}

## Supported functionality

The integration creates a single device with the following entities.

### Sensors

- **Status**: the charging state of the port (idle, waiting, charging, or paused).
- **Power**: power currently delivered to the vehicle.
- **Current**: current currently delivered to the vehicle.
- **Voltage**: measured line voltage.
- **Pilot current**: current signaled to the vehicle over the control pilot.
- **Session energy**: energy delivered during the current charging session.
- **Total energy**: lifetime energy delivered by the Prism.
- **Session time**: duration of the current charging session.
- **Error code**: the port error code (`0` means no error).
- **Temperature**: internal temperature of the Prism.
- **Grid power**: power drawn from the grid; positive values are imports, negative values are exports.

### Controls

- **Charging current** (number): the maximum charging current requested by the user, equivalent to the `+`/`-` buttons on the Prism.
- **Charging mode** (select): switches between **Solar**, **Normal**, and **Paused**.

## Data updates

The Prism pushes an MQTT message whenever a value changes, so entities update in real time. Status topics are retained on the broker, so Home Assistant restores the current values immediately after a restart.

## Known limitations

- Only the first charging port is supported. On a Prism DUO, the second cable is not exposed.
- The current limit used for custom load balancing, the night schedule, and charge authorization are not exposed yet.
- Solar and home power flows are only meaningful when a Powerwall or compatible meter is configured on the Prism; otherwise they report `0`.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
