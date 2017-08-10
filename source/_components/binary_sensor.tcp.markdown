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

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
binary_sensor:
# Example configuration.yaml entry
  platform: tcp
  name: TCP Binary Sensor
  host: IP_ADDRESS
  port: PORT
  payload: "r State\n"
  value_on: 1
  timeout: 5
```

Configuration options for the a TCP Sensor:

- **name** (*Required*): The name you'd like to give the sensor in Home Assistant.
- **host** (*Required*): The hostname/IP address to connect to.
- **port** (*Required*): The port to connect to the host on.
- **payload** (*Required*): What to send to the host in order to get the response we're interested in.
- **value_on** (*Required*): The value returned when the device is "on".
- **timeout** (*Optional*): How long in seconds to wait for a response from the service before giving up and disconnecting. Defaults to 10.
- **value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the value. By default it's assumed that the entire response is the value.
- **buffer_size** (*Optional*): The size of the receive buffer in bytes. Set this to a larger value if you expect to receive a response larger than the default. Defaults to 1024.

