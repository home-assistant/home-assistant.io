---
title: "Resume watering"
action: rachio.resume_watering
domain: rachio
description: "Resumes any paused zone runs or schedules."
related_actions:
  - rachio.pause_watering
  - rachio.stop_watering
  - rachio.start_watering
---

Use this action to resume any paused zone runs or schedules. This action is not available if only a Generation 1 controller is on the account, as those controllers do not support pause or resume.

{% include actions/ui_header.md %}

To resume watering from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Rachio: Resume watering**.
6. Optionally, enter the **Devices** to resume.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Devices:
  description: Name of the controller to resume. Defaults to all controllers on the account when left empty.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rachio.resume_watering`. A basic example looks like this:

{% example %}
action: |
  action: rachio.resume_watering
  data:
    devices: Main House
{% endexample %}

This resumes the Main House controller.

### Options in YAML

{% options_yaml %}
devices:
  description: >
    Name of the controller to resume. Defaults to all controllers on the
    account when left empty.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
