---
title: WLED
description: Instructions on how to integrate WLED with Home Assistant.
ha_category:
  - Light
  - Sensor
  - Switch
  - Update
ha_release: 0.102
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@frenck'
  - '@mik-laj'
ha_domain: wled
ha_zeroconf: true
ha_platforms:
  - button
  - diagnostics
  - light
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: device
ha_quality_scale: platinum
---

[WLED](https://kno.wled.ge) is a fast and feature-rich
implementation of an ESP8266/ESP32 webserver to control NeoPixel LEDs
(like WS2812B, WS2811, SK6812, and similar) and SPI based chipsets
(like WS2801 and APA102).

## Use cases

WLED can enhance your home automation in many ways:

- Ambient lighting effects: Create dynamic lighting scenes that respond to music, time of day, or events in your home, adding atmosphere to any room.
- Status indicators: Use different colors and effects to visualize information, such as showing your Home Assistant status, upcoming weather conditions, or calendar events.
- Entertainment and games: Control LED strips during movie nights, gaming sessions, or parties with synchronized effects and color changes.
- Energy-efficient accent lighting: Replace traditional accent lighting with power-efficient LED strips while maintaining full control and automation.
- Smart home notifications: Set up visual alerts by triggering specific light effects when important events occur, like doorbell presses or security alerts.

## Prerequisites

{% important %}
This integration requires a WLED device running WLED 0.14.0 or newer.
{% endimportant %}

You can install the latest version of WLED on your device by going to
the [WLED web installer](https://install.wled.me/) or by downloading the
latest release from the [WLED GitHub releases page](https://github.com/wled/WLED/releases).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "Hostname or IP address of your WLED device."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Keep Master Light:
  description: Keep the master light (the main light entity that controls the entire WLED device), even if there is only 1 segment. This ensures the master light is always there, in case you are automating segments to be added and removed dynamically.
{% endconfiguration_basic %}

## Supported functionality

The **WLED** integration provides the following entities.

### Lights

This {% term integration %} adds the WLED device as a light in Home Assistant.
Home Assistant treats every segment of the LED strip as a separate light
{% term entity %}.

Only native supported features of a light in Home Assistant are supported
(which includes effects).

#### Using WLED segments

WLED can split a single LED strip into multiple segments. These segments can be
controlled separately in WLED and in Home Assistant as well.

If WLED has 1 segment defined (the default), that one segment controls the whole
LED strip. Home Assistant creates a single light {% term entity %} to control the
strip.

If WLED has 2 or more segments, each segment gets its own light {% term entity %} in
Home Assistant. Additionally, a master light {% term entity %} is created. This master
{% term entity %} controls the strip power and overall brightness applied to all segments.

Additionally, select, number, and switch entities described below will be created for each segment.

### Selects

This {% term integration %} provides [select entities](/integrations/select)
for the following information from WLED:

- Live override: Controls how WLED handles incoming real-time data (off, on, or until device restarts).
- Playlist: Activates a playlist configured on the WLED device.
- Preset: Activates a preset configured on the WLED device.
- Color palette (per segment): Selects the color palette used by the current effect.

### Numbers

This {% term integration %} provides [number entities](/integrations/number)
to control the following, segment-specific settings:

- Intensity
- Speed

### Sensors

This {% term integration %} provides [sensor entities](/integrations/sensor)
for the following information from WLED:

- Estimated current (in mA, only when a automatic brightness limiter is configured on the device)
- Max current (in mA, only when a automatic brightness limiter is configured on the device)
- LED count
- Uptime (disabled by default)
- Free memory (in bytes, disabled by default)
- Wi-Fi Signal Strength (in %, disabled by default)
- Wi-Fi Signal Strength (RSSI in dBm, disabled by default)
- Wi-Fi Channel (disabled by default)
- Wi-Fi BSSID (disabled by default)
- IP Address

### Switches

The {% term integration %} will also create a number of
[switch entities](/integrations/switch).

#### Nightlight

Toggles the WLED nightlight feature, which gradually dims the lights over a configurable duration.

Can be configured on the WLED itself under
**Settings** > **LED Preferences** > **Timed light**.

#### Sync receive and sync send

Toggles the synchronization between multiple WLED devices.
Can be configured on the WLED itself under 
**Settings** > **Sync Interfaces** > **WLED Broadcast**.

[WLED Sync documentation](https://kno.wled.ge/interfaces/udp-notifier/)

#### Reverse

Reverses the direction of the LED effect on a segment. One switch is created per segment.

### Buttons

This {% term integration %} provides a [button entity](/integrations/button)
to restart the WLED device.

### Updates

The {% term integration %} has an [update entity](/integrations/update/)
that provides information on the latest available version of WLED
and indicates if a firmware update is available for installation.

The firmware update can be triggered and installed onto your WLED device
directly from Home Assistant.

The update {% term entity %} will only provide updates to stable versions,
unless you are using a beta version of WLED. In that case, the update
{% term entity %} will also provide updates to newer beta versions.

## Data updates

By default, official WLED builds enable the WebSocket server, which lets the integration receive real-time updates ("push" data) directly from the device.

When the integration starts, it first tries to connect by using [WebSocket](https://kno.wled.ge/interfaces/websocket/). If the device firmware does not support WebSockets, like a custom WLED build compiled without that feature, the integration automatically falls back to {% term polling %} and fetches data every 10 seconds by default.
Information about new WLED releases is checked independently, once every 3 hours, regardless of the number of connected devices.

## Known limitations

- WLED exposes a single color model per segment in Home Assistant.
  This means that **mixed-type LED strips** — for example **RGB + CCT** or **RGBW + CCT** combinations — cannot currently have their RGB and CCT channels controlled independently in Home Assistant.
  When such strips are used, only one color temperature or hue is active at a time.

- The integration relies on the WLED JSON API.
  Custom WLED builds that disable or remove parts of the API, such as turning off the JSON interface in favor of HTTP + MQTT only, are not supported.

- Real-time effects that depend on **sound-reactive** or **2D matrix** features appear in the effect list, but may not behave correctly if the WLED instance was not compiled with those capabilities.

- [Custom palettes](https://kno.wled.ge/features/palettes/#custom-palettes) uploaded to the WLED device (JSON files named `palette0.json` through `palette9.json`) are not supported by the integration. Only the built-in palettes are available in the color palette select entity.

- Custom segment names configured in WLED are not used by the integration. Segments are always named using their index (for example, "Segment 1", "Segment 2"), regardless of any names assigned in the WLED interface.

- The integration does not support controlling WLED usermods, such as the AudioReactive usermod. Features like toggling the microphone on or off are not available.

- There is no segment master control to apply changes (color, effect, brightness) to all segments in a single action. To control multiple segments at once, you can group them using a [light group](/integrations/group#light-group), though this sends separate requests per segment and may result in less smooth transitions compared to WLED's native multi-segment control.

## Supported devices

The integration requires **WLED version 0.14.0 or newer**.
Official WLED releases for ESP8266 and ESP32 are fully supported.

Most standard digital LED chipsets supported by WLED—such as **WS2812B**, **WS2811**, **SK6812**, **APA102**, or **WS2801**—work correctly with all features exposed in Home Assistant.

Some LED configurations, however, have limited functionality:

- **Analog RGB + CCT** or **digital RGBCCT** strips, such as **WS2508** or hybrid **RGB + CCT** setups, cannot be controlled with separate sliders for color and color temperature.
Home Assistant can only manage one color model at a time.

## Example automations

### Activating random effect

You can automate changing the effect using an action like this:

{% raw %}

```yaml
action: light.turn_on
target:
  entity_id: light.wled
data:
  effect: "{{ state_attr('light.wled', 'effect_list') | random }}"
```

{% endraw %}

It is recommended to select an effect that matches the capabilities of your WLED device (e.g., 1D, 2D, or Sound Reactive). You can refer to the [WLED effect list](https://kno.wled.ge/features/effects/) to explore available options. Once you identify compatible effects, you can randomize them based on their IDs.

Below is an example of how to select a random effect with an ID between 1 and 117, excluding retired effects:

{% raw %}

```yaml
action: light.turn_on
target:
  entity_id: light.wled
data:
  effect: "{{ state_attr('light.wled', 'effect_list')[1:118] | reject('equalto', 'RSVD') | list | random }}"
```

{% endraw %}

### Activating random palette

Activating a random palette is very similar to the above random effect,
and can be done by selecting a random one from the available palette select
{% term entity %}.

{% raw %}

```yaml
action: select.select_option
target:
  entity_id: select.wled_color_palette
data:
  option: "{{ state_attr('select.wled_color_palette', 'options') | random }}"
```

{% endraw %}

### Activating a preset

Activating a preset is an easy way to set a WLED light to a specific
configuration. Here is an example action to set a WLED light 
to a preset called My Preset:

```yaml
- action: light.turn_on
  target:
    entity_id: light.wled
- action: select.select_option
  target:
    entity_id: select.wled_preset
  data:
    option: "My Preset"
```

When a preset is activated and the light state is modified afterward 
(e.g. with a `light.turn_on` action), the preset may be reset to an empty value. 
This can affect services such as `select.select_next`, which will start again 
from the first option instead of continuing the cycle.

### Automation using specific palette name

An automation to turn on a WLED light and select a specific palette and
set intensity, and speed can be created by first calling the `light.turn_on`
action, then calling the `select.select_option` action to select the
palette, then call the `number.set_value` action to set the intensity
and again to set the speed. 

Here is an example of all of these put together into an automation:

```yaml
- alias: "Turn on WLED rain effect when weather changes to rainy"
  triggers:
    - trigger: state
      entity_id: sensor.weather_condition
      to: "rainy"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.wled
      data:
        effect: "Rain"
    - action: select.select_option
      target:
        entity_id: select.wled_color_palette
      data:
        option: "Breeze"
    - action: number.set_value
      target:
        entity_id: number.wled_intensity
      data:
        value: 200
    - action: number.set_value
      target:
        entity_id: number.wled_speed
      data:
        value: 255
```

## Troubleshooting

### Failed to set up the device due to MAC address mismatch

#### Symptom

**"Failed to set up: MAC address does not match the configured device. Expected to connect to device with MAC: XX:XX:XX:XX:XX:01, but connected to device with MAC: XX:XX:XX:XX:XX:02."**

When setting up or loading the integration, Home Assistant reports that the MAC address of the connected device does not match the MAC address stored in the configuration.

#### Description

This error indicates that Home Assistant connected to a different device than expected while using the same IP address.

The most common cause is DHCP address reuse. This usually happens when:

- The original device was offline or temporarily disconnected.
- The router reassigned its IP address to another device.
- Home Assistant attempted to connect to the old IP address and reached a different device with a different MAC address.

To avoid controlling or communicating with the wrong device, the integration validates the MAC address and stops the setup if it does not match the configured one.

#### Resolution

To resolve this issue, follow these steps:

1. Open the integration settings in Home Assistant.
2. Select **Reconfigure** from the menu of the affected integration.
3. Verify the currently configured IP address.
4. Enter the correct IP address of the device if it has changed.
5. Submit the form to update the configuration.

If you are unsure about the correct IP address, you can try the following:

- Check your router or DHCP server for the device's current IP assignment.
- Ensure the IP address matches the device you are configuring.

To reduce the chance of this issue happening again, you can:

- Configure a DHCP reservation for the device in your router.
- Assign a static IP address to the device.
In many cases, this issue resolves automatically. When Home Assistant discovers the device at a new IP address, the integration may update the configuration on its own and restore the connection without manual action.

If the error persists, reconfiguring the integration with the correct IP address is required.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
