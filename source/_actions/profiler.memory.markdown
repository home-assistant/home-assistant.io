---
title: "Profiler: Memory"
action: profiler.memory
domain: profiler
description: "Starts the memory profiler for a set number of seconds."
related_actions:
  - profiler.start
  - profiler.start_log_objects
  - profiler.lru_stats
---

Use this action to start the memory profiler for the specified number of seconds. It helps you analyze how Home Assistant uses memory.

This action requires an administrator account.

{% include actions/ui_header.md %}

To start the memory profiler from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Profiler: Memory**.
6. Optionally, set the number of **Seconds** to run the profile.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Seconds:
  description: The number of seconds to run the profile. Defaults to 60.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `profiler.memory`. A basic example looks like this:

{% example %}
action: |
  action: profiler.memory
  data:
    seconds: 120
{% endexample %}

This runs the memory profiler for 120 seconds.

### Options in YAML

{% options_yaml %}
seconds:
  description: The number of seconds to run the profile. Defaults to 60.
  required: false
  type: float
{% endoptions_yaml %}

This action does not support targets.

## Good to know

When the memory profile is complete, the profiler generates a `.hpy` file in your configuration directory. The exact path appears in a notification, so you can find and copy it.

You can open the `hpy` file with any text editor. For a visual representation, use the [Heapy Profile Browser](https://guppy-pe.sourceforge.net/ProfileBrowser.html), which is part of the guppy3 package and can be launched with the following script:

```python
#!/usr/bin/python3
from guppy import hpy
hpy().pb()
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
