---
layout: page
title: "RESTful Command"
description: "Instructions how to integrate REST commands into Home Assistant."
date: 2016-12-27 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: restful.png
ha_category: Automation
ha_release: 0.36.0
---

This component can expose regular rest commands as services. Services can be called from a [script] or in [automation].

[script]: /components/script/
[automation]: /getting-started/automation/

To enable this switch, add the following lines to your `configuration.yaml` file:
```yaml
# Example configuration.yaml entry
rest_command:
```

Configuration variables:
- **timeout** (*Optional*): Timeout for requests, default 10 seconds.
