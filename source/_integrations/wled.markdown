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
ha_quality_scale: platinum
ha_codeowners:
  - '@frenck'
ha_domain: wled
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - light
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: integration
---

[WLED](https://kno.wled.ge) is a fast and feature-rich
implementation of an ESP8266/ESP32 webserver to control
NeoPixel (WS2812B, WS2811, SK6812, APA102, and similar) LED's.

While Home Assistant supports WLED 0.8.4 and higher, the use of WLED 0.10 and
newer is recommended to get the optimal experience.

{% include integrations/config_flow.md %}

## Lights

This integration adds the WLED device as a light in Home Assistant.
Home Assistant treats every segment of the LED strip as a separate light
entity.

Only native supported features of a light in Home Assistant are supported
(which includes effects).

### Using WLED segments

WLED can split a single LED strip into multiple segments.
These segments can be controlled separately in WLED and in Home Assistant as
well. The fully-featured segment control has been introduced in WLED 0.10
but has been partly around via APIs since WLED 0.8.6.

If WLED has 1 segment defined (the default), that one segment controls the whole
LED strip. Home Assistant creates a single light entity to control the
strip.

If WLED has 2 or more segments, each segment gets its own light entity in
Home Assistant. Additionally, a master light entity is created. This master
entity controls the strip power and overall brightness applied to all segments.

Additionally, select and number entities described below will be created for each segment.

## Select Entities

This integration provides selects for the following information from WLED:

- Playlist
- Preset
- Color palette (per segment, disabled by default).

## Number Entities

This integration provides `number` entities to control the following, segment-specific settings:

- Intensity
- Speed

## Sensor Entities

This integration provides sensors for the following information from WLED:

- Estimated current (in mA).
- Uptime (disabled by default)
- Free memory (in bytes, disabled by default).
- Wi-Fi Signal Strength (in %, disabled by default).
- Wi-Fi Signal Strength (RSSI in dBm, disabled by default).
- Wi-Fi Channel (disabled by default).
- Wi-Fi BSSID (disabled by default).

## Switches

The integration will create a number of switches:

### Nightlight

Toggles the WLED Timer.
Can be configured on the WLED itself under settings > LED Preferences > Timed light.

### Sync Receive and Sync Send

Toggles the synchronization between multiple WLED devices.
Can be configured on the WLED itself under settings > Sync Interfaces > WLED Broadcast.

[WLED Sync documentation](https://kno.wled.ge/interfaces/udp-realtime/)

## Firmware Updates

The integration has an [update entity](/integrations/update/) that provides
information on the latest available version of WLED and indicates if a
firmware update is available for installation.

The firmware update can be triggered and installed onto your WLED device
directly from Home Assistant.

The update entity will only provide updates to stable versions, unless you are
using a beta version of WLED. In that case, the update entity will also provide
updates to newer beta versions.

{% include integrations/option_flow.md %}

{% configuration_basic %}
Keep Master Light:
  description: Keep the master light, even if there is only 1 segment. This ensures the master light is always there, in case you are automating segments to appear and remove dynamically.
{% endconfiguration_basic %}
## Example Automations

### Activating Random Effect

You can automate changing the effect using a service call like this:

{% raw %}

```yaml
service: light.turn_on
target:
  entity_id: light.wled
data:
  effect: "{{ state_attr('light.wled', 'effect_list') | random }}"
```

{% endraw %}

### Activating Random Palette

Activating a random palette is very similar to the above random effect,
and can be done by selecting a random one from the available palette select
entity.

{% raw %}

```yaml
service: select.select_option
target:
  entity_id: select.wled_palette
data:
  option: "{{ state_attr('select.wled_palette', 'options') | random }}"
```

{% endraw %}

### Activating a preset

Activating a preset is an easy way to set a WLED light to a specific
configuration. Here is an example service call to set a WLED light 
to a preset called My Preset:

```yaml
- service: light.turn_on
  target:
    entity_id: light.wled
- service: select.select_option
  target:
    entity_id: select.wled_preset
  data:
    option: "My Preset"
```

### Automation Using Specific Palette Name

An automation to turn on a WLED light and select a specific palette and
set intensity, and speed can be created by first calling the `light.turn_on`
service, then calling the `select.select_option` service to select the
palette, then call the `number.set_value` service to set the intensity
and again to set the speed. 

Here is an example of all of these put together into an automation:

```yaml
- alias: "Turn on WLED rain effect when weather changes to rainy"
  trigger:
    - platform: state
      entity_id: sensor.weather_condition
      to: "rainy"
  action:
    - service: light.turn_on
      target:
        entity_id: light.wled
      data:
        effect: "Rain"
    - service: select.select_option
      target:
        entity_id: select.wled_color_palette
      data:
        option: "Breeze"
    - service: number.set_value
      target:
        entity_id: number.wled_intensity
      data:
        value: 200
    - service: number.set_value
      target:
        entity_id: number.wled_speed
      data:
        value: 255
```
