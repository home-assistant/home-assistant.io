---
title: Profiler
description: Profile Home Assistant.
ha_category:
  - Utility
ha_release: 0.117
ha_quality_scale: internal
ha_domain: profiler
---

The Profiler integration provides a profile which is a set of statistics that identifies how much time each part of Home Assistant is taking. It can help track down a performance issue or provide insight about a misbehaving integration.

## Configuration

To add `Profiler` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Profiler**.

### Service `profiler.start`

Start the profiler for the specified number of seconds.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `seconds` | yes | The number of seconds to run the profile. Defaults to 60.0

When the profile is complete, Profiler will generate a Python `cprof` and a `callgrind.out` file in your configuration directory. The exact path to these files will appear in a persistent notification so they can be easily located and copied to your desktop. 

The `cprof` file can be viewed with:

[SnakeViz](https://jiffyclub.github.io/snakeviz/)
[Gprof2dot](https://github.com/jrfonseca/gprof2dot)

Additionally, the profiler will generate a `callgrind.out` file that can be viewed with:

[kcachegrind](https://kcachegrind.github.io/) or qcachegrind

### Service `profiler.memory`

Start the memory profiler for the specified number of seconds.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `seconds` | yes | The number of seconds to run the profile. Defaults to 60.0

When the memory profile is complete, Profiler will generate a `.hpy` file in your configuration directory. The exact path to these files will appear in a persistent notification so they can be easily located and copied to your desktop.

The `hpy` file can be viewed with any text editor. A visual representation can be viewed using the [Heapy Profile Browser](http://guppy-pe.sourceforge.net/ProfileBrowser.html) which is a part of the guppy3 package and can be launched via the below script:

```python
#! /usr/bin/python3
from guppy import hpy
hpy().pb()
```
