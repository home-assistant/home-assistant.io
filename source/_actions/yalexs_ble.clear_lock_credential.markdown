---
title: "Clear lock credential"
action: yalexs_ble.clear_lock_credential
domain: yalexs_ble
description: "Clears a keypad PIN from a slot on a Yale Access Bluetooth lock."
related_actions:
  - yalexs_ble.set_lock_credential
  - yalexs_ble.get_lock_credential_status
---

Use this action to remove a keypad PIN from a slot on a Yale Access Bluetooth lock. You only need the slot number, not the PIN itself. A common use is to revoke a houseguest's PIN at the end of their stay.

Clearing a slot also removes the name you gave it in Home Assistant.

{% include actions/ui_header.md %}

To clear a keypad PIN from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lock you want to manage.
6. From the actions shown for that target, select **Clear lock credential**.
7. Set the **Credential index** to the slot you want to clear.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Credential type:
  description: The type of credential. Only PIN is supported.
  default: PIN
Credential index:
  description: The keypad PIN slot to clear, from 1 to 250.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `yalexs_ble.clear_lock_credential`. For example, to clear the PIN in slot 10:

{% example %}
action: |
  action: yalexs_ble.clear_lock_credential
  target:
    entity_id: lock.front_door
  data:
    credential_type: pin
    credential_index: 10
{% endexample %}

To remove a guest PIN from every Yale Access Bluetooth lock in an area, for example at the end of a stay, target the area instead of a single lock. This works when the guest PIN uses the same slot on each lock:

{% example %}
action: |
  action: yalexs_ble.clear_lock_credential
  target:
    area_id: guest_house
  data:
    credential_type: pin
    credential_index: 20
{% endexample %}

### Options in YAML

{% options_yaml %}
credential_type:
  description: The type of credential. Only `pin` is supported.
  required: true
  type: string
  default: pin
credential_index:
  description: The keypad PIN slot to clear, from 1 to 250.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Good to know

- Only administrators can run this action.
- The lock's master code is not stored in a numbered slot and cannot be cleared with this action.

{% include actions/stuck.md %}

{% include actions/related.md %}
