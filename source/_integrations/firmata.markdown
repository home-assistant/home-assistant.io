---
title: Firmata
description: Connect Arduino-compatible boards within Home Assistant
ha_category:
  - Binary sensor
  - DIY
  - Light
  - Sensor
  - Switch
ha_release: 0.114
ha_iot_class: Local Push
ha_codeowners:
  - '@DaAwesomeP'
ha_domain: firmata
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - switch
ha_integration_type: integration
ha_quality_scale: legacy
---

[Firmata](https://github.com/firmata/protocol) can be used to add analog and digital inputs and outputs to Home Assistant. This allows for buttons, switches, motion detectors, relay control, sensors, potentiometers, dimmers, etc. The integration can currently connect to a Firmata board via serial or serial over USB.

The Firmata protocol is a standard protocol for microcontrollers. Most of these boards support digital and analog inputs and outputs. [Arduino](https://www.arduino.cc/) and Arduino-compatible microcontroller development boards are the most popular boards to use with Firmata.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary_sensors)
- [Light](#lights)
- [Sensor](#sensors)
- [Switch](#switches)

## Configuration

You will need to upload a [Firmata firmware](https://github.com/firmata/) to your board. Please upload any `StandardFirmata` sketch to your board; please refer to the [Arduino documentation](https://www.arduino.cc/en/Main/Howto) for further information for uploading sketches. Firmata is available in the Arduino Library Manager in the Arduino IDE. You may also use a [Firmata Express](https://github.com/MrYsLab/FirmataExpress).

To integrate Arduino boards with Home Assistant, add the following section to your {% term "`configuration.yaml`" %} file:

{% warning %}
Firmata does not store the last state across power cycles. This means that with every powerup the pins are set to off/low and after every initialization, they will be set to the default that you have configured in YAML.
{% endwarning %}

{% warning %}

Firmata may cycle pins HIGH/LOW during initialization. If your pins should not be accidentally cycled, you may need to modify your Firmtata sketch or if you are using a relay board use an output pin as VCC. See this issue for details: [Make initial pin value configurable](https://github.com/firmata/arduino/issues/166).

{% endwarning %}

You may configure multiple Firmata boards. Each board has the following options:

{% configuration %}
serial_port:
  description: The port where your board is connected to your Home Assistant host. It is recommended to use the `by-id` reference (instead of numerical like `/dev/ttyACM0` or `/dev/ttyUSB0`) since these will never change after a reboot. If you are using Home Assistant Operating System, you can find a list of connected serial devices in the Hardware dialog on the {% my hardware title="Settings > System > Hardware" %} panel.
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
  description: Sampling interval in milliseconds sent to Firmata. Most Firmata sketches will ignore any interval less than 10 milliseconds.
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
      description: The digital or analog pin number on the board.
      required: true
      type: [integer, string]
    pin_mode:
      description: The digital or analog pin output mode. For switches, this must be set to `OUTPUT`. No other output modes are currently implemented.
      required: true
      type: string
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
lights:
  description: PWM/Analog outputs to configure
  required: false
  type: list
  keys:
    name:
      description: The name of the entity to create in Home Assistant
      required: true
      type: string
    pin:
      description: The digital or analog pin number on the board. Note that most boards do not support analog or PWM output on all digital and analog pins.
      required: true
      type: [integer, string]
    pin_mode:
      description: The digital or analog pin output mode. For lights, this must be set to `PWM`. No other output modes are currently implemented.
      required: true
      type: string
    initial:
      description: The initial output of the pin after initialization. This should be a Home Assistant-like value from 0 to 255; this value is then plugged into the `minimum`/`maximum` scaling (if configured).
      required: false
      default: 0
      type: integer
    minimum:
      description: The minimum PWM/analog value to send (inclusive). This is the lowest allowed value that the pin will output. The Home Assistant brightness value (0 to 255) will be scaled with this value as the lower value of the range.
      required: false
      default: 0
      type: integer
    maximum:
      description: The maximum PWM/analog value to send (inclusive). This is the highest allowed value that the pin will output. The Home Assistant brightness value (0 to 255) will be scaled with this value as the higher value of the range.
      required: false
      default: 255
      type: integer
binary_sensors:
  description: Digital or analog high/low input to configure
  required: false
  type: list
  keys:
    name:
      description: The name of the entity to create in Home Assistant
      required: true
      type: string
    pin:
      description: The digital or analog pin number on the board. For analog pins the corresponding digital number must be used. Please use the pinout that corresponds to your board. For example, on the Arduino Uno, pin A2 corresponds to the digital pin number 16.
      required: true
      type: [integer, string]
    pin_mode:
      description: The digital or analog pin input mode. Supported modes are `INPUT` and `PULLUP`. Check your board specifications to see which pins have optional internal pullups available.
      required: true
      type: string
    negate:
      description: Flips the input of the digital or analog pin
      required: false
      default: False
      type: boolean
sensors:
  description: Analog input to configure
  required: false
  type: list
  keys:
    name:
      description: The name of the entity to create in Home Assistant
      required: true
      type: string
    pin:
      description: The analog pin number on the board. This should be in the form `A0`, `A1`, etc.
      required: true
      type: string
    pin_mode:
      description: The analog pin input mode. For sensors, this must be set to `ANALOG`. No other input modes are currently implemented.
      required: true
      type: string
    differential:
      description: Minimum difference in value to update. The absolute value of the difference between the old and new value must be greater than or equal to this option for the update to register in Home Assistant. **This is set to `40` by default to prevent an unconnected pin from clogging the Home Assistant history with updates.** Set this to `1` to register all updates in Home Assistant. Updates are registered as fast as the board can send them (very fast). The minimum value that may be set is `1`.
      required: false
      default: 40
      type: integer
{% endconfiguration %}

{% note %}
If you double-configure a pin, the integration will fail to configure the second one that it attempts to set up and will log an error.
{% endnote %}

{% note %}
To invert/negate a light, set the `maximum` to `0` and the `minimum` to `255`.
{% endnote %}

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
      - name: my_light2
        pin_mode: OUTPUT
        pin: A6
        initial: true
        negate: true
    lights:
      - name: my_dimmable_light
        pin_mode: PWM
        pin: 6
      - name: my_subset_light
        pin_mode: PWM
        pin: 10
        initial: 0
        minimum: 127
        maximum: 200
      - name: my_inverted_light
        pin_mode: PWM
        pin: 11
        minimum: 255
        maximum: 0
    binary_sensors:
      - name: my_motion
        pin_mode: INPUT
        pin: 2
      - name: my_door
        pin_mode: PULLUP
        pin: 3
        negate: true
      - name: my_other_door
        pin_mode: INPUT
        pin: 16   # A2
        negate: true
    sensors:
      - name: my_sensor
        pin: A0
        pin_mode: ANALOG
        differential: 40
```
