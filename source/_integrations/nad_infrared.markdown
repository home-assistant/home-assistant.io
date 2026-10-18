---
title: NAD Infrared
description: Integration to control NAD receivers, amplifiers, tuners, CD players and cassette decks using an infrared transmitter.
ha_categories:
  - media_entertainment.speakers_audio
ha_release: 2026.11
ha_iot_class: Assumed State
ha_codeowners:
  - '@rrooggiieerr'
ha_domain: nad_infrared
ha_config_flow: true
ha_platforms:
  - button
  - media_player
ha_integration_type: device
ha_quality_scale: bronze
---

The **NAD Infrared** {% term integration %} lets you control NAD audio equipment using any infrared transmitter previously configured in Home Assistant. It supports NAD receivers, amplifiers, tuners, CD players and cassette decks.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the device but there is no feedback channel to confirm the current state. The integration therefore uses assumed states.

## Prerequisites

{% include integrations/infrared_controlled.md %}

For example, you can use an ESPHome device with an IR LED pointed at your NAD equipment.

NAD receivers and amplifiers can be set to one of several IR channels, so that two NAD devices in the same room can be controlled separately. This integration only works with **IR channel 0**, which is the factory default. If your receiver does not respond, check its IR channel setting. On many NAD receivers, you can toggle the IR channel by pressing the **Source <** and **Power** buttons on the front panel at the same time.

{% include integrations/config_flow.md %}

When adding the integration, first select the type of NAD device you want to control, then select the infrared transmitter.

{% configuration_basic %}
Device type:
  description: "The type of NAD device to control: **Receiver** (an amplifier with a built-in tuner), **Amplifier**, **Tuner**, **CD player**, or **Cassette deck**."
Infrared transmitter:
  description: The infrared transmitter entity to use for sending commands. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR transmitter.
{% endconfiguration_basic %}

You can add the integration multiple times, once for each NAD device you want to control. Different device types can share the same infrared transmitter, because each NAD device only responds to its own commands.

## Supported devices

The integration uses the IR codes that NAD publishes for its equipment, combined with codes from the open [IRDB](https://github.com/probonopd/irdb) and codes captured from a NAD AVR 4 remote. All NAD components share the same IR address, so most NAD equipment from the same era is expected to work.

The following receivers have been confirmed to use these codes:

- NAD T 175, T 187, T 765, T 775, T 777, T 785 and T 787

Not every model supports every command. For example, the T 175 has no Speaker A/B codes and the T 765 has no Audyssey code. Buttons for functions your device does not have simply do nothing.

If you own NAD equipment that uses codes not covered by this integration, you can help by [opening an issue on the infrared-protocols repository](https://github.com/home-assistant-libs/infrared-protocols/issues) with IR signals captured from your remote.

## Supported functionality

### Entities

The entities that are created depend on the device type you selected. A **Receiver** gets all entities of both the **Amplifier** and the **Tuner**.

#### Media player

A media player entity is created for receivers, amplifiers and CD players.

- **Receiver and amplifier**
  - **Supported features**: Turn on, turn off, volume up, volume down, mute, and source select.
  - **Sources**: Input 1 to Input 7, and Tuner.
- **CD player**
  - **Supported features**: Play, pause, stop, next track, and previous track.

Tuners and cassette decks do not get a media player entity; they are controlled using buttons.

#### Buttons

Button entities are created for functions that aren't part of the media player. Each button sends the corresponding infrared command when pressed.

- **Amplifier** (also included for receivers)
  - **Navigation**: Cursor up, Cursor down, Cursor left, Cursor right, Enter, and Menu.
  - **Source**: Source up and Source down.
  - **Presets**: A/V preset 1 to A/V preset 5.
  - **Sound**: Surround mode, Audyssey, Late night, and Tone defeat.
  - **Speakers**: Speaker A, Speaker B, Center volume up/down, Surround volume up/down, and Subwoofer volume up/down.
  - **Other**: Display, Dimmer, and Sleep.
  - **Configuration**: Test tone, which plays the speaker test tone.
- **Tuner** (also included for receivers)
  - **Band**: AM, FM, DAB, and Tuner mode.
  - **Tuning**: Tune up/down, Search up/down, Preset up/down, and Preset/tune.
  - **Presets**: Memory, Delete preset, Bank, and Tuner enter.
  - **Other**: FM blend.
  - **Number keys**: Number 0 to Number 10, and +10. These are disabled by default.
- **CD player**
  - Repeat, Random, Time, Scan back, Scan forward, and Open/close.
  - **Disc changers**: Next disc and Disc 1 to Disc 5. These are disabled by default, because they only work on NAD CD changers.
- **Cassette deck**
  - **Deck A**: Play, Reverse play, Stop, Fast forward, Rewind, and Record.
  - **Deck B**: Play, Reverse play, Stop, Fast forward, Rewind, Record, and Pause.
  - Single-cassette decks respond to the **Deck B** buttons.

To use a button that is disabled by default, enable it in the entity settings.

## Examples

### Turn on the receiver and select an input

This automation turns on the receiver and switches to Input 1 when the TV turns on.

{% raw %}

```yaml
automation:
  - alias: "Turn on NAD receiver with the TV"
    triggers:
      - trigger: state
        entity_id: media_player.living_room_tv
        to: "on"
    actions:
      - action: media_player.turn_on
        target:
          entity_id: media_player.nad_receiver
      - delay:
          seconds: 2
      - action: media_player.select_source
        target:
          entity_id: media_player.nad_receiver
        data:
          source: input_1
```

{% endraw %}

## Known limitations

- The integration uses assumed state, meaning Home Assistant cannot read the actual state of the device (for example, whether it is on or off, what the current volume is, or which source is active). Changes made with the physical remote or the front panel are not reflected in Home Assistant.
- Volume control is step-based only; there is no way to set an absolute volume level.
- NAD receivers only have a mute toggle, not separate mute on and mute off commands. The mute state is therefore not tracked.
- Selecting **Tuner** as the source while the tuner is already selected steps to the next band (AM → FM → DAB), the same as pressing the key on the remote twice.
- NAD CD players have no discrete power commands, so the CD player media player cannot turn the CD player on or off.
- Only IR channel 0 is supported. On IR channels 1 to 4, NAD uses a different frame format.

## Troubleshooting

### The device does not respond

1. Make sure the infrared transmitter has a clear line of sight to the IR receiver on the front of the NAD device.
2. Check that the NAD device is set to IR channel 0.
3. Check that the infrared transmitter itself works, for example by controlling another device with it.

### A button does nothing

Not every NAD model supports every command. For example, Speaker A/B, Audyssey and the multi-zone functions depend on the model.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
