---
title: Vacmaster Cardio54
description: Instructions on how to integrate Vacmaster Cardio54 fitness fans into Home Assistant.
ha_category:
  - Fan
ha_release: 2026.6
ha_iot_class: Assumed State
ha_config_flow: true
ha_codeowners:
  - '@iluebbe'
ha_domain: vacmaster_cardio54
ha_platforms:
  - fan
ha_integration_type: device
ha_quality_scale: gold
---

The **Vacmaster Cardio54** {% term integration %} lets you control a Vacmaster Cardio54 fitness fan over 433.92&nbsp;MHz radio, through a compatible RF transmitter. You can turn the fan on at a fixed speed when your workout starts (for example as soon as a treadmill smart plug reports power draw), step it up automatically when the room gets warmer, and switch it off by voice through Assist.

## Supported devices

The integration controls Vacmaster Cardio54 fitness fans that ship with the AM1202R white remote control (4 buttons: Power, I, II, III).

## Unsupported devices

The following devices are not supported:

- Cardio54 units that shipped without an RF remote (mains-switched models).
- Other Vacmaster appliances (different RF protocols).

## Supported functionality

The **Vacmaster Cardio54** integration provides the following entity. State is assumed and restored across restarts. See [Known limitations](#known-limitations).

### Fans

- **Fan**
  - **Description**: Controls the Cardio54 with three speeds (33&nbsp;%, 67&nbsp;%, 100&nbsp;%) and a power toggle.

## Prerequisites

1. Set up a hardware integration (for example, [ESPHome](/integrations/esphome/) or [Broadlink](/integrations/broadlink/)) that provides a [Radio Frequency](/integrations/radio_frequency/) {% term entity %} supporting 433.92&nbsp;MHz <abbr title="On-Off Keying">OOK</abbr> transmissions.
2. Have the Cardio54 within RF range of the transmitter (typical line-of-sight room distance).

{% include integrations/config_flow.md %}

## Configuration

{% configuration_basic %}
Radio frequency transmitter:
  description: "The RF transmitter Home Assistant uses to send commands. Only transmitters that support 433.92&nbsp;MHz OOK transmissions are shown."
{% endconfiguration_basic %}

Home Assistant generates a fresh 20-bit RF identity for the fan, then walks you through the Cardio54's 5-second pairing sequence:

1. Switch the fan's power slider to **0** (off).
2. Turn the speed dial to the **remote-control symbol** (between I and III).
3. Switch the power slider back to **I** &mdash; this opens a 5&nbsp;second pairing window during which the fan's LED blinks red while listening for a transmitter.
4. **Immediately** select **Submit** in Home Assistant. The pairing burst lands inside the window and the fan learns the new identity.
5. Home Assistant then sends speed I to verify the pairing took effect. Select **Finish** if the fan started spinning, or **Retry** to repeat the sequence.

Repeat the integration setup for each additional Cardio54 fan &mdash; every config entry gets its own auto-generated identity, so multiple fans on the same transmitter do not interfere.

## Examples

### Start the fan when the treadmill draws power

Use a smart plug measuring the treadmill's power draw to switch the Cardio54 on at full speed when you start a workout and back off a few minutes after it ends.

```yaml
- alias: "Cardio fan follows the treadmill"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.treadmill_power
      above: 80
      id: workout_started
    - trigger: numeric_state
      entity_id: sensor.treadmill_power
      below: 10
      for:
        minutes: 3
      id: workout_ended
  actions:
    - choose:
        - conditions:
            - condition: trigger
              id: workout_started
          sequence:
            - action: fan.turn_on
              target:
                entity_id: fan.vacmaster_cardio54
              data:
                percentage: 100
        - conditions:
            - condition: trigger
              id: workout_ended
          sequence:
            - action: fan.turn_off
              target:
                entity_id: fan.vacmaster_cardio54
```

Replace `sensor.treadmill_power` with your equipment's power-draw sensor and adjust the thresholds to match.

### Step the fan up as the room warms

```yaml
- alias: "Cardio fan follows room temperature"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.workout_room_temperature
      above: 22
      id: warm
    - trigger: numeric_state
      entity_id: sensor.workout_room_temperature
      above: 25
      id: hot
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.vacmaster_cardio54
      data:
        percentage: "{{ 67 if trigger.id == 'warm' else 100 }}"
```

## Data updates

The fan uses a one-way 433.92&nbsp;MHz protocol: Home Assistant only sends commands and does not receive any data back. The state shown in Home Assistant is the last command sent, and is restored across restarts.

## Known limitations

### Home Assistant does not know what the fan is doing

The Cardio54 does not report its state back. If you change the speed from the physical remote, the value in Home Assistant will be wrong until you control the fan from Home Assistant again.

### Power is a toggle, not an explicit on/off

The Cardio54's POWER button toggles the running state. The integration only sends it when Home Assistant believes the fan is currently on, so it does not accidentally switch a stopped fan on. If the state has drifted (for example, somebody used the remote), sending **Turn off** could momentarily switch the fan on; send a speed command instead to re-synchronise &mdash; speed commands switch the fan on deterministically at the requested level.

### Only one transmitter identity per fan

The Cardio54 receiver stores a single transmitter identity. Re-pairing the fan to a new transmitter (or to a fresh Home Assistant config entry) overwrites the previous identity. Keep the OEM remote out of pairing range during the pairing burst so it does not re-claim the slot.

### Other 433&nbsp;MHz devices can interfere

Weather stations, doorbells and garage door openers share the same frequency. Distance and walls between the transmitter and the fan also reduce reliability.

## Troubleshooting

### The fan does not react when you control it from Home Assistant

1. Check the RF transmitter entity is **available** under {% my integrations title="**Settings** > **Devices & services**" %}. If it is offline, get it back online before commanding the fan.
2. Move the transmitter closer to the fan, or remove obstacles between them. Metal exercise equipment and dense walls attenuate 433&nbsp;MHz signals.
3. The receiver may have lost the pairing (for example, somebody re-paired the OEM remote in range). Re-add the integration to assign a fresh identity and run the pairing sequence again.

### The setup verification fails with "Could not send the test command"

The RF transmitter could not send the command. Check it is online and reachable, restart it if needed, then select **Retry**.

### The pairing burst goes out but the fan never learns the new identity

Pairing only succeeds while the fan's 5&nbsp;second pairing window is open. Either the speed dial is on the wrong position (it must be on the **remote-control symbol** between I and III), or Submit was selected after the window closed. Repeat the dial sequence and select Submit *immediately* on the third step.

### The fan state in Home Assistant does not match reality

Home Assistant has no way to read the fan's real state. To resynchronise, send a speed command from Home Assistant &mdash; speeds switch the fan on deterministically. To avoid future drift, prefer using Home Assistant or the remote consistently.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
