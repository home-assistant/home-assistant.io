---
title: Sony TV RS-232
description: Instructions on how to integrate Sony Bravia TVs via their RS-232 serial port into Home Assistant.
ha_categories:
  - media_entertainment.tv_streaming
ha_release: 2026.12
ha_iot_class: Local Polling
ha_codeowners:
  - '@bbangert'
ha_config_flow: true
ha_domain: sony_tv_rs232
ha_platforms:
  - media_player
ha_integration_type: device
ha_quality_scale: bronze
---

The **Sony TV RS-232** {% term integration %} lets you control Sony Bravia TVs by connecting to their RS-232 serial port. Because Home Assistant talks straight to the TV, control is local and fast, and it works on TVs whose network control is disabled, in rack rooms with serial matrices, and in wall-mounted installs that were wired for serial.

Unlike the [Sony Bravia TV](/integrations/braviatv/) integration, which uses the TV's network API, this integration never touches the network.

## Supported devices

Sony Bravia TVs and Pro Bravia / B2B displays with an RS-232C control port (a DE-9 connector on most sets, a 3.5&nbsp;mm jack on some) using Sony's Simple IP / RS-232C "Set" protocol. This includes:

- Pro Bravia (FW/FWD series) and other B2B displays, which also answer status queries.
- Consumer Bravia sets (KDL/KD/XBR series) with a serial port. These accept commands but, with few exceptions, do not answer status queries.

## Unsupported devices

- Sony TVs without a physical RS-232C port. For those, use the [Sony Bravia TV](/integrations/braviatv/) integration instead.

## Prerequisites

{% include integrations/serial_connected.md %}

- Sony TVs use a null-modem (cross-over) cable: the TX and RX lines must be swapped. The serial settings are fixed at 9600 baud, 8N1, no flow control.
- Sony TVs only accept the power-on command while in standby if their **Standby Command** mode was armed while the TV was on. The integration arms it whenever it sees the TV on, so turn the TV on before adding the integration. On a consumer Bravia set that does not answer status queries, the integration cannot see the TV turn on and only arms the mode when it connects: if the TV was in standby during setup, turn it on and then reload the integration once.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Port:
    description: "The serial port the TV is connected to. Select it from the list of ports that Home Assistant found, which includes the ports shared by your serial proxies. For a port on another system, select **Enter manually** and enter its URL, such as `socket://192.168.1.100:2000`."
{% endconfiguration_basic %}

Sony's protocol has no handshake, so setup can only verify that the port opens. A wiring problem shows up afterwards as commands that are never acknowledged.

## Supported functionality

The integration adds a single media player {% term entity %} for the TV.

### Media player

You can use Home Assistant to:

- Turn the TV on and off.
- Set the volume and step it up or down.
- Mute and unmute the TV.
- Select the input source (TV, Video 1–3, Component 1–2, HDMI 1–4, PC).
- Select the sound mode (Dynamic, Standard, Custom).

The media player is an *assumed-state* entity: it reflects the last acknowledged command, and on displays that answer status queries, the last answer.

## Data updates

Sony TVs do not report changes on their own over RS-232. On displays that answer status queries (Pro Bravia), Home Assistant {% term polling polls %} the TV every 60 seconds:

- While the TV is on, it asks for the power state, input source, volume, mute state and sound mode.
- While the TV is in standby, it only asks for the power state, so turning the TV on with its remote is noticed within a minute.
- A few seconds after the integration sees the TV turn on, whether from Home Assistant or with its remote, it queries the TV once more so the entity repopulates once the set has booted.

Consumer Bravia sets that ignore status queries are not polled at all. Their entity only changes when a command sent from Home Assistant is acknowledged; changes made with the TV's remote are not picked up. Stepping the volume up or down leaves the volume level unknown until it is next set, because the TV does not say where the step landed.

## Automation examples

The examples use `media_player.sony_tv` as the TV's entity ID. Replace it with the entity ID of your TV.

{% include docs/paste_yaml_tip.md %}

### Turn the TV off when everyone leaves home

- **Trigger**: Entity: State of the **Home** zone changes to `0`
- **Action**: Media player: Turn off, targeting the TV

{% details "YAML example for turning off the TV when everyone leaves" %}

{% example %}
automation: |
  alias: "Turn off the living room TV when away"
  triggers:
    - trigger: state
      entity_id: zone.home
      to: "0"
  actions:
    - action: media_player.turn_off
      target:
        entity_id: media_player.sony_tv
{% endexample %}

{% enddetails %}

### Switch to HDMI 1 for movie night

This example is triggered by a [toggle helper](/integrations/input_boolean/) named **Movie night** (`input_boolean.movie_night`). Create the helper first, or replace the trigger with your own.

- **Trigger**: Entity: State of **Movie night** changes to on
- **Actions**:
  - Media player: Turn on, targeting the TV
  - Media player: Select source **HDMI 1**, targeting the TV

{% details "YAML example for switching to HDMI 1 for movie night" %}

In YAML, a source is given by its value (`hdmi1`), not the name shown in the interface (**HDMI 1**).

{% example %}
automation: |
  alias: "Movie night switches the TV to HDMI 1"
  triggers:
    - trigger: state
      entity_id: input_boolean.movie_night
      to: "on"
  actions:
    - action: media_player.turn_on
      target:
        entity_id: media_player.sony_tv
    - action: media_player.select_source
      target:
        entity_id: media_player.sony_tv
      data:
        source: hdmi1
{% endexample %}

{% enddetails %}

## Known limitations

- Setup cannot detect whether a TV is actually wired to the port: Sony's protocol has no ping, and consumer sets ignore status queries, so an empty port looks the same as a set-only TV.
- Consumer Bravia sets do not answer status queries, so their entity reflects only the commands sent from Home Assistant.
- Power-on from standby only works once the TV's Standby Command mode has been armed while the TV was on (see Prerequisites).
- A TV that has been idle for more than a few seconds loses the first command sent to it and answers with a parse error. The integration resends that one command automatically, so the first action after a quiet period is slightly slower.
- Different Sony models support different subsets of the command set, so some input sources or sound modes may not be selectable on every TV.

## Troubleshooting

### The entity is unavailable

The serial link to the TV is down. Home Assistant reconnects automatically with a backoff; the entity becomes available again as soon as the port opens. Check the cable and, for an ESPHome serial proxy, that the proxy is online.

### Commands are accepted but the TV does nothing

The port opens but the TV is not listening. Check that the cable is a null-modem cable and fully seated, and that the correct port was selected. If the TV was replaced, remove and re-add the integration.

### Turning the TV on does not work

The TV's Standby Command mode is not armed. Turn the TV on with its remote. On a display that answers status queries, the integration arms the mode at its next poll, within a minute. On a consumer Bravia set, reload the integration while the TV is on. Power-on works from then on.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, no settings on the TV need to be changed.
