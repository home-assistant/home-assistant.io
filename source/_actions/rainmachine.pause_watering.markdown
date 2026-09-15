---
title: "Pause all watering"
action: rainmachine.pause_watering
domain: rainmachine
description: "Pauses all watering activities for a number of seconds."
related_actions:
  - rainmachine.unpause_watering
  - rainmachine.stop_all
  - rainmachine.restrict_watering
---

The **Pause all watering** action pauses every watering activity on a RainMachine controller for a set number of seconds. When the pause ends, the previous watering activities resume on their own.

This is useful for short interruptions, like pausing the sprinklers while you are in the garden, without changing the underlying schedule.

{% include actions/ui_header.md %}

To pause watering from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **RainMachine: Pause all watering**.
6. Select the **Controller** and enter the **Duration** (in seconds) to pause.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Controller:
  description: The controller whose watering activities should be paused.
  required: true
Duration:
  description: The amount of time, in seconds, to pause watering.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rainmachine.pause_watering`. A basic example looks like this:

{% example %}
action: |
  action: rainmachine.pause_watering
  data:
    device_id: 4de41b1e3d8f0b6e3c0e2a3b1f5a7c9d
    seconds: 600
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The controller whose watering activities should be paused.
  required: true
  type: string
seconds:
  description: >
    The amount of time, in seconds, to pause watering.
  required: true
  type: integer
{% endoptions_yaml %}

## Good to know

- A controller can be paused for a maximum of 12 hours (43200 seconds).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
