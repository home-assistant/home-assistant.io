---
title: RFLink
description: Instructions on how to integrate RFLink gateway into Home Assistant.
ha_category:
  - Binary sensor
  - Cover
  - Hub
  - Light
  - Sensor
  - Switch
ha_iot_class: Assumed State
ha_release: 0.38
ha_domain: rflink
ha_platforms:
  - binary_sensor
  - cover
  - light
  - sensor
  - switch
ha_codeowners:
  - '@javicalle'
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `rflink` {% term integration %} supports devices that use [RFLink gateway firmware](https://www.rflink.nl/download.php), for example, the [Nodo RFLink Gateway](https://www.nodo-shop.nl/21-rflink-). RFLink Gateway is an Arduino Mega firmware that allows two-way communication with a multitude of RF wireless devices using cheap hardware (Arduino + transceiver).

This {% term integration %} is tested with the following hardware/software:

- Nodo RFLink Gateway V1.4/RFLink R46

### Device support

The 433 MHz spectrum is used by many manufacturers. Mostly using their own protocol/standard, they use this spectrum to communicate with devices such as light switches, blinds, weather stations, alarms, and various other sensors.

The RFLink Gateway supports a number of RF frequencies, using a wide range of low-cost hardware. [Their website](https://www.rflink.nl) provides details for various RF transmitters, receivers, and transceiver modules for 433MHz, 868MHz, and 2.4 GHz.

{% note %}
Versions later than R44 add support for IKEA Ansluta, Philips Living Colors Gen1, and MySensors devices.
{% endnote %}

A complete list of devices supported by RFLink can be found [here](https://www.rflink.nl/devlist.php).

Even though many devices are supported by RFLink, not all have been tested/implemented. If you have a device supported by RFLink but not by this integration, please consider testing and adding support yourself.

## Configuration

To enable RFLink in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
rflink:
  port: /dev/serial/by-id/usb-id01234
```

{% configuration %}
port:
  description: The path to RFLink USB/serial device or TCP port in TCP mode.
  required: true
  type: string
host:
  description: Switches to TCP mode, connects to host instead of to USB/serial.
  required: false
  type: string
wait_for_ack:
  description: Wait for RFLink to acknowledge commands sent before sending new command (slower but more reliable).
  required: false
  default: true
  type: boolean
ignore_devices:
  description: List of device IDs to ignore. Supports wildcards (`*`, `?`).
  required: false
  type: [list, string]
reconnect_interval:
  description: Time in seconds between reconnect attempts.
  required: false
  default: 10
  type: integer
tcp_keepalive_idle_timer:
  description: Time in seconds to wait since last data packet was seen before a TCP KEEPALIVE is sent. Value of 0 will disable this feature.
  required: false
  default: 3600
  type: integer
{% endconfiguration %}

### Full example

```yaml
# Example configuration.yaml entry
rflink:
  port: /dev/serial/by-id/usb-id01234
  wait_for_ack: false
  ignore_devices:
    - newkaku_000001_01
    - digitech_*
```

### TCP mode

TCP mode allows you to connect to an RFLink device over a TCP/IP network. This is useful if placing the RFLink device next to the HA server is not optimal or desired (eg: bad reception).

The following command can be used to expose the USB/serial interface over TCP on a different host (Linux). The arguments are separated by spaces, further info on all arguments can be found for example [on the Debian manpages](https://manpages.debian.org/stretch/socat/socat.1.en.html).

- `/dev/ttyACM0,b57600,rawer` specifies the device location, a `b57600` 57600 baud rate, and `rawer` causes socat to ignore control sequences sent via the port (for example, it makes socat pass all information 'rawest form', rather than picking up control characters such as control-C which would close socat).
- `TCP-LISTEN:1234,reuseaddr,range=192.168.0.0/16` listens on IPV4 on the specified port (1234, change as suits your needs), the details behind the `reuseaddr` option [are fairly complex](https://stackoverflow.com/a/3233022/1049701) but it allows faster reconnects from the client (Home Assistant) in case of connection drops. An important security option is `range=192.168.0.0/16`, which specifies that socat should only accept connections from a certain range of IP addresses - the /16 subnet mask specifies a range from 192.168.0.0 to 192.168.255.255. Change this as required for your LAN network.

```bash
socat /dev/ttyACM0,b57600,rawer TCP-LISTEN:1234,reuseaddr,range=192.168.0.0/16
```

Other methods of exposing the serial interface over TCP are possible (eg: ESP8266 or using Arduino Wifi shield). Essentially the serial stream should be directly mapped to the TCP stream.

Tested with Wifi serial bridge [esp-link V2.2.3](https://github.com/jeelabs/esp-link/releases/tag/v2.2.3) running on a NodeMCU (ESP8266 Wifi module) with ESP8266 TXD0 (pin D10) and RXD0 (pin D9) connected to Arduino MEGA 2560 RX (Pin 2) and TX (Pin 3) respectively.

{% tip %}
Due to different logic levels, a voltage level shifter is required between the 3.3V NodeMCU and 5V Arduino MEGA 2560 pins. The BSS138 bidirectional logic level converter has been tested for serial pins and the [link](https://aliexpress.com/item/32238089139.html) is recommended for the CC2500 transceiver (used for IKEA Ansluta and Philips Living Colors)
{% endtip %}

{% tip %}
When re-flashing the Arduino MEGA, disconnect the ESP8266 to avoid programming difficulties.
{% endtip %}

```yaml
# Example configuration.yaml entry
rflink:
  host: 192.168.0.10
  port: 1234
  tcp_keepalive_idle_timer: 600
```

### Adding devices Automatically

In order to have your devices discovered automatically, you need to add the following to the configuration.
When pressing the button on the physical remote, RFLink detects the signal and the device should be added automatically to Home Assistant.

```yaml
# Example configuration.yaml entry
light:
  - platform: rflink
    automatic_add: true
sensor:
  - platform: rflink
    automatic_add: true
```

[RFLink Switches](#switch) and [RFLink Binary Sensors](#binary-sensor) cannot be added automatically.

The RFLink integration does not know the difference between a binary sensor, a switch and a light. Therefore, all switchable devices are automatically added as light by default. However, once the ID of a switch is known, it can be used to configure it as a switch or a binary sensor type in Home Assistant, for example, to add it to a different group or configure a nice name.

### Ignoring devices

The RFLink platform can be configured to completely ignore a device on a platform level. This is useful when you have neighbors which also use 433 MHz technology.

For example:

```yaml
# Example configuration.yaml entry
rflink:
  port: /dev/serial/by-id/usb-id01234
  wait_for_ack: false
  ignore_devices:
    - newkaku_000001_01
    - digitech_*
    - kaku_1_*
```

This configuration will ignore the button `1` of the `newkaku` device with ID `000001`, all devices of the `digitech` protocol and all switches of the `kaku` protocol device with codewheel ID `1`.

### Invert cover

Devices can be configure to work in inverted mode by adding option in {% term "`configuration.yaml`" %}:

```yaml
# Example configuration.yaml entry for inverted RTS cover
cover:
  - platform: rflink
    devices:
      # Rfloader created remote control which is used by Home Assistant
      RTS_0a0a0a_1:
        name: "Blind office"
        aliases: 
          - rts_0f1f2f_01 # ID of the remote control (Somfy smove in this case)
        type: inverted
 ```

This configuration uses `0a0a0a` to control the inverted shutter (send UP to close and Down to open) and listen commands sent by `0f1f2f` remote control.

### Device Incorrectly Identified

If you find a device is recognized differently, with different protocols or the ON OFF is swapped or detected as two ON commands, it can  be overcome with the RFLink 'RF Signal Learning' mechanism from RFLink Rev 46 (11 March 2017). [Link to further detail.](https://www.rflink.nl/faq.php#RFFind)

### Technical Overview

- The`rflink` Python module is an asyncio transport/protocol which is setup to fire a callback for every (valid/supported) packet received by the RFLink gateway.
- This integration uses this callback to distribute 'rflink packet events' over [Home Assistant's event bus](/docs/configuration/events/) which can be subscribed to by entities/platform implementations.
- The platform implementation takes care of creating new devices (if enabled) for unseen incoming packet IDs.
- Device entities take care of matching to the packet ID, interpreting and performing actions based on the packet contents. Common entity logic is maintained in this main component.

### Debug Logging

For debugging purposes or context when investigating issues you can enable debug logging for RFLink with the following configuration snippet:

```yaml
# Example configuration.yaml entry
logger:
  default: error
  logs:
    rflink: debug
    homeassistant.components.rflink: debug
```

This will give you output looking like this:

```bash
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] received data: 20;00;Nod
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] received data: o RadioFrequencyLink - R
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] received data: FLink Gateway V1.1 - R45
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] received data: ;
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] got packet: 20;00;Nodo RadioFrequencyLink - RFLink Gateway V1.1 - R45;
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] decoded packet: {'firmware': 'RFLink Gateway', 'revision': '45', 'node': 'gateway', 'protocol': 'unknown', 'hardware': 'Nodo RadioFrequencyLink', 'version': '1.1'}
17-03-07 20:12:05 DEBUG (MainThread) [rflink.protocol] got event: {'version': '1.1', 'firmware': 'RFLink Gateway', 'revision': '45', 'hardware': 'Nodo RadioFrequencyLink', 'id': 'rflink'}
17-03-07 20:12:05 DEBUG (MainThread) [homeassistant.components.rflink] event of type unknown: {'version': '1.1', 'firmware': 'RFLink Gateway', 'revision': '45', 'hardware': 'Nodo RadioFrequencyLink', 'id': 'rflink'}
```

## Binary sensor

The RFLink integration does not know the difference between a `binary_sensor`, a `switch`, and a `light`. Therefore, all switchable devices are automatically added as `light` by default.

RFLink binary_sensor/switch/light IDs are composed of: protocol, id, switch/channel. For example: `newkaku_0000c6c2_1`.

Once the ID of a binary sensor is known, it can be used to configure it as a binary sensor type in Home Assistant, for example, to hide it or configure a nice name.

Configuring a device as a binary sensor:

```yaml
# Example configuration.yaml entry
binary_sensor:
   - platform: rflink
     devices:
       pt2262_00174754_0: {}
