---
title: Wevolor
description: Integrating the Wevolor WiFi controller for Levolor 6-channel remote for motorized shades and blinds.
ha_release: "2022.1.1"
ha_category: Cover
ha_iot_class: "Assumed State"
ha_config_flow: true
ha_codeowners:
  - '@timstallmann'
ha_domain: wevolor
---

[Levolor](https://levolor.com) is an American manufacturer of window shades and coverings. Motorized Levolor blinds can be controlled via the [Levolor Premium 6-Channel Remote](https://www.levolor.com/premium-6-channel-remote.html), which syncs via Bluetooth with a smartphone app but does not offer any remote control over Wi-Fi.

[Wevolor](https://wevolor.com) is a Wi-Fi-enabled IoT device, built by Roger Hoggarth, which syncs with the Levolor 6-channel remote to allow linking Levolor blinds to a home automation system. The Wevolor firmware can be downloaded for free and installed on a compatible Arduino device, or Wevolor devices can be purchased from the Wevolor website.

This integration supports Wevolor [version 5.4](https://wevolor.com/instructions/wevolor_instructions_5_4.html) and greater, using the locally available API. Your Wevolor device will need to have a static IP address on the local network since Wevolor does not support any sort of auto-discovery.

{% include integrations/config_flow.md %}

{% configuration_basic %}
  host:
    description: The IP address of the Wevolor device on the local network.
  channel_count:
    description: The number of channels (1-6) you would like to be displayed in the UI for this Wevolor device.
  support_tilt:
    description: Set true if any of the Levolor blinds you are controlling support tilt, false otherwise.
{% endconfiguration_basic %}

## Cover

After setup, your shades/blinds will appear in Home Assistant with one entity per channel on the remote, e.g. `cover.wevolor_channel_1`, `cover.wevolor_channel_2`, etc.

For more information on working with shades in Home Assistant, see the [Covers component](/integrations/cover/).

Available services: `cover.open_cover`, `cover.close_cover`, `cover.stop_cover`. When tilt is enabled, `cover.open_cover_tilt`, `cover.close_cover_tilt` and `cover.stop_cover_tilt` are also available.
