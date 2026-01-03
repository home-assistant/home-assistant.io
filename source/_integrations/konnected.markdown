---
title: Konnected.io
description: Connect wired alarm sensors and siren using the NodeMCU based Konnected Alarm Panel
ha_category:
  - Alarm
  - Binary sensor
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_release: '0.70'
ha_codeowners:
  - '@heythisisnate'
ha_config_flow: true
ha_domain: konnected
ha_ssdp: true
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: integration
---

The `konnected` integration lets you connect wired sensors and switches to a Konnected Alarm Panel, or NodeMCU ESP8226 based device running the [open source Konnected software](https://github.com/konnected-io/konnected-security). Reuse the wired sensors and siren from an old or pre-wired alarm system installation and integrate them directly into Home Assistant.

{% warning %}

This integration is deprecated in favor of [Konnected's ESPHome firmware](https://support.konnected.io/add-a-konnected-device-to-home-assistant-with-esphome) and will not receive updates. ESPHome connects locally and natively to Home Assistant and doesn't need this custom integration. If you are getting started with a Konnected device, do not use this integration. Instead, flash your device with ESPHome-based firmware for the [Konnected Alarm Panel](https://install.konnected.io/esphome) and [Garage Door Opener](https://support.konnected.io/installing-the-garage-door-opener-with-home-assistant).
{% endwarning %}

Visit the [Konnected.io website](https://konnected.io) for more information about the Konnected Alarm Panel board and compatible hardware.

{% important %}
Always ensure your panel is running the [latest firmware](https://help.konnected.io/support/solutions/folders/32000035066) before connecting it to Home Assistant.
{% endimportant %}

The integration currently supports the following device types in Home Assistant:

- Binary sensor: Wired door and window sensors, motion detectors, glass-break detectors, leak sensors, smoke & CO detectors or any open/close switch.
- Switch: Actuate a siren, strobe, buzzer or relay module.
- Sensor: Periodic measurements from DHT temperature/humidity sensors and DS18B20 temperature sensors.

This integration uses the [SSDP](/integrations/ssdp) integration, which must be enabled for device discovery to work. If you don't want to use SSDP you'll need to manually provide the IP and Port information for each Konnected Panel. The IP/Port info can be found using the Konnected mobile app.

{% note %}
Konnected devices communicate with Home Assistant over your local LAN -- there is no cloud component! For best performance we recommend allowing unsecured HTTP API traffic between Konnected devices and Home Assistant on your LAN. This means that you should not use the `http` integration to serve SSL/TLS certificates. Instead, use a proxy like NGINX or Caddy to serve SSL/TLS. [Read more.](https://help.konnected.io/support/solutions/articles/32000023964-set-up-hass-io-with-secure-remote-access-using-duckdns-and-nginx-proxy)
{% endnote %}

## Configuration

### Web Interface

Starting with 0.106.0 Home Assistant requires UI-based configuration of Konnected via **Settings** > **Devices & services** in the Home Assistant (web) frontend. If you have Konnected Alarm Panels on your LAN, or in your configuration.yaml, you will see one or more **Konnected.io** entries appear in the **Discovered** integrations list.

Selecting one of these discovered panels will guide you through connecting and configuring the panel. If your panel was discovered via SSDP, you shouldn't need any information to complete configuration - simply confirm that the information displayed is correct. If the UI prompts you for IP/Port, you'll need to enter it. IP/Port info can be found using the Konnected mobile app.

{% note %}
If you have an existing `configuration.yaml` completing the UI configuration will do a one time import of the settings contained in `configuration.yaml`. Once the import creates a **Configured** integration the Konnected section of the `configuration.yaml` is no longer used - it is recommended to remove the `konnected` section of `configuration.yaml` and after the import occurs. Any future changes to settings should occur via the settings provided in the Home Assistant web interface.

If you want to retain `configuration.yaml` and need to re-import any changes or updates, you will need to delete the entry in **Settings** > **Devices & services** > **Configured** and repeat the UI configuration for that device.
{% endnote %}

Once configuration is completed, you'll see a Konnected.io entry in **Settings** > **Devices & services** > **Configured**.  If you imported settings from `configuration.yaml`, you are now done! If you are setting up a new Konnected Alarm Panel or modifying settings, you'll need to utilize the settings UI to configure zone behavior.

#### Using Settings UI to Configure Zone Behavior

The settings for each panel can be accessed by selecting the entry in **Settings** > **Devices & services** > **Configured** and then clicking on the gear icon in the upper right corner. You can reconfigure these settings at any time, and once completed, the settings will be immediately applied.

The settings UI starts by having you configure the general behavior of each zone. You need to specify `Disabled`, `Binary Sensor`, `Digital Sensor`, or `Switchable Output` for each zone.  After that, you'll be prompted, for each zone that is not disabled, to configure details of the zones' behavior. All zones will allow entry of a Name. Additional fields depend on how you configured the general behavior of the zone.  
**Note some zones do not support all behaviors. The UI will reflect specific options available to each zone.**

##### Binary sensor:

**Binary sensor type:** The type of sensor connected to the zone.

**Name (optional)** The friendly name for the entity associated with the zone.

**Invert the open/close state:** Inverts the open/closed meaning of a binary sensor circuit. Commonly needed for normally open wired smoke alarm circuits.

##### Digital Sensor:

**Sensor Type:** The type of sensor connected to the zone - either `dht` or `ds18b20`.

**Name (optional)** The friendly name for the entities associated with the zone.

**Poll Interval (optional):** How often in minutes to poll the sensor for updates.

##### Switchable Output:

**Name: (optional)** The friendly name for the entity associated with the zone.

**Output when on:** The state of the switch when activated.

**Pulse Duration (optional):** The duration in ms to pulse the switch once activated.

**Pause between pulses (optional):** The duration in ms to wait between pulses when activated.

**Times to repeat (optional):** The number of times to repeat the pulse each time the switch is activated.

**Configure additional states for this zone:** Selecting "No" will complete configuration for the zone and proceed to options for the next zone. Select "Yes" if you need to create additional output states for this zone.  

#### Using Settings UI to Configure Additional Panel Behavior

Once all zones are configured you'll be presented with the configuration for additional panel behaviors.

**Blink panel LED on when sending state change:** The desired LED behavior for the panel.

**Override default Home Assistant API host panel URL:** The Konnected Alarm Panel post sensor states back to the Home Assistant API. If this value is unchecked the panel will default postbacks using the URL [configured](/integrations/homeassistant/#allowlist_external_urls) in Home Assistant. By default, the integration will use the internal URL. However, if you check this field and set the **Override API host URL** to your _local_ IP address and port (e.g., `http://192.168.1.101:8123`), it will be used instead of the internal URL.

**Override API host URL (optional):** The host info to use if you checked **Override default Home Assistant API host panel URL** in the step above. This is ignored if **Override default Home Assistant API host panel URL** is unchecked.

### YAML configuration

If you prefer you can utilize a `konnected` section in the `configuration.yaml` file that specifies the Konnected devices on the network and the sensors or actuators attached to them. If using `configuration.yaml` the configuration will be one-time imported when going through the Configuration Flow for the panel. **Note that you must still complete the UI based setup before the integration will be configured and entities created/accessible.**

Details of the configuration fields and values can be found below.
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
  description: Override the IP address/host (and port number) of Home Assistant that the Konnected device(s) will use to communicate sensor state updates. If omitted, this is defaulted to the value of internal URL from the Home Assistant configuration is used.
  required: false
  type: string
  default: value of internal URL
devices:
  description: A list of Konnected devices that you have on your network.
  required: true
  type: list
  keys:
    id:
      description: The MAC address (Konnected Alarm Panel) or Device ID (Konnected Alarm Panel Pro) of the Konnected device. MAC addresses must be formatted with colons/punctuation removed, for example, `68c63a8bcd53`. You can usually find the mac address in your router's client list. Or, check the `home-assistant.log` for log messages from automatically discovered devices. Device ID can be found on the device Status Page which is accessible via the Konnected Mobile App.
      required: true
      type: string
    binary_sensors:
      description: A list of binary sensors connected to the device. See [Konnected Binary Sensor](/integrations/konnected#binary-sensor) for configuration variables.
      required: false
      type: list
      keys:
        pin:
          description: See [Configuration Notes](#configuration-notes).
          required: exclusive
        zone:
          description: See [Configuration Notes](#configuration-notes).
          required: exclusive
        type:
          description: Any [binary sensor](/integrations/binary_sensor/) class, typically `door`, `window`, `motion` or `smoke`.
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
          description: See [Configuration Notes](#configuration-notes).
          required: exclusive
        zone:
          description: See [Configuration Notes](#configuration-notes).
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
      description: A list of actuators (on/off switches) connected to the device. See [Konnected Switch](/integrations/konnected#switch) for configuration variables.
      required: false
      type: list
      keys:
        pin:
          description: See [Configuration Notes](#configuration-notes).
          required: exclusive
        zone:
          description: See [Configuration Notes](#configuration-notes).
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

### Configuration Notes

- Either `pin` or `zone` is required for each actuator or sensor. Do not use both in the same definition.
- `pin` represents the number corresponding to the _IO index_ of the labeled pin on the NodeMCU dev board. See the [NodeMCU GPIO documentation](https://nodemcu.readthedocs.io/en/release/modules/gpio/) for more details. Valid values are `1`, `2`, `5`, `6`, `7`, `8`, and `9`. Pin based configuration is only allowed with ESP8266 based devices.
- Pin `D8` or the `out` zone will only work when activation is set to high (the default).
- `zone` represents the value corresponding to the labeled zone on the [Konnected Alarm Panel](https://konnected.io) boards. Valid zone values are `1`, `2`, `3`, `4`, `5`, `6`, and `out` for the Konnected Alarm Panel (`out` represents the dedicated ALARM/OUT terminal) and `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `out1`, `alarm1`, and `alarm2_out2` for the Konnected Alarm Panel Pro.
- **The Konnected Alarm Panel Pro does not support configuration via `pin`.**

## Extended Configuration

```yaml
# Example configuration.yaml entry
konnected:
  access_token: REPLACE_ME_WITH_A_RANDOM_STRING
  devices:
    - id: 6001948bcd53
      binary_sensors:
        - zone: 1
          type: door
          name: "Front Door"
        - zone: 2
          type: smoke
          name: "Bedroom Smoke Detector"
          inverse: true
        - zone: 3
          type: motion
          name: "Test Motion"
      switches:
        - zone: out
          name: siren
        - zone: 5
          name: "Beep Beep"
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

## Unique IDs and the Entity Registry

Beginning in Home Assistant release 0.90, unique IDs are generated for each sensor or switch entity. This enables end users to modify the entity names and entity IDs through the Home Assistant UI at **Settings** -> **Devices & services** -> **Entities**.

Unique IDs are internally generated as follows:

**Binary Sensors**: `{mac-address}-{zone-number}`

**Switches**: `{mac-address}-{unique-hash}`*

**DHT Sensors**: `{mac-address}-{pin-number}-{temperature|humidity}`

**DS18B20 Sensors**: `{sensor-serial-number}`

\* Switches are identified by a unique hash including the pin number, `momentary`, `pause`, and `repeat` values. If these values are modified, a new entity will be created and the old entity must be removed manually from the _Entity Registry_.  

## Pin Mapping

Konnected runs on an ESP8266 board with the NodeMCU firmware. It is commonly used with the NodeMCU dev kit Wi-Fi module and optionally Konnected's Alarm Panel hardware. The following table shows the pin mapping between the Konnected hardware labeled zones, the NodeMCU labeled pins and the ESP8266 GPIO pins.

| Konnected Alarm Panel Zone | NodeMCU pin | IO Index | ESP8266 GPIO |
| -------------------------- | ----------- | -------- | ------------ |
| 1                          | D1          | 1        | GPIO5        |
| 2                          | D2          | 2        | GPIO4        |
| 3                          | D5          | 5        | GPIO14       |
| 4                          | D6          | 6        | GPIO12       |
| 5                          | D7          | 7        | GPIO13       |
| 6                          | RX          | 9        | GPIO3        |
| ALARM or OUT               | D8          | 8        | GPIO15       |

## Binary Sensor

The `konnected` binary sensor allows you to monitor wired door sensors, window sensors, motion sensors, smoke detectors, CO detectors, glass-break sensors, water leak sensors or any other simple wired open/close circuit attached to a NodeMCU ESP8266 Wi-Fi module running the [open source Konnected software](https://github.com/konnected-io/konnected-security).

This integration supports all of the built-in device classes of the generic [Binary Sensor](/integrations/binary_sensor/) integration.

## Switch

The `konnected` switch platform allows you to actuate an alarm system siren, strobe light, buzzer or any other wired device using a [Konnected Alarm Panel board](https://konnected.io) or relay module and a NodeMCU ESP8266 Wi-Fi module running the [open source Konnected software](https://github.com/konnected-io/konnected-security).
