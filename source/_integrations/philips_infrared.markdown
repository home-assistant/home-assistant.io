---
title: Philips Infrared
description: Integration to control Philips TVs using an infrared emitter.
ha_categories:
  - media_entertainment.tv_streaming
ha_release: 2026.11
ha_iot_class: Assumed State
ha_codeowners:
  - '@javitonino'
ha_domain: philips_infrared
ha_config_flow: true
ha_platforms:
  - media_player
ha_integration_type: device
ha_quality_scale: bronze
---

The **Philips Infrared** {% term integration %} lets you control a Philips TV from Home Assistant using any infrared emitter previously configured in Home Assistant. It is a good fit for Philips TVs that aren't connected to your network, or when you prefer to control the TV the same way its remote does.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the TV, but there is no feedback channel to confirm its current state. The integration therefore uses assumed states.

If your Philips TV is connected to your network and supports the jointSPACE API, you can also use the [Philips TV](/integrations/philips_js/) integration, which can read the state of the TV.

## How you can use the integration

After setup, you can control your Philips TV from Home Assistant the same way you would with its remote, and make it part of your automations. For example, you can:

- Turn the TV on or off from a dashboard.
- Change the volume or the channel without looking for the remote.
- Pause what you're watching when you talk to your voice assistant.

## Supported devices

The integration supports Philips TVs that can be controlled with the standard Philips RC-6 infrared protocol.

## Prerequisites

{% include integrations/infrared_controlled.md %}

To send commands, you need an infrared emitter. For example, you can use an ESPHome device with an IR LED pointed at your Philips TV.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Infrared emitter:
  description: "The infrared emitter entity to use for sending commands to your Philips TV. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an infrared emitter. Each infrared emitter can be used for one Philips TV."
{% endconfiguration_basic %}

To control more than one Philips TV, add the integration again for each TV and select a different infrared emitter each time.

## Supported functionality

### Media player

The integration creates one media player entity for your TV.

- **Philips TV**
  - **Description**: Represents the Philips TV and allows you to control it with infrared commands.
  - **Supported features**: Turn on, turn off, volume up, volume down, mute, channel up, channel down, play, pause, and stop.
  - **Remarks**: The next track and previous track controls of the media player change the channel up and down. The state of the media player follows the last command sent from Home Assistant since this integration has no way of knowing the real state.

## Philips Infrared automation examples

The following examples show how to automate a Philips TV. For more ideas, refer to the media player [actions reference](/integrations/media_player/#list-of-actions).

{% include docs/paste_yaml_tip.md %}

### Automation: Pausing the TV when you talk to your voice assistant

- **Trigger**: Satellite started listening
  - **Target**: Living room voice assistant (`assist_satellite.living_room`)
- **Action**: Pause media
  - **Target**: Philips TV (`media_player.philips_tv`)

{% details "YAML example for pausing the TV when you talk to your voice assistant" %}

{% example %}
automation: |
  alias: "Pause the TV when the voice assistant listens"
  triggers:
    - trigger: assist_satellite.listening
      target:
        entity_id: assist_satellite.living_room
  actions:
    - action: media_player.media_pause
      target:
        entity_id: media_player.philips_tv
{% endexample %}

{% enddetails %}

## Known limitations

- The media player uses assumed state, meaning Home Assistant can't read the actual state of the TV. The state shows the last command sent from Home Assistant, so it gets out of sync when you use the TV remote, or when a command doesn't reach the TV.
- Philips TVs have a single power toggle command, so turning the TV on and turning it off both send the same command. If Home Assistant shows the TV as on while it's already off, a turn off command turns it on, and the other way around. Keep this in mind when you use these actions in automations.
- Mute also toggles. Each mute command switches the sound on or off, regardless of whether you select mute or unmute.
- Volume control is step-based only. There is no way to set an absolute volume level.
- You can't change the infrared emitter after setup. To use a different emitter, remove the TV from the integration and add it again.

## Troubleshooting

{% details "The TV doesn't respond to commands" %}

### Symptom: The TV doesn't respond to commands

You send a command from Home Assistant, but your TV doesn't react.

#### Description

The infrared signal is probably not reaching the TV. Infrared relies on a clear line of sight between the emitter and the receiver.

#### Resolution

Make sure the infrared emitter points at the receiver window of the TV and that nothing blocks the path between them. For more steps, refer to [the troubleshooting section](/integrations/infrared/#the-device-does-not-respond-to-commands) of the infrared documentation.

{% enddetails %}

{% details "The TV turns on when it should turn off" %}

### Symptom: The TV turns on when it should turn off

You turn the TV off from Home Assistant, but the TV turns on instead.

#### Description

Turning the TV on and off both send the same power command, so the command switches the TV to the opposite of its current state. If the state in Home Assistant doesn't match the TV, for example because someone turned the TV off with the remote, a turn off command turns the TV on again.

#### Resolution

To avoid this in automations, only send power commands when you know the current state of the TV. You can also try sending other commands that turn on the TV. For example, on many models, the play command also turns on the TV when it's off, without the risk of turning it off.

{% enddetails %}

### Reporting an issue

If you need to report an issue, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), then reload the integration. Reproduce the issue, disable debug logging, and attach the automatically downloaded debug log to your report.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
