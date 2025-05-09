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
---

[WLED](https://kno.wled.ge) is a fast and feature-rich
implementation of an ESP8266/ESP32 webserver to control NeoPixel LEDs
(like WS2812B, WS2811, SK6812, and similar) and SPI based chipsets
(like WS2801 and APA102).

## Prerequisites

{% important %}
This integration requires a WLED device running WLED 0.14.0 or newer.
{% endimportant %}

You can install the latest version of WLED on your device by going to
the [WLED web installer](https://install.wled.me/) or by downloading the
latest release from the [WLED GitHub releases page](https://github.com/Aircoookie/WLED/releases).

{% include integrations/config_flow.md %}

## Lights

This {% term integration %} adds the WLED device as a light in Home Assistant.
Home Assistant treats every segment of the LED strip as a separate light
{% term entity %}.

Only native supported features of a light in Home Assistant are supported
(which includes effects).

### Using WLED segments

WLED can split a single LED strip into multiple segments. These segments can be
controlled separately in WLED and in Home Assistant as well.

If WLED has 1 segment defined (the default), that one segment controls the whole
LED strip. Home Assistant creates a single light {% term entity %} to control the
strip.

If WLED has 2 or more segments, each segment gets its own light {% term entity %} in
Home Assistant. Additionally, a master light {% term entity %} is created. This master
{% term entity %} controls the strip power and overall brightness applied to all segments.

Additionally, select and number entities described below will be created for each segment.

## Select entities

This {% term integration %} provides [select entities](/integrations/select)
for the following information from WLED:

- Playlist
- Preset
- Color palette (per segment, disabled by default).

## Number entities

This {% term integration %} provides [number entities](/integrations/number)
to control the following, segment-specific settings:

- Intensity
- Speed

## Sensor entities

This {% term integration %} provides [sensor entities](/integrations/sensor)
for the following information from WLED:

- Estimated current (in mA)
- Uptime (disabled by default)
- Free memory (in bytes, disabled by default)
- Wi-Fi Signal Strength (in %, disabled by default)
- Wi-Fi Signal Strength (RSSI in dBm, disabled by default)
- Wi-Fi Channel (disabled by default)
- Wi-Fi BSSID (disabled by default)
- IP Address

## Switches

The {% term integration %} will also create a number of
[switch entities](/integrations/switch).

### Nightlight

Toggles the WLED Timer.
Can be configured on the WLED itself under
**Settings** > **LED Preferences** > **Timed light**.

### Sync receive and sync send

Toggles the synchronization between multiple WLED devices.
Can be configured on the WLED itself under 
**Settings** > **Sync Interfaces** > **WLED Broadcast**.

[WLED Sync documentation](https://kno.wled.ge/interfaces/udp-realtime/)

## Firmware updates

The {% term integration %} has an [update entity](/integrations/update/)
that provides information on the latest available version of WLED
and indicates if a firmware update is available for installation.

The firmware update can be triggered and installed onto your WLED device
directly from Home Assistant.

The update {% term entity %} will only provide updates to stable versions,
unless you are using a beta version of WLED. In that case, the update
{% term entity %} will also provide updates to newer beta versions.

{% include integrations/option_flow.md %}

{% configuration_basic %}
Keep Master Light:
  description: Keep the master light, even if there is only 1 segment. This ensures the master light is always there, in case you are automating segments to appear and remove dynamically.
{% endconfiguration_basic %}

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
  entity_id: select.wled_palette
data:
  option: "{{ state_attr('select.wled_palette', 'options') | random }}"
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
