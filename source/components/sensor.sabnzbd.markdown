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
James Cole has contributed support to integrate [SABnzbd](http://sabnzbd.org). This will allow you to monitor your downloads from within Home Assistant and setup automation based on the information.

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

