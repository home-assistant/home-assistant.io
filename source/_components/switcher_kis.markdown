---
layout: page
title: "Switcher"
description: "Controlling your Switcher V2 Water Heater."
date: 2018-04-10 17:30
sidebar: true
comments: false
sharing: true
footer: true
logo: switcher_boiler.png
ha_category:
  - Switch
redirect_from:
  - /components/switch.switcher_kis
ha_release: "0.92"
ha_iot_class: "Local Push"
---

This `Switcher` component allows you to control the [Switcher V2 Water Heater](https://www.switcher.co.il/).

To enable it, add an entry to your `configuration.yaml` according to the following configuration instructions.

To retrieve your device's details, please follow the instructions [here](https://github.com/NightRang3r/Switcher-V2-Python).

<p class='note warning'>
  Please note, the Switcher-V2-Python script is written in python 2.7 syntax, it won't run with python 3.x.
</p>
<p class='note warning'>
  Please note, for the Switcher-V2-Python script to run successfully, you need to configure your device to work locally.
</p>

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
{% endconfiguration %}

## {% linkable_title Switch State Attributes %}

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
