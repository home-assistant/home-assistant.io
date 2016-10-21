---
layout: page
title: "Mochad"
description: "Instructions how to integrate Mochad into Home Assistant."
date: 2016-10-20 17:09
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Hub
---

The Mochad component is the main component to integrate all X10 platforms being
controlled by [mochad](https://sourceforge.net/projects/mochad/). Besides this component you will have to setup your X10 devices separately.

```yaml
# Example configuration.yaml entry
mochad:
  host: localhost
  port: 1099

switch:
  platform: mochad
  devices:
    - name: Light Switch
      address: a1
```

Configuration variables:

- **host** (*Optional*): The host that mochad is running on, defaults to *localhost*
- **port** (*Optional*): The port that mochad is running on, defaults to *1099*
