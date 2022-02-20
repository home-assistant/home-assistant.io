---
title: Radio Browser
description: Instructions on how to integrate Radio Browser into Home Assistant.
ha_category:
  - Multimedia
ha_release: 2022.3
ha_iot_class: Cloud Polling
ha_domain: radio_browser
ha_config_flow: true
ha_platforms:
  - sensor
---

The Radio Browser integration allows you to use the directory of
radio stations collected on [Radio Browser](https://www.radio-browser.info)
in Home Assistant.

{% include integrations/config_flow.md %}

## Sensors

This integration provides a single sensor: The number of stations
available in the Radio Browser directory.
