---
title: Novy Cooker Hood
description: Instructions on how to integrate Novy cooker hoods into Home Assistant.
ha_category:
  - Light
ha_release: 2026.5
ha_iot_class: Assumed State
ha_config_flow: true
ha_codeowners:
  - '@piitaya'
ha_domain: novy_cooker_hood
ha_platforms:
  - light
ha_integration_type: device
ha_quality_scale: bronze
---

The **Novy Cooker Hood** {% term integration %} lets you control the light on a [Novy](https://www.novy.com/) cooker hood from Home Assistant. The integration uses one-way 433.92&nbsp;MHz OOK radio frequency commands sent through a compatible RF transmitter, the same way the white Novy remote does.

## Supported devices

The integration controls Novy cooker hoods that ship with the white RF remote, model 840029. The integration currently exposes the light toggle only.

### Unsupported devices

The following devices are not supported:

- Higher-end Novy cooker hoods that ship with a remote other than the 840029.
- Newer Novy hoods that use the Novy Connect app. These use a different protocol.
- Novy hoods without an RF remote, such as touch-only or wired-only models.

## Supported functionality

### Entities

The **Novy Cooker Hood** integration provides the following entities.

#### Lights

- **Light**
  - **Description**: Toggles the cooker hood light on or off.
  - **Remarks**: The state is assumed and restored across Home Assistant restarts. See [Known limitations](#known-limitations).

## Prerequisites

Before adding the integration, complete the following steps:

1. Set up a [Radio Frequency](/integrations/radio_frequency/) transmitter integration that supports 433.92&nbsp;MHz OOK transmissions.
2. Identify the pairing code of your hood. New hoods leave the factory paired with code 1, so this is the right value if you have never changed it. To check the current code on the remote, follow the button combination described in your Novy manual. The remote acknowledges the code by flashing its green LED once for code 1, twice for code 2, and so on up to 10.

{% include integrations/config_flow.md %}

## Configuration

{% configuration_basic %}
Radio frequency transmitter:
  description: "The RF transmitter Home Assistant uses to send commands to the cooker hood. Only transmitters that support 433.92&nbsp;MHz OOK transmissions are shown."
Code:
  description: "The pairing code (1 to 10) the hood is paired with. Use code 1 if you have not changed the factory default. The 10 codes exist so two cooker hoods, or a hood and another nearby 433&nbsp;MHz device, can coexist without interfering with each other. To check or change the current code on the remote, follow the button combination described in your Novy manual."
{% endconfiguration_basic %}

After you submit the form, Home Assistant toggles the hood light on, then off, so you can confirm the code is correct. If the light reacted, select **Finish** to save the configuration. If nothing happened, select **Retry** to pick a different code.

## Use cases

Novy cooker hoods controlled by the 840029 remote have no smart control out of the box, so the light is normally only operated from the physical remote. Once it's in Home Assistant, you can:

- Tie the light to your hob, for example, turn it on when a hob smart plug reports power draw and off a few minutes after cooking ends.
- Switch the light by voice through [Assist](/voice_control/), which is handy when your hands are full or covered in food.

## Examples

### Turn the hood light on when the hob is in use

This automation uses a smart plug measuring the hob's power draw to turn the hood light on as soon as you start cooking and off a few minutes after the last burner is switched off.

{% raw %}

```yaml
- alias: "Hood light follows the hob"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.hob_power
      above: 50
      id: hob_on
    - trigger: numeric_state
      entity_id: sensor.hob_power
      below: 10
      for:
        minutes: 5
      id: hob_off
  actions:
    - choose:
        - conditions:
            - condition: trigger
              id: hob_on
          sequence:
            - action: light.turn_on
              target:
                entity_id: light.novy_cooker_hood_light
        - conditions:
            - condition: trigger
              id: hob_off
          sequence:
            - action: light.turn_off
              target:
                entity_id: light.novy_cooker_hood_light
```

{% endraw %}

Replace `sensor.hob_power` with the entity that reflects hob activity in your setup, and adjust the thresholds to match your appliance. Induction hobs in standby typically draw a few watts, so a low threshold (around 10&nbsp;W) keeps the light off when nothing is cooking.

## Data updates

The hood uses a one-way 433.92&nbsp;MHz protocol, so Home Assistant only sends commands and does not receive any data back. The light state shown in Home Assistant is the last state it set, and is restored across restarts.

## Known limitations

- **One-way protocol**: there is no feedback channel from the hood to Home Assistant. The integration tracks the state it last set, which is restored across restarts. If you press the physical remote, the state in Home Assistant will be out of sync until you turn the light on or off again from Home Assistant.
- **Light is toggle-only by design**: the protocol only defines a single "flip" press for the light, with no separate on or off code. Home Assistant compensates by tracking an assumed boolean and sending the toggle when the requested state differs from the assumed state. This works in normal use but cannot guarantee a specific final state if the hood and Home Assistant are out of sync.
- **One pairing code per hood on a transmitter**: if you control two Novy hoods from the same RF transmitter, each hood must use a different pairing code (1 to 10). Otherwise both hoods react to every command.
- **Range and interference**: 433.92&nbsp;MHz is shared with weather stations, doorbells, garage door openers, and other consumer devices. Walls, distance, and noisy neighbors can reduce reliability.

## Troubleshooting

### The hood does not react when you turn the light on or off

Try the following:

1. Check that the configured code matches the one your hood is paired with. Verify the current code on the remote with the button combination described in your Novy manual (the green LED flashes once per code unit). If you are unsure, remove the integration and add it again, trying each code from 1 to 10 in turn until the verification step succeeds.
2. Confirm the RF transmitter entity is not unavailable. Open the entity from {% my integrations title="**Settings** > **Devices & services**" %} and verify its state.
3. Move the transmitter closer to the hood, or remove obstacles between them. Metal kitchen appliances and dense walls can attenuate 433&nbsp;MHz signals.
4. Check whether another 433&nbsp;MHz device in your home, or a neighbor's hood on the same code, is generating interference. Change the pairing code on the remote, then re-add the integration with the new code.

### The setup verification fails with "Failed to send the test command"

This means the RF transmitter could not send the command:

1. Check that the transmitter device is online and reachable from Home Assistant.
2. Restart the transmitter integration, or re-pair the transmitter device if needed.
3. Once the transmitter is healthy, select **Retry** in the verification step.

### The light state in Home Assistant does not match the hood

Because the protocol is one-way, Home Assistant has no way to read the real state of the hood. To resync:

1. Look at the hood and note whether the light is on or off.
2. From Home Assistant, turn the light on if it is off, or off if it is on, so the assumed state matches reality.
3. To avoid future desync, prefer using Home Assistant or the physical remote consistently rather than mixing both.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
