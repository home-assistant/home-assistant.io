---
title: Arcam FMJ Receivers
description: Instructions on how to integrate Arcam FMJ Receivers into Home Assistant.
ha_category:
  - Media player
ha_release: 0.96
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@elupus'
ha_domain: arcam_fmj
ha_ssdp: true
ha_platforms:
  - media_player
  - sensor
ha_integration_type: device
---

The **Arcam FMJ Receivers** integration allows you to control [Arcam Receivers and Processors](https://www.arcam.co.uk/range/fmj.htm) from Home Assistant.

Supported devices:

- AV 40
- AV 41
- AV 860
- AVR 5
- AVR 10
- AVR 11
- AVR 20
- AVR 21
- AVR 30
- AVR 31
- AVR 380
- AVR 390
- AVR 450
- AVR 550
- AVR 750
- AVR 850
- AVR 860
- SA 10
- SA 20
- SA 30
- SR 250
- ST 60

This integration may also work with [JBL](https://www.jblsynthesis.com/products/electronics/) and [AudioControl](https://www.audiocontrol.com/home-audio/) receivers and processors as they share the same firmware as Arcam.

- SDP-55/58

{% include integrations/config_flow.md %}

## Supported functionality

### Sensors

The integration provides diagnostic sensors for monitoring the incoming audio and video stream properties of each zone. All sensors are disabled by default and can be enabled from the device page.

#### Video sensors

- **Incoming video horizontal resolution**: The horizontal resolution of the incoming video signal, in pixels.
- **Incoming video vertical resolution**: The vertical resolution of the incoming video signal, in pixels.
- **Incoming video refresh rate**: The refresh rate of the incoming video signal, in Hz.
- **Incoming video aspect ratio**: The aspect ratio of the incoming video signal (16:9, 4:3, or undefined).
- **Incoming video colorspace**: The colorspace of the incoming video signal (Normal, HDR10, HDR10+, HLG, or Dolby Vision).

#### Audio sensors

- **Incoming audio format**: The format of the incoming audio signal, such as PCM, Dolby Digital, DTS, Dolby TrueHD, Dolby Atmos, Auro-3D, and others.
- **Incoming audio configuration**: The spatial configuration of the incoming audio signal, such as stereo, 5.1, 7.1, or various Auro-3D and Dolby Atmos layouts.
- **Incoming audio sample rate**: The sample rate of the incoming audio signal, in Hz.

## Power state

Arcam receivers turn off their network port when in standby, the integration will try to reconnect to the receiver every 5 seconds. This means powering on the first zone is not possible over the built-in network connection. 

Note: Some newer models offer the ability to configure the device to keep the network port active when in standby mode. This can be found under **HDMI Settings** > **HDMI Bypass & IP**. Enabling **HDMI & IP On** will allow full power control from Home Assistant.

Two other options for complete power control exists: IR or Serial gateway.

### IR command

Use an IR blaster to send a command to turn the device on using these discrete codes:

- Zone 1: Protocol: RC5 Device: 16 Function: 123
- Zone 2: Protocol: RC5 Device: 23 Function: 123

Turn on sometime requires two IR codes to be sent. You can generate the raw, broadlink or other IR format string using [irgen](https://github.com/elupus/irgen) tool like:

```shell
irgen -i rc5 -d 16 0 123 -o broadlink_base64 -r 2
```

To trigger this IR command add an automation on the event `arcam.turn_on` filtering on
the `entity_id` of the `media_player` zone entity. This can be added using device automations
or manually using normal automations.

### Serial port to network gateway

Use a network to a serial port gateway to connect to the serial port of the
receiver. The serial port is always available and can power on the device.
This is the most reliable communication method as well.
