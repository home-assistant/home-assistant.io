---
title: Panasonic Window Air Conditioner (Hong Kong/Macau)
description: Control Panasonic window air conditioners sold in Hong Kong and Macau using an infrared transmitter.
ha_category:
  - Button
  - Climate
  - Switch
ha_release: 2026.7
ha_iot_class: Assumed State
ha_config_flow: true
ha_codeowners:
  - '@sam0737'
ha_domain: panasonic_window_ac_hk
ha_platforms:
  - button
  - climate
  - switch
ha_integration_type: device
ha_quality_scale: bronze
---

The **Panasonic Window Air Conditioner (Hong Kong/Macau)** {% term integration %} lets you control Panasonic window and through-the-wall air conditioners sold in Hong Kong and Macau (the CW-HU, CW-HZ, CW-SU, and CW-SUL families) using any infrared transmitter previously configured in Home Assistant.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the air conditioner but there is no feedback channel to confirm its current state. The integration therefore uses assumed states.

## Prerequisites

Before setting up this integration, you need a working infrared transmitter set up in Home Assistant that exposes an [Infrared](/integrations/infrared/) entity. For example, you can use an ESPHome device with an IR LED pointed at your air conditioner.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Infrared transmitter:
  description: The infrared transmitter entity to use for sending commands. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR transmitter.
{% endconfiguration_basic %}

## Supported devices

The protocol was reverse-engineered and verified on a Panasonic **CW-HU70ZA**. It uses Panasonic's generic air conditioner infrared signature, which is shared across the Hong Kong and Macau window range, so the same commands are expected to work on the other models in these families:

- **CW-HU series** (cooling and heating, with nanoeX): for example CW-HU70ZA, CW-HU90ZA.
- **CW-HZ series** (cooling and heating): for example CW-HZ90ZA.
- **CW-SU series** (cooling only): for example CW-SU70ZA, CW-SU90ZA.
- **CW-SUL series** (cooling only): for example CW-SUL90ZA.

Models without nanoeX simply ignore the nanoeX command, and cooling-only models ignore the heat mode. Only the CW-HU70ZA has been confirmed by the integration author; the other models are expected to work but are untested.

## Supported functionality

### Entities

This integration provides the following entities, grouped under a single device.

#### Climate

- **Air conditioner**
  - **Description**: The main climate entity. It controls power, operating mode, target temperature, fan speed, and swing.
  - **Modes**: Off, Auto, Cool, Dry, Heat.
  - **Target temperature**: 16–30 °C in 0.5 °C steps.
  - **Fan modes**: Auto, Low, Medium-Low, Medium, Medium-High, High.
  - **Swing modes**: Auto (the louver oscillates) and Fixed (the louver is held at its current position).

#### Switch

- **nanoeX**
  - **Description**: Turns the nanoeX air-purifying feature on or off. This setting is part of the air conditioner's full command, so toggling it re-sends the current mode, temperature, fan, and swing.

#### Buttons

- **Quiet**, **Powerful**
  - **Description**: Press to toggle the Quiet or Powerful function on the unit. These are momentary toggles sent as dedicated commands; they do not change the mode, temperature, fan, or swing.

## How it works

The integration builds the infrared signal for each command directly from a description of the protocol, rather than from pre-recorded codes:

- The carrier is approximately 38 kHz and the data uses pulse-distance encoding, least-significant-bit first, which is the standard Panasonic air conditioner format.
- A full state command is a 27-byte message, sent as two frames (8 bytes then 19 bytes) separated by a short gap, ending with a checksum byte.
- Power, mode, target temperature (in 0.5 °C steps), fan speed, swing, and nanoeX are encoded as individual fields within that message.
- Quiet and Powerful are sent as a shorter, dedicated command that carries no other settings, matching how the original remote behaves.

## Known limitations

- The integration uses assumed state, meaning Home Assistant cannot read the actual state of the air conditioner. If the unit is also operated with its physical remote, Home Assistant's view can drift out of sync.
- Whether a given unit acts on the 0.5 °C step depends on the model; some only honor whole degrees.
- Quiet and Powerful are toggles, so Home Assistant cannot know or display whether they are currently active.
- These window units have a single louver. The swing control therefore exposes only Auto and Fixed, with no separate horizontal and vertical axes.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
