---
title: WLED
description: Instructions on how to integrate WLED with Home Assistant.
ha_category:
  - Light
  - Sensor
  - Switch
ha_release: 0.102
ha_iot_class: Local Polling
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@frenck'
ha_domain: wled
ha_zeroconf: true
ha_platforms:
  - light
  - sensor
  - switch
---

[WLED](https://github.com/Aircoookie/WLED) is a fast and feature-rich
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

## Sensors

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

Toggles the synchronisation between multiple WLED devices. 
Can be configured on the WLED itself under settings > Sync Interfaces > WLED Broadcast.

[WLED Sync documentation](https://github.com/Aircoookie/WLED/wiki/Sync-WLED-devices-(UDP-Notifier))

## Services

Currently, the WLED integration provides one service for controlling effect.
More services for other WLED features are expected to be added in the future.

### Service `wled.effect`

This service allows for controlling the WLED effect.

| Service Data Attribute | Required | Description                                                                                                     |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | A WLED entity ID, or list entity IDs, to apply the effect to. Use `entity_id: all` to target all WLED entities. |
| `effect`               | no       | Name or ID of the WLED light effect.                                                                            |
| `intensity`            | no       | Intensity of the effect. Number between `0` and `255`.                                                          |
| `palette`              | no       | Name or ID of the WLED light palette.                                                                           |
| `speed`                | no       | Speed of the effect. Number between `0` (slow) and `255` (fast).                                                |
| `reverse`              | no       | Reverse the effect. Either `true` to reverse or `false` otherwise.                                              |

A list of all available effects (and the behavior of the intensity for each
effect) [is documented in the WLED Wiki](https://github.com/Aircoookie/WLED/wiki/List-of-effects-and-palettes#effects).

### Service `wled.preset`

This service allows for loading a preset saved on the WLED device.

| Service Data Attribute | Required | Description                                                                                                     |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | A WLED entity ID to load the preset from.                                                                       |
| `preset`               | no       | ID of the preset slot to load from.                                                                             |

More information on presets [is documented in the WLED Wiki](https://github.com/Aircoookie/WLED/wiki/Presets)

## Example Automations

### Activating Random Effect

You can automate changing the effect using a service call like this:

{% raw %}

```yaml
service: wled.effect
target:
  entity_id: light.wled
data:
  effect: "{{ state_attr('light.wled', 'effect_list') | random }}"
```

{% endraw %}

### Activating Random Palette

Activating a random palette is a bit more complicated as there is currently no way to obtain a list of available palettes.
To go around this issue, one solution is to leverage the fact that palettes can be activated by their IDs.
As the IDs are based on an incrementing counter, picking a random number between zero and the number of palettes minus one works.

To do this, the first step is to use [WLED's JSON API](https://github.com/Aircoookie/WLED/wiki/JSON-API) find out how many palettes the device supports:

```bash
$ curl --silent http://<ip address of the wled device>/json | jq ".palettes | length"

54
```

In this case (using WLED v0.11.0) there are 54 palettes, so the following service call will activate a random palette by its ID between 0 and 53:

{% raw %}

```yaml
service: wled.effect
target:
  entity_id: light.wled
data:
  palette: "{{ range(0,53) | random }}"
```

{% endraw %}
