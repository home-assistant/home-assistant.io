---
title: "Automation modes"
description: "Automation modes define how an automation behaves when it is triggered while still running from a previous trigger. Home Assistant has single, restart, queued, and parallel modes."
---

Sometimes an automation gets triggered again before it has finished running from the previous time. The mode setting tells Home Assistant what to do in that situation: ignore the new trigger, start over, queue it up, or run another copy in parallel.

Most of the time, the default `single` mode is exactly what you want. The other modes are there for special cases, like a notification automation that should run a fresh copy for every event, or a long-running sequence that should restart from the top whenever something changes.

Mode | Description
-|-
`single` | (Default) Do not start a new run. Issue a warning.
`restart` | Start a new run after first stopping the previous run. The automation only restarts if the conditions are met.
`queued` | Start a new run after all previous runs complete. Runs are guaranteed to execute in the order they were queued. Note that subsequent queued automations will only join the queue if any conditions it may have are met at the time it is triggered.
`parallel` | Start a new, independent run in parallel with previous runs.

<p class='img'>
  <img src='/images/integrations/script/script_modes.jpg'>
</p>

For both `queued` and `parallel` modes, configuration option `max` controls the maximum
number of runs that can be executing and/or queued up at a time. The default is 10.

When `max` is exceeded (which is effectively 1 for `single` mode) a log message will be emitted to indicate this has happened. Configuration option `max_exceeded` controls the severity level of that log message. Set it to `silent` to ignore warnings or set it to a [log level](/integrations/logger/#log-levels). The default is `warning`.

## Example throttled automation

Some automations you only want to run every 5 minutes. This can be achieved using the `single` mode and silencing the warnings when the automation is triggered while it's running.

```yaml
automation:
  - mode: single
    max_exceeded: silent
    triggers:
      - ...
    actions:
      - ...
      - delay: 300  # seconds (=5 minutes)
```

## Example queued

Sometimes an automation is doing an action on a device that does not support multiple simultaneous actions. In such cases, a queue can be used. In that case, the automation will be executed once it's current invocation and queue are done.

```yaml
automation:
  - mode: queued
    max: 25
    triggers:
      - ...
    actions:
      - ...
```
