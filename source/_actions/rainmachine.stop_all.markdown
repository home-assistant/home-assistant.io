---
title: "Stop all watering"
action: rainmachine.stop_all
domain: rainmachine
description: "Stops all watering activities."
related_actions:
  - rainmachine.pause_watering
  - rainmachine.stop_program
  - rainmachine.stop_zone
---

The **Stop all watering** action stops every watering activity that is currently running on a RainMachine controller. Use it when you want to halt all programs and zones at once, rather than stopping them one by one.

{% include actions/ui_header.md %}

To stop all watering from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **RainMachine: Stop all watering**.
6. Select the **Controller**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Controller:
  description: The controller whose watering activities should be stopped.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rainmachine.stop_all`. A basic example looks like this:

{% example %}
action: |
  action: rainmachine.stop_all
  data:
    device_id: 4de41b1e3d8f0b6e3c0e2a3b1f5a7c9d
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The controller whose watering activities should be stopped.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
