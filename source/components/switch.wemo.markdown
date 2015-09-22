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

<img src='/images/supported_brands/belkin_wemo.png' class='brand pull-right' />
The wemo platform allows you to control your [Belkin WeMo](http://www.belkin.com/us/p/P-F7C027/) switches from within Home Assistant.

They will be automatically discovered if the discovery component is enabled.

```yaml
# Example configuration.yaml entry
switch:
  platform: wemo
```
