---
title: Profiler
description: Profile Home Assistant.
ha_category:
  - Utility
ha_release: 0.117
ha_quality_scale: internal
ha_domain: profiler
ha_codeowners:
  - '@bdraco'
ha_config_flow: true
---

The Profiler integration provides a profile which is a set of statistics that identifies how much time each part of Home Assistant is taking. It can help track down a performance issue or provide insight about a misbehaving integration.

{% include integrations/config_flow.md %}

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

### Service `profiler.start_log_objects`

Start logging the growth of objects in memory.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `scan_interval` | yes | The the frequency between logging objects. Defaults to 30.0

Periodically log the growth of new objects in memory. This service's primary use case is finding memory leaks.

### Service `profiler.stop_log_objects`

Stop logging the growth of objects in memory.

### Service `profiler.dump_log_objects`

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `type` | no | The type of object to dump to the log.

When `start_log_objects` highlights the growth of a collection of objects in memory, this service can help investigate. The `repr` of each object that matches `type` will be logged.

### Service `profiler.log_thread_frames`

Log the current frames for all threads.

### Service `profiler.log_event_loop_scheduled`

Log what is scheduled in the event loop.

