---
title: Samsung TV via ExLink
description: Instructions on how to integrate Samsung TVs via their ExLink (RS-232) serial port into Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Polling
ha_release: 2026.9
ha_codeowners:
  - '@balloob'
ha_config_flow: true
ha_domain: samsung_exlink
ha_platforms:
  - media_player
ha_integration_type: device
ha_quality_scale: silver
---

The **Samsung TV via ExLink** {% term integration %} lets you control Samsung consumer TVs by connecting to their RS-232 serial port, which Samsung markets as **ExLink** (also written EX-Link or EXT Link). By connecting the TV to your Home Assistant server using a serial cable, an ESPHome-based serial proxy, or a USB-to-serial adapter, you get local control of the TV.

Controlling a TV over ExLink is more reliable and responsive than using the TV's network or IR interfaces. It also allows you to control TVs that do not have smart features or network connectivity.

This integration speaks the serial control protocol only; it does not use the TV's network or Wi-Fi APIs. For network control, use the [Samsung Smart TV]({% link _integrations/samsungtv.markdown %}) integration instead.

## Supported devices

The following devices have been tested with the integration:

- Samsung The Frame (LS03B, 2022)

In general, Samsung consumer TVs (The Frame, Q-series, 8000-series, and similar) that expose an ExLink control port are supported.

Samsung TVs expose ExLink in one of two ways:

- A native 3.5&nbsp;mm ExLink jack, found on higher-end sets (Q70 and above). Plug in and go.
- A USB port together with the proprietary Samsung USB-to-ExLink dongle, used on the 8000 and Q60 series.

## Unsupported devices

- Samsung TVs without an ExLink jack or USB-to-ExLink dongle support.
- Samsung commercial displays that use the MDC protocol rather than ExLink.

## Prerequisites

- A physical serial connection between your TV and the system running Home Assistant. This can be a direct serial cable into the ExLink jack, the Samsung USB-to-ExLink dongle, or an [ESPHome]({% link _integrations/esphome.markdown %})-based serial proxy. The link is 9600&nbsp;8N1.
- On TVs that use the USB-to-ExLink dongle, **EXT Link Support** and **USB Serial** must be enabled in the TV's hidden service menu. To open it, with the TV off, press **Mute → 1 → 8 → 2 → Power** on the IR remote. The exact location of these settings varies by model, so consult your TV's documentation.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Serial port:
    description: "The serial port the TV is connected to. This can be a local device path or a remote serial proxy URL. For example, `/dev/ttyUSB0` (USB adapter) or `esphome://esphome-device.local/?port_name=uart` (ESPHome serial proxy)."
TV generation:
    description: "Optional. Select your TV's generation so Home Assistant can translate the active input back into a named source (for example, `HDMI 1`). Samsung encodes this read-back value differently per generation. Leave it empty if your model is not listed; you can still switch sources, but the currently active input is then tracked only from the commands Home Assistant sends."
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

Samsung TVs do not report changes on their own over ExLink, so Home Assistant {% term polling polls %} the TV every 5 seconds for its power state, volume, mute state, and input source.

While the TV is in standby it does not answer status queries. This is treated as the TV being off (not unavailable), and the volume, mute, and input source controls are only offered once the TV is on.

The active input source is only read back from the TV when a TV generation is selected during setup. Without it, the source shown reflects the last input Home Assistant selected, and changes made with the TV's own remote are not detected.

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
          entity_id: media_player.samsung_tv
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
          entity_id: media_player.samsung_tv
      - action: media_player.select_source
        target:
          entity_id: media_player.samsung_tv
        data:
          source: "HDMI 1"
```

## Known limitations

- While the TV is in standby, it only accepts the power-on command. The volume, mute, and input source controls are hidden until the TV is on.
- Reading back the active input source requires selecting a known TV generation during setup. Without it, the input shown reflects only what Home Assistant last selected.
- Different Samsung generations encode the source read-back value differently. If your model is not in the list of known generations, the active input cannot be named automatically.
- Some TVs and firmware do not answer status queries at all. On those sets, the power state and other attributes are tracked only from the commands Home Assistant sends.

## Troubleshooting

### Can't set up the device

#### Symptom: "Failed to connect"

When trying to set up the integration, the form shows the message "Failed to connect".

#### Description

Home Assistant could not communicate with the TV over the serial port.

#### Resolution

To resolve this issue, try the following steps:

1. On TVs that use the USB-to-ExLink dongle, make sure **EXT Link Support** and **USB Serial** are enabled in the TV's service menu (open it with **Mute → 1 → 8 → 2 → Power**).
2. Verify the cable is connected to the TV's 3.5&nbsp;mm ExLink jack (or the Samsung USB-to-ExLink dongle) and is fully seated.
3. Confirm the correct serial port was selected, and that no other software is using it.

### The TV becomes unavailable

If the serial connection is lost, the entity becomes unavailable and Home Assistant automatically reconnects. Check the cable and, for network serial proxies, the network connection between Home Assistant and the proxy.

Note that a TV in standby is shown as off, not unavailable. The entity only becomes unavailable when the serial connection itself drops.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
