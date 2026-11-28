---
title: "Stop event loop timing"
action: profiler.stop_loop_timing
domain: profiler
description: "Stops timing the event loop and logs what was recorded."
related_actions:
  - profiler.start_loop_timing
  - profiler.dump_loop_timing
---

Use this action to stop the event loop timing that you started with [Start event loop timing](/actions/profiler.start_loop_timing/). The results are written to the log, and returned as response data when you ask for it.

This action requires an administrator account.

{% include actions/ui_header.md %}

To stop event loop timing from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Profiler: Stop event loop timing**.
6. Optionally, to use the results in later steps, enter a name in the **Response variable** field, for example, `loop_timing`.
7. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `profiler.stop_loop_timing`. A basic example looks like this:

{% example %}
action: |
  action: profiler.stop_loop_timing
{% endexample %}

This stops the timing and writes the results to the log. To use them in a script, add a response variable:

{% example %}
action: |
  action: profiler.stop_loop_timing
  response_variable: loop_timing
{% endexample %}

This action does not support targets.

## Response data

The response data has the same fields as [Dump event loop timing](/actions/profiler.dump_loop_timing/#response-data).

## Good to know

- Stopping discards the recorded data. Read the log or store the results in a response variable.
- If timing is not running, the action fails with an error.
- The log lists the 50 busiest callbacks and says how many it left out. The response data contains all of them.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
