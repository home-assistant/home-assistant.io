---
description: Instructions on how to set up Rainforest RAVEn devices with Home Assistant.
ha_release: 2024.2
ha_domain: rainforest_raven
---

The RAVEn family of devices from Rainforest Automation, Inc. includes the [EMU-2](https://www.rainforestautomation.com/rfa-z105-2-emu-2-2/), a wireless device that reads energy usage information directly from your utility meter. This integration connects to a RAVEn-compatible device over USB or a network socket to integrate instantaneous power demand, accumulated usage, and current unit pricing.

{% include integrations/config_flow.md %}

To connect over a network socket, select **Network socket** under **Device**, then enter the endpoint in the format `socket://host:port`. After the endpoint connects, select the meter MAC addresses to monitor.
