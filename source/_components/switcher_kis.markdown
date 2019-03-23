---
layout: page
title: "Switcher"
description: "Controlling your Switcher V2 Water Heater."
date: 2018-02-10 18:30
sidebar: true
comments: false
sharing: true
footer: true
logo: switcher_boiler.png
ha_category:
  - Switch
  - Sensor
ha_release: "0.88"
ha_iot_class: "Local Push"
---

This `Switcher` component allows you to control the [Switcher V2 Water Heater](https://www.switcher.co.il/).

There is currently support for the following device types within Home Assistant:

  - Switch
  - Sensor

To enable it, add an entry to your `configuration.yaml` according to the following configuration instructions.

To retrieve your device's details, please follow the instructions [here](https://github.com/NightRang3r/Switcher-V2-Python).

```yaml
# Example of a minimal configuration.yaml entry
switcher_kis:
  phone_id: 'REPLACE_WITH_PHONE_ID'
  device_id: 'REPLACE_WITH_DEVICE_ID'
  device_password: 'REPLACE_WITH_DEVICE_PASSWORD'

# Example of a full configuration.yaml entry
switcher_kis:
  phone_id: 'REPLACE_WITH_PHONE_ID'
  device_id: 'REPLACE_WITH_DEVICE_ID'
  device_password: 'REPLACE_WITH_DEVICE_PASSWORD'
  name: 'boiler'
  icon: 'mdi:some-icon'
  include_schedule_sensors: true
  schedules_scan_interval:
    minutes: 5
```

{% configuration %}
phone_id:
  description: The device's phone id.
  required: true
  type: string
device_id:
  description: The device's id.
  required: true
  type: string
device_password:
  description: The device's password.
  required: true
  type: string
name:
  description: A name of your choosing, will be used to create the entities id ('switch.switcher_kis_*name*', 'sensor.switcher_kis_*name*_schedule_3')
  required: false
  type: string
  default: 'boiler'
icon:
  description: MDI icon, will be used for all entities.
  required: false
  type: icon 
include_schedule_sensors:
  description: Whether or not you want the component to integrate schdules control and create 8 sensors representing the 8 schdule slots (0-7).
  required: false
  type: boolean 
  default: false
schedules_scan_interval:
  description: Timedelta object for device's schedules retrieval interval, not relevant if `include_schedule_sensors` is false.
  required: false
  type: map
  keys:
    minutes:
      description: Minutes interval
      type: integer
      default: 5
    seconds:
      description: Seconds interval
      type: integer
      default: 0
{% endconfiguration %}

## {% linkable_title Sensor States %}
The component, if configured to so do so (include_schedule_sensors=true), will create 8 sensors representing their counterpart 8 schedule slots on the device (identified as 0-7).
The sensors states can vary according to the state and status of each individual schedule, here are a few examples:
- `Not configured`: when the schedule is not configured to run.
- `Not enabled`: when the schedule configured but disabled by the user.
- `Due today at 17:00`: when then schedule is due to run today at 17:00.
- `Due tommorow at 17:30`: when then schedule is due to run tommorow at 17:30.
- `Due Monday at 20:00`: when then schedule is due to run next Monday at 20:00.

## {% linkable_title State Attributes %}

### {% linkable_title Switch State Attributes %}

| Attribute | Type | Description | Example |
| --------- | ---- | ----------- | ------- |
| `last_data_update` | datetime | The datetime of the last data updated received by the device. | 2019-02-09T13:09:12.004178 |
| `last_state_change` | datetime | The datetime of the last change of device's state since the bridge started. | 2019-02-09T13:09:15.005698 |
| `ip_address` | string | The IP address of the device. | '192.168.0.150' |
| `device_name` | string | The device's configured name. | "Switcher Boiler" |
| `auto_off_set` | string | The auto shutdown time limit configured on the device. | "01:30:00" |
| `remaining_time` | string | Time remaining to shutdown (auto or timer). | "01:29:41" |
| `electric_current` | float | The electric current in amps. | 12.5 |
| `current_power_w` | integer | The current power used in watts. | 2756 |

<p class='note warning'>
  Please note, the following attributes are not eligible when the device is off and therefore will not appear as state attributes: `remaining_time`, `electric_current`, `current_power_w`.
</p>

### {% linkable_title Sensor State Attributes %}

| Attribute | Type | Description | Example |
| --------- | ---- | ----------- | ------- |
| `schedule_id` | string | The scehdule identifier (0-7). | '4' |
| `enabled` | boolean | Whether or not the schedule is enabled (true) or disabled by the user (false). | true |
| `start_time` | string | Time string containing hours and minutes representing the schedule start time. | '17:30' |
| `end_time` | string | Time string containing hours and minutes representing the schedule end time. | '18:30' |
| `duration` | string | The total time the schedule is scheduled to run. | '0:30:00' |
| `recurring` | boolean | Whether or not the schedule is recurring (true) or is it to be executed once (false). | true |
| `days` | string,list | Name(s) of the days for the schedule to run in, Possible values are: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday or the special value Every day. | ['Monday', 'Wednesday', 'Saturday'] |

<p class='note warning'>
  Please note, the `days` attribute is not eligible when `recurring=false` and therefore will not appear as an attribute.
</p>

<p class='note warning'>
  Please note, if the schedule is not configured yet, with the exception of `schedule_id`, none of the other attributes are eligible and therefore will not appear as attributes.
</p>

## {% linkable_title Services %}

### {% linkable_title Service `switcher_kis.turn_on_15_minutes` %}

Turn on the Switcher V2 water heater with a 15 minutes timer, no service data required.

### {% linkable_title Service `switcher_kis.turn_on_30_minutes` %}

Turn on the Switcher V2 water heater with a 30 minutes timer, no service data required.

### {% linkable_title Service `switcher_kis.turn_on_45_minutes` %}

Turn on the Switcher V2 water heater with a 45 minutes timer, no service data required.

### {% linkable_title Service `switcher_kis.turn_on_60_minutes` %}

Turn on the Switcher V2 water heater with a 60 minutes timer, no service data required.

### {% linkable_title Service `switcher_kis.set_auto_off` %}

Set the device's auto-shutdown configuration.

| Key | Type | Description | Example |
| --- | ---- | ----------- | ------- |
| `auto_off` | string | Time period string containing hours and minutes. | '02:30' |

### {% linkable_title Service `switcher_kis.update_device_name` %}

Update the Switcher device name setting.

| Key | Type | Description | Example |
| --- | ---- | ----------- | ------- |
| `name` | string | Any string with the minimum length of 2 and the maximum length of 32. | "My Switcher Device" |

### {% linkable_title Service `switcher_kis.create_schedule` %}

Create a schedule.

| Key | Type | Description | Example |
| --- | ---- | ----------- | ------- |
| `start_time` | string | Time string containing hours and minutes representing the time to start the schedule. | '17:30' |
| `end_time` | string | Time string containing hours and minutes representing the time to stop the schedule. | '18:30' |
| `recurring` | boolean | Boolean indicating if the schedule is recurring (true) or is it to be executed once (false). | true |
| `days` | string,list | Name(s) of the days for the schedule to run in, This is an optional field that must be passed if recurring=true. Possible values are: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday. | ['Monday', 'Wednesday', 'Saturday'] |

### {% linkable_title Service `switcher_kis.delete_schedule` %}

Delete a specific schedule.

| Key | Type | Description | Example |
| --- | ---- | ----------- | ------- |
| `schedule_id` | integer | Integer identifier of the schedule to be deleted, minumum value is 0, maximum value is 7. | 3 |

### {% linkable_title Service `switcher_kis.enable_schedule` %}

Enable a specific schedule.

| Key | Type | Description | Example |
| --- | ---- | ----------- | ------- |
| `schedule_id` | integer | Integer identifier of the schedule to be deleted, minumum value is 0, maximum value is 7. | 3 |

### {% linkable_title Service `switcher_kis.disable_schedule` %}

Disable a specific schedule.

| Key | Type | Description | Example |
| --- | ---- | ----------- | ------- |
| `schedule_id` | integer | Integer identifier of the schedule to be deleted, minumum value is 0, maximum value is 7. | 3 |

### {% linkable_title Service `switcher_kis.update_schedules` %}

Manually retrieve schedules data from the device.
