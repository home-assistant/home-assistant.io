---
title: Tween Light Infrared
description: Integration to control Tween Light infrared lights with Home Assistant.
ha_category:
  - Light
ha_release: 2026.7
ha_iot_class: Assumed State
ha_codeowners:
  - '@tr4nt0r'
ha_domain: tween_light_ir
ha_config_flow: true
ha_platforms:
  - light
ha_integration_type: device
---

The **Tween Light Infrared** {% term integration %} lets you control lights using any infrared transmitter previously configured in Home Assistant.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the light but there is no feedback channel to confirm the current state of the light. The integration therefore uses assumed states.

## Supported devices

The following devices are known to be supported by the integration:

- Tween Light LED Strip
- Most LED controllers using the same 24-key infrared remote

## Unsupported devices

Other Tween Light remote controlled products like LED ceiling lights and LED panels are currently not supported. If you own one of these and can provide the infrared codes of the remote, please open a [feature request](https://github.com/orgs/home-assistant/discussions).

## Prerequisites

Before setting up the Tween Light Infrared integration, you need a working infrared transmitter set up in Home Assistant that exposes an [Infrared](/integrations/infrared/) entity. For example, you can use an ESPHome device with an IR LED pointed at your lights.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device type:
  description: The type of Tween Light to control. Currently, only **LED Strip** is supported.
Infrared emitter:
  description: The infrared emitter entity to use for sending commands to your device. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR emitter.
Infrared receiver:
  description: The infrared receiver entity to use for receiving commands from your infrared remote. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR receiver.
{% endconfiguration_basic %}

## Supported functionality

The **Tween Light** integration provides the following entities.

### Lights

A light entity is created when an infrared emitter is configured

- **LED strip**
  - **Description**: Represents the Tween Light device and allows you to control it via IR commands.
  - **Supported features**: Turn on, turn off, effects.
  - **Available effects:**:
    - Flash
    - Strobe
    - Fade
    - Smooth
    - Solid colors:
      - Red
      - Green
      - Blue
      - White
      - Tomato
      - Light green
      - Sky blue
      - OrangeRed
      - Cyan
      - Rebecca purple
      - Orange
      - Turquoise
      - Purple
      - Yellow
      - Dark cyan
      - Plum
  
## Tween Light automation examples

The following example demonstrates how to automate a Tween Light device. For additional automation examples, refer to the light platform [actions reference](/integrations/light/#list-of-actions).

{% include docs/paste_yaml_tip.md %}

### Automation: Turning on the LED strip at night

- **Trigger**: Sun: after sunset
  - **Target**: Optional trigger target if needed
- **Condition**: Optional condition if needed
- **Action**: Turn off light

{% details "YAML example for turning on LED strip at night" %}

{% example %}
automation: |
  alias: "Turn on the LEDs during the night"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.led_strip
{% endexample %}

{% enddetails %}

## Known limitations

The integration uses assumed state, meaning Home Assistant cannot read the actual state of the light (for example, whether it is on or off, or what the current brightness is).

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
