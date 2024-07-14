---
title: IQVIA
description: Instructions on how to use IQVIA data within Home Assistant
ha_category:
  - Health
ha_release: 0.63
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: iqvia
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

The `iqvia` sensor platform collects and displays allergy, asthma and disease
information (based on a U.S. ZIP code) from [IQVIA](https://www.iqvia.com/).
Data measured includes:

- Indices for allergies, asthma and cold/flu indices
- Trends
- Current outlook
- more!

{% include integrations/config_flow.md %}

## Understanding the Indices

Any index-related sensor will have a value between 0.0 and 12.0. The values
map to the following human-friendly ratings:

| Range      | Rating      |
| ---------- | ----------- |
| 0.0 - 2.4  | Low         |
| 2.5 - 4.8  | Low/Medium  |
| 4.9 - 7.2  | Medium      |
| 7.3 - 9.6  | Medium/High |
| 9.7 - 12.0 | High        |

## Understanding Asthma Allergens

Several asthma-related sensors carry information regarding the top three
"asthma allergens" (i.e., irritants that may exacerbate asthma symptoms).
Example values include:

| Pollutant               | Symbol | More Info                                                                              |
| ----------------------- | ------ | -------------------------------------------------------------------------------------- |
| Particulate (<= 2.5 μm) | PM2.5  | [EPA: Particulate Matter (PM) Pollution](https://www.epa.gov/pm-pollution)             |
| Particulate (<= 10 μm)  | PM10   | [EPA: Particulate Matter (PM) Pollution](https://www.epa.gov/pm-pollution)             |
| Ozone                   | O      | [EPA: Ozone Pollution](https://www.epa.gov/ozone-pollution)                            |
| Sulfur Dioxide         | SO2    | [EPA: Sulfur Dioxide (SO2) Pollution](https://www.epa.gov/so2-pollution)               |
| Carbon Monoxide         | CO     | [EPA: Carbon Monoxide (CO) Pollution in Outdoor Air](https://www.epa.gov/co-pollution) |
