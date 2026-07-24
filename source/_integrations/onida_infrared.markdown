---
title: Onida Infrared
description: Integration to control Onida air conditioners using an infrared emitter and to receive commands from an Onida remote using an infrared receiver.
ha_category:
  - Climate
ha_release:
ha_iot_class: Assumed State
ha_codeowners:
  - '@Dr-Blank'
ha_domain: onida_infrared
ha_config_flow: true
ha_platforms:
  - climate
ha_integration_type: device
ha_quality_scale: silver
---

The **Onida Infrared** {% term integration %} lets you control a compatible Onida air conditioner using any infrared emitter previously configured in Home Assistant. It can also keep the climate entity in sync when you have an infrared receiver set up, so the entity follows along when you use the physical Onida remote.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the air conditioner but there is no feedback channel to confirm the current state. The integration therefore uses assumed states. It remembers the last state it sent and restores it after a restart.

## Supported devices

The integration supports compatible Onida air conditioners that can be controlled via the standard Onida air conditioner infrared protocol.

## Prerequisites

Before setting up the Onida Infrared integration, you need a working infrared emitter already set up in Home Assistant. It must expose an [Infrared](/integrations/infrared/) entity. For example, you can use an ESPHome device with an IR LED pointed at your air conditioner to send commands.

Optionally, you can also set up an infrared receiver, such as an IR receiver module, to capture commands from your Onida remote and keep the climate entity in sync.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Infrared emitter:
  description: "The infrared emitter entity to use for sending commands to your air conditioner. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR emitter. It is required."
Infrared receiver:
  description: "The infrared receiver entity to use for receiving commands from your Onida remote. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR receiver. It is optional and keeps the climate entity in sync with the physical remote."
Supported modes:
  description: "The operating modes your air conditioner supports. Select at least one of **Cool**, **Heat**, **Dry**, **Fan only**, and **Auto**. Check your remote or the manual of your unit to see which modes it has. Not all Onida models support heat. Selecting a mode your unit does not have breaks nothing. Your air conditioner simply does not respond to it."
{% endconfiguration_basic %}

## Supported functionality

A climate entity is created for each Onida air conditioner device you set up.

- **Onida AC**
  - **Description**: Represents the Onida air conditioner and allows you to control it using infrared commands.
  - **Supported features**: Set HVAC mode, set target temperature, and set fan mode.

### Supported modes

The climate entity offers the modes you selected during setup, in addition to **Off**.

- **Cool**: Cools to a set temperature.
- **Heat**: Heats to a set temperature. Not all Onida air conditioner models have it.
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

If you also have an infrared receiver entity (from an IR blaster that can also listen), you can optionally select it during setup. When selected, the integration decodes signals from the physical Onida air conditioner remote and updates the climate entity to match, so the mode, fan speed, and target temperature stay in sync.

## Known limitations

- The climate entity for the air conditioner uses assumed state. Home Assistant cannot verify the actual state of the unit and instead remembers the last command it sent.
- Even with physical remote state tracking enabled, the receiver reports what the remote sent, not what the unit is actually doing, so the two can still drift apart, for example if something blocks the line of sight.
- Changing the target temperature or the fan speed while the air conditioner is off is remembered rather than sent. It is applied with the next command that turns the unit on.
- With physical remote state tracking, commands from the remote for a mode you did not select during setup are ignored, so the entity does not switch to a mode it cannot control.

## Troubleshooting

### The climate entity does not update when I use the physical remote

If you use an ESPHome `remote_receiver` as your infrared receiver and the climate state does not update when you press buttons on the physical Onida remote, the receiver is probably splitting each command into two signals it cannot decode.

The Onida protocol sends each command as two IR frames separated by a gap of about 10 ms. The ESPHome `remote_receiver` component defaults to an `idle` timeout of 10 ms, which treats that gap as the end of a transmission and breaks the command into two separate signals.

To fix this, increase the `idle` timeout in your ESPHome `remote_receiver` configuration to about 25 ms so both frames are captured as a single signal:

```yaml
remote_receiver:
  pin:
    number: GPIO14
    inverted: true
    mode:
      input: true
      pullup: true
  idle: 25ms
```

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
