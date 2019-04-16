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

The `geniushub` component links Home Assistant with your Genius Hub for controlling climate devices on your local network.

Each zone controlled by your Genius hub will report back the state, mode, setpoint and temperature.  Other properties are available via `device_state_attributes`.

It uses this PyPi client library: https://pypi.org/project/geniushub-client/

There are two distinct options for accessing a Genius Hub:

### {% linkable_title Option 1: hub token only %}

 - requires a **hub token** obtained from https://my.geniushub.co.uk/tokens
 - uses the v1 API - which is well-documented
 - interrogates Heat Genius' own servers (so is slower, say 10-20s response time)

### {% linkable_title Option 2: hub hostname/address with user credentials %}

 - requires your **username** & **password**, as used with https://www.geniushub.co.uk/app
 - uses the v3 API - results are WIP and may not be what you expect
 - interrogates the hub directly (so is faster, say 1s response time)

## {% linkable_title Configuration %}

To add your Genius Hub into your Home Assistant installation, add one of the following to your `configuration.yaml` file.

If you want to poll Heat Genius' own servers:

```yaml
# Example configuration.yaml entry, using a Hub Token
geniushub:
  host: eyJhbGciXVCIsInZlciI6IjEuMC4w...
```
If you want to poll the hub directly:

```yaml
# Example configuration.yaml entry, directly polling the Hub
geniushub:
  host: IP_ADDRESS
  username: GENIUS_HUB_USERNAME
  password: GENIUS_HUB_PASSWORD
```

{% linkable_title Configuration %}

Note that if a `username` or `password` is provide, then the `host` will be used as a hostname/IP address rather than a Hub Token.

{% configuration %}
host:
  description: The Hub Token, or hostname/IP address of your Genius Hub
  required: true
  type: string
username:
  description: Genius Hub username
  required: false
  type: string
password:
  description: Genius Hub password
  required: false
  type: integer
{% endconfiguration %}
