---
layout: page
title: "RFXtrx Binary Sensor"
description: "Instructions how to integrate RFXtrx binary sensors into Home Assistant."
date: 2016-10-16 23:33
sidebar: true
comments: false
sharing: true
footer: true
logo: rfxtrx.png
ha_category: Binary Sensor
---

The `rfxtrx` platform support binary sensors that communicate in the frequency range of 433.92 MHz. Many cheap sensors available on the web today are based on a particular RF chip called *PT-2262*. This kind of chip is supported by the rfxtrx platform under the *Lighting4* protocol.
The rfxtrx binary sensor component provides support for those sensors.

# Setting up your devices
Once you have set up your [rfxtrx hub](/components/rfxtrx/), the easiest way to find your binary sensors is to add this to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: rfxtrx
  automatic_add: True
```

Open your local home-assistant web UI and go to the "states" page. Then make sure to trigger your sensor. You should see a new entity appear in the *Current entites* list, starting with "binary_sensor." and some hexadecimal digits. Those hexadecimal digits are your device id.

For example: "binary_sensor.0913000022670e013b70". Here your device id is `0913000022670e013b70`. Then you should update your configuration to:

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: rfxtrx
  devices:
    0913000022670e013b70:
      name: device_name
```

Do not forget to tweak the configuration variables:

- **automatic_add** (*Optional*): To enable the automatic addition of new binary sensors.
- **sensor_class** (*Optional*): The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
- **off_delay** (*Optional*): For sensors that only sends 'On' state updates, this variable sets a delay after which the sensor state will be updated back to 'Off'.
- **data_bits** (*Optional*): For PT-2262 based sensors, defines how many data bits are used by the device in its RF messages.
- **cmd_on** (*Optional*): For PT-2262 based sensors, defines the data bits value that is sent by the device upon an 'On' command.
- **cmd_off** (*Optional*): For PT-2262 based sensors, defines the data bits value that is sent by the device upon an 'Off' command.

## Managing single-signal and multiple-signal sensors
Some sensors always send the same signal. For example, a motion sensor sends "motion detected" signals, but usually does not send any "no more motion" signal. It stays "on" for a few seconds and goes back to sleep, ready to signal other motion events. Some doorbells may also only send "on" signals when the toggle switch is pressed, but no "off" signal when the switch is released.

For those devices, use the *off_delay* parameter. It defines a delay after which a device will go back to an "Off" state. That "Off" state will be fired internally by Home Assistant, just as if the device fired it by itself. If a motion sensor can fire signals once every 5 seconds, sets the *off_delay* parameter to *seconds: 5*.

Some sensors are able to send different signals for several events: some door sensors can send both
"open" and "close" signals and let you know if you have left a window opened .

Example configuration:

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: rfxtrx
  automatic_add: True
  devices:
    091300006ca2c6001080:
    name: motion_hall
    sensor_class: motion
    off_delay:
      seconds: 5
    0913000022670e013b70:
      name: window_room2
      sensor_class: opening
      data_bits: 4
      cmd_on: 0x0e
      cmd_off: 0x07
```


