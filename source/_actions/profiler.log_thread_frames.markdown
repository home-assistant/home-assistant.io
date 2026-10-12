---
title: "Profiler: Log thread frames"
action: profiler.log_thread_frames
domain: profiler
description: "Logs the current frames for each running thread."
related_actions:
  - profiler.log_current_tasks
  - profiler.log_event_loop_scheduled
  - profiler.dump_sockets
---

Use this action to log the current frames for each running thread. This helps you discover runaway threads, find out why the executor is overloaded, or track down other threading problems.

This action requires an administrator account.

{% include actions/ui_header.md %}

To log thread frames from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Profiler: Log thread frames**.
6. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `profiler.log_thread_frames`. A basic example looks like this:

{% example %}
action: |
  action: profiler.log_thread_frames
{% endexample %}

This logs the current frames for each running thread.

This action does not support targets.

## Good to know

The frames for each thread are logged, similar to this example:

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
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
