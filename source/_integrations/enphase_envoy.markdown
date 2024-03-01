---
title: Enphase Envoy
description: Instructions on how to setup Enphase Envoy with Home Assistant.
ha_category:
  - Energy
ha_release: 0.76
ha_iot_class: Local Polling
ha_domain: enphase_envoy
ha_zeroconf: true
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
  - '@cgarwood'
  - '@dgomes'
  - '@joostlek'
  - '@catsmanac'
ha_platforms:
  - binary_sensor
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_integration_type: integration
---

An integration for the [Enphase Envoy](https://enphase.com/en-us/products-and-services/envoy-and-combiner) solar energy gateway. This integration works with older models that only have production metrics (ie. Envoy-C) and newer models that offer both production and consumption metrics (ie. Envoy-S). Firmware version 3.9 or newer is required.

{% include integrations/config_flow.md %}

## Capabilities

This integration will offer various sensors depending on the configuration of your Enphase system. Sensors are available for the following:

- Current energy production & consumption
- Historical energy production & consumption
- Power production per-inverter

_Consumption sensors require your Envoy to be properly configured with consumption CT sensors installed._

For Envoy S Metered / IQ Gateway Metered with installed and configured current transformers (CT), additional features are available:

- Production and consumption sensors for each phase, if <abbr title="current transformers">CT</abbr> are installed on more than 1 phase.
- Sensors for net production (grid export) and net consumption (grid import) if the consumption <abbr title="current transformers">CT</abbr> is a net-consumption <abbr title="current transformers">CT</abbr>.
- Disabled sensors for:
  
  - Phase net production and net consumption.
  - Frequency net consumption <abbr title="current transformers">CT</abbr> (aggregate and phase).
  - Voltage net consumption <abbr title="current transformers">CT</abbr> (aggregate and phase).[^1]
  - Metering status for net consumption and production <abbr title="current transformers">CT</abbr> (`normal` | `not-metering` | `check-wiring`) (Agaregate and phase).
  - Meter status flags active for net consumption and production <abbr title="current transformers">CT</abbr> (aggregate and phase).[^2]

[^1]: For multi-phase systems, the Envoy sums the voltages of the phases. May be valid for split-phase, but for 3-phase systems use the individual phases rather than the summed value.
[^2]: If this value is non-zero, consult the diagnostic report of the Envoy and look for `raw_data` - `/ivp/meters` - `statusFlags` for set flags (`production-imbalance` | `negative-production` | `power-on-unused-phase` | `negative-total-consumption`).

For Enphase Ensemble systems with the Enpower/IQ System Controller and Encharge/IQ Batteries installed, additional features are available:

- Sensors for battery status and usage
- Sensors for grid status
- Sensors for the state of the Enpower's 4 load-shedding relays
- A switch allowing you to take your system on-grid and off-grid. Note that the Enpower has a slight delay built-in between receiving these commands and actually switching the system on or off grid.
- A switch allowing you to enable or disable charging the Encharge/IQ Batteries from the power grid.
- Support for changing the battery storage mode between full backup, self-consumption, and savings mode and setting the reserve battery level for outages.

## Envoy authentication requirements

For newer models running firmware 7 and greater, you will need your Enlighten cloud username and password. The integration will use these credentials to obtain an Envoy access token from the Enlighten cloud.

For models running firmware 5 and older, use `installer` for the username. No password is required. The integration will automatically detect the `installer` password.

## Enpower load shedding relays

The Enphase Enpower has 4 load shedding relays that can be used to control non-essential loads in your home. These have two main modes of operation:

### Standard

When the mode entity is set to standard, you can simply set the state of the relay to be powered or not powered for each mode of operation: on grid, off grid, and on generator.

### Battery level

When the relay mode is set to battery level, the relays will turn on and off based on the remaining battery level of your Encharge batteries. Two number entities are available to control the cutoff and restore levels for the relays. When the battery level drops below the cutoff level, the relays will turn off. When the battery level rises above the restore level, the relays will turn back on.

## Polling interval

The default polling interval is 60 seconds. To customize the polling interval, refer to [defining a custom polling interval](/common-tasks/general/#defining-a-custom-polling-interval). Specify one single entity from the envoy device as target of the service using the `+ choose entity` button. Updating one entity will update all entities of the Envoy and the related devices like the inverters; there is no need to specify multiple or all entities or add (all) inverter entities. When using multiple Envoys, add one entity for each envoy as targets or create separate custom polling intervals with a single entity as needed.

## Credentials update

This integration supports updating configuration by re-adding the integration and specifying the same or new IP address, username, and password. Use this method if your Enlighten credentials or the device's IP address has changed and needs to be updated.

## Energy dashboard

This integration provides several values suitable for the energy dashboard:

- For `Solar production`, use the `Envoy Lifetime energy production` entity.
- For `Grid consumption`, use the `Envoy Lifetime net energy consumption` entity.[^3]
- For `Return to grid`, use the `Envoy Lifetime net energy production` entity.[^3]

[^3]: Only applies when using  Envoy S Metered / IQ Gateway Metered with installed and configured current transformers (<abbr title="current transformers">CT</abbr>).

There are no readily available battery energy sensors for use with the `Home Battery storage`. You can consider using the Encharge  `real_power_mw` entity as an input to Riemann integrators for charge (negative) or discharge (positive) values. As the [polling interval](#polling-interval) is 1 minute, these may be off though.
