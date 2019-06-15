---
layout: page
title: "Linky Sensor"
description: "Instructions on how to integrate Linky consumption data within Home Assistant."
date: 2018-09-06 08:35
sidebar: true
comments: false
sharing: true
footer: true
logo: enedis.png
ha_release: 0.79
ha_category:
  - Energy
  - Sensor
ha_iot_class: Cloud Polling
redirect_from:
 - /components/sensor.linky/
---

The `linky` sensor platform is retrieving the consumption of your home from the [Linky electric meter](https://www.enedis.fr/linky-compteur-communicant).

## {% linkable_title Configuration %}

First, you need to create an Enedis account [here](https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers), if you don't have already one.

And then, add the Linky sensor to your `configuration.yaml` file like below:

```yaml
# Basic Linky configuration.yaml
sensor:
  - platform: linky
    username: YOUR_LINKY_USERNAME
    password: YOUR_LINKY_PASSWORD
```

Tip: Use the [secret](https://www.home-assistant.io/docs/configuration/secrets/) mechanism to store your Enedis account credentials.

{% configuration %}
username:
  description: The Enedis account username.
  required: true
  type: string
password:
  description: The Enedis account password.
  required: true
  type: string
timeout:
  description: Timeout to wait for the Enedis API connection.
  required: false
  type: integer
  default: 10
monitored_conditions:
  description: The consumption types to monitor.
  required: false
  type: list
  default: all
  keys:
    yesterday:
      description: To monitor your yesterday consumption in kWh.
    current_month:
      description: To monitor your current month consumption in kWh.
    last_month:
      description: To monitor your last month consumption in kWh.
    current_year:
      description: To monitor your current year consumption in kWh.
    last_year:
      description: To monitor your last year consumption in kWh.
{% endconfiguration %}

### {% linkable_title Full Configuration %}

```yaml
# All options Linky configuration.yaml
sensor:
  - platform: linky
    username: YOUR_LINKY_USERNAME
    password: YOUR_LINKY_PASSWORD
    timeout: 10
    monitored_conditions:
      - yesterday
      - current_month
      - last_month
      - current_year
      - last_year
```
