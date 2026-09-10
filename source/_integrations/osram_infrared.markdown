---
title: OSRAM Infrared
description: Instructions on how to control OSRAM and LEDVANCE RGB lights using an infrared emitter.
ha_category:
  - Light
ha_release: 2026.7
ha_iot_class: Assumed State
ha_codeowners:
  - '@freeDom-'
ha_domain: osram_infrared
ha_config_flow: true
ha_platforms:
  - light
ha_integration_type: device
ha_quality_scale: silver
related:
  - docs: /integrations/infrared/
    title: Infrared integration
---

The **OSRAM Infrared** {% term integration %} lets you control compatible OSRAM and LEDVANCE RGB lights using an infrared emitter previously configured in Home Assistant.

You can optionally select an infrared receiver during setup. When the receiver captures a supported command from the physical remote, the integration updates the light entity to reflect the remote's command. For example, pressing the off button on the physical remote updates the light entity to `off` in Home Assistant.

Because infrared is a one-way signal, Home Assistant cannot confirm whether the light received a command. The state shown in Home Assistant reflects the last sent value, not a confirmed reading from the light.

## Supported devices

The integration supports OSRAM and LEDVANCE RGB lights that use the supported infrared remote command set. The supported remote has 24 buttons and includes controls for power, brightness, preset colors and effects and a mode button.

## Prerequisites

Before setting up the OSRAM Infrared integration, you need a working infrared emitter already set up in Home Assistant. The emitter must expose an [Infrared](/integrations/infrared/) entity and be positioned so that its infrared LED can reach the light.

You can optionally set up an infrared receiver. The receiver must also expose an [Infrared](/integrations/infrared/) entity and be positioned so that it can capture commands from the physical remote. A receiver improves state tracking when the physical remote is used, but it is not required to control the light from Home Assistant.

For example, you can use an ESPHome device with an infrared LED for sending commands and an infrared receiver module for capturing commands from the physical remote.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Infrared emitter:
  description: The infrared emitter entity used to send commands to the OSRAM or LEDVANCE light. This must be an entity provided by a hardware integration, such as ESPHome, that has already been set up with an infrared emitter.
Infrared receiver:
  description: The optional infrared receiver entity used to detect supported commands sent by the physical remote. This must be an entity provided by a hardware integration, such as ESPHome, that has already been set up with an infrared receiver.
{% endconfiguration_basic %}

## Supported functionality

### Light

The integration creates a light entity with the following functionality:

- Turn the light on and off.
- Set an assumed brightness level by sending relative brightness-up or brightness-down commands.
- Select white mode or a color from the color wheel. The requested color is mapped to the closest supported preset of the physical remote.
- Select the **Flash**, **Strobe**, or **Smooth** effect.

## Data updates

The integration does not {% term polling poll %} the light. After sending a command, it updates the light entity to reflect the expected result.

If you configure an infrared receiver, the integration also updates the assumed state when the receiver captures a supported command from the physical remote. Signals that do not match the supported OSRAM infrared protocol are ignored.

## Known limitations

- Infrared communication does not provide confirmation that the light received a transmitted command. The reported state can differ from the actual state if a signal is missed.
- Brightness control is relative. The integration tracks an assumed brightness level based on commands sent or received, but it cannot read the actual brightness from the light.
- The color wheel maps colors to the discrete presets available on the physical remote. The selected color can therefore differ slightly from the requested color.
- Commands sent with the physical remote update the Home Assistant state only when an infrared receiver is configured and successfully captures the signal.

## Troubleshooting

### The integration cannot be set up

Make sure that an infrared emitter entity is already available in Home Assistant. The emitter is required during setup.

### The light does not react to commands

Make sure that the infrared LED is positioned within range and pointed toward the light. If the emitter is unavailable, verify the hardware integration that provides the infrared entity.

### Commands from the physical remote do not update the light state

Make sure that you selected an infrared receiver during setup and that the receiver is positioned so that it can capture signals from the physical remote.

## Removing the integration

This integration follows standard integration removal. 

{% include integrations/remove_device_service.md %}
