---
title: "Get Matter lock users"
action: matter.get_lock_users
domain: matter
description: "Returns all users configured on a Matter lock."
related_actions:
  - matter.set_lock_user
  - matter.clear_lock_user
  - matter.get_lock_info
---

Use this action to list all the users configured on a Matter lock. A common use is to review who has access, for example before you add or remove a user.

For security, the lock never returns the actual credential secrets, such as PIN codes or RFID tag values. It only returns a reference to each credential.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get lock users from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lock you want to query.
6. From the actions shown for that target, select **Get Matter lock users**.
7. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matter.get_lock_users`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: matter.get_lock_users
  target:
    entity_id: lock.front_door
  response_variable: lock_users
{% endexample %}

### Options in YAML

This action has no options.

{% include actions/targets.md %}

## Response data

The action returns the maximum number of users the lock supports and a list of the users that are configured. The response includes the following fields:

- `max_users`: The maximum number of users the lock can hold.
- `users`: A list of the configured users. Each user includes the following:
  - `user_index`: The user slot index.
  - `user_name`: The name of the user, if one is set.
  - `user_status`: Whether the user is active.
  - `user_type`: The type of user, such as `unrestricted_user`.
  - `credential_rule`: How many credentials the user must present to unlock.
  - `credentials`: A list of the user's credentials, each with its `type` and slot `index`.
  - `creator_fabric_index`: The controller that created the user.
  - `last_modified_fabric_index`: The controller that last changed the user.

## Good to know

- The `creator_fabric_index` and `last_modified_fabric_index` fields refer to the controller (such as Home Assistant, Apple Home, or Google Home) that created or changed the user.

{% include actions/stuck.md %}

{% include actions/related.md %}
