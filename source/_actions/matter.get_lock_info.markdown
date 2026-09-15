---
title: "Get Matter lock info"
action: matter.get_lock_info
domain: matter
description: "Returns the capabilities of a Matter lock."
related_actions:
  - matter.get_lock_users
  - matter.set_lock_user
  - matter.set_lock_credential
---

Use this action to find out what a Matter lock supports, such as the credential types it accepts, how many users it can hold, and its PIN length limits. A common use is to check a lock's capabilities before you start adding users or credentials.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get lock info from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lock you want to query.
6. From the actions shown for that target, select **Get Matter lock info**.
7. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matter.get_lock_info`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: matter.get_lock_info
  target:
    entity_id: lock.front_door
  response_variable: lock_info
{% endexample %}

### Options in YAML

This action has no options.

{% include actions/targets.md %}

## Response data

The action returns the capabilities of the lock. The response includes the following fields:

- `supports_user_management`: Whether the lock supports managing users and credentials.
- `supported_credential_types`: The credential types the lock accepts, such as `pin` or `rfid`.
- `max_users`: The maximum number of users the lock can hold.
- `max_pin_users`: The maximum number of users that can have a PIN.
- `max_rfid_users`: The maximum number of users that can have an RFID tag.
- `max_credentials_per_user`: The maximum number of credentials each user can have.
- `min_pin_length`: The minimum allowed PIN length.
- `max_pin_length`: The maximum allowed PIN length.
- `min_rfid_length`: The minimum allowed RFID length.
- `max_rfid_length`: The maximum allowed RFID length.

Fields that the lock does not report are returned without a value.

## Good to know

- Not all Matter locks support user and credential management. Check `supports_user_management` in the response before you try to add users or credentials.

{% include actions/stuck.md %}

{% include actions/related.md %}
