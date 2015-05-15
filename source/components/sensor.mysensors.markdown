---
layout: page
title: "MySensors support"
description: "Instructions how to integrate MySensors into Home Assistant."
date: 2015-05-14 21:57
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/mysensors.png' class='brand pull-right' />
Integrate your [MySensors sensors](https://www.mysensors.org) by adding the following to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  platform: mysensors
  port: /dev/ttyACM0
```