```

{% configuration %}
devices:
  description: A list of binary sensors.
  required: false
  type: list
  keys:
    rflink_ids:
      description: RFLink ID of the device
      required: true
      type: map
      keys:
        name:
          description: Name of the device.
          required: false
          default: RFLink ID
          type: string
        aliases:
          description: Alternative RFLink IDs this device is known by.
          required: false
          type: list
        device_class:
          description: Sets the [class of the device](/integrations/binary_sensor/#device-class), changing the device state and icon that is displayed on the frontend.
          required: false
          type: string
        off_delay:
          description: For sensors that only sends 'On' state updates, this variable sets a delay after which the sensor state will be updated back to 'Off'.
          required: false
          type: integer
        force_update:
          description: Sends update events even if the value has not changed. Useful for sensors that only sends `On`.
          required: false
          type: boolean
          default: false
{% endconfiguration %}

### Sensor state

Initially, the state of a binary sensor is unknown. When a sensor update is received, the state is known and will be shown in the frontend.

### Device support for binary sensors

See [device support](#device-support)

### Additional configuration examples

Multiple sensors with custom name and device class and set off_delay

```yaml
# Example configuration.yaml entry
binary_sensor:
   - platform: rflink
     devices:
       pt2262_00174754_0:
         name: PIR Entrance
         device_class: motion
         off_delay: 5
       pt2262_00174758_0:
         name: PIR Living Room
         device_class: motion
         off_delay: 5
