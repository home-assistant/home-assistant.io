---
title: Cambridge Audio
description: Instructions on how to integrate Cambridge Audio Receivers into Home Assistant.
ha_category:
  - Media player
ha_release: '2024.10'
ha_iot_class: Local Push
ha_domain: cambridge_audio
ha_platforms:
  - diagnostics
  - media_player
ha_codeowners:
  - '@noahhusby'
ha_config_flow: true
ha_integration_type: device
ha_zeroconf: true
---

The **Cambridge Audio** {% term integration %} allows you to control all receivers and streamers that support the StreamMagic app.

The integration automatically discovers all enabled zones and sources. Each zone is added as a media player device with the enabled sources available as inputs. Media information and controls (such as play, pause, skip) are supported if the selected source reports it.

## Supported devices

This integration allows you to connect the following devices:

- Cambridge Audio Evo 75
- Cambridge Audio Evo 150
- Cambridge Audio CXN
- Cambridge Audio CXN (v2)
- Cambridge Audio CXR120
- Cambridge Audio CXR200
- Cambridge Audio 851N
- Cambridge Audio MXN10
- Cambridge Audio AXN10

Older, RS-232 serial-based amplifiers like the [CXA series](https://www.cambridgeaudio.com/usa/en/products/hi-fi/cx-series-2/cxa81)
use a different protocol and are not currently supported.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: The IP address of your device can be found by navigating to the device on the [StreamMagic app](https://www.cambridgeaudio.com/usa/en/products/streammagic) and selecting `Settings` → `IP address`.
    required: true
    type: string
{% endconfiguration_basic %}

## Troubleshooting

### The buttons to skip, shuffle, and repeat the track are missing

Control functionality depends on the source / service that is currently selected.
The interface automatically sets which controls are available depending on which source is selected.

### The ability to change volume is missing

Volume control is only supported on all-in-one amps, or streamers with pre-amp mode.
Likely, the device is not configured to be in pre-amp mode.
This can be changed by navigating to the IP address of the device in a web browser,
or selecting settings in the StreamMagic app and setting **Pre-Amp** to **On**.

### Turning on the device doesn't work from Home Assistant

Cambridge Audio devices come with ECO mode enabled by default, which disables the network interface when
the device is powered down. This can be changed by navigating to the IP address of the device in a web browser,
or selecting settings in the StreamMagic app and setting **Standby Mode** to **Network standby**.
