---
title: "Start event loop timing"
action: profiler.start_loop_timing
domain: profiler
description: "Starts timing every callback of the event loop and keeps the slow ones."
related_actions:
  - profiler.dump_loop_timing
  - profiler.stop_loop_timing
  - profiler.set_asyncio_debug
---

Use this action to find out what keeps the event loop busy. The event loop is where Home Assistant runs the work of all integrations, one small piece (a callback) at a time. When a piece takes long, everything else waits. While timing is on, Home Assistant measures how long each callback holds the event loop and counts the time per function and, when the callback ran for a config entry, per config entry. Callbacks that take at least as long as the threshold are also listed one by one, with the time they ran. Timing stays on until you stop it, so you can leave it running for hours while you wait for a rare slowdown. To see the results while timing is on, use [Dump event loop timing](/actions/profiler.dump_loop_timing/).

While timing is on, every callback takes slightly longer to run. When timing is off, nothing is measured and there is no overhead.

This action requires an administrator account.

{% include actions/ui_header.md %}

To start event loop timing from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Profiler: Start event loop timing**.
6. Optionally, set the **Threshold**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold:
  description: Callbacks that take at least this long, in milliseconds, are listed individually. Defaults to 100.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `profiler.start_loop_timing`. A basic example looks like this:

{% example %}
action: |
  action: profiler.start_loop_timing
  data:
    threshold: 250
{% endexample %}

This starts timing the event loop. Every callback that takes 250 milliseconds or longer is kept in the list of slow callbacks, which holds the last 100. You see the results when you dump or stop the timing.

### Options in YAML

{% options_yaml %}
threshold:
  description: Callbacks that take at least this long, in milliseconds, are listed individually.
  required: false
  type: float
  default: 100
{% endoptions_yaml %}

This action does not support targets.

## Good to know

- Only one timing can run at a time. If timing is already running, starting it again fails. Stop it with [Stop event loop timing](/actions/profiler.stop_loop_timing/) first, for example to use another threshold.
- Only the last 100 callbacks over the threshold are kept. A threshold of 0 lists every callback.
- Timing stops when the Profiler integration is reloaded or removed.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
