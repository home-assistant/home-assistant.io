---
title: "Profiler: Dump sockets"
action: profiler.dump_sockets
domain: profiler
description: "Logs all sockets used by Home Assistant."
related_actions:
  - profiler.log_current_tasks
  - profiler.log_event_loop_scheduled
  - profiler.log_thread_frames
---

Use this action to log all sockets used by Home Assistant. This helps you identify which network connections are currently open, mainly to track down connections that are not being closed properly.

This action requires an administrator account.

{% include actions/ui_header.md %}

To dump sockets from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Profiler: Dump sockets**.
6. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `profiler.dump_sockets`. A basic example looks like this:

{% example %}
action: |
  action: profiler.dump_sockets
{% endexample %}

This logs all sockets used by Home Assistant.

This action does not support targets.

## Good to know

The sockets are logged, similar to this example:

```txt
[homeassistant.components.profiler] Sockets used by Home Assistant:
<socket.socket [closed] fd=-1, family=2, type=1, proto=6>
<socket.socket fd=97, family=2, type=1, proto=6, laddr=('192.168.1.10', 80), raddr=('192.168.1.14', 59086)>
<socket.socket fd=7, family=1, type=1, proto=0>
<socket.socket fd=11, family=10, type=1, proto=6, laddr=('::', 80, 0, 0)>
<socket.socket fd=12, family=2, type=1, proto=6, laddr=('0.0.0.0', 80)>
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
