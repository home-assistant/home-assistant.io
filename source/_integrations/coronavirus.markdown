---
title: Coronavirus (COVID-19)
description: Instructions on how to integrate the Coronavirus sensors within Home Assistant.
ha_category:
  - Health
ha_release: 0.106
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@home-assistant/core'
ha_domain: coronavirus
ha_platforms:
  - sensor
ha_integration_type: integration
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

{% include integrations/config_flow.md %}
