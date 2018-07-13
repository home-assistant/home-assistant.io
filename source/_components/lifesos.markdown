---
layout: page
title: "LifeSOS"
description: "Instructions on integrating Abode home security with Home Assistant."
date: 2018-07-03 22:15
sidebar: true
comments: false
sharing: true
footer: true
logo: lifesos.png
ha_release: 0.73
ha_category: Hub
ha_iot_class: "Local Push"
---

The `lifesos` component will allow users to integrate their [LifeSOS](http://lifesos.com.tw/) security system into Home Assistant and use the alarm control panel, sensors and switches to automate their homes.

It supports the LS-30, LS-20 and LS-10 models, including re-branded versions from SecurePro (Australia) or WeBeHome (northern Europe).

There is currently support for the following device types within Home Assistant:

- [Alarm Control Panel](/components/alarm_control_panel.lifesos/): Reports on alarm status, and can be used to arm/disarm the system or reset the status.
- [Binary Sensor](/components/binary_sensor.lifesos/): Reports the current state of any sensors that can be represented using two states; this includes Magnet, Motion, Breakage, Flood, Vibration, Smoke and Gas sensors.
- [Sensor](/components/sensor.lifesos/): Reports the current value for any sensors that take readings; this includes Temperature, Humidity, Light and Power sensors.
- [Switch](/components/switch.lifesos/): Provide ability to turn on/off any X10/RF switches that are managed by your base unit.

### {% linkable_title Configuration %}

A `lifesos` section must be present in the `configuration.yaml` file and contain the following options as required:

```yaml
# Example configuration.yaml entry
lifesos:
  host: 192.168.1.100
  port: 1680
  password: 1234
  switches: 1,2,3,7,11
  trigger_duration: 30
```

Configuration variables:

- **host** (*Required*): The IP address of the LifeSOS network adapter.
- **port** (*Optional*): The port of the LifeSOS network adapter. Default: `1680`
- **password** (*Optional*): Master password; to be specified *only* if your base unit requires it. Default: `None`
- **switches** (*Optional*): A comma-delimited list of X10 switches connected to your base unit (from `1` through `16`). Default: `None`.
- **trigger_duration** (*Optional*): Duration (in seconds) for any trigger-based sensors to remain in the `on` state. Default: `5`.
See [Binary Sensor](/components/binary_sensor.lifesos/#important-note-about-trigger-based-binary-sensors) for further details.

<p class='note'>
  Although sensors will be automatically detected and added to Home Assistant on startup, switches are not. You must specify them using the `switches` option as shown above.
</p>
<p class='note'>
  The network adapter must be configured to *TCP Server* mode in order for this component to connect to it. This is the same mode used by the HyperSecureLink software that comes with the network adapter, but if you have reconfigured your system to connect to a CMS or similar subscription-based service, it will be in *TCP Client* mode and need to be changed back. Refer to your network adapter manual if needed.
</p>

### {% linkable_title Services %}

This component provides the following services:

#### {% linkable_title Service `lifesos.sync_datetime` %}

Sets date/time of the base unit to match the local date/time of the system running Home Assistant.

Given the base unit has no built-in date/time sync ability, this service can be used to create an automation that will periodically fix drift and correct for daylight savings changes.

### {% linkable_title Events %}

This component fires `lifesos_baseunit` events on the bus. You can capture the events and respond to them in automation scripts like this:

```yaml
# Example configuration.yaml automation entry
automation:
- alias: 'Send push notification when power goes out at home'
  trigger:
    platform: event
    event_type: lifesos_baseunit
    event_data:
      event_qualifier: Event
      event_code: ACPowerLoss
  action:
    - service: notify.push_notification
      data:
        title: "LifeSOS Notification"
        message: "Power has gone out at home!"
- alias: 'Send push notification when power comes back on at home'
  trigger:
    platform: event
    event_type: lifesos_baseunit
    event_data:
      event_qualifier: Restore
      event_code: ACPowerLoss
  action:
    - service: notify.push_notification
      data:
        title: "LifeSOS Notification"
        message: "Power is back on at home!"
```

Event data:

- **event_category**: Category of event:
  - `Alarm` - Event indicates that an alarm (of any type) has been triggered
  - `Trouble` - Event indicates a potential issue; eg. Power or RF loss
  - `Test_Misc` - Events used for testing or other miscellaneous use
- **event_qualifier**: Indicates the context for the event:
  - `Event` - A new event has occurred
  - `Restore` - Condition for a previous `Event` has now been restored
- **event_code**: Code indicating the event that occurred. Examples: `BurglarAlarm`, `PanicAlarm`, `BurglarSensorTampered`, `ACPowerLoss`, `BaseUnitLowBattery`, `RFLowBattery`, `LossOfSupervision_RF`
- **device_category.description**: Type of device that caused the event. One of: `Base Unit`, `Controller`, `Burglar`, `Fire`, `Medical`, `Special`.
- **zone**: Zone the event occurred in; only if device category is not `Base Unit`.
- **alarm_entity_id**: Entity id of the alarm control panel.
- **device_entity_id**: Entity id of a sensor device; only if the event includes device information and it is represented in Home Assistant.

<p class='note'>
  Above is just a summary of the more useful event values. If an extensive list is required, please consult the LifeSOSpy library [enums.py](https://github.com/rorr73/LifeSOSpy/blob/5d7d71f9b493f9f3ca21d1da892ae740ef946b08/lifesospy/enums.py#L173).
</p>
