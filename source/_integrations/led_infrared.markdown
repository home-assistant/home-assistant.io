---
title: LED Infrared
description: Integration to control LED infrared lights with Home Assistant.
ha_category:
  - Light
ha_release: 2026.8
ha_iot_class: Assumed State
ha_codeowners:
  - '@tr4nt0r'
ha_domain: led_infrared
ha_config_flow: true
ha_platforms:
  - light
ha_integration_type: device
---

The **LED Infrared** {% term integration %} lets you control lights using any infrared transmitter previously configured in Home Assistant.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the light, but there is no feedback channel to confirm the current state of the light. The integration therefore uses assumed states.

## Supported devices

This integration supports many branded and unbranded LED bulbs, lamps, and LED strip controllers that use generic infrared remotes. If your device uses one of the remote controls listed below, it may be compatible with this integration.

{% details "24-key remote" %}

![24-key remote](/images/integrations/led_infrared/24-key.png)

{% enddetails %}

{% details "13-key remote" %}

![13-key remote](/images/integrations/led_infrared/13-key.png)

{% enddetails %}

## Prerequisites

Before setting up the LED Infrared integration, you need a working infrared transmitter set up in Home Assistant that exposes an [Infrared](/integrations/infrared/) entity. For example, you can use an ESPHome device with an IR LED pointed at your lights.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device type:
  description: The type of remote control used for the LED light bulb, lamp, or controller.
Infrared emitter:
  description: The infrared emitter entity to use for sending commands to your device. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR emitter.
Infrared receiver:
  description: The infrared receiver entity to use for receiving commands from your infrared remote. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR receiver.
{% endconfiguration_basic %}

## Supported functionality

The **LED Infrared** integration provides the following entities.

### Lights

A light entity is created when an infrared emitter is configured.

- **Light**
  - **Description**: Represents the LED device and allows it to be controlled using infrared (IR) commands.
  - **Supported features**: Turn on, turn off, and select effects.
  - **Available effects**: Depend on the capabilities of the configured IR remote.

## LED Infrared automation examples

The following example demonstrates how to automate an LED Infrared device. For additional automation examples, refer to the light platform [actions reference](/integrations/light/#list-of-actions).

{% include docs/paste_yaml_tip.md %}

### Automation: Turning on the LED strip at night

- **Trigger**: Sun: after sunset
  - **Target**: Optional trigger target if needed
- **Condition**: Optional condition if needed
- **Action**: Turn on light

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
