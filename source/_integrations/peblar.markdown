---
title: Peblar
description: Instructions on how to integrate Peblar Rocksolid EV Charger with Home Assistant.
ha_category:
  - Car
  - Energy
  - Update
ha_release: 2025.1
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: peblar
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: device
ha_zeroconf: true
ha_quality_scale: platinum
---

The Peblar {% term integration %} integrates your [Peblar Rocksolid EV Charger]
with Home Assistant. Allowing you to monitor the charging status and energy
consumption of your electric vehicle connected to the Peblar charger, while
also providing the ability to add the charger to your Home Assistant
energy dashboard.

[Peblar Rocksolid EV Charger]: https://peblar.com/

## Supported devices

The following rocksolid Pebler EV chargers are supported by this integration:

- Peblar Home
- Peblar Home Plus
- Peblar Business

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Host:
  description: The hostname or IP address of your Peblar charger on your home network.
Password:
  description: The password as used to log in to the Peblar device' local web interface.
{% endconfiguration_basic %}

The above configuration can also be adjusted later via
{% my integrations title="**Settings** > **Devices & services**" %},
click {% icon "mdi:dots-vertical" %} and select **Reconfigure**.

## Use cases

This integration provides all the information about your rock-solid EV charger
from Peblar. There are multiple use cases for this integration, such as:

- Monitoring the charging status of your electric vehicle.
- Adding the charger to your Home Assistant energy dashboard, allowing you to
  monitor the energy consumption of your electric vehicle as part of your home
  energy usage.
- Creating automations, for example:
  - To notify you when the charging of your electric vehicle is complete.
  - Turn off solar-only charging when the expected solar production is not
    sufficient today.
  - Notify when the charger has detected an error or has raised a warning.
- See updates in Home Assistant when there are updates available for your
  Peblar charger.

## Supported functionality

The Peblar integration provides a whole lot of functionality to Home Assistant.
All of them are provided as entities in Home Assistant. Below is an overview of
the entities provided by this integration.

### Binary sensors

The binary sensors provided are used to indicate the health status of the
charger. The following binary sensors are available:

- **Active error**: Indicates if the charger has detected an error. If this
  sensor is on ({% term state %}: `on`) an error has been detected, otherwise, it is off
  ({% term state %}: `off`).
- **Active warning**: Indicates if the charger has raised a warning. If this
- sensor is on ({% term state %}: `on`) a warning has been raised, otherwise, it is off
  ({% term state %}: `off`).

If any of these binary sensors are on, you should check the charger's local
web interface for more information about the error or warning.

