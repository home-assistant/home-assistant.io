---
layout: page
title: "Rachio Switch"
description: "Instructions on how to use Rachio switches with Home Assistant."
date: 2017-05-29 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: rachio.png
ha_category: Switch
ha_iot_class: "Cloud Polling"
ha_release: 0.46
---

The `rachio` switch platform allows you to control your [Rachio irrigation system](http://rachio.com/).

## {% linkable_title Getting your Rachio API Access Token %}

1. Log in at [https://app.rach.io/](https://app.rach.io/).
1. Click the user button at the top right.
1. Click API Access Token.
1. Copy the API access token from the dialog that opens.

To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: rachio
    access_token: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Configuration variables:

- **access_token** (*Required*): Your Rachio API Access Token.
- **manual_run_mins** (*Optional*): For how long, in minutes, to turn on a station when the switch is enabled. Defaults to 10 minutes.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this switch.

### {% linkable_title `groups.yaml` example %}


```yaml
irrigation:
  name: Irrigation
  icon: mdi:water-pump
  view: true
  entities:
  - group.zones_front
  - group.zones_back

zones_front:
  name: Front Yard
  view: false
  entities:
  - switch.driveway
  - switch.front_bushes
  - switch.front_garden
  - switch.front_yard
  - switch.side_yard

zones_back:
  name: Back Yard
  view: false
  entities:
  - switch.back_bushes
  - switch.back_garden
  - switch.back_porch
  - switch.back_trees
```

### {% linkable_title iFrame %}

If you would like to see and control more detailed zone information, create an [iFrame](/components/panel_iframe/) that renders the Rachio web app.

```yaml
panel_iframe:
  rachio:
    title: Rachio
    url: "https://app.rach.io"
    icon: mdi:water-pump
```