```

## Cover

After configuring the RFLink hub, covers will be automatically discovered and added. Except the Somfy RTS devices.

### Setting up a Somfy RTS device

You have to add the Somfy RTS manually with the supplied RFlinkLoader (Windows only).

Press the Learn button on the original Somfy remote enter the following code within 3 seconds. Your blinds will go up and down shortly:

```text
10;RTS;02FFFF;0412;3;PAIR;
```

Your blinds will go up and down again. This means your RFLink is now paired with your RTS motor.
To check this enter the following code again and see if there is a record.

```text
10;RTSSHOW;
```

```text
RTS Record: 0 Address: FFFFFF RC: FFFF
RTS Record: 1 Address: FFFFFF RC: FFFF
RTS Record: 2 Address: FFFFFF RC: FFFF
RTS Record: 3 Address: 02FFFF RC: 0018
RTS Record: 4 Address: FFFFFF RC: FFFF
RTS Record: 5 Address: FFFFFF RC: FFFF
RTS Record: 6 Address: FFFFFF RC: FFFF
RTS Record: 7 Address: FFFFFF RC: FFFF
RTS Record: 8 Address: FFFFFF RC: FFFF
RTS Record: 9 Address: FFFFFF RC: FFFF
RTS Record: 10 Address: FFFFFF RC: FFFF
RTS Record: 11 Address: FFFFFF RC: FFFF
RTS Record: 12 Address: FFFFFF RC: FFFF
RTS Record: 13 Address: FFFFFF RC: FFFF
RTS Record: 14 Address: FFFFFF RC: FFFF
RTS Record: 15 Address: FFFFFF RC: FFFF
```

After configuring the RFLink Somfy RTS you have to add the cover to the {% term "`configuration.yaml`" %} file like any other RFlink device.

RFLink cover IDs are composed of: protocol, id, and gateway. For example: `RTS_0100F2_0`.

Once the ID of a cover is known, it can be used to configure the cover in Home Assistant, for example, to add it to a different group or set a nice name.

Configuring devices as a cover:

```yaml
# Example configuration.yaml entry
cover:
  - platform: rflink
    devices:
      RTS_0100F2_0: {}
      bofumotor_455201_0f: {}
