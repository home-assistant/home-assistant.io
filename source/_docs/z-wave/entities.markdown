---
layout: page
title: "Z-Wave Entity Naming"
description: "A summary of common entity names."
date: 2017-09-21 10:59
sidebar: true
comments: false
sharing: true
footer: true
---

<p class='note'>
This is a work in progress, based upon reports in the forum, the author's own devices, and reading of various documentation. It will be incomplete, so if you have a device that isn't reported here, or have a device that reports a different value, please provide a report in the [Z-Wave section](https://community.home-assistant.io/c/configuration/zwave) of the forum or the #zwave channel on [Discord](https://discord.gg/RkajcgS). 
</p>

## {% linkable_title Binary Sensor %}

Devices that support the Binary Sensor command class will create one (or more) entities starting with `binary_sensor`. For example, if the node is `door_sensor` then the binary sensor entity will be `binary_sensor.door_sensor`.

These will normally be `on` when the sensor is active, otherwise they will be `off`. Some devices use `on` for closed, and some use `on` for open, and some devices allow you to change how they report.

## {% linkable_title Alarm %}

This is for a single purpose sensor, multi sensors are explained under Multi Sensor.

Devices (usually sensors) that support the Alarm command class will create entities starting with `sensor`, and with some generic suffixes, and a suffix that relates to the supported alarm class. For example, the smoke detector `lounge` will have an entity `sensor.lounge_smoke`, and possibly also `sensor.lounge_alarm_type` and `sensor.lounge_alarm_level`. If the device creates a `binary_sensor` entity, it is recommended to use that rather then the `sensor` entity.

### {% linkable_title Alarm Type Entity %}

- **alarm_type**: Reports the type of the sensor
  - **0**: General purpose
  - **1**: Smoke sensor
  - **2**: Carbon Monoxide (CO) sensor
  - **3**: Carbon Dioxide (CO2) sensor
  - **4**: Heat sensor
  - **5**: Water leak sensor
  - **6**: Access control

### {% linkable_title Alarm Level Entity %}

The meaning of the `alarm_level` entity depends on the nature of the alarm sensor

#### {% linkable_title Smoke, CO, and CO2 %}

  - **1**: Detection - will include a Node Location Report
  - **2**: Detection (unknown location)
  - **254**: Unknown event

#### {% linkable_title Heat %}

  - **1**: Overheat detected - will include a Node Location Report
  - **2**: Overheat detected (unknown location)
  - **3**: Rapid temperature rise - will include a Node Location Report
  - **4**: Rapid temperature rise (unknown location)
  - **5**: Underheat detection - will include a Node Location Report
  - **6**: Underheat detection (unknown location)
  - **254**: Unknown event

#### {% linkable_title Water leak %}

  - **1**: Water leak detected - will include a Node Location Report
  - **2**: Water leak detected (unknown location)
  - **3**: Water level dropped - will include a Node Location Report
  - **4**: Water level dropped (unknown location)
  - **254**: Unknown event

#### {% linkable_title Access control %}

  - **1**: Manual lock
  - **2**: Manual unlock
  - **3**: RF lock
  - **4**: RF unlock
  - **5**: Keypad lock - will include the User Identifier of the User Code Report
  - **6**: Keypad unlock - will include the User Identifier of the User Code Report
  - **254**: Unknown event

#### {% linkable_title Burglar %}

  - **1**: Intrusion - will include a Node Location Report
  - **2**: Intrusion (unknown location)
  - **3**: Tampering (case opened)
  - **4**: Tampering (invalid code)
  - **5**: Glass break - will include a Node Location Report
  - **6**: Glass break (invalid code)
  - **254**: Unknown event

#### {% linkable_title Power Management %}

  - **1**: Power applied
  - **2**: AC disconnected
  - **3**: AC re-connected
  - **4**: Surge detection
  - **5**: Voltage drop or drift
  - **254**: Unknown event

#### {% linkable_title System Alarm %}

  - **1**: System hardware failure
  - **2**: System software failure
  - **254**: Unknown event

#### {% linkable_title Emergency Alarm %}

  - **1**: Contact Police
  - **2**: Contact Fire Service
  - **3**: Contact Medical Service
  - **254**: Unknown event

#### {% linkable_title Alarm Clock %}

  - **1**: Wake up
  - **254**: Unknown event

### {% linkable_title Access Control Entity %}

- **access_control**: These *may* vary between brands
  - **22**: Open
  - **23**: Closed
  - **254**: Deep sleep
  - **255**: Case open

If your device has an `access_control` entity, but not a `binary_sensor` equivalent, you can use a [template binary sensor](/components/binary_sensor.template/) to create one:

```
binary_sensor:
  - platform: template
    sensors: 
      YOUR_SENSOR:
        friendly_name: "Friendly name here"
        value_template: >- 
          {% raw %}{%- if is_state('sensor.YOUR_ORIGINAL_SENSOR_access_control', '22') -%}
          true
          {%- else -%}
          false
          {%- endif -%}{% endraw %}
```

### {% linkable_title Burglar Entity %}

- **burglar**: These *may* vary between brands
   - **0**: Not active
   - **2**: Smoke (?)
   - **3**: Tamper
   - **8**: Motion
   - **22**: Open
   - **23**: Closed
   - **254**: Deep sleep
   - **255**: Case open

If your device has an `burglar` entity, but not a `binary_sensor` equivalent, you can use a [template binary sensor](/components/binary_sensor.template/) to create one:

```
binary_sensor:
  - platform: template
    sensors: 
      YOUR_SENSOR:
        friendly_name: "Friendly name here"
        value_template: >-
          {% raw %}{%- if is_state('sensor.YOUR_SENSOR_burglar', '8') -%}
          true
          {%- else -%}
          false
          {%- endif -%}{% endraw %}
```

### {% linkable_title Source Node ID Entity %}

- **sourcenodeid**: Reports the sensor that generated the alarm - this is only valid for Zensor Net based devices

## {% linkable_title Multisensor %}

Multi sensor devices will create a number of entities, one for each sensor, potentially a `binary_sensor` entity, and probably also `alarm_type` and `alarm_level` entities.

These are all generally self explanatory, however it's worth noting:

- **ultraviolet** sensors will usually report zero indoors, as UVB is blocked by glass
- **luminance** sensors should report in [Lux](https://en.wikipedia.org/wiki/Lux)
