---
layout: page
title: "Honeywell Thermostat"
description: "Instructions on how to integrate Honeywell thermostats within Home Assistant."
date: 2016-02-07 22:01
sidebar: true
comments: false
sharing: true
footer: true
logo: honeywell.png
ha_category:
  - Climate
ha_release: pre 0.7
ha_iot_class: Cloud Polling
redirect_from:
 - /components/climate.honeywell/
---

<p class='note'>
There is a great deal of confusion over this integration. Please take the time to fully understand the causes of this confusion before you raise an issue, or submit a PR.
</p>

The `honeywell` climate platform lets you control Honeywell TCC (Total Connect Comfort) climate systems from Home Assistant. It does not integrate with Honeywell TCC alarm systems.

Unfortunately, this integration is incorrectly implemented as a combination of two _distinct_ climate systems, one being US-based, the other is EU-based; they are _not_ interchangeable. Before you proceed, please be clear which client library is appropriate to your system.

## {% linkable_title US-based Systems %}

These systems are based in North America, and temperatures are usually in Fahrenheit. They would likely be HVAC systems. They use the [somecomfort](https://github.com/kk7ds/somecomfort) client library. In this integration, this is called the `us` region.

If your system is US-based, then you can access your system via [https://mytotalconnectcomfort.com/portal/](https://mytotalconnectcomfort.com/portal/) (note the `/portal/`).

<p class='note'>
For historical reasons, this is not the default region, and so you _must_ have `region: us` in your **configuration.yaml** file for US-based systems (this requirement may be relaxed in future, see below).
</p>

## {% linkable_title EU-based Systems %}

These systems are based in Europe (including the UK & Ireland), and temperatures are usually in Celsius. They would likely be heating-only systems. They use the [evohome-client](https://github.com/watchforstock/evohome-client) client library. In this integration, this is called the `eu` region.

If your system is US-based, then you can access it via [https://international.mytotalconnectcomfort.com/](https://international.mytotalconnectcomfort.com/) (note the `international`).

<p class='note'>
The `eu` region is being deprecated, as there is better support available via the [evohome](/components/evohome/) integration. Unfortunately, **evohome** does not yet have support for DHW, but will do so before this region is fully deprecated (a PR for this has been submitted).
</p>

## {% linkable_title Configuration %}

To set up this integration, first confirm your region (i.e. which website is a good start), then add the following information to your **configuration.yaml** file (the below example is for US-based systems):

```yaml
climate:
  - platform: honeywell
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    region: us
```
{% configuration %}
username:
  description: Email address of an account with access the the TCC website for your region.
  required: true
  type: string
password:
  description: Password for the account.
  required: true
  type: string
region:
  description: Region identifier, either 'eu' or 'us'.
  required: false
  default: eu
  type: string
away_temperature:
  description: "(*only for the eu region*) Heating setpoint when away mode is on, in degrees Celsius."
  required: false
  default: 16.0
  type: float
away_cool_temperature:
  description: "(*only for the us region*) Cooling setpoint when away mode is on, in degrees Fahrenheit."
  required: false
  default: 88
  type: int
away_heat_temperature:
  description: "(*only for the us region*) Heating setpoint when away mode is on, in degrees Fahrenheit."
  required: false
  default: 61
  type: int
{% endconfiguration %}
