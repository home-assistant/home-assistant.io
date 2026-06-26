---
title: "Set a Matter lock credential"
action: matter.set_lock_credential
domain: matter
description: "Adds or updates a credential, such as a PIN, on a Matter lock."
related_actions:
  - matter.clear_lock_credential
  - matter.get_lock_credential_status
  - matter.set_lock_user
---

Use this action to add or update a credential on a Matter lock. A credential is what a user presents to unlock the lock, such as a PIN code or an RFID tag. A common use is to give a houseguest their own PIN code.

If you leave the credential index empty, the lock automatically assigns the next available slot. If you leave the user index empty, the lock creates a new user for the credential.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To set a lock credential from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lock you want to manage.
6. From the actions shown for that target, select **Set a Matter lock credential**.
7. Set the **Credential type** and **Credential data**, and any other details you want.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Credential type:
  description: The type of credential to set, such as a PIN or an RFID tag. See the list of credential types below.
Credential data:
  description: "The credential value to store. For a PIN, use digits only, such as 1234. For RFID, use a hexadecimal string, such as AABBCCDD."
Credential index:
  description: The credential slot index (0-based). Leave empty to let the lock find an available slot.
  required: false
User index:
  description: The user (1-based) to link the credential to. Leave empty to have the lock create a new user.
  required: false
User status:
  description: The status to set when creating a new user for this credential, either occupied and enabled or occupied and disabled.
  required: false
User type:
  description: The type of user to set when creating a new user for this credential. See the user types on the Set a Matter lock user action.
  required: false
{% endoptions_ui %}

The available credential types are:

- `pin`: A numeric PIN code entered on the lock's keypad.
- `rfid`: An RFID tag or card tapped against the lock's reader.
- `fingerprint`: A fingerprint registered on the lock's biometric sensor.
- `finger_vein`: A finger-vein pattern registered on the lock's biometric sensor.
- `face`: A facial recognition profile registered on the lock.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matter.set_lock_credential`. To add a PIN to an existing user, store the result in a response variable:

{% example %}
action: |
  action: matter.set_lock_credential
  target:
    entity_id: lock.front_door
  data:
    credential_type: pin
    credential_data: "1234"
    user_index: 1
  response_variable: result
{% endexample %}

To add an RFID tag and let the lock create a new user:

{% example %}
action: |
  action: matter.set_lock_credential
  target:
    entity_id: lock.front_door
  data:
    credential_type: rfid
    credential_data: "AABBCCDD"
  response_variable: result
{% endexample %}

### Options in YAML

{% options_yaml %}
credential_type:
  description: "The type of credential to set: `pin`, `rfid`, `fingerprint`, `finger_vein`, or `face`."
  required: true
  type: string
credential_data:
  description: "The credential value to store. For `pin`, use digits only, such as `1234`. For `rfid`, use a hexadecimal string, such as `AABBCCDD`."
  required: true
  type: string
credential_index:
  description: The credential slot index (0-based). Omit this field to let the lock find an available slot.
  required: false
  type: integer
user_index:
  description: The user index (1-based) to link the credential to. Omit this field to have the lock create a new user.
  required: false
  type: integer
user_status:
  description: "The status to set when creating a new user for this credential: `occupied_enabled` or `occupied_disabled`."
  required: false
  type: string
user_type:
  description: The type of user to set when creating a new user for this credential. See the user types on the [Set a Matter lock user](/actions/matter.set_lock_user/) action.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Response data

The action returns where the credential was stored. The response includes the following fields:

- `credential_index`: The slot index where the credential was stored.
- `user_index`: The user the credential is linked to.
- `next_credential_index`: The next available credential slot, if the lock reports one.

## Good to know

- A credential is always linked to a user. If you do not provide a user index, the lock creates a new user for the credential.
- The lock never returns the credential value you stored. Keep a record of PIN codes somewhere safe if you need them later.

{% include actions/stuck.md %}

{% include actions/related.md %}
