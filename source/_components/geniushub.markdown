---
layout: page
title: "Genius Hub"
description: "Instructions on how to integrate Genius Hub with Home Assistant."
date: 2019-03-03 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: geniushub.png
ha_category:
  - Climate
ha_release: 0.92
ha_iot_class: Local Polling
---

The `geniushub` integration links Home Assistant with your Genius Hub for controlling climate devices (the hub does not have to be in the same network as HA).

Each Zone controlled by your Genius hub will report back the state, mode, setpoint and temperature. Other properties are available via the device's attributes.

There are two distinct options for accessing a Genius Hub:

### {% linkable_title Option 1: hub token only %}

 - requires a **hub token** obtained from [https://my.geniushub.co.uk/tokens](https://my.geniushub.co.uk/tokens)
 - uses the v1 API - which is well-documented
 - polls Heat Genius' own servers (so is slower, say 10-20s response time)

### {% linkable_title Option 2: hub hostname/address with user credentials %}

 - requires your **username** & **password**, as used with [https://www.geniushub.co.uk/app](https://www.geniushub.co.uk/app)
 - uses the v3 API - results are WIP and may not be what you expect
 - polls the hub directly (so is faster, say 1s response time)

## {% linkable_title Configuration %}

To add your Genius Hub into your Home Assistant installation, add one of the following to your `configuration.yaml` file.

If you want to poll Heat Genius' own servers:

```yaml
# Example configuration.yaml entry, using a Hub Token
geniushub:
  token: GENIUS_HUB_TOKEN
```
Alternatively, if you want to poll the hub directly:

```yaml
# Example configuration.yaml entry, directly polling the Hub
geniushub:
  host: IP_ADDRESS
  username: GENIUS_HUB_USERNAME
  password: GENIUS_HUB_PASSWORD
```

Note that if a `host` is used instead of `token`, then the `username` and `password` are also required.

{% configuration %}
token:
  description: The Hub Token of the Genius Hub
  required: true
  type: string
host:
  description: The hostname/IP address of the Genius Hub
  required: true
  type: string
username:
  description: Your Genius Hub username
  required: false
  type: string
password:
  description: Your Genius Hub password
  required: false
  type: integer
{% endconfiguration %}
