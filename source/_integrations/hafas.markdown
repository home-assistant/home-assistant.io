---
title: HaFAS
description: Instructions on how to use HaFAS within Home Assistant
ha_category:
  - Transport
ha_release: 2022.10
ha_iot_class: Cloud Polling
ha_domain: hafas
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: integration
ha_codeowners: 
  - '@kilimnik'
---

The `hafas` sensor will give you the departure time of the next train for the given connection. In case of a delay, the delay is also shown. Additional details are used to inform about, e.g., the type of the train, price, and if it is on time.

The integration supports fetching train tables from "Deutsche Bahn" as well as from "Verkehrsverbund Süd-Niedersachsen". 

The integration uses [pyhafas](https://pypi.org/project/pyhafas/) as the data source. [HaFAS](https://de.wikipedia.org/wiki/HAFAS) is a public transport management system developed by a company called [HaCon](https://www.hacon.de/).

{% include integrations/config_flow.md %}
