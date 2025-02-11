---
title: SmartThings
description: Instructions on setting up SmartThings within Home Assistant.
featured: true
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Fan
  - Hub
  - Light
  - Lock
  - Scene
  - Sensor
  - Switch
ha_release: 0.87
ha_iot_class: Cloud Push
ha_config_flow: true
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
ha_integration_type: integration
---

{% warning %}
The Samsung SmartThings integration currently does not allow new installations. We are working directly with Samsung to get this resolved.
{% endwarning %}

SmartThings is integrated into Home Assistant through the SmartThings Cloud API. The features of this integration include:

1. Controlling SmartThings devices as Home Assistant entities ([see platforms for supported devices and capabilities](#platforms)).
2. Entities automatically synchronized upon restart of Home Assistant when changed in SmartThings.
3. Support for multiple SmartThings accounts and locations with each represented as an integration instance in Home Assistant.
4. No brokers, bridges, or additional dependencies.

## Prerequisites

1. A SmartThings [personal access token](https://account.smartthings.com/tokens).
2. An internet accessible incoming webhook or active Home Assistant Cloud subscription.

### Personal Access Token (PAT)

The PAT is used to create a Home Assistant SmartApp in your SmartThings account during setup of the integration.

1. Log into the [personal access tokens page](https://account.smartthings.com/tokens) and select **[Generate new token](https://account.smartthings.com/tokens/new)**.
2. Enter a token name (can be whatever you want), for example, 'Home Assistant' and select the following authorized scopes:
    - Devices (all)
    - Installed Applications (all)
    - Apps (all)
    - Locations (all)
    - Scenes (all)
    - Schedules (all)
3. Select **Generate token**. When the token is displayed copy and save it somewhere safe (such as your keystore) as you will not be able to retrieve it again.

### Webhook

This integration requires an internet accessible incoming webhook to receive push updates from SmartThings. The preferred approach is to subscribe to [Home Assistant Cloud (Nabu Casa)](https://www.nabucasa.com/) and the integration will configure and use a cloudhook automatically. Alternatively, you will have to configure and setup an internet accessible webhook in Home Assistant as described below:

1. Setup [remote access](/docs/configuration/remote/) via a domain name secured with SSL.
    1. *Self-signed SSL certificates are not supported by the SmartThings Cloud API.*
    2. *SmartThings Cloud API requires SSL connection with **maximum** TLS version 1.2*
2. Set the external URL in the Home Assistant [configuration](/integrations/homeassistant/#external_url) to the URL that Home Assistant is available on the internet (this must start with `https://`). If you do not use Nabu Casa you must configure your network to allow TCP traffic from the internet to reach the IP address and port of the device running Home Assistant.

## Setup instructions

After completing the prerequisite steps above, you are ready to setup the integration! See [troubleshooting](#troubleshooting) if you are having issues setting up the integration.

{% include integrations/config_flow.md %}

1. Confirm the callback URL is correct. If using Home Assistant Cloud, it will start with `https://hooks.nabu.casa`. If the URL is not correct, update your Home Assistant configuration, restart, and try again.
2. Enter your Personal Access Token.
3. Select the SmartThings Location to add to Home Assistant.
4. On the window that opens:
   1. Login with your SmartThings account (if not already logged in).
   2. Optionally change the display name and select **Done** at the bottom of the screen.
   3. Authorize the integration by selecting **Allow** on the bottom right of the screen.
   4. Select **Close Window** or close it manually.
5. Back in Home Assistant select **Finish**.

{% note %}
If you want to integrate additional SmartThings accounts or locations, repeat the steps above.
{% endnote %}

## Removal instructions

To remove the integration from Home Assistant, select the instance from the Home Assistant Integrations page and select the trash icon on the upper right corner. Alternatively, you can remove the SmartApp from the location within the SmartThings application. If the Home Assistant instance that setup the integration is no longer running or functioning, you will need to use this [utility to remove the orphaned SmartApps in your SmartThings account](https://pypi.org/project/hass-smartthings-remove/).

## Events

The SmartThings integration triggers events for select device capabilities.

### smartthings.button

The integration will trigger an event when a device with the [button](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#button) capability is actuated and can be used to trigger automations within Home Assistant. Below is an example of the data payload:

```json
{
  "component_id": "main",
  "device_id": "42a16cf2-fef7-4ee8-b4a6-d32cb65474b7",
  "location_id": "2a54b9fa-f66c-42d9-8488-d8f036b980c8",
  "value": "pushed",
  "name": "Scene Button"
}
```

| Attribute      | Description                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `component_id` | Describes which integration of the device triggered the event. `main` represents the parent device. For devices with child-devices, this attribute identifies the child that raised the event. For multi-button devices, the current SmartThings API will no longer pass the ButtonNumber but use a child component_id for each button. The device handler installed on SmartThings must be able to create those child components. |
| `device_id`    | The unique id of the device in SmartThings. This can be located in the Home Assistant device registry or in the [SmartThings Developer Workspace](https://smartthings.developer.samsung.com/workspace/).                                                                                                                                                                                                                           |
| `location_id`  | The unique id of the location the device is part of. This can be found in the configuration entry registry or in the [SmartThings Developer Workspace](https://smartthings.developer.samsung.com/workspace/).                                                                                                                                                                                                                      |
| `value`        | Describes the action taken on the button. See the [button](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#button) capability reference for a list of possible values (not all are supported by every device).                                                                                                                                                                                  |
| `name`         | The name given to the device in SmartThings.                                                                                                                                                                                                                                                                                                                                                                                       |

Event data payloads are logged at the debug level, see [debugging](#debugging) for more information.

## Platforms

SmartThings represents devices as a set of [capabilities](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference) and the SmartThings integration maps those to entity platforms in Home Assistant. A single device may be represented by one or more platforms.

- [Binary sensor](#binary-sensor)
- [Climate](#climate)
- [Cover](#cover)
- [Fan](#fan)
- [Light](#light)
- [Lock](#lock)
- [Sensor](#sensor)
- [Scene](#scene)
- [Switch](#switch)

Support for additional platforms will be added in the future.

### Binary sensor

The SmartThings binary sensor platform lets you view devices that have binary sensor-related capabilities. A binary sensor entity will be created for each attribute (below) supported by the device.

| Capability                                                                                                                    | Attribute      | On-Value   |
| ----------------------------------------------------------------------------------------------------------------------------- | -------------- | ---------- |
| [`accelerationSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#accelerationSensor) | `acceleration` | `active`   |
| [`contactSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#contactSensor)           | `contact`      | `open`     |
| [`filterStatus`](https://developer.smartthings.com/docs/devices/capabilities/proposed#filterStatus)                           | `filterStatus` | `replace`  |
| [`motionSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#motionSensor)             | `motion`       | `active`   |
| [`presenceSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#presenceSensor)         | `presence`     | `present`  |
| [`tamperAlert`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#tamperAlert)               | `tamper`       | `detected` |
| [`valve`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#valve)                           | `valve`        | `open`     |
| [`waterSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#waterSensor)               | `water`        | `wet`      |

### Climate

The SmartThings Climate platform lets you control devices that have air conditioner or thermostat related capabilities.

#### Air Conditioners

For a SmartThings Air Conditioner to be represented by the climate platform, it must have all of the following required capabilities:

| Capability                                                                                                                                             | Climate Features                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`airConditionerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerMode) (required)                             | `hvac mode`, `hvac action`                                                                                                                                       |
| [`airConditionerFanMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerFanMode) (required)                       | `fan mode`                                                                                                                                                       |
| [`temperatureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#temperatureMeasurement) (required)       | `temperature`                                                                                                                                                    |
| [`thermostatCoolingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatCoolingSetpoint) (required) | `target temp`                                                                                                                                                    |
| [`demandResponseLoadControl`](https://developer.smartthings.com/docs/devices/capabilities/proposed#demandResponseLoadControl)                          | `drlc_status_duration` (state attribute), `drlc_status_level` (state attribute), `drlc_status_override` (state attribute), `drlc_status_start` (state attribute) |

#### Thermostats

For a SmartThings thermostat to be represented by the climate platform, it must have all the capabilities from either "set a" _or_ "set b":

| Capability                                                                                                                                          | Climate Features                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [`thermostat`](https://developer.smartthings.com/docs/devices/capabilities/deprecated#thermostat) (set a)                                           | `hvac mode`, `hvac action`, `target temp high`, `target temp low` and `fan mode` |
| [`thermostatMode`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatMode) (set b)                       | `hvac mode`                                                                      |
| [`thermostatHeatingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatHeatingSetpoint) (set b) | `target temp high`                                                               |
| [`temperatureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#temperatureMeasurement) (set b)       |
| [`thermostatOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatOperatingState)           | `hvac action`                                                                    |
| [`thermostatFanMode`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatFanMode)                         | `fan mode`                                                                       |
| [`relativeHumidityMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#relativeHumidityMeasurement)     | `humidity` (state attribute)                                                     |

### Cover

The SmartThings Cover platform lets you control devices that have open/close related capabilities. For a device to be represented by the cover platform, it must have one of the capabilities from "set a" below.

| Capability                                                                                                                 | Cover Features                    |
| -------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| [`doorControl`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#doorControl) (set a)    | `open` and `close`                |
| [`garageDoorControl`](https://developer.smartthings.com/docs/devices/capabilities/deprecated#garageDoorControl) (seb a)    | `open` and `close`                |
| [`windowShade`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#windowShade) (set a)    | `open` and `close`                |
| [`switchLevel`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switchLevel)            | `position`                        |
| [`windowShadeLevel`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference/#windowShadeLevel) | `position`                        |
| [`battery`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#battery)                    | `battery_level` (state attribute) |

### Fan

The SmartThings Fan platform lets you control devices that have fan-related capabilities. For a SmartThings device to be represented by the fan platform, it must have one or more of the capabilities below in addition to the [`switch`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch) capability.

| Capability                                                                                                | Fan Features                                 |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| [`fanSpeed`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#fanSpeed) | `speed` (`off`, `low`, `medium`, and `high`) |

### Light

The SmartThings Light platform lets you control devices that have light-related capabilities. For a SmartThings device to be represented by the light platform, it must have one or more of the capabilities below in addition to the [`switch`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch) capability.

| Capability                                                                                                                | Light Features                |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| [`switchLevel`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switchLevel)           | `brightness` and `transition` |
| [`colorControl`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#colorControl)         | `color`                       |
| [`colorTemperature`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#colorTemperature) | `color_temp`                  |

### Lock

The SmartThings Lock platform lets you control devices that have the [`lock`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#lock) capability, showing current lock status and supporting lock and unlock commands.

### Sensor

The SmartThings Sensor platform lets your view devices that have sensor-related capabilities. A Sensor entity is created for each attribute (below) supported by the device.

| Capability                                                                                                                                                    | Attributes                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [`activityLightingMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#activityLightingMode)                                           | `lightingMode`                                                 |
| [`airConditionerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerMode)                                               | `airConditionerMode`                                           |
| [`airQualitySensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#airQualitySensor)                                     | `airQuality`                                                   |
| [`alarm`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#alarm)                                                           | `alarm`                                                        |
| [`audioVolume`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#audioVolume)                                               | `volume`                                                       |
| [`battery`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#battery)                                                       | `battery`                                                      |
| [`bodyMassIndexMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/proposed#bodyMassIndexMeasurement)                                   | `bmiMeasurement`                                               |
| [`bodyWeightMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/proposed#bodyWeightMeasurement)                                         | `bodyWeightMeasurement`                                        |
| [`carbonDioxideMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#carbonDioxideMeasurement)                     | `carbonDioxide`                                                |
| [`carbonMonoxideDetector`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#carbonMonoxideDetector)                         | `carbonMonoxide`                                               |
| [`carbonMonoxideMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/proposed#carbonMonoxideMeasurement)                                 | `carbonMonoxideLevel`                                          |
| [`dishwasherOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/proposed#dishwasherOperatingState)                                   | `machineState`, `dishwasherJobState` and `completionTime`      |
| [`dryerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#dryerMode)                                                                 | `dryerMode`                                                    |
| [`dryerOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/proposed#dryerOperatingState)                                             | `machineState`, `dryerJobState` and `completionTime`           |
| [`dustSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#dustSensor)                                                 | `fineDustLevel` and `dustLevel`                                |
| [`energyMeter`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#energyMeter)                                               | `energy`                                                       |
| [`equivalentCarbonDioxideMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#equivalentCarbonDioxideMeasurement) | `equivalentCarbonDioxideMeasurement`                           |
| [`formaldehydeMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#formaldehydeMeasurement)                       | `formaldehydeLevel`                                            |
| [`gasMeter`](https://developer.smartthings.com/docs/devices/capabilities/proposed#gasMeter)                                                                   | `gasMeter`, `meterCalorific`, `meterTime`, and `meterVolume`   |
| [`illuminanceMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#illuminanceMeasurement)                         | `illuminance`                                                  |
| [`infraredLevel`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#infraredLevel)                                           | `infraredLevel`                                                |
| [`lock`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#lock)                                                             | `lock`                                                         |
| [`mediaInputSource`](https://developer.smartthings.com/docs/devices/capabilities/proposed#mediaInputSource)                                                   | `inputSource`                                                  |
| [`mediaPlaybackRepeat`](https://developer.smartthings.com/docs/devices/capabilities/proposed#mediaPlaybackRepeat)                                             | `playbackRepeatMode`                                           |
| [`mediaPlaybackShuffle`](https://developer.smartthings.com/docs/devices/capabilities/proposed#mediaPlaybackShuffle)                                           | `playbackShuffle`                                              |
| [`mediaPlayback`](https://developer.smartthings.com/docs/devices/capabilities/proposed#mediaPlayback)                                                         | `playbackStatus`                                               |
| [`odorSensor`](https://developer.smartthings.com/docs/devices/capabilities/proposed#odorSensor)                                                               | `odorLevel`                                                    |
| [`ovenMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#ovenMode)                                                                   | `ovenMode`                                                     |
| [`ovenOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/proposed#ovenOperatingState)                                               | `machineState`, `ovenJobState` and `completionTime`            |
| [`ovenSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/proposed#ovenSetpoint)                                                           | `ovenSetpoint`                                                 |
| [`powerConsumptionReport`](https://developer.smartthings.com/docs/devices/capabilities/proposed#powerConsumptionReport)                                       | `deltaEnergy`, `energy`, `energySaved`, `power`, `powerEnergy` |
| [`powerMeter`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#powerMeter)                                                 | `power`                                                        |
| [`powerSource`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#powerSource)                                               | `powerSource`                                                  |
| [`refrigerationSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/proposed#refrigerationSetpoint)                                         | `refrigerationSetpoint`                                        |
| [`relativeHumidityMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#relativeHumidityMeasurement)               | `humidity`                                                     |
| [`robotCleanerCleaningMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#robotCleanerCleaningMode)                                   | `robotCleanerCleaningMode`                                     |
| [`robotCleanerMovement`](https://developer.smartthings.com/docs/devices/capabilities/proposed#robotCleanerMovement)                                           | `robotCleanerMovement`                                         |
| [`robotCleanerTurboMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#robotCleanerTurboMode)                                         | `robotCleanerTurboMode`                                        |
| [`signalStrength`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#signalStrength)                                         | `lqi` and `rssi`                                               |
| [`smokeDetector`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#smokeDetector)                                           | `smoke`                                                        |
| [`temperatureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#temperatureMeasurement)                         | `temperature`                                                  |
| [`thermostatCoolingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatCoolingSetpoint)                   | `coolingSetpoint`                                              |
| [`thermostatFanMode`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatFanMode)                                   | `thermostatFanMode`                                            |
| [`thermostatHeatingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatHeatingSetpoint)                   | `heatingSetpoint`                                              |
| [`thermostatMode`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatMode)                                         | `thermostatMode`                                               |
| [`thermostatOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatOperatingState)                     | `thermostatOperatingState`                                     |
| [`thermostatSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/deprecated#thermostatSetpoint)                                             | `thermostatSetpoint`                                           |
| [`threeAxis`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#threeAxis)                                                   | `threeAxis` (as discrete sensors `X`, `Y` and `Z`)             |
| [`tvChannel`](https://developer.smartthings.com/docs/devices/capabilities/proposed#tvChannel)                                                                 | `tvChannel` and `tvChannelName`                                |
| [`tvocMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#tvocMeasurement)                                       | `tvocLevel`                                                    |
| [`ultravioletIndex`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#ultravioletIndex)                                     | `ultravioletIndex`                                             |
| [`voltageMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#voltageMeasurement)                                 | `voltage`                                                      |
| [`washerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#washerMode)                                                               | `washerMode`                                                   |
| [`washerOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/proposed#washerOperatingState)                                           | `machineState`, `washerJobState` and `completionTime`          |

### Scene

The SmartThings Scene platform lets you activate scenes defined in SmartThings with a scene entity representing each SmartThings scenes within the location.

### Switch

The SmartThings Switch platform lets you control devices that have the [`switch`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switch) capability that are not already represented by a more specific platform. The following optional capabilities will provide energy and power utilization information:

| Capability                                                                                                      | Switch Features                                         |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [`energyMeter`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#energyMeter) | energy consumption (`today_energy_kwh` state attribute) |
| [`powerMeter`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#powerMeter)   | power consumption (`current_power_w` state attribute)   |

## Troubleshooting

### Setup

#### Aborted: Home Assistant is not configured correctly to receive updates from SmartThings

This error message occurs when you do not have an active Home Assistant Cloud (Nabu Casa) subscription and the external URL is not configured correctly (it must start with `https`). Update your Home Assistant configuration per the prerequisites above, and try again.

#### Error: The token must be in the UID/GUID format

The personal access token does not match the expected format. Make sure you are copying the entire token and that there are no extraneous characters (such as trailing whitespace) and try again.

#### Error: `pysmartthings.errors.APIInvalidGrant: Invalid refresh token:` (after a restore)

You can fix this by using the SmartThings App to re-grant authorization to the API token you created before. 
1. Open SmartThings app on your mobile device (not HA).
2. Select **Routines** from bottom.
3. Select your Home Assistant automation from the list.
4. Select **Done**, then select **Allow**.
5. Reload your SmartThings integration from Home Assistant Devices panel.

#### Error: The token is invalid or no longer authorized (not solved by above)

The personal access token entered is not valid or has been deleted. Create a new token per the instructions in the prerequisites and try again.

#### Error: The token does not have the required OAuth scopes

The personal access token entered is valid but does not have the required scopes as outlined in the prerequisites. Create a new token per the instructions in the prerequisites and try again.

#### Error: SmartThings could not validate the webhook URL

SmartThings was unable to reach your Home Assistant instance using the webhook URL. Enable debug logging to see the specific issue and follow the webhook troubleshooting checklist below.

#### Aborted: There are no available SmartThings Locations

This error message occurs when all of the SmartThings locations under the account linked to the personal access token are already setup in Home Assistant. Ensure you are using the correct personal access token or create an additional location in SmartThings to integrate and try again.

#### Webhook Troubleshooting Checklist

1. Ensure external URL is properly set to the _external address_ that Home Assistant is available to the internet. SmartThings must be able to reach this address.
2. Validate there are no problems with your certificate or SSL configuration by using an online checker, such as [https://www.digicert.com/help/](https://www.digicert.com/help/).
3. Some reverse proxy configuration settings can interfere with communication from SmartThings.  For example, TLSv1.3 is not supported.  Setting the supported cipher suite too restrictly will prevent handshaking. The following NGINX SSL configuration is known to work:
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
4. While the error message (above) is being displayed, run the following command from outside your local network to confirm it is responding to the ping lifecycle event:
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

The SmartThings integration will log additional information about push updates received, events fired, and other messages when the log level is set to `debug`. Add the relevant line below to the {% term "`configuration.yaml`" %}:

```yaml
logger:
  default: info
  logs:
    homeassistant.components.smartthings: debug
```
