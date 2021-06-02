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
  - fan
  - light
  - sensor
  - switch
---

[Modbus](http://www.modbus.org/) is a serial communication protocol to control PLCs (Programmable Logic Controller) and RTUs (Remote Terminal Unit). The integration adheres strictly to the [protocol specification](https://modbus.org/docs/Modbus_Application_Protocol_V1_1b3.pdf).
Modbus supports all devices adhering to the Modbus standard. The communication between the device(s) can be serial (rs-485), TCP, or UDP connections. The Modbus integration allows multiple communications e.g. serial combined with TCP or different TCP connected devices.

# Configuring Modbus

First, you define how to communicate with your Modbus devices and after that you define the information being exchanged. The Modbus integration allows you to use multiple connections.

## Configuring Modbus common parameters

Part of the configuration is common for all types of communication. Add the following to your `configuration.yaml` file:

```yaml
modbus:
  - name: "hub1"
    close_comm_on_error: true
    delay: 5
    timeout: 5
    type: tcp
```

{% configuration %}
close_comm_on_error:
  description: Determines if the device connection is closed when an error occurs, default is true. Some serial-rs485 adapters deliver garble when opened, this leads to a disconnect and a new connect, which can continue. If in a running communication the debug log contains a message from pymodbus, with the text "cleaning....", then try this parameter.
  required: false
  default: true
  type: boolean
delay:
  description: "Time to delay sending messages in seconds after connecting. Some Modbus devices need a delay of typically 1-2 seconds after established connection to prepare the communication. If a device does not respond to messages after connecting, this parameter might help. Remark: the delay is solely between connect and the first message."
  required: false
  default: 0
  type: integer
name:
  description: Name for this hub. Must be unique, so it is required when setting up multiple instances.
  required: false
  default: "modbus_hub"
  type: string
timeout:
  description: "Timeout while waiting for a response in seconds."
  required: false
  default: 5
  type: integer
type:
  description: Type of communication. Possible values are `tcp` Modbus messages with Modbus TCP frame on TCP/IP, `udp` Modbus messages with Modbus TCP frame on UDP, `rtuovertcp` Modbus messages with a wrapper TCP/IP simulating a serial line.
  required: true
  type: string
{% endconfiguration %}

## Configuring network connection

For a network (type: `tcp`/`udp`/`rtuovertcp`) connection, add the following to your `configuration.yaml` file, in addition to the [common parameters](#configuring-modbus-common-parameters):

```yaml
# Example configuration.yaml entry for a TCP connection
modbus:
  - name: "hub1"
    type: tcp
    host: IP_ADDRESS
    port: 502
```

{% configuration %}
host:
  description: The IP address of your Modbus device, e.g., `192.168.1.1`.
  required: true
  type: string
port:
  description: The network port for the communication.
  required: true
  type: integer
type:
  description: "Type of the connection to Modbus, needs to be `tcp` or `udp` or `rtuovertcp` for this setup."
  required: true
  type: string
{% endconfiguration %}

## Configuring serial connection

For a serial connection, add the following to your `configuration.yaml` file, in addition to the [common parameters](#configuring-modbus-common-parameters):

```yaml
# Example configuration.yaml entry for a serial connection
modbus:
  - name: hub1
    type: serial
    baudrate: 9600
    bytesize: 8
    method: rtu
    parity: E
    port: /dev/ttyUSB0
    stopbits: 1
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
method:
  description: "Method of the connection to Modbus, either `rtu` or `ascii`."
  required: true
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
type:
  description: "Type of the connection to Modbus, needs to be `serial` for this setup."
  required: true
  type: string
{% endconfiguration %}

## Configuring multiple connections

Multiple connections are possible with identical/different `type:`.

```yaml
# Example configuration.yaml entry for multiple TCP connections
modbus:
  - type: tcp
    host: IP_ADDRESS_1
    port: 2020
    name: "hub1"

  - type: udp
    host: IP_ADDRESS_2
    port: 501
    name: hub2
```

Remark: `name:`is required for multiple connections, because it needs to be unique.

## Modbus services

The Modbus integration provides two generic services in addition to the platform-specific services.

| Service | Description |
| ------- | ----------- |
| modbus.write_register | Write register or registers |
| modbus.write_coil | Write coil or coils |

Description:

| Attribute | Description |
| --------- | ----------- |
| hub       | Hub name (defaults to 'modbus_hub' when omitted) |
| unit      | Slave address (1-255, defaults to 0) |
| address   | Address of the Register (e.g. 138) |
| value     | (write_register) A single value or an array of 16-bit values. Single value will call modbus function code 0x06. Array will call modbus function code 0x10. Values might need reverse ordering. E.g., to set 0x0004 you might need to set `[4,0]`, this depend on the byte order of your CPU |
| state     | (write_coil) A single boolean or an array of booleans. Single boolean will call modbus function code 0x05. Array will call modbus function code 0x0F |

# configure Modbus platforms

Modbus platform entities are configured within the Modbus configuration.

## Configuring platform common parameters

All modbus platforms share a set of common parameters.

```yaml
# Example configuration.yaml entry for platform common parameters
modbus:
  - type: tcp
    host: IP_ADDRESS_1
    port: 2020
    name: "hub1"
    sensors:
      - name: sensor1
        scan_interval: 999
        slave: 0
```

{% configuration %}
name:
  description: Name for the platform entity which must be unique within the platform.
  required: true
  type: string
scan_interval:
  description: Defines the update interval of the entity in seconds.
  required: false
  type: integer
  default: 10
slave:
  description: The number of the slave.
  required: false
  type: integer
  default: 0
{% endconfiguration %}

### Configuring platform binary sensor

The Modbus binary sensor allows you to gather data from coils which as per standard have state ON/OFF.

To use your Modbus binary sensors in your installation, add the following to your `configuration.yaml` file, in addition to the [common parameters](#configuring- platform-common-parameters):

```yaml
# Example configuration.yaml entry for binary_sensor configuration
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    binary_sensors:
      - name: "binary_sensor1"
        address: 100
        scan_interval: 20
        slave: 1
      - name: "binary_ensor2"
        address: 110
        device_class: door
        input_type: discrete_input
```
{% configuration %}
binary_sensors:
  description: A list of all binary_sensors available in this modbus instance, omit if there are no binary_sensors.
  required: false
  type: [map]
  keys:
    address:
      description: Address of the Register.
      required: true
      type: integer
    device_class:
      description: The [type/class](/integrations/binary_sensor/#device-class) to be used for the UI (e.g. "door").
      required: false
      type: string
    input_type:
      description: type of address (discrete_input/coil)
      required: false
      default: coil
      type: string
{% endconfiguration %}

### Configuring platform climate

The Modbus climate platform allows you to monitor your thermostat as well as set a target temperature.

To use your Modbus thermostat in your installation, add the following to your `configuration.yaml` file, in addition to the [common parameters](#configuring- platform-common-parameters):

```yaml
# Example configuration.yaml entry
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    climates:
      - name: "Watlow F4T"
        address: 27586
        input_type: holding
        data_count: 1
        data_type: custom
        max_temp: 35
        min_temp: 15
        offset: 0
        precision: 1
        scale: 0.1
        max_temp: 30
        structure: ">f"
        target_temp_register: 2782
        temp_step: 1
        temperature_unit: C
```

{% configuration %}
climates:
  description: A list of all climates available in this modbus instance.
  required: false
  type: [map]
  keys:
    address:
      description: Register address for current temperature (process value).
      required: true
      type: integer
    data_count:
      description: Number of registers to read.
      required: false
      type: integer
      default: 2
    data_type:
      description: Response representation (`int`, `uint`, `float`, `custom`). If `float` selected, value will converted to IEEE 754 floating point format. If `custom`is selected `structure`must de defined.
      required: false
      type: string
      default: float  
    input_type:
      description: Modbus register type (`holding`, `input`) for current temperature.
      required: false
      type: string
      default: holding
    max_temp:
      description: Maximum setpoint temperature.
      required: false
      type: integer
      default: 35
    min_temp:
      description: Minimum setpoint temperature.
      required: false
      type: integer
      default: 5
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
    structure:
      description: "If `data_type` is custom specified a double-quoted Python struct is expected here, to format the string to unpack the value. See Python documentation for details. Example: `>i`."
      required: false
      type: string
      default: ">f"
    target_temp_register:
      description: Register address for target temperature (Setpoint).
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

#### Service `modbus.set-temperature`

| Service | Description |
| ------- | ----------- |
| set_temperature | Set Temperature. Requires `value` to be passed in, which is the desired target temperature. `value` should be in the same type as `data_type` |

### Configuring platform cover

The `modbus` cover platform allows you to control covers (such as blinds, a roller shutter, or a garage door).

At the moment, platform cover support the opening and closing of a cover. You can control your covers either using coils or holding registers.

Cover that uses `input_type: coil` is not able to determine intermediary states such as opening and closing. Coil stores only two states — "0" means cover closed, and "1" implies cover open. To allow detecting intermediary states, there is an optional `status_register` attribute. It will enable you to write your command (e.g., to open a cover) into a coil, and read current cover status back through the register. Additionally, you can specify values for `state_open`, `state_opening`, `state_closed`, and `state_closing` attributes. These will be matched with the value read from the `status_register`.

If your cover uses ìnput_type: holding` (default) to send commands, it can also read the intermediary states. To adjust which value represents what state, you can fine-tune the optional state attributes, like `state_open`. These optional state values are also used for specifying values written into the register. If you specify an optional status_register attribute, cover states will be read from status_register instead of the register used for sending commands.

To use Modbus covers in your installation, add the following to your `configuration.yaml` file, in addition to the [common parameters](#configuring- platform-common-parameters):

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
        input_type: coil
        address: 117
        device_class: door
        state_open: 1
        state_opening: 2
        state_closed: 0
        state_closing: 3
        status_register: 119
        status_register_type: holding
      - name: "Door2"
        address: 117
```

{% configuration %}
covers:
  description: The array contains a list of all your Modbus covers.
  required: true
  type: map
  keys:
    address:
      description: Address of `coil` / `register`.
      required: true
      type: integer
    device_class:
      description: The [type/class](/integrations/cover/#device-class) of the cover to set the icon in the frontend.
      required: false
      type: device_class
      default: None
    input_type:
      description: Modbus register type (holding, input), default holding.
      default: holding
      required: false
      type: string
    state_open:
      description: A value in `status_register` or `register` representing an open cover. If your configuration uses the `register` attribute, this value will be written into the holding register to open the cover.
      required: false
      default: 1
      type: integer
    state_closed:
      description: A value in `status_register` or `register` representing a closed cover. If your configuration uses the `register` attribute, this value will be written into the holding register to close the cover.
      required: false
      default: 0
      type: integer
    state_opening:
      description: A value in `status_register` or `register` representing a opening cover. Note that this state should be also supported on your connected Modbus cover. If it won't report the state, this state won't be detected.
      required: false
      default: 2
      type: integer
    state_closing:
      description: A value in `status_register` or `register` representing a closing cover. Note that this state should be also supported on your connected Modbus cover. If it won't reeport the state, this state won't be detected.
      required: false
      default: 3
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



### Configuring platform fan

The `modbus` fan platform allows you to control [Modbus](http://www.modbus.org/) coils or registers.

To use your Modbus fans in your installation, add the following to your `configuration.yaml` file, in addition to the [common parameters](#configuring- platform-common-parameters):

```yaml
# Example configuration.yaml entry
modbus:
  - type: tcp
    host: IP_ADDRESS
    port: 502
    fans:
      - name: "Fan1"
        address: 13
        write_type: coil
      - name: "Fan2"
        slave: 2
        address: 14
        write_type: coil
        verify:
      - name: "Register1"
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
fans:
  description: The array contains a list of all your Modbus fans.
  required: true
  type: map
  keys:
    address:
      description: Coil number or register.
      required: true
      type: integer
    command_on:
      description: Value to write to turn on the fan.
      required: false
      default: 0x01
      type: integer
    command_off:
      description: Value to write to turn off the fan.
      required: false
      default: 0x00
      type: integer
    write_type:
      description: Type of address (holding/coil).
      required: false
      default: holding
      type: string
    name:
      description: Name of the fan.
      required: true
      type: string
    verify:
      description: Read from Modbus device to verify fan. If used without attributes it uses the toggle register configuration. If omitted no verification is done, but the state of the fan is set with each toggle.
      required: false
      type: map
      keys:
        address:
          description: Address to read from. 
          required: false
          default: write address
          type: integer
        delay:
          description: delay between write and verify.
          required: false
          default: 0
          type: integer
        input_type:
          description: Type of address (holding/coil/discrete/input).
          required: false
          default: write_type
          type: integer
        state_on:
          description: Value when the fan is on.
          required: false
          default: same as command_on
          type: integer
        state_off:
          description: Value when the fan is off.
          required: false
          default: same as command_off
          type: integer
{% endconfiguration %}

### Configuring platform light

The `modbus` light platform allows you to control [Modbus](http://www.modbus.org/) coils or registers.

To use your Modbus lights in your installation, add the following to your `configuration.yaml` file, in addition to the [common parameters](#configuring- platform-common-parameters):

```yaml
# Example configuration.yaml entry
modbus:
  - type: tcp
    host: IP_ADDRESS
    port: 502
    lights:
      - name: "light1"
        address: 13
        write_type: coil
      - name: "light2"
        slave: 2
        address: 14
        write_type: coil
        verify:
      - name: "Register1"
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
lights:
  description: The array contains a list of all your Modbus lights.
  required: true
  type: map
  keys:
    address:
      description: Coil number or register.
      required: true
      type: integer
    command_on:
      description: Value to write to turn on the fan.
      required: false
      default: 0x01
      type: integer
    command_off:
      description: Value to write to turn off the light.
      required: false
      default: 0x00
      type: integer
    write_type:
      description: Type of address (holding/coil).
      required: false
      default: holding
      type: string
    verify:
      description: Read from Modbus device to verify the light. If used without attributes it uses the toggle register configuration. If omitted no verification is done, but the state of the light is set with each toggle.
      required: false
      type: map
      keys:
        address:
          description: Address to read from. 
          required: false
          default: write address
          type: integer
        delay:
          description: delay between write and verify.
          required: false
          default: 0
          type: integer
        input_type:
          description: Type of address (holding/coil/discrete/input).
          required: false
          default: write_type
          type: integer
        state_on:
          description: Value when the light is on.
          required: false
          default: same as command_on
          type: integer
        state_off:
          description: Value when the light is off.
          required: false
          default: same as command_off
          type: integer
{% endconfiguration %}

### Configuring platform sensor

The `modbus` sensor allows you to gather data from [Modbus](http://www.modbus.org/) registers.

To use your Modbus sensors in your installation, add the following to your `configuration.yaml` file, in addition to the [common parameters](#configuring- platform-common-parameters):

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

To use your Modbus switches in your installation, add the following to your `configuration.yaml` file, in addition to the [common parameters](#configuring- platform-common-parameters):

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
      description: type of address (holding/coil)
      required: false
      default: holding
      type: string
    verify:
      description: Read from modbus device to verify switch. If used without attributes it uses the toggle register configuration. If omitted no verification is done, but the state of the switch is set with each toggle.
      required: false
      type: map
      keys:
        address:
          description: Address to read from.
          required: false
          default: write address
          type: integer
        delay:
          description: delay between write and verify.
          required: false
          default: 0
          type: integer
        input_type:
          description: type of address (holding/coil/discrete/input)
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
