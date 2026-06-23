---
title: "Restrict all watering"
action: rainmachine.restrict_watering
domain: rainmachine
description: "Restricts all watering activities from starting for a time period."
related_actions:
  - rainmachine.unrestrict_watering
  - rainmachine.pause_watering
---

The **Restrict all watering** action prevents any watering from starting on a RainMachine controller for a set time period. Unlike pausing, which interrupts running activities, a restriction stops new watering from beginning.

This is helpful when you know watering should not run for a while, for example during an outdoor event or while you work in the garden.

{% include actions/ui_header.md %}

To restrict watering from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **RainMachine: Restrict all watering**.
6. Select the **Controller** and enter the **Duration**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Controller:
  description: The controller whose watering activities should be restricted.
  required: true
Duration:
  description: The time period to restrict watering from starting, for example 01:00:00.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rainmachine.restrict_watering`. A basic example looks like this:

{% example %}
action: |
  action: rainmachine.restrict_watering
  data:
    device_id: 4de41b1e3d8f0b6e3c0e2a3b1f5a7c9d
    duration: "01:00:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The controller whose watering activities should be restricted.
  required: true
  type: string
duration:
  description: >
    The time period to restrict watering from starting, for example
    01:00:00.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
