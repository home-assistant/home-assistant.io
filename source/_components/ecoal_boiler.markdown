---
layout: page
title: "eCoal water boiler controller"
description: "Instructions on how to integrate eSterownik.pl eCoal.pl controller into Home Assistant."
date: 2018-11-29 10:00
sidebar: true
comments: false
sharing: true
footer: true
# logo: raspberry-pi.png
ha_category: Water heater
ha_release: not yet
ha_iot_class: "Local Polling"
---

The `ecoal_boiler` component is the base for pumps and sensors managed by [esterownik.pl eCoal boiler controller](https://esterownik.pl/nasze-produkty/ecoal).

## {% linkable_title Configuration %}

To use your eCoal pumps or sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ecoal_boiler:
  host: 192.168.9.2
  username: admin
  password: admin
```
{% configuration %}
host:
  description: IP# / hostname of eCoal controller.
  required: true
  type: string
username:
  description: Login used to connect to controller.
  required: false
  default: admin
  type: string
password:
  description: Password for username.
  required: false 
  default: admin
  type: string
{% endconfiguration %}
