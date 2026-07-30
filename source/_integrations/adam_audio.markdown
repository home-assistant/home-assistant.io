---
title: ADAM Audio
description: Integrate ADAM Audio A-Series studio monitors into Home Assistant.
ha_release: 2026.9
ha_iot_class: Local Polling
ha_domain: adam_audio
ha_codeowners:
  - '@Perhan35'
ha_platforms:
  - number
  - select
  - switch
ha_integration_type: device
ha_quality_scale: bronze
ha_zeroconf: true
---

The **ADAM Audio** integration allows you to control [ADAM Audio A-Series studio monitors](https://www.adam-audio.com/en/a-series/), such as the A4V or A7V, from Home Assistant using the AES70/OCA protocol over UDP.

Each physical speaker becomes a separate device with individual entities.
A virtual **All Speakers** group device is automatically created so you can control all speakers simultaneously from a single entity or automation.

## Supported devices

The following devices are known to be supported by the integration:

- ADAM Audio A4V
- Other A-Series models like the A7V or A77H that implement AES70/OCA

## Unsupported devices

The following devices are not supported by the integration, as they do not feature LAN connectivity:

- ADAM Audio T-Series
- ADAM Audio S-Series
- ADAM Audio Sub-Series
- ADAM Audio D-Series

## Prerequisites

- ADAM Audio A-Series speaker connected to the same local network as your Home Assistant instance.
- Assign a static DHCP lease to each speaker for reliable operation.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your speaker. For example: `192.168.1.100` or `left.adam_audio.local`."
Port:
  description: "The port of the speaker. Default is `49494`."
{% endconfiguration_basic %}

## Supported functionality

The **ADAM Audio** integration provides the following entities.

### Numbers

- **Bass**: Adjusts the bass shelf (-2 to +1).
- **Desk**: Adjusts the desk correction (-2 to 0).
- **Presence**: Adjusts the presence (-1 to +1).
- **Treble**: Adjusts the treble shelf (-1 to +1).

### Selects

- **Input source**: Switches between RCA and XLR inputs.
- **Voicing**: Chooses between the Pure, UNR, or Ext voicing profiles.

### Switches

- **Sleep**: Toggles standby mode. Sleep is active when the switch is on.
- **Mute**: Mutes or un-mutes the monitor.

## Automations examples

Mute both speakers when [Sonos](/integrations/sonos) starts playing:

```yaml
automation:
  trigger:
    - platform: state
      entity_id: media_player.sonos
      to: playing
  action:
    - service: switch.turn_on
      target:
        entity_id: switch.all_speakers_mute
```

Wake speakers at 9:00 AM on weekdays:

```yaml
automation:
  trigger:
    - platform: time
      at: "09:00:00"
  condition:
    - condition: time
      weekday: [mon, tue, wed, thu, fri]
  action:
    - service: switch.turn_off
      target:
        entity_id: switch.all_speakers_sleep
```

## Data updates

Due to the connection type with the speakers, state is tracked optimistically. This means the integration records what it has set and assumes the speaker accepted it. If you change settings using the physical knob or the ADAM Audio A Control app, Home Assistant does not reflect those changes until the integration entry is reloaded.

## Known limitations

- Opening the official **ADAM Audio A Control** app while this integration is running causes the speaker to accept commands from the app, which overrides any state set by Home Assistant. Close the app to regain control.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