{% important %}
These binary sensors are disabled by default. If you want to use them, you need
to enable them first. See the [enabling or disabling entities](/common-tasks/general/#enabling-or-disabling-entities)
documentation for information on how to do this.
{% endimportant %}

### Buttons

The buttons provided by this integration can be used to trigger an action on
the charger. The following buttons are available:

- **Identify**: This button can be used to identify the charger. This can be
  useful if you have multiple chargers and want to identify which one is which.
  Once pressed, the LED on the charger will start blinking for a few seconds.
- **Restart**: This button can be used to restart the charger. This can be
  useful if the charger is not responding as expected.

{% important %}
These buttons are disabled by default. If you want to use them, you need
to enable them first. See the [enabling or disabling entities](/common-tasks/general/#enabling-or-disabling-entities)
documentation for information on how to do this.
{% endimportant %}

### Numbers

This integration provides a single number entity: **Charge limit**.

Using this entity, you can set the maximum current the charger can provide to
your electric vehicle. The value of this entity is in amperes (A).

The minimum value for this entity is 6A, and the maximum value is depending on
your charger's configuration. The value can be set in increments of 1A.

### Selects

This integration provides a single select entity: **Smart charging**.

It reflects the same smart charging state as is shown on the charger's local
web interface, and allows you to control the charging behavior of the charger.

The following options are available:

- **Default** ({% term state %}: `default`): The charger will charge the electric vehicle
  as soon as it is connected.
- **Fast solar** ({% term state %}: `fast_solar`): The charger will fast charge the
  electric vehicle with the overproduction of solar energy, but will also use
  grid power if the solar production is not sufficient.
- **Smart solar** ({% term state %}: `smart_solar`): The charger will charge the electric
  vehicle with the overproduction of solar energy, but will also use grid power
  if the solar production is not sufficient.
- **Pure solar** ({% term state %}: `solar_only`): The charger will only charge the
  electric vehicle with the overproduction of solar energy.
- **Scheduled** ({% term state %}: `scheduled`): The charger will charge the electric
  vehicle according to the schedule configured on the charger.

### Sensors

The Peblar integration provides a lot of sensors to Home Assistant.

{% tip %}
The ability to add your charger to the Home Assistant energy dashboard is
arguably the most useful feature of this integration. It is therefore
recommended to add your Peblar charger to the Home Assistant energy dashboard,
by adding the **Lifetime energy** sensor to the energy dashboard configuration
as a device.
{% endtip %}

- **Current**: The current current (in amperes) the charger is consuming to
  charge your electric vehicle. This is a combined value for all your phases.
  Additionally, three additionally sensors are available, if your charging is
  using multiple phases:
  - **Current Phase 1**\*\*: The current current (in amperes) the charger is
    consuming on phase 1.
  - **Current Phase 2**\*\*: The current current (in amperes) the charger is
    consuming on phase 2.
  - **Current Phase 3**\*\*: The current current (in amperes) the charger is
    consuming on phase 3.
- **Lifetime energy**: The total energy (in kilowatt-hours) consumed by the
  charger since it was installed. **This is the recommended sensor to use in the
  Home Assistant energy dashboard.**
- **Limit source**: The source/origin of the current charging limit that is
  in effect. The source can be one of the following:
  - _Charging cable_ ({% term state %}: `charging_cable`): The current limit is
    the maximum current the charging cable handle.
  - _Current limiter_ ({% term state %}: `current_limiter`): The current limit is
    set by the current limiter.
  - _Dynamic load balancing_ ({% term state %}: `dynamic_load_balancing`): The current
    limit is set by the dynamic load balancing feature.
  - _External power limit_ ({% term state %}: `external_power_limit`): The current
    limit is set by an external power limiter.
  - _Group load balancing_ ({% term state %}: `group_load_balancing`): The current
    limit is set by the group load balancing feature, which is a feature that
    allows multiple chargers to share the available power.
  - _Hardware limitation_ ({% term state %}: `hardware_limitation`): The current limit
    is limited by the hardware of the charger that can't provide more current.
  - _High temperature_ ({% term state %}: `high_temperature`): The current limit is
    limited due to high temperatures.
  - _Household power limit_ ({% term state %}: `household_power_limit`): The current
    limit is set by the household power limit feature, which is a feature that
    allows the charger to limit the current to prevent overloading the household
    power.
  - _Installer limitation_ ({% term state %}: `installer_limitation`): The current
    limit is set by the installer, for example, to prevent overloading the fuse
    of the house.
  - _Local Modbus API_ ({% term state %}: `local_modbus_api`): The current limit is
    set by software using the local Modbus API.
  - _Local REST API_ ({% term state %}: `local_rest_api`): The current limit is set
    by software using the local REST API. Home Assistant uses this API to set
    the current limit, so if you see this state, it means the current limit is
    likely set through Home Assistant.
  - _OCPP smart charging_ ({% term state %}: `ocpp_smart_charging`): The current limit
    is set by the OCPP smart charging feature.
  - _Overcurrent protection_ ({% term state %}: `overcurrent_protection`): The current
    limit is limited due to overcurrent protection.
  - _Phase imbalance_ ({% term state %}: `phase_imbalance`): The current limit is
    limited due to phase imbalance in the electrical installation.
  - _Power factor_ ({% term state %}: `power_factor`): The current limit is limited
    due to a low power factor in the electrical installation.
  - _Solar charging_ ({% term state %}: `solar_charging`): The current limit is set
    by the solar charging feature of the charger. This means the charger is
    awaiting an overproduction of solar energy to start charging.
- **Power**: The current power (in Watts) the charger is consuming to charge
  your electric vehicle. This is a combined value for all your phases.
  Additionally, three additionally sensors are available, if your charging is
  using multiple phases:
  - **Power Phase 1**\*\*: The current power (in Watts) the charger is consuming
    on phase 1.
  - **Power Phase 2**\*\*: The current power (in Watts) the charger is consuming
    on phase 2.
  - **Power Phase 3**\*\*: The current power (in Watts) the charger is consuming
    on phase 3.
- **Session energy**: The total energy (in kilowatt-hours) consumed by the
  charger during the current charging session. This sensor is reset when a
  new charging session starts. While you could, it is **not** recommended to
  use this sensor in the Home Assistant energy dashboard. Use the **Lifetime
  energy** sensor instead.
- **State**: The current state of the charger. The state can be one of the
  following:
  - _Charging_ ({% term state %}: `charging`): The charger is currently charging the
    electric vehicle.
  - _Error_ ({% term state %}: `error`): The charger has detected an error and is
    currently not charging the electric vehicle.
  - _Fault_ ({% term state %}: `fault`): The charger has detected a fault and is
    currently not charging the electric vehicle.
  - _No EV connected_ ({% term state %}: `no_ev_connected`): The charger is currently not
    connected to an electric vehicle.
  - _Suspended_ ({% term state %}: `suspended`): The charger is currently not charging
    the electric vehicle, but is ready to start charging when needed.
  - _Invalid_ ({% term state %}: `invalid`): The charger is in an invalid state.
- **Uptime**\*\*: The total time the charger has been running since the last
  restart. This sensor is reset when the charger is restarted.
- **Voltage**: The current voltage (in volts) the charger is using to charge.
  Only available if your charger is connected to a single-phase power source.
- **Voltage Phase 1**\*\*: The current voltage (in volts) on phase 1. Only
  available if your charger is connected to at least a two-phase power source.
- **Voltage Phase 2**\*\*: The current voltage (in volts) on phase 2. Only
  available if your charger is connected to at least a two-phase power source.
- **Voltage Phase 3**\*\*: The current voltage (in volts) on phase 3.
  Only available if your charger is connected to a three-phase power source.

{% important %}
The sensors marked with \*\* are disabled by default. If you want to use them,
you need to enable them first. See the [enabling or disabling entities](/common-tasks/general/#enabling-or-disabling-entities)
documentation for information on how to do this.
{% endimportant %}

### Switches

This integration provides two switch entities:

- **Charge**: This switch allows you to start or stop/pause the charging of
  your electric vehicle. This can be helpful if you want to temporarily stop
  charging your electric vehicle, for example, to avoid charging during
  expensive peak hours.
- **Force single phase**: This switch can be used to force the charger to use a
  single phase for charging your electric vehicle. This can be useful if you
  want to limit your current draw from the charger to a single phase, for
  example, to prevent overloading your electrical installation.

{% note %}
The **Force single phase** switch is only available if your charger is
connected to multiple phases. If your charger is connected to a single-phase
power source, this switch will not be created.
{% endnote %}

### Updates

The Peblar integration provides two update entities for the Pebler charger:

- **Firmware**: Indicates if there is a firmware update available for the
  charger. The firmware can be thought of as the operating system of the charger.
- **Customization**: Indicates if there is a customization update available for
  the charger. The customization can be thought as the user interface of the
  charger that you see when you log in to the charger's local web interface.

Software updates cannot be installed through Home Assistant. You need to log in
to the charger's local web interface to install the updates.

## Data updates

This integration is a local polling integration, meaning it will check for
changes to all the entities by frequently polling the Peblar charger on your
home network.

There are three different polling frequencies used by this integration:

- **every 10 seconds**: For all sensors and binary sensors, ensuring you
  have the latest insights into your electric vehicle's charging status.
- **every 5 minutes**: It will check for configuration changes to the charger,
  this affects all configuration entities, like the smart charging mode and
  the current limit.
- **every 2 hours**: It will check for updates to the charger itself, ensuring
  you are aware of any updates available for your Peblar charger.

While this integration uses local polling, configuration changes made to the
Peblar charger from Home Assistant will be reflected in the charger almost
instantly.

## Actions

This integration does not provide additional actions. All actions available
for this integration are provided by their respective entities.

## Examples

The following examples show how to use the Peblar integration in Home
Assistant automations. These examples are just a starting point, and you can
use them as inspiration to create your own automations.

Feel free to contribute more examples to this documentation ❤️.

### Notify when there is an software update available

The following example sends a notification to your mobile device when there is
a software update available for your Peblar charger.

```yaml
automation:
  - alias: "Peblar software update available"
    triggers:
      - trigger: state
        entity_id: update.peblar_firmware
        from: "off"
        to: "on"

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "Peblar charger update available!"
          message: >
            There is a software update available for your Peblar charger.
            Please log in to the charger's local web interface to install the
            update.
```

### Notify when an issue is detected

The following example automation will send out a notification when the charger
detects an error or raises a warning.

```yaml
automation:
  - alias: "Peblar issue detected"
    triggers:
      - trigger: state
        entity_id:
          - binary_sensor.peblar_active_error
          - binary_sensor.peblar_active_warning
        from: "off"
        to: "on"
      - trigger: state
        entity_id: sensor.peblar_state
        to:
          - "error"
          - "fault"

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "Peblar charger issue detected!"
          message: >
            An issue with your Peblar charger has been detected. Please check
            the charger's local web interface for more information.
```

## Known limitations

Not all functionality of the Peblar charger is available through this
integration. The following limitations are known:

- The Peblar APIs currently aren't communicating that the charger is awaiting
  authentication (for example, using an RFID card) before it can start
  charging. As a result, you will see a suspended charging status in Home
  Assistant, while the charger is awaiting authentication.
- Home Assistant uses and manages the charger's REST API. This means that
  the use of this integration will enable the REST API on the charger
  automatically. It is possible to use the REST API directly in parallel
  with this integration.
- Peblar is also sold as white-label products, like the [CoolBlue BlueBuilt](https://www.coolblue.nl/en/charging-stations/our-charging-stations), [Eneco Connectric®](https://www.eneco.nl/campagnes/laadpalen/) or [Shell Recharge](https://www.shell.nl/b2b-business/shell-fleet-solutions/electric-charging/at-home-ev-charging.html#thuisladers).
  This integration is tested with the Peblar branded products, and it is unknown
  if it works with white-label products.

## Troubleshooting

There are no commonly known issues with this integration.

## Removing the integration

This integration follows standard integration removal. No extra steps are
required.

{% include integrations/remove_device_service.md %}
