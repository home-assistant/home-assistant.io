---
title: "benchmark"
description: "Script to perform benchmarking of Home Assistant"
---

For testing the performance of Home Assistant the Benchmark script runs until you exit using Control+C.

Firing and handling of a million events.

```bash
hass --script benchmark async_million_events
```
