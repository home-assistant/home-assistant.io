---
title: "Z-Wave Entity Naming"
description: "A summary of common entity names."
---

<div class='note'>

This Z-Wave integration is deprecated and replaced with a [new implementation based on Z-Wave JS](/integrations/zwave_js); it's currently in beta, and you can [try it now](/integrations/zwave_js/).

</div>

## Binary Sensor

Devices that support the Binary Sensor command class will create one (or more) entities starting with `binary_sensor`. For example, if the node is `door_sensor` then the binary sensor entity will be `binary_sensor.door_sensor`.

These will normally be `on` when the sensor is active, otherwise they will be `off`. Some devices use `on` for closed, and some use `on` for open, and some devices allow you to change how they report.

## Alarm

This is for a single purpose sensor, multi sensors are explained under Multi Sensor.

Devices (usually sensors) that support the Alarm command class will create entities starting with `sensor`, and with some generic suffixes, and a suffix that relates to the supported alarm class. For example, the smoke detector `lounge` will have an entity `sensor.lounge_smoke`, and possibly also `sensor.lounge_alarm_type` and `sensor.lounge_alarm_level`. If the device creates a `binary_sensor` entity, it is recommended to use that rather then the `sensor` entity.

Note that the older Z-Wave alarm command class version 1 didn't have standardized types, and so each manufacturer specified their own version and type info. With Version 2 the alarm type was standardized to the below list. See the [openzwave alarm command class documents](https://github.com/OpenZWave/open-zwave/wiki/Alarm-Command-Class) for more info. You can see which version your sensor supports via the `zwcfg_0x*.xml` file. An example with version 2 support:

```xml
<CommandClass id="113" name="COMMAND_CLASS_ALARM" version="2" request_flags="2" innif="true">
```

### Alarm Type Entity

[//]: # (from the openzwave source found here: https://github.com/OpenZWave/open-zwave/blob/master/cpp/src/command_classes/Alarm.cpp#L56)

- Version 2 **alarm_type**:
  - **0**: General purpose
  - **1**: Smoke sensor
  - **2**: Carbon Monoxide (CO) sensor
  - **3**: Carbon Dioxide (CO2) sensor
  - **4**: Heat sensor
  - **5**: Water leak (flood) sensor
  - **6**: Access control
  - **7**: Burglar
  - **8**: Power management
  - **9**: System
  - **10**: Emergency
  - **11**: Clock
  - **12**: Appliance
  - **13**: Home Health

- Version 1 (manufacturer-specific) **alarm_type**:
  - **9**: Lock jammed
  - **18**: Lock locked with user code
  - **19**: Lock unlocked with user code
  - **21**: Manual lock
  - **22**: Manual unlock
  - **24**: Locked by RF
  - **25**: Unlocked by RF
  - **27**: Auto lock
  - **33**: User deleted
  - **112**: Master code changed, or user added
  - **113**: Duplicate PIN code error
  - **130**: RF Module power cycled
  - **161**: Tamper alarm
  - **167**: Low battery
  - **168**: Critical battery level
  - **169**: Battery too low to operate

### Alarm Level Entity

The meaning of the `alarm_level` entity depends on the nature of the alarm sensor.

#### Smoke, CO, and CO2

- **1**: Detection - will include a Node Location Report
- **2**: Detection (unknown location)
- **254**: Unknown event

#### Heat

- **1**: Overheat detected - will include a Node Location Report
- **2**: Overheat detected (unknown location)
- **3**: Rapid temperature rise - will include a Node Location Report
- **4**: Rapid temperature rise (unknown location)
- **5**: Underheat detection - will include a Node Location Report
- **6**: Underheat detection (unknown location)
- **254**: Unknown event

#### Water leak

- **1**: Water leak detected - will include a Node Location Report
- **2**: Water leak detected (unknown location)
- **3**: Water level dropped - will include a Node Location Report
- **4**: Water level dropped (unknown location)
- **254**: Unknown event

#### Access control

- **1**: Manual lock
- **2**: Manual unlock
- **3**: RF lock
- **4**: RF unlock
- **5**: Keypad lock - will include the User Identifier of the User Code Report
- **6**: Keypad unlock - will include the User Identifier of the User Code Report
- **254**: Unknown event

#### Burglar

- **1**: Intrusion - will include a Node Location Report
- **2**: Intrusion (unknown location)
- **3**: Tampering (case opened)
- **4**: Tampering (invalid code)
- **5**: Glass break - will include a Node Location Report
- **6**: Glass break (invalid code)
- **254**: Unknown event

#### Power Management

- **1**: Power applied
- **2**: AC disconnected
- **3**: AC re-connected
- **4**: Surge detection
- **5**: Voltage drop or drift
- **254**: Unknown event

#### System Alarm

- **1**: System hardware failure
- **2**: System software failure
- **254**: Unknown event

#### Emergency Alarm

- **1**: Contact Police
- **2**: Contact Fire Service
- **3**: Contact Medical Service
- **254**: Unknown event

#### Alarm Clock

- **1**: Wake up
- **254**: Unknown event

### Access Control Entity

- **access_control**: These *may* vary between brands
  - **22**: Open
  - **23**: Closed
  - **254**: Deep sleep
  - **255**: Case open

If your device has an `access_control` entity, but not a `binary_sensor` equivalent, you can use a [template binary sensor](/integrations/binary_sensor.template/) to create one (here we've defined it as a door, but you can use [any relevant device class](/integrations/binary_sensor/#device-class):

{% raw %}

```yaml
binary_sensor:
  - platform: template
    sensors:
      YOUR_SENSOR:
        friendly_name: "Friendly name here"
        device_class: door
        value_template: "{{ is_state('sensor.YOUR_ORIGINAL_SENSOR_access_control', '22') }}"
```

{% endraw %}

### Burglar Entity

- **burglar**: These *may* vary between brands
  - **0**: Not active
  - **2**: Smoke (?)
  - **3**: Tamper
  - **8**: Motion
  - **22**: Open
  - **23**: Closed
  - **254**: Deep sleep
  - **255**: Case open

If your device has a `burglar` entity, but not a `binary_sensor` equivalent, you can use a [template binary sensor](/integrations/binary_sensor.template/) to create one (here we've defined it as a motion sensor, but you can use [any relevant device class](/integrations/binary_sensor/#device-class):

{% raw %}

```yaml
binary_sensor:
  - platform: template
    sensors:
      YOUR_SENSOR:
        friendly_name: "Friendly name here"
        device_class: motion
        value_template: "{{ is_state('sensor.YOUR_SENSOR_burglar', '8') }}"
```

{% endraw %}

### Source Node ID Entity

- **sourcenodeid**: Reports the sensor that generated the alarm - this is only valid for Zensor Net based devices

## Multisensor

Multi sensor devices will create a number of entities, one for each sensor, potentially a `binary_sensor` entity, and probably also `alarm_type` and `alarm_level` entities.

These are all generally self explanatory, however it's worth noting:

- **ultraviolet** sensors will usually report zero indoors, as UVB is blocked by glass
- **luminance** sensors should report in [Lux](https://en.wikipedia.org/wiki/Lux)
