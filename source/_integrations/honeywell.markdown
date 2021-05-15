---
title: Honeywell Total Connect Comfort (US)
description: Instructions on how to integrate Honeywell thermostats within Home Assistant.
ha_category:
  - Climate
  - Sensor
ha_release: pre 0.7
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@rdfurman'
ha_domain: honeywell
ha_platforms:
  - climate
  - sensor
---

The `honeywell` integration integrates Home Assistant with _US-based_ [Honeywell Total Connect Comfort (TCC)](https://mytotalconnectcomfort.com/portal/) climate systems.

It uses the [somecomfort](https://github.com/kk7ds/somecomfort) client library. It does not support the home security functionality of TCC.

If your system is compatible with this integration, then you will be able access it via [https://mytotalconnectcomfort.com/portal/](https://mytotalconnectcomfort.com/portal/) (note the `/portal/`).

{% include integrations/config_flow.md %}

## Configuration

{% configuration %}
username:
  description: Email address of an account with access to the TCC website.
  required: true
  type: string
password:
  description: Password for the account.
  required: true
  type: string
away_cool_temperature:
  description: "Cooling setpoint when away mode is on, in degrees Fahrenheit."
  required: false
  default: 88
  type: integer
away_heat_temperature:
  description: "Heating setpoint when away mode is on, in degrees Fahrenheit."
  required: false
  default: 61
  type: integer
thermostat:
  description: ID of thermostat to restrict the integration to.
  required: false
  type: string
location:
  description: ID of location to restrict the integration to.
  required: false
  type: string
{% endconfiguration %}
