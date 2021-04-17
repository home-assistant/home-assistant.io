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

To help discover run away threads, why the executor is overloaded, or other threading problem, the current frames for each running thread will be logged when this service is called.

An example is below:

```txt
[homeassistant.components.profiler] Thread [SyncWorker_6]: File "/usr/local/lib/python3.8/threading.py", line 890, in _bootstrap
    self._bootstrap_inner()
  File "/usr/local/lib/python3.8/threading.py", line 932, in _bootstrap_inner
    self.run()
  File "/usr/local/lib/python3.8/threading.py", line 870, in run
    self._target(*self._args, **self._kwargs)
  File "/usr/local/lib/python3.8/concurrent/futures/thread.py", line 80, in _worker
    work_item.run()
  File "/usr/local/lib/python3.8/concurrent/futures/thread.py", line 57, in run
    result = self.fn(*self.args, **self.kwargs)
  File "/usr/src/homeassistant/homeassistant/components/samsungtv/media_player.py", line 139, in update
    self._state = STATE_ON if self._bridge.is_on() else STATE_OFF
  File "/usr/src/homeassistant/homeassistant/components/samsungtv/bridge.py", line 72, in is_on
    return self._get_remote() is not None
  File "/usr/src/homeassistant/homeassistant/components/samsungtv/bridge.py", line 274, in _get_remote
    self._remote.open()
  File "/usr/local/lib/python3.8/site-packages/samsungtvws/remote.py", line 146, in open
    self.connection = websocket.create_connection(
  File "/usr/local/lib/python3.8/site-packages/websocket/_core.py", line 511, in create_connection
    websock.connect(url, **options)
  File "/usr/local/lib/python3.8/site-packages/websocket/_core.py", line 219, in connect
    self.sock, addrs = connect(url, self.sock_opt, proxy_info(**options),
  File "/usr/local/lib/python3.8/site-packages/websocket/_http.py", line 120, in connect
    sock = _open_socket(addrinfo_list, options.sockopt, options.timeout)
  File "/usr/local/lib/python3.8/site-packages/websocket/_http.py", line 170, in _open_socket
    sock.connect(address)
```

### Service `profiler.log_event_loop_scheduled`

Log what is scheduled in the event loop.

Each upcoming scheduled item is logged similar to the below example:

`[homeassistant.components.profiler] Scheduled: <TimerHandle when=1528307.1818668307 async_track_point_in_utc_time.<locals>.run_action(<Job HassJobType.Coroutinefunction <bound method DataUpdateCoordinator._handle_refresh_interval of <homeassistant.components.screenlogic.ScreenlogicDataUpdateCoordinator object at 0x7f985d896d30>>>) at /usr/src/homeassistant/homeassistant/helpers/event.py:1175>`

