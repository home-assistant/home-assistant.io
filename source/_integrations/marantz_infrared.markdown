---
description: Integration to control Marantz amplifiers using an infrared emitter.
ha_release: 2026.6
ha_domain: marantz_infrared
---

The **Marantz Infrared** {% term integration %} lets you control a Marantz amplifier using any infrared emitter previously configured in Home Assistant.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the amplifier but there is no feedback channel to confirm the current state. The integration therefore uses assumed states.

## Prerequisites

{% include integrations/infrared_controlled.md %}

For example, you can use an ESPHome device with an IR LED pointed at your Marantz amplifier.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Model:
  description: The Marantz model to control. Currently, only **PM6006** is supported.
Infrared emitter:
  description: The infrared emitter entity to use for sending commands. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR emitter.
{% endconfiguration_basic %}

## Reconfiguring the integration

If you replace your infrared emitter, you can switch the amplifier to the new one without removing and re-adding the integration.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Find the **Marantz Infrared** integration and select it.
3. Next to the amplifier, select the three dots {% icon "mdi:dots-vertical" %} menu and choose **Reconfigure**.
4. Select the infrared emitter you want to use, then select **Submit**.

Reconfiguring changes only the infrared emitter. The amplifier model stays as you set it up.

Each infrared emitter can be used for one amplifier of each model, so you can't select an emitter that another amplifier of the same model already uses.

## Supported devices

The integration currently supports the **Marantz PM6006** integrated amplifier. Other Marantz amplifiers share much of the IR command set, but each model has its own quirks (for example, which inputs are present, which functions exist as discrete codes versus toggles, and which proprietary "Pre-Code" 38 kHz raw timings are needed for digital inputs). Adding more models is a community effort — if you own another Marantz amplifier and want it supported, please [open an issue on the infrared-protocols repository](https://github.com/home-assistant-libs/infrared-protocols/issues) with captured IR signals from your remote.

## Supported functionality

### Entities

The **Marantz Infrared** integration provides the following entities.

#### Buttons

Button entities are created for amplifier functions that aren't part of the media player. Each button sends the corresponding infrared command when pressed.

- **Speaker A/B** — toggles between the A and B speaker outputs.
- **Source direct** — toggles the source-direct mode.
- **Loudness** — toggles the loudness contour.

#### Media player

- **Marantz Amplifier PM6006**
  - **Description**: Represents the amplifier and allows you to control it via IR commands.
  - **Supported features**: Turn on, turn off, volume up, volume down, mute, and source select.
  - **Sources**: CD, Coax, Network, Optical, Phono, Recorder, Tuner.

## Known limitations

- The integration uses assumed state, meaning Home Assistant cannot read the actual state of the amplifier (for example, whether it is on or off, what the current volume is, or which source is active).
- Turning on and turning off the amplifier both send the same IR power toggle command, as is standard with infrared remotes.
- Volume control is step-based only; there is no way to set an absolute volume level.
- The **Optical** source is a single toggle that cycles between the amplifier's two optical inputs (Optical 1 / Optical 2). The amplifier does not expose discrete IR codes for each one, so the integration cannot deterministically pick a specific optical input — pressing **Optical** moves to whichever optical input the amplifier remembers as last used, and pressing it again switches to the other.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
