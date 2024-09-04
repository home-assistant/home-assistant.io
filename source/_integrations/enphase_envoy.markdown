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

An integration for the [Enphase Envoy](https://enphase.com/en-us/products-and-services/envoy-and-combiner) solar energy gateway. This integration works with older models that only have production metrics (ie. Envoy-C) and newer models that offer both production and consumption metrics (ie. Envoy-S).

## Prerequisites

- The Envoy must be configured and commissioned.
- The Envoy must be on your local network with IPV4 connectivity from Home Assistant.
- Envoy firmware version 3.9 or newer.
- With Envoy firmware 7 and greater
  - an Enlighten cloud username and password.
  - Home Assistant 2023.9 or newer.

{% include integrations/config_flow.md %}

## Capabilities

This integration will offer various sensors depending on the configuration of your Enphase system. Sensors are available for the following:

- Current energy production & consumption
- Historical energy production & consumption
- Power production per-inverter

_Consumption sensors require your Envoy to be properly configured with consumption <abbr title="current transformers">CT</abbr> sensors installed._

### With current transformers

For Envoy S Metered / IQ Gateway Metered with installed and configured current transformers (CT), additional features are available:

- Sensors for net production (grid export) and net consumption (grid import) if the consumption <abbr title="current transformers">CT</abbr> is a net-consumption <abbr title="current transformers">CT</abbr>.
- Disabled sensors for:
  
  - Production and consumption sensors for each phase, if <abbr title="current transformers">CT</abbr> are installed on more than 1 phase.
  - Phase net production and net consumption, if <abbr title="current transformers">CT</abbr> are installed on more than 1 phase.
  - Frequency net consumption <abbr title="current transformers">CT</abbr> (aggregate and phase).
  - Voltage net consumption <abbr title="current transformers">CT</abbr> (aggregate and phase).[^1]
  - Metering status for net consumption and production <abbr title="current transformers">CT</abbr> (`normal` | `not-metering` | `check-wiring`) (aggregate and phase).
  - Count of meter status flags active for net consumption and production <abbr title="current transformers">CT</abbr> (aggregate and phase).[^2]

[^1]: For multiphase systems, the Envoy sums the voltages of the phases. This may be valid for split-phase, but for 3-phase systems, use the individual phases rather than the summed value.
[^2]: If this value is non-zero, consult the diagnostic report of the Envoy and look for `raw_data` - `/ivp/meters` - `statusFlags` for set flags (`production-imbalance` | `negative-production` | `power-on-unused-phase` | `negative-total-consumption`).

### With batteries

For Enphase Ensemble systems with the Enpower/IQ System Controller and Encharge/IQ Batteries installed, additional features are available:

- Sensors for battery status and usage
- Sensors for grid status (*)
- Sensors for the state of the Enpower's four load-shedding relays (*)
- A switch allowing you to take your system on-grid and off-grid. Note that the Enpower has a slight delay built-in between receiving these commands and actually switching the system on or off grid. (*)
- A switch allowing you to enable or disable charging the Encharge/IQ batteries from the power grid. (*)
- Support for changing the battery storage mode between full backup, self-consumption, and savings mode and setting the reserve battery level for outages.
- If a storage <abbr title="current transformers">CT</abbr> is installed:
  - Sensors for battery storage energy charged and discharged and current active power discharge/charge
  - Disabled sensors for:
    - Phase battery storage energy charged and discharged and current power discharge/charge
    - Voltage storage <abbr title="current transformers">CT</abbr> (aggregate and phase)
    - Metering status for storage <abbr title="current transformers">CT</abbr> (aggregate and phase)
    - Count of meter status flags active storage <abbr title="current transformers">CT</abbr> (aggregate and phase)

The load shedding and on/off-grid functions marked (*) are only available with the Enpower/IQ System Controller installed. In battery installations without off-grid functionality, used in many EU countries, these off-grid related sensors and switches are not available.

In multiphase installations with batteries, in countries with phase-balancing grid meters, the battery will export to the grid on one phase the amount it lacks on another phase, as if it is using the grid as a 'transport' between phases. Since the grid meter will balance the amount in and exported on the two phases, the net result is zero. The Envoy multiphase consumption CTs, however, will report the amounts on both phases, resulting in too high export on one and too high import on the other. One needs to use the sum of grid import and export to eliminate this effect.

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

The default polling interval is 60 seconds. To customize the polling interval, refer to [defining a custom polling interval](/common-tasks/general/#defining-a-custom-polling-interval). Specify one single entity from the envoy device as target of the action using the `+ choose entity` button. Updating one entity will update all entities of the Envoy and the related devices like the inverters; there is no need to specify multiple or all entities or add (all) inverter entities. When using multiple Envoys, add one entity for each envoy as targets or create separate custom polling intervals with a single entity as needed.

## Credentials or device IP address update

This integration supports updating the Envoy configuration through a `reconfigure` menu option. The reconfiguration allows for changing the Envoy IP address, username, and/or password. Use this menu option if your Enlighten credentials or the device's IP address has changed and needs to be manually updated. The latter is typically automatically detected and updated.

Use this menu option also when an Envoy firmware upgrade requires a switch from local Envoy username/password to token-based authentication with Enlighten username/password (refer to [authentication requirements](#envoy-authentication-requirements)).

## Energy dashboard

This integration provides several values suitable for the energy dashboard:

- For `Solar production`, use the `Envoy Lifetime energy production` entity.
- For `Grid consumption`, use the `Envoy Lifetime net energy consumption` entity.[^3]
- For `Return to grid`, use the `Envoy Lifetime net energy production` entity.[^3]
- For `Energy going into the battery`, use the the `Envoy Lifetime battery energy charged` entity.[^5]
- For `Energy coming out off the battery`, use the the `Envoy Lifetime battery energy discharged` entity.[^5]

[^3]: Only applies when using  Envoy S Metered / IQ Gateway Metered with installed and configured <abbr title="current transformers">CT</abbr>.

[^5]: Only applies when using  Envoy S Metered / IQ Gateway Metered / IQ Combiner with installed and configured storage / battery <abbr title="current transformers">CT</abbr>.

## Configure

The integration provides a `configure` menu to configure the following options:

- Collect test fixture data in [diagnostics report](#diagnostics) - No/Yes

## Debug logs and diagnostics

This integration provides debug logs and diagnostics reports as described in the [Home Assistant troubleshooting pages](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).

### Debug log

When experiencing issues during the use of the integration, enable the debug log for the Envoy / IQ Gateway. This will add details on the data collection to the Home Assistant log file. Leave the debug log enabled long enough to capture the occurrence of the issue. If the issue is intermittent, this may take a while and it may grow the log file quite a bit.

If you're expecting features to show but they are not shown, reload the integration while debug logging is enabled.
When this integration is loaded, it will scan the Envoy / IQ Gateway for available features and configure these as needed. Following this initial scan, only data for the found features is collected.  Performing a reload with debug enabled results in the debug log containing the initial full scan to assist with analyzing any missing features. Some features are disabled by default, and you need to enable them if you want them to show. Verify this before starting a debug session.

The debug log will show all communication with the Envoy / IQ Gateway. Lines starting with entities are log entries for the integration:

```txt
2024-03-07 11:20:11.897 DEBUG (MainThread) [homeassistant.components.enphase_envoy
2024-03-07 11:20:11.898 DEBUG (MainThread) [pyenphase.envoy
```

Below a typical data request / reply sequence in the log file. These lines will contain the data details received from the Envoy / IQ Gateway.

```txt
... [pyenphase.envoy] Requesting https://192.168.1.2/ivp/meters with timeout ...
... [pyenphase.envoy] Request reply from https://192.168.1.2/ivp/meters status 200:...
```

The end of a collection cycle is marked by:

```txt
... [homeassistant.components.enphase_envoy.coordinator] Finished fetching Envoy 123456 data in 1.234 seconds (success: True)
```

### Diagnostics

The diagnostics file is a JSON file and includes a `data` section with the details for this integration. The file can be viewed with any text editor[^4]. The data section has up to 6 major subsections which reflect how the integration is set up and data is used.

When new features are requested or firmware is upgraded, it can happen that existing test fixtures no longer cover all test cases and new ones are needed. It may happen, you are requested to provide data for such test fixtures. The diagnostics report can provide the needed information to build such test fixtures. By default, the diagnostics report does not include this data. To include the test fixture data, enable this option in the integration [configure](#configure) menu. When this option is enabled, the creation of the diagnostic report may take longer as it will perform a scan of the Envoy. When done creating the report, clear the option to prevent this delay the next time a diagnostic report is created. The option has no impact on the integration's performance, only on the time it takes to create the report.

Below the 6 subsections, each collapsed.

[^4]: Use of a JSON-aware viewer is not required but makes inspecting the file easier.

```JSON
  "data": {
    "config_entry": { ...
    },
    "envoy_properties": { ...
    },
    "raw_data": { ...
    },
    "envoy_model_data": { ...
    },
    "envoy_entities_by_device": [ ...
    ],
    "fixtures" : { ...
    }
  }
}    
```

#### Config entry

Shows the integration configuration created when the integration was added.

#### Envoy properties

Shows the conclusions of the initial data scan and what features were identified, including the detected firmware version in the Envoy.

#### Raw data

Shows the data collected from the Envoy during the last data scan when the diagnostic report was created. If in doubt about data shown in the dashboards, consult this section to find the raw data sent by the Envoy. The integration is not modifying this data, it's just providing the data to the entities.

#### Envoy model data

Shows the data of the Envoy extracted from the raw_data into Envoy class data used by the Home Assistant integration. This is a subset of the full raw dataset.

#### Envoy entities by device

Shows all entities created by the integration based on the findings of the initial scan, grouped by device. Entity state based on the last data collection cycle is included. State values here come from the Envoy model data and are the values visible in the dashboards.

#### Fixtures

The data to build test fixtures from. This section is only available when the option to provide this is enabled in the integration [configuration](#configure). Information is collected from the envoy in a scan for known and needed endpoints. Data is collected to enable the developers to build test fixtures from it.
