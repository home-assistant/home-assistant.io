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


{% include integrations/config_flow.md %}

**Hint:** Repeat the process to add multiple districts or states.

## Provided sensors

- Confirmed cases
- New confirmed cases
- The numbers of confirmed deaths
- The numbers of new confirmed deaths
- The numbers of confirmed recoveries
- The numbers of new confirmed recoveries
- Confirmed cases per 100.000 inhabitants
- The week incidence per 100.000 inhabitants
- Hospitalization cases for people in Germany summarized  
- Hospitalization incidence for people in Germany summarized 
- Hospitalization cases for people between 00-04 
- Hospitalization incidence for people between 00-04 
- Hospitalization cases for people between 05-14 
- Hospitalization incidence for people between 05-14 
- Hospitalization cases for people between 15-34 
- Hospitalization incidence for people between 15-34 
- Hospitalization cases for people between 35-59 
- Hospitalization incidence for people between 35-59 
- Hospitalization cases for people between 60-79 
- Hospitalization incidence for people between 60-79 
- Hospitalization cases for people older than 80 
- Hospitalization incidence for people older than 80 


![Integration used within the lovelace](/images/integrations/rki_covid/lovelace_graph.png)
