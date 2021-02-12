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

## Configuration

Ondilo ICO integration in Home Assistant is done through **Configuration** -> **Integrations** -> **Ondilo ICO**. You will be redirected to Ondilo to authenticate to their APIs. Enter your Ondilo account credentials when prompted (same as the ones used in their app). Once done, you will be redirected back to Home Assistant and your ICOs will be imported.

## Known limitations

- Recommendations are not yet supported.
