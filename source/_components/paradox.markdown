---
layout: page
title: "Paradox Alarm Control Panel"
description: "Instructions on how to integrate a Paradox alarm panel with Home Assistant using a PRT3 (serial) module."
date: 2016-10-07 07:07
sidebar: true
comments: false
sharing: true
footer: true
logo: paradox.png
ha_category: Alarm
ha_release: 0.31
ha_iot_class: "Local Push"
---

The `paradox` component will allow Home Assistant users who have a Paradox alarm panel to leverage their alarm system and it's sensors to provide Home Assistant with information about their homes. Connectivity between Home Assistant and the alarm panel is accomplished through the PRT3 (serial) module.

Supported panels include EVO48/96/192. Actual integration is done through [pyparadox_alarm](https://pypi.python.org/pypi/pyparadox_alarm/) which is required for this to work.

At the moment the PRT3 module needs to be connected to the same PC on which Home Assistant is running.

This is the first and bare minimum implementation providing support for the following platform types within Home Assistant:

- [Binary Sensor](/components/binary_sensor.paradox/): Reports on zone status.
- [Alarm Control Panel](/components/alarm_control_panel.paradox/): Reports on partition status only.

The platforms operate independently. You therefore only have to specify the ones you require.

This is a fully event-based component. All events reported by the Paradox alarm will be sent to Home Assistant. Home Assistant will only report on the status changes of the zone and partitions/areas specified in the `configuration.yaml` file.

As of version 0.31, no distinction between the different types of arming modes are made. Also zone and partition names do not support spaces yet.

To enable the hub a `paradox` section must be present in the `configuration.yaml` file and contain the following options as required:

```yaml
# Example Paradox configuration.yaml entry
paradox:
  panel_type: EVO48
  port: /dev/ttyUSB0
  speed: 57600

```

Configuration variables:

- **panel_type** (*Required*): `EVO48` or `EVO192`, depending upon which model you have.
- **port** (*Optional*): Which USB port the PRT3 is connected to. Default: `/dev/ttyUSB0`
- **speed** (*Optional*): The baud-rate supported by the PRT3. Default: `57600`
