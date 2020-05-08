---
title: "RFXtrx Binary Sensor"
description: "Instructions on how to integrate RFXtrx binary sensors into Home Assistant."
ha_category:
  - Binary Sensor
ha_release: 0.48
ha_domain: rfxtrx
---

The `rfxtrx` platform support binary sensors that
communicate in the frequency range of 433.92 MHz.
The RFXtrx binary sensor integration provides support for them.

Many cheap sensors available on the web today are based on a particular RF chip
called *PT-2262*. Depending on the running firmware on the RFXcom box, some of
them may be recognized under the X10 protocol but most of them are recognized
under the *Lighting4* protocol. The RFXtrx binary sensor integration provides
some special options for them, while other RFXtrx protocols should work too.

## Setting up your devices

Once you have set up your [RFXtrx hub](/integrations/rfxtrx/), the easiest way
to find your binary sensors is to add this to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: rfxtrx
  automatic_add: true
```

Open your Home Assistant frontend and go to the "states" page.
Then make sure to trigger your sensor. You should see a new entity
appear in the *Current entities* list, starting with "binary_sensor."
and some hexadecimal digits. Those hexadecimal digits are your device id.

For example: "binary_sensor.0913000022670e013b70". Here your device id
is `0913000022670e013b70`. Then you should update your configuration to:

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: rfxtrx
  devices:
    0913000022670e013b70:
      name: device_name
```

{% configuration %}
devices:
  description: A list of devices.
  required: false
  type: list
  keys:
    name:
      description: Override the name to use in the frontend.
      required: false
      type: string
    device_class:
      description: Sets the [class of the device](/integrations/binary_sensor/), changing the device state and icon that is displayed on the frontend.
      required: false
      type: device_class
    fire_event:
      description: Fires an event even if the state is the same as before. Can be used for automations.
      required: false
      type: boolean
      default: false
    off_delay:
      description: For sensors that only sends 'On' state updates, this variable sets a delay after which the sensor state will be updated back to 'Off'.
      required: false
      type: integer
    data_bits:
      description: Defines how many bits are used for commands inside the data packets sent by the device.
      required: false
      type: integer
    command_on:
      description: Defines the data bits value that is sent by the device upon an 'On' command.
      required: false
      type: string
    command_off:
      description: Defines the data bits value that is sent by the device upon an 'Off' command.
      required: false
      type: string
automatic_add:
  description: To enable the automatic addition of new binary sensors.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

<div class='note warning'>

This integration and the [RFXtrx switch](/integrations/switch.rfxtrx/) can steal each other's devices when setting the `automatic_add` configuration parameter to `true`.
Set `automatic_add` only when you have some devices to add to your installation, otherwise leave it to `false`.

</div>

<div class='note warning'>

If a device ID consists of only numbers, please make sure to surround it with quotes.
This is a known limitation in YAML, because the device ID will be interpreted as a number otherwise.

</div>

Binary sensors have only two states - "on" and "off". Many door or window
opening sensors will send a signal each time the door/window is open or closed.
However, depending on their hardware or on their purpose,
some sensors are only able to signal their "on" state:

- Most motion sensors send a signal each time they detect motion. They stay "on" for a few seconds and go back to sleep, ready to signal other motion events. Usually, they do not send a signal when they go back to sleep.
- Some doorbells may also only send "on" signals when their toggle switch is pressed, but no "off" signal when the switch is released.

For those devices, use the *off_delay* parameter.
It defines a delay after which a device will go back to an "Off" state.
That "Off" state will be fired internally by Home Assistant, just as if
the device fired it by itself. If a motion sensor can only send signals
once every 5 seconds, sets the *off_delay* parameter to *seconds: 5*.

Example configuration:

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: rfxtrx
  automatic_add: true
  devices:
    091300006ca2c6001080:
    name: motion_hall
    device_class: motion
    off_delay:
      seconds: 5
```

### Options for PT-2262 devices under the Lighting4 protocol

When a data packet is transmitted by a PT-2262 device using the Lighting4
protocol, there is no way to automatically extract the device identifier and the
command from the packet. Each device has its own id/command length combination
and the fields lengths are not included in the data. One device that sends 2
different commands will be seen as 2 devices on Home Assistant. For such cases,
the following options are available in order to circumvent the problem:

- **data_bits** (*Optional*)
- **command_on** (*Optional*)
- **command_off** (*Optional*)

Let's try to add a new PT-2262 sensor using the "automatic_add"
option and have a look at Home Assistant system log.

Have your sensor trigger the "On" state for the first time.
Some messages will appear:

```text
INFO (Thread-6) [homeassistant.components.binary_sensor.rfxtrx] Added binary sensor 0913000022670e013970 (Device_id: 22670e Class: LightingDevice Sub: 0)
```

Here the sensor has the id *22670e*.

Now have your sensor trigger the "Off" state and look for the following
message in the Home Assistant log. You should see that your device
has been detected as a *new* device when triggering its "Off" state:

```text
INFO (Thread-6) [homeassistant.components.binary_sensor.rfxtrx] Added binary sensor 09130000226707013d70 (Device_id: 226707 Class: LightingDevice Sub: 0)
```

Here the device id is *226707*, which is almost similar to
the *22670e* we had on the "On" event a few seconds ago.

From those two values, you can guess that the actual id of your device is
*22670*, and that *e* and *7* are commands for "On" and "Off" states
respectively. As one hexadecimal digit uses 4 bits,
we can conclude that the device is using 4 data bits.

So here is the actual configuration section for the binary sensor:

```yaml
platform: rfxtrx
automatic_add: true
devices:
  0913000022670e013b70:
    name: window_room2
    device_class: opening
    data_bits: 4
    command_on: 0xe
    command_off: 0x7
```

The *automatic_add* option makes the RFXtrx binary sensor integration calculate
and display the configuration options for you in the Home Assistant logs:

```text
INFO (Thread-6) [homeassistant.components.rfxtrx] rfxtrx: found possible device 226707 for 22670e with the following configuration:
data_bits=4
command_on=0xe
command_off=0x7
INFO (Thread-6) [homeassistant.components.binary_sensor.rfxtrx] Found possible matching deviceid 22670e.
```

This automatic guess should work most of the time but there is
no guarantee on that. You should activate it only when you
want to configure your new devices and leave it off otherwise.

### Known working devices

The following devices are known to work with the RFXtrx binary sensor component.
There are too many other to list.

- Motion detectors:
  - Kerui P817 and P829.
  - Chuango PIR-700.

- Door / window sensors:
  - Kerui D026 door / window sensor: can trigger on "open" and "close". Has a tamper switch.
  - Nexa LMST-606.
