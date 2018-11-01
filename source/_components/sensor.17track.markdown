---
layout: page
title: "17track.net"
description: "Instructions on how to use 17track.net data within Home Assistant"
date: 2018-10-31 10:42
sidebar: true
comments: false
sharing: true
footer: true
logo: 17track.jpg
ha_category: Postal Service
ha_release: 0.82
ha_iot_class: "Cloud Polling"
---

The 17track.net sensor platform allows users to get package data tied to their
17track.net account. The platform creates both summary sensors, which show the
number of packages in a current state (e.g., "In Transit"), as well as
individual sensors for each package within the account.

## {% linkable_title Configuration %}

To enable the platform, add the following lines to your `configuration.yaml`
file:

```yaml
sensor:
  - platform: seventeentrack
    username: <EMAIL ADDRESS>
    password: <PASSWORD>
```

{% configuration %}
username:
  description: The email address associated with your 17track.net account.
  required: true
  type: string
password:
  description: The password associated with your 17track.net account.
  required: true
  type: string
show_archived:
  description: Whether sensors should be created for archived packages.
  required: false
  type: boolean
  default: false
show_delivered:
  description: Whether sensors should be created for delivered packages.
  required: false
  type: boolean
  default: false
{% endconfiguration %}
