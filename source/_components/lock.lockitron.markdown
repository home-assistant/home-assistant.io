---
layout: page
title: "Lockitron Lock"
description: "Instructions on how to integrate Lockitron locks into Home Assistant."
date: 2017-03-24 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lockitron.png
ha_category: Lock
ha_iot_class: "Cloud Polling"
ha_release: "0.42"
---

The `lockitron` platform allows you to control your [Lockitron](https://lockitron.com/) lock from within Home Assistant.

## {% linkable_title Setup %}

In order to get the correct `access_token` and `id`, log on to their [developer page](https://api.lockitron.com/), create a new app, and get the access_token they give you. Then, call the retrieve all locks function on the page and get the id of your lock (make sure you get your lock's id and not the virtual lock they create for you).

## {% linkable_title Configuration %}

To enable the lock, add the following lines to your `configuration.yaml` file:

```yaml
lock:
  - platform: lockitron
    access_token: YOUR_ACCESS_TOKEN
    id: YOUR_ID
```

{% configuration %}
access_token:
  description: The security token provided by Lockitron to lock and unlock your lock.
  required: true
  type: string
id:
  description: The lock id given by Lockitron (should be a GUID).
  required: true
  type: string
{% endconfiguration %}
