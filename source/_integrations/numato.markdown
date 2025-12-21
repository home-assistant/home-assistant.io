---
title: Numato USB GPIO Expander
description: Instructions on how to integrate a Numato GPIO expander into Home Assistant.
ha_category:
  - Binary sensor
  - DIY
  - Sensor
  - Switch
ha_release: '0.110'
ha_iot_class: Local Push
ha_domain: numato
ha_codeowners:
  - '@clssn'
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: legacy
---

The `numato` integration is the base for all related GPIO platforms of the
[Numato 32 Port USB GPIO expander](https://numato.com/product/32-channel-usb-gpio-module-with-analog-inputs):

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)
- [Switch](#switch)

The whole configuration of all Numato devices is located in the general setup
of this integration. The following minimalistic example configures a couple of
binary_sensor, switch and sensor ports for a single device with ID 0.

```yaml
numato:
  devices:
    - id: 0
      binary_sensors:
        ports:
          2: Window Livingroom Open
          3: Window Livingroom Glassbreak
          4: Doorbell
      sensors:
        ports:
          1:
            name: Soil Moisture Ficus
      switches:
        ports:
          5: Relay Light Outdoor
          6: Relay Circulation Pump
          7: Door Opener
```

{% configuration %}
discover:
  description: List of OS device files (/dev/...) to try during discovery
  required: false
  default: List of /dev/ttyACM0 .. /dev/ttyACM9
  type: list
devices:
  description: List of Numato 32 Port USB GPIO devices.
  required: true
  type: list
  keys:
    id:
      description: ID configured in the device (not the Linux device since this can change).
      required: true
      type: integer
    binary_sensors:
      description: Configuration of ports for the `binary_sensor` platform
      type: map
      keys:
        invert_logic:
          description: Whether to invert the logic, so a high voltage level is interpreted as false.
          required: false
          default: false
          type: boolean
        ports:
          description: Map of port numbers to names.
          required: true
          type: map
          keys:
            "port: name":
              description: The port numbers and corresponding names.
              required: true
              type: string
    sensors:
      description: Configuration of ports for the `sensor` platform
      type: map
      keys:
        ports:
          description: Map of port numbers to ADC configurations.
          required: true
          type: map
          keys:
            "port: adc_config":
              description: The port number and corresponding ADC configuration.
              required: true
              type: map
              keys:
                name:
                  description: Name of the ADC sensor port.
                  required: true
                  type: string
                source_range:
                  description: Range within the ADC's resolution to map values from.
                  required: false
                  default: [0, 1024]
                  type: list
                destination_range:
                  description: Range to map values from the source range to in a linear fashion.
                  required: false
                  default: [0.0, 100.0]
                  type: list
                unit:
                  description: Unit of the destination values.
                  required: false
                  type: string
                  default: \%
    switches:
      description: Configuration of ports for the `sensor` platform
      type: map
      keys:
        invert_logic:
          description: Whether to invert the logic, so a value of true leads to a low voltage level at the output.
          required: false
          default: false
          type: boolean
        ports:
          description: Map of port numbers to names.
          required: true
          type: map
          keys:
            "port: name":
              description: The port numbers and corresponding names.
              required: true
              type: string
{% endconfiguration %}

## Binary sensor

The `numato` binary_sensor platform allows you to operate the GPIOs of your
[Numato](https://numato.com) 32 port USB GPIO expander in binary input mode.

{% caution %}
As the Numato devices do not have internal pull-up or pull-down circuitry,
be careful not to destroy a port by creating a short circuit. Refer to the
[Numato documentation](https://numato.com/docs/32-channel-usb-gpio-module-with-analog-inputs/#gpio-with-switches-8)
on how to connect a switch to an input port, for example.
{% endcaution %}

## Sensor

The `numato` sensor platform allows you to operate some GPIOs of your USB GPIO
expander in analog input mode.

The Numato device has a number of built-in analog-digital-converters (ADCs) to
convert a voltage level between VCC and GND into a 10-bit integer value. Read
the [IO Ports](#io-ports) section for constraints on the ports to use.

By default, the ADC's whole 10-bit range will be mapped to a float value between
0.0 and 1.0. Use the optional `source_range` to map from a specific range and
the `destination_range` to specify the value range to represent the entity
state.

## Switch

The `numato` switch platform allows you to operate the GPIOs of your
[Numato](https://numato.com) 32 port USB GPIO expander in output mode.

## IO ports

The IO port numbers used in this configuration refer to the port numbers
printed on the PCB. Note that the Sensor platform can be configured on ports
1-7 only. These are the only ports on the 32 port device equipped with an ADC.

For details about the GPIO layout, take a look at the [Numato 32 GPIO
documentation](https://numato.com/docs/32-channel-usb-gpio-module-with-analog-inputs).

## Device IDs

This integration uses an internal device ID to identify the device, which is
_not_ the Linux device path. The Linux device path (e.g., `/dev/ttyACM0`) can
change, for example, when you disconnect and re-connect the device or if you
connect the device to a different USB port.

The internal device ID is 0 by default. If you have only one device, you should
not need to care about changing it. If you have multiple devices, their IDs are
shown in the console log during startup of Home Assistant.

### Configure the Device ID

Configure your Numato device's ID with the following steps. Though you can use
any terminal emulator to connect to and communicate with your device, the
following steps are based on using _GNU Screen_. On a Debian or Ubuntu-based OS
install _Screen_ like `sudo apt install screen`.

1. Plug in only the one device to assign an id to so it'll get /dev/ttyACM0
2. Wait a couple of seconds as your Linux OS may be trying to identify the
   device as a Modem right after plugging it in
3. Run `screen /dev/ttyACM0`
4. Type `id get` to see the current ID
5. Type `id set 00000005` and hit enter to assign ID 5
6. Type `id get` to validate and expect `00000005` as a reply
7. Quit screen with: Ctrl-a + \ and confirm with `y`

Note that during communication with the device the ID values are strictly 32
bit hexadecimal numbers (8 hex digits) with leading `0` padding.

Hint: It is a good practice to put sticky labels with the IDs onto the PCBs in
order to avoid confusion of devices and their port configuration since this
could easily destroy your device.

{% warning %}
Numato devices used by Home Assistant are expected to be exclusive to Home
Assistant and remain permanently connected.
{% endwarning %}
