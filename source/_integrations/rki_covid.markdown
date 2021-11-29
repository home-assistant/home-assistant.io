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

This integration provides the covid numbers in germany on district level published by the [Robert Koch-Institut](https://www.rki.de).


|Sensor  |Type|Description
|:-----------|:---|:------------
|`count`| number | indicates the confirmed cases.
|`newCases`| number | indicates the new confirmed cases.
|`deaths`| number | indicates the numbers of confirmed death cases.
|`newDeaths`| number | indicates the numbers of new confirmed death cases.
|`recovered`| number | indicates the numbers of confirmed recovery cases.
|`newRecovered`| number | indicates the numbers of new confirmed recovery cases.
|`casesPer100k`| number | indicates cases per 100k.
|`weekIncidence`| number | indicates the week incidence per 100.000 inhabitants.
|`hospitalizationCasesMerged` | number | Hospitalization cases for people in germany summarized  |
|`hospitalizationIncidenceMerged` | float | Hospitalization incidence for people in germany summarized |
|`hospitalizationCasesBaby` | number | Hospitalization cases for people between 00-04 |
|`hospitalizationIncidenceBaby` | float | Hospitalization incidence for people between 00-04 |
|`hospitalizationCasesChildren` | number | Hospitalization cases for people between 05-14 |
|`hospitalizationIncidenceChildren` | float | Hospitalization incidence for people between 05-14 |
|`hospitalizationCasesTeen` | number | Hospitalization cases for people between 15-34 |
|`hospitalizationIncidenceTeen` | float | Hospitalization incidence for people between 15-34 |
|`hospitalizationCasesGrown` | number | Hospitalization cases for people between 35-59 |
|`hospitalizationIncidenceGrown` | float | Hospitalization incidence for people between 35-59 |
|`hospitalizationCasesSenior` | number | Hospitalization cases for people between 60-79 |
|`hospitalizationIncidenceSenior` | float | Hospitalization incidence for people between 60-79 |
|`hospitalizationCasesOld` | number | Hospitalization cases for people older than 80 |
|`hospitalizationIncidenceOld` | float | Hospitalization incidence for people older than 80 |

**Hint:** Repeat the process to add multiple districts or states.

{% include integrations/config_flow.md %}


![Integration used within the lovelace](/images/integrations/rki_covid/lovelace_graph.png)
