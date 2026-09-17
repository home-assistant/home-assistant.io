---
title: "Delete all users"
action: zwave_js.delete_all_users
domain: zwave_js
description: "Deletes every access-control user and their credentials from a Z-Wave lock."
related_actions:
  - zwave_js.delete_user
  - zwave_js.set_user
---

Use this action to remove every access-control user, and all their credentials, from a Z-Wave lock. This is handy when you want to start fresh, for example after moving into a new home or resetting a lock for a new set of users.

{% include actions/ui_header.md %}

To delete all users from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the locks to clear.
6. From the actions shown for that target, select **Delete all users**.
7. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.delete_all_users`. A basic example looks like this:

{% example %}
action: |
  action: zwave_js.delete_all_users
  target:
    entity_id: lock.front_door
{% endexample %}

{% include actions/targets.md domain="lock" %}

## Good to know

- This removes all users and all their credentials from the lock at once.

{% include actions/stuck.md %}

{% include actions/related.md %}
