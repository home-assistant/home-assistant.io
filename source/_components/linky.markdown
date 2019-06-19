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
# Example configuration.yaml entry
sensor:
  - platform: linky
    username: YOUR_LINKY_USERNAME
    password: YOUR_LINKY_PASSWORD
```

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
{% endconfiguration %}
