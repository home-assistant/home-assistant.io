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
ha_release: 0.93
ha_iot_class: Local Push
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

<p class='note warning'>
  Please note, on the original script repository, users recently reported difficulties controling the device after upgrading the firmware to the new 3.0 version.As this component is based on that script, please do not upgrade to version 3.0 until this issue is resolved. You can follow the issue [here](https://github.com/NightRang3r/Switcher-V2-Python/issues/3).
</p>
```yaml
switcher_kis:
  phone_id: 'REPLACE_WITH_PHONE_ID'
  device_id: 'REPLACE_WITH_DEVICE_ID'
  device_password: 'REPLACE_WITH_DEVICE_PASSWORD'
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
{% endconfiguration %}

## {% linkable_title Switch State Attributes %}

| Attribute | Type | Description | Example |
| --------- | ---- | ----------- | ------- |
| `friendly_name` | string | Defaults to the device's configured name. | "Switcher Boiler" |
| `auto_off_set` | string | The auto shutdown time limit configured on the device. | "01:30:00" |
| `remaining_time` | string | Time remaining to shutdown (auto or timer). | "01:29:41" |
| `electric_current` | float | The electric current in amps. | 12.5 |
| `current_power_w` | integer | The current power used in watts. | 2756 |

<p class='note warning'>
  Please note, the following attributes are not eligible when the device is off and therefore will not appear as state attributes: `remaining_time`, `electric_current`, `current_power_w`.
</p>
