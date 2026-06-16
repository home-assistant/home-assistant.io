---
title: "Profiler: Dump log objects"
action: profiler.dump_log_objects
domain: profiler
description: "Logs the representation of objects of a given type in memory."
related_actions:
  - profiler.start_log_objects
  - profiler.stop_log_objects
  - profiler.start_log_object_sources
---

Use this action to investigate objects in memory. When [Profiler: Start log objects](/actions/profiler.start_log_objects/) highlights the growth of a collection of objects in memory, this action helps you investigate it. The representation of each object that matches the given **Type** is logged.

{% include actions/ui_header.md %}

To dump log objects from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Profiler: Dump log objects**.
6. Set the **Type** of object to dump to the log.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Type:
  description: The type of object to dump to the log.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `profiler.dump_log_objects`. A basic example looks like this:

{% example %}
action: |
  action: profiler.dump_log_objects
  data:
    type: RenderInfo
{% endexample %}

This logs the representation of every `RenderInfo` object in memory.

### Options in YAML

{% options_yaml %}
type:
  description: The type of object to dump to the log.
  required: true
  type: string
{% endoptions_yaml %}

This action does not support targets.

## Good to know

This action is useful for investigating the state of objects in memory. For example, if your system has templates that render too frequently, you can find which templates are the source of the problem by dumping the `Template` objects:

```yaml
action: profiler.dump_log_objects
data:
  type: Template
```

This action requires an administrator account.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
