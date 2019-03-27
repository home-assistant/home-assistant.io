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
ha_category:
  - Alarm
  - Binary Sensor
  - Switch
  - Sensor
ha_release: "0.70"
redirect_from:
  - /components/binary_sensor.konnected/
  - /components/switch.konnected/
---

The `konnected` component lets you connect wired sensors and switches to a NodeMCU ESP8226 based device running the [open source Konnected software](https://github.com/konnected-io/konnected-security). Reuse the wired sensors and siren from an old or pre-wired alarm system installation and integrate them directly into Home Assistant.

Visit the [Konnected.io website](https://konnected.io) for more information about the Konnected Alarm Panel board and compatible hardware.

The component currently supports the following device types in Home Assistant:

- Binary Sensor: Wired door and window sensors, motion detectors, glass-break detectors, leak sensors, smoke & CO detectors or any open/close switch.
- Switch: Actuate a siren, strobe, buzzer or relay module.
- Sensor: Periodic measurements from DHT temperature/humidity sensors and DS18B20 temperature sensors.

This component uses the [`discovery`](/components/discovery) component, which must be enabled for device discovery to work. If you don't want to use discovery, set the _host_ and _port_ for each device in the description.  

<p class='note info'>
Konnected devices communicate with Home Assistant over your local LAN -- there is no cloud component! For best performance we recommend allowing unsecured HTTP API traffic between Konnected devices and Home Assistant on your LAN. This means that you should not use the `http` component to serve SSL/TLS certificates. Instead, use a proxy like Nginx or Caddy to serve SSL/TLS. [Read more.](https://help.konnected.io/support/solutions/articles/32000023964-set-up-hass-io-with-secure-remote-access-using-duckdns-and-nginx-proxy)  
</p>

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
  description: Override the IP address/host (and port number) of Home Assistant that the Konnected device(s) will use to communicate sensor state updates. If omitted, this is defaulted to the value of `base_url` in the `http` component. If you've set `base_url` to an external hostname, then you'll want to set this value back to your _local_ IP address and port (e.g., `http://192.168.1.101:8123`).
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
          description: The number corresponding to the _IO index_ of the labeled pin on the NodeMCU dev board. See the [NodeMCU GPIO documentation](https://nodemcu.readthedocs.io/en/master/en/modules/gpio/) for more details. Valid values are `1`, `2`, `5`, `6`, `7` and `9`.
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
    sensors:
      description: A list of digital sensors (currently supports DHT and DS18B20 sensors) connected to the device
      required: false
      type: list
      keys:
        pin:
          description: The number corresponding to the _IO index_ of the labeled pin on the NodeMCU dev board. See the [NodeMCU GPIO documentation](https://nodemcu.readthedocs.io/en/master/en/modules/gpio/) for more details. Valid values for sensors are `1`, `2`, `5`, `6`, `7` and `9`.
          required: exclusive
        zone:
          description: The number corresponding to the labeled zone on the [Konnected Alarm Panel](https://konnected.io) board. Valid values for sensors are `1`, `2`, `3`, `4`, `5` and `6`.
          required: exclusive
        name:
          description: The name of the device used in the front end.
          required: false
          default: automatically generated
        type:
          description: The type of sensor. Valid values are `dht` or `ds18b20`
          required: true
        poll_interval:
          type: integer
          description: The frequency (in minutes) that the Konnected device will report sensor data. Minimum `1` minute. _Note:_ this is only implemented for `dht` sensors.
          required: false
          default: not set (device default is 3 minutes)
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
    host: 
      type: string
      required: false
      description: Optionally specify the Konnected device's IP address or hostname to set up without discovery.
    port:
      type: integer
      required: false
      description: Optionally specify the port number for the Konnected API on the device. Note that the port is different on every device. See help.konnected.io to learn how to determine the port number.
    discovery:
      type: boolean
      required: false
      default: true
      description: Enable or disable discovery for this device. When `true`, the device will respond to discovery requests on your network. When `false`, the device will not respond to discovery requests, so it's important that you set reserved IP for the device and configure the _host_ and _port_ here.
    blink:
      type: boolean
      required: false
      default: true
      description: Blink the blue LED upon successful transmission of a state change.

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
          name: Office Motion
        - pin: 2
          type: door
          name: Office Door
      switches:
        - pin: 5
          name: Garage Door
          activation: low
          momentary: 500
        - pin: 8
          name: LED Light
      sensors:
        - pin: 6
          name: Kitchen
          type: dht
          
```

### {% linkable_title Unique IDs and the Entity Registry %}

Beginning in Home Assistant release 0.90, unique IDs are generated for each sensor or switch entity. This enables end users to modify the entity names and entity IDs through the Home Assistant UI on the _Entity Registry_ page (under _Configuration_).

Unique IDs are internally generated as follows:

**Binary Sensors**: `{mac-address}-{zone-number}`

**Switches**: `{mac-address}-{unique-hash}`*

**DHT Sensors**: `{mac-address}-{pin-number}-{temperature|humidity}`

**DS18B20 Sensors**: `{sensor-serial-number}`

\* Switches are identified by a unique hash including the pin number, `momentary`, `pause`, and `repeat` values. If these values are modified, a new entity will be created and the old entity must be removed manually from the _Entity Registry_.  

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

#### 0.91

- Improved Unique ID generation for Konnected switches

#### 0.90

- Added support for `dht` and `ds18b20` temperature sensors
- Added Unique IDs

#### 0.80

- Added ability to specify `host` and `port` to set up devices without relying on discovery.
- Added `discovery` and `blink` config options to enable/disable these features.

#### 0.79

- Added `inverse` configuration option for binary sensors.

#### 0.77

- Added support for momentary and beep/blink switches. [[#15973](https://github.com/home-assistant/home-assistant/pull/15973)]
- Decouple entity initialization from discovery, enabling devices to recover faster after a Home Assistant reboot. [[#16146](https://github.com/home-assistant/home-assistant/pull/16146)]
- **Breaking change:** Device `id` in `configuration.yaml` must now be the full 12-character device MAC address. Previously, omitting the first 6 characters was allowed.

#### 0.72

- Adds `api_host` configuration option [[#14896](https://github.com/home-assistant/home-assistant/pull/14896)]

#### 0.70

- Initial release

### {% linkable_title Binary Sensor %}

The `konnected` binary sensor allows you to monitor wired door sensors, window sensors, motion sensors, smoke detectors, CO detectors, glass-break sensors, water leak sensors or any other simple wired open/close circuit attached to a NodeMCU ESP8266 WiFi module running the [open source Konnected software](https://github.com/konnected-io/konnected-security).

This component supports all of the built-in device classes of the generic [Binary Sensor](/components/binary_sensor/) component.

### {% linkable_title Switch %}

The `konnected` switch platform allows you to actuate an alarm system siren, strobe light, buzzer or any other wired device using a [Konnected Alarm Panel board](https://konnected.io) or relay module and a NodeMCU ESP8266 WiFi module running the [open source Konnected software](https://github.com/konnected-io/konnected-security).