```

{% configuration %}
device_defaults:
  description: The defaults for the devices.
  required: false
  type: map
  keys:
    fire_event:
      description: Set default `fire_event` for RFLink cover devices.
      required: false
      default: false
      type: boolean
    signal_repetitions:
      description: Set default `signal_repetitions` for RFLink cover devices.
      required: false
      default: 1
      type: integer
devices:
  description: A list of covers.
  required: false
  type: list
  keys:
    rflink_ids:
      description: RFLink ID of the device
      required: true
      type: map
      keys:
        name:
          description: Name of the device.
          required: false
          default: RFLink ID
          type: string
        aliases:
          description: Alternative RFLink IDs this device is known by.
          required: false
          type: [list, string]
        fire_event:
          description: Fire a `button_pressed` event if this device is turned on or off.
          required: false
          default: False
          type: boolean
        signal_repetitions:
          description: The number of times every RFLink command should repeat.
          required: false
          type: integer
        group:
          description: Allow light to respond to group commands (ALLON/ALLOFF).
          required: false
          default: true
          type: boolean
        group_aliases:
          description: The `aliases` which only respond to group commands.
          required: false
          type: [list, string]
        no_group_aliases:
          description: The `aliases` which do not respond to group commands.
          required: false
          type: [list, string]
        type:
          description: The option to invert (`inverted`) on/off commands sent to the RFLink device or not (`standard`).
          required: false
          type: string
{% endconfiguration %}

### Setting up a KAKU ASUN-650 device

In RFLink, the ON and DOWN command are used to close the cover and the OFF and UP command are used to open the cover. The KAKU (COCO) ASUN-650 works the other way around, it uses the ON command to open the cover and the OFF command to close the cover.

The RFLink cover device has a property named `type` that takes 2 values:

- `standard`: Do not invert the on/off commands sent to the RFLink device.
- `inverted`: Invert the on/off commands sent to the RFLink device.

The following configuration example shows how to use the `type` property:

```yaml
# Example configuration.yaml entry that shows how to
# use the type property.
cover:
  - platform: rflink
    devices:
      newkaku_xxxxxxxx_x:
        name: kaku_inverted_by_type
        type: inverted
      newkaku_xxxxxxxx_y:
        name: kaku_not_inverted_by_type
        type: standard
      newkaku_xxxxxxxx_z:
        name: kaku_inverted_by_default
      nonkaku_yyyyyyyy_x:
        name: non_kaku_inverted_by_type
        type: inverted
      nonkaku_yyyyyyyy_y:
        name: non_kaku_not_inverted_by_type
        type: standard
      nonkaku_yyyyyyyy_z:
        name: non_kaku_not_inverted_by_default
```

The configuration above shows that the `type` property may be omitted. When the ID starts with `newkaku`, the integration will make sure that the on and off commands are inverted. When the ID does not start with `newkaku`, the on and off commands are not inverted.

### Setting up a non-RTS cover

Configure `automatic_add` for the light domain (yes, the light domain)
```yaml
# Example configuration.yaml entry
light:
  - platform: rflink
    automatic_add: true
