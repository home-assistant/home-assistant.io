---
title: cybro
description: Instructions on how to integrate cybro with Home Assistant.
ha_release: "???"
ha_category:
  - Binary Sensor
ha_iot_class: "Local Polling"
ha_config_flow: true
ha_codeowners:
  - '@killer0071234'
ha_domain: cybro
ha_platforms:
  - binary_sensor
---

The `cybro` integration polls data from Cybro 2/3 PLC from [cybrotech](https://www.cybrotech.com/).

## Prerequisites

To run this integration you need to have `CybroScgiServer` configured and running.

- Scgi server as Python service [Download CybroScgiServer](https://www.cybrotech.com/software-category/tools/)
- Scgi server as Docker container [hub.docker.com](https://hub.docker.com/r/killer007/cybroscgiserver)

{% include integrations/config_flow.md %}

## Binary Entities

This integration provides `binary_sensor` entities for the following information:

- Scan overrun
- Retentive fail
- General error

More entities will follow in a further release (light, sensor, weather).
