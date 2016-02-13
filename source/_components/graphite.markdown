---
layout: page
title: "Graphite"
description: "Instructions on how to record Home Assistant history in Graphite."
date: 2016-02-10 17:11
sidebar: true
comments: false
sharing: true
footer: true
logo: 
ha_category: History
---

Component that records all events and state changes and feeds the data to
a graphite installation.
Example configuration:

```yaml
# Example configuration.yaml entry
graphite:
  host: foobar
  port: 2003
  prefix: ha
```

All config elements are optional, and assumed to be on localhost at the
default port if not specified. Prefix is the metric prefix in graphite,
and defaults to 'ha'.
