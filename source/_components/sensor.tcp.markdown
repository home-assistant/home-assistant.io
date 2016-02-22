---
layout: page
title: TCP Sensor
description: "Instructions on how to set up TCP sensors within Home Assistant."
date: 2016-02-22 10:03
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
---
The TCP component allows the integration of some services for which a specific Home Assistant component does not exist. If the service communicates over a TCP socket with a simple request/reply mechanism then the chances are that this component will allow integration with it.

The configuration options for the a TCP Sensor:

- **name** (*Required*): The name you'd like to give the sensor in Home Assistant.
- **platform** (*Required*): Set to `tcp`.
- **host** (*Required*): The hostname/IP address to connect to.
- **port** (*Required*): The port to connect to the host on.
- **payload** (*Required*): What to send to the host in order to get the response we're interested in.
- **timeout**: How long in seconds to wait for a response from the service before giving up and disconnecting. Default: `10`
- **value_template**: A Jinja2 template to extract the desired value from the response returned by the server. By default we assume that the entire response is the value.
- **unit**: The unit of measurement to use for the value.
- **buffer_size**: The size of the receive buffer in bytes. Set this to a larger value if you expect to receive a response larger than the default. Default: `1024`.

#### Example

The usage of the TCP component is best explained with an example. The [EBUSd](https://github.com/john30/ebusd/wiki) service enables connection to an EBUS serial bus on some home heating/cooling systems. Using this service it is possible to extract various metrics which may be useful to have within Home Assistant. In order to use EBUSd, you connect to it using a TCP socket and send it a command. The service will respond with the value it has received from EBUS. On the command line, this would look something like:

```bash
$ echo "r WaterPressure" | nc 10.0.0.127 8888
0.903;ok

```

You will notice that the output from the service is not just a single value (it contains ";ok" as well). To grab the value we're interested in, we can use a Jinja2 template. The response received is injected into the template as the `value` variable. To use this value within Home Assistant, use the following configuration:

```yaml
sensor:
  - name: Central Heating Pressure
    platform: tcp
    host: 10.0.0.127
    port: 8888
    timeout: 5
    payload: "r WaterPressure\n"
    value_template: "{{ value.split(';')[0] }}"
    unit: Bar
```


