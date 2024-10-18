---
title: RoonLabs music player
description: Instructions on how to integrate a RoonLabs multi room player into Home Assistant.
ha_category:
  - Media player
ha_release: 0.115
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@pavoni'
ha_domain: roon
ha_platforms:
  - event
  - media_player
ha_integration_type: integration
---

The Roon integration allows you to control [RoonLabs](https://roonlabs.com/) music players from Home Assistant.

This integration uses Roon Core, a Roon application that runs on a machine on your network. Via Roon Core, Home Assistant can control all the Roon music players on your network.

## Configuration

1. From the Home Assistant front-end, go to {% my integrations title="**Settings** > **Devices & services**" %}. Select the **Roon** integration. Then, select **Configure**.
2. Home Assistant will then try to find your Roon Core - if it is successful it will display `Authorize HomeAssistant in Roon`. Select **Submit** and skip to step 4.
3. If your Roon Core is not automatically found, enter the `Hostname` or `IP address` for the Roon Core machine when requested and select **Submit**.
4. Home Assistant will then contact your Roon Core and ask to be authorized. You will need to enable this extension in the Room Application. Go to **Settings** and then **Extensions**. There, you will see an entry for Home Assistant with a button next to it. Select **Enable**.
5. Roon core will then provide Home Assistant with the details of your media players.
6. In Home Assistant you can then pick an area for each of your music players, and add them to Home Assistant.

## Actions

### Action `media_player.play_media`

Roon uses a path based on the roon browser hierarchy to specify which media to play. You can find this by using the media browser, or by following the examples below. If roon can't follow the path you will find an error in the log that will show which part of the path roon could not follow, and the possibilities at that point.

| Data attribute | Optional | Description                                                             |
| ---------------------- | -------- | ----------------------------------------------------------------------- |
| `entity_id`            | yes      | Target a specific media player. To target all media players, use `all`. |
| `media_content_id`     | no       | A path to specify the media you want to play, see examples below.       |
| `media_content_type`   | no       | Only `music` is supported                                               |

 For example to play the album Harvest by Neil Young you should set `media_content_id` to `Library/Artists/Neil Young/Harvest` and to play BBC Radio 4 you would set `media_content_id` to `My Live Radio/BBC Radio 4`

### Action `roon.transfer`

Transfer playback from one player to another.

| Data attribute | Optional | Description                   |
| ---------------------- | -------- | ----------------------------- |
| `entity_id`            | yes      | id of the source player.      |
| `transfer_id`          | no       | id of the destination player. |

## Roon endpoint volume control via Home Assistant

For media players that are not fully integrated into roon, it is possible to use Home Assistant to implement a volume control action. This allows the native Roon apps to change the volume of an endpoint via automation in Home Assistant.

For example if you have an amplifier where the volume can be controlled by Home Assistant (perhaps via an integration, or using an IR Blaster) you can have the roon apps use these to change volume.

### Configuration in Roon

The first step is to tell Roon to use Home Assistant to make volume changes. You do this in the roon app. First select the zone you wish to control; click on the cog item to enter Zone Setup, and then select Device Setup.

![Roon volume options](/images/integrations/roon/roon_volume_options.png)

One of the options shown is Volume Control. Alongside the normal roon options (such as DSP Volume) you will see a series of options called Home Assistant: *Zone Name*. Choose the option that matches the zone you are configuring.

The Roon volume control will now show plus and minus buttons rather than a volume control slider.

### Automation in Home Assistant

Clicking on the plus and minus buttons in Roon can now trigger an automation in the volume control entity matching the media_player in Home Assistant.

In this autimation you can use Home Assistant actions to provide `volume_up` and `volume_down`.

Here is an example automation using an IR blaster to control `media_player_study`

```yaml
alias: "Roon Study Volume"
mode: queued
triggers:
  - trigger: state
    entity_id:
      - event.study_roon_volume
actions:
  - choose:
      - conditions:
          - condition: state
            entity_id: event.study_roon_volume
            attribute: event_type
            state: volume_up
        sequence:
          - action: remote.send_command
            data:
              num_repeats: 1
              delay_secs: 0.4
              hold_secs: 0
              device: amplifier
              command: volume_up
            target:
              entity_id: remote.ir_blaster
      - conditions:
          - condition: state
            entity_id: event.study_roon_volume
            attribute: event_type
            state: volume_down
        sequence:
          - action: remote.send_command
            data:
              num_repeats: 1
              delay_secs: 0.4
              hold_secs: 0
              device: amplifier
              command: volume_down
            target:
              entity_id: remote.ir_blaster
```
