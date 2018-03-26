---
layout: page
title: "benchmark"
description: "Script to perform benchmarking of Home Assistant"
release_date: 2017-02-23 11:00:00
sidebar: true
comments: false
sharing: true
footer: true
---

For testing the performance of Home Assistant the Benchmark script runs until you exit using Control+C.

Firing and handling of a million events.

```bash
$ hass --script benchmark async_million_events
```

