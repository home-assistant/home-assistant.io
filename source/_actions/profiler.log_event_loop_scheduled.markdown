---
title: "Profiler: Log event loop scheduled"
action: profiler.log_event_loop_scheduled
domain: profiler
description: "Logs what is scheduled in the event loop."
related_actions:
  - profiler.log_current_tasks
  - profiler.log_thread_frames
  - profiler.dump_sockets
---

Use this action to log what is scheduled in the event loop. This helps you track down integrations that do not stop listeners when Home Assistant stops, or that do not have sufficient locking to avoid scheduling updates before the previous update is finished.

This action requires an administrator account.

{% include actions/ui_header.md %}

To log the event loop schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Profiler: Log event loop scheduled**.
6. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `profiler.log_event_loop_scheduled`. A basic example looks like this:

{% example %}
action: |
  action: profiler.log_event_loop_scheduled
{% endexample %}

This logs what is currently scheduled in the event loop.

This action does not support targets.

## Good to know

Each upcoming scheduled item is logged, similar to this example:

```txt
[homeassistant.components.profiler] Scheduled: <TimerHandle when=1528307.1818668307 async_track_point_in_utc_time.<locals>.run_action(<Job HassJobType.Coroutinefunction <bound method DataUpdateCoordinator._handle_refresh_interval of <homeassistant.components.screenlogic.ScreenlogicDataUpdateCoordinator object at 0x7f985d896d30>>>) at /usr/src/homeassistant/homeassistant/helpers/event.py:1175>
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
