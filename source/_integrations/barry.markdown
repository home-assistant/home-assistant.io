---
title: Barry
description: Instructions on how to integrate Barry within Home Assistant.
ha_category:
  - Sensor
ha_release: 1.0
ha_iot_class: Cloud Polling
ha_quality_scale: silver
ha_codeowners:
  - '@yash'
ha_domain: barry
ha_config_flow: true
---

The `barry` integration provides a sensor with the current electricity price if you are a [Barry](https://barry.energy/) customer.

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)

## Setup

To setup the Barry integration, you will first need your API-token from the app. Go to [helpcenter.barry.energy/hc/da/articles/360016952420-API-documentation](https://helpcenter.barry.energy/hc/da/articles/360016952420-API-documentation) to see the instruction on how to get your token.

To add Barry to your installation, go to **Configuration** >> **Integrations** in the UI and enable the Barry integration. You will be asked to enter your API-token in the first step, and you will be asked to select your address in the second step.


## Sensor

The `barry` sensor provides the current electricity price if you are a [Barry](https://barry.energy/) customer.

The requirement is that you have setup the [`barry` component](#setup). 
