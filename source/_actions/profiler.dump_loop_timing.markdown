---
title: "Dump event loop timing"
action: profiler.dump_loop_timing
domain: profiler
description: "Logs or returns what the event loop timing has recorded so far."
related_actions:
  - profiler.start_loop_timing
  - profiler.stop_loop_timing
---

Use this action to see what the event loop timing has recorded so far, without stopping it. The results are written to the log, or returned as response data when you ask for it. Timing continues.

This action requires an administrator account.

{% include actions/ui_header.md %}

To dump the event loop timing from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Profiler: Dump event loop timing**.
6. Optionally, to use the results in later steps, enter a name in the **Response variable** field, for example, `loop_timing`.
7. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `profiler.dump_loop_timing`. A basic example looks like this:

{% example %}
action: |
  action: profiler.dump_loop_timing
{% endexample %}

This writes the results to the log. To use them in a script instead, store them in a response variable:

{% example %}
action: |
  action: profiler.dump_loop_timing
  response_variable: loop_timing
{% endexample %}

This action does not support targets.

## Response data

The response data is a mapping with the following fields:

- `since`: When timing started, as a UTC timestamp.
- `threshold_ms`: The threshold in milliseconds.
- `errors`: The number of callbacks that could not be identified. They are not timed and are not in the lists below.
- `callbacks`: What ran on the event loop, sorted by `total_ms`, highest first. Each item has:
  - `callback`: The function, with its module and class. Beyond 10,000 different callbacks, the rest are combined as `other callbacks`.
  - `config_entry`: The ID of the config entry the callback ran for, or `null`.
  - `entry`: The `domain` and `title` of that config entry. Only present when the config entry exists.
  - `count`: How many times it ran.
  - `total_ms`: The total time it held the event loop, in milliseconds.
  - `max_ms`: The longest single run, in milliseconds.
  - `max_at`: When the longest run ended, as a UTC timestamp.
- `slow`: The last 100 callbacks that took at least as long as the threshold, oldest first. Each item has `seq` (a running number since timing started, so you can tell new entries from ones you have seen), `at` (when it ended), `ms` (how long it took), `callback`, `config_entry`, and `entry` (only present when the config entry exists).

## Good to know

- Timing must be running. Start it with [Start event loop timing](/actions/profiler.start_loop_timing/).
- The log lists the 50 busiest callbacks. The response data contains all of them.
- Callbacks that don't run for a config entry, for example work scheduled by Home Assistant itself, have no entry.
- When Home Assistant starts a task eagerly, the task begins to run inside the callback that created it. That time is counted for the creating callback, not for the task.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
