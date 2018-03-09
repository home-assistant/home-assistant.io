---
layout: page
title: "VeSync Switch"
description: "Instructions on how to set up Etekcity VeSync switches within Home Assistant."
date: 2018-03-09 02:11
sidebar: true
comments: false
sharing: true
footer: true
logo: vesync.png
ha_category: Switch
ha_release: 0.64.4
---

The `vesync` switch platform enabled integration with Etekcity VeSync smart switches.


To use your VeSync switches, you must first register your switches with the VeSync app. Once registration is complete you must add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: vesync
    username: username
    password: password
```

{% configuration %}
username:
  description: Username needed to log in to VeSync.
  required: true
  type: string
password:
  description: Password needed to log in to VeSync.
  required: true
  type: string
