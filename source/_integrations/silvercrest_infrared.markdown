---
title: SilverCrest Infrared
description: Integration to control SilverCrest infrared devices using an infrared emitter.
ha_release: 2026.11
ha_iot_class: Assumed state
ha_codeowners:
  - '@tr4nt0r'
ha_domain: silvercrest_infrared
ha_integration_type: device
ha_categories:
  - climate.fans_ventilation
ha_config_flow: true
ha_platforms:
  - button
ha_quality_scale: bronze
---

The **SilverCrest Infrared** {% term integration %} lets you control SilverCrest infrared devices with any infrared emitter that has been previously configured in Home Assistant.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the device, but there is no feedback channel to confirm its current state. The integration therefore uses assumed states.

## How you can use the integration

After setup, you can control your SilverCrest devices from Home Assistant with the created entities. Use it to turn the device on or off or control other features.

## Supported devices

The following SilverCrest infrared devices are supported:

- Portable air cooler SML 330 A1
- Pedestal fan SSVF 45 A1
- Pedestal fan SSVF 45 B1
- Pedestal fan SSVF 45 C1
- Misting pedestal fan SSVS 85 A1
- Misting pedestal fan SSVS 85 B2
- Tower fan STVD 45 A1
- Tower fan STVL 50 B1
- Tower fan STVL 50 C1
- Pedestal fan SV 60 A1
- Pedestal fan SV 60 A2

## Unsupported devices

This integration supports only devices controlled via infrared (IR). Bluetooth- and
Wi-Fi-controlled devices are not supported.

Other IR-controlled devices may also work if they use compatible infrared
commands. However, these devices have not been tested, and some functions or
buttons may not be supported.

### Contributing support for additional devices

If you own an unsupported IR-controlled device, you can help extend the integration by capturing its infrared codes and opening a [feature request](https://github.com/orgs/home-assistant/discussions).

When submitting a request, include the device model and the captured infrared codes, along with any relevant details about its available functions.

## Prerequisites

{% include integrations/infrared_controlled.md %}

For example, you can use an ESPHome device with an IR LED pointed at your
SilverCrest device.

{% include integrations/config_flow.md %}

Select the device type that matches your remote control, then select an infrared emitter.

{% configuration_basic %}
Device type:
  description: The type of SilverCrest device to control.
Infrared emitter:
  description: The infrared emitter entity to use for sending commands to your device. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR emitter.
{% endconfiguration_basic %}

## Supported functionality

The **SilverCrest** integration provides the following entities.

### Buttons

- **Power**
  - **Description**: Turns the fan on or off.
  - **Available for**: All supported fans.

- **Speed**
  - **Description**: Cycles through the available speed settings.
  - **Available for**: All supported fans.

- **Timer**
  - **Description**: Cycles through the available timer settings and the off option.
  - **Available for**: All supported fans.

- **Oscillation**
  - **Description**: Toggles the fan's oscillation function.
  - **Available for**: All supported fans.

- **Mode**
  - **Description**: Cycles through the available fan modes, such as Sleep and Nature, and the off option, where supported.
  - **Available for**: Pedestal fans, tower fans, and air coolers.

- **Mist**
  - **Description**: Toggles the misting function.
  - **Available for**: Misting pedestal fans.

## SilverCrest Infrared automation examples

Use the fan's button entities in automations to send commands when something
happens in your home.

{% include docs/paste_yaml_tip.md %}

### Automation: Toggle the fan when a room is occupied and too warm

The following example presses the fan's **Power** button when a room becomes
occupied and the temperature is above 25 °C. Because this button toggles the
fan, this example assumes the fan is off when the room becomes occupied.
Replace the example entity IDs and temperature threshold with values for your
Home Assistant instance.

- **Trigger**: Room occupancy detected
- **Condition**: Room temperature is above 25 °C
- **Action**: Press the fan's **Power** button

{% example %}
automation: |
  alias: "Toggle the fan when the room is occupied and too warm"
  triggers:
    - trigger: state
      entity_id: binary_sensor.room_occupancy
      to: "on"
  conditions:
    - condition: numeric_state
      entity_id: sensor.room_temperature
      above: 25
  actions:
    - action: button.press
      target:
        entity_id: button.silvercrest_tower_fan_power
{% endexample %}

## Known limitations

### Device state

The integration uses assumed state, meaning Home Assistant cannot read the actual state of the device (for example, whether it is on or off, or what the current fan speed is).

### Multiple fans

You can use only one SilverCrest fan with each infrared emitter. Different SilverCrest fan models use the same infrared codes, so one emitter cannot control multiple fans independently.

## Troubleshooting

{% details "The device does not respond to commands" %}

### Symptom

You press a button in Home Assistant, but the device does not respond.

#### Resolution

1. Make sure the infrared emitter selected for the integration is available in
   Home Assistant.
2. Make sure the emitter is pointed at the device's infrared receiver and has
   a clear line of sight. For more details, see [About device placement and
   coverage](/integrations/infrared/#about-device-placement-and-coverage).

{% enddetails %}

{% details "More than one fan responds to commands" %}

### Symptom

A command sent to one SilverCrest fan also affects another fan.

#### Resolution

SilverCrest fan models use the same infrared codes. To control multiple fans,
use a separate emitter for each fan and place the fans and emitters so each
emitter has a clear line of sight to its fan, but not to the other fans. For
example, place them in different rooms or out of sight of one another. For
more information, see [Multiple fans](#multiple-fans).

{% enddetails %}

For additional troubleshooting steps and guidance, see the [infrared troubleshooting](/integrations/infrared/#troubleshooting) section.

If you need to report an issue, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), then reload the integration. Reproduce the issue, disable debug logging, and attach the automatically downloaded debug log to your report.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
