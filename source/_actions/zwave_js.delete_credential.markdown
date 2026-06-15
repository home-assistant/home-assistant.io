---
title: "Delete credential"
action: zwave_js.delete_credential
domain: zwave_js
description: "Removes a single credential from a user on a Z-Wave lock."
related_actions:
  - zwave_js.set_credential
  - zwave_js.delete_all_credentials
---

Use this action to remove a single credential, such as a PIN code or password, from a user on a Z-Wave lock. The user itself is not deleted and can have new credentials added later.

The credential is identified by the combination of user index, credential type, and credential slot, all of which are required.

{% include actions/ui_header.md %}

To delete a credential from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the locks to delete the credential from.
6. From the actions shown for that target, select **Delete credential**.
7. Set the **User index**, **Credential type**, and **Credential slot**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
User index:
  description: The user slot index that owns the credential.
Credential type:
  description: The type of credential to remove, either pin_code or password.
Credential slot:
  description: The credential slot index to clear.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.delete_credential`. A basic example looks like this:

{% example %}
action: |
  action: zwave_js.delete_credential
  target:
    entity_id: lock.front_door
  data:
    user_id: 1
    credential_type: pin_code
    credential_slot: 1
{% endexample %}

### Options in YAML

{% options_yaml %}
user_id:
  description: The user slot index that owns the credential.
  required: true
  type: integer
credential_type:
  description: The type of credential to remove, either pin_code or password.
  required: true
  type: string
credential_slot:
  description: The credential slot index to clear.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Good to know

- Only `pin_code` and `password` credentials can be removed through this action. Other credential types must be managed directly on the device.
- The user is kept. To remove the user as well, use the [Delete user](/actions/zwave_js.delete_user/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
