---
layout: page
title: "NuHeat"
description: "Instructions how to integrate your NuHeat Signature thermostats within Home Assistant."
date: 2017-11-11 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: nuheat.png
ha_category: Hub
ha_release: 0.58
ha_iot_class: "Cloud Polling"
---

The `nuheat` component lets you control connected floor heating thermostats from [NuHeat](http://www.nuheat.com/).

First, you will need to obtain your thermostat's numeric serial number or ID by logging into [MyNuHeat.com](https://mynuheat.com/) and selecting your thermostat(s).

Once you have the Thermostat ID(s), add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
nuheat:
  username: you@example.com
  password: very-secure-password
  devices: 12345

# Example configuration.yaml entry with multiple thermostats
nuheat:
  username: you@example.com
  password: very-secure-password
  devices:
    - 12345
    - 67890
```

{% configuration %}
username:
  description: The username for accessing your MyNuHeat account.
  required: true
  type: string
password:
  description: The password for accessing your MyNuHeat account.
  required: true
  type: string
devices:
  description: The serial number / ID of each thermostat you would like to integrate with Home Assistant.
  required: true
  type: [string, int]
{% endconfiguration %}
