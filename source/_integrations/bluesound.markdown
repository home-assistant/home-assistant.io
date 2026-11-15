---
description: Instructions on how to integrate Bluesound devices into Home Assistant.
ha_release: 0.51
ha_domain: bluesound
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Bluesound** {% term integration %} allows you to control your [Bluesound](https://www.bluesound.com/) and other BluOS players from Home Assistant.

## Use cases

- Control your players from your Home Assistant dashboards, next to the rest of your home.
- Group players in different rooms, so the same music plays throughout your home.
- Start a BluOS preset or the sleep timer from an automation.
- Use the playback, volume, and source of a player in your automations.

## Supported devices

The integration supports players that run BluOS:

- Bluesound wireless speakers, such as the PULSE and the PULSE FLEX
- Bluesound streamers and amplifiers, such as the NODE, the POWERNODE, and the VAULT
- Players from other brands that run BluOS

{% include integrations/config_flow.md %}

Home Assistant discovers your players automatically. If a player is not discovered, add it manually with these fields:

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your player. For example, `192.168.1.100`. You can find the IP address in your router."
Port:
  description: "The port of the BluOS API on your player. This is usually `11000`, the default value."
{% endconfiguration_basic %}

{% note %}
If your player gets a new IP address, Home Assistant updates it automatically when it discovers the player again. If you added the player manually because it is not discovered, give the player a fixed IP address in your router.
{% endnote %}

## Supported functionality

The integration creates one device for each player, with the following entities.

### Media player

The media player entity has the name of your player. With it, you can:

- See what is playing: the title, artist, album, cover art, and the position in the track
- Play, pause, and stop playback
- Skip to the next or previous track
- Seek within a track, when the current stream allows it
- Turn shuffle on or off
- Change the volume and mute the player
- Select a source: the presets and inputs of your player
- Play media and browse the audio sources of Home Assistant, such as [Radio Browser](/integrations/radio_browser/) or your local media
- Group players with the [**Join media players**](/actions/media_player.join/) and [**Unjoin media player**](/actions/media_player.unjoin/) actions
- Clear the play queue

### Buttons

These are the available button entities:

- `button.speaker_name_set_sleep_timer`: Setting a sleep timer.
- `button.speaker_name_clear_sleep_timer`: Clearing the sleep timer.

Replace `speaker_name` with the name of your speaker.

#### Button `button.speaker_name_set_sleep_timer`

Sets a sleep timer that stops playback when it runs out. Each press moves the timer to the next step: 15, 30, 45, 60, and 90 minutes. Pressing it again at 90 minutes removes the timer.

If a timer is already running, a press moves it up to the next step. For example, with 13 minutes left, the timer is set to 15 minutes.

{% note %}
This button is [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).
{% endnote %}

#### Button `button.speaker_name_clear_sleep_timer`

Clear the sleep timer on a speaker, if one is set.

{% note %}
This button is disabled by default.
{% endnote %}

## Bluesound automation examples

Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Stop the music when everyone leaves home

When the last person leaves home, this automation stops the music on your players. Select all your players as the target.

- **Trigger**: Zone occupancy cleared
  - **Zone**: Home (`zone.home`)
- **Action**: Stop media
  - **Target**: Living room (`media_player.living_room`) and Kitchen (`media_player.kitchen`)

{% details "YAML example for stopping the music when everyone leaves home" %}

{% example %}
automation: |
  alias: "Stop the music when everyone leaves home"
  triggers:
    - trigger: zone.occupancy_cleared
      options:
        zone: zone.home
  actions:
    - action: media_player.media_stop
      target:
        entity_id:
          - media_player.living_room
          - media_player.kitchen
{% endexample %}

{% enddetails %}

### Automation: Start a preset in the morning

Every morning at 7:00, this automation sets the volume of the kitchen player and starts one of its BluOS presets. Presets appear as sources of the player, so you select them by their name in BluOS.

- **Trigger**: Time, at 07:00
- **Actions**:
  - Set media player volume
    - **Target**: Kitchen (`media_player.kitchen`)
    - **Level**: 0.2
  - Select media player source
    - **Target**: Kitchen (`media_player.kitchen`)
    - **Source**: The name of your preset, for example `Morning radio`

{% details "YAML example for starting a preset in the morning" %}

{% example %}
automation: |
  alias: "Start a preset in the morning"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: media_player.volume_set
      target:
        entity_id: media_player.kitchen
      data:
        volume_level: 0.2
    - action: media_player.select_source
      target:
        entity_id: media_player.kitchen
      data:
        source: "Morning radio"
{% endexample %}

{% enddetails %}

### Automation: Reset the volume when the TV turns on

If your TV plays its sound through a Bluesound player, the volume might still be loud from the last time you played music. When the TV turns on, this automation sets the player to a comfortable volume.

- **Trigger**: Media player turned on
  - **Target**: Living room TV (`media_player.living_room_tv`)
- **Action**: Set media player volume
  - **Target**: Living room (`media_player.living_room`)
  - **Level**: 0.3

{% details "YAML example for resetting the volume when the TV turns on" %}

{% example %}
automation: |
  alias: "Reset the volume when the TV turns on"
  triggers:
    - trigger: media_player.turned_on
      target:
        entity_id: media_player.living_room_tv
  actions:
    - action: media_player.volume_set
      target:
        entity_id: media_player.living_room
      data:
        volume_level: 0.3
{% endexample %}

{% enddetails %}

## Data updates

The integration asks each player for changes, and the player answers as soon as something changes. This way, changes to playback, volume, and groups show in Home Assistant almost immediately. The integration {% term polling polls %} the presets and inputs of each player every 15 minutes.

If a player can't be reached, the integration marks it as unavailable and tries again every 3 minutes.

## Known limitations

- The integration only connects to players over IPv4. When you add a player manually, use its IPv4 address. A player that is discovered with only an IPv6 address is not offered for setup.
- When a player is part of a group and is not the leader, it shows as idle and does not show what is playing. It only offers volume, mute, and grouping controls. To see what is playing and to control playback, use the group leader instead.
- While a player indexes its music library, the playback controls and source selection are not available.
- When the volume of a player is fixed in BluOS, the volume controls are not available.
- The media browser shows the audio sources of Home Assistant, not the music library or streaming services of BluOS.

## Troubleshooting

### Symptom: The player is not discovered

#### Description

Home Assistant finds players with mDNS. If mDNS does not reach Home Assistant, for example because the player is on a different network or VLAN, the player is not discovered.

#### Resolution

1. Make sure mDNS traffic from the player reaches Home Assistant. For example, put both on the same network, or turn on the mDNS proxy or reflector of your router to forward mDNS between your networks.
2. If that is not possible, add the player manually with its IP address.

### Symptom: "Failed to connect" or the player is unavailable

#### Description

Home Assistant can't reach the player on its IP address and port. This happens when the player has no power or has lost its network connection, has changed its IP address, or port `11000` is blocked between Home Assistant and the player.

#### Resolution

1. Make sure the player is plugged in and connected to your network.
2. If you added the player manually, check that its IP address has not changed. Give the player a fixed IP address in your router, so that its address stays the same.
3. Make sure port `11000` on the player is reachable from Home Assistant.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
