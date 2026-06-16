---
title: "Add bonus time"
action: nintendo_parental_controls.add_bonus_time
domain: nintendo_parental_controls
description: "Adds bonus screen time to a Nintendo Switch."
---

The **Add bonus time** action grants extra screen time to a Nintendo Switch, on top of the maximum allowed screen time.

This is useful when you want an automation to reward a little extra play time, for example after chores are done or on a special occasion.

This action does not support targets. In the UI, you are not prompted to choose an area, entity, or label. Instead, you select the Nintendo Switch to grant bonus time to through the **Device** option.

{% include actions/ui_header.md %}

To add bonus time from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Nintendo Switch parental controls: Add bonus time**.
6. Choose the **Device**, then enter the **Bonus time**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Nintendo Switch to add bonus time to.
  required: true
Bonus time:
  description: The amount of bonus time to add, in minutes, from 5 to 30.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nintendo_parental_controls.add_bonus_time`. A basic example looks like this:

{% example %}
action: |
  action: nintendo_parental_controls.add_bonus_time
  data:
    device_id: 1b4a46c6d0f3406c80d275f5b0c6483b
    bonus_time: 15
{% endexample %}

This adds 15 minutes of bonus screen time to the selected Nintendo Switch.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the Nintendo Switch device to add bonus time to.
  required: true
  type: string
bonus_time:
  description: >
    The amount of bonus time to add, in minutes, from 5 to 30.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
