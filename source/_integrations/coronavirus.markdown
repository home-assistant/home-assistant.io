---
title: Coronavirus (COVID-19)
description: Instructions on how to integrate the Coronavirus sensors within Home Assistant.
ha_category:
  - Health
ha_release: 0.106
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@home_assistant/core'
ha_domain: coronavirus
---

In December 2019, an outbreak of a novel Coronavirus, also called severe acute
respiratory syndrome coronavirus-2 (SARS-CoV-2), began in the Wuhan region of
China. This virus can cause the COVID-19 disease.

This novel Coronavirus is spreading globally at a disturbing rate, which keeps
everybody on top of the news. The media worldwide is covering the spread of
the virus constantly, and a lot of people are tracking the number of cases
in their country.

The Coronavirus integration tracks the number of people that are confirmed with,
recovered from, and deceased caused by the virus in your country, or worldwide.

The data is sourced from the [Johns Hopkins University](https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6).

## Configuration

This integration can be configured via the Home Assistant frontend.

- Go to **Configuration** -> **Integrations**.
- Click on the `+` in the bottom right corner to add a new integration.
- Search and select the **Coronavirus** integration form the list.
- Follow the instruction on screen to add the sensors. Either choose for adding
  world-wide sensors, or a specific set of sensors for your country.

If you want to track both world-wide and one or more countries at the same time,
you can repeat the configuration process described above to add multiple
instances of the integration.

<div class='note'>
This integration is released in a special release of Home Assistant Core:
0.106.3.

While this integration is marked as released in 0.106, it is only available
on Home Assistant Core 0.106.3 or newer.
</div>
