---
title: Envisalink
description: Instructions on how to integrate a DSC/Honeywell alarm panel with Home Assistant using an envisalink evl3/evl4 board.
ha_category:
  - Alarm
  - Binary sensor
  - Sensor
ha_release: 0.23
ha_iot_class: Local Push
ha_domain: envisalink
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Envisalink** {% term integration %} will allow Home Assistant users who own either a DSC or Honeywell alarm panel to leverage their alarm system and its sensors to provide Home Assistant with rich information about their homes. Connectivity between Home Assistant and the alarm panel is accomplished through a device produced by Eyez On, known as the Envisalink. The Envisalink evl3 and evl4 boards provide a TCP/IP interface to the alarm panel, where it emulates an alarm keypad. This board also exposes a raw TCP/IP based API, upon which this integration is built. Currently, the Envisalink version 4 is the latest model. This integration supports both the evl3 and the evl4.

Please visit the [eyezon website](https://www.eyezon.com/) for further information about the evl3 and evl4 boards.

There is currently support for the following device types within Home Assistant:

- Binary sensor: Reports on zone status (Check the [type/class](/integrations/binary_sensor/#device-class) list for a possible visualization of your zone.)
- Sensor: Emulates an alphanumeric keypad attached to the alarm panel
- Alarm control panel: Reports on partition status, and can be used to arm/disarm the system

This is a fully event-based integration. Any event sent by the Envisalink device will be immediately reflected within Home Assistant.

As of 0.29, the alarm_trigger service is supported.  It is possible to fire off an envisalink-based alarm directly from Home Assistant. For example, a newer Z-Wave/Zigbee sensor can now be integrated into a legacy alarm system using a Home Assistant automation.

An `envisalink` section must be present in the {% term "`configuration.yaml`" %} file and contain the following options as required.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
envisalink:
  host: <envisalink IP address or hostname>
  panel_type: HONEYWELL or DSC
  user_name: YOUR_USERNAME
  password: YOUR_PASSWORD
  code: "1234"
  port: 4025
  evl_version: 3
  keepalive_interval: 60
  zonedump_interval: 30
  timeout: 10
  panic_type: Police
  zones:
    1:
      name: "Back Door"
      type: "opening"
    2:
      name: "First Floor Motion"
      type: "motion"
  partitions:
    1:
      name: "Home Alarm"
```

{% configuration %}
host:
  description: The IP address or hostname (host.fqdn.tld) of the Envisalink device on your home network.
  required: true
  type: string
panel_type:
  description: "`HONEYWELL` or `DSC`, depending upon which alarm system you have."
  required: true
  type: string
user_name:
  description: Which username to authenticate with when connecting to the device. This must be the username for connecting directly to the device and not the username for your EyezOn account. On a Honeywell alarm panel, the username/password are the same.
  required: true
  type: string
password:
  description: Which password to authenticate with when connecting to the device. This must be the password for connecting directly to the device and not the password for your EyezOn account. EVL3 only works with max. 6 characters.
  required: true
  type: string
code:
  description: Your alarm panel's code, for authenticating user input during arm/disarm. If you do not provide this value, the integration will prompt the user to enter the code at runtime.
  required: false
  type: string
port:
  description: Which network port to connect with.
  required: false
  default: 4025
  type: integer
evl_version:
  description: 3 for evl3, or 4 for evl4.
  required: false
  default: 3
  type: integer
keepalive_interval:
  description: This is a periodic heartbeat signal (measured in seconds) sent to your Envisalink board to keep it from restarting. This is required for DSC and Honeywell systems.
  required: false
  default: 60
  type: integer
zonedump_interval:
  description: This is an interval (measured in seconds) where Envisalink will dump out all zone statuses. This is required for Honeywell systems, which do not properly send zone closure events. DSC boards do not technically need this.
  required: false
  default: 30
  type: integer
timeout:
  description: A network connectivity timeout when communicating with the envisalink. If connection is not obtained by this time (in seconds) the integration will stop trying to connect.
  required: false
  default: 10
  type: integer
panic_type:
  description: "Both DSC and Honeywell boards support a panic alarm. This is used when the alarm_trigger action is called in Home Assistant. This determines which type of panic alarm to raise. Valid values are: Police, Fire, Ambulance."
  required: false
  default: Police
  type: string
zones:
  description: "Envisalink boards have no way to tell us which zones are actually in use, so each zone must be configured in Home Assistant. Zone numbers correspond to the zone numbers configured on your alarm system and must be in the range of 1 to 64. For each zone, at least a name must be given. For more information about the visual representation of a zone, take a look at the [binary sensor](/integrations/binary_sensor/#device-class) documentation. *Note: If no zones are specified, Home Assistant will not load any binary_sensor integrations.*"
  required: false
  type: integer
  keys:
    name:
      description: Zone name
      required: true
      type: string
    type:
      description: Zone type
      required: false
      default: opening
      type: string
partitions:
  description: Again, Envisalink boards do not tell us what is in use and what is not, so each partition must be configured with a partition name. If no partition parameter is specified, then no alarm_panel or sensor integrations are loaded.
  required: false
  type: integer
  keys:
    name:
      description: Partition name
      required: true
      type: string
{% endconfiguration %}

## Actions

The following actions are supported by Envisalink and can be used to script or automate the alarm.

- **alarm_disarm**: Disarms the alarm with the user code provided, or the code specified in the configuration.
- **alarm_arm_home**: Arms the alarm in home mode.
- **alarm_arm_away**: Arms the alarm in standard away mode.
- **alarm_arm_night**: Arms the alarm in night mode.
- **alarm_trigger**: Trigger an alarm on the Envisalink connected alarm system. For example, a newer Z-Wave / Zigbee sensor can now be integrated into a legacy alarm system using a Home Assistant automation.
- **alarm_keypress**: Sends a string of up to 6 characters to the alarm. *Works with DSC panels, and confirmed to work with Honeywell Vista-20P (aka First Alert FA-168)*
- **invoke_custom_function**: Invokes a custom PGM function. *DSC alarms only*

## Attributes

The zone status binary sensors have extra attributes representing additional
information about each zone.

| Name                | Description                                                          |
| ------------------- | -------------------------------------------------------------------- |
| `last_tripped_time` | Last time this zone was tripped.                                     |
| `zone`              | Zone number. Can be used in combination with `alarm_keypress` action |
to issue commands relating to this zone.
