---
title: "Profiler: Set asyncio debug"
action: profiler.set_asyncio_debug
domain: profiler
description: "Enables or disables asyncio debug mode."
related_actions:
  - profiler.log_current_tasks
  - profiler.log_event_loop_scheduled
  - profiler.log_thread_frames
---

Use this action to enable or disable asyncio debug mode. When enabled, `asyncio` runs in [debug mode](https://docs.python.org/3/library/asyncio-dev.html#debug-mode). This helps you identify an integration that is blocking the event loop.

{% include actions/ui_header.md %}

To set asyncio debug mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Profiler: Set asyncio debug**.
6. Turn **Enabled** on or off.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Enabled:
  description: Turn on to enable asyncio debug mode, turn off to disable it. Defaults to on.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `profiler.set_asyncio_debug`. A basic example looks like this:

{% example %}
action: |
  action: profiler.set_asyncio_debug
  data:
    enabled: true
{% endexample %}

This enables asyncio debug mode.

### Options in YAML

{% options_yaml %}
enabled:
  description: Set to true to enable asyncio debug mode, set to false to disable it.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

This action does not support targets.

## Good to know

This action requires an administrator account.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
