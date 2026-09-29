---
title: "Profiler: Start"
action: profiler.start
domain: profiler
description: "Starts the profiler for a set number of seconds."
related_actions:
  - profiler.memory
  - profiler.start_log_objects
  - profiler.dump_log_objects
---

Use this action to start the profiler for the specified number of seconds. It collects a set of statistics that show how much time each part of Home Assistant takes, which helps you track down a performance issue or a misbehaving integration.

This action requires an administrator account.

{% include actions/ui_header.md %}

To start the profiler from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Profiler: Start**.
6. Optionally, set the number of **Seconds** to run the profile.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Seconds:
  description: The number of seconds to run the profile. Defaults to 60.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `profiler.start`. A basic example looks like this:

{% example %}
action: |
  action: profiler.start
  data:
    seconds: 120
{% endexample %}

This runs the profiler for 120 seconds.

### Options in YAML

{% options_yaml %}
seconds:
  description: The number of seconds to run the profile. Defaults to 60.
  required: false
  type: float
{% endoptions_yaml %}

This action does not support targets.

## Good to know

When the profile is complete, the profiler generates a Python `cprof` file and a `callgrind.out` file in your configuration directory. The exact path to these files appears in a notification, so you can find and copy them.

To view a `cprof` file, use:

- [SnakeViz](https://jiffyclub.github.io/snakeviz/)
- [Gprof2dot](https://github.com/jrfonseca/gprof2dot)

To view a `callgrind.out` file, use:

- [KCachegrind or QCachegrind](https://kcachegrind.github.io/)
- [Gprof2dot](https://github.com/jrfonseca/gprof2dot)

The gprof2dot tool generates [DOT](https://www.graphviz.org/doc/info/lang.html) files, which you can convert to images using the `dot` tool from [Graphviz](https://www.graphviz.org/), or view directly with [xdot](https://github.com/jrfonseca/xdot.py). The `-e` and `-n` parameters set the minimum percentage required to include a function in the output file.
For example:

- To generate the DOT files:

   

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
