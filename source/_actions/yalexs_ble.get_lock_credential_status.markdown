---
title: "Get lock credential status"
action: yalexs_ble.get_lock_credential_status
domain: yalexs_ble
description: "Returns whether a keypad PIN slot on a Yale Access Bluetooth lock is in use, and its name."
related_actions:
  - yalexs_ble.set_lock_credential
  - yalexs_ble.clear_lock_credential
---

Use this action to check whether a keypad PIN slot on a Yale Access Bluetooth lock is in use, and which name you gave it in Home Assistant. A common use is to check that a slot is free before you set a new PIN in it. The PIN itself is never returned.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To check a keypad PIN slot from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lock you want to check.
6. From the actions shown for that target, select **Get lock credential status**.
7. Set the **Credential index** to the slot you want to check.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Credential type:
  description: The type of credential. Only PIN is supported.
  default: PIN
Credential index:
  description: The keypad PIN slot to check, from 1 to 250.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `yalexs_ble.get_lock_credential_status`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: yalexs_ble.get_lock_credential_status
  target:
    entity_id: lock.front_door
  data:
    credential_type: pin
    credential_index: 10
  response_variable: slot_status
{% endexample %}

### Options in YAML

{% options_yaml %}
credential_type:
  description: The type of credential. Only `pin` is supported.
  required: true
  type: string
  default: pin
credential_index:
  description: The keypad PIN slot to check, from 1 to 250.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Response data

The action returns the status of the slot you checked. The response includes the following fields:

- `credential_exists`: `true` if the slot has a PIN, otherwise `false`.
- `name`: The name you gave the slot in Home Assistant, or `null` if the slot has no name or no PIN.

For example, if slot 10 has a PIN named "Dog walker", the response looks like this:

```yaml
lock.front_door:
  credential_exists: true
  name: Dog walker
```

## Good to know

- Only administrators can use this action.
- The action asks the lock directly, so it also reports PINs that were added at the keypad or in the Yale app. Those slots have no name unless you set one with the [Set lock credential](/actions/yalexs_ble.set_lock_credential/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
