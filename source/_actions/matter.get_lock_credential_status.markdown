---
title: "Get Matter lock credential status"
action: matter.get_lock_credential_status
domain: matter
description: "Returns the status of a credential slot on a Matter lock."
related_actions:
  - matter.set_lock_credential
  - matter.clear_lock_credential
  - matter.get_lock_users
---

Use this action to check the status of a single credential slot on a Matter lock. The response tells you whether the slot is in use, which user it belongs to, and which controller created or last changed it. A common use is to check whether a slot is free before you add a new credential.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get a credential status from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lock you want to query.
6. From the actions shown for that target, select **Get Matter lock credential status**.
7. Set the **Credential type** and **Credential index** to check.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Credential type:
  description: The type of credential to check. See the list of credential types below.
Credential index:
  description: The credential slot index (0-based) to query.
{% endoptions_ui %}

The available credential types are:

- `programming_pin`: A special administrative PIN used to manage the lock at the keypad.
- `pin`: A numeric PIN code entered on the lock's keypad.
- `rfid`: An RFID tag or card tapped against the lock's reader.
- `fingerprint`: A fingerprint registered on the lock's biometric sensor.
- `finger_vein`: A finger-vein pattern registered on the lock's biometric sensor.
- `face`: A facial recognition profile registered on the lock.
- `aliro_credential_issuer_key`: An Aliro credential issuer key, used by Aliro-compatible locks for NFC-based access.
- `aliro_evictable_endpoint_key`: An Aliro endpoint key that the lock can remove when it runs out of space.
- `aliro_non_evictable_endpoint_key`: An Aliro endpoint key that the lock must keep and cannot automatically remove.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matter.get_lock_credential_status`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: matter.get_lock_credential_status
  target:
    entity_id: lock.front_door
  data:
    credential_type: pin
    credential_index: 1
  response_variable: credential_status
{% endexample %}

### Options in YAML

{% options_yaml %}
credential_type:
  description: The type of credential to check. See the list of credential types above.
  required: true
  type: string
credential_index:
  description: The credential slot index (0-based) to query.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Response data

The action returns the status of the credential slot you queried. The response includes the following fields:

- `credential_exists`: Whether a credential is stored in the slot.
- `user_index`: The user the credential is linked to, if any.
- `creator_fabric_index`: The controller that created the credential.
- `last_modified_fabric_index`: The controller that last changed the credential.
- `next_credential_index`: The next credential slot, if the lock reports one.

## Good to know

- The `creator_fabric_index` and `last_modified_fabric_index` fields refer to the controller (such as Home Assistant, Apple Home, or Google Home) that created or changed the credential.

{% include actions/stuck.md %}

{% include actions/related.md %}
