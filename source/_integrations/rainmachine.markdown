---
title: RainMachine
description: Instructions on how to integrate RainMachine units within Home Assistant.
ha_category:
  - Binary sensor
  - Irrigation
  - Sensor
  - Switch
  - Update
ha_release: 0.69
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: rainmachine
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - select
  - sensor
  - switch
  - update
ha_zeroconf: true
ha_homekit: true
ha_integration_type: device
---

The RainMachine integration is the main integration to integrate all platforms related to [RainMachine smart Wi-Fi sprinkler controllers](https://www.rainmachine.com/).

There is currently support for the following device types within Home Assistant:

- Binary sensor
- Button
- Sensor
- [Switch](#switch)

Note that some entities are disabled by default. If you are missing a sensor or binary sensor, check the configured integration!

{% include integrations/config_flow.md %}

## Configuration Options

The integration has two configuration options: 

1. "Default Zone Run Time": sets a default duration when turning on a zone switch (default: 600 seconds). This can be overriden with an action (see below). 
2. "Use Run Times from App": if enabled, will use the zone-specific run times from the last time the zone was turned on manually in the RainMachine App – this allows you to set per-zone default times using the RainMachine app instead of the same default time for all zones.

## Actions

Actions accept either device IDs or entity IDs, depending on the nature of the action:

- Actions that require a device ID as a target:
  - `rainmachine.pause_watering`
  - `rainmachine.push_flow_meter_data`
  - `rainmachine.push_weather_data`
  - `rainmachine.restrict_watering`
  - `rainmachine.stop_all`
  - `rainmachine.unpause_watering`
  - `rainmachine.unrestrict_watering`
- Action that require an entity ID as a target (note that the correct entity ID type must be provided, such as a program for a program-related action)
  - `rainmachine.start_program`
  - `rainmachine.start_zone`
  - `rainmachine.stop_program`
  - `rainmachine.stop_zone`

### `rainmachine.pause_watering`

Pause all watering activities for a number of seconds. After the pause is complete, the previous watering activities will resume. Note that controllers can only be paused for a maximum of 12 hours.

| Data attribute | Optional | Description                    |
| ---------------------- | -------- | ------------------------------ |
| `seconds`              | no       | The number of seconds to pause |

### `rainmachine.push_flow_meter_data`

Push Flow Meter data from Home Assistant to the RainMachine device.

| Data attribute | Optional | Description                                                                                                |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `value`                | no       | The flow meter value to send. May be any positive number.                                                  |
| `unit_of_measurement`  | yes      | The flow meter units to send. String must be one of "clicks", "gal", "litre", or "m3"  (default: "litre"). |

### `rainmachine.push_weather_data`

Push Weather Data from Home Assistant to the RainMachine device.

Local Weather Push service should be enabled from Settings > Weather > Developer tab for RainMachine to consider the values being sent. Units must be sent in metric; no conversions are performed by the integration. Note: RAIN and QPF values shouldn't be sent as cumulative values but the measured/forecasted values for each hour or day. The RainMachine Mixer will sum all RAIN or QPF values in the current day to have the day total RAIN or QPF.

See details of RainMachine API here:
<https://rainmachine.docs.apiary.io/#reference/weather-services/parserdata/post>

| Data attribute | Optional | Description                                                                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `timestamp`            | no       | UNIX Timestamp for the Weather Data. If omitted, the RainMachine device's local time at the time of the call is used. |
| `mintemp`              | no       | Minimum Temperature (°C)                                                                                              |
| `maxtemp`              | no       | Maximum Temperature (°C)                                                                                              |
| `temperature`          | no       | Current Temperature (°C)                                                                                              |
| `wind`                 | no       | Wind Speed (m/s)                                                                                                      |
| `solarrad`             | no       | Solar Radiation (MJ/m²/h)                                                                                             |
| `et`                   | no       | Evapotranspiration (mm)                                                                                               |
| `qpf`                  | no       | Quantitative Precipitation Forecast (mm), or QPF                                                                      |
| `rain`                 | no       | Measured Rainfail (mm)                                                                                                |
| `minrh`                | no       | Min Relative Humidity (%RH)                                                                                           |
| `maxrh`                | no       | Max Relative Humidity (%RH)                                                                                           |
| `condition`            | no       | Current weather condition code (WNUM). See [here][wnum reference] for options.                                        |
| `pressure`             | no       | Barametric Pressure (kPa)                                                                                             |
| `dewpoint`             | no       | Dew Point (°C)                                                                                                        |

### `rainmachine.restrict_watering`

Restrict any and all watering activities from staring for a time period.

| Data attribute | Optional | Description                    |
| ---------------------- | -------- | ------------------------------ |
| `duration`              | no       | The time period to restrict (e.g., "01:00:00") |

### `rainmachine.start_program`

Start a RainMachine program.

### `rainmachine.start_zone`

Start a RainMachine zone for a set number of seconds.

| Data attribute | Optional | Description                                           |
| ---------------------- | -------- | ----------------------------------------------------- |
| `zone_run_time`        | yes      | The number of seconds to run; defaults to 600 seconds |

### `rainmachine.stop_all`

Stop all watering activities.

### `rainmachine.stop_program`

Stop a RainMachine program.

### `rainmachine.stop_zone`

Stop a RainMachine zone.

### `rainmachine.unpause_watering`

Unpause all paused watering activities.

### `rainmachine.unrestrict_watering`

Remove all watering restrictions enforced by `rainmachine.restrict_watering`.

## Controlling Your Device

After Home Assistant loads, new switches will be added for every enabled program and zone. These work as expected:

- Program On/Off: starts/stops a program
- Zone On/Off: starts/stops a zone (using the configuration options described above to determine how long to run for)

Programs and zones are linked. While a program is running, you will see both the program and zone switches turned on; turning either one off will turn the other one off (just like in the web app).

## Entity Availability

Many RainMachine entities are enabled by default. Others, like those related to flow sensors, are disabled by default if they only apply to some controllers. You can view all entities for a controller and enable/disable them as appropriate in the Device screen for your RainMachine controller.

[wnum reference]: https://github.com/sprinkler/rainmachine-developer-resources/blob/d47e1ad59dee59e34094ad41636ae289275eb973/sdk-parsers/RMDataFramework/rmWeatherData.py#L13

## Firmware Updates

The integration has an [update entity](/integrations/update/) that provides information on the latest available RainMachine firmware version. The firmware update can be triggered and installed onto your RainMachine controller
directly from Home Assistant.
