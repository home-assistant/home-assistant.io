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
ha_integration_type: integration
---

The Profiler integration provides a profile which is a set of statistics that identifies how much time each part of Home Assistant is taking. It can help track down a performance issue or provide insight about a misbehaving integration.

{% include integrations/config_flow.md %}

### Action profiler.start

{% my developer_call_service badge service="profiler.start" %}

Start the profiler for the specified number of seconds.

| Data attribute | Optional | Description                                                |
| ---------------------- | -------- | ---------------------------------------------------------- |
| `seconds`              | yes      | The number of seconds to run the profile. Defaults to 60.0 |

When the profile is complete, Profiler will generate a Python `cprof` and a `callgrind.out` file in your configuration directory. The exact path to these files will appear in a persistent notification so they can be easily located and copied to your desktop. 

The `cprof` file can be viewed with:

- [SnakeViz](https://jiffyclub.github.io/snakeviz/)
- [Gprof2dot](https://github.com/jrfonseca/gprof2dot)

Additionally, the profiler will generate a `callgrind.out` file that can be viewed with:

- [KCachegrind or QCachegrind](https://kcachegrind.github.io/)
- [Gprof2dot](https://github.com/jrfonseca/gprof2dot)

The gprof2dot tool generates [DOT](http://www.graphviz.org/doc/info/lang.html) files, which can be converted to images using the `dot` tool from [Graphviz](http://www.graphviz.org/) or viewed directly using [xdot](https://github.com/jrfonseca/xdot.py). The `-e` and `-n` parameters can be used to set the minimum percentage required to include a function in the output file. Observe these examples:

```bash
# Generating the .dot files:
gprof2dot -f pstats    -e 0.05 -n 0.25 profile.1234567890123456.cprof -o profile.dot
gprof2dot -f callgrind -e 0.05 -n 0.25 callgrind.out.1234567890123456 -o callgrind.dot

# Converting to SVG and PNG formats:
dot callgrind.dot -Tsvg -o callgrind.svg
dot callgrind.dot -Tpng -o callgrind.png

# Alternatively, both commands in a single line:
gprof2dot -f pstats profile.1234567890123456.cprof | dot -Tsvg -o profile.svg
```

### Action profiler.memory

{% my developer_call_service badge service="profiler.memory" %}

Start the memory profiler for the specified number of seconds.

| Data attribute | Optional | Description                                                |
| ---------------------- | -------- | ---------------------------------------------------------- |
| `seconds`              | yes      | The number of seconds to run the profile. Defaults to 60.0 |

When the memory profile is complete, Profiler will generate a `.hpy` file in your configuration directory. The exact path to these files will appear in a persistent notification so they can be easily located and copied to your desktop.

The `hpy` file can be viewed with any text editor. A visual representation can be viewed using the [Heapy Profile Browser](http://guppy-pe.sourceforge.net/ProfileBrowser.html) which is a part of the guppy3 package and can be launched via the below script:

```python
#! /usr/bin/python3
from guppy import hpy
hpy().pb()
```

### Action profiler.start_log_objects

{% my developer_call_service badge service="profiler.start_log_objects" %}

Start logging the growth of objects in memory.

| Data attribute | Optional | Description                                                 |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `scan_interval`        | yes      | The the frequency between logging objects. Defaults to 30.0 |

Periodically log the growth of new objects in memory. This action's primary use case is finding memory leaks. This action can be run for long periods to find slow leaks. For finding fast leaks, `profiler.start_log_object_sources` is preferred; however, it is much more CPU intensive.

See the [corresponding documentation for `growth()`](https://mg.pov.lt/objgraph/objgraph.html#objgraph.growth) regarding the format in which this data is logged.

### Action profiler.stop_log_objects

{% my developer_call_service badge service="profiler.stop_log_objects" %}

Stop logging the growth of objects in memory.

### Action profiler.start_log_object_sources

{% my developer_call_service badge service="profiler.start_log_object_sources" %}

Start logging the growth of objects in memory and attempt to find the source of the new objects.

| Data attribute | Optional | Description                                                                |
| ---------------------- | -------- | -------------------------------------------------------------------------- |
| `scan_interval`        | yes      | The the frequency between logging objects. Defaults to 30.0                |
| `max_objects`          | yes      | The number of new objects to examine for source information. Defaults to 5 |

Periodically log the growth of new objects in memory. This actions's primary use case is finding memory leaks.

This action is similar to `start_log_objects` except that it is much more CPU intensive since it will attempt to locate the source of each new object up to `max_objects` each time it logs.

### Action profiler.stop_log_object_sources

{% my developer_call_service badge service="profiler.stop_log_object_sources" %}

Stop logging the growth of objects with sources in memory.

### Action profiler.dump_log_objects

{% my developer_call_service badge service="profiler.dump_log_objects" %}

| Data attribute | Optional | Description                            |
| ---------------------- | -------- | -------------------------------------- |
| `type`                 | no       | The type of object to dump to the log. |

When `start_log_objects` highlights the growth of a collection of objects in memory, this action can help investigate. The `repr` of each object that matches `type` will be logged.

This action is useful for investigating the state of objects in memory. For example, if your system has templates that are rendering too frequently, the below example actions shows how to find which templates are the source of the problem:

```yaml
action: profiler.dump_log_objects
data:
  type: RenderInfo
```
```yaml
action: profiler.dump_log_objects
data:
  type: Template
```

### Action profiler.log_thread_frames

{% my developer_call_service badge service="profiler.log_thread_frames" %}

To help discover run away threads, why the executor is overloaded, or other threading problems, the current frames for each running thread will be logged when this action is performed.

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

### Action profiler.log_event_loop_scheduled

{% my developer_call_service badge service="profiler.log_event_loop_scheduled" %}

Log what is scheduled in the event loop. This can be helpful in tracking down integrations that do not stop listeners when Home Assistant stops or do not have sufficient locking to avoid scheduling updates before the previous update is finished.

Each upcoming scheduled item is logged similar to the below example:

`[homeassistant.components.profiler] Scheduled: <TimerHandle when=1528307.1818668307 async_track_point_in_utc_time.<locals>.run_action(<Job HassJobType.Coroutinefunction <bound method DataUpdateCoordinator._handle_refresh_interval of <homeassistant.components.screenlogic.ScreenlogicDataUpdateCoordinator object at 0x7f985d896d30>>>) at /usr/src/homeassistant/homeassistant/helpers/event.py:1175>`

### Action profiler.lru_stats

{% my developer_call_service badge service="profiler.lru_stats" %}

Logs statistics from [lru_cache](https://docs.python.org/3/library/functools.html#functools.lru_cache) and [lru-dict](https://pypi.org/project/lru-dict/) to help tune Home Assistant and locate memory leaks.

### Action profiler.set_asyncio_debug

{% my developer_call_service badge service="profiler.set_asyncio_debug" %}

| Data attribute | Optional | Description                            |
| ---------------------- | -------- | -------------------------------------- |
| `enabled`              | yes      | Boolean to enable asyncio debug.       |

When `set_asyncio_debug` is enabled, `asyncio` will run in [debug mode](https://docs.python.org/3/library/asyncio-dev.html#debug-mode). Use this service to help identify an integration that is blocking the event loop.

### Action profiler.log_current_tasks

{% my developer_call_service badge service="profiler.log_current_tasks" %}

This action can help track down task leaks, or find tasks that are delaying startup.

An example is below:

```txt
[homeassistant.components.profiler] Task: <Task pending name='Task-1133' coro=<HubConnector._listener() running at /usr/local/lib/python3.12/site-packages/aioharmony/hubconnector_websocket.py:362> wait_for=<Future pending cb=[Task.task_wakeup()]>>
```
