---
title: NAD Infrared
description: Integration to control NAD receivers, amplifiers, CD players and cassette decks using an infrared transmitter.
ha_categories:
  - media_entertainment.speakers_audio
ha_release: 2026.11
ha_iot_class: Assumed State
ha_codeowners:
  - '@rrooggiieerr'
ha_domain: nad_infrared
ha_config_flow: true
ha_platforms:
  - media_player
ha_integration_type: device
ha_quality_scale: silver
---

The **NAD Infrared** {% term integration %} lets you control NAD audio equipment using any infrared transmitter previously configured in Home Assistant. It supports NAD receivers, amplifiers, CD players and cassette decks.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the device but there is no feedback channel to confirm the current state. The integration therefore uses assumed states.

## Use cases

- Turn on your receiver and switch to the right input when your TV or media player turns on.
- Switch the receiver to the tuner and your favorite listening mode with a single tap or a morning routine.
- Turn off the receiver when everyone leaves the house or when you go to bed.
- Control a NAD CD player or cassette deck from the same dashboard as the rest of your system.

## Prerequisites

{% include integrations/infrared_controlled.md %}

For example, you can use an ESPHome device with an IR LED pointed at your NAD equipment.

NAD receivers and amplifiers can be set to one of several IR channels, so that two NAD devices in the same room can be controlled separately. This integration only works with **IR channel 0**, which is the factory default. If your receiver does not respond, check its IR channel setting. On many NAD receivers, you can toggle the IR channel by pressing the **Source <** and **Power** buttons on the front panel at the same time.

{% include integrations/config_flow.md %}

When adding the integration, first select the type of NAD device you want to control, then select the infrared transmitter.

{% configuration_basic %}
Device type:
  description: "The type of NAD device to control: **Receiver** (an amplifier with a built-in tuner), **Amplifier**, **CD player**, or **Cassette deck**."
Infrared transmitter:
  description: The infrared transmitter entity to use for sending commands. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR transmitter.
{% endconfiguration_basic %}

You can add the integration multiple times, once for each NAD device you want to control. Different device types can share the same infrared transmitter, because each NAD device only responds to its own commands.

## Supported devices

The integration uses the IR codes that NAD publishes for its equipment, combined with codes from the open [IRDB](https://github.com/probonopd/irdb) and codes captured from a NAD AVR 4 remote. All NAD components share the same IR address, so most NAD equipment from the same era is expected to work.

The following receivers have been confirmed to use these codes:

- NAD T 175, T 187, T 765, T 775, T 777, T 785 and T 787

Not every model supports every command. For example, not every receiver has all inputs or all listening modes.

If you own NAD equipment that uses codes not covered by this integration, you can help by [opening an issue](https://github.com/home-assistant/core/issues) with IR signals captured from your remote.

## Supported functionality

### Entities

Each NAD device gets one media player entity. Its features depend on the device type you selected.

#### Media player

- **Receiver and amplifier**
  - **Supported features**: Turn on, turn off, volume up, volume down, mute, source select, and sound mode select.
  - **Sources**: Input 1 to Input 7, Front, MP, and Tuner.
  - **Sound modes**: Dolby Pro Logic IIx Movie, Dolby Pro Logic IIx Music, Dolby Surround EX, DTS Neo:6 Cinema, DTS Neo:6 Music, Matrix 7.1, EARS, Enhanced stereo, Stereo downmix, Direct, and Bypass.
  - The last selected source, sound mode, and power state are remembered across restarts of Home Assistant.
- **CD player**
  - **Supported features**: Play, pause, stop, next track, and previous track.
- **Cassette deck**
  - **Supported features**: Play, pause, and stop.
  - The commands are sent to deck B. Single-cassette decks also respond to the deck B commands.

## Examples

### Turn on the receiver and select an input

This automation turns on the receiver and switches to Input 1 when the TV turns on.

To create this automation in the automation editor:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select **Create automation** > **Create new automation**.
2. Under **When**, add a **State** trigger for your TV's media player entity, with **To** set to **On**.
3. Under **Then do**, add the **Media player: Turn on** action, and select the NAD receiver as the target.
4. Add a **Wait for time to pass (delay)** action of 2 seconds, to give the receiver time to start up.
5. Add the **Media player: Select source** action, select the NAD receiver as the target, and set **Source** to `input_1`.
6. Save the automation.

Alternatively, you can add the automation in YAML:

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
- NAD receivers and amplifiers only have a mute toggle, not separate mute on and mute off commands. Muting and unmuting both send the toggle, and the mute state is not tracked.
- Selecting **Tuner** as the source while the tuner is already selected steps to the next band (AM → FM → DAB), the same as pressing the key on the remote twice.
- No power commands are known for NAD CD players and cassette decks, so their media players cannot turn them on or off.
- Fast forward, rewind, reverse play, and recording on cassette decks are not available.
- Only IR channel 0 is supported. On IR channels 1 to 4, NAD uses a different frame format.

## Troubleshooting

### The device does not respond

1. Make sure the infrared transmitter has a clear line of sight to the IR receiver on the front of the NAD device.
2. Check that the NAD device is set to IR channel 0.
3. Check that the infrared transmitter itself works, for example by controlling another device with it.

### A source or sound mode does nothing

Not every NAD model has every input or every listening mode. Selecting a source or sound mode that your model does not have has no effect.

### The integration fails to set up after removing the infrared transmitter

If the infrared transmitter entity used by a NAD device has been removed, the integration cannot set up that device and shows the error: "The infrared emitter used by this NAD device no longer exists." Remove the NAD device and add it again with another infrared transmitter.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
