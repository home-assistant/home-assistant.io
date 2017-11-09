---
layout: page
title: "Serial Sensor"
description: "Instructions how to integrate data from serial connected sensors into Home Assistant."
date: 2017-10-13 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_release: 0.56
ha_iot_class: "Local Polling"
---

The `serial` sensor platform is using the data provided by a device connected to the serial port of the system where Home Assistant is running. With [`ser2net`](http://ser2net.sourceforge.net/) and [`socat`](http://www.dest-unreach.org/socat/) would it also work for sensors connected to a remote system.

To check what kind of data is arriving at your serial port, use a command-line tool like `minicom` or `picocom` on Linux, on a macOS you can use `screen` or on Windows `putty`. 

```bash
$ sudo minicom -D /dev/ttyACM0
```

To setup a serial sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: serial
    serial_port: /dev/ttyACM0
```

{% configuration %}
  serial_port:
    description: Local serial port where the sensor is connected and access is granted.
    required: true
    type: string
  name:
    description: Friendly name to use for the frontend. Default to "Serial sensor".
    required: false
    type: string
{% endconfiguration %}


## {% linkable_title `value_template` for Template sensor %}

### {% linkable_title TMP36 %}

{% raw %}
```yaml
"{{ (((states('sensor.serial_sensor') | float * 5 / 1024 ) - 0.5) * 100) | round(1) }}"
```
{% endraw %}


