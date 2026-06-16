---
title: "Profiler: Start log objects"
action: profiler.start_log_objects
domain: profiler
description: "Starts logging the growth of objects in memory."
related_actions:
  - profiler.stop_log_objects
  - profiler.start_log_object_sources
  - profiler.dump_log_objects
---

Use this action to start logging the growth of objects in memory. Its primary use case is finding memory leaks. You can run it for long periods to find slow leaks. For finding fast leaks, [Profiler: Start log object sources](/integrations/profiler/) is preferred, although it is much more CPU intensive.

{% include actions/ui_header.md %}

To start logging objects from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Profiler: Start log objects**.
6. Optionally, set the **Scan interval**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Scan interval:
  description: How often to log the objects, in seconds. Defaults to 30.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `profiler.start_log_objects`. A basic example looks like this:

{% example %}
action: |
  action: profiler.start_log_objects
  data:
    scan_interval: 60
{% endexample %}

This logs the growth of objects in memory every 60 seconds.

### Options in YAML

{% options_yaml %}
scan_interval:
  description: How often to log the objects, in seconds. Defaults to 30.
  required: false
  type: float
{% endoptions_yaml %}

This action does not support targets.

## Good to know

See the [corresponding documentation for `growth()`](https://mg.pov.lt/objgraph/objgraph.html#objgraph.growth) for the format in which this data is logged.

This action requires an administrator account.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
