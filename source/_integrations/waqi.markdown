---
title: World Air Quality Index (WAQI)
description: Instructions on how to setup World Air Quality Index sensor in Home Assistant.
ha_category:
  - Health
ha_release: 0.34
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@joostlek'
ha_domain: waqi
ha_platforms:
  - sensor
ha_integration_type: integration
ha_config_flow: true
---

The **World Air Quality Index (WAQI)** {% term integration %} will query [World Air Quality Index](https://aqicn.org/city/beijing/) service to check AQI value for a specific set of locations. The resulting indexes will be added to the Home Assistant as sensor outputs.

## Setup

This sensor requires an API token. Please obtain one at [AQICN API token](https://aqicn.org/data-platform/token/#/).

{% include integrations/config_flow.md %}

The value reported is an overall AQ index for the location. The values of the index can be interpreted as following:

| AQI       |               Status               | Description                                                                                                                                                                   |
|-----------|:----------------------------------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0 - 50    |              **Good**              | Air quality is considered satisfactory, and air pollution poses little or no risk                                                                                             |
| 51 - 100  |            **Moderate**            | Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution |
| 101 - 150 | **Unhealthy for Sensitive Groups** | Members of sensitive groups may experience health effects. The general public is not likely to be affected                                                                    |
| 151 - 200 |           **Unhealthy**            | Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects                                                       |
| 201 - 300 |         **Very unhealthy**         | Health warnings of emergency conditions. The entire population is more likely to be affected                                                                                  |
| 301+      |           **Hazardous**            | Health alert: everyone may experience more serious health effects                                                                                                


Further information about AQI can be found [on the EPA's AirNOW website](https://www.airnow.gov/aqi/aqi-basics/).
