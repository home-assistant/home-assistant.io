---
title: Fujitsu Infrared
description: Integration to control Fujitsu General air conditioners using an infrared emitter and to receive commands from a Fujitsu General remote using an infrared receiver.
ha_category:
  - Climate
  - Infrared
ha_release: '2026.10'
ha_iot_class: Assumed State
ha_codeowners:
  - '@Dr-Blank'
ha_domain: fujitsu_infrared
ha_config_flow: true
ha_platforms:
  - climate
ha_integration_type: device
ha_quality_scale: silver
---

The **Fujitsu Infrared** {% term integration %} lets you control a compatible Fujitsu General air conditioner using any infrared emitter previously configured in Home Assistant. It can also keep the climate entity in sync when you have an infrared receiver set up, so the entity follows along when you use the physical Fujitsu General remote.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the air conditioner but there is no feedback channel to confirm the current state. The integration therefore uses assumed states. It remembers the last state it sent and restores it after a restart.

## Supported devices

The integration supports compatible Fujitsu General air conditioners that can be controlled via the standard Fujitsu General air conditioner infrared protocol. This is the protocol used by most Fujitsu General split systems, including units sold under the General and AirStage names.

## Prerequisites

Before setting up the Fujitsu Infrared integration, you need a working infrared emitter already set up in Home Assistant. It must expose an [Infrared](/integrations/infrared/) entity. For example, you can use an ESPHome device with an IR LED pointed at your air conditioner to send commands.

Optionally, you can also set up an infrared receiver, such as an IR receiver module, to capture commands from your Fujitsu General remote and keep the climate entity in sync.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Infrared emitter:
  description: "The infrared emitter entity to use for sending commands to your air conditioner. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR emitter. It is required."
Infrared receiver:
  description: "The infrared receiver entity to use for receiving commands from your Fujitsu General remote. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR receiver. It is optional and keeps the climate entity in sync with the physical remote."
Supported modes:
  description: "The operating modes your air conditioner supports. Select at least one of **Cool**, **Heat**, **Dry**, **Fan only**, and **Heat/Cool**. Check your remote or the manual of your unit to see which modes it has. Cooling-only models do not have heat. Selecting a mode your unit does not have breaks nothing. Your air conditioner simply does not respond to it."
Temperature steps:
  description: "Select **Half degrees** only if your remote's display shows them, such as 24.5. **Whole degrees** works with every model and is the default. Half degrees requires an air conditioner new enough to have shipped with a remote that supports them; on an older unit those commands are ignored entirely. Either setting reaches the correct temperature, because the air conditioner reads the format out of each command it receives."
{% endconfiguration_basic %}

## Supported functionality

A climate entity is created for each Fujitsu General air conditioner device you set up.

- **Fujitsu AC**
  - **Description**: Represents the Fujitsu General air conditioner and allows you to control it using infrared commands.
  - **Supported features**: Set HVAC mode, set target temperature, set fan mode, and set swing mode.

### Supported modes

The climate entity offers the modes you selected during setup, in addition to **Off**.

- **Cool**: Cools to a set temperature.
- **Heat**: Heats to a set temperature. Cooling-only models do not have it.
- **Dry**: Dehumidify mode.
- **Fan only**: Fan circulation without heating or cooling.
- **Heat/Cool**: The unit chooses between heating and cooling automatically to reach the target temperature.

### Fan speeds

- **Auto**: The unit selects the speed automatically.
- **Quiet**: The lowest, quietest fan speed.
- **Low**: Low fan speed.
- **Medium**: Medium fan speed.
- **High**: High fan speed.

### Swing

One setting drives both louvres, with four options: **Off**, **Vertical**, **Horizontal**, and **Both**. Units without horizontal louvres ignore the options that use it.

Turning swing off stops the louvre, but which position it stops in is decided by the air conditioner, not by the command.

### Temperature range

Supported range: 16 °C to 30 °C, in 1 °C steps, or 0.5 °C steps if you selected half degrees during setup.

Not every mode accepts the whole range. Some models only go down to 18 °C while cooling and while drying, but reach 16 °C while heating. A temperature the unit does not accept is ignored, and the unit stays where it was.

If your remote is set to Fahrenheit, the climate entity still works in the unit Home Assistant is configured for. Commands from the remote are converted, so the entity follows a remote set to either scale.

### Physical remote state tracking

If you also have an infrared receiver entity (from an IR blaster that can also listen), you can optionally select it during setup. When selected, the integration decodes signals from the physical Fujitsu General air conditioner remote and updates the climate entity to match, so the mode, target temperature, fan speed, and swing settings stay in sync.

## Known limitations

- The climate entity for the air conditioner uses assumed state. Home Assistant cannot verify the actual state of the unit and instead remembers the last command it sent.
- Even with physical remote state tracking enabled, the receiver reports what the remote sent, not what the unit is actually doing, so the two can still drift apart, for example if something blocks the line of sight.
- Changing the target temperature, the fan speed, or the swing settings while the air conditioner is off is remembered rather than sent. It is applied with the next command that turns the unit on.
- With physical remote state tracking, commands from the remote for a mode you did not select during setup are ignored, so the entity does not switch to a mode it cannot control.
- The remote's remaining functions, such as the economy and powerful modes, the louvre position steps, the timers, the outdoor unit low noise setting, and the 10 °C minimum heat mode, are not exposed.

## Troubleshooting

### The air conditioner does not turn on

The Fujitsu General protocol only starts a unit that is off when the command carries a dedicated turn-on flag, which the integration sends when it switches the entity out of **Off**. If the air conditioner was turned on or off with the physical remote while Home Assistant was not tracking it, the entity and the unit disagree about whether the unit is running, and the next command may not include that flag.

Set the entity to **Off** and then back to the mode you want. That sends a power-off command followed by a command carrying the turn-on flag, which puts both back in sync. Setting up an infrared receiver avoids the problem, since the entity then follows the physical remote.

### Commands are ignored or only work sometimes

Make sure the IR emitter has line of sight to the receiver window of the indoor unit. Fujitsu General units send back an audible beep when a command is accepted, which is a quick way to confirm the emitter is aimed well enough.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
