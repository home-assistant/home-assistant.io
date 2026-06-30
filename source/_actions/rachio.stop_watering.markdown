---
title: "Stop watering"
action: rachio.stop_watering
domain: rachio
description: "Stops any currently running zones or schedules."
related_actions:
  - rachio.start_watering
  - rachio.pause_watering
  - rachio.resume_watering
---

Use this action to stop any currently running zones or schedules.

{% include actions/ui_header.md %}

To stop watering from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Rachio: Stop watering**.
6. Optionally, enter the **Devices** to stop.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Devices:
  description: Name of the controller to stop. Defaults to all controllers on the account when left empty.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rachio.stop_watering`. A basic example looks like this:

{% example %}
action: |
  action: rachio.stop_watering
  data:
    devices: "Main House"
{% endexample %}

This stops the Main House controller.

### Options in YAML

{% options_yaml %}
devices:
  description: >
    Name of the controller to stop. Defaults to all controllers on the account
    when left empty.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
