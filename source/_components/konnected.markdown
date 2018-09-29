---
layout: page
title: "Konnected"
description: "Connect wired alarm sensors and siren using the NodeMCU based Konnected Alarm Panel"
date: 2018-04-03 12:30
sidebar: true
comments: false
sharing: true
footer: true
logo: konnected.png
ha_category: Alarm
ha_release: "0.70"
---

The `konnected` component lets you connect wired sensors and switches to a NodeMCU ESP8226 based device running the [open source Konnected software](https://github.com/konnected-io/konnected-security). Reuse the wired sensors and siren from an old or pre-wired alarm system installation and integrate them directly into Home Assistant.

Visit the [Konnected.io website](https://konnected.io) for more information about the Konnected Alarm Panel board and compatible hardware.

The component currently supports the following device types in Home Assistant:

- [Binary Sensor](/components/binary_sensor.konnected/): Wired door and window sensors, motion detectors, glass-break detectors, leak sensors, smoke & CO detectors or any open/close switch.
- [Switch](/components/switch.konnected/): Actuate a siren, strobe, buzzer or relay module.

This component requires the [`discovery`](https://www.home-assistant.io/components/discovery) component to be enabled.

### {% linkable_title Configuration %}

A `konnected` section must be present in the `configuration.yaml` file that specifies the Konnected devices on the network and the sensors or actuators attached to them:

```yaml
# Example configuration.yaml entry
konnected:
  access_token: REPLACE_ME_WITH_A_RANDOM_STRING
  devices:
    - id: 438a388bcd53
      binary_sensors:
        - zone: 1
          type: door
      switches:
        - zone: out
    - id: 8bcd53438a38
      binary_sensors:
        - pin: 2
          type: door
      switches:
        - pin: 5
```

{% configuration %}
access_token:
  description: Any random string. This is used to ensure that only those devices which you have configured can authenticate to Home Assistant to change a device state.
  required: true
  type: string
api_host:
  description: Override the IP address/host (and port number) of Home Assistant that the Konnected device(s) will use to communicate sensor state updates. If omitted, this is defaulted to the value of `base_url` in the `http` component. If you've set `base_url` to an external hostname, then you'll want to set this value back to your _local_ IP address and port (e.g. `http://192.168.1.101:8123`).
  required: false
  type: url
  default: value of `base_url`
devices:
  description: A list of Konnected devices that you have on your network.
  required: true
  type: list
  keys:
    id:
      description: The MAC address of the NodeMCU WiFi module with colons/punctuation removed, for example `68c63a8bcd53`. You can usually find the mac address in your router's client list. Or, check the home-assistant.log for log messages from automatically discovered devices.
      required: true
      type: string
    binary_sensors:
      description: A list of binary sensors connected to the device. See [Konnected Binary Sensor](/components/binary_sensor.konnected/) for configuration variables.
      required: false
      type: list
      keys:
        pin:
          description: The number corresponding to the _IO index_ of the labeled pin on the NodeMCU dev board. See the [NodeMCU GPIO documentation](https://nodemcu.readthedocs.io/en/master/en/modules/gpio/) for more details. Valid values are 1, 2, 5, 6, 7 and 9.
          required: exclusive
        zone:
          description: The number corresponding to the labeled zone on the [Konnected Alarm Panel](https://konnected.io) board. Valid values are `1`, `2`, `3`, `4`, `5` and `6`.
          required: exclusive
        type:
          description: Any [binary sensor](/components/binary_sensor/) class, typically `door`, `window`, `motion` or `smoke`.
          required: true
        name:
          description: The name of the device used in the front end.
          required: false
          default: automatically generated
        inverse:
          type: boolean
          description: Inverts the open/closed meaning of a binary sensor circuit. Commonly needed for normally open wired smoke alarm circuits.
          required: false
          default: false
    switches:
      description: A list of actuators (on/off switches) connected to the device. See [Konnected Switch](/components/switch.konnected/) for configuration variables.
      required: false
      type: list
      keys:
        pin:
          description: The number corresponding to the _IO index_ of the labeled pin on the NodeMCU dev board. See the [NodeMCU GPIO documentation](https://nodemcu.readthedocs.io/en/master/en/modules/gpio/) for more details. Valid values are 1, 2, 5, 6, 7 and 8.
          required: exclusive
        zone:
          description: The number corresponding to the labeled zone on the [Konnected Alarm Panel](https://konnected.io) board or the word `out` to specify the dedicated ALARM/OUT terminal on the Konnected board. Valid values are `1`, `2`, `3`, `4`, `5` and `out`.
          required: exclusive
        name:
          description: The name of the device used in the front end.
          required: false
          default: automatically generated
        activation:
          description: Either `low` or `high` to specify the state when the switch is turned on.
          default: high
          required: false
        momentary:
          description: Duration of the momentary pulse in milliseconds. To make a half-second momentary contact using a relay for a garage door opener, set this value to `500`.
          required: false
        pause:
          description: Time of the pause between pulses in milliseconds when also used with _momentary_ and _repeat_. To make a door chime "beep" with piezo buzzer, set this value to `55`, set _momentary_ to `65`, and _repeat_ to `3` or `4`.
          required: false
        repeat:
          description: Number of times to repeat a momentary pulse. Set to `-1` to make an infinite repeat. This is useful as an alarm or warning when used with a piezo buzzer.
          required: false
{% endconfiguration%}

#### {% linkable_title Configuration Notes %}

- Either **pin** or **zone** is required for each actuator or sensor. Do not use both in the same definition.
- Pin `D8` or the `out` zone will only work when activation is set to high (the default).

### {% linkable_title Extended Configuration  %}

```yaml
# Example configuration.yaml entry
konnected:
  access_token: REPLACE_ME_WITH_A_RANDOM_STRING
  devices:
    - id: 6001948bcd53
      binary_sensors:
        - zone: 1
          type: door
          name: 'Front Door'
        - zone: 2
          type: smoke
          name: 'Bedroom Smoke Detector'
          inverse: true
        - zone: 3
          type: motion
          name: 'Test Motion'
      switches:
        - zone: out
          name: siren
        - zone: 5
          name: 'Beep Beep'
          momentary: 65
          pause: 55
          repeat: 4
        - zone: 5
          name: Warning
          momentary: 65
          pause: 55
          repeat: -1
    - id: 5ccf7f438a38
      binary_sensors:
        - pin: 1
          type: motion
          name: 'Office Motion'
        - pin: 2
          type: door
          name: 'Office Door'
      switches:
        - pin: 5
          name: 'Garage Door'
          activation: low
          momentary: 500
        - pin: 8
          name: LED Light
```

### {% linkable_title Pin Mapping %}

Konnected runs on an ESP8266 board with the NodeMCU firmware. It is commonly used with the NodeMCU dev kit WiFi module and optionally Konnected's Alarm Panel hardware. The following table shows the pin mapping between the Konnected hardware labeled zones, the NodeMCU labeled pins and the ESP8266 GPIO pins.

| Konnected Alarm Panel Zone  | NodeMCU pin  | IO Index  | ESP8266 GPIO |
|---|---|---|---|
| 1 | D1  | 1  | GPIO5  |
| 2 | D2  | 2  | GPIO4  |
| 3 | D5  | 5  | GPIO14 |
| 4 | D6  | 6  | GPIO12 |
| 5 | D7  | 7  | GPIO13 |
| 6 | RX  | 9  | GPIO3  |
| ALARM or OUT | D8 | 8 | GPIO15 |

### {% linkable_title Revision History %}

#### 0.79
* Added `inverse` configuration option for binary sensors.

#### 0.77
* Added support for momentary and beep/blink switches. [[#15973](https://github.com/home-assistant/home-assistant/pull/15973)]
* Decouple entity initialization from discovery, enabling devices to recover faster after a Home Assistant reboot. [[#16146](https://github.com/home-assistant/home-assistant/pull/16146)]
* **Breaking change:** Device `id` in `configuration.yaml` must now be the full 12-character device MAC address. Previously, omitting the first 6 characters was allowed.

#### 0.72
* Adds `api_host` configuration option [[#14896](https://github.com/home-assistant/home-assistant/pull/14896)]

#### 0.70
* Initial release
