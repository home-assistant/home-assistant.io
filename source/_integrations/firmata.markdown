---
title: Firmata
description: "Connect Arduino-compatible boards within Home Assistant"
ha_category:
  - DIY
  - Binary Sensor
  - Switch
ha_release: 0.112
ha_iot_class: Local Push
ha_codeowners:
  - '@DaAwesomeP'
ha_domain: firmata
---

[Firmata](https://github.com/firmata/protocol) can be used to add digital inputs and outputs to Home Assistant. Currently, this component supports high/low digital inputs and outputs. This allows for buttons, switches, motion detectors, relay control, etc. The component can currently connect to a Firmata board via serial or serial over USB.

The Firmata protocol is a standard protocol for microcontrollers. Most of these boards are support digital and analog inputs and outputs. [Arduino](https://www.arduino.cc/) and Arduino-compatible microcontroller development boards are the most popular boards to use with Firmata.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary_sensor)
- [Switch](#switches)

## Configuration

You will need to upload a [Firmata firmware](https://github.com/firmata/) to your board. Please upload any `StandardFirmata` sketch to your board; please refer to the [Arduino documentation](https://www.arduino.cc/en/Main/Howto) for further information for uploading sketches. Firmata is available in the Arduino Library Manager in the Arduino IDE. You may also use a [Firmata Express](https://github.com/MrYsLab/FirmataExpress).

To integrate Arduino boards with Home Assistant, add the following section to your `configuration.yaml` file:

<div class='note warning'>
Firmata does not store the last state across power cycles. This means that with every powerup the pins are set to off/low and after every initialization, they will be set to the default that you have configured in YAML.
</div>

<div class='note warning'>

Firmata may cycle pins HIGH/LOW during initialization. If your pins should not be accidentally cycled, you may need to modify your Firmtata sketch or if you are using a relay board use an output pin as VCC. See this issue for details: [Make initial pin value configurable](https://github.com/firmata/arduino/issues/166).

</div>

You may configure multiple Firmata boards. Each board has the following options:

{% configuration %}
serial_port:
  description: The port where your board is connected to your Home Assistant host. It is recommended to use the `by-id` reference (instead of numerical like `/dev/ttyACM0` or `/dev/ttyUSB0`) since these will never change after a reboot. If you are using HassOS, you can find a list of connected serial devices in the Hardware dialog on the System tab of the Supervisor.
  required: true
  type: string
serial_baud_rate:
  description: The baud rate of the Arduino sketch. If you are using Firmata Express, then you do not need to set this option. **If you are using the default StandardFirmata, then you should set this to `57600`.**
  required: false
  type: integer
arduino_instance_id:
  description: If you are using Firmata Express, then this should match the instance number that you set in the sketch.
  required: false
  type: integer
arduino_wait:
  description: Time in seconds to wait for the Arduino is initially respond. May need to be used for boards that respond slowly at first connection.
  required: false
  type: integer
sleep_tune:
  description: Time in seconds to wait for reply from the Arduino after sending a command. Rarely needs to be adjusted.
  required: false
  type: float
sampling_interval:
  description: Sampling interval in millseconds sent to Firmata. Most Firmata sketches will ignore any interval less than 10 milliseconds.
  required: false
  type: integer
switches:
  description: Digital high/low outputs to configure
  required: false
  type: list
  keys:
    name:
      description: The name of the entity to create in Home Assistant
      required: true
      type: string
    pin:
      description: The digital pin number on the board.
      required: true
      type: integer
    pin_mode:
      description: The digital pin output mode. For switches, this must be set to `OUTPUT`. No other output modes are currently implemented.
      required: true
      type: integer
    initial:
      description: The initial output of the pin after initialization. Note that this is inverted if `negate` is enabled.
      required: false
      default: False
      type: boolean
    negate:
      description: Flips the output of the digital pin
      required: false
      default: False
      type: boolean
binary_sensor:
  description: Digital high/low input to configure
  required: false
  type: list
  keys:
    name:
      description: The name of the entity to create in Home Assistant
      required: true
      type: string
    pin:
      description: The digital pin number on the board.
      required: true
      type: integer
    pin_mode:
      description: The digital pin input mode. Supported modes are `INPUT` and `PULLUP`. Check your board specifications to see which pins have optional internal pullups available.
      required: true
      type: integer
    negate:
      description: Flips the input of the digital pin
      required: false
      default: False
      type: boolean
{% endconfiguration %}

<div class='note'>
If you double-configure a pin, the integration will fail to configure the second one that it attempts to set up and will log an error.
</div>

```yaml
# Example firmata configuration.yaml entry
firmata:
  - serial_port: /dev/serial/by-id/usb-Teensyduino_USB_Serial_358320-if00
    serial_baud_rate: 57600
    switches:
      - name: my_light
        pin_mode: OUTPUT
        pin: 4
        negate: true
      - name: my_other_output
        pin_mode: OUTPUT
        pin: 5
        initial: true
      - name: my_light
        pin_mode: OUTPUT
        pin: 6
        initial: true
        negate: true
    binary_sensors:
      - name: my_motion
        pin_mode: INPUT
        pin: 2
      - name: my_door
        pin_mode: PULLUP
        pin: 3
        negate: true
```
