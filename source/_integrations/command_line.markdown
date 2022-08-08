---
title: Command Line
description: Instructions on how to integrate Command binary sensors within Home Assistant.
ha_category:
  - Binary Sensor
  - Utility
ha_release: 0.12
ha_iot_class: Local Polling
ha_domain: command_line
ha_platforms:
  - binary_sensor
  - cover
  - notify
  - sensor
  - switch
ha_integration_type: integration
---

The `command_line` binary sensor platform issues specific commands to get data.

## Configuration

To use your Command binary sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: command_line
    command: "cat /proc/sys/net/ipv4/ip_forward"
```

<div class='note'>

It's highly recommended to enclose the command in single quotes `'` as it ensures all characters can be used in the command and reduces the risk of unintentional escaping. To include a single quote in a command enclosed in single quotes, double it: `''`.

</div>

{% configuration %}
command:
  description: The action to take to get the value.
  required: true
  type: string
name:
  description: Let you overwrite the name of the device.
  required: false
  type: string
  default: "*name* from the device"
device_class:
  description: Sets the [class of the device](/integrations/binary_sensor/), changing the device state and icon that is displayed on the frontend.
  required: false
  type: string
payload_on:
  description: The payload that represents enabled state.
  required: false
  type: string
  default: 'ON'
payload_off:
  description: The payload that represents disabled state.
  required: false
  type: string
  default: 'OFF'
value_template:
  description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.
  required: false
  type: string
scan_interval:
  description: Defines number of seconds for polling interval.
  required: false
  type: integer
  default: 60
command_timeout:
  description: Defines number of seconds for command timeout.
  required: false
  type: integer
  default: 15
unique_id:
  description: An ID that uniquely identifies this binary sensor. Set this to a unique value to allow customization through the UI.
  required: false
  type: string
{% endconfiguration %}

## Execution

The `command` is executed within the [configuration directory](/docs/configuration/).

<div class='note'>

If you are using [Home Assistant Operating System](https://github.com/home-assistant/operating-system), the commands are executed in the `homeassistant` container context. So if you test or debug your script, it might make sense to do this in the context of this container to get the same runtime environment.

</div>

With a `0` exit code, the output (stdout) of the command is used as `value`. In case a command results in a non `0` exit code or is terminated by the `command_timeout`, the result is only logged to Home Assistant log and the sensors value is not updated.

## Examples

In this section you find some real-life examples of how to use this sensor.

### SickRage

Check the state of an [SickRage](https://github.com/sickragetv/sickrage) instance.

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: command_line
    command: 'netstat -na | find "33322" | find /c "LISTENING" > nul && (echo "Running") || (echo "Not running")'
    name: "sickragerunning"
    device_class: moving
    payload_on: "Running"
    payload_off: "Not running"
```

### Check RasPlex

Check if [RasPlex](https://github.com/RasPlex/RasPlex) is `online`.

```yaml
binary_sensor:
  - platform: command_line
    command: 'ping -c 1 rasplex.local | grep "1 received" | wc -l'
    name: "is_rasplex_online"
    device_class: connectivity
    payload_on: 1
    payload_off: 0
```

An alternative solution could look like this:

```yaml
binary_sensor:
  - platform: command_line
    name: Printer
    command: 'ping -W 1 -c 1 192.168.1.10 > /dev/null 2>&1 && echo success || echo fail'
    device_class: connectivity
    payload_on: "success"
    payload_off: "fail"
```

Consider to use the [ping sensor](/integrations/ping#binary-sensor) as an alternative to the samples above.

### Check if a system service is running

The services running is listed in `/etc/systemd/system` and can be checked with the `systemctl` command:

```bash
$ systemctl is-active home-assistant@rock64.service
active
$ sudo service home-assistant@rock64.service stop
$ systemctl is-active home-assistant@rock64.service
inactive
```

A binary command line sensor can check this:

```yaml
binary_sensor:
  - platform: command_line
    command: '/bin/systemctl is-active home-assistant@rock64.service'
    payload_on: "active"
    payload_off: "inactive"
```

## Services

Available services: `reload`.

### Service `command_line.reload`

Reload all `command_line` entities.

This service takes no service data attributes.
