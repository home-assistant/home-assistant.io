---
layout: page
title: "Envisalink Alarm Control Panel"
description: "Instructions on how to integrate a DSC/Honeywell alarm panel with Home Assistant using an envisalink evl3/evl4 board."
date: 2016-09-30 22:45
sidebar: true
comments: false
sharing: true
footer: true
logo: eyezon.png
ha_category: Alarm
ha_release: 0.23
ha_iot_class: "Local Push"
---

The `envisalink` component will allow Home Assistant users who own either a DSC or Honeywell alarm panel to leverage their alarm system and its sensors to provide Home Assistant with rich information about their homes. Connectivity between Home Assistant and the alarm panel is accomplished through a device produced by Eyez On, known as the Envisalink. The Envisalink evl3 and evl4 boards provide a TCP/IP interface to the alarm panel, where it emulates an alarm keypad. This board also exposes a raw TCP/IP based API, upon which this component is built. Currently, the Envisalink version 4 is the latest model. This component supports both the evl3 and the evl4.

Please visit the [eyezon website](http://www.eyezon.com/) for further information about the evl3 and evl4 boards.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](/components/binary_sensor.envisalink/): Reports on zone status
- [Sensor](/components/sensor.envisalink/): Emulates an alpha-numeric keypad attached to the alarm panel
- [Alarm Control Panel](/components/alarm_control_panel.envisalink/): Reports on partition status, and can be used to arm/disarm the system

This is a fully event-based component. Any event sent by the Envisalink device will be immediately reflected within Home Assistant.

As of 0.29, the alarm_trigger service is supported.  It is possible to fire off an envisalink-based alarm directly from Home Assistant.  For example, a newer zwave/zigbee sensor can now be integrated into a legacy alarm system using a Home Assistant automation.

An `envisalink` section must be present in the `configuration.yaml` file and contain the following options as required:

```yaml
# Example configuration.yaml entry
envisalink:
  host: <envisalink IP address>
  panel_type: HONEYWELL or DSC
  user_name: YOUR_USERNAME
  password: YOUR_PASSWORD
  code: '1234'
  port: 4025
  evl_version: 3
  keepalive_interval: 60
  zonedump_interval: 30
  panic_type: Police
  zones:
    11:
      name: 'Back Door'
      type: 'opening'
    21:
      name: 'First Floor Motion'
      type: 'motion'
  partitions:
    1:
      name: 'Home Alarm'
```

Configuration variables:

- **host** (*Required*): The IP address of the Envisalink device on your home network.
- **panel_type** (*Required*): `HONEYWELL` or `DSC`, depending upon which alarm system you have.
- **user_name** (*Required*): Which username to authenticate with when connecting to the device. On a Honeywell alarm panel, the username/password are the same.
- **password** (*Required*): Which password to authenticate with when connecting to the device. EVL3 only works with max. 6 characters.
- **code** (*Required*): Your alarm panel's code, for authenticating user input during arm/disarm.
- **port** (*Optional*): Which network port to connect with. Default: `4025`
- **evl_version** (*Optional*): 3 for evl3, or 4 for evl4. Default: `3`
- **keepalive_interval** (*Optional*): This is a periodic heartbeat signal (measured in seconds) sent to your Envisalink board to keep it from restarting.  This is required for DSC and Honeywell systems. Defaults to `60` seconds.
- **zonedump_interval** (*Optional*): This is an interval (measured in seconds) where the evl will dump out all zone statuses.  This is required for Honeywell systems, which do not properly send zone closure events.  DSC boards do not technically need this. Default: `30`
- **panic_type** (*Optional*): Both DSC and Honeywell boards support a "panic" alarm. This is used when the alarm_trigger service is called in Home Assistant. This determines which type of panic alarm to raise.  Default = Police. Valid values are: Police, Fire, Ambulance
- **zones** (*Optional*): Envisalink boards have no way to tell us which zones are actually in use, so each zone must be configured in Home Assistant. For each zone, at least a name must be given. For more information on the available zone types, take a look at the [Binary Sensor](/components/binary_sensor.envisalink/) docs. *Note: If no zones are specified, Home Assistant will not load any binary_sensor components.*
- **partitions** (*Optional*): Again, Envisalink boards do not tell us what is in use and what is not, so each partition must be configured with a partition name. If no partition parameter is specified, then no alarm_panel or sensor components are loaded.

Supported services:

The following services are supported by Envisalink and can be used to script or automate the alarm.

- **alarm_disarm**: Disarms the alarm with the user code provided, or the code specified in the configuration.
- **alarm_arm_home**: Arms the alarm in home mode.
- **alarm_arm_away**: Arms the alarm in standard away mode.
- **alarm_trigger**: Trigger an alarm on the Envisalink connected alarm system. For example, a newer zwave/zigbee sensor can now be integrated into a legacy alarm system using a Home Assistant automation.
- **envisalink_alarm_keypress**: Sends a string of up to 6 characters to the alarm. *DSC alarms only*
