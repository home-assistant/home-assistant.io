---
title: LG Infrared
description: Integration to control LG TVs and LG split air conditioners using an infrared emitter and to receive commands from an LG remote using an infrared receiver.
ha_category:
  - Climate
  - Event
  - Media player
ha_release: 2026.4
ha_iot_class: Assumed State
ha_codeowners:
  - '@abmantis'
ha_domain: lg_infrared
ha_config_flow: true
ha_platforms:
  - button
  - climate
  - event
  - media_player
ha_integration_type: device
ha_quality_scale: silver
---

The **LG Infrared** {% term integration %} lets you control an LG TV or a compatible LG split air conditioner using any infrared emitter previously configured in Home Assistant. It can also receive commands from an LG remote when you have an infrared receiver set up, allowing you to use the remote to trigger automations in Home Assistant.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the device but there is no feedback channel to confirm the current state. The integration therefore uses assumed states.

## Supported devices

The integration supports:

- LG TVs that can be controlled via the standard LG infrared protocol.
- Compatible LG split air conditioners that can be controlled via the standard LG air conditioner infrared protocol.

## Prerequisites

Before setting up the LG Infrared integration, you need a working infrared emitter, an infrared receiver, or both, already set up in Home Assistant. Each must expose an [Infrared](/integrations/infrared/) entity. For example, you can use an ESPHome device with an IR LED pointed at your LG device to send commands, and an IR receiver module to capture commands from your LG remote.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device type:
  description: The type of LG device to control. Select **TV** for an LG television or **Air conditioner** for a compatible LG split air conditioner.
Infrared emitter:
  description: The infrared emitter entity to use for sending commands to your LG device. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR emitter.
Infrared receiver:
  description: The infrared receiver entity to use for receiving commands from your LG remote. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR receiver.
Heat mode:
  description: Enable this option if your LG air conditioner supports heat mode. Not all LG air conditioner models support it. This option is only shown when setting up an **Air conditioner** device.
{% endconfiguration_basic %}

At least one of **Infrared emitter** or **Infrared receiver** must be selected. Select both if you want to be able to send commands to your device and react to commands from the remote.

## Supported functionality

### TV

#### Buttons

Button entities are created when an infrared emitter is configured. Each button sends the corresponding infrared command to the TV when pressed.

- **Power on**, **Power off**
- **HDMI 1**, **HDMI 2**, **HDMI 3**, **HDMI 4**
- **Input**
- **Up**, **Down**, **Left**, **Right**, **OK**
- **Back**, **Exit**, **Home**, **Menu**
- **Info**, **Guide**
- **0** through **9**

#### Events

An event entity is created when an infrared receiver is configured. It fires an event each time an LG TV remote command is received, so you can use the remote to trigger automations in Home Assistant.

- **Received command**
  - **Description**: Fires when a command from an LG TV remote is decoded from the infrared receiver. The fired event type matches the button pressed on the remote.
  - **Event types**:
    - Navigation: `back`, `exit`, `guide`, `home`, `info`, `list`, `menu`, `nav_down`, `nav_left`, `nav_right`, `nav_up`, `ok`, `settings`
    - Inputs and channels: `channel_down`, `channel_up`, `hdmi_1`, `hdmi_2`, `hdmi_3`, `hdmi_4`, `input`
    - Playback: `fast_forward`, `pause`, `play`, `rewind`, `stop`
    - Volume and audio: `mute`, `sap`, `subtitle`, `text`, `volume_down`, `volume_up`
    - Power: `power`, `power_off`, `power_on`
    - Number keys: `num_0` through `num_9`
    - Color buttons: `blue`, `green`, `red`, `yellow`
    - Other LG commands: `aspect`, `ez_adjust`, `in_start`
    - `unknown` for any LG command that is not recognized
  - **Remarks**: Only commands using the LG infrared address are processed. Signals from other remotes are ignored.

#### Media player

A media player entity is created when an infrared emitter is configured.

- **LG TV**
  - **Description**: Represents the LG TV and allows you to control it via IR commands.
  - **Supported features**: Turn on, turn off, volume up, volume down, mute, channel up, channel down, play, pause, and stop.

### Air conditioner

A climate entity is created when an infrared emitter is configured for an LG air conditioner device.

- **LG AC**
  - **Description**: Represents the LG split air conditioner and allows you to control it via IR commands.
  - **Supported features**: Set HVAC mode, set fan mode, and set target temperature.

#### Supported modes

During setup, you select which modes your unit supports. Not all LG air conditioner models support heat mode.

- **Cool**: Cools to a set temperature.
- **Heat**: Heats to a set temperature. Enable this only if your unit supports it.
- **Dry**: Dehumidify mode. The temperature is fixed at 24 °C by the protocol.
- **Fan only**: Fan circulation without heating or cooling.

#### Fan speeds

- **Auto**: The unit selects the speed automatically.
- **Quiet**: Lowest noise level.
- **Low**: Low fan speed.
- **Medium**: Medium fan speed.
- **High**: High fan speed.

#### Temperature range

Supported range: 16 °C to 30 °C in 1 °C steps.

#### Physical remote state tracking

If you also have an infrared receiver entity (from an IR blaster that can also listen), you can optionally select it during setup. When selected, the integration decodes signals from the physical LG air conditioner remote and keeps the climate entity state in sync automatically.

## Known limitations

- The TV media player and button entities use assumed state, meaning Home Assistant cannot verify the actual state of the TV. Commands received from the physical remote are exposed as events only and do not update the TV entity state.
- The climate entity for the air conditioner also uses assumed state unless you enable physical remote state tracking during setup. Without it, the climate entity state is not updated when you use the physical remote.
- Turning on and turning off the TV both send the same IR power toggle command, as is standard with infrared remotes.
- Volume control for the TV is step-based only; there is no way to set an absolute volume level.
- For the air conditioner, the dry mode temperature is fixed at 24 °C by the LG air conditioner infrared protocol and cannot be changed.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
