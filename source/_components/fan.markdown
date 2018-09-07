---
layout: page
title: "Fan"
description: "Instructions on how to setup Fan devices within Home Assistant."
date: 2016-08-26 19:00
sidebar: true
comments: false
sharing: true
footer: true
---


The `fan` component is built for the controlling of fan devices. It can be called the little brother of the [climate](/components/climate/) component.
 
To enable this component, pick one of the platforms, and add it to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
climate:
  platform: fan
```

