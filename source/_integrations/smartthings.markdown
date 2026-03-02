---
title: SmartThings
description: Instructions on setting up SmartThings within Home Assistant.
featured: true
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Event
  - Fan
  - Hub
  - Light
  - Lock
  - Media player
  - Number
  - Scene
  - Select
  - Sensor
  - Switch
  - Update
  - Vacuum
  - Valve
  - Water heater
ha_release: 0.87
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: smartthings
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - event
  - fan
  - light
  - lock
  - media_player
  - number
  - scene
  - select
  - sensor
  - switch
  - update
  - vacuum
  - valve
  - water_heater
ha_dhcp: true
ha_integration_type: hub
ha_codeowners:
  - '@joostlek'
ha_quality_scale: bronze
---

[SmartThings](https://www.samsung.com/smartthings/) is a home automation platform for connecting with Samsung or third-party devices.

## Prerequisites

- You need a Samsung account and account credentials.
- To connect devices, you need the SmartThings app installed on your phone.

{% include integrations/config_flow.md %}

## Supported functionality

SmartThings represents devices as a set of [capabilities](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference). The SmartThings integration maps those capabilities to entities in Home Assistant. A single device may be represented by one or more entities.

- [Binary sensor](#binary-sensor)
- [Button](#button)
- [Climate](#climate)
- [Cover](#cover)
- [Event](#event)
- [Fan](#fan)
- [Light](#light)
- [Lock](#lock)
- [Media player](#media-player)
- [Number](#number)
- [Scene](#scene)
- [Select](#select)
- [Sensor](#sensor)
- [Switch](#switch)
- [Update](#update)
- [Vacuum](#vacuum)
- [Valve](#valve)
- [Water heater](#water-heater)

### Binary sensor

In Home Assistant, a binary sensor entity will be created for each of the following SmartThings capabilities:

| SmartThings capability                                                                                                          |
|---------------------------------------------------------------------------------------------------------------------------------|
| `accelerationSensor`                                                                                                            |
| [`contactSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#contactSensor)             |
| `custom.dryerWrinklePrevent`                                                                                                    |
| `custom.ovenCavityStatus`                                                                                                       |
| `custom.waterFilter`                                                                                                            |
| [`filterStatus`](https://developer.smartthings.com/docs/devices/capabilities/proposed#filterStatus)                             |
| [`gasDetector`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#gasDetector)                 |
| [`motionSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#motionSensor)               |
| [`presenceSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#presenceSensor)           |
| [`remoteControlStatus`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#remoteControlStatus) |
| `samsungce.doorState`                                                                                                           |
| `samsungce.kidsLock`                                                                                                            |
| `samsungce.steamClosetKeepFreshMode`                                                                                            |
| [`soundSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#soundSensor)                 |
| `switch` (only for appliance categories such as washers, dryers, dishwashers, cooktops, microwaves, and clothing care machines) |
| [`tamperAlert`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#tamperAlert)                 |
| [`waterSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#waterSensor)                 |

### Button

The SmartThings Button platform provides the following buttons:

| SmartThings capability                                                                                                            | Button                |
|-----------------------------------------------------------------------------------------------------------------------------------|-----------------------|
| [`ovenOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#ovenOperatingState)     | Stop                  |
| `custom.waterFilter`                                                                                                              | Reset water filter    |
| `samsungce.hoodFilter`                                                                                                            | Reset hood filter     |

### Climate

The SmartThings Climate platform lets you control devices that have air conditioner, thermostat, or heat pump related capabilities.

#### Air conditioners

For a SmartThings Air Conditioner to be represented by the climate entity, it must have all of the following required capabilities. If it does not have all the capabilities, the features will be represented in Home Assistant as individual sensors instead of a climate entity.

| SmartThings capability                                                                                                                                 | Related climate features in Home Assistant                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`airConditionerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerMode) (required)                             | `hvac mode`                                                                                                                                                      |
| [`airConditionerFanMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerFanMode) (required)                       | `fan mode`                                                                                                                                                       |
| [`switch`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switch) (required)                                       | `turn on`, `turn off`                                                                                                                                            |
| [`temperatureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#temperatureMeasurement) (required)       | `temperature`                                                                                                                                                    |
| [`thermostatCoolingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatCoolingSetpoint) (required) | `target temp`                                                                                                                                                    |
| `custom.airConditionerOptionalMode`                                                                                                                    | `preset mode`                                                                                                                                                    |
| [`demandResponseLoadControl`](https://developer.smartthings.com/docs/devices/capabilities/proposed#demandResponseLoadControl)                          | `drlc_status_duration` (state attribute), `drlc_status_level` (state attribute), `drlc_status_override` (state attribute), `drlc_status_start` (state attribute) |
| [`fanOscillationMode`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#fanOscillationMode)                          | `swing mode`                                                                                                                                                     |

#### Thermostats

For a SmartThings thermostat to be represented by the climate entity, it must have all of the required capabilities. If it does not have all the capabilities, the features will be represented in Home Assistant as individual sensors instead of a climate entity.

| SmartThings capability                                                                                                                              | Related climate features in Home Assistant |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [`thermostatMode`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatMode) (required)                    | `hvac mode`                                |
| [`thermostatHeatingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatHeatingSetpoint) (required) | `target temp`, `target temp low`        |
| [`temperatureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#temperatureMeasurement) (required)    | `temperature`                              |
| [`thermostatCoolingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatCoolingSetpoint)         | `target temp`, `target temp high`          |
| [`thermostatOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatOperatingState)           | `hvac action`                              |
| [`thermostatFanMode`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatFanMode)                         | `fan mode`                                 |
| [`relativeHumidityMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#relativeHumidityMeasurement)     | `humidity` (state attribute)               |

#### Heat pump zones

For a SmartThings heat pump zone to be represented by the climate entity, it must have all of the required capabilities on an `INDOOR`, `INDOOR1`, or `INDOOR2` component.

| SmartThings capability                                                                                                                                 | Related climate features in Home Assistant |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| [`airConditionerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerMode) (required)                             | `hvac mode`                                |
| [`switch`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switch) (required)                                       | `turn on`, `turn off`                      |
| [`temperatureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#temperatureMeasurement) (required)       | `temperature`                              |
| [`thermostatCoolingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatCoolingSetpoint) (required) | `target temp`                              |
| `custom.thermostatSetpointControl` (required)                                                                                                          | `min temp`, `max temp`                     |

### Cover

The SmartThings Cover platform lets you control devices that have open/close related capabilities. For a device to be represented by the cover entity, it must either have the `doorControl` or `windowShade` capability. Otherwise the features will be represented as individual sensors in Home Assistant.

| SmartThings capability                                                                                                     | Related cover features in Home Assistant |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [`doorControl`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#doorControl)            | `open` and `close`                       |
| [`windowShade`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#windowShade)            | `open` and `close`                       |
| [`switchLevel`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switchLevel)            | `position`                               |
| [`windowShadeLevel`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference/#windowShadeLevel) | `position`                               |
| [`battery`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#battery)                    | `battery_level` (state attribute)        |

### Event

The SmartThings Event platform will create entities for every button. It will show any button presses and allows you to automate on these events.

### Fan

The SmartThings Fan lets you control devices that have fan-related capabilities. For a SmartThings device to be represented by the fan entity, it must have one or more of the capabilities below in addition to the [`switch`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switch) capability. Devices with `fanSpeed` or `airConditionerFanMode` that also have `thermostatCoolingSetpoint` will be represented as climate entities instead.

| SmartThings capability                                                                                                                                  | Related fan features in Home Assistant |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| [`fanSpeed`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#fanSpeed)                                               | `speed` (percentage)                   |
| [`airConditionerFanMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerFanMode)                                   | `preset mode`                          |
| `samsungce.hoodFanSpeed` (creates a separate hood fan entity for range hoods with smart fan speed support)                                              | `speed` (percentage), `preset mode`    |

### Light

The SmartThings Light lets you control devices that have light-related capabilities. For a SmartThings device to be represented by the light entity, it must have one or more of the capabilities below in addition to the [`switch`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switch) capability.

| SmartThings capability                                                                                                    | Related light features in Home Assistant |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [`switchLevel`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switchLevel)           | `brightness` and `transition`            |
| [`colorControl`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#colorControl)         | `color`                                  |
| [`colorTemperature`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#colorTemperature) | `color_temp`                             |

### Lock

The SmartThings Lock platform lets you control devices that have the [`lock`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#lock) capability, showing current lock status and supporting lock and unlock commands.

### Media player

The SmartThings Media player lets you control devices that have media player-related capabilities. For a SmartThings device to be represented by the media player entity, it must have all required capabilities.

| SmartThings capability                                                                                                            | Related media player features in Home Assistant                                       |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [`audioMute`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#audioMute) (required)            | `volume_mute`                                                                         |
| [`audioVolume`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#audioVolume) (required)        | `volume_up`, `volume_down`, `volume_set`                                              |
| [`audioTrackData`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#audioTrackData)             | `media_title` and `media_artist`                                                      |
| [`mediaPlayback`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#mediaPlayback)               | `media_play`, `media_pause`, `media_stop`, `media_next_track`, `media_previous_track` |
| [`mediaInputSource`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#mediaInputSource)         | `select_source`                                                                       |
| [`mediaPlaybackRepeat`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#mediaPlaybackRepeat)   | `repeat_set`                                                                          |
| [`mediaPlaybackShuffle`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#mediaPlaybackShuffle) | `shuffle_set`                                                                         |
| [`switch`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switch)                             | `turn_on`, `turn_off`                                                                 |

### Number

The SmartThings number platform lets you control numeric values for the following capabilities:

| SmartThings capability                                                                                                                                 | Number entity                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `custom.washerRinseCycles`                                                                                                                             | Washer rinse cycles          |
| `samsungce.hoodFanSpeed` (on hood component)                                                                                                           | Hood fan speed               |
| [`thermostatCoolingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatCoolingSetpoint) (on cooler, freezer, or onedoor components) | Refrigerator temperature |

### Scene

The SmartThings scene platform lets you activate scenes that you defined in SmartThings. A scene entity is created for each SmartThings scene.

### Select

The SmartThings Select platform lets you configure device options. Some capabilities require remote control to be enabled on the device before they can be changed.

The following SmartThings capabilities are supported for Select entities:

| SmartThings capability                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------ |
| `custom.washerSoilLevel`                                                                                                                   |
| `custom.washerSpinLevel`                                                                                                                   |
| `custom.washerWaterTemperature`                                                                                                            |
| [`dishwasherOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#dishwasherOperatingState)  |
| [`dryerOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#dryerOperatingState)            |
| `samsungce.autoDispenseDetergent`                                                                                                          |
| `samsungce.dishwasherWashingOptions`                                                                                                       |
| `samsungce.dustFilterAlarm`                                                                                                                |
| `samsungce.flexibleAutoDispenseDetergent`                                                                                                  |
| `samsungce.lamp`                                                                                                                           |
| [`washerOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#washerOperatingState)          |

### Sensor

The SmartThings Sensor platform lets you view devices that have sensor-related capabilities. A Sensor entity is created for each attribute (below) supported by the device.

| SmartThings capability                                                                                                                                        | Related entities in Home Assistant                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [`activityLightingMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#activityLightingMode)                                           | Activity lighting mode                                                   |
| [`airConditionerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerMode)                                               | Air conditioner mode                                                     |
| [`airQualitySensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#airQualitySensor)                                     | Air quality                                                              |
| [`alarm`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#alarm)                                                           | Alarm                                                                    |
| [`atmosphericPressureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#atmosphericPressureMeasurement)         | Atmospheric pressure                                                     |
| [`audioVolume`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#audioVolume)                                               | Volume                                                                   |
| [`battery`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#battery)                                                       | Battery                                                                  |
| [`bodyMassIndexMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/proposed#bodyMassIndexMeasurement)                                   | Body mass index                                                          |
| [`bodyWeightMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/proposed#bodyWeightMeasurement)                                         | Body weight                                                              |
| [`carbonDioxideMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#carbonDioxideMeasurement)                     | Carbon dioxide                                                           |
| [`carbonMonoxideDetector`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#carbonMonoxideDetector)                         | Carbon monoxide detector                                                 |
| [`carbonMonoxideMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/proposed#carbonMonoxideMeasurement)                                 | Carbon monoxide                                                          |
| `custom.cooktopOperatingState`                                                                                                                                | Cooktop operating state                                                  |
| `custom.waterFilter`                                                                                                                                          | Water filter usage                                                       |
| [`dishwasherOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/proposed#dishwasherOperatingState)                                   | Machine state<br/>Job state<br/>Completion time                          |
| [`dryerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#dryerMode)                                                                 | Dryer mode                                                               |
| [`dryerOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/proposed#dryerOperatingState)                                             | Machine state<br/>Job state<br/>Completion time                          |
| [`dustHealthConcern`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#dustHealthConcern)                                   | PM10 health concern                                                      |
| [`dustSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#dustSensor)                                                 | PM10<br/>PM2.5                                                           |
| [`energyMeter`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#energyMeter)                                               | Energy                                                                   |
| [`equivalentCarbonDioxideMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#equivalentCarbonDioxideMeasurement) | Equivalent carbon dioxide                                                |
| [`fineDustHealthConcern`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#fineDustHealthConcern)                           | PM2.5 health concern                                                     |
| [`fineDustSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#fineDustSensor)                                         | PM2.5                                                                    |
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
| `relativeBrightness`                                                                                                                                          | Brightness intensity                                                     |
| [`refrigerationSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/proposed#refrigerationSetpoint)                                         | Set point                                                                |
| [`relativeHumidityMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#relativeHumidityMeasurement)               | Humidity                                                                 |
| [`robotCleanerCleaningMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#robotCleanerCleaningMode)                                   | Cleaning mode                                                            |
| [`robotCleanerMovement`](https://developer.smartthings.com/docs/devices/capabilities/proposed#robotCleanerMovement)                                           | Movement                                                                 |
| [`robotCleanerTurboMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#robotCleanerTurboMode)                                         | Turbo mode                                                               |
| `samsungce.cooktopHeatingPower`                                                                                                                               | Manual level<br/>Heating mode                                            |
| `samsungce.ehsDiverterValve`                                                                                                                                  | Diverter valve position                                                  |
| `samsungce.hoodFilter`                                                                                                                                        | Hood filter usage                                                        |
| `samsungce.waterConsumptionReport`                                                                                                                            | Water consumption                                                        |
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
| [`veryFineDustHealthConcern`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#veryFineDustHealthConcern)                   | PM1.0 health concern                                                     |
| [`veryFineDustSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#veryFineDustSensor)                                 | PM1.0                                                                    |
| [`voltageMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#voltageMeasurement)                                 | Voltage                                                                  |
| [`washerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#washerMode)                                                               | Washer mode                                                              |
| [`washerOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/proposed#washerOperatingState)                                           | Machine state<br/>Job state<br/>Completion time                          |

### Switch

The SmartThings Switch lets you control devices that have the [`switch`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switch) capability that are not already represented by a more specific platform. It will also create switches for the following capabilities:

| SmartThings capability                 |
|----------------------------------------|
| `custom.dryerWrinklePrevent`           |
| `samsungce.airConditionerBeep`         |
| `samsungce.airConditionerLighting`     |
| `samsungce.dishwasherWashingOptions`   |
| `samsungce.powerCool`                  |
| `samsungce.powerFreeze`               |
| `samsungce.sabbathMode`               |
| `samsungce.steamClosetAutoCycleLink`   |
| `samsungce.steamClosetKeepFreshMode`   |
| `samsungce.steamClosetSanitizeMode`    |
| `samsungce.washerBubbleSoak`           |

### Update

The SmartThings update platform lets you update the firmware of devices that have the [`firmwareUpdate`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#firmwareUpdate) capability.

### Vacuum

The SmartThings Vacuum platform lets you control devices that have the `samsungce.robotCleanerOperatingState` capability, showing the vacuum status and controlling the device.

### Valve

The SmartThings Valve platform lets you control devices that have the [`valve`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#valve) capability, showing the valve status and opening and closing.

### Water heater

The SmartThings Water heater platform lets you control heat pumps that provide hot water. For a device to be represented by the water heater entity, it must have all of the following capabilities:

| SmartThings capability                                                                                                                                 | Related water heater features in Home Assistant |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| [`switch`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switch) (required)                                       | `turn on`, `turn off`                           |
| [`airConditionerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerMode) (required)                             | `operation mode`                                |
| [`temperatureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#temperatureMeasurement) (required)       | `temperature`                                   |
| `custom.thermostatSetpointControl` (required)                                                                                                          | `min temp`, `max temp`                          |
| [`thermostatCoolingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatCoolingSetpoint) (required) | `target temp`                                   |
| `samsungce.ehsThermostat` (required)                                                                                                                   |                                                 |
| `custom.outingMode` (required)                                                                                                                         | `away mode`                                     |

## Troubleshooting

### Enabling debug logs

If debug logging is enabled, the integration shows all the received events in the logs. The log captures events for that device for 5 seconds, and returns a JSON file with the state of the device and the events.
Debug logs can be helpful for diagnosing state updates, for example by selecting the button and then turning on the device physically.

- To enable debug logs, follow the [steps to enable debug logs](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).

### Missing device functionality

The SmartThings integration does not support all SmartThings capabilities. Only the capabilities listed in this documentation are supported. If a feature of your device is not available in Home Assistant, there are a few possible reasons:

1. To see which capabilities are currently implemented, check the [supported functionality](#supported-functionality) section.
   - The capability you are looking for might not yet be supported by this integration. 
2. To see if the necessary capability is available for your device in the API, check the [SmartThings Developer Portal](https://my.smartthings.com/advanced/devices).
   - Some device features are only available in the SmartThings app and are not exposed through the API. 
3. If the capability is available in the SmartThings API but not yet supported by this integration, you can request support by creating a [GitHub Discussion](https://github.com/orgs/home-assistant/discussions?discussions_q=is%3Aopen+label%3A%22integration%3A+smartthings%22). 
   - Do not create a GitHub Issue for feature requests, as issues are intended for bug reports.

### Viewing device diagnostics

The SmartThings integration provides diagnostics at two levels. To download diagnostics, follow the [steps to download diagnostics](/docs/configuration/troubleshooting/#download-diagnostics).

- **Device diagnostics**: Contains all capabilities and their current states for a single device. This is useful when troubleshooting a specific device — it shows exactly what capabilities, attributes, and attribute values the device exposes to the SmartThings API.
- **Config entry diagnostics**: Contains information about all capabilities and devices in your SmartThings location, but without the current state values. This is useful for getting a comprehensive overview of available capabilities across all your connected devices.

## Removing the integration

{% include integrations/remove_device_service.md %}
4. Open the SmartThings app and delete the Home Assistant application from SmartThings.
