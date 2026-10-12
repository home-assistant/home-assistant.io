---
title: "Unpause all watering"
action: rainmachine.unpause_watering
domain: rainmachine
description: "Resumes all paused watering activities."
related_actions:
  - rainmachine.pause_watering
  - rainmachine.stop_all
---

The **Unpause all watering** action resumes every watering activity on a RainMachine controller that was paused with [Pause all watering](/actions/rainmachine.pause_watering/). Use it when you want watering to continue before the pause would have ended on its own.

{% include actions/ui_header.md %}

To resume watering from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **RainMachine: Unpause all watering**.
6. Select the **Controller**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Controller:
  description: The controller whose watering activities should be resumed.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rainmachine.unpause_watering`. A basic example looks like this:

{% example %}
action: |
  action: rainmachine.unpause_watering
  data:
    device_id: 4de41b1e3d8f0b6e3c0e2a3b1f5a7c9d
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The controller whose watering activities should be resumed.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
