---
title: Modbus
description: Instructions on how to integrate modbus and platforms.
ha_category:
  - Hub
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_domain: modbus
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - fan
  - light
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

[modbus](http://www.modbus.org/) is a communication protocol to control PLCs (Programmable Logic Controller) and RTUs (Remote Terminal Unit).

The integration adheres strictly to the [protocol specification](https://www.modbus.org/docs/Modbus_Application_Protocol_V1_1b3.pdf) using [pymodbus](https://github.com/pymodbus-dev/pymodbus) for the protocol implementation.

The modbus {% term integration %} supports all devices adhering to the modbus standard. The communication to the device/devices can be serial (rs-485), TCP, or UDP connections. The modbus integration allows multiple communication channels e.g. a serial port connection combined with one or more TCP connections.

# Configuring modbus communication

Configure the modbus communication with modbus devices. This is a general setup needed establish access to the device.

The modbus integration allows you to use multiple connections each with multiple sensors etc.

The modbus integration provides a number of parameters to help communicate with "difficult" devices, these parameters are independent of the type of communication.

To enable this integration, add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

{% configuration %}
delay:
  description: "Time to delay sending messages in seconds after connecting.
  Some modbus devices need a delay of typically 1-2 seconds after connection is established to prepare the communication.
  If a device does not respond to messages after connecting, then try this parameter.
  **Remark:** solely affect the first message."
  required: false
  default: 0
  type: integer
message_wait_milliseconds:
  description: "Time to wait in milliseconds between requests."
  required: false
  default: 30 for serial connection, 0 for all other connections.
  type: integer
name:
  description: "Name of this hub. Must be unique."
  required: true
  type: string
timeout:
  description: "Timeout while waiting for a response in seconds."
  required: false
  default: 5
  type: integer
type:
  description: "Type of modbus."
  required: true
  type: list
  keys:
    tcp:
      description: "TCP/IP connection with socket framer, used with Ethernet enabled devices."
    udp:
      description: "UDP connection with socket framer, rarely used."
    rtuovertcp:
      description: "TCP/IP connection with rtu framer, used when connection to modbus forwarders."
    serial:
      description: "Serial connection with RTU framer, used with TTY port or USB rs485 converter."

{% endconfiguration %}

## Configuring tcp connection

`type: tcp` is required. Used for devices providing a TCP/IP interface directly.

{% configuration %}
host:
  description: "IP address or name of your modbus device, e.g., `192.168.1.1`."
  required: true
  type: string
port:
  description: "Network port for the communication."
  required: true
  type: integer

{% endconfiguration %}

### Example: typical tcp configuration

```yaml
# Example yaml: typical tcp connection
modbus:
  - name: modbus_hub
    type: tcp
    host: IP_ADDRESS
    port: 502
```

### Example: full tcp configuration

```yaml
# Example yaml: full tcp connection
modbus:
  - name: modbus_hub
    type: tcp
    host: IP_ADDRESS
    port: 502

    delay: 0
    message_wait_milliseconds: 30
    timeout: 5
```

## Configuring a TCP-RTU connection

`type: rtuovertcp` is required. Used for devices providing a TCP/IP interface directly.

This is typically used, when communicating with a modbus-forwarder, a device that
has a TCP/IP connection upwards, and one or more serial connections downwards. lets also
write more here, to see if the error moves.

{% configuration %}
host:
  description: "IP address or name of your modbus device, e.g., `192.168.1.1`."
  required: true
  type: string
port:
  description: "Network port for the communication."
  required: true
  type: integer

{% endconfiguration %}

### Example: typical TCP-RTU configuration

```yaml
# Example yaml: typical tcp-rtu connection
modbus:
  - name: modbus_hub
    type: rtuovertcp
    host: IP_ADDRESS
    port: 502
```

### Example: full TCP-RTU configuration

```yaml
# Example yaml: full tcp-rtu connection
modbus:
  - name: modbus_hub
    type: rtuovertcp
    host: IP_ADDRESS
    port: 502

    delay: 0
    message_wait_milliseconds: 30
    timeout: 5
```

## Configuring a UDP connection

`type: udp` is required. This is rarely used, and only for very special configurations.

{% configuration %}
host:
  description: "IP address or name of your modbus device, e.g., `192.168.1.1`."
  required: true
  type: string
port:
  description: "Network port for the communication."
  required: true
  type: integer

{% endconfiguration %}

### Example: typical udp configuration

```yaml
# Example yaml: typical udp connection
modbus:
  - name: modbus_hub
    type: udp
    host: IP_ADDRESS
    port: 502
```

### Example: full UDP configuration

```yaml
# Example yaml: full udp connection
modbus:
  - name: modbus_hub
    type: udp
    host: IP_ADDRESS
    port: 502

    delay: 0
    message_wait_milliseconds: 30
    timeout: 5
```

## Configuring serial connection

`type: serial` is required. This is used for devices providing a serial rs485 interface.

The physical interface is typically a USB serial-rs485 converter or an rs232-rs485 connected to a serial port.

{% configuration %}
baudrate:
  description: "Speed of the serial connection, higher speed gives better performance."
  required: true
  type: integer
bytesize:
  description: "Data size in bits of each byte."
  required: true
  type: list
  keys:
    "5":
      description: "5 bit for data, rarely used."
    "6":
      description: "6 bit for data, rarely used."
    "7":
      description: "7 bit for data, used for very old devices."
    "8":
      description: "8 bit for data, standard."
method:
  description: "Method of the connection to modbus."
  required: true
  type: list
  keys:
    rtu:
      description: "Binary data transmission preceded by slave id and followed by a crc, standard."
    ascii:
      description: "ASCII data transmission preceded by slave id and followed by a crc, used for few devices."
parity:
  description: "Parity of the data bytes."
  required: true
  type: list
  keys:
    E:
      description: "Even parity bit."
    O:
      description: "Odd parity bit."
    N:
      description: "No parity bit, standard."
port:
  description: "Serial port or USB device where your modbus device is connected to your Home Assistant host."
  required: true
  type: string
stopbits:
  description: "Stopbits of the data bytes."
  required: true
  type: list
  keys:
    '1':
      description: "1 stop bit."
    '2':
      description: "2 stop bits, standard."

{% endconfiguration %}

### Example: typical serial configuration

```yaml
# Example yaml:  typical serial connection
modbus:
  - name: modbus_hub
    type: serial
    port: /dev/ttyUSB0
    baudrate: 9600
    bytesize: 8
    method: rtu
    parity: E
    stopbits: 1
```

### Example: full serial configuration

```yaml
# Example yaml: full udp connection
modbus:
  - name: modbus_hub
    type: serial
    port: /dev/ttyUSB0
    baudrate: 9600
    bytesize: 8
    method: rtu
    parity: E
    stopbits: 1

    delay: 0
    message_wait_milliseconds: 30
    timeout: 5
```


## Configuring multiple connections

Multiple connections can freely mix different communications:

```yaml
# Example yaml: multiple tcp connections
modbus:
  - name: modbus_hub
    type: tcp
    host: IP_ADDRESS_1
    port: 2020

  - name: modbus_hub2
    type: tcp
    host: IP_ADDRESS_2
    port: 502
```


```yaml
# Example yaml: tcp connection and serial connection
modbus:
  - name: modbus_hub
    type: tcp
    host: IP_ADDRESS_1
    port: 2020

  - name: modbus_hub2
    type: serial
    port: /dev/ttyUSB0
    baudrate: 9600
    bytesize: 8
    method: rtu
    parity: E
    stopbits: 1
```

# Configuring modbus entities

modbus entities are grouped below each modbus communication entry.

**REMARK** Each modbus device must have at least 1 entity defined, otherwise the integration will not be loaded.

Please refer to [Parameter usage](#parameters-usage-matrix) for conflicting parameters.

All modbus entities have the following parameters:

{% configuration %}
address:
  description: "Address of coil/register. Note that this can also be specified in Hex. For example: `0x789A`"
  required: true
  type: integer
name:
  description: "Name of the entity which must be unique within the entity type."
  required: true
  type: string
scan_interval:
  description: "Update interval in seconds.
  scan_interval = 0 for no polling.
  Entities are read shortly after startup and then according to scan_interval.
  Remark, when restarting HA the last known value is restored."
  required: false
  type: integer
  default: 15
slave:
  description: "Identical to `device_address`"
  required: false
  type: integer
  default: 1
device_address:
  description: "Id of the device. Used to address multiple devices on a rs485 bus or devices connected to a modbus repeater. 0 is the broadcast id. "
  required: false
  type: integer
  default: 1
unique_id:
  description: "ID that uniquely identifies this entity.
  Slaves will be given a unique_id of <<unique_id>>_<<slave_index>>.
  If two enities have the same unique ID, Home Assistant will raise an exception."
  required: false
  type: string

{% endconfiguration %}

## Example: entities grouping

```yaml
# Example yaml: entities grouping
modbus:
  - type: tcp
    host: IP_ADDRESS_1
    port: 2020
    name: "modbus_hub"
    binary_sensors:
      - name: binary_sensor1
        address: 100
    climates:
      - name: "Watlow F4T"
        address: 200
    covers:
      - name: Door1
        address: 300
    fans:
      - name: Fan1
        address: 400
    lights:
      - name: light1
        address: 500
    sensors:
      - name: sensor1
        address: 600
    switches:
      - name: Switch1
        address: 700
```

The different types of entities are detailed in the following.

## Configuring binary sensor entities

The Modbus binary sensor allows you to gather data from coils which as per standard have state ON/OFF.

Normally, a register contains 16 coils, giving different addresses depending on the request used.

```yaml
Register 512: Coil 1 - 16
Register 513: Coil 17 - 32
```

`input_type: coils` would use addresses from 1 through 32, while `input_type: input` would use addresses 512 and 513.
For that reason, many devices (especially older ones) do not share the coil address space with the register address space,
and this `input` would read from a different address space than `coil`. The problem is present in devices with
shared address space and are a frequent cause of problems when configuring entities.

Please refer to [Parameter usage](#parameters-usage-matrix) for conflicting parameters.

{% configuration %}
binary_sensors:
  description: "A list of all binary sensors configured for this connection."
  required: false
  type: map
  keys:
    device_class:
      description: "The [type/class](/integrations/binary_sensor/#device-class) to be used for the UI."
      required: false
      type: string
    input_type:
      description: "Type of request `discrete_input`, `coil`, `holding` or `input`"
      required: false
      default: coil
      type: string
    slave_count:
      description: "Identical to `virtual_count`."
      required: false
      type: integer
    virtual_count:
      description: "Generate count+1 binary sensors (master + slaves).
      Addresses are automatically incremented.
      The parameter simplifies configuration and provides a much better performance by not using count+1 requests but a single request."
      required: false
      type: integer
    unique_id:
      description: "ID that uniquely identifies the entity. Slaves will automatically be given a unique_id of <<unique_id>>_<<slave_index>>.  If two sensors have the same unique ID, Home Assistant will raise an exception."
      required: false
      type: string

{% endconfiguration %}

### Example: typical binary sensor configuration

```yaml
# Example yaml: typical binary_sensor
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    binary_sensors:
      - name: my_relay
        address: 100
        slave: 1
```

### Example: full binary sensor configuration

```yaml
# Example yaml: binary_sensor with all options
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    binary_sensors:
      - name: my_relay
        address: 100
        device_class: door
        input_type: coil
        scan_interval: 15
        slave: 1
        slave_count: 0
        unique_id: my_relay
```

### Example: multiple identical binary sensor configuration

```yaml
# Example of 10 identical binary_sensor
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    binary_sensors:
      - name: my_relay
        address: 100
        slave: 1
        slave_count: 10
        unique_id: my_relay
```

This configuration will poll coil addresses 100 to 110 every 15 seconds and update the binary_sensors: `my_relay`
and `my_relay_1` to `my_relay_10`.

The master configuration like device_class are automatically copied to the slaves.

## Configuring climate entities

The Modbus climate platform allows you to monitor a thermostat or heaters as well as set a target temperature, HVAC mode, swing mode, and fan state.

Please refer to [Parameter usage](#parameters-usage-matrix) for conflicting parameters.

{% configuration %}
climates:
  description: "A list of all climate entities in this modbus instance."
  required: false
  type: map
  keys:
    temperature_unit:
      description: "Temperature unit: C or F."
      required: false
      default: C
      type: list
      keys:
        C:
          description: "Celsius"
        F:
          description: "Fahrenheit"
    precision:
      description: "Number of valid decimals for temperature."
      required: false
      type: integer
      default: 0
    temp_step:
      description: "Step size target temperature."
      required: false
      type: float
      default: 0.5
    max_temp:
      description: "Maximum setpoint for target temperature."
      required: false
      type: integer
      default: 35
    min_temp:
      description: "Minimum setpoint for target temperature."
      required: false
      type: integer
      default: 5
    count:
      description: "Number of registers to read to fetch the current temperature.
      **only valid for `data_type: custom` and `data_type: string`**, for other data types count is automatically calculated."
      required: false
      type: integer
    data_type:
      description: "Response representation when reading the current temperature register(s)."
      required: false
      default: int16
      type: list
      keys:
        custom:
          description: "user defined format, `structure:` and `count:` must be configured."
        float16:
          description: "16 bit signed float (1 register holds 1 value)."
        float32:
          description: "32 bit signed float (2 registers holds 1 value)."
        float64:
          description: "64 bit signed float (4 register holds 1 value)."
        int:
          description: "**DEPRECATED** is silently converted to `int16`"
        int16:
          description: "16 bit signed integer (1 register holds 1 value)."
        int32:
          description: "32 bit signed integer (2 registers holds 1 value)."
        int64:
          description: "64 bit signed integer (4 registers holds 1 value)."
        string:
          description: "set of 8 bit characters, `count:` must be configured."
        uint:
          description: "**DEPRECATED** is silently converted to `uint16`"
        uint16:
          description: "16 bit unsigned integer (1 register holds 1 value)."
        uint32:
          description: "32 bit unsigned integer (2 registers holds 1 value)."
        uint64:
          description: "64 bit unsigned integer (4 registers holds 1 value)."
    input_type:
      description: Modbus register type for current temperature.
      required: false
      default: holding
      type: list
      keys:
        holding:
          description: "Holding register."
        input:
          description: "Input register."
    offset:
      description: "Final offset for current temperature (output = scale * value + offset)."
      required: false
      type: float
      default: 0
    target_temp_register:
      description: "Register address for target temperature (Setpoint). Using a list, it is possible to define one register for each of the available HVAC Modes. The list has to have a fixed size of 7 registers corresponding to the 7 available HVAC Modes, as follows: Register **1: HVAC AUTO mode**; Register **2: HVAC Cool mode**; Register **3: HVAC Dry mode**; Register **4: HVAC Fan only mode**; Register **5: HVAC Heat mode**; Register **6: HVAC Heat Cool mode**; Register **7: HVAC OFF mode**. It is possible to set duplicated values for the modes where the devices don't have a related register."
      required: true
      type: [integer, list]
    target_temp_write_registers:
      description: "If `true` use `write_registers` for target temperature (`target_temp_register`), else use `write_register`."
      required: false
      type: boolean
      default: false
    scale:
      description: "Scale factor (output = scale * value + offset) for setting target temperature."
      required: false
      type: float
      default: 1
    structure:
      description: "If `data_type: custom` is specified a double-quoted Python struct is expected,
      to format the string to unpack the value. See Python documentation for details.
      Example: `>i`."
      required: false
      type: string
      default: ">f"
    swap:
      description: "Swap the order of bytes/words, **not valid with `custom` and `datatype: string`** when setting target temperature"
      required: false
      default: none
      type: list
      keys:
        byte:
          description: "Swap bytes AB -> BA."
        word:
          description: "Swap word ABCD -> CDAB, **not valid with data types: `int16`, `uint16`**"
        word_byte:
          description: "Swap word ABCD -> DCBA, **not valid with data types: `int16`, `uint16`**"
    hvac_mode_register:
      description: "Configuration of register for HVAC mode"
      required: false
      type: map
      keys:
        address:
          description: "Address of HVAC mode register."
          required: true
          type: integer
        write_registers:
          description: "Request type for setting HVAC mode, use `write_registers` if true else `write_register`.
            If more than one value is specified for a specific mode, only the first one is used for writing to the register."
          required: false
          type: boolean
          default: false
        values:
          description: "Mapping between the register values and HVAC modes"
          required: true
          type: map
          keys:
            state_off:
              description: "Value corresponding to HVAC Off mode.
                If the On/Off state handled on a different address and/or register the `state_off` state should be omitted from your configuration"
              required: false
              type: [integer, list]
            state_heat:
              description: "Value corresponding to HVAC Heat mode."
              required: false
              type: [integer, list]
            state_cool:
              description: "Value corresponding to HVAC Cool mode."
              required: false
              type: [integer, list]
            state_auto:
              description: "Value corresponding to HVAC Auto mode."
              required: false
              type: [integer, list]
            state_dry:
              description: "Value corresponding to HVAC Dry mode."
              required: false
              type: [integer, list]
            state_fan_only:
              description: "Value corresponding to HVAC Fan only mode."
              required: false
              type: [integer, list]
            state_heat_cool:
              description: "Value corresponding to HVAC Heat/Cool mode."
              required: false
              type: [integer, list]
    fan_mode_register:
      description: "Configuration of register for Fan mode"
      required: false
      type: map
      keys:
        address:
          description: "Address of Fan mode register. (int to call write_register, list of 1 int to call write_registers)"
          required: true
          type: [integer, list]
        values:
          description: "Mapping between the register values and Fan modes
            This is typically used to control one of: Speed, Direction or On/Off state."
          required: true
          type: map
          keys:
            state_fan_on:
              description: "Value corresponding to Fan On mode."
              required: false
              type: integer
            state_fan_off:
              description: "Value corresponding to Fan Off mode."
              required: false
              type: integer
            state_fan_low:
              description: "Value corresponding to Fan Low mode."
              required: false
              type: integer
            state_fan_medium:
              description: "Value corresponding to Fan Medium mode."
              required: false
              type: integer
            state_fan_high:
              description: "Value corresponding to Fan High mode."
              required: false
              type: integer
            state_fan_auto:
              description: "Value corresponding to Fan Auto mode."
              required: false
              type: integer
            state_fan_top:
              description: "Value corresponding to Fan Top mode."
              required: false
              type: integer
            state_fan_middle:
              description: "Value corresponding to Fan Middle mode."
              required: false
              type: integer
            state_fan_focus:
              description: "Value corresponding to Fan Focus mode."
              required: false
              type: integer
            state_fan_diffuse:
              description: "Value corresponding to Fan Diffuse mode."
              required: false
              type: integer
    hvac_onoff_coil:
      description: "Address of On/Off state.
        Only use this setting if your On/Off state is not handled as a HVAC mode.
        When zero is read from this coil, the HVAC state is set to Off, otherwise the `hvac_mode_register`
        dictates the state of the HVAC. If no such coil is defined, it defaults to Auto.
        When the HVAC mode is set to Off, the value 0 is written to the coil, otherwise the
        value 1 is written.
        **Cannot be used with `hvac_onoff_register`.**"
      required: false
      type: integer
    hvac_onoff_register:
      description: "Address of On/Off state.
        When the value defined by `hvac_off_value` is read from this register, the HVAC
        state is set to Off. Otherwise, the `hvac_mode_register` dictates the state
        of the HVAC. If no such register is defined, it defaults to Auto.
        When the HVAC mode is set to Off, the value defined by `hvac_off_value` is written to
        the register, otherwise the value defined by `hvac_on_value` is written.
        **Cannot be used with `hvac_onoff_coil`.**"
      required: false
      type: integer
    hvac_on_value:
      description: "The value that will be written to the `hvac_onoff_register` to turn the HVAC system on.
        If not specified, the default value is 1."
      required: false
      type: integer
    hvac_off_value:
      description: "The value that will be written to the `hvac_onoff_register` to turn the HVAC system off.
        If not specified, the default value is 0."
      required: false
      type: integer
    swing_mode_register:
      description: "Configuration of the register for swing mode"
      required: false
      type: map
      keys:
        address:
          description: "Address of swing mode register. (int to call write_register, list of 1 int to call write_registers). - Reading done through holding register"
          required: true
          type: [integer, list]
        values:
          description: "Mapping between the register values and swing modes"
          required: true
          type: map
          keys:
            swing_mode_state_on:
              description: "Value corresponding to swing mode on."
              required: false
              type: integer
            swing_mode_state_off:
              description: "Value corresponding to swing mode off."
              required: false
              type: integer
            swing_mode_state_horizontal:
              description: "Value corresponding to swing mode horizontal."
              required: false
              type: integer
            swing_mode_state_vertical:
              description: "Value corresponding to swing mode vertical."
              required: false
              type: integer
            swing_mode_state_both:
              description: "Value corresponding to Swing mode both."
              required: false
              type: integer
    hvac_onoff_register:
      description: "Address of On/Off state.
        Only use this setting if your On/Off state is not handled as a HVAC mode.
        When zero is read from this register, the HVAC state is set to Off, otherwise the `hvac_mode_register`
        dictates the state of the HVAC. If no such register is defined, it defaults to Auto.
        When the HVAC mode is set to Off, the value 0 is written to the register, otherwise the
        value 1 is written."
      required: false
      type: integer
    write_registers:
      description: "If `true` use `write_registers` to control the On/Off state (`hvac_onoff_register`), else use `write_register`.
      Note that it is not yet possible to control the On/Off state via a coil."
      required: false
      type: boolean
      default: false

{% endconfiguration %}

### Example: climate configuration

```yaml
# Example configuration.yaml entry
modbus:
  - name: hub1
    type: tcp
    host: IP_ADDRESS
    port: 502
    climates:
      - name: "Watlow F4T"
        address: 0x6BC2
        input_type: holding
        count: 1
        data_type: custom
        max_temp: 35
        min_temp: 15
        offset: 0
        precision: 1
        scale: 0.1
        max_temp: 30
        structure: ">f"
        target_temp_register: 2782
        target_temp_write_registers: true
        temp_step: 1
        temperature_unit: C
```

## Configuring cover entities

The `modbus` cover platform allows you to control covers (such as blinds, a roller shutter, or a garage door).

At the moment, platform cover support the opening and closing of a cover. You can control your covers either using coils or holding registers.

Cover that uses `input_type: coil` is not able to determine intermediary states such as opening and closing. Coil stores only two states — "0" means cover closed, and "1" implies cover open. To allow detecting intermediary states, there is an optional `status_register` attribute. It will enable you to write your command (e.g., to open a cover) into a coil, and read current cover status back through the register. Additionally, you can specify values for `state_open`, `state_opening`, `state_closed`, and `state_closing` attributes. These will be matched with the value read from the `status_register`.

If your cover uses `input_type: holding` (default) to send commands, it can also read the intermediary states. To adjust which value represents what state, you can fine-tune the optional state attributes, like `state_open`. These optional state values are also used for specifying values written into the register. If you specify an optional status_register attribute, cover states will be read from status_register instead of the register used for sending commands.

Please refer to [Parameter usage](#parameters-usage-matrix) for conflicting parameters.

{% configuration %}
covers:
  description: "A list of all cover entities configured for this connection."
  required: true
  type: map
  keys:
    device_class:
      description: "The [type/class](/integrations/cover/#device-class) of the cover to set the icon in the frontend."
      required: false
      type: device_class
      default: None
    input_type:
      description: "Cover register type."
      default: holding
      required: false
      type: list
      keys:
        holding:
          description: "Holding register."
        input:
          description: "Input register."
    state_open:
      description: "A value in `status_register` or `register` representing an open cover.
        If your configuration uses the `register` attribute, this value will be written into the holding register to open the cover."
      required: false
      default: 1
      type: integer
    state_closed:
      description: "A value in `status_register` or `register` representing a closed cover.
        If your configuration uses the `register` attribute, this value will be written into the holding register to close the cover."
      required: false
      default: 0
      type: integer
    state_opening:
      description: "A value in `status_register` or `register` representing an opening cover.
        Note that this state should be also supported on your connected Modbus cover.
        If it won't report the state, this state won't be detected."
      required: false
      default: 2
      type: integer
    state_closing:
      description: "A value in `status_register` or `register` representing a closing cover.
        Note that this state should be also supported on your connected Modbus cover.
        If it will not report the state, this state won't be detected."
      required: false
      default: 3
      type: integer
    status_register:
      description: "Address of register, from which all the cover states will be read.
        If you specified `register` attribute, and not `status_register` attribute,
        your main register will also be used as a status register."
      required: false
      type: integer
    status_register_type:
      description: Cover status register type (holding, input), default holding.
      required: false
      type: list
      keys:
        holding:
          description: "Holding register."
        input:
          description: "Input register."
{% endconfiguration %}

### Example: Modbus cover

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
        state_open: 1
        state_opening: 2
        state_closed: 0
        state_closing: 3
        status_register: 119
        status_register_type: holding
      - name: "Door2"
        address: 118
```


### Example: Modbus cover controlled by a coil

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

### Example: Modbus cover controlled by a coil, its state is read from the register

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

### Example: Modbus cover controlled by a holding register

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

### Example: Modbus cover controlled by a holding register, its state is read from the status register

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

## Configuring fan entities

The `modbus` fan platform allows you to control [Modbus](http://www.modbus.org/) coils or registers.

Please refer to [Parameter usage](#parameters-usage-matrix) for conflicting parameters.

{% configuration %}
fans:
  description: "A list of all fan entities in this modbus instance."
  required: true
  type: map
  keys:
    command_on:
      description: "Value to write to turn on the fan."
      required: false
      default: 0x01
      type: integer
    command_off:
      description: "Value to write to turn off the fan."
      required: false
      default: 0x00
      type: integer
    write_type:
      description: Type of write request.
      required: false
      default: holding
      type: list
      keys:
        holding:
          description: "write_register is called."
        holdings:
          description: "write_registers is called."
        coil:
          description: "write_coil is called."
        coils:
          description: "write_coils is called."
    verify:
      description: "Read from Modbus device to verify fan.
        If used without attributes, it uses the toggle register configuration.
        If omitted, no verification is done, but the state of the fan is set with each toggle."
      required: false
      type: map
      keys:
        address:
          description: "Address to read from."
          required: false
          default: write address
          type: integer
        delay:
          description: "Delay between write and verify."
          required: false
          default: 0
          type: integer
        input_type:
          description: Type of address.
          required: false
          default: same as `write_type`
          type: list
          keys:
            coil:
              description: "Coil (1bit relay)."
            discrete:
              description: "Discret input (1bit relay)."
            holding:
              description: "Holding register."
            input:
              description: "Input register."
        state_on:
          description: "Value when the fan is on."
          required: false
          default: same as `command_on`
          type: integer
        state_off:
          description: "Value when the fan is off."
          required: false
          default: same as `command_off`
          type: integer
{% endconfiguration %}

### Example: fan configuration

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

## Configuring light entities

The `modbus` light platform allows you to control [Modbus](http://www.modbus.org/) coils or registers.

Please refer to [Parameter usage](#parameters-usage-matrix) for conflicting parameters.

{% configuration %}
lights:
  description: "A list of all light entities in this modbus instance."
  required: true
  type: map
  keys:
    command_on:
      description: "Value to write to turn on the light."
      required: false
      default: 0x01
      type: integer
    command_off:
      description: "Value to write to turn off the light."
      required: false
      default: 0x00
      type: integer
    write_type:
      description: "Type of write request."
      required: false
      default: holding
      type: list
      keys:
        holding:
          description: "write_register is called."
        holdings:
          description: "write_registers is called."
        coil:
          description: "write_coil is called."
        coils:
          description: "write_coils is called."
    verify:
      description: "Read from Modbus device to verify the light.
        If used without attributes, it uses the toggle register configuration.
        If omitted no verification, is done, but the state of the light is set with each toggle."
      required: false
      type: map
      keys:
        address:
          description: "Address to read from."
          required: false
          default: "Same as `address`"
          type: integer
        delay:
          description: delay between write and verify.
          required: false
          default: 0
          type: integer
        input_type:
          description: Type of address (holding/coil/discrete/input).
          required: false
          default: "Same as `write_type`"
          type: list
          keys:
            coil:
              description: "Coil (1bit relay)."
            discrete:
              description: "Discrete inout (1bit relay)."
            holding:
              description: "Holding register."
            input:
              description: "Input register."
        state_on:
          description: "Value when the light is on."
          required: false
          default: "Same as `command_on`"
          type: integer
        state_off:
          description: "Value when the light is off."
          required: false
          default: "Same as `command_off`"
          type: integer

{% endconfiguration %}

### Example: light configuration

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

## Configuring sensor entities

The `modbus` sensor allows you to gather data from [Modbus](http://www.modbus.org/) registers.

Please refer to [Parameter usage](#parameters-usage-matrix) for conflicting parameters.

{% configuration %}
sensors:
  description: "A list of all sensors in this modbus instance."
  required: true
  type: map
  keys:
    count:
      description: "Number of registers to read.
      **only valid for `data_type: custom` and `data_type: string`**, for other data types count is automatically calculated."
      required: false
      type: integer
    data_type:
      description: "Response representation."
      required: false
      default: int16
      type: list
      keys:
        custom:
          description: "user defined format, `structure:` and `count:` must be configured."
        float16:
          description: "16 bit signed float (1 register holds 1 value)."
        float32:
          description: "32 bit signed float (2 registers holds 1 value)."
        float64:
          description: "64 bit signed float (4 register holds 1 value)."
        int:
          description: "**DEPRECATED** is silently converted to `int16`"
        int16:
          description: "16 bit signed integer (1 register holds 1 value)."
        int32:
          description: "32 bit signed integer (2 registers holds 1 value)."
        int64:
          description: "64 bit signed integer (4 registers holds 1 value)."
        string:
          description: "set of 8 bit characters, `count:` must be configured."
        uint:
          description: "**DEPRECATED** is silently converted to `uint16`"
        uint16:
          description: "16 bit unsigned integer (1 register holds 1 value)."
        uint32:
          description: "32 bit unsigned integer (2 registers holds 1 value)."
        uint64:
          description: "64 bit unsigned integer (4 registers holds 1 value)."
    device_class:
      description: "The [type/class](/integrations/sensor/#device-class) of the sensor to set the icon in the frontend."
      required: false
      type: device_class
      default: None
    input_type:
      description: "Modbus register type for sensor."
      required: false
      default: holding
      type: list
      keys:
        holding:
          description: "Holding register."
        input:
          description: "Input register."
    min_value:
      description: "The minimum allowed value of a sensor. If value < min_value --> min_value. Can be float or integer"
      required: false
      type: float
    max_value:
      description: "The maximum allowed value of a sensor. If value > max_value --> max_value. Can be float or integer"
      required: false
      type: float
    nan_value:
      description: If a Modbus sensor has a defined NaN value, this value can be set as a hex string starting with `0x` containing one or more bytes (for example, `0xFFFF` or `0x80000000`) or provided as an integer directly. If triggered, the sensor becomes `unavailable`. Please note that the hex to int conversion for `nan_value` does currently not obey home-assistants Modbus encoding using the `data_type`, `structure`, or `swap` arguments.
      required: false
      type: string
    zero_suppress:
      description: Suppress values close to zero. If -zero_suppress <= value <= +zero_suppress --> 0. Can be float or integer
      required: false
      type: float
    offset:
      description: "Final offset (output = scale * value + offset)."
      required: false
      type: float
      default: 0
    precision:
      description: "Number of valid decimals."
      required: false
      type: integer
      default: 0
    scale:
      description: "Scale factor (output = scale * value + offset)."
      required: false
      type: float
      default: 1
    slave_count:
      description: "Identical to `virtual_count`."
      required: false
      type: integer
    virtual_count:
      description: "Generates x+1 sensors (master + slaves), allowing read of multiple registers with a single read messsage."
      required: false
      type: integer
    state_class:
      description: "The [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes) of the sensor."
      required: false
      type: string
    structure:
      description: "If `data_type: custom` is specified a double-quoted Python struct is expected,
      to format the string to unpack the value. See Python documentation for details.
      Example: `>i`."
      required: false
      type: string
      default: ">f"
    slave_count:
      description: "Identical to `virtual_count`."
      required: false
      type: integer
    virtual_count:
      description: Generates x-1 slave sensors, allowing read of multiple registers with a single read message.
      required: false
      type: integer
    swap:
      description: "Swap the order of bytes/words, **not valid with `custom` and `datatype: string`**"
      required: false
      default: none
      type: list
      keys:
        byte:
          description: "Swap bytes AB -> BA."
        word:
          description: "Swap word ABCD -> CDAB, **not valid with data types: `int16`, `uint16`**"
        word_byte:
          description: "Swap word ABCD -> DCBA, **not valid with data types: `int16`, `uint16`**"
    unit_of_measurement:
      description: "Unit to attach to value."
      required: false
      type: string
    zero_suppress:
      description: "Suppress values close to zero. If -zero_suppress <= value <= +zero_suppress --> 0. Can be float or integer"
      required: false
      type: float
    unique_id:
      description: ID that uniquely identifies the entity. If two sensors have the same unique ID, Home Assistant will raise an exception.
      required: false
      type: string
{% endconfiguration %}

{% note %}
If you specify scale or offset as floating point values, double precision floating point arithmetic will be used to calculate final value. This can cause loss of precision for values that are larger than 2^53.
{% endnote %}

### Example: sensor configuration

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


### Example: sensor full configuration

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
        address: 0x9A
        input_type: holding
        unit_of_measurement: °C
        state_class: measurement
        count: 1
        scale: 0.1
        offset: 0
        precision: 1
        data_type: integer
```

## Configuring switch entities

The `modbus` switch platform allows you to control [Modbus](http://www.modbus.org/) coils or registers.

Please refer to [Parameter usage](#parameters-usage-matrix) for conflicting parameters.

{% configuration %}
switches:
  description: "A list of all switches in this modbus instance."
  required: true
  type: map
  keys:
    command_on:
      description: "Value to write to turn on the switch."
      required: false
      default: 0x01
      type: integer
    command_off:
      description: "Value to write to turn off the switch."
      required: false
      default: 0x00
      type: integer
    write_type:
      description: Type of write request.
      required: false
      default: holding
      type: list
      keys:
        holding:
          description: "write_register is called."
        holdings:
          description: "write_registers is called."
        coil:
          description: "write_coil is called."
        coils:
          description: "write_coils is called."
    verify:
      description: "Read from Modbus device to verify switch.
        If used without attributes, it uses the toggle register configuration.
        If omitted, no verification is done, but the state of the switch is set with each toggle."
      required: false
      type: map
      keys:
        address:
          description: "Address to read from."
          required: false
          default: "Same as `write address`"
          type: integer
        delay:
          description: "Delay between write and verify."
          required: false
          default: 0
          type: integer
        input_type:
          description: Type of address.
          required: false
          default: same as `write_type`
          type: list
          keys:
            coil:
              description: "Coil (1bit relay)."
            discrete:
              description: "Discret input (1bit relay)."
            holding:
              description: "Holding register."
            input:
              description: "Input register."
        state_on:
          description: "Value(s) when switch is on. The value must be an `integer` or a list of integers."
          required: false
          default: "Same as `command_on`"
          type: [integer, list]
        state_off:
          description: "Value(s) when switch is off.  The value must be an `integer` or a list of integers."
          required: false
          default: "Same as `command_off`"
          type: [integer, list]

{% endconfiguration %}

### Example: switch configuration

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


### Example: switch full configuration

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

## Parameters usage matrix

Some parameters exclude other parameters, the following tables show what can be combined:

| Datatype:       | custom | string | *16 | *32 | *64 |
| --------------- | ------ | ------ | --- | --- | --- |
| count           | Yes    | Yes    | No  | No  | No  |
| structure       | Yes    | No     | No  | No  | No  |
| slave_count     | No     | No     | Yes | Yes | Yes |
| virtual_count   | No     | No     | Yes | Yes | Yes |
| swap: byte      | No     | No     | Yes | Yes | Yes |
| swap: word      | No     | No     | No  | Yes | Yes |
| swap: word_byte | No     | No     | No  | Yes | Yes |


# Actions

The modbus integration provides two generic write actions in addition to the platform-specific actions.

| Action                | Description                 |
| --------------------- | --------------------------- |
| modbus.write_register | Write register or registers |
| modbus.write_coil     | Write coil or coils         |

Description:

| Attribute | Description                                                                                                                                                                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hub       | Hub name (defaults to 'modbus_hub' when omitted)                                                                                                                                                                                                                                            |
| slave     | Slave address (0-255)                                                                                                                                                                                                                                                                       |
| address   | Address of the Register (e.g. 138)                                                                                                                                                                                                                                                          |
| value     | (write_register) A single value or an array of 16-bit values. Single value will call modbus function code 0x06. Array will call modbus function code 0x10. Values might need reverse ordering. E.g., to set 0x0004 you might need to set `[4,0]`, this depend on the byte order of your CPU |
| state     | (write_coil) A single boolean or an array of booleans. Single boolean will call modbus function code 0x05. Array will call modbus function code 0x0F                                                                                                                                        |

## Example: writing a float32 type register

To write a float32 datatype register use network format like `10.0` == `0x41200000` (network order float hexadecimal).

```yaml
action: modbus.write_register
data:
  address: <target register address>
  slave: <target slave address>
  hub: <hub name>
  value: [0x4120, 0x0000]
```

## Action `modbus.set-temperature`

| Action          | Description                                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| set_temperature | Set temperature. Requires `value` to be passed in, which is the desired target temperature. `value` should be in the same type as `data_type` |

## Action `modbus.set_hvac_mode`

| Action        | Description                                                                                                                                                                                                                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| set_hvac_mode | Set HVAC mode. Requires `value` to be passed in, which is the desired mode. `value` should be a valid HVAC mode. A mapping between the desired state and the value to be written to the HVAC mode register must exist. Performing this action will also set the On/Off register to an appropriate value, if such a register is defined. |


# Opening an issue

When opening an issue, please add your current configuration (or a scaled down version), with at least:

 - the modbus configuration lines
 - the entity (sensor, etc.) lines

In order for the developers better to identify the problem, please add the
following lines to {% term "`configuration.yaml`" %}:

```yaml
logger:
  default: warning
  logs:
    homeassistant.components.modbus: debug
    pymodbus: debug
```

and restart Home Assistant, reproduce the problem, and include the log in the issue.

# Building on top of modbus

The only recommended way is to inherit the entities needed.
