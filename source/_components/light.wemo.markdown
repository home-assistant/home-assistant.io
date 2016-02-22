---
layout: page
title: "Belkin WeMo Light"
description: "Instructions how to integrate Belkin WeMo lights into Home Assistant."
date: 2016-02-22 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: belkin_wemo.png
ha_category: Light
---


The `wemo` light platform allows you to control your [Belkin WeMo](http://www.belkin.com) lights from within Home Assistant.

They will be automatically discovered if the discovery component is enabled.

```yaml
# Example configuration.yaml entry
light:
  platform: wemo
```

