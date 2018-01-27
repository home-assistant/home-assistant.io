---
layout: page
title: "Universal"
description: "Instructions how to create a delegated media player in Home Assistant."
date: 2017-11-23 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Media Player
featured: false
---

Delegate Media Player allow users to delegate the operations of a basic media player to scripts in the Home Assistant configuration file. This is used for controlling media players that do not support an integration interface by using IR blasters such as [Broadlink](/components/switch.broadlink/), scripts or other means to control the media player.

A Delegate Media Player is created in `configuration.yaml` as follows.

```yaml
# Example configuration.yaml entry
media_player:
  - platform: delegate_media_player
    name: "The Amp"
    turn_on_action:
      service: switch.turn_on
      entity_id: switch.the_amp_socket
    turn_off_action:
      service: switch.turn_off
      entity_id: switch.the_amp_socket
    volume_up_action:
      service: broadlink.send_packet_192_168_1_2
      data:
        - packet: 'JgBQAAABJ5QTEhI4EjgSExISExMRFBI3EjgTNxITEjgSEhM4EjcSFBI3EjgTEhITEhMSExITEhITExEUEjcSOBM3EjgSOBI4EgAFIAABJkoTAA0FAAAAAAAAAAA='
    volume_down_action:
      service: broadlink.send_packet_192_168_1_2
      data:
        - packet: 'JgBQAAABJ5QSExM3EjgSExISExMRFBI3EjgTOBETEzcSExI4EjgRFBI3EhQRExMSEhMSExMSEhMSExI4EjgROBM4ETgSOBI4EgAFIAABJ0kTAA0FAAAAAAAAAAA='
    volume_mute_action:
      service: service: persistent_notification.create
      data:
        title: New Chore
        message: Can someone please turn the volume of the amp all the way down?
    volume_unmute_action:
      service: service: persistent_notification.create
      data:
        title: New Chore
        message: Can someone please turn the volume of the amp back up again?
    select_source_action:
      service: service: persistent_notification.create
      data_template:
        title: New Chore
        message: Can someone change the channel of the amp to {{ source_namme }}
    source_names:
      input_1: "Computer"
      input_2: "Technics 1200 MKII"
```

Configuration variables:

- **name** (*Optional*): The name to assign the player, "Delegate Media Player" will be used if not provided.
- **turn_on_action** (*Optional*): The script to use to turn the media player on.
- **turn_off_action** (*Optional*): The script to use to turn the media player off.
- **volume_up_action** (*Optional*): The script to use to increase the volume one step.
- **volume_down_action** (*Optional*): The script to use to decrease the volume one step.
- **volume_set_action** (*Optional*): The script to use to set the volume to a specific level.
- **initial_volume** (*Optional*): The volume level when turning the media player on. Defaults to 50.
- **volume_step** (*Optional*): How much the volume is increased on each step. Defaults to 5.
- **volume_step_delay** (*Optional*): How long to wait between steps when adjusting the volume by more than one step.
- **volume_mute_action** (*Optional*): The script to use when muting the volume.
- **volume_unmute_action** (*Optional*): The script to use when unmuting the volume.
- **source_names** (*Optional*): The source keys and names to populate the input selector with.
- **select_source_action** (*Optional*): The script to use to turn change the media player´s input source.

The media player will adapt its capabilites based on which actions are configured.
- The on/off button will be available if both the **turn_on_action** is provided.
- The off button will be clickable if a **turn_off_action** is provided.
- The volume controls will be available if either a **volume_set_action** or the **volume_up_action** and **volume_down_action** scripts are provided.
- The mute button will be available if both the **volume_mute_action** and **volume_unmute_action** are provided.
- The source selector will be available if both a source list and the **select_source_action** are provided.

Since this media player is intended to be used with older devices that have limited remote control capabilities, it is likely that the device does not support setting the volume directly using the **volume_set_action** in such scenarios the media player will delegate volume control to repeated calls to either the **volume_up_action** or the **volume_down_action**. The amount and speed of volume adjustments can be configured using the **volume_step** and **volume_step_delay** attributes. This is useful if using IR blasters to change the volume.
