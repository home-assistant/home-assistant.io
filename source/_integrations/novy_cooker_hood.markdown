---
title: Novy Cooker Hood
description: Instructions on how to integrate Novy cooker hoods into Home Assistant.
ha_category:
  - Fan
  - Light
ha_release: 2026.5
ha_iot_class: Assumed State
ha_config_flow: true
ha_codeowners:
  - '@piitaya'
ha_domain: novy_cooker_hood
ha_platforms:
  - diagnostics
  - fan
  - light
ha_integration_type: device
ha_quality_scale: gold
---

The **Novy Cooker Hood** {% term integration %} lets you control the light and extractor of a [Novy](https://www.novy.com/) cooker hood over 433.92&nbsp;MHz radio, through a compatible RF transmitter. You can automatically run the extractor when the hob is in use, for example at 50%, as soon as a smart plug reports power draw, and switch the light by voice through Assist, which is handy when your hands are full in the kitchen.

## Supported devices

The integration controls Novy cooker hoods that ship with the white RF remote, model 840029.

## Unsupported devices

The following devices are not supported:

- Higher-end Novy cooker hoods that ship with a remote other than the 840029.
- Newer Novy hoods that use the Novy Connect app (different protocol).
- Novy hoods without an RF remote, such as touch-only or wired-only models.

## Supported functionality


The **Novy Cooker Hood** integration provides the following entities. State is assumed and restored across restarts. See [Known limitations](#known-limitations).

### Fans

- **Fan**
  - **Description**: Controls the extractor with four speeds (25%, 50%, 75%, 100%).

### Lights

- **Light**
  - **Description**: Toggles the cooker hood light on or off.

## Prerequisites

1. Set up a hardware integration (for example, [ESPHome](/integrations/esphome/) or [Broadlink](/integrations/broadlink/)) that provides a [Radio Frequency](/integrations/radio_frequency/) {% term entity %} supporting 433.92&nbsp;MHz <abbr title="On-Off Keying">OOK</abbr> transmissions.
2. Identify the pairing code of your hood. New hoods are paired with code 1; if yours was changed, follow the button combination in your Novy manual to read it back. The remote's green LED flashes once for code 1, twice for code 2, and so on up to 10.

{% include integrations/config_flow.md %}

## Configuration

{% configuration_basic %}
Radio frequency transmitter:
  description: "The RF transmitter Home Assistant uses to send commands. Only transmitters that support 433.92&nbsp;MHz OOK transmissions are shown."
Code:
  description: "The pairing code (1 to 10) the hood is paired with. Use code 1 if you have not changed the factory default. The 10 codes let two hoods or other 433&nbsp;MHz devices coexist without interfering."
{% endconfiguration_basic %}

Home Assistant then toggles the light on and off so you can confirm the code. Select **Finish** if the light reacted, or **Retry** to try another code.


## Examples

### Set the extractor speed to 50% when the hob is in use

Use a hob smart plug to turn the extractor on at 50% when cooking starts and off a few minutes after it ends.

```yaml
- alias: "Hood follows the hob"
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
            - action: fan.turn_on
              target:
                entity_id: fan.novy_cooker_hood
              data:
                percentage: 50
        - conditions:
            - condition: trigger
              id: hob_off
          sequence:
            - action: fan.turn_off
              target:
                entity_id: fan.novy_cooker_hood
```

Replace `sensor.hob_power` with your hob's activity entity, and adjust the thresholds for your appliance.

## Data updates

The hood uses a one-way 433.92&nbsp;MHz protocol: Home Assistant only sends commands and does not receive any data back. The state shown in Home Assistant is the last command sent, and is restored across restarts.

## Known limitations

### Home Assistant does not know what the hood is doing

The hood does not report its state back. If you change the light or fan speed from the physical remote, the values in Home Assistant will be wrong until you control the hood from Home Assistant again.
### Two Novy hoods need different codes

If two hoods share the same transmitter, set each to a different pairing code so they don't react to each other's commands.
### Other 433&nbsp;MHz devices can interfere

Weather stations, doorbells, and garage door openers share the same frequency. Distance and walls between the transmitter and the hood can also reduce reliability.

## Troubleshooting

### The hood does not react when you control it from Home Assistant

1. Check the configured code matches the hood's. Read the current code from the remote with the button combination in your Novy manual (the green LED flashes once per code). If unsure, re-add the integration trying each code (1-10) until verification succeeds.
2. Check the RF transmitter entity is available from {% my integrations title="**Settings** > **Devices & services**" %}.
3. Move the transmitter closer to the hood, or remove obstacles between them. Metal kitchen appliances and dense walls can attenuate 433&nbsp;MHz signals.
4. Check whether another 433&nbsp;MHz device, or a neighbor's hood on the same code, is generating interference.

### The setup verification fails with "Could not send the test command"

The RF transmitter could not send the command. Check it is online and reachable, restart it if needed, then select **Retry**.

### The light or fan state in Home Assistant does not match the hood

Home Assistant has no way to read the hood's real state. To resync, control the entity from Home Assistant so the assumed state matches reality. To avoid future desync, prefer using Home Assistant or the remote consistently.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
