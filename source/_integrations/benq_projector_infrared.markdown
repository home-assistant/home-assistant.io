---
description: Integration to control BenQ projectors using an infrared emitter, and to follow the projector's own remote using an infrared receiver.
ha_release: '2026.12'
ha_domain: benq_projector_infrared
related:
  - docs: /integrations/infrared/
    title: Infrared integration
---

The **BenQ Projector Infrared** {% term integration %} lets you control a BenQ projector using any infrared emitter previously configured in Home Assistant.

You can optionally select an infrared receiver during setup. When the receiver captures a command from the projector's own remote, the integration updates the media player to match. For example, turning the projector on with the remote updates the media player to **On** in Home Assistant.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the projector but there is no feedback channel to confirm the current state. The integration therefore uses assumed states.

## Use cases

- Turn on the projector and switch to the right input when you start a movie.
- Turn off the projector when you turn off the rest of your home cinema, or when everyone leaves the house.
- Keep using the projector's own remote. With an infrared receiver, the media player follows the changes you make with it.

## Supported devices

The integration uses the IR codes from the code list in BenQ's projector service manuals, combined with codes captured from the remotes of several BenQ home cinema and business projectors. BenQ projectors share one IR address (BenQ calls it custom code 0x30), so most BenQ projectors are expected to work.

Not every projector supports every command. For example, most home cinema projectors only have HDMI inputs, while older and business projectors also have PC, component, video and S-Video inputs.

