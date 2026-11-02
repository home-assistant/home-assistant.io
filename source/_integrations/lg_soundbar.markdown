---
description: Instructions on how to integrate LG Soundbars into Home Assistant.
ha_release: 0.81
ha_domain: lg_soundbar
---

The **LG Soundbars** {% term integration %} allows you to control [LG Soundbars](https://www.lg.com/us/sound-bars) from Home Assistant.

Supported devices:

- Devices in the SK and SN range with Ethernet and/or Wi-Fi

{% include integrations/config_flow.md %}

Soundbars that are on and connected to the same network as Home Assistant are discovered automatically. Soundbars that do not report a unique identifier are not discovered: add them by entering their IP address instead.

## Supported operations

- These devices support mute, volume control, source selection and mode selection.

## Data updates

The soundbar pushes its state to Home Assistant as soon as it changes.

When the soundbar is unplugged or loses power, for example when it is powered through a smart plug, its entity becomes unavailable within a few seconds. Home Assistant keeps trying to reconnect in the background and reconnects within a few seconds once the soundbar is back on the network. You do not need to reload the integration.

If a soundbar that reports a unique identifier gets a new IP address, Home Assistant updates its address automatically when the soundbar announces itself on the network.
