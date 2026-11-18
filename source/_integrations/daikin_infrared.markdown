---
title: Daikin Infrared
description: Integration to control Daikin air conditioners using an infrared emitter and to follow the Daikin remote using an infrared receiver.
ha_categories:
  - climate.heat_pumps_air_conditioning
ha_release: 2026.12
ha_iot_class: Assumed State
ha_codeowners:
  - '@javitonino'
ha_domain: daikin_infrared
ha_config_flow: true
ha_platforms:
  - climate
ha_integration_type: device
ha_quality_scale: silver
---

The **Daikin Infrared** {% term integration %} lets you control a Daikin air conditioner from Home Assistant using any infrared emitter previously configured in Home Assistant. If you also have an infrared receiver, the integration can follow the physical Daikin remote, so Home Assistant stays in sync when you use it.

Because the integration communicates over infrared, it operates in a one-way fashion: commands are sent to the air conditioner, but there is no return channel to confirm its current state. The integration therefore uses assumed states. It remembers the last known state and restores it after a restart.

If your Daikin air conditioner is connected to your network, you can also use the [Daikin AC](/integrations/daikin/) integration, which can read the state of the unit.

## How you can use the integration

After setup, you can control your Daikin air conditioner from Home Assistant the same way you would with its remote, and make it part of your automations. For example, you can:

- Turn the air conditioner on or off from a dashboard.
- Change the mode, the target temperature, or the fan speed without looking for the remote.
- Start cooling when someone gets home, and turn the air conditioner off when everyone leaves.

## Supported devices

The integration supports Daikin air conditioners that come with an ARC43x or ARC466 series remote.

## Unsupported devices

Daikin uses several infrared protocols, and the integration only supports the one used by the remotes listed above. The following devices are not supported:

- Daikin air conditioners that come with a remote from another series, even if it looks similar.
- Ducted and ceiling units that come with a BRC series remote, such as the BRC4C.

## Prerequisites

{% include integrations/infrared_controlled.md %}

To send commands, you need an infrared emitter. For example, you can use an ESPHome device with an IR LED pointed at your air conditioner. To follow the physical remote, you also need an infrared receiver.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Infrared emitter:
  description: "The infrared emitter entity to use for sending commands to your air conditioner. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an infrared emitter. Each infrared emitter can be used for one air conditioner."
Infrared receiver:
  description: "The infrared receiver entity to use for receiving commands from your Daikin remote. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an infrared receiver. It's optional and keeps Home Assistant in sync with the physical remote. Each infrared receiver can be used for one air conditioner."
{% endconfiguration_basic %}

To control more than one Daikin air conditioner, add the integration again for each unit and select a different infrared emitter each time.

## Supported functionality

### Climate

The integration creates one climate entity for your air conditioner.

- **Daikin AC**
  - **Description**: Represents the Daikin air conditioner and allows you to control it with infrared commands.
  - **Supported features**: Turn on, turn off, set HVAC mode, set target temperature, set fan mode, set swing mode, set horizontal swing mode, and set preset mode.

#### HVAC modes

Turning the air conditioner on resumes the mode it was last in.

- **Heat/Cool**: The unit chooses between heating and cooling automatically.
- **Cool**: Cools to a set temperature.
- **Heat**: Heats to a set temperature.
- **Dry**: Dehumidifies the air. The unit doesn't use a target temperature in this mode.
- **Fan only**: Circulates air without heating or cooling. The unit doesn't use a target temperature in this mode.

#### Target temperature

The target temperature uses the same range as the Daikin remote for each mode, in steps of 1 °C:

- **Heat/Cool**: 18 °C to 30 °C
- **Cool**: 18 °C to 32 °C
- **Heat**: 10 °C to 30 °C

Each mode remembers its own target temperature, the same way the remote does. For example, switching from **Cool** to **Heat** restores the temperature last used for heating.

#### Fan speeds

- **Auto**: The unit selects the speed automatically.
- **Silence**: The quietest fan speed.
- **1** to **5**: Fixed fan speeds, from lowest to highest.

#### Swing modes

- **Swing mode**: Turns the up and down movement of the vanes on or off.
- **Horizontal swing mode**: Turns the left and right movement of the vanes on or off. Not all Daikin models have it.

#### Presets

