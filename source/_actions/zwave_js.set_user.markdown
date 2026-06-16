---
title: "Set user"
action: zwave_js.set_user
domain: zwave_js
description: "Creates or updates an access-control user on a Z-Wave lock."
related_actions:
  - zwave_js.set_credential
  - zwave_js.delete_user
  - zwave_js.get_users
---

Use this action to create or update an access-control user on a Z-Wave lock. A user is the person a credential belongs to. After creating a user, add a PIN code or password with the [Set credential](/actions/zwave_js.set_credential/) action.

This action supersedes the older [Set lock user code](/actions/zwave_js.set_lock_usercode/) action and works across a variety of legacy and modern Z-Wave locks. It lets you store multiple credentials per user, assign user types, and require multiple credentials to unlock.

If you omit the user index, the integration assigns the first available slot. The action returns the assigned user index in a response variable.

{% note %}
The exact set of supported features varies by lock. Use the [Get credential capabilities](/actions/zwave_js.get_credential_capabilities/) action to find out what your lock supports before calling other actions.
{% endnote %}

{% include actions/ui_header.md %}

To create or update a user from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the locks to create or update the user on.
6. From the actions shown for that target, select **Set user**.
7. Set the options you want to use.
8. In the **Response variable** field, enter a name to store the result, for example, `result`.
9. Select **Save**.

### Options in the UI

{% options_ui %}
User index:
  description: The user slot index. When not set, the first available slot is used.
  required: false
User name:
  description: The display name for the user.
  required: false
User type:
  description: The type of user. Defaults to the existing value on update, or general on create.
  required: false
Credential rule:
  description: How many credentials must be presented to unlock, one of single, dual, or triple.
  required: false
Active:
  description: Whether the user is active. Inactive users exist on the lock but cannot unlock until reactivated.
  required: false
{% endoptions_ui %}

The available user types are:

- `general`: Can operate the lock.
- `programming`: Can program the device, manage users, and operate the lock.
- `non_access`: Is recognized, but cannot open the lock (only sends events).
- `duress`: Can open the lock, but sends an alarm to the hub.
- `disposable`: Can open the lock once, then is disabled.
- `expiring`: Can operate the lock. Access is disabled after a set time once first used.
- `remote_only`: Can only operate the lock remotely.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.set_user`. Store the result in a response variable so you can use the assigned user index in later steps:

{% example %}
action: |
  action: zwave_js.set_user
  target:
    entity_id: lock.front_door
  data:
    user_name: "Jane"
    user_type: general
    credential_rule: single
  response_variable: result
{% endexample %}

### Options in YAML

{% options_yaml %}
user_id:
  description: The user slot index. When not set, the first available slot is used.
  required: false
  type: integer
user_name:
  description: The display name for the user. When omitted, the existing name is kept on update or left empty on create.
  required: false
  type: string
user_type:
  description: The type of user. Defaults to the existing value on update, or general on create.
  required: false
  type: string
credential_rule:
  description: How many credentials must be presented to unlock, one of single, dual, or triple. Defaults to the existing value on update, or the lock's default on create.
  required: false
  type: string
active:
  description: Whether the user is active. Inactive users exist on the lock but cannot unlock until reactivated. Defaults to the existing value on update, or true on create.
  required: false
  type: boolean
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Response data

The response is keyed by lock entity. Each entry includes the assigned user index:

```yaml
lock.front_door:
  user_id: 1
```

## Good to know

- A user is a person; a credential is a PIN code or password. Create the user first, then add a credential.
- The maximum user name length and the supported user types and credential rules vary by lock. Check them with the [Get credential capabilities](/actions/zwave_js.get_credential_capabilities/) action.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