```

When you press the remote buttons, a new light will show up in {% my entities title="the list of entities" %}.

Also you can enable rflink logs and look for the device_id, for example: `dooya_v4_654321_0f` or `brelmotor_3b35c7_47`.

```yaml
# Example configuration.yaml entry
logger:
  logs:
    rflink: debug
    homeassistant.components.rflink: debug
```

Once the `device_id` is known, the light domain configuration can be removed and configure the device as a cover:

```yaml
# Example configuration.yaml entry
cover:
  - platform: rflink
    devices:
      dooya_v4_654321_0f:
        name: "Room blinds"
```

### Device support for covers

See [device support](#device-support).

## Additional configuration examples

Multiple covers with custom names and aliases

```yaml
# Example configuration.yaml entry
cover:
  - platform: rflink
    devices:
      RTS_0A8720_0:
        name: enanos
        aliases:
          - rts_31e53f_01
          - rts_32e53f_01
      RTS_30E542_0:
        name: comedor
        aliases:
          - rts_33e53f_01
          - rts_fa872e_01
      RTS_33E542_0:
        name: dormitorio
        aliases:
          - rts_30e53f_01
          - rts_32e53f_01
      RTS_32E542_0:
        name: habitaciones
        fire_event: true
```

## Light

After configuring the RFLink hub, lights will be automatically discovered and added.

RFLink binary_sensor/switch/light IDs are composed of: protocol, id, switch/channel. For example: `newkaku_0000c6c2_1`.

Once the ID of a light is known, it can be used to configure the light in HA, for example to add it to a different group or configure a nice name.

Configuring devices as a light:

```yaml
# Example configuration.yaml entry
light:
  - platform: rflink
    devices:
      NewKaku_02a48800_0: {}
      newkaku_0000c6c2_1: {}
      Ansluta_ce30_0: {}
      Maclean_0d82_01: {}
```

{% configuration %}
device_defaults:
  description: The defaults for the devices.
  required: false
  type: map
  keys:
    fire_event:
      description: Set default `fire_event` for RFLink switch devices (see below).
      required: false
      default: False
      type: boolean
    signal_repetitions:
      description: Set default `signal_repetitions` for RFLink switch devices (see below).
      required: false
      default: 1
      type: integer
automatic_add:
  description: Automatically add new/unconfigured devices to Home Assistant if detected.
  required: false
  default: true
  type: boolean
devices:
  description: A list of lights.
  required: false
  type: list
  keys:
    rflink_ids:
      description: RFLink ID of the device
      required: true
      type: map
      keys:
        name:
          description: Name of the device.
          required: false
          default: RFLink ID
          type: string
        type:
          description: "Override automatically detected type of the light device, can be: switchable, dimmable, hybrid or toggle. See [Light Types](#light-types) below."
          required: false
          default: switchable
          type: string
        aliases:
          description: Alternative RFLink IDs this device is known by.
          required: false
          type: [list, string]
        group_aliases:
          description: "`aliases` which only respond to group commands."
          required: false
          type: [list, string]
        no_group_aliases:
          description: "`aliases` which do not respond to group commands."
          required: false
          type: [list, string]
        fire_event:
          description: Fire a `button_pressed` event when this device is turned on or off.
          required: false
          default: false
          type: boolean
        signal_repetitions:
          description: Repeat every RFLink command this number of times.
          required: false
          default: 1
          type: integer
        group:
          description: Allow light to respond to group commands (ALLON/ALLOFF).
          required: false
          default: true
          type: boolean
{% endconfiguration %}

### Light state

Initially the state of a light is unknown. When the light is turned on or off (via frontend or remote) the state is known and will be shown in the frontend.

Sometimes a light is controlled by multiple remotes, each remote has its own code programmed in the light. To allow tracking of the state when switched via other remotes add the corresponding remote codes as aliases:

```yaml
# Example configuration.yaml entry
light:
  - platform: rflink
    devices:
      newkaku_0000c6c2_1:
        aliases:
          - newkaku_000000001_2
          - kaku_000001_a
