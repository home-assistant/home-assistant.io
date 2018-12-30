---
layout: page
title: "Lupus Electronics Home Security"
description: "Instructions on integrating Lupusec home security with Home Assistant."
date: 2018-10-03 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lupusec.jpg
ha_category: Hub
ha_release: 0.83
ha_iot_class: "Local Polling"
---

The `lupusec` component allows the user to integrate their Lupusec alarm control panel and ultimately all connected sensors and other devices. For more information about the LUPUS-Electronics security system please visit their [website](https://www.lupus-electronics.de).

The following devices are supported by the underlying `lupupy` Python library and integrated into Home Assistant.

- [Alarm Control Panel](/components/alarm_control_panel.lupusec/): Displays the alarm status and controls arming, disarming and home modus.
- [Binary Sensor](/components/binary_sensor.lupusec/): Displays the status of binary sensors. Currently only Door and window sensors are supported.
- [Switch](/components/switch.lupusec/): Turn off and on your Lupus power switches.

## {% linkable_title Configuration %}

To use Lupusec devices in your installation, add the following `lupusec` section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
lupusec:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  ip_address: 192.168.178.35
```

{% configuration %}
username:
  description: The login username of your Lupusec alarm panel.
  required: true
  type: string
password:
  description: The login password of your Lupusec alarm panel.
  required: true
  type: string
ip_address:
  description: The IP-address of your Lupusec alarm panel.
  required: true
  type: string
name:
  description: Name for your Lupusec panel.
  required: false
  type: string
{% endconfiguration %}
