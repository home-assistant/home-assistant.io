---
layout: page
title: "Envisalink Alarm Control Panel"
description: "Instructions on how to integrate a DSC/Honeywell alarm panel with Home Assistant using an envisalink evl3/evl4 board."
date: 2016-06-19 22:10
sidebar: true
comments: false
sharing: true
footer: true
logo: eyezon.png
ha_category: Alarm
ha_release: 0.23
---

This component will allow Home Assistant users who own either a DSC or Honeywell alarm panel to leverage their alarm system and it's sensors to provide Home Assistant with rich information about their homes.
Connectivity between Home Assistant and the alarm panel is accomplished through a device produced by Eyez On, known as the Envisalink.  The Envisalink evl3 and evl4 boards provide a TCP/IP interface to the alarm panel, where it emulates an alarm keypad.  This board also exposes a raw TCP/IP based API, upon which this component is built. Currently, the Envisalink version 4 is the latest model.  This component supports both the evl3 and the evl4.

Please visit the [eyezon website](http://www.eyezon.com/) for further information about the evl3 and evl4 boards.

There is currently support for the following device types within Home Assistant:

- Binary Sensor (Reports on zone status)
- Sensor (Emulates an alpha-numeric keypad attached to the alarm panel)
- Alarm Control Panel (Reports on partition status, and can be used to arm/disarm the system)

This is a fully event-based component- any event sent by the Envisalink device will be immediately reflected within Home Assistant.

## Configuration

An `envisalink` section must be present in the `configuration.yaml` file and contain the following options as required:

### Required Parameters
- **host**: The ip address of the Envisalink device on your home network.
- **panel_type**: `HONEYWELL` or `DSC`, depending upon which alarm system you have.
- **user_name**: Which username to authenticate with when connecting to the device.  On a Honeywell alarm panel, the username/password are the same.
- **password**: Which password to authenticate with when connecting to the device.
- **code**: Your alarm panel's code, for authenticating user input during arm/disarm.

### Optional Parameters
- **port**: Which network port to connect with. Default: `4025`
- **evl_version**: 3 for evl3, or 4 for evl4. Default: `3`
- **keepalive_interval**: This is a periodic heartbeat signal (measured in seconds) sent to your Envisalink board to keep it from restarting.  This is required for DSC and Honeywell systems. Default: `60` seconds
- **zonedump_interval**: This is an interval (measured in seconds) where the evl will dump out all zone statuses.  This is required for Honeywell systems, which do not properly send zone closure events.  DSC boards do not technically need this. Default: `30`
- **zones**: Envisalink boards have no way to tell us which zones are actually in use, so each zone must be configured in Home Assistant.  For each zone, at least a name must be given. *Note- if no zones are specified, Home Assistant will not load any binary_sensor components.*
- **partitions**: Again, Envisalink boards do not tell us what is in use, and what is not, so each partition must be configured with a partition name.  If no partition parameter is specified, then no alarm_panel or sensor components are loaded.

#### Example

```yaml
envisalink:
#optional
  port: 4025
  evl_version: 3
  keepalive_interval: 60
  zonedump_interval: 30

#required
  host: <envisalink IP address>
  panel_type: HONEYWELL or DSC
  user_name: <pass>
  password: <pass>
  code: '1234'

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
