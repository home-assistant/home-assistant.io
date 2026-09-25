---
title: Gree Infrared
description: Integration to control Gree air conditioners using an infrared emitter and to receive commands from a Gree remote using an infrared receiver.
ha_category:
  - Climate
  - Infrared-controlled
ha_release: '2026.10'
ha_iot_class: Assumed State
ha_codeowners:
  - '@Dr-Blank'
ha_domain: gree_infrared
ha_config_flow: true
ha_platforms:
  - climate
  - switch
ha_integration_type: device
ha_quality_scale: silver
---

The **Gree Infrared** {% term integration %} lets you control a compatible Gree air conditioner using any infrared emitter previously configured in Home Assistant. It can also keep the entities in sync when you have an infrared receiver set up, so they follow along when you use the physical Gree remote.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the air conditioner but there is no feedback channel to confirm the current state. The integration therefore uses assumed states. It remembers the last known state and restores it after a restart.

## Supported devices

The integration supports compatible Gree air conditioners that can be controlled via the standard Gree air conditioner infrared protocol.

Gree manufactures air conditioners sold under many brand names. Units branded Onida, Sinclair, and others use the same infrared protocol and work with this integration.

## Prerequisites

{% include integrations/infrared_controlled.md %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Infrared emitter:
  description: "The infrared emitter entity to use for sending commands to your air conditioner. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR emitter. It is required."
Infrared receiver:
  description: "The infrared receiver entity to use for receiving commands from your Gree remote. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR receiver. It is optional and keeps the entities in sync with the physical remote."
Supported modes:
  description: "The operating modes your air conditioner supports. Select at least one of **Cool**, **Heat**, **Dry**, **Fan only**, and **Auto**. Check your remote or the manual of your unit to see which modes it has. Not all Gree models support heat. Selecting a mode your unit does not have breaks nothing. Your air conditioner simply does not respond to it."
{% endconfiguration_basic %}

## Supported functionality

A climate entity and three switch entities are created for each Gree air conditioner device you set up.

- **Gree AC**
  - **Description**: Represents the Gree air conditioner and allows you to control it using infrared commands.
  - **Supported features**: Set HVAC mode, set target temperature, and set fan mode.
- **Turbo**
  - **Description**: Enables or disables turbo mode, which runs the unit at maximum output.
- **Panel light**
  - **Description**: Turns the front panel light on or off.
- **Xtra fan**
  - **Description**: Enables or disables extra fan mode, to help remove moisture from the coils. Gree remotes label this button **X-Fan** or **Blow**.

These three features are switches rather than buttons because the Gree remote sends the wanted state, not a toggle, so Home Assistant can track whether each one is on or off. They are named to match the [Gree](/integrations/gree/) integration, which controls the same features over Wi-Fi.

### Supported modes

The climate entity offers the modes you selected during setup, in addition to **Off**.

- **Cool**: Cools to a set temperature.
- **Heat**: Heats to a set temperature. Not all Gree air conditioner models have it.
- **Dry**: Dehumidify mode.
- **Fan only**: Fan circulation without heating or cooling.
- **Auto**: The unit chooses between heating and cooling automatically.

### Fan speeds

- **Auto**: The unit selects the speed automatically.
- **Low**: Low fan speed.
- **Medium**: Medium fan speed.
- **High**: High fan speed.

### Temperature range

Supported range: 16 °C to 30 °C in 1 °C steps.

### Physical remote state tracking

If you also have an infrared receiver entity (from an IR blaster that can also listen), you can optionally select it during setup. When selected, the integration decodes signals from the physical Gree air conditioner remote and updates the entities to match, so the mode, fan speed, target temperature, and the turbo, panel light, and extra fan switches stay in sync.

## Known limitations

- The climate entity and the switches for the air conditioner use assumed state. Home Assistant cannot verify the actual state of the unit and instead tracks the last known state.
- Even with physical remote state tracking enabled, the receiver reports what the remote sent, not what the unit is actually doing, so the two can still drift apart, for example if something blocks the line of sight.
- Changing the target temperature or the fan speed while the air conditioner is off is remembered rather than sent. It is applied with the next command that turns the unit on.
- With physical remote state tracking, commands from the remote for a mode you did not select during setup are ignored, so the entity does not switch to a mode it cannot control.
- Every Gree command carries the whole state of the unit, so operating one entity also resends the others. Turning a switch on or off resends the current mode, target temperature, and fan speed, and changing the climate entity resends the turbo, panel light, and extra fan settings.
- Toggling a switch while the air conditioner is off does not turn the unit on. The frame that is sent carries the switch you changed along with the off state.

## Troubleshooting

### The climate entity does not update when I use the physical remote

If you use an ESPHome `remote_receiver` as your infrared receiver and the climate state does not update when you press buttons on the physical Gree remote, the receiver is probably splitting each command into two signals it cannot decode.

The Gree protocol sends each command as two IR frames separated by a gap of about 20.1 ms. The ESPHome `remote_receiver` component defaults to an `idle` timeout of 10 ms, which treats that gap as the end of a transmission and breaks the command into two separate signals.

To fix this, in your existing ESPHome `remote_receiver` configuration, set `idle` to about `25ms` so both frames are captured as a single signal:

```yaml
remote_receiver:
  idle: 25ms
```

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
