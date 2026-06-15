---
title: "Delete user"
action: zwave_js.delete_user
domain: zwave_js
description: "Deletes an access-control user and all their credentials from a Z-Wave lock."
related_actions:
  - zwave_js.set_user
  - zwave_js.delete_all_users
---

Use this action to delete a single access-control user, and all their credentials, from a Z-Wave lock. This is handy when someone no longer needs access, for example after a guest checks out.

{% include actions/ui_header.md %}

To delete a user from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the locks to delete the user from.
6. From the actions shown for that target, select **Delete user**.
7. Set the **User index** to delete.
8. Select **Save**.

### Options in the UI

{% options_ui %}
User index:
  description: The user slot index to delete.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.delete_user`. A basic example looks like this:

{% example %}
action: |
  action: zwave_js.delete_user
  target:
    entity_id: lock.front_door
  data:
    user_id: 3
{% endexample %}

### Options in YAML

{% options_yaml %}
user_id:
  description: The user slot index to delete.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Good to know

- Deleting a user also removes all of that user's credentials.

{% include actions/stuck.md %}

{% include actions/related.md %}
