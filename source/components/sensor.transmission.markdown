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
The [Transmission](http://www.transmissionbt.com/) platform allows you to monitor your downloads from within Home Assistant and setup automation based on the information.

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

To use the monitoring, your transmission client needs to allow remote access. If you are running the graphical transmission client (transmission-gtk) go to **Edit** -> **Perferences** and choose the tab **Remote**. Check **Allow remote access**, enter your username and your password, and uncheck the network restriction as needed.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/transmission-perf.png' />
</p>

If everthing is setup correctly, the details will show up in the frontend.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/transmission.png' />
</p>

[James Cole](https://github.com/jamespcole) has contributed the transmission platform.
