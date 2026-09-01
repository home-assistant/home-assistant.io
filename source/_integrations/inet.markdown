---
title: iNet Radio
description: Instructions on how to integrate Busch-Jaeger iNet Radio devices into Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Push
ha_release: 2026.3
ha_domain: inet
ha_platforms:
  - media_player
ha_codeowners:
  - '@JonatanMGit'
ha_integration_type: device
ha_config_flow: true
ha_quality_scale: bronze
---

The **iNet Radio** {% term integration %} allows you to control your [Busch-Jaeger](https://www.busch-jaeger.de/) iNet Radio devices from Home Assistant. These are flush-mounted radios designed for in-wall installation.

With this integration, you can turn the radio on and off, adjust the volume, mute, and switch between FM station presets, the AUX input, and the UPnP source.

## Supported devices

The following devices are supported by the integration:

- Busch-Jaeger 8216 UP iNet Radio

More radios may be supported if they can be controlled using the Remote Busch-Radio iNet app.

## Prerequisites

Before setting up the integration, make sure your iNet Radio is:

1. Installed and powered on.
2. Connected to your local network.
3. Reachable from the device running Home Assistant (on the same network or subnet).

{% include integrations/config_flow.md %}

The integration can automatically discover iNet Radio devices on your local network. If your radio is found, select it from the list. If it is not found, you can choose **Enter IP address manually** and provide the IP address of the radio.

{% configuration_basic %}
Radio:
    description: "Select a discovered radio from the list, or choose to enter an IP address manually."
Host:
    description: "The IP address of your iNet Radio. You can find it in your router's device list."
{% endconfiguration_basic %}

## Supported functionality

The integration provides a media player {% term entity %} for each configured radio with the following capabilities:

- **Turn on and off**: Power the radio on or off.
- **Volume control**: Set the volume level, increase or decrease it by one step, and mute or unmute the radio.
- **Source selection**: Switch between FM station presets (up to 8), the AUX input, and the UPnP source.

The current station name and playback state are displayed when the radio is on.

## Removing the integration

{% include integrations/remove_device_service.md %}
