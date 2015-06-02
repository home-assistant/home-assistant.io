---
layout: page
title: "Transmission switch support"
description: "Instructions how to integrate Transmission within Home Assistant."
date: 2015-06-02 09:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/transmission.png' class='brand pull-right' />
The transmission platform allows you to control your [Transmission](http://www.transmissionbt.com/) client from within Home Assistant. The platform enables you switch to your 'Alternative Speed Limits' (aka 'Turtle mode') setting. 

To add Transmission to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: transmission
  name: Transmission
  host: 192.168.1.26
  port: 9091
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

[Finbarr Brady](https://github.com/fbradyirl) has contributed the transmission switch platform.
