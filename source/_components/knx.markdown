---
layout: page
title: "KNX"
description: "Instructions on how to integrate KXN components with Home Assistant."
date: 2016-06-08 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: knx.png
ha_category: Hub
ha_release: 0.24
ha_iot_class: "Local Polling"
---

Overview
--------

-[KNX](http://www.knx.org) integration for Home Assistant allows you to connect to a KNX bus. The component requires a local KNX/IP interface like the [Weinzierl 730](http://www.weinzierl.de/index.php/en/all-knx/knx-devices-en/knx-ip-interface-730-en). Through this it will send and receive commands to and from other devices to the KNX bus.


Configuration:
--------------

### Platform:

```yaml
knx:
```

Optional, recommended for large KNX installations (>100 devices) and/or if you want to use the XKNX abstraction also for other scripted tools outside HASS:

```yaml
knx:
  config_file: '/path/to/xknx.yaml'
```
* **config_file**: (*Optional*) path for xknx configuration file.

If the autodetection of the KNX/IP device does not work you can specify ip/port of the tunneling device:

```yaml 
knx:
  tunneling:
    host: '192.168.2.23'
    port: 3671
    local_ip: '192.168.2.109'
```
* **host**: Host of KNX/IP tunneling device
* **port**: Port of KNX/IP tunneling device
* **local_ip**: IP of local interface

Explicit connction to a KNX/IP routing device:

```yaml
knx:
  config_file: '/path/to/xknx.yaml'
  routing:
     local_ip: '192.168.2.109'
```
* **local_ip**: local ip of interface (which should be used for multicasting)

```yaml
knx:
    fire_event: True
    fire_event_filter: ["1/0/*", "6/2,3,4-6/*"]
```

* **fire_event** (Optional) if set to True, platform will write all received KNX messages to event bus
* **fire_event_filter** If `fire_event` is set `fire_event_filter` has to be specified. `fire_event_filter` defines a list of pattterns for filtering KNX addresses. Only telegrams which match this pattern are send to the HASS event bus. 

### Light:

```yaml
light:
  - platform: knx
    name: Kitchen-Light-1
    address: '1/0/9'
    brightness_address: '1/0/11'

  - platform: knx
    name: Kitchen-Light-2
    address: '1/0/12'
    brightness_address: '1/0/14'
```
* **name** (*Optional*): A name for this devices used within Home Assistant.
* **address**: KNX group address for switching light on and off
* **brightness_address**: (Optional) KNX group address for dimming light.
* **state_address**: (*Optional*) separate KNX group address for retrieving the switch state of the light
* ***brightness_state_address***: (Optional) separate KNX group address for retrieving the dimm state of the light. 

### Switch:

```yaml
switch:
  - platform: knx
    name: Kitchen.Coffee
    address: '1/1/6'
```
* **name** (*Optional*): A name for this devices used within Home Assistant.
* **address**: KNX group address for switching switch on/off
* **state_address**: (*Optional*) separate KNX group address for retrieving the switch state. 

### Sensor:

```yaml
sensor:
  - platform: knx
    name: Heating.Valve1
    address: '2/0/0'
    type: 'percent'

  - platform: knx
    name: Kitchen.Temperature
    address: '6/2/1'
    value_type: 'temperature'
```

* **name** (*Optional*): A name for this devices used within Home Assistant.
* **address**: KNX group address of sensor
* **value_type**: (Optional) "percent", "temperature", "brightness", "speed_ms", "current"


### Binary Sensor:

```yaml
binary_sensor:
    - platform: knx
      name: "Entrance.Motion.Sensor"
      address: '6/0/2'
      device_class: 'motion'
      #significant_bit: 2
```

* **name** (*Optional*): A name for this devices used within Home Assistant.
* **address**: KNX group address of binary sensor
* **device_class**: (Optional) HASS device class e.g. "motion"
* **significant_bit**: (Optional) Specify which significant bit of the KNX value should be used. Default is 1.

You can also attach actions to binary sensors (e.g. to switch on a light when a switch was pressed). In this example I switch on one light when the button was pressed once and two others when the button was pressed a second time.

```yaml
binary_sensor:
    - platform: knx
      name: Livingroom.3Switch3
      address: '5/0/26'
      automation:
        - counter: 1
          hook: 'on'
          action:
            - entity_id: light.hue_color_lamp_1
              service: homeassistant.turn_on
        - counter: 2
          hook: 'on'
          action:
            - entity_id: light.hue_bloom_1
              service: homeassistant.turn_on
            - entity_id: light.hue_bloom_2
              service: homeassistant.turn_on
```

* **name** (*Optional*): A name for this devices used within Home Assistant.
* **counter**: (*Optional*) Set to 2 if your only want the action to be executed if the button was pressed twice. To 3 for 3 times button pressed. Defaults to 1.
* **hook**: (Optional): Indicates if the automation should be executed on what state of the binary sensor. Values: "on" or "off". Defaults to "on".
* **action**: Specify a list of actions analog to the [HASS automation rules](https://home-assistant.io/docs/automation/action/).

### Cover

```yaml
cover:
    - platform: knx
      name: "Kitchen.Shutter"
      move_long_address: '3/0/0'
      move_short_address: '3/0/1'
      position_address: '3/0/3'
      position_state_address: '3/0/2'
      travelling_time_down: 51
      travelling_time_up: 61
```
* **name** (*Optional*): A name for this devices used within Home Assistant.
* **move_long_address**: KNX group address for moving cover full up or down.
* **move_short_address**: (Optional) KNX group address for moving cover short time up or down.
* **position_address**: (*Optional*) KNX group address for moving cover to dedicated position.
* **position_state_address**: (Optional) Separate KNX group address for requesting the current position of cover.
* **travelling_time_down**: (*Optional*) Time cover needs to travel down in seconds. Needed to calculate the intermediate positions of cover while traveling. Defaults to 25.
* **travelling_time_up**: (*Optional*) Time cover needs to travel up in seconds. Needed to calculate the intermediate positions of cover while traveling. Defaults to 25.



### Climate:

```yaml
climate:
   - platform: knx
     name: HASS-Kitchen.Temperature
     temperature_address: '6/2/1'
     setpoint_address: '5/1/2'
     target_temperature_address: '5/1/1'
     operation_mode_address: '5/1/3'
```

alternatively, if your device has dedicated binary group addresses for frost/night/comfort mode:

```yaml
climate:
   - platform: knx
     name: HASS-Kitchen.Temperature
     temperature_address: '6/2/1'
     setpoint_address: '5/1/2'
     target_temperature_address: '5/1/1'
     operation_mode_frost_protection_address: '5/1/3'
     operation_mode_night_address: '5/1/4'
     operation_mode_comfort_address: '5/1/5'
```


* **name** (*Optional*): A name for this devices used within Home Assistant.
* **temperature_address**: KNX group address for reading current room temperature from KNX bus.
* **target_temperature_address**: KNX group address for reading current target temperature from KNX bus.
* **setpoint_address**: KNX group address for basis setpoint

* **operation_mode_address** (*Optional*) KNX address for operation mode (Frost protection/night/comfort).

* **operation_mode_frost_protection_address** (*Optional*) KNX address for switching on/off frost/heat protection mode.
* **operation_mode_night_address** (*Optional*) KNX address for switching on/off night nmode.
* **operation_mode_comfort_address** (*Optional*) KNX address for switching on/off comfort mode.

`operation_mode_frost_protection_address` / `operation_mode_night_address` / `operation_mode_comfort_address` are not necessary if `operation_mode_address` was specified.

### Notify

```yaml
notify:
    - platform: knx
      name: Alarm
      address: '5/1/10'
```

* **name** (*Optional*): A name for this devices used within Home Assistant.
* **address**: KNX group address of notification


### Service

In order to directly interact with the KNX bus, you can now use the following service:

Domain: knx
Service: send 
Service Data: {"address": "1/0/15", "payload": 0}

* **address** : KNX group addresss
* **payload** : payload, either an integer or an array of integers



Known issues:
-------------

Due to lame multicast support the routing abstraction and the gateway scanner
only work with python >=3.5.



