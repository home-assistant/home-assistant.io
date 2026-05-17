---
title: LG TV via Serial
description: Instructions on how to integrate LG TVs via their RS-232 serial port into Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Polling
ha_release: 2026.6
ha_codeowners:
  - '@balloob'
ha_config_flow: true
ha_domain: lg_tv_rs232
ha_platforms:
  - media_player
ha_integration_type: device
ha_quality_scale: silver
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **LG TV via Serial** {% term integration %} lets you control LG TVs by connecting to their RS-232 serial port. By connecting the TV to your Home Assistant server using a serial (RS-232) cable, an ESPHome-based serial proxy, or a USB-to-serial adapter, you get local control of the TV.

Controlling a TV via RS-232 is more reliable and responsive than using the TV's network or IR interfaces, and it works even when the TV is in standby. It also allows you to control TVs that do not have smart features or network connectivity.

## Supported devices

The following devices have been tested with the integration:

- LG OLED55B7A

In general, LG TVs and commercial displays that expose an RS-232C control port (DE-9 connector or, on some sets, a 3.5&nbsp;mm service jack) are supported.

Most LG TVs sold starting roughly 2008, as well as LG commercial signage displays, include this port. Both the modern (`xb`) and legacy (`kb`) input-selection commands are supported, so older sets work too.

## Unsupported devices

- LG TVs without a physical RS-232C port. Many entry-level TVs from 2018 onwards dropped the serial port. For those, use the [LG webOS Smart TV]({% link _integrations/webostv.markdown %}) integration instead.

## Prerequisites

- A physical serial connection between your TV and the system running Home Assistant. This can be a direct serial (RS-232) cable, a USB-to-serial adapter, or an [ESPHome]({% link _integrations/esphome.markdown %})-based serial proxy.
- LG TVs use a null-modem (cross-over) cable: the TX and RX lines must be swapped.
- **RS-232C Control** must be enabled on the TV. On many LG models this option lives in a hidden service (`InStart`) menu. Consult your TV's documentation.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Port:
    description: "The serial port the TV is connected to. This can be a local device path, or a remote serial proxy URL."
Set ID:
    description: "The set ID configured on the TV (1-99). Leave this at the default of `1` for a single TV. When multiple TVs are daisy-chained on the same RS-232 bus, give each set a unique ID and add a separate entry for each."
{% endconfiguration_basic %}

## Supported functionality

The integration adds a single media player {% term entity %} for the TV.

### Media player

For supported TVs, you can use Home Assistant to:

- Turn the TV on and off.
- Change the volume and step it up or down.
- Mute and unmute the TV.
- Select the input source.

## Data updates

LG TVs do not report changes on their own over RS-232, so Home Assistant {% term polling polls %} the TV every 5 seconds for its power state, input source, volume, and mute state. Changes made with the TV's own remote are picked up at the next poll.

While the TV is in standby it only answers the power query. Other attributes, such as volume and input source, are populated once the TV is on.

## Automation examples

The real power of this integration is tying the TV into the rest of your home.

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
          entity_id: media_player.lg_tv
```

### Switch to the HDMI input when starting movie night

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
          entity_id: media_player.lg_tv
      - action: media_player.select_source
        target:
          entity_id: media_player.lg_tv
        data:
          source: "HDMI 1"
```

## Known limitations

- Many LG TVs ignore the power-on command over RS-232 while the set is in standby. If turning the TV on does not work, you might have to disable a power saving mode.
- Different LG models support different subsets of the RS-232 command set, so some input sources may not be selectable on every TV.
- If the TV is configured to route audio to an external output (such as optical or HDMI ARC) instead of the TV speakers, the volume controls are not shown for the media player.

## Troubleshooting

### Can't set up the device

#### Symptom: "Failed to connect"

When trying to set up the integration, the form shows the message "Failed to connect".

#### Description

Home Assistant could not communicate with the TV over the serial port.

#### Resolution

To resolve this issue, try the following steps:

1. Make sure the TV is powered on. The TV must be on for the initial connection.
2. Make sure **RS-232C Control** is enabled in the TV's service menu.
3. Verify the cable is a null-modem (cross-over) cable and is fully seated. LG's RS-232 jack is recessed, so push the plug in until it clicks.
4. Confirm the correct serial port was selected, and that no other software is using it.
5. If you use multiple daisy-chained TVs, confirm the set ID matches the one configured on the TV.

### The TV becomes unavailable

If the serial connection is lost, the entity becomes unavailable and Home Assistant automatically reconnects. Check the cable and, for network serial proxies, the network connection between Home Assistant and the proxy.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
