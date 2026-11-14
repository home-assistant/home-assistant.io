---
title: Ceiling Fan Infrared
description: Integration to control a ceiling fan using an infrared emitter.
ha_categories:
  - climate.fans_ventilation
ha_release: 2026.12
ha_iot_class: Assumed State
ha_codeowners:
  - '@marcoacarvalho'
ha_domain: ceiling_fan_infrared
ha_config_flow: true
ha_integration_type: device
ha_platforms:
  - fan
---

The **Ceiling Fan Infrared** {% term integration %} lets you control a ceiling fan that comes with an infrared remote, using any infrared emitter that has been previously configured in Home Assistant.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the fan, but there is no feedback channel to confirm the current state of the fan. The integration therefore uses assumed states.

## How you can use the integration

After setup, you can control the fan from Home Assistant with the created fan entity. Use it to turn the fan on or off and to select one of the three speeds.

## Supported devices

This integration supports unbranded ceiling fans that are sold with a generic infrared remote control. The remote has a key to toggle the fan on and off and dedicated keys for the three fan speeds. Many ceiling fans sold under various brand names use this same remote.

If your remote does not work with this integration, the fan may use a different code set. Feel free to request support for it.

## Prerequisites

{% include integrations/infrared_controlled.md %}

For example, you can use an ESPHome device with an IR LED pointed at your ceiling fan.

{% include integrations/config_flow.md %}

Select the infrared emitter that points at the ceiling fan.

{% configuration_basic %}
Infrared emitter:
  description: The infrared emitter entity to use for sending commands to your ceiling fan. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR emitter.
{% endconfiguration_basic %}

## Supported functionality

The **Ceiling Fan Infrared** integration provides the following entity.

### Fan

- **Fan**
  - **Description**: Represents the ceiling fan and allows it to be controlled using infrared (IR) commands.
  - **Supported features**: Turn on, turn off, and set the fan speed.
  - **Remarks**: The original remote has a single key to toggle the fan on and off. Turning the fan on or off sends that toggle key, but only when Home Assistant considers the state to be changing.

## Ceiling Fan Infrared automation examples

The following example demonstrates how to automate a ceiling fan. For additional automation examples, refer to the fan platform [actions reference](/integrations/fan/#list-of-actions).

{% include docs/paste_yaml_tip.md %}

### Automation: Turning on the ceiling fan when it gets warm

- **Trigger**: The office temperature rises above 26 °C
- **Action**: Set the fan speed to 66 %

{% details "YAML example for turning on the fan when it gets warm" %}

{% example %}
automation: |
  alias: "Turn on the ceiling fan when it gets warm"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.office_temperature
      above: 26
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.office_ceiling_fan
      data:
        percentage: 66
{% endexample %}

{% enddetails %}

## Known limitations

The integration uses assumed state, meaning Home Assistant cannot read the actual state of the fan (for example, whether it is on or off, or what the current speed is). If the fan is also controlled with the original remote, Home Assistant is not aware of those changes.

The light of the ceiling fan is not supported yet.

## Troubleshooting

{% details "The fan does not respond to commands" %}

### Symptom: The ceiling fan does not react when Home Assistant sends a command

#### Description

The infrared signal does not reach the fan, or the emitter is not available to Home Assistant.

#### Resolution

1. Make sure the infrared emitter entity exists and is not shown as unavailable in Home Assistant.
2. Make sure the IR LED is pointed at the fan and within range.
3. Remove obstructions between the emitter and the fan, and avoid bright sunlight, as both reduce the range of the infrared signal.

{% enddetails %}

{% details "The fan reacts unexpectedly" %}

### Symptom: The fan changes state on its own, or a command triggers a different function

#### Description

Some remotes use overlapping infrared codes with other devices, so the same code can be interpreted as different functions. Another infrared device nearby may also be sending commands to the same fan.

#### Resolution

1. Make sure no other infrared emitter or remote in the room is sending commands to the fan.
2. Test the fan with its original remote to check which functions it actually supports.
3. Point the emitter directly at the fan and keep other emitters out of its line of sight.

{% enddetails %}

For additional troubleshooting steps and guidance, see the [infrared troubleshooting](/integrations/infrared/#troubleshooting) section.

If you need to report an issue, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), then reload the integration. Reproduce the issue, disable debug logging, and attach the automatically downloaded debug log to your report.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
