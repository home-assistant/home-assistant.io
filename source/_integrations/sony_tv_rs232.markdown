---
description: Instructions on how to integrate Sony Bravia TVs via their RS-232 serial port into Home Assistant.
ha_release: 2026.12
ha_domain: sony_tv_rs232
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
- Sony TVs only accept the power-on command while in standby if their **Standby Command** mode was armed while the TV was on. The integration arms it on every connection, so after setting up the integration turn the TV on once; power control works from then on.

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

- While the TV is on, it asks for the power state, input source, volume and mute state.
- While the TV is in standby, it only asks for the power state, so turning the TV on with its remote is noticed within a minute.
- A few seconds after the TV reports that it turned on, the integration queries it once more so the entity repopulates once the set has booted.

Consumer Bravia sets that ignore status queries are not polled at all. Their entity only changes when a command sent from Home Assistant is acknowledged; changes made with the TV's remote are not picked up.

## Automation examples

{% include docs/paste_yaml_tip.md %}

### Turn the TV off when everyone leaves home

```yaml
automation:
  - alias: "Turn off the living room TV when away"
    triggers:
      - trigger: state
        entity_id: zone.home
        to: "0"
    actions:
      - action: media_player.turn_off
        target:
          entity_id: media_player.sony_tv
```

### Switch to HDMI 1 for movie night

```yaml
automation:
  - alias: "Movie night switches the TV to HDMI 1"
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
          source: "HDMI 1"
```

## Known limitations

- Setup cannot detect whether a TV is actually wired to the port: Sony's protocol has no ping, and consumer sets ignore status queries, so an empty port looks the same as a set-only TV.
- Consumer Bravia sets do not answer status queries, so their entity reflects only the commands sent from Home Assistant.
- Power-on from standby only works if the TV's Standby Command mode has been armed while the TV was on (see Prerequisites).
- A TV that has been idle for more than a few seconds loses the first command sent to it and answers with a parse error. The integration resends that one command automatically, so the first action after a quiet period is slightly slower.
- Different Sony models support different subsets of the command set, so some input sources or sound modes may not be selectable on every TV.

## Troubleshooting

### The entity is unavailable

The serial link to the TV is down. Home Assistant reconnects automatically with a backoff; the entity becomes available again as soon as the port opens. Check the cable and, for an ESPHome serial proxy, that the proxy is online.

### Commands are accepted but the TV does nothing

The port opens but the TV is not listening. Check that the cable is a null-modem cable and fully seated, and that the correct port was selected. If the TV was replaced, remove and re-add the integration.

### Turning the TV on does not work

The TV's Standby Command mode is not armed. Turn the TV on with its remote once while the integration is connected; it arms the mode on every connection, and power-on works from then on.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, no settings on the TV need to be changed.
