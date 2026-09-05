---
title: "Set credential enabled"
action: iseo_argo_ble.set_credential_enabled
domain: iseo_argo_ble
description: "Lets a credential enrolled on your ISEO lock open the door, or stops it doing so."
since: "2026.10"
related_actions:
  - iseo_argo_ble.delete_credential
---

The **Set credential enabled** action suspends or restores one of the credentials enrolled on your ISEO Argo lock: a card, a PIN, a phone, or a fingerprint. A suspended credential stays on the lock, it just stops opening the door, so you can hand it back later without enrolling it again.

This is useful when someone loses their card, when a guest's stay ends, or when you want a cleaner's fob to work only on certain days.

Only Home Assistant administrators can run this action, because it changes who can get into your home. Everyone else can still see each credential's state on its sensor.

{% include actions/ui_header.md %}

To suspend or restore a credential from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **ISEO Argo BLE: Set credential enabled**.
6. Select what you want to control. Under **By target**, select the credential you want to change.
7. Turn **Enabled** on to let the credential open the lock, or off to suspend it.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The credential, or credentials, you want to change.
  required: true
Enabled:
  description: Whether the credential may open the lock. Turn it off to suspend the credential, and on to restore it.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `iseo_argo_ble.set_credential_enabled`. A basic example looks like this:

{% example %}
action: |
  action: iseo_argo_ble.set_credential_enabled
  target:
    entity_id: binary_sensor.front_door_alice_card
  data:
    enabled: false
{% endexample %}

This suspends Alice's card. Her card stays enrolled on the lock, but it no longer opens the door.

### Options in YAML

{% options_yaml %}
entity_id:
  description: >
    The entity ID, or list of entity IDs, of the credentials you want to
    change.
  required: true
  type: string
enabled:
  description: >
    Whether the credential may open the lock. Set it to false to suspend the
    credential, and true to restore it.
  required: true
  type: boolean
{% endoptions_yaml %}

## Good to know

- Changing a credential connects to the lock over Bluetooth. Close the Argo app on all phones first, because the lock only accepts one connection at a time.
- If the lock is out of Bluetooth range, the action reports an error and nothing changes on the lock.
- Suspending a credential does not remove it. To remove one for good, use the [**Delete credential**](/actions/iseo_argo_ble.delete_credential/) action instead.
- A credential that is only valid for a period — an invitation, or a guest card with an end date — keeps that period when you restore it. Home Assistant remembers the window it read from the lock and puts it back.
- A credential that was already suspended before Home Assistant first read the lock cannot be restored from here, because its original period is no longer on the lock to read. Restore it in the Argo app, which set it that way.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Suspend a lost card straight away

When you mark a card as lost with a toggle helper you created yourself, the card stops opening the door.

- **Trigger**: State of the **Card lost** toggle changes to **On**
- **Action**: ISEO Argo BLE: Set credential enabled
  - **Target**: Alice's card (`binary_sensor.front_door_alice_card`)
  - **Enabled**: off

{% example %}
automation: |
  alias: "Suspend the lost card"
  triggers:
    - trigger: state
      entity_id: input_boolean.card_lost
      to: "on"
  actions:
    - action: iseo_argo_ble.set_credential_enabled
      target:
        entity_id: binary_sensor.front_door_alice_card
      data:
        enabled: false
{% endexample %}

The **Card lost** toggle is an `input_boolean` {% term helper %} you have to create yourself, under **Settings** > **Devices & services** > **Helpers**.

### Automation: Let the cleaner in only on Tuesday mornings

The cleaner's fob works during the cleaning slot and is suspended again afterwards.

- **Trigger**: Time
  - **At**: 09:00:00
- **Condition**: Day of the week is Tuesday
- **Action**: ISEO Argo BLE: Set credential enabled
  - **Target**: Cleaner fob (`binary_sensor.front_door_cleaner_card`)
  - **Enabled**: on

{% example %}
automation: |
  alias: "Enable the cleaner fob on Tuesday morning"
  triggers:
    - trigger: time
      at: "09:00:00"
  conditions:
    - condition: time
      weekday:
        - tue
  actions:
    - action: iseo_argo_ble.set_credential_enabled
      target:
        entity_id: binary_sensor.front_door_cleaner_card
      data:
        enabled: true
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
