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


- **count**: Confirmed cases
- **newCases**: New confirmed cases
- **deaths**: The numbers of confirmed deaths
- **newDeaths**: The numbers of new confirmed deaths
- **recovered**: The numbers of confirmed recoveries
- **newRecovered**: The numbers of new confirmed recoveries
- **casesPer100k**: Convirmed cases per 100.000 inhabitants
- **weekIncidence**: The week incidence per 100.000 inhabitants
- **hospitalizationCasesMerged**: Hospitalization cases for people in germany summarized  
- **hospitalizationIncidenceMerged**: Hospitalization incidence for people in germany summarized 
- **hospitalizationCasesBaby**: Hospitalization cases for people between 00-04 
- **hospitalizationIncidenceBaby**: Hospitalization incidence for people between 00-04 
- **hospitalizationCasesChildren**: Hospitalization cases for people between 05-14 
- **hospitalizationIncidenceChildren**: Hospitalization incidence for people between 05-14 
- **hospitalizationCasesTeen**: Hospitalization cases for people between 15-34 
- **hospitalizationIncidenceTeen**: Hospitalization incidence for people between 15-34 
- **hospitalizationCasesGrown**: Hospitalization cases for people between 35-59 
- **hospitalizationIncidenceGrown**: Hospitalization incidence for people between 35-59 
- **hospitalizationCasesSenior**: Hospitalization cases for people between 60-79 
- **hospitalizationIncidenceSenior**: Hospitalization incidence for people between 60-79 
- **hospitalizationCasesOld**: Hospitalization cases for people older than 80 
- **hospitalizationIncidenceOld**: Hospitalization incidence for people older than 80 

**Hint:** Repeat the process to add multiple districts or states.

{% include integrations/config_flow.md %}


![Integration used within the lovelace](/images/integrations/rki_covid/lovelace_graph.png)
