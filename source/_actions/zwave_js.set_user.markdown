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

Use this action to create or update an access-control user on a Z-Wave lock. A user is the person a credential belongs to. You can add a PIN code or password in the same call with the credential options, or afterwards with the [Set credential](/actions/zwave_js.set_credential/) action. Some locks only accept a new user together with a credential.

This action supersedes the older [Set lock user code](/actions/zwave_js.set_lock_usercode/) action and works across a variety of legacy and modern Z-Wave locks. It lets you store multiple credentials per user, assign user types, and require multiple credentials to unlock.

If you omit the user index, the integration assigns the first available slot. The action returns the assigned user index, and the credential slot when a credential was written, in a response variable.

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
6. From the actions shown for that target, under **Z-Wave**, select **Set user**.
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
Credential type:
  description: The type of credential to write together with the user, either pin_code or password. Set it together with Credential data.
  required: false
Credential slot:
  description: The credential slot index. When not set, the first available slot for the credential type is used, or, on locks that cannot store a user without a credential, the user's own slot (the user ID). On those locks, writing a credential to an existing user replaces that user's credential.
  required: false
Credential data:
  description: The credential data, such as the PIN digits or password string. Set it together with Credential type.
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

To create a user and its PIN code in one call:

{% example %}
action: |
  action: zwave_js.set_user
  target:
    entity_id: lock.front_door
  data:
    user_name: "Jane"
    user_type: general
    credential_type: pin_code
    credential_data: "0123"
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
  default: true
credential_type:
  description: The type of credential to write together with the user, either pin_code or password. Must be given together with credential_data.
  required: false
  type: string
credential_slot:
  description: The credential slot index. When not set, the first available slot for the credential type is used, or, on locks that cannot store a user without a credential, the user's own slot (the user ID). On those locks, writing a credential to an existing user replaces that user's credential.
  required: false
  type: integer
credential_data:
  description: The credential data, such as the PIN digits or password string. Must be given together with credential_type. Always quote the value in YAML, for example "0123", to preserve leading zeros and prevent it from being read as a number. For a PIN code, use digits only.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Response data

The response is keyed by lock entity. Each entry includes the assigned user index and the credential slot, which is `null` when no credential was written in the same call:

```yaml
lock.front_door:
  user_id: 1
  credential_slot: 1
```

## Good to know

- A user is a person; a credential is a PIN code or password. Create the user and its first credential in one call, or create the user first and add credentials with [Set credential](/actions/zwave_js.set_credential/). Locks that require a credential when a user is added answer "This device requires a credential when adding a user" to a call without one.
- The maximum user name length and the supported user types and credential rules vary by lock. Check them with the [Get credential capabilities](/actions/zwave_js.get_credential_capabilities/) action.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
