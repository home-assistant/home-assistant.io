---
title: RFXCOM RFXtrx
description: Instructions on how to integrate RFXtrx into Home Assistant.
ha_category:
  - Hub
ha_release: pre 0.7
ha_codeowners:
  - '@danielhiversen'
ha_domain: rfxtrx
---

The `rfxtrx` integration supports RFXtrx devices by [RFXCOM](http://www.rfxcom.com), which communicate in the frequency range of 433.92 MHz.

To enable RFXtrx in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for local serial device
rfxtrx:
  device: /dev/ttyUSB0
```

OR

```yaml
# Example configuration.yaml entry for TCP connected device using ser2net
rfxtrx:
  host: 192.168.0.2
  port: 50000
```

```yaml
# Example configuration with several devices
rfxtrx:
  host: 192.168.0.2
  port: 50000
  devices:
    # Siemens/LightwaveRF Shutter
    0b1100ce3213c7f210010f70:
    # RFY Shutter
    071a00000a000101:

    # Light 1
    0b11000f10e9e5660b010f70:
    # Light TV
    0b1100100f29e5660c010f70:

    # Binary Sensor
    0913000022670e013b70:

    # Binary Sensor with data bits setup
    0913000022670e013b70:
      device_class: opening
      data_bits: 4
      command_on: 0xe
      command_off: 0x7

    # Switch 1
    0b1100ce3213c7f210010f70:
    # Switch 2
    0b11000a02ef2gf210010f50:
    # Switch 3
    0b1111e003af16aa10000060:
      fire_event: true

    # Sensor
    0a52080000301004d240259:
```

{% configuration %}
device:
  description: "The path to your device, e.g., `/dev/serial/by-id/usb-RFXCOM_RFXtrx433_A1Y0NJGR-if00-port0` or `/dev/ttyUSB0`. Required if you are using a locally connected USB device."
  required: false
  type: string
host:
  description: "The hostname the remote RFXtrx is available on if connecting via TCP. If this is set, a port is required."
  required: false
  type: string
port:
  description: "The TCP port the remote RFXtrx is available on. If this is set, a host is required."
  required: false
  type: integer
debug:
  description: "If you want to receive debug output."
  required: false
  default: false
  type: boolean
dummy:
  description: "Then you need a connected drive to test your settings. Can be useful for debugging and testing."
  required: false
  default: false
  type: boolean
devices:
  description: A list of devices.
  required: false
  type: list
  keys:
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
      description: For binary sensors that only sends 'On' state updates, this variable sets a delay after which the binary sensor state will be updated back to 'Off'.
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
    signal_repetitions:
      description: Because the rxftrx device sends its actions via radio and from most receivers it's impossible to know if the signal was received or not. Therefore you can configure the rfxtrx device to try to send each signal repeatedly.
      required: false
      type: integer
automatic_add:
  description: To enable the automatic addition of new binary sensors.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

<div class='note warning'>
If a device ID consists of only numbers, please make sure to surround it with quotes.
This is a known limitation in YAML, because the device ID will be interpreted as a number otherwise.
</div>

## Supported protocols

Not all protocols as advertised are enabled on the initial setup of your transceiver. Enabling all protocols is not recommended either. Your 433.92 product not showing in the logs? Visit the RFXtrx website to [download RFXmgmr](http://www.rfxcom.com/epages/78165469.sf/en_GB/?ViewObjectPath=%2FShops%2F78165469%2FCategories%2FDownloads) and enable the required protocol.

### ser2net

You can host your device on another computer by setting up ser2net and example configuration for ser2net looks like this and then using host/port in your Home Assistant configuration.

```text
50000:raw:0:/dev/ttyUSB0:38400 8DATABITS NONE 1STOPBIT
```
