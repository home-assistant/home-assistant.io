---
title: Croma Infrared
description: Integration to control Croma TVs using an infrared emitter.
ha_categories:
  - media_entertainment.tv_streaming
ha_release: '2026.11'
ha_iot_class: Assumed State
ha_codeowners:
  - '@Dr-Blank'
ha_domain: croma_infrared
ha_config_flow: true
ha_platforms:
  - media_player
ha_integration_type: device
ha_quality_scale: bronze
---

The **Croma Infrared** {% term integration %} lets you control a Croma Google TV using any infrared emitter previously configured in Home Assistant. Croma TVs are sold in India by Croma, the Tata Group electronics retailer.

Use case: Home Assistant can turn the TV off at bedtime, pause it when someone rings the doorbell, or open YouTube, Netflix, or Prime Video as part of a scene, without needing the TV on your network.

Because infrared is one-way, the integration cannot read the TV's state. It uses assumed states: it remembers the last command it sent and restores that state after a restart.

## Supported devices

The integration was verified with the following TV, using the Google TV remote shipped with it:

- Croma 43-inch 4K UHD QLED Google TV, 2026 model (CREL043UGQ024652)

Croma ships the same remote with its other 2026 Google TV models, so they are likely to work too.

If your TV does not respond, or you want another Croma remote supported, [open an issue](https://github.com/home-assistant/core/issues) and include IR signals captured from your remote.

## Prerequisites

{% include integrations/infrared_controlled.md %}

For example, you can use an ESPHome device with an IR LED pointed at your TV.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Infrared emitter:
  description: The infrared emitter entity used to send commands to the TV. This must be an entity provided by a hardware integration, such as ESPHome, that has already been set up with an infrared emitter.
{% endconfiguration_basic %}

## Supported functionality

The **Croma Infrared** integration provides the following entity.

### Media player

- **Croma TV**
  - **Description**: Represents the TV and lets you control it over infrared.
  - **Supported features**: Turn on, turn off, volume up, volume down, mute, play, pause, stop, and select source.
  - **Sources**: YouTube, Netflix, Prime Video, and Live TV. Selecting a source sends the matching app key from the remote, which opens that app on the TV.

## Croma Infrared automation examples

You can use the TV in automations like any other media player.
Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Turning off the TV at bedtime

If the TV is still on late at night, turn it off.

- **Trigger**: Time: 23:30
- **Condition**: State: Croma TV is on
- **Action**: Turn off media player
  - **Target**: Croma TV (`media_player.croma_tv`)

{% details "YAML example for turning off the TV at bedtime" %}

{% example %}
automation: |
  alias: "Turn off the TV at bedtime"
  triggers:
    - trigger: time
      at: "23:30:00"
  conditions:
    - condition: state
      entity_id: media_player.croma_tv
      state: "on"
  actions:
    - action: media_player.turn_off
      target:
        entity_id: media_player.croma_tv
{% endexample %}

{% enddetails %}

### Automation: Pausing the TV when the doorbell rings

When someone presses the doorbell, pause what is playing so you don't miss anything.

- **Trigger**: State: Doorbell (`binary_sensor.doorbell`) changes to on
- **Action**: Pause media
  - **Target**: Croma TV (`media_player.croma_tv`)

{% details "YAML example for pausing the TV when the doorbell rings" %}

{% example %}
automation: |
  alias: "Pause the TV when the doorbell rings"
  triggers:
    - trigger: state
      entity_id: binary_sensor.doorbell
      to: "on"
  actions:
    - action: media_player.media_pause
      target:
        entity_id: media_player.croma_tv
{% endexample %}

{% enddetails %}

## Data updates

The integration does not {% term polling poll %} the TV. After sending a command, it updates the media player entity to reflect the expected result.

## Known limitations

- Home Assistant cannot read the actual state of the TV, such as whether it is on or what the current volume is.
- The TV has a single power key that switches between on and off. Turning the TV on and turning it off both send that key, so if the TV and Home Assistant disagree, the command does the opposite of what you asked for.
- The mute key also switches between muted and unmuted, with the same effect when the states disagree.
- Presses on the physical remote are not tracked. Using the remote directly leaves the media player showing whatever state Home Assistant last set.
- Volume control is step-based only. You cannot set an absolute volume level.
- Sources are apps opened by the remote's app keys. The TV's HDMI inputs cannot be selected directly, because the remote only has a key that opens the input menu.
- Mute and the current source are not restored after a restart.

## Troubleshooting

{% details "The TV does not respond to commands" %}

### Symptom: Commands from Home Assistant have no effect on the TV

You use the media player in Home Assistant, but the TV does not react.

#### Description

The infrared signal does not reach the TV. Infrared needs a clear line of sight between the emitter and the TV's IR window, which is usually at the bottom edge of the screen.

#### Resolution

1. Make sure the emitter points at the TV and nothing blocks the path.
2. Move the emitter closer to the TV and try again.
3. Check that the infrared emitter entity is available in Home Assistant.
4. Press a key on the physical remote to check that the TV accepts infrared commands. The standby light on the TV usually blinks when it receives a command.

{% enddetails %}

{% details "The TV state in Home Assistant is wrong" %}

### Symptom: Home Assistant shows the TV as on while it is off, or the other way around

#### Description

The integration uses assumed state. Using the physical remote, or a command that did not reach the TV, makes the TV and Home Assistant disagree.

#### Resolution

1. Repeat the command that matches what Home Assistant shows. For example, if Home Assistant shows the TV as on but the TV is off, turn the media player on. The power key turns the TV on, and both agree again.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
