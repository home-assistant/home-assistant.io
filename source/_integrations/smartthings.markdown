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

[SmartThings](https://www.samsung.com/smartthings/) is a home automation platform for connecting with Samsung or third-party devices.

## Prerequisites

- You need a Samsung account and account credentials.
- To connect devices, you need the SmartThings app installed on your phone.

{% include integrations/config_flow.md %}

## Supported functionality

SmartThings represents devices as a set of [capabilities](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference). The SmartThings integration maps those capabilities to entities in Home Assistant. A single device may be represented by one or more entities.

- [Binary sensor](#binary-sensor)
- [Climate](#climate)
- [Cover](#cover)
- [Fan](#fan)
- [Light](#light)
- [Lock](#lock)
- [Sensor](#sensor)
- [Scene](#scene)
- [Switch](#switch)

### Binary sensor

In Home Assistant, a binary sensor entity will be created for each of the following SmartThings capabilities:

| SmartThings capability                                                                                                |
| --------------------------------------------------------------------------------------------------------------------- |
| `accelerationSensor`                                                                                                  |
| [`contactSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#contactSensor)   |
| [`filterStatus`](https://developer.smartthings.com/docs/devices/capabilities/proposed#filterStatus)                   |
| [`motionSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#motionSensor)     |
| [`presenceSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#presenceSensor) |
| [`tamperAlert`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#tamperAlert)       |
| [`valve`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#valve)                   |
| [`waterSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#waterSensor)       |

### Climate

The SmartThings Climate platform lets you control devices that have air conditioner or thermostat related capabilities.

#### Air Conditioners

For a SmartThings Air Conditioner to be represented by the climate entity, it must have all of the following required capabilities. If it does not have all the capabilities, the features will be represented in Home Assistant as individual sensors instead of a climate entity.

| SmartThings capability                                                                                                                                 | Related climate features in Home Assistant                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`airConditionerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerMode) (required)                             | `hvac mode`, `hvac action`                                                                                                                                       |
| [`airConditionerFanMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerFanMode) (required)                       | `fan mode`                                                                                                                                                       |
| [`temperatureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#temperatureMeasurement) (required)       | `temperature`                                                                                                                                                    |
| [`thermostatCoolingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatCoolingSetpoint) (required) | `target temp`                                                                                                                                                    |
| [`demandResponseLoadControl`](https://developer.smartthings.com/docs/devices/capabilities/proposed#demandResponseLoadControl)                          | `drlc_status_duration` (state attribute), `drlc_status_level` (state attribute), `drlc_status_override` (state attribute), `drlc_status_start` (state attribute) |

#### Thermostats

For a SmartThings thermostat to be represented by the climate entity, it must have all the capabilities from either "set a" _or_ "set b". If it does not have all the capabilities, the features will be represented in Home Assistant as individual sensors instead of a climate entity.

| SmartThings capability                                                                                                                              | Related climate features in Home Assistant                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [`thermostat`](https://developer.smartthings.com/docs/devices/capabilities/deprecated#thermostat) (set a)                                           | `hvac mode`, `hvac action`, `target temp high`, `target temp low` and `fan mode` |
| [`thermostatMode`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatMode) (set b)                       | `hvac mode`                                                                      |
| [`thermostatHeatingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatHeatingSetpoint) (set b) | `target temp high`                                                               |
| [`temperatureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#temperatureMeasurement) (set b)       |
| [`thermostatOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatOperatingState)           | `hvac action`                                                                    |
| [`thermostatFanMode`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatFanMode)                         | `fan mode`                                                                       |
| [`relativeHumidityMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#relativeHumidityMeasurement)     | `humidity` (state attribute)                                                     |

### Cover

The SmartThings Cover platform lets you control devices that have open/close related capabilities. For a device to be represented by the cover entity, it must either have the `doorControl` or `windowShade` capability. Otherwise the features will be represented as individual sensors in Home Assistant.

| SmartThings capability                                                                                                     | Related cover features in Home Assistant |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [`doorControl`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#doorControl)            | `open` and `close`                       |
| [`windowShade`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#windowShade)            | `open` and `close`                       |
| [`switchLevel`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switchLevel)            | `position`                               |
| [`windowShadeLevel`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference/#windowShadeLevel) | `position`                               |
| [`battery`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#battery)                    | `battery_level` (state attribute)        |

### Fan

The SmartThings Fan lets you control devices that have fan-related capabilities. For a SmartThings device to be represented by the fan entity, it must have one or more of the capabilities below in addition to the [`switch`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch) capability.

| SmartThings capability                                                                                    | Related fan features in Home Assistant       |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| [`fanSpeed`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#fanSpeed) | `speed` (`off`, `low`, `medium`, and `high`) |

### Light

The SmartThings Light lets you control devices that have light-related capabilities. For a SmartThings device to be represented by the light entity, it must have one or more of the capabilities below in addition to the [`switch`](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch) capability.

| SmartThings capability                                                                                                    | Related light features in Home Assistant |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [`switchLevel`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switchLevel)           | `brightness` and `transition`            |
| [`colorControl`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#colorControl)         | `color`                                  |
| [`colorTemperature`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#colorTemperature) | `color_temp`                             |

### Lock

The SmartThings Lock platform lets you control devices that have the [`lock`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#lock) capability, showing current lock status and supporting lock and unlock commands.

### Sensor

The SmartThings Sensor platform lets your view devices that have sensor-related capabilities. A Sensor entity is created for each attribute (below) supported by the device.

| SmartThings capability                                                                                                                                        | Related entities in Home Assistant                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [`activityLightingMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#activityLightingMode)                                           | Activity lighting mode                                                   |
| [`airConditionerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerMode)                                               | Air conditioner mode                                                     |
| [`airQualitySensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#airQualitySensor)                                     | Air quality                                                              |
| [`alarm`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#alarm)                                                           | Alarm                                                                    |
| [`audioVolume`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#audioVolume)                                               | Volume                                                                   |
| [`battery`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#battery)                                                       | Battery                                                                  |
| [`bodyMassIndexMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/proposed#bodyMassIndexMeasurement)                                   | Body mass index                                                          |
| [`bodyWeightMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/proposed#bodyWeightMeasurement)                                         | Body weight                                                              |
| [`carbonDioxideMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#carbonDioxideMeasurement)                     | Carbon dioxide                                                           |
| [`carbonMonoxideDetector`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#carbonMonoxideDetector)                         | Carbon monoxide detector                                                 |
| [`carbonMonoxideMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/proposed#carbonMonoxideMeasurement)                                 | Carbon monoxide                                                          |
| [`dishwasherOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/proposed#dishwasherOperatingState)                                   | Machine state<br/>Job state<br/>Completion time                          |
| [`dryerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#dryerMode)                                                                 | Dryer mode                                                               |
| [`dryerOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/proposed#dryerOperatingState)                                             | Machine state<br/>Job state<br/>Completion time                          |
| [`dustSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#dustSensor)                                                 | PM10<br/>PM2.5                                                           |
| [`energyMeter`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#energyMeter)                                               | Energy                                                                   |
| [`equivalentCarbonDioxideMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#equivalentCarbonDioxideMeasurement) | Equivalent carbon dioxide                                                |
| [`formaldehydeMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#formaldehydeMeasurement)                       | Formaldehyde                                                             |
| [`gasMeter`](https://developer.smartthings.com/docs/devices/capabilities/proposed#gasMeter)                                                                   | Gas meter<br/>Gas meter calorific<br/>Gas meter time<br/>Gas             |
| [`illuminanceMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#illuminanceMeasurement)                         | Illuminance                                                              |
| [`infraredLevel`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#infraredLevel)                                           | Infrared level                                                           |
| [`mediaInputSource`](https://developer.smartthings.com/docs/devices/capabilities/proposed#mediaInputSource)                                                   | Media input source                                                       |
| [`mediaPlaybackRepeat`](https://developer.smartthings.com/docs/devices/capabilities/proposed#mediaPlaybackRepeat)                                             | Media playback repeat                                                    |
| [`mediaPlaybackShuffle`](https://developer.smartthings.com/docs/devices/capabilities/proposed#mediaPlaybackShuffle)                                           | Media playback shuffle                                                   |
| [`mediaPlayback`](https://developer.smartthings.com/docs/devices/capabilities/proposed#mediaPlayback)                                                         | Media playback status                                                    |
| [`odorSensor`](https://developer.smartthings.com/docs/devices/capabilities/proposed#odorSensor)                                                               | Odor sensor                                                              |
| [`ovenMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#ovenMode)                                                                   | Oven mode                                                                |
| [`ovenOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/proposed#ovenOperatingState)                                               | Machine state<br/>Job state<br/>Completion time                          |
| [`ovenSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/proposed#ovenSetpoint)                                                           | Set point                                                                |
| [`powerConsumptionReport`](https://developer.smartthings.com/docs/devices/capabilities/proposed#powerConsumptionReport)                                       | Energy difference<br/>Power energy<br/>Energy saved<br/>Power<br/>Energy |
| [`powerMeter`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#powerMeter)                                                 | Power                                                                    |
| [`powerSource`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#powerSource)                                               | Power source                                                             |
| [`refrigerationSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/proposed#refrigerationSetpoint)                                         | Set point                                                                |
| [`relativeHumidityMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#relativeHumidityMeasurement)               | Humidity                                                                 |
| [`robotCleanerCleaningMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#robotCleanerCleaningMode)                                   | Cleaning mode                                                            |
| [`robotCleanerMovement`](https://developer.smartthings.com/docs/devices/capabilities/proposed#robotCleanerMovement)                                           | Movement                                                                 |
| [`robotCleanerTurboMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#robotCleanerTurboMode)                                         | Turbo mode                                                               |
| [`signalStrength`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#signalStrength)                                         | Link quality<br/>Signal strength                                         |
| [`smokeDetector`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#smokeDetector)                                           | Smoke detector                                                           |
| [`temperatureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#temperatureMeasurement)                         | Temperature                                                              |
| [`thermostatCoolingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatCoolingSetpoint)                   | Cooling set point                                                        |
| [`thermostatFanMode`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatFanMode)                                   | Fan mode                                                                 |
| [`thermostatHeatingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatHeatingSetpoint)                   | Heating set point                                                        |
| [`thermostatMode`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatMode)                                         | Mode                                                                     |
| [`thermostatOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatOperatingState)                     | Operating state                                                          |
| [`thermostatSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/deprecated#thermostatSetpoint)                                             | Set point                                                                |
| [`threeAxis`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#threeAxis)                                                   | X coordinate<br/>Y coordinate<br/>Z coordinate                           |
| [`tvChannel`](https://developer.smartthings.com/docs/devices/capabilities/proposed#tvChannel)                                                                 | TV channel<br/>TV channel name                                           |
| [`tvocMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#tvocMeasurement)                                       | Volatile organic compounds                                               |
| [`ultravioletIndex`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#ultravioletIndex)                                     | UV index                                                                 |
| [`voltageMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#voltageMeasurement)                                 | Voltage                                                                  |
| [`washerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#washerMode)                                                               | Washer mode                                                              |
| [`washerOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/proposed#washerOperatingState)                                           | Machine state<br/>Job state<br/>Completion time                          |

### Scene

The SmartThings Scene lets you activate scenes defined in SmartThings. A scene entity is created for each SmartThings scene.

### Switch

The SmartThings Switch lets you control devices that have the [`switch`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switch) capability that are not already represented by a more specific platform.

## Troubleshooting

### Enabling debug logs and diagnostics

If debug logging is enabled, the integration shows all the received events in the logs. The log captures events for that device for 5 seconds, and return a JSON file with the state of the device and the events.
Debug logs can be helpful for diagnosing state updates, for example by selecting the button and then turning on the device physically.

- To enable debug logs, follow the [steps to enable debug logs](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).

## Removing the integration

{% include integrations/remove_device_service.md %}
4. Open the SmartThings app and delete the Home Assistant application from SmartThings.
