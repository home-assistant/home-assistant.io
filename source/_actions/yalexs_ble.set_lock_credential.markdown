---
title: "Set lock credential"
action: yalexs_ble.set_lock_credential
domain: yalexs_ble
description: "Sets a keypad PIN in a slot on a Yale Access Bluetooth lock."
related_actions:
  - yalexs_ble.clear_lock_credential
  - yalexs_ble.get_lock_credential_status
---

Use this action to add or change a keypad PIN on a Yale Access Bluetooth lock. Each PIN is stored in a numbered slot on the lock. A common use is to give a dog walker or a houseguest their own PIN, so you can see when they use it and remove it later.

You can also give the slot a name. Home Assistant shows this name when the PIN is used to operate the lock, for example in the lock's **Changed by** attribute and in the logbook.

{% include actions/ui_header.md %}

To set a keypad PIN from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the lock you want to manage.
6. From the actions shown for that target, select **Set lock credential**.
7. Set the **Credential data** to the PIN and the **Credential index** to the slot you want to use. Optionally, enter a **Name** for the slot.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Credential type:
  description: The type of credential. Only PIN is supported.
  default: PIN
Credential data:
  description: The PIN, 4 to 8 digits.
Credential index:
  description: The keypad PIN slot, from 1 to 250. If the slot already has a PIN, it is replaced.
Name:
  description: A label for the slot, such as the name of the person who uses the PIN. Home Assistant shows it when the PIN is used. Leave empty to keep the existing label.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `yalexs_ble.set_lock_credential`. For example, to set the PIN in slot 10 and name the slot "Dog walker":

{% example %}
action: |
  action: yalexs_ble.set_lock_credential
  target:
    entity_id: lock.front_door
  data:
    credential_type: pin
    credential_data: "482915"
    credential_index: 10
    name: "Dog walker"
{% endexample %}

Put the PIN in quotes, so a PIN that starts with `0` is kept exactly as you typed it.

### Options in YAML

{% options_yaml %}
credential_type:
  description: The type of credential. Only `pin` is supported.
  required: true
  type: string
  default: pin
credential_data:
  description: The PIN, 4 to 8 digits.
  required: true
  type: string
credential_index:
  description: The keypad PIN slot, from 1 to 250. If the slot already has a PIN, it is replaced.
  required: true
  type: integer
name:
  description: A label for the slot. Home Assistant shows it when the PIN is used. Omit this field to keep the existing label.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Good to know

- Only administrators can use this action.
- Each PIN can only be in one slot. If the PIN is already used in another slot, the action fails and the lock is not changed.
- Home Assistant stores slot names, not the lock. If you remove the integration and add it again, you need to set the names again.
- PINs you set from Home Assistant are not shown in the Yale app. The Yale app or a Yale Connect bridge can overwrite or remove them when it syncs with the lock. Manage your PINs in one place.
- The lock never returns a stored PIN. Keep a record of your PINs somewhere safe if you need them later.

{% include actions/stuck.md %}

{% include actions/related.md %}
