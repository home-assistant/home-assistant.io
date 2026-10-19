---
title: "Set group"
action: group.set
domain: group
description: "Creates or updates an old-style group."
related_actions:
  - group.remove
  - group.reload
---

Use this action to create a new old-style group or update an existing one. You identify the group by its object ID and set its name, icon, members, and behavior.

This action only works with old-style groups. It cannot be used with the new-style groups you create in the UI.

{% include actions/ui_header.md %}

To create or update a group from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Group: Set group**.
6. Enter the **Object ID** and any other options you want to set.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Object ID:
  description: The object ID of the group. It is used as part of the entity ID, in the format `group.object_id`.
Name:
  description: The name of the group.
Icon:
  description: The name of the icon for the group.
Entities:
  description: The full list of members in the group. Cannot be combined with **Add entities** or **Remove entities**.
Add entities:
  description: The members to add to the group. Cannot be combined with **Entities** or **Remove entities**.
Remove entities:
  description: The members to remove from the group. Cannot be combined with **Entities** or **Add entities**.
All:
  description: When enabled, the group is only on when all of its members are on.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `group.set`. A basic example looks like this:

{% example %}
action: |
  action: group.set
  data:
    object_id: my_group
    name: "My group"
    entities:
      - light.living_room
      - light.kitchen
{% endexample %}

This creates or updates the group `group.my_group` with two light members.

### Options in YAML

{% options_yaml %}
object_id:
  description: The object ID of the group. It is used as part of the entity ID, in the format `group.object_id`.
  required: true
  type: string
name:
  description: The name of the group.
  required: false
  type: string
icon:
  description: The name of the icon for the group.
  required: false
  type: string
entities:
  description: The full list of members in the group. Cannot be combined with `add_entities` or `remove_entities`.
  required: false
  type: list
add_entities:
  description: The members to add to the group. Cannot be combined with `entities` or `remove_entities`.
  required: false
  type: list
remove_entities:
  description: The members to remove from the group. Cannot be combined with `entities` or `add_entities`.
  required: false
  type: list
all:
  description: When enabled, the group is only on when all of its members are on.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

## Good to know

- Use only one of `entities`, `add_entities`, or `remove_entities` in a single call. They cannot be combined.
- A group created or updated with this action gets an `auto` attribute set to `true`.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
