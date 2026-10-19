---
title: "Pause watering"
action: rachio.pause_watering
domain: rachio
description: "Pauses any currently running zones or schedules."
related_actions:
  - rachio.resume_watering
  - rachio.stop_watering
  - rachio.start_watering
---

Use this action to pause any currently running zones or schedules. This action is not available if only a Generation 1 controller is on the account, as those controllers do not support pause or resume.

{% include actions/ui_header.md %}

To pause watering from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Rachio: Pause watering**.
6. Optionally, enter the **Devices** to pause and the **Duration**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Devices:
  description: Name of the controller to pause. Defaults to all controllers on the account when left empty.
  required: false
Duration:
  description: How long to pause, in minutes. Must be between 1 and 60. Defaults to 60 minutes.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rachio.pause_watering`. A basic example looks like this:

{% example %}
action: |
  action: rachio.pause_watering
  data:
    devices: "Main House"
    duration: 30
{% endexample %}

This pauses the Main House controller for 30 minutes.

### Options in YAML

{% options_yaml %}
devices:
  description: >
    Name of the controller to pause. Defaults to all controllers on the account
    when left empty.
  required: false
  type: string
duration:
  description: >
    How long to pause, in minutes. Must be between 1 and 60. Defaults to 60
    minutes.
  required: false
  type: integer
  default: 60
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
