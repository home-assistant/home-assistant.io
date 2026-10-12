---
title: "Profiler: LRU stats"
action: profiler.lru_stats
domain: profiler
description: "Logs statistics from LRU caches."
related_actions:
  - profiler.memory
  - profiler.start_log_objects
  - profiler.dump_log_objects
---

Use this action to log statistics from [`lru_cache`](https://docs.python.org/3/library/functools.html#functools.lru_cache) and [`lru-dict`](https://pypi.org/project/lru-dict/). This helps you tune Home Assistant and locate memory leaks.

This action requires an administrator account.

{% include actions/ui_header.md %}

To log LRU stats from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Profiler: LRU stats**.
6. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `profiler.lru_stats`. A basic example looks like this:

{% example %}
action: |
  action: profiler.lru_stats
{% endexample %}

This logs statistics from the LRU caches.

This action does not support targets.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
