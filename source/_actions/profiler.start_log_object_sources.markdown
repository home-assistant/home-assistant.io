---
title: "Profiler: Start log object sources"
action: profiler.start_log_object_sources
domain: profiler
description: "Starts logging the growth of objects in memory and tries to find their source."
related_actions:
  - profiler.stop_log_object_sources
  - profiler.start_log_objects
  - profiler.dump_log_objects
---

Use this action to start logging the growth of objects in memory and attempt to find the source of the new objects. Its primary use case is finding memory leaks.

This action is similar to [Profiler: Start log objects](/actions/profiler.start_log_objects/). **Profiler: Start log object sources** is much more CPU intensive, because it attempts to locate the source of each new object, up to the **Max objects** value each time it logs.

This action requires an administrator account.

{% include actions/ui_header.md %}

To start logging object sources from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Profiler: Start log object sources**.
6. Optionally, set the **Scan interval** and **Max objects**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Scan interval:
  description: How often to log the objects, in seconds. Defaults to 30.
  required: false
Max objects:
  description: The number of new objects to examine for source information. Defaults to 5.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `profiler.start_log_object_sources`. A basic example looks like this:

{% example %}
action: |
  action: profiler.start_log_object_sources
  data:
    scan_interval: 60
    max_objects: 10
{% endexample %}

This logs the growth of objects in memory every 60 seconds, examining up to 10 new objects for their source.

### Options in YAML

{% options_yaml %}
scan_interval:
  description: How often to log the objects, in seconds. Defaults to 30.
  required: false
  type: float
max_objects:
  description: The number of new objects to examine for source information, between 1 and 1024. Defaults to 5.
  required: false
  type: integer
{% endoptions_yaml %}

This action does not support targets.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
