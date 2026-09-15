---
title: "Remove group"
action: group.remove
domain: group
description: "Removes an old-style group."
related_actions:
  - group.set
  - group.reload
---

Use this action to remove an old-style group you created with the [Set group](/actions/group.set/) action. You identify the group by its object ID.

This action only works with old-style groups. It cannot be used with the new-style groups you create in the UI.

{% include actions/ui_header.md %}

To remove a group from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Group: Remove group**.
6. Enter the **Object ID** of the group you want to remove.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Object ID:
  description: The object ID of the group to remove. It is used as part of the entity ID, in the format `group.object_id`.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `group.remove`. A basic example looks like this:

{% example %}
action: |
  action: group.remove
  data:
    object_id: my_group
{% endexample %}

This removes the group `group.my_group`.

### Options in YAML

{% options_yaml %}
object_id:
  description: The object ID of the group to remove. It is used as part of the entity ID, in the format `group.object_id`.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- This action only removes groups created with the [Set group](/actions/group.set/) action. It does not remove groups defined in your YAML configuration.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
