---
title: "Profiler: Log current tasks"
action: profiler.log_current_tasks
domain: profiler
description: "Logs all currently running tasks."
related_actions:
  - profiler.log_event_loop_scheduled
  - profiler.log_thread_frames
  - profiler.set_asyncio_debug
---

Use this action to log all currently running tasks. This helps you track down task leaks or find tasks that are delaying startup.

This action requires an administrator account.

{% include actions/ui_header.md %}

To log current tasks from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Profiler: Log current tasks**.
6. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `profiler.log_current_tasks`. A basic example looks like this:

{% example %}
action: |
  action: profiler.log_current_tasks
{% endexample %}

This logs all currently running tasks.

This action does not support targets.

## Good to know

Each running task is logged, similar to this example:

```txt
[homeassistant.components.profiler] Task: <Task pending name='Task-1133' coro=<HubConnector._listener() running at /usr/local/lib/python3.12/site-packages/aioharmony/hubconnector_websocket.py:362> wait_for=<Future pending cb=[Task.task_wakeup()]>>
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
