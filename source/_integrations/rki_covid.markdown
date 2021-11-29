---
title: RKI Covid numbers
description: Robert-Koch Institut COVID Numbers within Home Assistant.
ha_category:
  - Health
ha_iot_class: Cloud Polling
ha_release: '2021.12'
ha_config_flow: true
ha_codeowners:
  - '@thebino'
ha_domain: rki_covid
ha_platforms:
  - sensor
---

This integration allows to visualize the covid numbers provided by the [Robert Koch-Institut](https://www.rki.de). Multiple sensors clustered by districts express detailed information on local regions and areas.



|Sensor  |Type|Description
|:-----------|:---|:------------
|`sensor.NAME_count`| number | indicates the confirmed cases.
|`sensor.NAME_newCases`| number | indicates the new confirmed cases.
|`sensor.NAME_deaths`| number | indicates the numbers of confirmed death cases.
|`sensor.NAME_newDeaths`| number | indicates the numbers of new confirmed death cases.
|`sensor.NAME_recovered`| number | indicates the numbers of confirmed recovery cases.
|`sensor.NAME_newRecovered`| number | indicates the numbers of new confirmed recovery cases.
|`sensor.NAME_casesPer100k`| number | indicates cases per 100k.
|`sensor.NAME_weekIncidence`| number | indicates the week incidence per 100.000 inhabitants.
|`sensor.NAME_hospitalizationCasesMerged` | float | Hospitalization cases for people in germany summarized  |
|`sensor.NAME_hospitalizationIncidenceMerged` | float | Hospitalization incidence for people in germany summarized |
|`sensor.NAME_hospitalizationCasesBaby` | float | Hospitalization cases for people between 00-04 |
|`sensor.NAME_hospitalizationIncidenceBaby` | float | Hospitalization incidence for people between 00-04 |
|`sensor.NAME_hospitalizationCasesChildren` | float | Hospitalization cases for people between 05-14 |
|`sensor.NAME_hospitalizationIncidenceChildren` | float | Hospitalization incidence for people between 05-14 |
|`sensor.NAME_hospitalizationCasesTeen` | float | Hospitalization cases for people between 15-34 |
|`sensor.NAME_hospitalizationIncidenceTeen` | float | Hospitalization incidence for people between 15-34 |
|`sensor.NAME_hospitalizationCasesGrown` | float | Hospitalization cases for people between 35-59 |
|`sensor.NAME_hospitalizationIncidenceGrown` | float | Hospitalization incidence for people between 35-59 |
|`sensor.NAME_hospitalizationCasesSenior` | float | Hospitalization cases for people between 60-79 |
|`sensor.NAME_hospitalizationIncidenceSenior` | float | Hospitalization incidence for people between 60-79 |
|`sensor.NAME_hospitalizationCasesOld` | float | Hospitalization cases for people older than 80 |
|`sensor.NAME_hospitalizationIncidenceOld` | float | Hospitalization incidence for people older than 80 |

## Configuration
Open the `Configuration` of your Home Assistant instance and select `Integrations`.
Add a new integration, search and select `rki covid`.
A dialog appears to select a district or state to monitor.
After submitting the dialog, the newly added sensor entities are available.

**Hint:** Repeat the process to add multiple districts or states.

![Integration used within the lovelace](/images/integrations/rki_covid/lovelace_graph.png)

{% include integrations/config_flow.md %}
