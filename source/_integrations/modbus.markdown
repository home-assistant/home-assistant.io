---
title: Modbus
description: Instructions on how to manually register Modbus entities and platforms.
ha_category:
  - Hub
  - Modbus
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

The **Modbus** {% term integration %} connects Home Assistant to devices that have a Modbus interface. Many integrations for these devices use the Modbus integration to connect, so you usually don't set it up yourself. To get started, refer to [Setting up Modbus control in Home Assistant](#setting-up-modbus-control-in-home-assistant).

[Modbus](https://www.modbus.org/) is a communication protocol for industrial devices, such as controllers in heating, ventilation, and solar systems.

## Supported devices

Home Assistant supports devices with a Modbus interface through integrations for those devices. To find these integrations, browse the [Modbus-controlled category](/integrations/#modbus-controlled).

If no integration supports your device, you can still get to its data by manually configuring the Modbus registers in YAML. For the steps, refer to [Setting up a Modbus hub in YAML](#setting-up-a-modbus-hub-in-yaml).

## Setting up Modbus control in Home Assistant

Some devices have a Modbus interface, such as solar inverters, heat pumps, and ventilation units. Home Assistant can read data from these devices and control them.

To set up your Modbus device, add the integration for your device. For the steps, refer to [Setting up a device integration that uses Modbus](#setting-up-a-device-integration-that-uses-modbus).

- To find out if an integration is available for your device, browse the [Modbus-controlled category](/integrations/#modbus-controlled).
- You can also search for the brand of your device when you add an integration in {% my integrations title="**Settings** > **Devices & services**" %}.

If no integration supports your device, you can configure its Modbus registers manually in YAML instead. For the steps, refer to [Setting up a Modbus hub in YAML](#setting-up-a-modbus-hub-in-yaml).

### Setting up a device integration that uses Modbus

Prerequisites:

- You have administrator rights.
- You have a device with a Modbus interface.
- Home Assistant can reach the Modbus interface of the device in one of these ways:
  - Over the network (Modbus TCP): the device, or a Modbus gateway that translates to Modbus TCP, is on your network.
  - Over a serial connection (Modbus RTU): the RS-485 wires of the device are connected to one of these:
    - A [USB-to-RS-485 adapter](/integrations/serial/#usb-to-serial-adapter) that is connected to your Home Assistant system.
    - An [ESPHome serial proxy](/integrations/serial/#setting-up-an-esphome-serial-proxy) with an RS-485 port.
    - A [serial device server](/integrations/serial/#serial-device-server) on your network.

1. If needed, turn on the Modbus interface of your device.
   - Many devices have Modbus TCP turned off by default. The documentation or the app of your device describes how to turn Modbus TCP on. Some integration pages describe the steps too, for example, [Fronius](/integrations/fronius/#modbus-tcp).
2. Add the integration for your device, such as [SolarEdge Modbus](/integrations/solaredge_modbus/) or [STIEBEL ELTRON](/integrations/stiebel_eltron/).
   - To add the integration, follow the steps in the integration documentation.
   - During setup, enter how Home Assistant reaches the device:
     - For a network connection, enter the host and the port. Use the port from the integration documentation. Many devices use `502`, but some use another port.
     - For a serial connection, select the [serial port](/integrations/serial/#serial-port), and enter the [baud rate](/integrations/serial/#baud-rate).
       - A serial proxy is listed with the serial ports.
       - For a serial device server, select **Enter manually** and enter its URL. With a `socket://` URL, the baud rate isn't passed on, so set it on the serial device server itself.
   - Some integrations also ask for the unit ID of the device. The unit ID identifies the device on the Modbus connection. Some integrations call it **Device ID**, and device manuals often call it slave ID. Most devices use `1`. Unless several devices share the connection, you can usually keep `1`. In YAML, it's `device_address`.
   - Result: The entities of your device appear in Home Assistant.
3. Optional: To check the connection, go to {% my config_modbus title="**Settings** > **Connectivity** > **Modbus**" %}.
   - For details, refer to [Viewing your Modbus connections](#viewing-your-modbus-connections).

### Setting up a Modbus hub in YAML

Use a Modbus hub in YAML only if no integration supports your device. You then configure the Modbus registers of your device yourself.

Prerequisites:

- You have administrator rights.
- You can edit your {% term "`configuration.yaml`" %} file.
- You have a device with a Modbus interface, and its Modbus documentation with the addresses of the values you want to use.
- Home Assistant can reach the Modbus interface of the device in one of these ways:
  - Over the network (Modbus TCP or Modbus UDP): the device, or a Modbus gateway that translates to Modbus TCP or UDP, is on your network.
  - Over a serial connection (Modbus RTU): the RS-485 wires of the device are connected to one of these, but not to an ESPHome serial proxy:
    - A [USB-to-RS-485 adapter](/integrations/serial/#usb-to-serial-adapter) that is connected to your Home Assistant system.
    - A [serial device server](/integrations/serial/#serial-device-server) on your network.

1. If needed, turn on the Modbus interface of your device.
2. In your {% term "`configuration.yaml`" %} file, add a Modbus hub for the connection to your device.
   - For the options, refer to [Configuring Modbus communication](#configuring-modbus-communication).
   - For a serial device server, use `type: rtuovertcp`. Set the baud rate on the serial device server itself. For details, refer to [Configuring a Modbus RTU over TCP connection](#configuring-a-modbus-rtu-over-tcp-connection).
3. Under the hub, add an entity for each value you want to read or control. Set `address` to where the device stores the value.
   - For the options, refer to [Configuring Modbus entities](#configuring-modbus-entities).
4. Restart Home Assistant.
   - Result: The entities of your device appear in Home Assistant.
5. Optional: To check the connection, go to {% my config_modbus title="**Settings** > **Connectivity** > **Modbus**" %}.
   - For details, refer to [Viewing your Modbus connections](#viewing-your-modbus-connections).

## Viewing your Modbus connections

You can see the connections to your Modbus devices in one place from the **Modbus** configuration panel. The panel lists the Modbus hubs that you configured in YAML, and the integrations that connect through the Modbus integration. For example, [SolarEdge Modbus](/integrations/solaredge_modbus/) and [STIEBEL ELTRON](/integrations/stiebel_eltron/) are listed. Integrations that manage their own Modbus connection, such as [Nibe Heat Pump](/integrations/nibe_heatpump/) and [NeoPool](/integrations/neopool/), don't appear in the panel.

Prerequisites:

- You have administrator rights.
- You have set up an integration that connects through the Modbus integration, or a Modbus hub in YAML. Otherwise, **Modbus** doesn't appear under **Connectivity**.

1. Go to {% my config_modbus title="**Settings** > **Connectivity** > **Modbus**" %}.
   - At the top, a summary shows how many units (Modbus devices) are on how many connections.
   - If no connection has been opened yet, the panel shows **No Modbus connections**.
   - To load the list again, select **Refresh** {% icon "mdi:refresh" %} in the top right corner.
2. Under **Connections**, you can see one item for each connection. A connection is the network address of a device or of a Modbus gateway, or a serial port, such as one with an RS-485 bus. A connection can reach several units, which are the Modbus devices behind it. The integrations in the panel that use the same address or port share one connection.
3. Still under **Connections**, for each connection item, you can see:
   - The network address, or the [device path](/integrations/serial/#device-path) of the serial port.
   - The type of connection: **TCP**, **UDP**, or **Serial**. A hub that you configured in YAML is also marked **Configured in YAML**. Such a hub keeps a connection of its own, so the same device can be listed twice.
   - Whether the connection is open right now:
     - A network connection shows **Connected** or **Not connected**. A serial port shows **Open** or **Closed**.
     - **Connected** or **Open**: The connection is open right now. For a serial port, **Open** only means that the port is open, not that the device answers.
     - **Not connected** or **Closed**: The connection is not open right now. The connection opens again the next time an integration reads from the device. A device can also close a connection that isn't used.
   - The integrations that use the connection, with the unit IDs they use. Select an integration to go to its settings. A hub that you configured in YAML is shown by its name instead, and can't be selected.
4. For a serial connection, to see the port in the **Serial** panel, select **View this port under Serial**.

## Modbus YAML reference

Use these options when you set up a Modbus hub in YAML. For the steps, refer to [Setting up a Modbus hub in YAML](#setting-up-a-modbus-hub-in-yaml).

### Configuring Modbus communication

Configure the Modbus communication with your Modbus devices. This general setup is needed to access the device.

The Modbus integration allows you to use multiple connections, each with multiple entities.

The Modbus integration provides several parameters to help communicate with "difficult" devices. These parameters are independent of the type of communication.

To enable this integration, add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

{% configuration %}
delay:
  description: "Time to delay sending messages in seconds after connecting.
  Some Modbus devices need a delay of typically 1-2 seconds after connection is established to prepare the communication.
  If a device does not respond to messages after connecting, then try this parameter.
  The delay only affects the first message."
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
  default: 3
  type: integer
type:
  description: "Type of connection."
  required: true
  type: list
  keys:
    tcp:
      description: "Modbus TCP, for devices with a network interface, or for a Modbus gateway on your network."
    udp:
      description: "Modbus UDP, over the network. Rarely used."
    rtuovertcp:
      description: "Modbus RTU over TCP, for a serial device server on your network."
    serial:
      description: "Serial connection (Modbus RTU or Modbus ASCII), for a serial port or a USB-to-RS-485 adapter."

{% endconfiguration %}

### Configuring a Modbus TCP connection

`type: tcp` is required. Use it for devices with a network interface, and for Modbus gateways that translate to Modbus TCP.

{% configuration %}
host:
  description: "IP address or name of your Modbus device, for example, `192.168.1.1`."
  required: true
  type: string
port:
  description: "Network port for the communication."
  required: true
  type: integer

{% endconfiguration %}

#### Example: Typical Modbus TCP configuration

```yaml
# Example YAML: typical Modbus TCP connection
modbus:
  - name: modbus_hub
    type: tcp
    host: IP_ADDRESS
    port: 502
```

#### Example: Full Modbus TCP configuration

```yaml
# Example YAML: full Modbus TCP connection
modbus:
  - name: modbus_hub
    type: tcp
    host: IP_ADDRESS
    port: 502

    delay: 0
    message_wait_milliseconds: 30
    timeout: 5
```

### Configuring a Modbus RTU over TCP connection

`type: rtuovertcp` is required. Use it for a serial device server: a device on your network that passes Modbus RTU between the network and one or more serial connections.

{% configuration %}
host:
  description: "IP address or name of your Modbus device, for example, `192.168.1.1`."
  required: true
  type: string
port:
  description: "Network port for the communication."
  required: true
  type: integer

{% endconfiguration %}

#### Example: Typical Modbus RTU over TCP configuration

```yaml
# Example YAML: typical Modbus RTU over TCP connection
modbus:
  - name: modbus_hub
    type: rtuovertcp
    host: IP_ADDRESS
    port: 502
```

#### Example: Full Modbus RTU over TCP configuration

```yaml
# Example YAML: full Modbus RTU over TCP connection
modbus:
  - name: modbus_hub
    type: rtuovertcp
    host: IP_ADDRESS
    port: 502

    delay: 0
    message_wait_milliseconds: 30
    timeout: 5
```

### Configuring a Modbus UDP connection

`type: udp` is required. This is rarely used, and only for very special configurations.

{% configuration %}
host:
  description: "IP address or name of your Modbus device, for example, `192.168.1.1`."
  required: true
  type: string
port:
  description: "Network port for the communication."
  required: true
  type: integer

{% endconfiguration %}

#### Example: Typical Modbus UDP configuration

```yaml
# Example YAML: typical Modbus UDP connection
modbus:
  - name: modbus_hub
    type: udp
    host: IP_ADDRESS
    port: 502
```

#### Example: Full Modbus UDP configuration

```yaml
# Example YAML: full Modbus UDP connection
modbus:
  - name: modbus_hub
    type: udp
    host: IP_ADDRESS
    port: 502

    delay: 0
    message_wait_milliseconds: 30
    timeout: 5
```

### Configuring a serial connection

`type: serial` is required. Use it for devices with an RS-485 interface.

The device is typically connected through a USB-to-RS-485 adapter, or through an RS-232-to-RS-485 adapter on a serial port.

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
  description: "The Modbus variant that the device uses on the serial connection."
  required: true
  type: list
  keys:
    rtu:
      description: "Modbus RTU: binary data, preceded by the unit ID and followed by a checksum. Standard."
    ascii:
      description: "Modbus ASCII: data as text characters, preceded by the unit ID and followed by a checksum. Used by few devices."
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
  description: "Serial port or USB device where your Modbus device is connected to your Home Assistant host."
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

#### Example: Typical serial configuration

```yaml
# Example YAML: typical serial connection
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

#### Example: Full serial configuration

```yaml
# Example YAML: full serial connection
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


### Configuring multiple connections

Multiple connections can freely mix different communications:

```yaml
# Example YAML: multiple Modbus TCP connections
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
# Example YAML: Modbus TCP connection and serial connection
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

### Configuring Modbus entities

Modbus entities are grouped below each Modbus hub.

Each Modbus device must have at least 1 entity. Otherwise, the integration isn't loaded.

For parameters that can't be used together, refer to the [Parameters usage matrix](#parameters-usage-matrix).

All Modbus entities have the following parameters:

{% configuration %}
address:
  description: "Address (0-based) of the coil or register. You can also enter it in hexadecimal, for example, `0x789A`."
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
  When Home Assistant restarts, the last known value is restored."
  required: false
  type: integer
  default: 15
slave:
  description: "Identical to `device_address`"
  required: false
  type: integer
  default: 1
device_address:
  description: "Unit ID of the device. Use it to address several devices on an RS-485 bus, or devices behind a Modbus gateway. `0` is the broadcast address."
  required: false
  type: integer
  default: 1
unique_id:
  description: "ID that uniquely identifies this entity.
  With `virtual_count`, the additional entities get this unique ID with a number added, for example, `my_unique_id_1`.
  If two entities have the same unique ID, Home Assistant will raise an exception."
  required: false
  type: string

{% endconfiguration %}

#### Example: Entities grouping

```yaml
# Example YAML: entities grouping
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

### Configuring binary sensor entities

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

For parameters that can't be used together, refer to the [Parameters usage matrix](#parameters-usage-matrix).

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
      description: "Creates this binary sensor plus this number of additional binary sensors.
      Addresses are automatically incremented.
      The parameter simplifies configuration and provides a much better performance by not using count+1 requests but a single request."
      required: false
      type: integer
    unique_id:
      description: "ID that uniquely identifies the entity. The additional binary sensors get this unique ID with a number added, for example, `my_unique_id_1`. If two sensors have the same unique ID, Home Assistant will raise an exception."
      required: false
      type: string

{% endconfiguration %}

#### Example: Typical binary sensor configuration

```yaml
# Example YAML: typical binary_sensor
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

#### Example: Full binary sensor configuration

```yaml
# Example YAML: binary_sensor with all options
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

#### Example: Multiple identical binary sensor configuration

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

The additional binary sensors get the same configuration as the first one, such as `device_class`.

### Configuring climate entities

The Modbus climate platform allows you to monitor a thermostat or heaters as well as set a target temperature, HVAC action, HVAC mode, swing mode, and fan state.

For parameters that can't be used together, refer to the [Parameters usage matrix](#parameters-usage-matrix).

{% configuration %}
climates:
  description: "A list of all climate entities in this Modbus hub."
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
    scale:
      description: "Scale factor (`output` = `scale` * `value` + offset) for setting target and current temperature. Cannot be used together with `current_temp_scale` or `target_temp_scale."
      required: false
      type: float
      default: 1
    offset:
      description: "Final offset for target and current temperature (`output` = `scale` * `value` + `offset). Cannot be used together with current_temp_offset or target_temp_offset`."
      required: false
      type: float
      default: 0
    current_temp_scale:
      description: "Scale factor for current temperature (output = `current_temp_scale` * `value` + `current_temp_offset`). Cannot be used together with `scale`"
      required: false
      type: float
      default: 1.0
    current_temp_offset:
      description: "Offset for current temperature (output` = current_temp_scale` * `value` + `current_temp_offset`). Cannot be used together with *offset*."
      required: false
      type: float
      default: 0.0
    target_temp_scale:
      description: "Scale factor for target temperature (`output` = `target_temp_scale` * `value` + `target_temp_offset`). Cannot be used together with scale`."
      required: false
      type: float
      default: 1.0
    target_temp_offset:
      description: "Offset for target temperature (`output` = `target_temp_scale` * `value` + `target_temp_offset`). Cannot be used together with offset`."
      required: false
      type: float
      default: 0.0
    target_temp_register:
      description: "Register address for target temperature (Setpoint). Using a list, it is possible to define one register for each of the available HVAC Modes. The list has to have a fixed size of 7 registers corresponding to the 7 available HVAC Modes, as follows: Register **1: HVAC AUTO mode**; Register **2: HVAC Cool mode**; Register **3: HVAC Dry mode**; Register **4: HVAC Fan only mode**; Register **5: HVAC Heat mode**; Register **6: HVAC Heat Cool mode**; Register **7: HVAC OFF mode**. It is possible to set duplicated values for the modes where the devices don't have a related register."
      required: true
      type: [integer, list]
    target_temp_write_registers:
      description: "If `true` use `write_registers` for target temperature (`target_temp_register`), else use `write_register`."
      required: false
      type: boolean
      default: false
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
    hvac_action_register:
      description: "Configuration of register for HVAC action"
      required: false
      type: map
      keys:
        address:
          description: "Address of HVAC action register."
          required: true
          type: integer
        input_type:
          description: "Type of register, either `holding` or `input`"
          required: false
          default: holding
          type: string
        values:
          description: "Mapping between the register values and HVAC actions"
          required: true
          type: map
          keys:
            action_off:
              description: "Value corresponding to HVAC Off action."
              required: false
              type: [integer, list]
            action_cooling:
              description: "Value corresponding to HVAC Cooling action."
              required: false
              type: [integer, list]
            action_defrosting:
              description: "Value corresponding to HVAC Defrosting action."
              required: false
              type: [integer, list]
            action_drying:
              description: "Value corresponding to HVAC Drying action."
              required: false
              type: [integer, list]
            action_fan:
              description: "Value corresponding to HVAC Fan action."
              required: false
              type: [integer, list]
            action_heating:
              description: "Value corresponding to HVAC Heating action."
              required: false
              type: [integer, list]
            action_idle:
              description: "Value corresponding to HVAC Idle action."
              required: false
              type: [integer, list]
            action_preheating:
              description: "Value corresponding to HVAC Preheating action."
              required: false
              type: [integer, list]
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
        Only use this setting if your On/Off state is not handled as an HVAC mode.
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
        Only use this setting if your On/Off state is not handled as an HVAC mode.
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

#### Example: Climate configuration

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
        structure: ">f"
        target_temp_register: 2782
        target_temp_write_registers: true
        temp_step: 1
        temperature_unit: C
```

### Configuring cover entities

The `modbus` cover platform allows you to control covers (such as blinds, a roller shutter, or a garage door).

At the moment, platform cover support the opening and closing of a cover. You can control your covers either using coils or holding registers.

A cover that uses `input_type: coil` is not able to determine intermediary states such as opening and closing. A coil stores only two states: `0` means the cover is closed, and `1` means it's open. To allow detecting intermediary states, there is an optional `status_register` attribute. It will enable you to write your command (for example, to open a cover) into a coil, and read current cover status back through the register. Additionally, you can specify values for `state_open`, `state_opening`, `state_closed`, and `state_closing` attributes. These will be matched with the value read from the `status_register`.

If your cover uses `input_type: holding` (default) to send commands, it can also read the intermediary states. To adjust which value represents what state, you can fine-tune the optional state attributes, like `state_open`. These optional state values are also used for specifying values written into the register. If you specify an optional status_register attribute, cover states will be read from status_register instead of the register used for sending commands.

For parameters that can't be used together, refer to the [Parameters usage matrix](#parameters-usage-matrix).

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

#### Example: Modbus cover

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

#### Example: Modbus cover controlled by a coil, its state is read from the register

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

#### Example: Modbus cover controlled by a holding register, its state is read from the status register

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

### Configuring fan entities

The `modbus` fan platform allows you to control [Modbus](http://www.modbus.org/) coils or registers.

For parameters that can't be used together, refer to the [Parameters usage matrix](#parameters-usage-matrix).

{% configuration %}
fans:
  description: "A list of all fan entities in this Modbus hub."
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
          description: "Write Single Register (function code 06)."
        holdings:
          description: "Write Multiple Registers (function code 16)."
        coil:
          description: "Write Single Coil (function code 05)."
        coils:
          description: "Write Multiple Coils (function code 15)."
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
              description: "Coil: a single bit that can be read and written."
            discrete_input:
              description: "Discrete input: a single bit that can only be read."
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

#### Example: Fan configuration

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

### Configuring light entities

The `modbus` light platform allows you to control [Modbus](http://www.modbus.org/) coils or registers.

For parameters that can't be used together, refer to the [Parameters usage matrix](#parameters-usage-matrix).

{% configuration %}
lights:
  description: "A list of all light entities in this Modbus hub."
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
    brightness_address: 
      description: "Address to read/write color brightness."
      required: false
      default: None
      type: integer
    color_temp_address:
      description: "Address to read/write color temperature."
      required: false
      default: None
      type: integer
    min_temp:
      description: "Minimal level of color temperature in Kelvin."
      required: false
      default: 2000
      type: integer
    max_temp:
      description: "Maximal level of color temperature in Kelvin."
      required: false
      default: 7000
      type: integer
    write_type:
      description: "Type of write request."
      required: false
      default: holding
      type: list
      keys:
        holding:
          description: "Write Single Register (function code 06)."
        holdings:
          description: "Write Multiple Registers (function code 16)."
        coil:
          description: "Write Single Coil (function code 05)."
        coils:
          description: "Write Multiple Coils (function code 15)."
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
          description: Type of address.
          required: false
          default: "Same as `write_type`"
          type: list
          keys:
            coil:
              description: "Coil: a single bit that can be read and written."
            discrete_input:
              description: "Discrete input: a single bit that can only be read."
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

#### Example: Light configuration

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
        brightness_address: 1006
        verify:
      - name: "light3"
        slave: 2
        address: 14
        write_type: coil
        brightness_address: 1006
        color_temp_address: 2006
      - name: "light4"
        slave: 2
        address: 14
        write_type: coil
        brightness_address: 1006
        color_temp_address: 2006
        min_temp: 2500
        max_temp: 5500
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

### Configuring sensor entities

The `modbus` sensor allows you to gather data from [Modbus](http://www.modbus.org/) registers.

For parameters that can't be used together, refer to the [Parameters usage matrix](#parameters-usage-matrix).

{% configuration %}
sensors:
  description: "A list of all sensors in this Modbus hub."
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
      description: If a Modbus sensor has a defined NaN value, this value can be set as a hex string starting with `0x` containing one or more bytes (for example, `0xFFFF` or `0x80000000`) or provided as an integer directly. If triggered, the sensor becomes `unknown`. The conversion from hex to integer for `nan_value` doesn't use the `data_type`, `structure`, or `swap` options.
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
      description: "Creates this sensor plus this number of additional sensors. All their registers are read with a single request."
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
    unique_id:
      description: ID that uniquely identifies the entity. If two sensors have the same unique ID, Home Assistant will raise an exception.
      required: false
      type: string
{% endconfiguration %}

{% note %}
If you specify scale or offset as floating point values, double precision floating point arithmetic will be used to calculate final value. This can cause loss of precision for values that are larger than 2^53.
{% endnote %}

#### Example: Sensor configuration

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


#### Example: Sensor full configuration

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

### Configuring switch entities

The `modbus` switch platform allows you to control [Modbus](http://www.modbus.org/) coils or registers.

For parameters that can't be used together, refer to the [Parameters usage matrix](#parameters-usage-matrix).

{% configuration %}
switches:
  description: "A list of all switches in this Modbus hub."
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
          description: "Write Single Register (function code 06)."
        holdings:
          description: "Write Multiple Registers (function code 16)."
        coil:
          description: "Write Single Coil (function code 05)."
        coils:
          description: "Write Multiple Coils (function code 15)."
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
              description: "Coil: a single bit that can be read and written."
            discrete_input:
              description: "Discrete input: a single bit that can only be read."
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
          description: "Value(s) when switch is off. The value must be an `integer` or a list of integers."
          required: false
          default: "Same as `command_off`"
          type: [integer, list]

{% endconfiguration %}

#### Example: Switch configuration

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


#### Example: Switch full configuration

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

### Parameters usage matrix

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


{% include integrations/actions.md %}

## Opening an issue

When you open an issue, add your current configuration, or a shortened version of it, with at least:

- The Modbus configuration lines
- The entity lines, such as for a sensor

To help the developers find the problem, include a debug log:

1. Add the following lines to your {% term "`configuration.yaml`" %} file:

   ```yaml
   logger:
     default: warning
     logs:
       homeassistant.components.modbus: debug
       pymodbus: debug
   ```

2. Restart Home Assistant.
3. Reproduce the problem.
4. Add the log to the issue.

## Building on top of Modbus

The only recommended way is to inherit the entities needed.
