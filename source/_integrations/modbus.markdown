---
title: Modbus
description: Instructions on how to integrate Modbus and platforms.
ha_category:
  - Hub
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_codeowners:
  - '@adamchengtkc'
  - '@janiversen'
  - '@vzahradnik'
ha_domain: modbus
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - sensor
  - switch
---

[Modbus](http://www.modbus.org/) is a serial communication protocol to control PLCs (Programmable Logic Controller).
It supports various types of devices which can be controlled over serial, TCP, and UDP connections.

## Configuration

How to add modbus to your installation depends on the connection type, either a network or serial connection.

Platforms:
  - binary_sensor
  - climate
  - cover
  - sensor
  - switch

are all defined as part of the modbus configuration. The old configuration style, (having each outside the modbus configuration is still supported, but will cause a warning, and will be removed in a later release).

### Network connection

For a network connection, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for a TCP connection
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
```

{% configuration %}
close_comm_on_error:
  description: Determines if the modbus communication is closed when an error occurs, default is true. Some serial-rs485 adapters sends garble to HA when opened, this lead to a disconnect and a new connect, which can continue. If in a running communication the debug log contains a message from pymodbus, with the text "cleaning....", then try this parameter.
  required: false
  default: true
  type: boolean
delay:
  description: Time to delay messages in seconds after connecting. Some modbus devices need a delay typically 1-2 seconds after connection is established in order to prepare the communication. If a device accepts connecting with no response to the requests sent or the device disconnects, this parameter might help.
  required: false
  default: 0
  type: integer
host:
  description: The IP address of your Modbus device, e.g., 192.168.1.1.
  required: true
  type: string
name:
  description: Name for this hub. Must be unique, so it is required when setting up multiple instances.
  required: false
  default: modbus_hub
  type: string
port:
  description: The network port for the communication.
  required: true
  type: integer
timeout:
  description: Timeout for slave response in seconds.
  required: false
  default: 3
  type: integer
type:
  description: Type of the connection to Modbus. Possible values are `tcp` (Modbus TCP protocol according to "MODBUS Messaging Implementation Guide version 1.0b" provided by Schneider Automation.), `udp`(Modbus TCP form, but using UDP for transport. It removes the overheads required for TCP.) and `rtuovertcp` (Modbus RTU message transmitted with a TCP/IP wrapper and sent over a network instead of serial lines.).
  required: true
  type: string
{% endconfiguration %}

### Serial connection

For a serial connection, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for a serial connection
modbus:
  - name: hub1
    type: serial
    method: rtu
    port: /dev/ttyUSB0
    baudrate: 9600
    stopbits: 1
    bytesize: 8
    parity: N
```

{% configuration %}
baudrate:
  description: The speed for the serial connection.
  required: true
  type: integer
bytesize:
  description: "The bytesize for the serial connection; can be `5`, `6`, `7` or `8`."
  required: true
  type: integer
delay:
  description: Time to sleep in seconds after connecting and before sending messages. Some modbus servers need a short delay typically 1-2 seconds in order to prepare the communication. If a server accepts connecting, but there is no response to the requests send, this parameter might help.
  required: false
  default: 0
  type: integer
method:
  description: "Method of the connection to Modbus, either `rtu` or `ascii`."
  required: true
  type: string
name:
  description: Name for this hub. Must be unique, so it is required when setting up multiple instances.
  required: false
  default: modbus_hub
  type: string
parity:
  description: "The parity for the serial connection; can be `E`, `O` or `N`."
  required: true
  type: string
port:
  description: The port where your Modbus device is connected to your Home Assistant host.
  required: true
  type: string
stopbits:
  description: "The stopbits for the serial connection, either `1` or `2`."
  required: true
  type: integer
timeout:
  description: Timeout for slave response in seconds.
  required: false
  default: 3
  type: integer
type:
  description: "Type of the connection to Modbus, needs to be `serial` for this setup."
  required: true
  type: string
{% endconfiguration %}

### Configuring platform binary sensor

The `modbus` binary sensor allows you to gather data from [Modbus](http://www.modbus.org/) coils with state ON/OFF.

To use your Modbus binary sensors in your installation, add the following to your `configuration.yaml` file:
```yaml
# Example configuration.yaml entry for binary_sensor configuration
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    binary_sensors:
      - name: Sensor1
        slave: 1
        address: 100
      - name: Sensor2
        address: 110
        input_type: discrete_input
```
{% configuration %}
binary_sensors:
  description: A list of all binary_sensors available in this modbus instance.
  required: false
  type: [map]
  keys:
    device_class:
      description: Device class to be used for the UI (e.g. "door").
      required: false
      type: string
    input_type:
      description: type of adddress (discrete/coil)
      required: false
      default: coil
      type: string
    name:
      description: Name for this binary_sensor. Must be unique.
      required: true
      type: string
    scan_interval:
      description: Defines the update interval of the sensor in seconds.
      required: false
      type: integer
      default: 15
    slave:
      description: The number of the slave.
      required: false
      type: integer
    address:
      description: Address of the Register.
      required: true
      type: integer
{% endconfiguration %}


### Configuring platform climate

To use your Modbus thermostat in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    climates:
      - name: Watlow F4T
        slave: 1
        data_type: uint
        data_count: 1
        scale: 0.1
        offset: 0
        precision: 1
        max_temp: 30
        min_temp: 15
        temp_step: 1
        target_temp_register: 2782
        current_temp_register: 27586
```

{% configuration %}
climates:
  description: A list of all climates available in this modbus instance.
  required: false
  type: [map]
  keys:
    current_temp_register:
      description: Register number for current temperature (Process value).
      required: true
      type: integer
    current_temp_register_type:
      description: Modbus register type (holding, input) for current temperature, default holding.
      required: false
      type: string
      default: holding
    data_count:
      description: Number of registers to read.
      required: false
      type: integer
      default: 2
    data_type:
      description: Response representation (int, uint, float, custom). If float selected, value will converted to IEEE 754 floating point format.
      required: false
      type: string
      default: float
    min_temp:
      description: Maximum setpoint temperature.
      required: false
      type: integer
      default: 5
    name:
      description: Name of the device
      required: true
      type: string
    offset:
      description: Final offset (output = scale * value + offset).
      required: false
      type: float
      default: 0
    precision:
      description: Number of valid decimals.
      required: false
      type: integer
      default: 1
    scale:
      description: Scale factor (output = scale * value + offset).
      required: false
      type: float
      default: 1
    scan_interval:
      description: Defines the update interval of the sensor in seconds.
      required: false
      type: integer
      default: 15
    slave:
      description: The number of the slave (Optional for tcp and upd Modbus, use 1).
      required: true
      type: integer
    structure:
      description: "If `data_type` is custom specified a double-quoted Python struct is expected here, to format the string to unpack the value. See Python documentation for details. Example: `>i`."
      required: false
      type: string
      default: ">f"
    target_temp_register:
      description: Register number for target temperature (Setpoint).
      required: true
      type: integer
    temp_step:
      description: The supported step size a target temperature can be increased/decreased.
      required: false
      type: float
      default: 0.5
    temperature_unit:
      description: Temperature unit reported by the current_temp_register. C or F
      required: false
      type: string
      default: C
{% endconfiguration %}

## Services

### Service `modbus.set-temperature`

| Service | Description |
| ------- | ----------- |
| set_temperature | Set Temperature. Requires `value` to be passed in, which is the desired target temperature. `value` should be in the same type as `data_type` |

### Configuring platform cover

The `modbus` cover platform allows you to control [Modbus](http://www.modbus.org/) covers (such as blinds, a roller shutter, or a garage door).

At the moment, we support the opening and closing of a cover. You can control your covers either using coils or holding registers.

Cover that uses the `coil` attribute is not able to determine intermediary states such as opening and closing. Coil stores only two states — "0" means cover closed, and "1" implies cover open. To allow detecting intermediary states, we added an optional `status_register` attribute. It will enable you to write your command (e.g., to open a cover) into a coil, and read current cover status back through the register. Additionally, you can specify values for `state_open`, `state_opening`, `state_closed`, and `state_closing` attributes. These will be matched with the value read from the `status_register`.

If your cover uses holding register to send commands (defined by the `register` attribute), it can also read the intermediary states. To adjust which value represents what state, you can fine-tune the optional state attributes, like `state_open`. These optional state values are also used for specifying values written into the register. If you specify an optional status_register attribute, cover states will be read from status_register instead of the register used for sending commands.

To use Modbus covers in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    covers:
      - name: Door1
        device_class: door
        scan_interval: 1
        coil: 0
      - name: Door2
        device_class: door
        scan_interval: 1
        coil: 1
        status_register: 1
      - name: Door3
        slave: 2
        device_class: door
        scan_interval: 1
        register: 0
        state_open: 1
        state_closed: 0
```

{% configuration %}
covers:
  description: The array contains a list of all your Modbus covers.
  required: true
  type: map
  keys:
    coil:
      description: Coil address; can be omitted if a register attribute is specified. Coil and register attributes are mutually exclusive, and you need to always specify one of them.
      required: true
      type: integer
    device_class:
      description: The [type/class](/integrations/cover/#device-class) of the cover to set the icon in the frontend.
      required: false
      type: device_class
      default: None
    name:
      description: Name of the switch.
      required: true
      type: string
    register:
      description: Holding register address; can be omitted if a coil attribute is specified. Coil and register attributes are mutually exclusive, and you need to always specify one of them.
      required: true
      type: integer
    scan_interval:
      description: Defines the update interval of the sensor in seconds.
      required: false
      type: integer
      default: 15
    slave:
      description: The number of the slave (can be omitted for tcp and udp Modbus).
      required: false
      default: 1
      type: integer
    state_open:
      description: A value in `status_register` or `register` representing an open cover. If your configuration uses an `register` attribute, this value will be also written into a holding register to open the cover.
      required: false
      default: 1
      type: integer
    state_closed:
      description: A value in `status_register` or `register` representing a closed cover. If your configuration uses an `register` attribute, this value will be also written into a holding register to close the cover.
      required: false
      default: 0
      type: integer
    state_opening:
      description: A value in `status_register` or `register` telling us that the cover is opening at the moment. Note that this state should be also supported on your connected Modbus cover. If it won't write this intermediary state into the register, this state won't be detected.
      required: false
      default: 2
      type: integer
    state_closing:
      description: A value in `status_register` or `register` telling us that the cover is closing at the moment. Note that this state should be also supported on your connected Modbus cover. If it won't write this intermediary state into the register, this state won't be detected.
      required: false
      default: 2
      type: integer
    status_register:
      description: An address of an register, from which all the cover states will be read. If you specified `register` attribute, and not `status_register` attribute, your main register will also be used as a status register.
      required: false
      type: integer
    status_register_type:
      description: Modbus register type (holding, input), default holding.
      required: false
      type: string
{% endconfiguration %}

#### Example: Modbus cover controlled by a coil

This example shows a configuration for a Modbus cover controlled using a coil. Intermediary states like opening/closing are not supported. The cover state is polled from Modbus every 10 seconds.

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    covers:
      - name: Door1
        slave: 1
        coil: 1
        device_class: door
        scan_interval: 10
      - name: Door2
        slave: 2
        coil: 2
        device_class: door
        scan_interval: 10
```

#### Example: Modbus cover controlled by a coil, it's state is read from the register

This example shows a configuration for a Modbus cover controlled using a coil. Actual cover state is read from the `status_register`. We've also specified register values to match with the states open/opening/closed/closing. The cover state is polled from Modbus every 10 seconds.

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    covers:
      - name: Door1
        slave: 1
        device_class: door
        scan_interval: 10
        coil: 1
        status_register: 1
        status_register_type: input
        state_opening: 1
        state_open: 2
        state_closing: 3
        state_closed: 4
```

#### Example: Modbus cover controlled by a holding register

This example shows a configuration for a Modbus cover controlled using a holding register, from which we also read current cover state. We've also specified register values to match with the states open/opening/closed/closing. The cover state is polled from Modbus every 10 seconds.

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    covers:
      - name: Door1
        slave: 1
        device_class: door
        scan_interval: 10
        register: 1
        state_opening: 1
        state_open: 2
        state_closing: 3
        state_closed: 4
```

#### Example: Modbus cover controlled by a holding register, it's state is read from the status register

This example shows a configuration for a Modbus cover controlled using a holding register. However, cover state is read from a `status_register`. In this case, we've specified only values for `state_open` and `state_closed`, for the rest, default values are used. The cover state is polled from Modbus every 10 seconds.

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502

    covers:
      - name: Door1
        slave: 1
        device_class: door
        scan_interval: 10
        register: 1
        status_register: 2
        register_type: holding
        state_open: 1
        state_closed: 0
```

### Configuring platform sensor

The `modbus` cover platform allows you to control [Modbus](http://www.modbus.org/) covers (such as blinds, a roller shutter, or a garage door).


The `modbus` sensor allows you to gather data from [Modbus](http://www.modbus.org/) registers.

To use your Modbus sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    sensors:
      - name: Sensor1
        unit_of_measurement: °C
        slave: 1
        address: 100
      - name: Sensor2
        unit_of_measurement: mg
        address: 110
        count: 2
      - name: Sensor3
        unit_of_measurement: °C
        slave: 1
        address: 120
        input_type: input
        data_type: float
        scale: 0.01
        offset: -273.16
        precision: 2
```

{% configuration %}
sensors:
  description: The array contains a list of all your Modbus sensors.
  required: true
  type: map
  keys:
    address:
      description: Register number.
      required: true
      type: integer
    count:
      description: Number of registers to read.
      required: false
      type: integer
      default: 1
    data_type:
      description: Response representation (int, uint, float, string, custom). If float selected, value will be converted to IEEE 754 floating point format.
      required: false
      default: int
      type: string
    device_class:
      description: The [type/class](/integrations/sensor/#device-class) of the sensor to set the icon in the frontend.
      required: false
      type: device_class
      default: None
    input_type:
      description: Modbus register type (holding, input), default holding.
      required: false
      type: string
    name:
      description: Name of the sensor.
      required: true
      type: string
    offset:
      description: Final offset (output = scale * value + offset).
      required: false
      default: 0
      type: float
    precision:
      description: Number of valid decimals.
      required: false
      default: 0
      type: integer
    swap:
      description: swap the order of bytes/words, options are none, byte, word, word_byte.
      required: false
      default: none
      type: string 
    scale:
      description: Scale factor (output = scale * value + offset).
      required: false
      default: 1
      type: float
    scan_interval:
      description: Defines the update interval of the sensor in seconds.
      required: false
      type: integer
      default: 15
    slave:
      description: The number of the slave (Optional for tcp and upd Modbus).
      required: true
      type: integer
    structure:
      description: "If `data_type` is custom specified a double-quoted Python struct is expected here, to format the string to unpack the value. See Python documentation for details. Example: `>i`."
      required: false
      type: string
    unit_of_measurement:
      description: Unit to attach to value.
      required: false
      type: integer
{% endconfiguration %}

<div class='note'>

If you specify scale or offset as floating point values, double precision floating point arithmetic will be used to calculate final value. This can cause loss of precision for values that are larger than 2^53.

</div>

#### Full example

Example temperature sensor with a default scan interval:

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    sensors:
      - name: Room_1
        slave: 10
        address: 0
        input_type: holding
        unit_of_measurement: °C
        count: 1
        scale: 0.1
        offset: 0
        precision: 1
        data_type: integer
```

### Configuring platform switch

The `modbus` switch platform allows you to control [Modbus](http://www.modbus.org/) coils or registers.

To use your Modbus switches in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
modbus:
  - type: tcp
    host: IP_ADDRESS
    port: 502
    switches:
      - name: Switch1
        address: 13
        write_type: coil
      - name: Switch2
        slave: 2
        address: 14
        write_type: coil
        verify:
      - name: Register1
        address: 11
        command_on: 1
        command_off: 0
        verify:
            input_type: holding
            address: 127
            state_on: 25
            state_off: 1
```

{% configuration %}
switches:
  description: The array contains a list of all your Modbus switches.
  required: true
  type: map
  keys:
    address:
      description: Coil number or register
      required: true
      type: integer
    command_on:
      description: Value to write to turn on the switch.
      required: false
      default: 0x01
      type: integer
    command_off:
      description: Value to write to turn off the switch.
      required: false
      default: 0x00
      type: integer
    write_type:
      description: type of adddress (holding/coil)
      required: false
      default: holding
      type: string
    name:
      description: Name of the switch.
      required: true
      type: string
    scan_interval:
      description: Defines the update interval of the sensor in seconds.
      required: false
      type: integer
      default: 15
    slave:
      description: The number of the slave (can be omitted for tcp and udp Modbus).
      required: false
      type: integer
      default: 0
    verify:
      description: Read from modbus device to verify switch. If used without attributes it uses the toggle register configuration. If omitted no verification is done, but the state of the switch is set with each toggle.
      required: false
      type: map
      keys:
        address:
          description: address to read from. 
          required: false
          default: write address
          type: integer
        input_type:
          description: type of adddress (holding/coil/discrete/input)
          required: false
          default: write_type
          type: integer
        state_on:
          description: value when switch is on.
          required: false
          default: same as command_on
          type: integer
        state_off:
          description: value when switch is off.
          required: false
          default: same as command_off
          type: integer
{% endconfiguration %}

#### Full example

Example switches, for which the state is not polled.

```yaml
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    switches:
      - name: Switch1
        slave: 1
        address: 13
        input_type: coil
      - name: Switch2
        slave: 2
        address: 14
```

#### Multiple connections

Multiple connections are possible, add something like the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for multiple TCP connections
modbus:
  - type: tcp
    host: IP_ADDRESS_1
    port: 2020
    name: hub1

  - type: tcp
    host: IP_ADDRESS_2
    port: 501
    name: hub2
```

### Service `modbus.write_register`

| Service | Description |
| ------- | ----------- |
| write_register | Write register. Requires `hub`, `unit`, `address` and `value` fields. `value` can be either single value or an array |

Description:

| Attribute | Description |
| --------- | ----------- |
| hub       | Hub name (defaults to 'default' when omitted) |
| unit      | Slave address (1-255, mostly 255 if you talk to Modbus via TCP) |
| address   | Address of the Register (e.g., 138) |
| value     | A single value or an array of 16-bit values. Single value will call modbus function code 6. Array will call modbus function code 16. Array might need reverse ordering. E.g., to set 0x0004 you might need to set `[4,0]` |

### Service `modbus.write_coil`

| Service | Description |
| ------- | ----------- |
| write_coil | Write coil. Requires `hub`, `unit`, `address` and `state` fields. `state` can be either single bolean or an array |

Description:

| Attribute | Description |
| --------- | ----------- |
| hub       | Hub name (defaults to 'default' when omitted) |
| unit      | Slave address (1-255, mostly 255 if you talk to Modbus via TCP) |
| address   | Address of the Register (e.g., 138) |
| state     | A single boolean or an array of booleans. Single boolean will call modbus function code 6. Array will call modbus function code 16.
..

## Log warning (v1.0.8 and onwards)

Pymodbus (which is the implementation library) was updated and issues a warning:

 - "Not Importing deprecated clients. Dependency Twisted is not Installed"

This warning can be safely ignored, and have no influence on how the integration
works!

## Opening an issue

When opening an issue, please add your current configuration (or a scaled down version), with at least:

 - the Modbus configuration lines
 - the entity (sensor, etc.) lines

In order for the developers better to identify the problem, please add the
following lines to configuration.yaml:

```yaml
logger:
  logs:
    homeassistant.components.modbus: debug
    pymodbus.client: debug
```

and restart Home Assistant, reproduce the problem, and include the log in the issue.

## Building on top of Modbus

 - [Modbus Binary Sensor](/integrations/binary_sensor.modbus/)
 - [Modbus Climate](/integrations/climate.modbus/)
 - [Modbus Cover](/integrations/cover.modbus/)
 - [Modbus Sensor](/integrations/sensor.modbus/)
 - [Modbus Switch](/integrations/switch.modbus/)
