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

The **Enphase Envoy** {% term integration %} is used to integrate with the [Enphase IQ Gateway](https://enphase.com/en-us/products-and-services/envoy-and-combiner), a communication device for [Enphase](https://enphase.com/homeowners) solar inverters and batteries. In this documentation, as well as in integration entity names, the Enphase IQ Gateway is commonly referred to as `Envoy`, a name from the conception times of this integration and retained for its compact format.

## Supported devices

This integration works with:

- Older and newer <abbr title="IQ Gateway">Envoy</abbr> models that only have production metrics (such as Envoy-R (LCD), Envoy-S (not metered))
- Newer <abbr title="IQ Gateway">Envoy</abbr> models that offer both production and consumption metrics (such as Envoy-S Metered equipped with <abbr title="current transformers">CT</abbr>).
- Various Enphase IQ Combiner products that have an embedded <abbr title="IQ Gateway">Envoy</abbr>, it will show-up in the same way as the stand-alone one.

## Unsupported devices

This integration does not work with:

- Older Envoy models running firmware before 3.9 which lack a REST API.

## Prerequisites

- The <abbr title="IQ Gateway">Envoy</abbr> must be configured and commissioned.
- The <abbr title="IQ Gateway">Envoy</abbr> must be on your local network with IPV4 connectivity from Home Assistant.
- <abbr title="IQ Gateway">Envoy</abbr> firmware version 3.9 or newer.
- With <abbr title="IQ Gateway">Envoy</abbr> firmware 7 and greater
  - an Enlighten cloud username and password.
  - Home Assistant 2023.9 or newer.

{% include integrations/config_flow.md %}

### Required Manual input

The configuration of an individual Envoy requires you to enter the following information:

{% configuration_basic %}

Host:
  description: "The name or IP address of the Envoy to configure. <br> Will be pre-filled if the Envoy was auto-discovered"
Username:
  description: "For firmware version 7.0 and later, enter your Enlighten cloud username <br> For firmware before 7.0, enter username *installer* without a password."
Password:
  description: "For firmware version 7.0 and later, enter your Enlighten cloud password <br> For firmware before 7.0, with username *installer*, leave blank."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

Options to enable/disable are listed below. Neither of these are set by default nor need to be set for proper functioning of the integration. Setting these options is only required in described circumstances.

{% configuration_basic %}
Collect test fixture data in diagnostics report:
  description: "No/Yes <br> When new features are requested or firmware is upgraded, it can happen that existing test fixtures no longer cover all test cases and new ones are needed. You may be requested to provide data for such test fixtures. If so, and you are willing to provide the data, setting this option enables the collection of test data as part of the [diagnostics report](#fixtures)."
Always use a new connection when requesting data from the Envoy:
  description: "No/Yes <br> Some older Envoy firmware may exhibit connection issues when using the default keep-alive connection and report failures. When set, this option disables the use of keep-alive and builds a new connection at each data request. This makes the communication more reliable for these firmware versions. Reported for the Envoy-R, but may apply to other older firmware versions as well."
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

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
  
  - `Balanced net power consumption` and `lifetime balanced net energy consumption` (grid import - grid export) if either a net-consumption or total-consumption CT is installed. The `balanced net power consumption` value is calculated by the Envoy if a total-consumption CT is used. When a net-consumption CT is installed, it is the same value as the `current net power consumption`, which is enabled by default if the CT is present.
  - Production and consumption sensors for each phase, if <abbr title="current transformers">CT</abbr> are installed on more than 1 phase.
  - Phase net production and net consumption, if <abbr title="current transformers">CT</abbr> are installed on more than 1 phase.
  - Frequency for production and net consumption <abbr title="current transformers">CT</abbr> (aggregate and phase).
  - Voltage for production and net consumption <abbr title="current transformers">CT</abbr> (aggregate and phase).[^1]
  - Current for production and net consumption <abbr title="current transformers">CT</abbr> (aggregate and phase).[^1]
  - Powerfactor for production and net consumption <abbr title="current transformers">CT</abbr> (aggregate and phase).[^1]
  - Metering status for net consumption and production <abbr title="current transformers">CT</abbr> (`normal` | `not-metering` | `check-wiring`) (aggregate and phase).
  - Count of meter status flags active for net consumption and production <abbr title="current transformers">CT</abbr> (aggregate and phase).[^2]

[^1]: For multiphase systems, the Envoy sums the voltages of the phases. This may be valid for split-phase, but for 3-phase systems, use the individual phases rather than the summed value.
[^2]: If this value is non-zero, consult the diagnostic report of the Envoy and look for `raw_data` - `/ivp/meters` - `statusFlags` for set flags (`production-imbalance` | `negative-production` | `power-on-unused-phase` | `negative-total-consumption`).

### With batteries

For Enphase Ensemble systems with the Enpower/IQ System Controller and Encharge/IQ Batteries installed, additional features are available:

- Sensors for battery status and usage
- Sensors for grid status *
- Sensors for the state of the Enpower's four load-shedding relays *
- A switch allowing you to take your system on-grid and off-grid. Note that the Enpower has a slight delay built-in between receiving these commands and actually switching the system on or off grid. *
- A switch allowing you to enable or disable charging the Encharge/IQ batteries from the power grid. **
- Support for changing the battery storage mode between full backup, self-consumption, and savings mode, and setting the reserve battery level for outages. **
- If a storage <abbr title="current transformers">CT</abbr> is installed:
  - Sensors for battery storage energy charged and discharged and current active power discharge/charge
  - Disabled sensors for:
    - Phase battery storage energy charged and discharged and current power discharge/charge
    - Voltage for storage <abbr title="current transformers">CT</abbr> (aggregate and phase)
    - Current for storage <abbr title="current transformers">CT</abbr> (aggregate and phase)
    - Frequency for storage <abbr title="current transformers">CT</abbr> (aggregate and phase)
    - Powerfactor for storage <abbr title="current transformers">CT</abbr> (aggregate and phase)
    - Metering status for storage <abbr title="current transformers">CT</abbr> (aggregate and phase)
    - Count of meter status flags active storage <abbr title="current transformers">CT</abbr> (aggregate and phase)

*: The load shedding and on/off-grid functions are only available with the Enpower/IQ System Controller installed. In battery installations without load-shedding and off-grid functionality, used in many EU countries, these sensors and switches are not available.

**: When used with Enpower/IQ System Controller, the entities to charge from the grid, battery storage mode, and reserve battery level are connected to the Enpower device with the Enpower serial number in their entity and unique IDs. When no Enpower is installed, these are connected to the Envoy itself and the Envoy serial number is used in the IDs.

In multiphase installations with batteries, in countries with phase-balancing grid meters, the battery will export to the grid on one phase the amount it lacks on another phase which pulls the amount from the grid, as if it is using the grid as a 'transport' between phases. Since the grid meter will balance the amount imported and exported on the two phases, the net result is zero. The Envoy multiphase consumption CTs, however, will report the amounts on both phases, resulting in too high export on one and too high import on the other. One may consider using the `lifetime balanced net energy consumption` which is the sum of grid import and export to eliminate this effect. This would require some templating to split these values into import and export values. Alternatively, use the `current net power consumption` or `balanced net power consumption` with a Riemann integral sum helper.

## Envoy authentication requirements

For newer models running firmware 7 and greater, you will need your Enlighten cloud username and password. The integration will use these credentials to obtain an Envoy access token from the Enlighten cloud.

For models running firmware 5 and older, use `installer` for the username. No password is required. The integration will automatically detect the `installer` password.

## Enpower load shedding relays

The Enphase Enpower has 4 load shedding relays that can be used to control non-essential loads in your home. These have two main modes of operation:

### Standard

When the mode entity is set to standard, you can simply set the state of the relay to be powered or not powered for each mode of operation: on grid, off grid, and on generator.

### Battery level

When the relay mode is set to battery level, the relays will turn on and off based on the remaining battery level of your Encharge batteries. Two number entities are available to control the cutoff and restore levels for the relays. When the battery level drops below the cutoff level, the relays will turn off. When the battery level rises above the restore level, the relays will turn back on.

## Data updates

The integration collects data by default every 60 seconds. To customize the collection interval, refer to [defining a custom polling interval](/common-tasks/general/#defining-a-custom-polling-interval). Specify one single entity from the envoy device as target of the action using the `+ choose entity` button. Updating one entity will update all entities of the Envoy and the related devices like the inverters; there is no need to specify multiple or all entities or add (all) inverter entities. When using multiple Envoys, add one entity for each envoy as targets or create separate custom polling intervals with a single entity as needed.

Envoy installations without installed <abbr title="current transformers">CT</abbr>, collect individual solar inverter data every 5 minutes. This collection does not occur for each inverter at the same time in the 5-minute period. Shortening the collection interval will at best show updates for individual inverters quicker, but not yield more granular data.

With installed <abbr title="current transformers">CT</abbr>, data granularity increases and shortening the collection interval can provide more details. The Envoy, however, has no unlimited resources and shortening the collection interval may result in dropped connections, Envoy freeze or restarts. It will require some step-wise tuning for each individual situation.

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

## Actions

Available actions are: `switch.turn_on`, `switch.turn_off`, `switch.toggle`, [`number.set_value`](#action-numberset_value), [`select.select`](#action-selectselect)

### Action `switch.turn_on`/`switch.turn_off`/`switch.toggle`

These actions turn on, off or toggle

- the Enpower device switches `grid_enabled`, `charge_from_grid`
- the [Enpower load shedding relays](#enpower-load-shedding-relays) switch.

| Data attribute | Optional | Description |
| - | - | - |
| `entity_id` | no | Name(s) of entities. For example, `switch.enpower_12345678901001_grid_enabled`. |

Example:

```yaml
action: switch.toggle
target:
  entity_id:
    - switch.enpower_12345678901001_grid_enabled
data: {}

action: switch.turn_on
data: {}
target:
  entity_id:
    - switch.no2
    - switch.nc2
```

### Action `number.set_value`

This action changes the setting for the Enpower `Reserve battery level`.

| Data attribute | Optional | Description |
| - | - | - |
| `entity_id` | no | Name(s) of entities, e.g., `number.enpower_12345678901001_reserve_battery_level`. |
| `value` | no | The target value between 0 and 100 to set Enpower reserve battery level to. |

Example:

```yaml
action: number.set_value
target:
  entity_id: number.enpower_12345678901001_reserve_battery_level
data:
  value: "25"
```

### Action `select.select`

This action changes the:

- Relays relay_mode, grid_action, micro_grid_action or generator_action
- Battery storage mode

| Data attribute | Optional | Description |
| - | - | - |
| `entity_id` | no | Name(s) of entities. For example, `select.nc2_generator_action`. |
| `option` | no | For relay modes: `powered`, `not_powered`, `schedule`, `none`. <br> For storage modes: `backup`, `self_consumption`, `savings` |

Example:

```yaml
action: select.select_option
target:
  entity_id:
    - select.nc2_generator_action
data:
  option: not_powered

action: select.select_option
target:
  entity_id:
    - select.enpower_12345678901001_storage_mode
data:
  option: backup
```

{% note %}
Technically `select.first`, `select.last`, `select.previous`, `select.next` are available as well, but as there's no logical sequence in the values to select, their use is not advocated.
{% endnote %}

## Know issues and limitations

- [Envoy firmware](https://enphase.com/installers/resources/documentation/communication?&f[0]=document%3A217) versions come with changing behavior, features and issues. Firmware is pushed to the Envoy by Enphase, while 'not always communicated in detail upfront'. This may result in sudden changes in the Envoy behavior and is always accompanied by an outage while Envoy is being updated.
- As of Envoy firmware  8.2.4225, the Envoy no longer supports setting battery modes, enabling/disabling charging from the grid, or changing reserve battery level through the local REST API used by HA. Until a resolution is found, you will need to use the Enphase APP to control these.

## Troubleshooting

- The Envoy should not be both on your local LAN and local Wi-Fi at the same time. This may cause auto-discovery to switch back and forth between the interfaces resulting in brief outages every 30 minutes. If you experience these frequent brief outages, make sure only 1 interface is used.

### Debug logs and diagnostics

This integration provides debug log and {% term diagnostics %} report as described in the [Home Assistant troubleshooting pages](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).

#### Debug log

When experiencing issues during the use of the integration, enable the debug log for the <abbr title="IQ Gateway">Envoy</abbr>. Then restart the integration. This will add details on the data collection to the Home Assistant log file. Leave the debug log enabled long enough to capture the occurrence of the issue. If the issue is intermittent, this may take a while and it may grow the log file quite a bit.

If you're expecting features to show but they are not shown, make sure to reload the integration while debug logging is enabled.
When this integration is loaded, it will scan the <abbr title="IQ Gateway">Envoy</abbr> for available features and configure these as needed. Following this initial scan, only data for the found features is collected.  Performing a reload with debug enabled results in the debug log containing the initial full scan to assist with analyzing any missing features. Some features are disabled by default, and you need to enable them if you want them to show. Verify this before starting a debug session.

Once the issue occurred, stop the debug logging again (_download of debug log file will start automatically_). When reporting the issue, include the debug log file as well as a [{% term diagnostics %}](#diagnostics) file.

The debug log will show all communication with the Envoy / IQ Gateway. Lines starting with below examples are log entries for the integration:

```txt
2024-03-07 11:20:11.897 DEBUG (MainThread) [homeassistant.components.enphase_envoy
2024-03-07 11:20:11.898 DEBUG (MainThread) [pyenphase
```

Below a typical data request / reply sequence in the log file. These lines will contain the data details received from the <abbr title="IQ Gateway">Envoy</abbr>.

```txt
... [pyenphase.envoy] Requesting https://192.168.1.2/ivp/meters with timeout ...
... [pyenphase.envoy] Request reply from https://192.168.1.2/ivp/meters status 200:...
```

The end of a collection cycle is marked by:

```txt
... [homeassistant.components.enphase_envoy.coordinator] Finished fetching Envoy 123456 data in 1.234 seconds (success: True)
```

#### Diagnostics

The {% term diagnostics %} data file is a JSON file and includes a `data` section with the details for this integration. The file can be viewed with any text editor. The data section has up to 6 major subsections which reflect how the integration is set up and data is used. Include the file when reporting issues.

Below the 6 subsections, each collapsed.

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

##### Config entry

Shows the integration configuration created when the integration was added.

##### Envoy properties

Shows the conclusions of the initial data scan and what features were identified, including the detected firmware version in the Envoy.

##### Raw data

Shows the data collected from the Envoy during the last data scan when the diagnostic report was created. If in doubt about data shown in the dashboards, consult this section to find the raw data sent by the Envoy. The integration is not modifying this data, it's just providing the data to the entities.

##### Envoy model data

Shows the data of the Envoy extracted from the raw_data into Envoy class data used by the Home Assistant integration. This is a subset of the full raw dataset.

##### Envoy entities by device

Shows all entities created by the integration based on the findings of the initial scan, grouped by device. Entity state based on the last data collection cycle is included. State values here come from the Envoy model data and are the values visible in the dashboards.

##### Fixtures

The data to build test fixtures from. This section is only available when the option to Collect test fixture data is enabled in the integration [options](#options).

___
