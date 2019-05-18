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


The `honeywell` climate platform lets you control Honeywell Connected thermostats from Home Assistant.

Unusually, this integration is a combination of two distinct Honeywell products, one based in the US (using the [somecomfort](https://github.com/kk7ds/somecomfort) client library) and the other in the EU (using [evohomeclient](https://github.com/watchforstock/evohome-client)).

The EU-based functionality is being [deprecated](https://github.com/home-assistant/home-assistant/pull/23913) as support for such systems is now provided by the [evohome integration](https://www.home-assistant.io/components/evohome/). If you are using evohomeclient, you should switch to using that integration instead of this one.

### {% linkable_title Configuration %}

To set up this integration, add the following information to your `configuration.yaml` file:

<p class='note warning'>
  If your system does not require `region: us`, then use [evohome](https://www.home-assistant.io/components/evohome/) instead.
</p>

```yaml
climate:
  - platform: honeywell
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    scan_interval: 600
    region: us
```
<p class='note'>
Scan interval is expressed in seconds. Omitting or mis-configuring `scan_interval` may result in too-frequent polling and cause you to be rate-limited by Honeywell.
</p>

{% configuration %}
username:
  description: The username of an user with access.
  required: true
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
region:
  description: Region identifier (either 'eu' or 'us'). Note that support for 'eu' regions is being deprecated (see above).
  required: false
  default: eu
  type: string
scan_interval:
  description: Scan interval is expressed in seconds. Recommended value of 600 seconds. Omitting scan_interval may result in too-frequent polling and cause you to rate-limited by Honeywell.
  required: false
  default: 120
  type: integer
away_temperature:
  description: "(*only for eu region*) Heating setpoint when away mode is on, in deg C."
  required: false
  default: 16.0
  type: float
away_cool_temperature:
  description: "(*only for us region*) Cooling setpoint when away mode is on, in deg C."
  required: false
  default: 30.0
  type: float
away_heat_temperature:
  description: "(*only for us region*) Heating setpoint when away mode is on, in deg C."
  required: false
  default: 16.0
  type: float
{% endconfiguration %}