If you own a BenQ projector that uses codes not covered by this integration, you can help by [opening an issue](https://github.com/home-assistant/core/issues) with IR signals captured from your remote.

## Prerequisites

{% include integrations/infrared_controlled.md %}

To send commands, you need an infrared emitter positioned so that its infrared LED can reach the IR window of the projector. Many BenQ projectors have an IR window on both the front and the back.

To follow the projector's own remote, you can optionally set up an infrared receiver positioned so that it can capture commands from the remote. A receiver keeps the media player in sync when the remote is used, but it is not required to control the projector from Home Assistant.

For example, you can use an ESPHome device with an IR LED pointed at your projector to send commands, and an IR receiver module to capture commands from the remote.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Infrared emitter:
  description: The infrared emitter entity to use for sending commands to the projector. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR emitter.
Infrared receiver:
  description: The optional infrared receiver entity to use for capturing commands from the projector's own remote. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR receiver.
{% endconfiguration_basic %}

You can add one projector for each infrared emitter.

{% include integrations/option_flow.md %}

{% configuration_basic %}
Warm-up time:
  description: How long, in seconds, the projector ignores commands after it is turned on. Commands sent during this time are refused. The default is 60 seconds.
Cool-down time:
  description: How long, in seconds, the projector ignores commands after it is turned off. Commands sent during this time are refused. The default is 60 seconds.
{% endconfiguration_basic %}

Set these to match your projector. After you change the options, the integration reloads.

## Supported functionality

### Entities

Each projector gets one media player entity.

#### Media player

- **Supported features**: Turn on, turn off, volume up, volume down, mute, and source select.
- **Sources**: HDMI 1, HDMI 2, PC 1, PC 2, Component 1, Component 2, Video 1, Video 2, S-Video 1, S-Video 2, DVI-D, and USB reader.
- The last selected source and power state are remembered across restarts of Home Assistant.

### Turning off

A BenQ projector only turns off after the off command is confirmed by a second one. When you turn off the projector from Home Assistant, the integration sends the off command twice, one second apart.

### Warm-up and cool-down

After it is turned on or off, a BenQ projector ignores every command while it warms up or cools down. During that time, the integration refuses commands from Home Assistant instead of sending them, and shows an error that says how many seconds are left. You can change both times in the [options](#options).

The warm-up or cool-down starts when the power state changes, whether you turned the projector on or off from Home Assistant or, with a receiver, from the remote. Turning on a projector that is already on does not start a new warm-up.

## Data updates

The integration does not {% term polling poll %} the projector. After sending a command, it updates the media player to reflect the expected result.

If you configure an infrared receiver, the integration also updates the assumed state when the receiver captures a command from the projector's remote:

- **On**: Sets the media player to on.
- **Off**: Sets the media player to off after the second press, the same way the projector asks you to confirm. If the second press does not follow within about four seconds, the first press is ignored, just like the projector's confirmation prompt disappears. Pressing any other key in between also cancels it.
- **Input keys**, such as **HDMI 1**: Set the source.
- **Source**: This key cycles through the inputs, so the integration cannot know which input is selected. It clears the source.

Other keys, and commands from other remotes, do not change the state. Commands captured during the warm-up or cool-down are ignored, because the projector ignores them too.

## Examples

### Turn on the projector and select an input

This automation turns on the projector when your streaming box turns on, waits for the projector to warm up, and then switches to HDMI 1.

To create this automation in the automation editor:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select **Create automation** > **Create new automation**.
2. Under **When**, add a **State** trigger for your streaming box's media player entity, with **To** set to **On**.
3. Under **Then do**, add the **Media player: Turn on** action, and select the BenQ projector as the target.
4. Add a **Wait for time to pass (delay)** action of 1 minute, which matches the default warm-up time. Commands sent before the warm-up is over are refused.
5. Add the **Media player: Select source** action, select the BenQ projector as the target, and set **Source** to `hdmi_1`.
6. Save the automation.

Alternatively, you can add the automation in YAML:

{% raw %}

```yaml
automation:
  - alias: "Turn on the projector with the streaming box"
    triggers:
      - trigger: state
        entity_id: media_player.living_room_streaming_box
        to: "on"
    actions:
      - action: media_player.turn_on
        target:
          entity_id: media_player.benq_projector
      - delay:
          minutes: 1
      - action: media_player.select_source
        target:
          entity_id: media_player.benq_projector
        data:
          source: hdmi_1
```

{% endraw %}

## Known limitations

- The integration uses assumed state, meaning Home Assistant cannot read the actual state of the projector. Without an infrared receiver, changes made with the remote or the buttons on the projector are not reflected in Home Assistant. With a receiver, only the remote is followed, and a command the receiver misses still makes the state drift.
- The warm-up and cool-down times are estimates set in the options. The integration cannot detect when the projector is ready.
- A warm-up or cool-down in progress is not remembered across a restart of Home Assistant.
- Volume control is step-based only; there is no way to set an absolute volume level.
- BenQ projectors only have a mute toggle, not separate mute on and mute off commands. Muting and unmuting both send the toggle, and the mute state is not tracked.
- All BenQ projectors respond to the same IR codes. If more than one BenQ projector can see the infrared emitter, they all respond.
- Some business projectors have a single power key that also turns the projector off when pressed twice. With a receiver, the integration treats that key as **On** only.

## Troubleshooting

### The projector does not respond

The infrared signal is probably not reaching the projector. Make sure the infrared emitter points at one of the projector's IR windows and that nothing blocks the path between them. For more steps, refer to [The device does not respond to commands](/connectivity/infrared/#the-device-does-not-respond-to-commands).

### A command is refused because the projector is warming up or cooling down

The projector ignores commands for a while after it is turned on or off, so the integration refuses them during that time. Wait until the time in the error has passed and try again. In automations, add a delay after turning the projector on or off. If your projector is ready sooner or later than the integration expects, change the warm-up and cool-down times in the [options](#options).

### The projector does not turn off

The projector only turns off when both off commands reach it. Check that the infrared emitter can reach the projector reliably. If the projector still shows its confirmation prompt, the second command was probably missed.

### Commands from the remote do not update the media player

1. Make sure you selected an infrared receiver during setup.
2. Check that the infrared receiver entity updates when you press a button on the remote. If it does not, refer to [An infrared receiver does not pick up signals](/connectivity/infrared/#an-infrared-receiver-does-not-pick-up-signals).
3. Remember that commands captured during the warm-up or cool-down are ignored.

### The integration fails to set up after removing the infrared emitter or receiver

If the infrared emitter or receiver used by the projector has been removed, the integration cannot set up the projector and shows the error: "The infrared emitter used by this BenQ projector no longer exists" or "The infrared receiver used by this BenQ projector no longer exists." Remove the projector and add it again with another emitter or receiver.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
