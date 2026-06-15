---
title: Ondilo ICO
description: Instructions on how to configure Ondilo ICO integration.
ha_category:
  - Sensor
ha_release: 2021.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@JeromeHXP'
ha_domain: ondilo_ico
ha_platforms:
  - sensor
ha_integration_type: hub
---

ICO by [Ondilo](https://ondilo.com/en/) is a small connected device that you simply drop into the pool or spa. ICO continuously analyzes the water quality of your pool/spa and notifies you via its application. ICO provides personalized recommendations so that you use the right products in the right proportions at the right time.

There is currently support for the following information within Home Assistant:

- Water Temperature
- Oxydo Reduction Potential (ORP/Redox)
- pH
- TDS (Total Dissolved Solids) or Salt
- Battery
- RSSI

Sensors will be created for all those data.

## Prerequisites

- Password from the **Ondilo mobile app**.
   - The password used to log in to the Ondilo website usually does not work for the Home Assistant/API authentication, as it is not linked to the API.
{% include integrations/config_flow.md %}

## Known limitations

- Recommendations are not yet supported.
