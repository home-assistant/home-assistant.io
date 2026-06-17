---
title: Marantz RS-232
description: Instructions on how to integrate Marantz receivers via their RS-232 serial port into Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Push
ha_release: 2026.7
ha_codeowners:
  - '@balloob'
ha_config_flow: true
ha_domain: marantz_rs232
ha_platforms:
  - media_player
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Marantz RS-232** {% term integration %} lets you control Marantz receivers by connecting to their RS-232 serial port. By connecting the receiver to your Home Assistant server using a serial (RS-232) cable, an ESPHome-based serial proxy, or a USB-to-serial adapter, you get local control with push-based state updates.

Controlling a receiver via RS-232 is reliable and works even when the receiver is in standby, without depending on the network.

## Supported devices

This integration speaks three different generations of the Marantz serial protocol. You select which one to use when adding the integration, based on your receiver model:

| Model selection | Protocol | Example models |
| --------------- | -------- | -------------- |
| Modern          | 2015+    | PM6006, PM7000N, and other recent Marantz receivers |
| SR7002          | 2007     | SR7002 |
| SR8002          | 2007     | SR8002 |
| SR9300          | 2003     | SR9300 |
| SR8300          | 2003     | SR8300 |

Other receivers that share one of these command sets generally work when you pick the closest matching protocol, but they have not been individually tested.

## Prerequisites

- A Marantz receiver that supports control over its RS-232 serial port.
- A physical serial connection between your receiver and the system running Home Assistant. This can be a direct serial (RS-232) cable, a USB-to-serial adapter, or an [ESPHome]({% link _integrations/esphome.markdown %})-based serial proxy.
- The receiver must be powered on for the initial connection during setup.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Receiver model:
    description: "The model (and therefore protocol) of your receiver. Choose **Modern** for current Marantz receivers, or the specific model name for older SR-series receivers."
Port:
    description: "The serial port the receiver is connected to. This can be a local device path or a remote serial proxy URL. For example, `/dev/ttyUSB0` (USB adapter), `socket://192.168.1.100:2000` (network proxy), or `socket://esphome-device.local:6638` (ESPHome)."
{% endconfiguration_basic %}

## Supported functionality

The integration adds a media player {% term entity %} for the receiver, and additional entities for each extra zone the receiver supports.

### Media player controls

For supported receivers, you can use Home Assistant to:

- Turn the receiver on and off.
- Change the volume and step it up or down.
- Mute and unmute the main zone.
- Select the input source.

### Zones

If your receiver supports additional zones or a multi-room output, Home Assistant adds separate media player entities for them. The available zones depend on your receiver model and which protocol you selected:

- Modern receivers expose the main zone plus Zone 2 and Zone 3 when present.
- 2007-era receivers expose the main zone plus a multi-room output when present.
- 2003-era receivers expose the main zone plus a multi-room output when present.

Only zones that report a state during setup are added.

### Source selection

The list of available input sources depends on the protocol selected for your receiver.

## Data updates

The receiver reports changes on its own over the serial connection, so Home Assistant receives state updates as they happen without {% term polling %}. Changes made with the receiver's own remote or front panel are reflected in Home Assistant right away.

## Known limitations

- Older receivers support a smaller set of input sources and features than modern models, so some controls may not be available depending on the selected protocol.
- Some receivers ignore the power-on command over RS-232 while in a deep standby mode. If turning the receiver on does not work, check the receiver's power-saving or network-standby settings.

## Troubleshooting

### Can't set up the device

#### Symptom: "Failed to connect"

When trying to set up the integration, the form shows the message "Failed to connect".

#### Description

Home Assistant could not communicate with the receiver over the serial port.

#### Resolution

To resolve this issue, try the following steps:

1. Make sure the receiver is powered on. The receiver must be on for the initial connection.
2. Confirm the correct serial port was selected, and that no other software is using it.
3. Verify the cable is fully seated and, for USB adapters, that the adapter is recognized by the host.
4. Make sure you selected the protocol that matches your receiver model.
5. For network serial proxies, confirm the network connection between Home Assistant and the proxy.

### The receiver becomes unavailable

If the serial connection is lost, the entities become unavailable and Home Assistant automatically reconnects. Check the cable and, for network serial proxies, the network connection between Home Assistant and the proxy.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
