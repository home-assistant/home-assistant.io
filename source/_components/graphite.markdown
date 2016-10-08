---
layout: page
title: "Graphite"
description: "Instructions on how to record Home Assistant history in Graphite."
date: 2016-02-10 17:11
sidebar: true
comments: false
sharing: true
footer: true
logo: graphite.png
ha_category: History
ha_release: 0.13
---

The `graphite` component records all events and state changes and feeds the data to a [graphite](http://graphite.wikidot.com/) instance.

To enable this component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
graphite:
```

Configuration variables:

- **host** (*Option*): IP address of your graphite host, eg. http://192.168.1.10. Defaults to `localhost`
- **port** (*Optional*): Port to use. Defaults to 2003.
- **prefix** (*Optional*):  Prefix is the metric prefix in graphite. Defaults to `ha`.

