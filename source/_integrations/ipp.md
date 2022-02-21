---
title: Internet Printing Protocol (IPP)
description: Instructions on how to integrate printers that support the Internet Printing Protocol (IPP) into Home Assistant.
ha_category:
  - System Monitor
ha_release: 0.108
ha_iot_class: Local Polling
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@ctalkington'
ha_domain: ipp
---

The `Internet Printing Protocol (IPP)` integration allows you to read current data from your networked printer that supports the [Internet Printing Protocol](https://www.pwg.org/ipp/everywhere.html).

It provides information about the printer's state and remaining ink levels.

{% include integrations/config_flow.md %}

Currently, this integration shows ink levels as unavailable when a printer is offline. To save the levels an automation can be used to save them into an input_number helper when the printer comes online or the level is updated. Then a template sensor can be used to display them as sensors even when the printer is offline.
