---
layout: page
title: "SABnzbd support"
description: "Instructions how to integrate SABnzbd within Home Assistant."
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/sabnzbd.png' class='brand pull-right' />
The sabnzbd platform will allow you to monitor your downloads with [SABnzbd](http://sabnzbd.org) from within Home Assistant and setup automation based on the information.

To use sabnzbd with your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sabnzbd
    name: SAB
    api_key: YOUR_API_KEY
    # Example: http://192.168.1.32:8124/
    base_url: YOUR_SABNZBD_BASE_URL
    monitored_variables:
        - type: 'current_status'
        - type: 'speed'
        - type: 'queue_size'
        - type: 'queue_remaining'
        - type: 'disk_size'
        - type: 'disk_free'
```

[James Cole](https://github.com/jamespcole) has contributed the sabnzbd platform.
