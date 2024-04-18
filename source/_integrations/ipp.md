---
title: Internet Printing Protocol (IPP)
description: Instructions on how to integrate printers that support the Internet Printing Protocol (IPP) into Home Assistant.
ha_category:
  - System monitor
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
