---
title: TCP
description: Instructions on how to set up TCP within Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
ha_release: 0.14
ha_iot_class: Local Polling
ha_domain: tcp
ha_platforms:
  - binary_sensor
  - sensor
---

The TCP integration allows the integration of some services for which a specific Home Assistant integration does not exist. If the service communicates over a TCP socket with a simple request/reply mechanism then the chances are that this integration will allow integration with it.

There is currently support for the following device types within Home Assistant:

- [Configuration](#configuration)
- [Examples](#examples)
  - [EBUSd](#ebusd)
    - [hddtemp](#hddtemp)

## Configuration

To enable the TCP integration, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tcp:
  - host: IP_ADDRESS
    port: PORT
    timeout: 5

    sensors:
      - name: NAME
        payload: PAYLOAD
        value_template: TEMPLATE

    binary_sensors:
      - name: NAME
        payload: PAYLOAD
        value_template: TEMPLATE
        value_on: VALUE_ON
```

{% configuration %}
tcp:
  description: List of your hosts
  required: true
  type: map
  keys:
    host:
      description: The hostname/IP address to connect to.
      required: true
      type: string
    port:
      description: The port to connect to the host on.
      required: true
      type: integer
    timeout:
      description: How long in seconds to wait for a response from the service before giving up and disconnecting.
      required: false
      default: 10
      type: integer
    buffer_size:
      description: The size of the receive buffer in bytes. Set this to a larger value if you expect to receive a response larger than the default.
      required: false
      default: "`1024`"
      type: integer
    ssl:
      description: If `true`, use SSL/TLS.
      required: false
      default: false
      type: boolean
    verify_ssl:
      description: Set this to `false` if the server is using a self-signed certificate.
      required: false
      default: true
      type: boolean
    sensors:
      description: List of sensors for this host
      required: false
      type: map
      keys:
        name:
          description: The name you'd like to give the sensor in Home Assistant.
          required: false
          type: string
        payload:
          description: What to send to the host in order to get the response we're interested in.
          required: true
          type: string
        value_template:
          description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the value. By default it's assumed that the entire response is the value.
          required: false
          type: template
        unit_of_measurement:
          description: The unit of measurement to use for the value.
          required: false
          type: string
    binary_sensors:
      description: List of binary_sensors for this host
      required: false
      type: map
      keys:
        name:
          description: The name you'd like to give the sensor in Home Assistant.
          required: false
          type: string
        payload:
          description: What to send to the host in order to get the response we're interested in.
          required: true
          type: string
        value_template:
          description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the value. By default it's assumed that the entire response is the value.
          required: false
          type: template
        value_on:
          description: Value which sets the sensor to the `on` state
          required: false
          type: string
{% endconfiguration %}

## Examples

In this section you find some real-life examples of how to use the TCP integration.

### EBUSd

The [EBUSd](https://github.com/john30/ebusd/wiki) service enables connection to an EBUS serial bus on some home heating/cooling systems. Using this service it is possible to extract various metrics which may be useful to have within Home Assistant. In order to use EBUSd, you connect to it using a TCP socket and send it a command. The service will respond with the value it has received from EBUS. On the command line, this would look something like:

```bash
$ echo "r WaterPressure" | nc 10.0.0.127 8888
0.903;ok
```

You will notice that the output from the service is not just a single value (it contains ";ok" as well). To grab the value we're interested in, we can use the sensor platform in combination with a Jinja2 template. The response received is injected into the template as the `value` variable.

To use this value within Home Assistant, use the following configuration. Note that the given TCP Sensor template also checks for non-float return values in which case the existing sensor value is reused instead of resulting in an undefined state.

{% raw %}

```yaml
# Example configuration.yaml entry
    sensors:
      - name: Central Heating Pressure
        payload: "r WaterPressure\n"
        value_template: >
          {% set state = value.split(';')[0] %}
          {{ state | float if is_number(state)
            else states('sensor.central_heating_pressure') }}
        unit_of_measurement: Bar
```

{% endraw %}

The TCP Binary Sensor is a type of [TCP Sensor](#sensor) which is either "off" or "on". In order to use this sensor type, in addition to the configuration for the TCP Sensor, you must supply a `value_on` value to represent what is returned when the device is turned on.

To use this sensor with EBUSd, add the following lines to your `configuration.yaml`

{% raw %}

```yaml
# Example configuration.yaml entry
    binary_sensors:
      - name: Flame
        payload: "r Flame\n"
        value_template: >
          {{ value if (value | trim) in ('on', 'off')
            else states('binary_sensor.flame') }}
        value_on: "on"
```

{% endraw %}

#### hddtemp

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

{% raw %}

```yaml
# Example configuration.yaml entry
tcp:
  - host: 127.0.0.1
    port: 7634
    timeout: 5

    sensors:
    - name: HDD temperature
      payload: "\n"
      value_template: "{{ value.split('|')[3] }}"
      unit_of_measurement: "°C"
```

{% endraw %}
