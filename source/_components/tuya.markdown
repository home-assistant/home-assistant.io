---
layout: page
title: "Tuya Switch"
description: "Instructions how to integrate Tuya Switches into Home Assistant."
date: 2017-12-6 04:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Switch
---

# tuya-homeassistant

This is a simple platform to control **SOME** devices that use the Tuya cloud for control.

It uses a slightly modified version of the pytuya library (https://github.com/clach04/python-tuya) to directly control the device.

Most devices that use the Tuya cloud should work. If port 6668 is open on the device then it will work.

switch id is if the device has multiple switches, the switch number.

See here for how to find localKey and devId: https://github.com/codetheweb/tuyapi/blob/master/docs/SETUP.md

To enable Tuya Switches in your installation, add the following to your
`configuration.yaml` file:
{% raw %}
```yaml
# Example configuration.yaml entry
switch:
  - platform: tuya
    name: My Tuya Switch
    host: 192.168.1.196
    local_key: numbersandletters1128
    device_id: lettersandnumbers6673
    id: 1
```
{% endraw %}

{% configuration %}
switch:
  - platform: tuya
    required: true
    name: Name of switch to show in frontend
    required: true
    host: IP address of device
    required: true
    local_key: localkey
    required: true
    device_id: device id
    required: true
    id: Switch number. Leave blank if device has only one switch
    required: false
{% endconfiguration %}
