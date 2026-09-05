---
title: "Delete credential"
action: iseo_argo_ble.delete_credential
domain: iseo_argo_ble
description: "Removes a credential from your ISEO lock for good."
since: "2026.10"
related_actions:
  - iseo_argo_ble.set_credential_enabled
---

The **Delete credential** action removes one of the credentials enrolled on your ISEO Argo lock — a card, a PIN, a phone, or a fingerprint — and frees the space it used.

Use it when a credential is gone for good: a lost card you do not expect to find, a tenant who has moved out, or a phone that is no longer in the household.

There is no undo. Home Assistant cannot enrol a credential, so whoever held it has to be enrolled again on the lock with your Master Card. If you only want to stop a credential working for a while, use [**Set credential enabled**](/actions/iseo_argo_ble.set_credential_enabled/) instead, which leaves it on the lock.

Only Home Assistant administrators can run this action.

{% include actions/ui_header.md %}

To delete a credential from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **ISEO Argo BLE: Delete credential**.
6. Select what you want to control. Under **By target**, select the credential you want to remove.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The credential, or credentials, you want to remove from the lock.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `iseo_argo_ble.delete_credential`. A basic example looks like this:

{% example %}
action: |
  action: iseo_argo_ble.delete_credential
  target:
    entity_id: binary_sensor.front_door_alice_card
{% endexample %}

This removes Alice's card from the lock. The card no longer opens the door, and its sensor disappears from Home Assistant.

### Options in YAML

{% options_yaml %}
entity_id:
  description: >
    The entity ID, or list of entity IDs, of the credentials you want to
    remove from the lock.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The credential's sensor is removed from Home Assistant once the lock confirms the deletion, because neither the credential nor the sensor comes back on its own.
- The two identities Home Assistant enrolled for itself have no sensors, so this action cannot remove Home Assistant's own access to the lock.
- Deleting connects to the lock over Bluetooth. Close the Argo app on all phones first, because the lock only accepts one connection at a time.
- If the lock is out of Bluetooth range, the action reports an error and nothing is removed.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Clear a guest's card when their stay ends

At checkout time, the guest card is removed from the lock rather than left enrolled.

- **Trigger**: Time
  - **At**: 11:00:00
- **Action**: ISEO Argo BLE: Delete credential
  - **Target**: Guest card (`binary_sensor.front_door_guest_card`)

{% example %}
automation: |
  alias: "Clear the guest card at checkout"
  triggers:
    - trigger: time
      at: "11:00:00"
  actions:
    - action: iseo_argo_ble.delete_credential
      target:
        entity_id: binary_sensor.front_door_guest_card
{% endexample %}

### Automation: Remove a card reported lost for a week

A card that has been suspended for a week is unlikely to turn up, so it is removed to free the space.

- **Trigger**: State of **Alice's card** is **Off** for 7 days
- **Action**: ISEO Argo BLE: Delete credential
  - **Target**: Alice's card (`binary_sensor.front_door_alice_card`)

{% example %}
automation: |
  alias: "Remove the long-suspended card"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door_alice_card
      to: "off"
      for: "168:00:00"
  actions:
    - action: iseo_argo_ble.delete_credential
      target:
        entity_id: binary_sensor.front_door_alice_card
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
