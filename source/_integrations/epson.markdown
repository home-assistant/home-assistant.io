---
title: Epson
description: Instructions on how to integrate Epson projector into Home Assistant.
ha_category:
  - Media player
ha_release: 0.72
ha_iot_class: Local Polling
ha_domain: epson
ha_codeowners:
  - '@pszafer'
ha_config_flow: true
ha_platforms:
  - media_player
ha_integration_type: integration
---

The **Epson** {% term integration %} allows you to control a Epson projector from Home Assistant.
**The device has to be turned on during initial configuration.**
When you want to add a device for the first time, turn it on before following the integration steps.

{% include integrations/config_flow.md %}

## Supported features

- turn on/off
- set input
- set/get color mode including high/low lamp
- increase/decrease volume
- mute/unmute audio
- send next/previous track

## Supported devices

- Epson projectors supporting ESC/VP21 protocol.

### Tested devices

- Epson EH-TW5350
- Epson EH-TW7000
- Epson EH-TW9400W (shares platform with 7400/8400/9400(w))
- Epson EH-TW3200
- Epson Powerlite W39

## Configuration

This integration supports connecting to an Epson projector via LAN or Serial.

### LAN connection

Connect the projector to your LAN and enter the IP address of the projector when prompted, selecting either HTTP or TCP depending on what the projector model supports.
The iProjection app by Epson can be used to test if it is working.

### Serial connection

Connect projector directly to Home Assistant via a serial cable, or ser2net can be used as a Serial to network proxy.

#### ser2net configuration

A ser2net configuration similar to below can be used to expose the projector connected to `/dev/ttyUSB0` on port `3629`.

```yaml
connection: &con1
  accepter: tcp,3629
  connector: serialdev,/dev/ttyUSB0,9600n81
```

Then the projector can be added to the integration using  `socket://<ser2net_ip>:3629`.
