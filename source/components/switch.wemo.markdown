---
layout: page
title: "Belkin WeMo switches support"
description: "Instructions how to integrate Belkin WeMo switches into Home Assistant."
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/belkin_wemo.png' class='brand' />
The wemo platform allows you to control your [Belkin WeMo](http://www.belkin.com/us/p/P-F7C027/)  switches from within Home Assistant. 

To add Wemo switches to your installation, add the following to your `configuration.yaml` file:

```yaml
switch:
  platform: wemo
```