```

Any on/off command from any alias ID updates the current state of the light. However when sending a command through the frontend only the primary ID is used.

### Light types

Light devices can come in different forms. Some only switch on and off, other support dimming. Dimmable devices might not always respond nicely to repeated `on` command as they turn into a pulsating state until `on` is pressed again (for example KlikAanKlikUit). The RFLink integration support three types of lights to make things work in every situation:

- *Hybrid*: This type sends a `dim` followed by an `on` command; and `off` commands. This will make dimmable devices turn on at the requested dim level and on/off devices on. One caveat is this type is not compatible with signal repetition as multiple `on` signals will cause dimmers to go into disco mode.
- *Switchable*: Device type that sends only `on` and `off` commands. It works for both on/off and dimmable type switches. However, dimmable devices might have issues with signal repetition (see above).
- *Dimmable*: Sends only `dim` and `off` commands. This does not work on on/off type devices as they don't understand the `dim` command. For dimmers this does not cause issues with signal repetitions.
- *Toggle*: Device type that sends only `on` commands to turn on or off the device. Some switches like for example Livolo light switches use the same 'on' command to switch on and switch off the lights. If the light is on and 'on' gets sent, the light will turn off and if the light is off and 'on' gets sent, the light will turn on. If the device has an unknown state, it will assume it is off by default.

By default new lights are assigned the `switchable` type. Protocol supporting dimming are assigned the `hybrid` type. Currently only `newkaku` protocol is detected as dimmable. Please refer to Device Support to get your dimmers supported.

### Hiding/ignoring lights

Lights are added automatically when the RFLink gateway intercepts a wireless command in the ether. To prevent cluttering the frontend use any of these methods:

- Disable automatically adding of unconfigured new sensors (set `automatic_add` to `false`).
- Hide unwanted devices using [customizations](/getting-started/customizing-devices/)
- [Ignore devices on a platform level](#ignoring-devices)

### Device support for lights

See [device support](#device-support)

### Additional configuration examples

Multiple lights with `signal_repetitions` and custom names

```yaml
# Example configuration.yaml entry
light:
  - platform: rflink
    device_defaults:
      fire_event: true
      signal_repetitions: 2
    automatic_add: true
    devices:
      NewKaku_02a48800_0:
        name: Kitchen
        type: hybrid
      newkaku_0000c6c2_1:
        name: Living room
        aliases:
          - newkaku_000000001_2
          - kaku_000001_a
      Ansluta_ce30_0:
        name: Kitchen Under Counter Lights
      Maclean_0d82_01:
        name: Bedroom Lamp
```

## Sensor

After configuring the RFLink hub, sensors will be automatically discovered and added.

RFLink sensor IDs are composed of: protocol, ID and type (optional). For example: `alectov1_0334_temp`. Some sensors emit multiple types of data. Each will be created as its own.

Once the ID of a sensor is known, it can be used to configure the sensor in Home Assistant, for example to add it to a different group or configure a nice name.

Configuring a device as a sensor:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rflink
    devices:
      alectov1_0334_temp: {}
```

{% configuration %}
automatic_add:
  description: Automatically add new/unconfigured devices to Home Assistant if detected.
  required: false
  default: true
  type: boolean
