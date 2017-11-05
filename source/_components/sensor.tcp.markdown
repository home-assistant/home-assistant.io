---
layout: page
title: TCP Sensor
description: "Instructions on how to set up TCP sensors within Home Assistant."
date: 2016-02-22 10:03
sidebar: true
comments: false
sharing: true
footer: true
logo: tcp_ip.png
ha_category: Sensor
ha_release: 0.14
ha_iot_class: "Local Polling"
---

The TCP component allows the integration of some services for which a specific Home Assistant component does not exist. If the service communicates over a TCP socket with a simple request/reply mechanism then the chances are that this component will allow integration with it.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: tcp
    host: IP_ADDRESS
    port: PORT
    payload: PAYLOAD
```

Configuration options for the a TCP Sensor:

- **name** (*Required*): The name you'd like to give the sensor in Home Assistant.
- **host** (*Required*): The hostname/IP address to connect to.
- **port** (*Required*): The port to connect to the host on.
- **payload** (*Required*): What to send to the host in order to get the response we're interested in.
- **timeout** (*Optional*): How long in seconds to wait for a response from the service before giving up and disconnecting. Defaults to `10`
- **value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the value. By default it's assumed that the entire response is the value.
- **unit_of_measurement** (*Optional*): The unit of measurement to use for the value.
- **buffer_size** (*Optional*): The size of the receive buffer in bytes. Set this to a larger value if you expect to receive a response larger than the default. Defaults to `1024`.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title EBUSd %}

The [EBUSd](https://github.com/john30/ebusd/wiki) service enables connection to an EBUS serial bus on some home heating/cooling systems. Using this service it is possible to extract various metrics which may be useful to have within Home Assistant. In order to use EBUSd, you connect to it using a TCP socket and send it a command. The service will respond with the value it has received from EBUS. On the command line, this would look something like:

```bash
$ echo "r WaterPressure" | nc 10.0.0.127 8888
0.903;ok
```

You will notice that the output from the service is not just a single value (it contains ";ok" as well). To grab the value we're interested in, we can use a Jinja2 template. The response received is injected into the template as the `value` variable. To use this value within Home Assistant, use the following configuration:

```yaml
sensor:
# Example configuration.yaml entry
  - platform: tcp
    name: Central Heating Pressure
    host: 10.0.0.127
    port: 8888
    timeout: 5
    payload: "r WaterPressure\n"
    value_template: "{% raw %}{{ value.split(';')[0] }}{% endraw %}"
    unit_of_measurement: Bar
```

### {% linkable_title hddtemp %}

The tool `hddtemp` collects the temperature of your hard disks. 

```bash
$ hddtemp
/dev/sda: SAMSUNG MZMTE256HMHP-000L1: 39°C
```

With `hddtemp -d` you can run the tool in TCP/IP daemon mode on port 7634 which enables you to get the data across the network.

```bash
$ telnet localhost 7634
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
|/dev/sda|SAMSUNG MZMTE256HMHP-000L1|38|C|Connection closed by foreign host.
```

The entry for the `configuration.yaml` file for a `hddtemp` sensor could look like the example below.

```yaml
sensor:
# Example configuration.yaml entry
  - platform: tcp
    name: HDD temperature
    host: 127.0.0.1
    port: 7634
    timeout: 5
    payload: "\n"
    value_template: "{% raw %}{{ value.split('|')[3] }}{% endraw %}"
    unit_of_measurement: "°C"
```
