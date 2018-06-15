---
layout: page
title: "RitAssist"
description: "Instructions on how to use a RitAssist as a device tracker."
date: 2018-06-15 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ritassist.png
ha_category: Presence Detection
ha_release: 0.59
---


This platform allows you to integrate your vehicles equiped with [RitAssist](https://ritassist.nl/) into Home Assistant. It allows you to see certain details about your vehicle, but also shows your vehicle on the map.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: ritassist
    client_id: YOUR_CLIENT_ID
    client_secret: YOUR_CLIENT_SECRET
    username: YOUR_RITASSIST_USERNAME
    password: YOUR_RITASSIST_PASSWORD
    include:
        - LICENSE_PLATE
```

{% configuration %}
client_id:
  description: The client ID used to connect to the RitAssist API.
  required: true
  type: string
client_secret:
  description: The client secret used to connect to the RitAssist API.
  required: true
  type: string
username:
  description: Your RitAssist username.
  required: true
  type: string
password:
  description: Your RitAssist password.
  required: true
  type: string
include:
  description: A list of license plates to include, if this is not specified, all vehicles will be added.
  required: false
  type: strings
{% endconfiguration %}

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.

