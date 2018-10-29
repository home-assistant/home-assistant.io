---
layout: page
title: TCP Binary Sensor
description: "Instructions on how to set up TCP binary sensors within Home Assistant."
date: 2016-02-22 11:05
sidebar: true
comments: false
sharing: true
footer: true
logo: tcp_ip.png
ha_category: Binary Sensor
ha_release: 0.14
---

The TCP Binary Sensor is a type of [TCP Sensor](/components/sensor.tcp/) which is either "off" or "on". In order to use this sensor type, in addition to the configuration for the TCP Sensor, you must supply a `value_on` value to represent what is returned when the device is turned on.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: tcp
    name: TCP Binary Sensor
    host: IP_ADDRESS
    port: PORT
    payload: "r State\n"
    value_on: 1
    timeout: 5
```

{% configuration %}
name:
  description: The name you'd like to give the sensor in Home Assistant.
  required: false
  type: string
  default: TCP Sensor
host:
  description: The hostname/IP address to connect to.
  required: true
  type: string
port:
  description: The port to connect to the host on.
  required: true
  type: integer
payload:
  description: What to send to the host in order to get the response we're interested in.
  required: true
  type: string
value_on:
  description: The value returned when the device is "on".
  required: true
  type: string
value_template:
  description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the value.
  required: false
  type: template
  default: entire response is the value
buffer_size:
  description: The size of the receive buffer in bytes. Set this to a larger value if you expect to receive a response larger than the default.
  required: false
  type: integer
  default: 1024
timeout:
  description: How long in seconds to wait for a response from the service before giving up and disconnecting.
  required: false
  type: integer
  default: 10
{% endconfiguration %}
