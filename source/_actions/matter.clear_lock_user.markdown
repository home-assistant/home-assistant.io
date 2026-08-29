---
title: "Clear a Matter lock user"
action: matter.clear_lock_user
domain: matter
description: "Deletes a user and their credentials from a Matter lock."
related_actions:
  - matter.set_lock_user
  - matter.get_lock_users
  - matter.clear_lock_credential
---

Use this action to delete a user and all their credentials from a Matter lock. A common use is to remove access for someone who no longer needs it, for example a former houseguest.

To remove every user at once, use index `65534`. This is a special value defined by the Matter specification (hex `0xFFFE`) that tells the lock to remove all users.

{% include actions/ui_header.md %}

To clear a lock user from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lock you want to manage.
6. From the actions shown for that target, select **Clear a Matter lock user**.
7. Enter the **User index** to remove.
8. Select **Save**.

### Options in the UI

{% options_ui %}
User index:
  description: The user slot index (1-based) to clear. Use 65534 to clear all users at once.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matter.clear_lock_user`. A basic example looks like this:

{% example %}
action: |
  action: matter.clear_lock_user
  target:
    entity_id: lock.front_door
  data:
    user_index: 3
{% endexample %}

To remove every user at once, use index `65534`:

{% example %}
action: |
  action: matter.clear_lock_user
  target:
    entity_id: lock.front_door
  data:
    user_index: 65534
{% endexample %}

### Options in YAML

{% options_yaml %}
user_index:
  description: The user slot index (1-based) to clear. Use `65534` to clear all users at once.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Clearing a user also removes all credentials linked to that user, such as their PIN codes and RFID tags.
- Clearing all users with index `65534` cannot be undone. The lock keeps no record of the users it removed.

{% include actions/stuck.md %}

{% include actions/related.md %}
