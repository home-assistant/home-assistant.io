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
---

[WLED](https://github.com/Aircoookie/WLED) is a fast and feature-rich
implementation of an ESP8266/ESP32 webserver to control
NeoPixel (WS2812B, WS2811, SK6812, APA102, and similar) LED's.

While Home Assistant supports WLED 0.8.4 and higher, the use of WLED 0.10 and
newer is recommended to get the optimal experience.

## Configuration

This integration can be configured using the integrations in the
Home Assistant frontend.

Menu: **Configuration** -> **Integrations**.

In most cases, the WLED devices will be automatically discovered by
Home Assistant. Those automatically discovered WLED devices are listed
on the integrations page.

If for some reason (e.g., due to lack of mDNS support on your network),
the WLED device isn't discovered, it can be added manually.

Click on the `+` sign to add an integration and click on **WLED**.
After completing the configuration flow, the WLED
integration will be available.

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
- Wi-Fi Signal Strength (in %m disabled by default).
- Wi-Fi Signal Strength (RSSI in dBm).
- Wi-Fi Channel (disabled by default).
- Wi-Fi BSSID (disabled by default).

## Switches

The integration will create a number of switches:

- Nightlight.
- Sync Receive.
- Sync Send.

## Services

Currently, the WLED integration provides one service for controlling effect.
More services for other WLED features are expected to be added in the future.

### Service `wled.effect`

This service allows for controlling the WLED effect.

| Service Data Attribute | Required | Description                                                                                                     |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | A WLED entity ID, or list entity IDs, to apply the effect to. Use `entity_id: all` to target all WLED entities. |
| `effect`               | no       | Name or ID of the WLED light effect.                                                                            |
| `intensity`            | no       | Intensity of the effect.                                                                                        |
| `speed`                | no       | Speed of the effect. Number between `0` (slow) and `255` (fast).                                                |
| `reverse`              | no       | Reverse the effect. Either `true` to reverse or `false` otherwise.                                              |

A list of all available effects (and the behavior of the intensity for each
effect) [is documented in the WLED Wiki](https://github.com/Aircoookie/WLED/wiki/List-of-effects-and-palettes#effects).