- **None**: No preset.
- **Eco**: Limits the power the unit uses. It matches the **Econo** button on the remote.
- **Boost**: Runs the unit at maximum output. It matches the **Powerful** button on the remote. Like on the remote, selecting it turns off Eco and the **Quiet** mode. The unit leaves this mode on its own after 20 minutes. After a restart of Home Assistant, the preset shows **None**, because Home Assistant can't know how long the unit has been in this mode.

### Physical remote state tracking

If you selected an infrared receiver during setup, the integration decodes the commands of the physical Daikin remote and updates the climate entity to match.

### Settings kept from the remote

Every Daikin command carries all the settings of the unit, including settings that the climate entity doesn't show: the timers, the weekly schedule, the comfort airflow, the display brightness, and the **Quiet** and **Sensor** modes.

If you selected an infrared receiver, these settings follow the remote, and commands from Home Assistant keep them as the remote last set them. Without a receiver, Home Assistant doesn't know what the remote set, so its commands turn these settings off and set the display to bright. This also cancels any timer or weekly schedule set on the remote.

Every command also sets the clock of the air conditioner to the local time of Home Assistant, so the timers of the unit run on the right time.

## Daikin Infrared automation examples

The following examples show how to automate a Daikin air conditioner. For more ideas, refer to the climate [actions reference](/integrations/climate/#list-of-actions).

{% include docs/paste_yaml_tip.md %}

### Automation: Cooling the house when someone gets home

When the first person gets home, this automation turns the air conditioner on in cooling mode.

- **Trigger**: Zone occupancy detected
  - **Zone**: Home (`zone.home`)
- **Action**: Set thermostat HVAC mode
  - **Target**: Daikin AC (`climate.daikin_ac`)
  - **HVAC mode**: Cool

{% details "YAML example for cooling the house when someone gets home" %}

{% example %}
automation: |
  alias: "Cool the house when someone gets home"
  triggers:
    - trigger: zone.occupancy_detected
      options:
        zone: zone.home
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.daikin_ac
      data:
        hvac_mode: cool
{% endexample %}

{% enddetails %}

## Known limitations

- The climate entity uses assumed state, meaning Home Assistant can't read the actual state of the air conditioner. The state shows the last command sent from Home Assistant, or received from the remote, so it gets out of sync when a command doesn't reach the unit.
- Every Daikin command carries all the settings of the unit, so changing one setting from Home Assistant also resends all the others as Home Assistant last knew them.
- Without an infrared receiver, a command from Home Assistant turns off the settings made on the remote that the climate entity doesn't show, including any timer or weekly schedule. For details, refer to [Settings kept from the remote](#settings-kept-from-the-remote).
- Daikin air conditioners respond to any Daikin remote in range. If several units are in the same room, a command sent to one of them can also reach the others.
- You can't change the infrared emitter or the infrared receiver after setup. To use a different one, remove the air conditioner from the integration and add it again.

## Troubleshooting

{% details "The air conditioner doesn't respond to commands" %}

### Symptom: The air conditioner doesn't respond to commands

You send a command from Home Assistant, but your air conditioner doesn't react.

#### Description

The infrared signal is probably not reaching the air conditioner. Infrared relies on a clear line of sight between the emitter and the receiver of the unit.

#### Resolution

Make sure the infrared emitter points at the indoor unit and that nothing blocks the path between them. For more steps, refer to [The device does not respond to commands](/integrations/infrared/#the-device-does-not-respond-to-commands) on the Infrared integration page.

{% enddetails %}

{% details "Home Assistant doesn't follow the physical remote" %}

### Symptom: Home Assistant doesn't follow the physical remote

You use the Daikin remote, but the climate entity in Home Assistant doesn't change.

#### Description

Home Assistant only follows the remote when you selected an infrared receiver during setup, and the receiver can pick up the signal of the remote.

#### Resolution

Check that you selected an infrared receiver during setup. If you didn't, remove the air conditioner from the integration and add it again with a receiver. Then make sure the receiver can see the remote when you use it, for example by placing it near the indoor unit. For more steps, refer to [An infrared receiver does not pick up signals](/integrations/infrared/#an-infrared-receiver-does-not-pick-up-signals) on the Infrared integration page.

{% enddetails %}

### Reporting an issue

If you need to report an issue, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), then reload the integration. Reproduce the issue, disable debug logging, and attach the automatically downloaded debug log to your report.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
