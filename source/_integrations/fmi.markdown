---
title: FMI (Finnish Meteorological Institute)
description: Instructions on how to integrate FMI within Home Assistant.
ha_category:
  - Weather
ha_release: 0.116
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@anand-p-r'
ha_domain: fmi
ha_quality_scale: internal
---

The `fmi` integration uses the [FMI](https://en.ilmatieteenlaitos.fi/open-data) web service as a source for weather data for a given location.

## Configuration

To add FMI to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations search for **FMI** and select **Finnish Meteorological Institute**. By default, the values will be taken from the Home Assistant configuration. **Forecast Interval** option can be used to set the weather forecast interval.