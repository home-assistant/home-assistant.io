---
title: Flo by Moen
description: Instructions on how to integrate Flo by Moen into Home Assistant.
ha_release: 0.115
ha_category:
  - Sensor
ha_config_flow: true
ha_codeowners:
  - '@dmulcahey'
ha_domain: flo
---

The `flo` integration integrates
[Flo by Moen smart water shutoff valves](https://meetflo.com/product/smart-water-shutoff) into Home Assistant.

There is currently support for the following device types within Home Assistant:

- **Sensor**: reports on the device's system mode, water flow rate, temperature, water pressure, and daily water consumption.

## Configuration

This integration can be configured via the Home Assistant UI by navigating to
**Configuration** -> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Flo**.
