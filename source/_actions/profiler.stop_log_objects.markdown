---
title: "Profiler: Stop log objects"
action: profiler.stop_log_objects
domain: profiler
description: "Stops logging the growth of objects in memory."
related_actions:
  - profiler.start_log_objects
  - profiler.start_log_object_sources
  - profiler.dump_log_objects
---

Use this action to stop logging the growth of objects in memory that you started with [Profiler: Start log objects](/integrations/profiler/).

{% include actions/ui_header.md %}

To stop logging objects from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Profiler: Stop log objects**.
6. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `profiler.stop_log_objects`. A basic example looks like this:

{% example %}
action: |
  action: profiler.stop_log_objects
{% endexample %}

This stops logging the growth of objects in memory.

This action does not support targets.

## Good to know

This action requires an administrator account.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
