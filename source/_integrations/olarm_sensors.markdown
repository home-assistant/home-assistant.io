---
title: Olarm Sensors
description: Instructions on how to integrate your Olarm Pro 4G devices within Home Assistant.
ha_category:
  - Alarm Control Panel
  - Binary Sensor
  - Button
  - Switch 
  - Update
ha_release: 2.2.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: olarm_sensors
ha_dhcp: false
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - switch
  - update
ha_integration_type: integration
---

The Ring integration allows you to integrate your [Olarm Pro 4G](https://olarm.com/products/olarm-pro-4g/datasheet) devices in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [AlarmControlPanel](#alarmcontrolpanel)
- [Binary Sensor](#binary-sensor)
- [Buttons](#buttons)
- [Switch](#switch)


{% include integrations/config_flow.md %}


## AlarmControlPanel
There is an alarm control panel for each area enabled on your alarm panel. This allows you to set the state of each area individually. If you have a Nemtek electric fence, the integration is currently coded to enable arming and disarming of the electric fence.
The integration can trigger your armed response radio if it is triggered via a PGM. Please rename the pgm in the Olarm App to Radio Alarm.

## Binary Sensor

Binary sensors are used for simple alarm panel zones and sensors. The following are examples:
1. Motion Sensors (BinarySensorDeviceClass.MOTION)
2. Door Sensors (BinarySensorDeviceClass.DOOR)
3. Window Sensors (BinarySensorDeviceClass.WINDOW)
4. Powered by AC (BinarySensorDeviceClass.PLUG)
5. Powered by Battery (BinarySensorDeviceClass.POWER)

## Buttons
There are buttons to refresh the data from the Olarm API, activate the PGM's, and activate Utility keys. The following is how it is set up:
1. If your PGM has been set up as pulse or pulsing for the specified PGM has been enabled, it will show up as a button that can be pressed.
2. There is a refresh button that refreshes the data from the Olarm API.
3. There is buttons to toggle Utility Keys set up on your alarm.

## Switch
There are switches that are used to activate or deactivate specified PGM's that were not set up to pulse and switches for bypassing zones. It is set up as follows:
1. There is a switch for each zone/sensor on your alarm panel, which allows you to bypass that certain zone/sensor. (Switch on = bypassed, Switch off = active)
2. If the specified PGM was not set up to pulse/pulsing disabled, there will be a switch that allows you to turn the PGM on and off.
