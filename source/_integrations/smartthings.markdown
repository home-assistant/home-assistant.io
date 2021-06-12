---
title: SmartThings
description: Instructions on setting up SmartThings within Home Assistant.
featured: true
ha_category:
  - Hub
  - Binary Sensor
  - Climate
  - Cover
  - Fan
  - Light
  - Lock
  - Sensor
  - Scene
  - Switch
ha_release: 0.87
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@andrewsayre'
ha_domain: smartthings
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - fan
  - light
  - lock
  - scene
  - sensor
  - switch
ha_dhcp: true
---

SmartThings is integrated into Home Assistant through the SmartThings Cloud API. The features of this integration include:

1. Controlling SmartThings devices as Home Assistant entities ([see platforms for supported devices and capabilities](#platforms)).
1. Entities automatically synchronized upon restart of Home Assistant when changed in SmartThings.
1. Support for multiple SmartThings accounts and locations with each represented as an integration instance in Home Assistant.
1. No brokers, bridges, or additional dependencies.

## Prerequisites

1. A SmartThings [personal access token](https://account.smartthings.com/tokens).
1. An internet accessible incoming webhook or active Home Assistant Cloud subscription.

### Personal Access Token (PAT)

The PAT is used to create a Home Assistant SmartApp in your SmartThings account during setup of the integration.

1. Log into the [personal access tokens page](https://account.smartthings.com/tokens) and click '[Generate new token](https://account.smartthings.com/tokens/new)'
1. Enter a token name (can be whatever you want), for example, 'Home Assistant' and select the following authorized scopes:
    - Devices (all)
    - Installed Applications (all)
    - Apps (all)
    - Locations (all)
    - Scenes (all)
    - Schedules (all)
1. Click 'Generate token'. When the token is displayed copy and save it somewhere safe (such as your keystore) as you will not be able to retrieve it again.

### Webhook

This integration requires an internet accessible incoming webhook to receive push updates from SmartThings. The preferred approach is to subscribe to [Home Assistant Cloud (Nabu Casa)](https://www.nabucasa.com/) and the integration will configure and use a cloudhook automatically. Alternatively, you will have to configure and setup a internet accessible webhook in Home Assistant as described below:

1. Setup [remote access](/docs/configuration/remote/) via a domain name secured with SSL. *Self-signed SSL certificates are not supported by the SmartThings Cloud API.*
1. Set the external URL in the Home Assistant [configuration](/docs/configuration/basic) to the URL that Home Assistant is available on the internet (this must start with `https://`).

## Setup instructions

After completing the prerequisite steps above you are ready to setup the integration! See [troubleshooting](#troubleshooting) if you are having issues setting up the integration.

1. From Home Assistant, navigate to 'Configuration' then 'Integrations'. Click the plus icon and type/select 'SmartThings'.
1. Confirm the callback URL is correct. If using Home Assistant Cloud it will start with `https://hooks.nabuca.casa`. If the URL is not correct, update your Home Assistant configuration, restart, and try again.
1. Enter your Personal Access Token.
1. Select the SmartThings Location to add to Home Assistant.
1. On the window that opens:
   1. Login with your SmartThings account (if not already logged in).
   1. Optionally change the display name and click 'Done' at the bottom of the screen.
   1. Authorize the integration by clicking 'Allow' on the bottom right of the screen.
   1. Click 'Close Window' or close it manually.
1. Back in Home Assistant click 'Finish'.

<div class='note info'>

If you want to integrate additional SmartThings accounts or locations, repeat the steps above.

</div>

## Removal instructions

To remove the integration from Home Assistant, select the instance from the Home Assistant Integrations page and click the trash icon on the upper right corner. Alternatively, you can remove the SmartApp from the location within the SmartThings application. If the Home Assistant instance that setup the integration is no longer running or functioning, you will need to use this [utility to remove the orphaned SmartApps in your SmartThings account](https://pypi.org/project/hass-smartthings-remove/).

## Events

The SmartThings integration triggers events for select device capabilities.

### smartthings.button

The integration will trigger an event when a device with the [button](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Button) capability is actuated and can be used to trigger automations within Home Assistant. Below is an example of the data payload:

```json
{
  "component_id": "main",
  "device_id": "42a16cf2-fef7-4ee8-b4a6-d32cb65474b7",
  "location_id": "2a54b9fa-f66c-42d9-8488-d8f036b980c8",
  "value": "pushed",
  "name": "Scene Button"
}
```

| Attribute      | Description                                                                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `component_id` | Describes which integration of the device triggered the event. `main` represents the parent device. For devices with child-devices, this attribute identifies the child that raised the event.                                             |
| `device_id`    | The unique id of the device in SmartThings. This can be located in the Home Assistant device registry or in the [SmartThings Developer Workspace](https://smartthings.developer.samsung.com/workspace/).                                   |
| `location_id`  | The unique id of the location the device is part of. This can be found in the configuration entry registry or in the [SmartThings Developer Workspace](https://smartthings.developer.samsung.com/workspace/).                                     |
| `value`        | Describes the action taken on the button. See the [button](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Button) capability reference for a list of possible values (not all are supported by every device). |
| `name`         | The name given to the device in SmartThings.                                                                                                                                                                                               |

Event data payloads are logged at the debug level, see [debugging](#debugging) for more information.

## Platforms

SmartThings represents devices as a set of [capabilities](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html) and the SmartThings integration maps those to entity platforms in Home Assistant. A single device may be represented by one or more platforms.

- [Binary Sensor](#binary-sensor)
- [Climate](#climate)
- [Cover](#cover)
- [Fan](#fan)
- [Light](#light)
- [Lock](#lock)
- [Sensor](#sensor)
- [Scene](#scene)
- [Switch](#switch)

Support for additional platforms will be added in the future.

### Binary Sensor

The SmartThings Binary Sensor platform lets you view devices that have binary sensor-related capabilities. A Binary Sensor entity will be created for each attribute (below) supported by the device.

| Capability                                                                                                              | Attribute      | On-Value   |
| ----------------------------------------------------------------------------------------------------------------------- | -------------- | ---------- |
| [`accelerationSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Acceleration-Sensor) | `acceleration` | `active`   |
| [`contactSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Contact-Sensor)           | `contact`      | `open`     |
| [`filterStatus`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Filter-Status)             | `filterStatus` | `replace`  |
| [`motionSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Motion-Sensor)             | `motion`       | `active`   |
| [`presenceSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Presence-Sensor)         | `presence`     | `present`  |
| [`tamperAlert`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Tamper-Alert)               | `tamper`       | `detected` |
| [`valve`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Valve)                            | `valve`        | `open`     |
| [`waterSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Water-Sensor)               | `water`        | `wet`      |

### Climate

The SmartThings Climate platform lets you control devices that have air conditioner or thermostat related capabilities.

#### Air Conditioners

For a SmartThings Air Conditioner to be represented by the climate platform, it must have all of the following required capabilities:

| Capability                                                                                                                                        | Climate Features                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`airConditionerMode`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Air-Conditioner-Mode) (required)               | `hvac mode`, `hvac action`                                                                                                                                                        |
| `airConditionerFanMode` (required)                                                                                                                | `fan mode`                                                                                                                                                                        |
| [`temperatureMeasurement`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Temperature-Measurement) (required)        | `temperature`                                                                                                                                                                     |
| [`thermostatCoolingSetpoint`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Thermostat-Cooling-Setpoint) (required) | `target temp`                                                                                                                                                                     |
| [`demandResponseLoadControl`](https://docs.smartthings.com/en/latest/capabilities-reference.html#demand-response-load-control)                    | `drlc_status_duration` (state attribute), `drlc_status_level` (state attribute), `drlc_status_override` (state attribute), `drlc_status_start` (state attribute)                  |
| [`powerConsumptionReport`](https://docs.smartthings.com/en/latest/capabilities-reference.html#power-consumption-report)                           | `power_consumption_end` (state attribute), `power_consumption_energy` (state attribute), `power_consumption_power` (state attribute), `power_consumption_start` (state attribute) |

#### Thermostats

For a SmartThings thermostat to be represented by the climate platform, it must have all the capabilities from either "set a" _or_ "set b":

| Capability                                                                                                                                     | Climate Features                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [`thermostat`](https://docs.smartthings.com/en/latest/capabilities-reference.html#thermostat) (set a)                                          | `hvac mode`, `hvac action`, `target temp high`, `target temp low` and `fan mode` |
| [`thermostatMode`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Thermostat-Mode) (set b)                        | `hvac mode`                                                                      |
| [`thermostatCoolingSetpoint`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Thermostat-Cooling-Setpoint) (seb b) | `target temp low`                                                                |
| [`thermostatHeatingSetpoint`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Thermostat-Heating-Setpoint) (set b) | `target temp high`                                                               |
| [`temperatureMeasurement`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Temperature-Measurement) (set b)        |
| [`thermostatOperatingState`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Thermostat-Operating-State)           | `hvac action`                                                                    |
| [`thermostatFanMode`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Thermostat-Fan-Mode)                         | `fan mode`                                                                       |
| [`relativeHumidityMeasurement`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Relative-Humidity-Measurement)     | `humidity` (state attribute)                                                     |

### Cover

The SmartThings Cover platform lets you control devices that have open/close related capabilities. For a device to be represented by the cover platform, it must have one of the capabilities from "set a" below.

| Capability                                                                                                                     | Cover Features                    |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| [`doorControl`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Door-Control) (set a)              | `open` and `close`                |
| [`garageDoorControl`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Garage-Door-Control) (seb a) | `open` and `close`                |
| [`windowShade`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Window-Shade) (set a)              | `open` and `close`                |
| [`switchLevel`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch-Level)                      | `position`                        |
| [`battery`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Battery)                               | `battery_level` (state attribute) |

### Fan

The SmartThings Fan platform lets you control devices that have fan-related capabilities. For a SmartThings device to be represented by the fan platform, it must have one or more of the capabilities below in addition to the [`switch`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch) capability.

| Capability                                                                                          | Fan Features                                 |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| [`fanSpeed`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Fan-Speed) | `speed` (`off`, `low`, `medium`, and `high`) |

### Light

The SmartThings Light platform lets you control devices that have light-related capabilities. For a SmartThings device to be represented by the light platform, it must have one or more of the capabilities below in addition to the [`switch`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch) capability.

| Capability                                                                                                          | Light Features                |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| [`switchLevel`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch-Level)           | `brightness` and `transition` |
| [`colorControl`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Color-Control)         | `color`                       |
| [`colorTemperature`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Color-Temperature) | `color_temp`                  |

### Lock

The SmartThings Lock platform lets you control devices that have the [`lock`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Lock) capability, showing current lock status and supporting lock and unlock commands.

### Sensor

The SmartThings Sensor platform lets your view devices that have sensor-related capabilities. A Sensor entity is created for each attribute (below) supported by the device.

| Capability                                                                                                                                                | Attributes                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [`activityLightingMode`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Activity-Lighting-Mode)                              | `lightingMode`                                            |
| [`airConditionerMode`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Air-Conditioner-Mode)                                  | `airConditionerMode`                                      |
| [`airQualitySensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Air-Quality-Sensory)                                     | `airQuality`                                              |
| [`alarm`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Alarm)                                                              | `alarm`                                                   |
| [`audioVolume`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Audio-Volume)                                                 | `volume`                                                  |
| [`battery`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Battery)                                                          | `battery`                                                 |
| [`bodyMassIndexMeasurement`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Body-Mass-Index-Measurement)                     | `bmiMeasurement`                                          |
| [`bodyWeightMeasurement`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Body-Weight-Measurement)                            | `bodyWeightMeasurement`                                   |
| [`carbonDioxideMeasurement`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Carbon-Dioxide-Measurement)                      | `carbonDioxide`                                           |
| [`carbonMonoxideDetector`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Carbon-Monoxide-Detector)                          | `carbonMonoxide`                                          |
| [`carbonMonoxideMeasurement`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Carbon-Monoxide-Measurement)                    | `carbonMonoxideLevel`                                     |
| [`dishwasherOperatingState`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Dishwasher-Operating-State)                      | `machineState`, `dishwasherJobState` and `completionTime` |
| [`dryerMode`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Dryer-Mode)                                                     | `dryerMode`                                               |
| [`dryerOperatingState`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Dryer-Operating-State)                                | `machineState`, `dryerJobState` and `completionTime`      |
| [`dustSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Dust-Sensor)                                                   | `fineDustLevel` and `dustLevel`                           |
| [`energyMeter`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Energy-Meter)                                                 | `energy`                                                  |
| [`equivalentCarbonDioxideMeasurement`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Equivalent-Carbon-Dioxide-Measurement) | `equivalentCarbonDioxideMeasurement`                      |
| [`formaldehydeMeasurement`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Formaldehyde-Measurement)                         | `formaldehydeLevel`                                       |
| `gasMeter`                                                                                                                                                | `gasMeter`, `meterCalorific`, `meterTime`, and `meterVolume` |
| [`illuminanceMeasurement`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Illuminance-Measurement)                           | `illuminance`                                             |
| [`infraredLevel`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Infrared-Level)                                             | `infraredLevel`                                           |
| [`lock`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Lock)                                                                | `lock`                                                    |
| [`mediaInputSource`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Media-Input-Source)                                      | `inputSource`                                             |
| [`mediaPlaybackRepeat`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Media-Playback-Repeat)                                | `playbackRepeatMode`                                      |
| [`mediaPlaybackShuffle`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Media-Playback-Shuffle)                              | `playbackShuffle`                                         |
| [`mediaPlayback`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Media-Playback)                                             | `playbackStatus`                                          |
| [`odorSensor`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Odor-Sensor)                                                   | `odorLevel`                                               |
| [`ovenMode`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Oven-Mode)                                                       | `ovenMode`                                                |
| [`ovenOperatingState`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Oven-Operating-State)                                  | `machineState`, `ovenJobState` and `completionTime`       |
| [`ovenSetpoint`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Oven-Setpoint)                                               | `ovenSetpoint`                                            |
| [`powerMeter`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Power-Meter)                                                   | `power`                                                   |
| [`powerSource`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Power-Source)                                                 | `powerSource`                                             |
| [`refrigerationSetpoint`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Refrigeration-Setpoint)                             | `refrigerationSetpoint`                                   |
| [`relativeHumidityMeasurement`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Relative-Humidity-Measurement)                | `humidity`                                                |
| [`robotCleanerCleaningMode`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Robot-Cleaner-CleaningMode)                      | `robotCleanerCleaningMode`                                |
| [`robotCleanerMovement`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Robot-Cleaner-Movement)                              | `robotCleanerMovement`                                    |
| [`robotCleanerTurboMode`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Robot-Cleaner-Turbo-Mode)                           | `robotCleanerTurboMode`                                   |
| [`signalStrength`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Signal-Strength)                                           | `lqi` and `rssi`                                          |
| [`smokeDetector`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Smoke-Detector)                                             | `smoke`                                                   |
| [`temperatureMeasurement`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Temperature-Measurement)                           | `temperature`                                             |
| [`thermostatCoolingSetpoint`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Thermostat-Cooling-Setpoint)                    | `coolingSetpoint`                                         |
| [`thermostatFanMode`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Thermostat-Fan-Mode)                                    | `thermostatFanMode`                                       |
| [`thermostatHeatingSetpoint`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Thermostat-Heating-Setpoint)                    | `heatingSetpoint`                                         |
| [`thermostatMode`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Thermostat-Mode)                                           | `thermostatMode`                                          |
| [`thermostatOperatingState`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Thermostat-Operating-State)                      | `thermostatOperatingState`                                |
| [`thermostatSetpoint`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Thermostat-Setpoint)                                   | `thermostatSetpoint`                                      |
| [`threeAxis`](https://docs.smartthings.com/en/latest/capabilities-reference.html#three-axis)                                                              | `threeAxis` (as discrete sensors `X`, `Y` and `Z`)        |
| [`tvChannel`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Tv-Channel)                                                     | `tvChannel` and `tvChannelName`                           |
| [`tvocMeasurement`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Tvoc-Measurement)                                         | `tvocLevel`                                               |
| [`ultravioletIndex`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Ultraviolet-Index)                                       | `ultravioletIndex`                                        |
| [`voltageMeasurement`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Voltage-Measurement)                                   | `voltage`                                                 |
| [`washerMode`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Washer-Mode)                                                   | `washerMode`                                              |
| [`washerOperatingState`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Washer-Operating-State)                              | `machineState`, `washerJobState` and `completionTime`     |

### Scene

The SmartThings Scene platform lets you activate scenes defined in SmartThings with a scene entity representing each SmartThings scenes within the location.

### Switch

The SmartThings Switch platform lets you control devices that have the [`switch`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch) capability that are not already represented by a more specific platform. The following optional capabilities will provide energy and power utilization information:

| Capability                                                                                                | Switch Features                                         |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [`energyMeter`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Energy-Meter) | energy consumption (`today_energy_kwh` state attribute) |
| [`powerMeter`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Power-Meter)   | power consumption (`current_power_w` state attribute)   |

## Troubleshooting

### Setup

#### Aborted: Home Assistant is not configured correctly to receive updates from SmartThings

This error message occurs when you do not have an active Home Assistant Cloud (Nabu Casa) subscription and the external URL is not configured correctly (it must start with `https`). Update your Home Assistant configuration per the prerequisites above, and try again.

#### Error: The token must be in the UID/GUID format

The personal access token does not match the expected format. Make sure you are copying the entire token and that there are no extraneous characters (such as trailing whitespace) and try again.

#### Error: The token is invalid or no longer authorized

The personal access token entered is not valid or has been deleted. Create a new token per the instructions in the prerequisites and try again.

#### Error: The token does not have the required OAuth scopes

The personal access token entered is valid but does not have the required scopes as outlined in the prerequisites. Create a new token per the instructions in the prerequisites and try again.

#### Error: SmartThings could not validate the webhook URL

SmartThings was unable to reach your Home Assistant instance using the webhook URL. Enable debug logging to see the specific issue and follow the webhook troubleshooting checklist below.

#### Aborted: There are no available SmartThings Locations

This error message occurs when all of the SmartThings locations under the account linked to the personal access token are already setup in Home Assistant. Ensure you are using the correct personal access token or create an additional location in SmartThings to integrate and try again.

#### Webhook Troubleshooting Checklist

1. Ensure external URL is properly set to the _external address_ that Home Assistant is available to the internet. SmartThings must be able to reach this address.
1. Validate there are no problems with your certificate or SSL configuration by using an online checker, such as [https://www.digicert.com/help/](https://www.digicert.com/help/).
1. Some reverse proxy configuration settings can interfere with communication from SmartThings.  For example, TLSv1.3 is not supported.  Setting the supported cipher suite too restrictly will prevent handshaking. The following NGINX SSL configuration is known to work:
   ```nginx
   # cert.crt also contains intermediate certificates
   ssl_certificate /path/to/cert.crt;
   ssl_certificate_key /path/to/cert.key;
   ssl_dhparam /path/to/dhparam.pem;
   ssl_protocols TLSv1.2;
   ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';
   ssl_prefer_server_ciphers on;
   ssl_ecdh_curve secp384r1;
   ssl_session_timeout  10m;
   ssl_session_cache shared:SSL:10m;
   ssl_session_tickets off;
   ```
1. While the error message (above) is being displayed, run the following command from outside your local network to confirm it is responding to the ping lifecycle event:
    ```bash
    curl -X POST https://{EXTERNAL_URL}/api/webhook/{WEBHOOK_ID} -H "Content-Type: application/json; charset=utf-8" -d $'{"lifecycle": "PING", "executionId": "00000000-0000-0000-0000-000000000000", "locale": "en", "version": "1.0.0", "pingData": { "challenge": "00000000-0000-0000-0000-000000000000"}}'
    ```
    Where `{EXTERNAL_URL}` is your external address and `{WEBHOOK_ID}` is the value of `webhook_id` from `.storage/smartthings` in your Home Assistant configuration directory.

    The expected response is:
    ```bash
    {"pingData": {"challenge": "00000000-0000-0000-0000-000000000000"}}
    ```

If you have completed the checklist above and are still unable to setup the platform, [activate debug logging](#debugging) for the SmartThings integration and include the log messages up until the point of failure in [a new issue](https://github.com/home-assistant/home-assistant/issues).

### Debugging

The SmartThings integration will log additional information about push updates received, events fired, and other messages when the log level is set to `debug`. Add the the relevant line below to the `configuration.yaml`:

```yaml
logger:
  default: info
  logs:
    homeassistant.components.smartthings: debug
```