devices:
  description: A list of sensors.
  required: false
  type: list
  keys:
    rflink_ids:
      description: RFLink ID of the device
      required: true
      type: map
      keys:
        name:
          description: Name of the device.
          required: false
          default: RFLink ID
          type: string
        sensor_type:
          description: Override automatically detected type of sensor. For list of [values](#sensor-types) see below.
          required: true
          type: string
        unit_of_measurement:
          description: Override automatically detected unit of sensor.
          required: false
          type: string
        aliases:
          description: "Alternative RFLink IDs this device is known by."
          required: false
          type: [list, string]
{% endconfiguration %}

### Sensor types

Sensor type values:

- average_windspeed
- barometric_pressure
- battery
- co2_air_quality
- command
- current_phase_1
- current_phase_2
- current_phase_3
- distance
- doorbell_melody
- firmware
- hardware
- humidity
- humidity_status
- kilowatt
- light_intensity
- meter_value
- noise_level
- rain_rate
- revision
- temperature
- timestamp
- total_rain
- uv_intensity
- version
- voltage
- watt
- weather_forecast
- windchill
- winddirection
- windgusts
- windspeed
- windtemp

### Hiding/ignoring sensors

Sensors are added automatically when the RFLink gateway intercepts a wireless command in the ether. To prevent cluttering the frontend use any of these methods:

- Disable automatically adding of unconfigured new sensors (set `automatic_add` to `false`).
- [Ignore devices on a platform level](#ignoring-devices)

### Device support for sensors

See [device support](#device-support)

### Additional configuration examples

Multiple sensors with `automatic_add` disabled and `aliases`

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rflink
    automatic_add: false
    devices:
      oregontemp_0d93_temp:
        sensor_type: temperature
      oregontemp_0d93_bat:
        sensor_type: battery
      tunex_c001_temp:
        sensor_type: temperature
        aliases:
          - xiron_4001_temp
      tunex_c001_hum:
        sensor_type: humidity
        aliases:
          - xiron_4001_hum
      tunex_c001_bat:
        sensor_type: battery
        aliases:
          - xiron_4001_bat
```

## Switch

The RFLink integration does not know the difference between a `switch`, a `binary_sensor`, and a `light`. Therefore, all switchable devices are automatically added as `light` by default.

RFLink binary_sensor/switch/light IDs are composed of: protocol, id, switch/channel. For example: `newkaku_0000c6c2_1`.

Once the ID of a switch is known, it can be used to configure it as a switch type in HA and, for example, to add it to a different group or configure a nice name.

Configuring devices as switch :

```yaml
# Example configuration.yaml entry
switch:
  - platform: rflink
    devices:
      newkaku_0000c6c2_1: {}
      conrad_00785c_0a: {}
```

{% configuration %}
device_defaults:
  description: The defaults for the devices.
  required: false
  type: map
  keys:
    fire_event:
      description: Set default `fire_event` for RFLink switch devices (see below).
      required: false
      default: False
      type: boolean
    signal_repetitions:
      description: Set default `signal_repetitions` for RFLink switch devices (see below).
      required: false
      default: 1
      type: integer
devices:
  description: A list of switches.
  required: false
  type: list
  keys:
    rflink_ids:
      description: RFLink ID of the device
      required: true
      type: map
      keys:
        name:
          description: Name of the device.
          required: false
          default: RFLink ID
          type: string
        aliases:
          description: Alternative RFLink IDs this device is known by.
          required: false
          type: [list, string]
        group_aliases:
          description: "`aliases` which only respond to group commands."
          required: false
          type: [list, string]
        no_group_aliases:
          description: "`aliases` which do not respond to group commands."
          required: false
          type: [list, string]
        fire_event:
          description: Fire a `button_pressed` event if this device is turned on or off.
          required: false
          default: false
          type: boolean
        signal_repetitions:
          description: Set default `signal_repetitions` for RFLink switch devices (see below).
          required: false
          default: 1
          type: integer
        group:
          description: Allow switch to respond to group commands (ALLON/ALLOFF).
          required: false
          default: true
          type: boolean
        aliases:
          description: Alternative RFLink IDs this device is known by.
          required: false
          type: [list, string]
        group_aliases:
          description: "`aliases` which only respond to group commands."
          required: false
          type: [list, string]
        no_group_aliases:
          description: "`aliases` which do not respond to group commands."
          required: false
          type: [list, string]
{% endconfiguration %}

### Switch state

Initially, the state of a switch is unknown. When the switch is turned on or off (via frontend or wireless remote) the state is known and will be shown in the frontend.

Sometimes a switch is controlled by multiple wireless remotes. Each remote has its own code programmed in the switch. To allow tracking of the state when switched via other remotes, add the corresponding remote codes as aliases:

```yaml
# Example configuration.yaml entry
switch:
  - platform: rflink
    devices:
      newkaku_0000c6c2_1:
        name: Ceiling fan
        aliases:
          - newkaku_000000001_2
          - kaku_000001_a
```

Any on/off command from any alias ID updates the current state of the switch. However, when sending a command through the frontend only the primary ID is used.

### Device support for switches

See [device support](#device-support)

#### Additional configuration examples

Multiple switches with signal repetitions and custom names

```yaml
# Example configuration.yaml entry
switch:
  - platform: rflink
    device_defaults:
      fire_event: true
      signal_repetitions: 2
    devices:
      newkaku_0000c6c2_1:
        name: Ceiling fan
      conrad_00785c_0a:
        name: Motion sensor kitchen
```
