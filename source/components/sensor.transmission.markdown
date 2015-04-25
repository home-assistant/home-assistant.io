---
layout: page
title: "Transmission support"
description: "Instructions how to integrate Transmission within Home Assistant."
date: 2015-04-25 9:06
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/transmission.png' class='brand pull-right' />
James Cole has contributed support to integrate Transmission. This will allow you to monitor your downloads from within Home Assistant and setup automation based on the information.

```yaml
# Example configuration.yaml entry
sensor:
  platform: transmission
  name: Transmission
  host: 192.168.1.26
  port: 9091
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  monitored_variables:
    - type: 'current_status'
    - type: 'download_speed'
    - type: 'upload_speed'
```
