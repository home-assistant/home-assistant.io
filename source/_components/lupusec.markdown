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
ha_release: 0.81
ha_iot_class: "Cloud Push"
---

The `lupusec` component allow the user to integrate their Lupusec alarm control panel and ultimately all connected sensors and other devices. For more information about the Lupus Electronics security system please visit their [website](https://www.lupus-electronics.de).

The following devices are supported by the underlying `lupupy` python library and integrated into hass.

- [Alarm Control Panel](/components/alarm_control_panel.lupusec/): Displays the alarm status and controls arming, disarming and home modus.
- [Binary Sensor](/components/binary_sensor.lupusec/): Reports on `Quick Actions`, `Door Contacts`, `Connectivity` sensors (remotes, keypads, and status indicators), `Moisture` sensors, and `Motion` or `Occupancy` sensors.
- [Switch](/components/switch.lupusec/): Reports on `Camera` devices and will download and show the latest captured still image.

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
  description: The login username of your lupusec alarm panel.
  required: true
  type: string
password:
  description: The login password of your lupusec alarm panel.
  required: true
  type: string
ip_address:
  description: The IP-address of your lupusec alarm panel.
  required: true
  type: string
scan_interval:
  description: Scanning interval in seconds. Lower that value to get faster responses from your alarm panel but raise the temperatures and ressource usage.
  required: false
  type: integer
  default: 2

{% endconfiguration %}
