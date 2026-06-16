---
title: "Set credential"
action: zwave_js.set_credential
domain: zwave_js
description: "Adds or updates a PIN code or password for an existing user on a Z-Wave lock."
related_actions:
  - zwave_js.set_user
  - zwave_js.delete_credential
---

Use this action to add or update a credential, such as a PIN code or password, for an existing user on a Z-Wave lock. The user must already exist, so call the [Set user](/actions/zwave_js.set_user/) action first if you need to create one.

If you omit the credential slot, the integration assigns the first available slot for the credential type. The action returns the assigned credential slot and user index in a response variable.

{% note %}
Only `pin_code` and `password` credentials can be added or modified through this action. Other credential types, such as RFID, NFC, or biometric, may appear in the response of the [Get users](/actions/zwave_js.get_users/) and [Get credential capabilities](/actions/zwave_js.get_credential_capabilities/) actions, but must be enrolled directly on the device.
{% endnote %}

{% include actions/ui_header.md %}

To set a credential from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the locks to set the credential on.
6. From the actions shown for that target, select **Set credential**.
7. Set the **User index**, **Credential type**, and **Credential data**.
8. In the **Response variable** field, enter a name to store the result, for example, `result`.
9. Select **Save**.

### Options in the UI

{% options_ui %}
User index:
  description: The user slot index that owns the credential. Must refer to an existing user.
Credential type:
  description: The type of credential, either pin_code or password.
Credential data:
  description: The credential data, such as the PIN digits or password string.
Credential slot:
  description: The credential slot index. When not set, the first available slot for the credential type is used.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.set_credential`. Store the result in a response variable so you can use the assigned slot in later steps:

{% example %}
action: |
  action: zwave_js.set_credential
  target:
    entity_id: lock.front_door
  data:
    user_id: 1
    credential_type: pin_code
    credential_data: "1234"
  response_variable: result
{% endexample %}

### Options in YAML

{% options_yaml %}
user_id:
  description: The user slot index that owns the credential. Must refer to an existing user.
  required: true
  type: integer
credential_type:
  description: The type of credential, either pin_code or password.
  required: true
  type: string
credential_data:
  description: The credential data, such as the PIN digits or password string. Always quote the value in YAML, for example "0123", to preserve leading zeros and prevent it from being read as a number. For a PIN code, use digits only.
  required: true
  type: string
credential_slot:
  description: The credential slot index. When not set, the first available slot for the credential type is used.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Response data

The response is keyed by lock entity. Each entry includes the assigned credential slot and user index:

```yaml
lock.front_door:
  credential_slot: 1
  user_id: 1
```

## Good to know

- The user must already exist. Create one with the [Set user](/actions/zwave_js.set_user/) action first.
- The accepted credential length range is reported by the [Get credential capabilities](/actions/zwave_js.get_credential_capabilities/) action.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
