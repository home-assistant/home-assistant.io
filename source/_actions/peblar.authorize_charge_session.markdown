---
title: "Authorize a charge session"
action: peblar.authorize_charge_session
domain: peblar
description: "Presents a token to the Peblar charger, as if it were held against the reader."
related:
  - docs: /integrations/peblar/
    title: Peblar
  - action: peblar.list_rfid_tokens
  - action: peblar.add_rfid_token
---

The **Authorize charge session** action presents a token to the Peblar charger, as if the card or key fob were held against the reader. Use it to let a charging session start without walking up to the charger.

{% important %}
This action toggles. A session that is waiting for authorization gets it, and a session that is already running is stopped. That is what holding a card against the reader does, and this action does the same thing.
{% endimportant %}

The token has to be in the charger's standalone authorization list. Use [List RFID tokens](/actions/peblar.list_rfid_tokens/) to see what is on it, and [Add RFID token](/actions/peblar.add_rfid_token/) to put something new there.

{% include actions/try_it.md %}

{% include actions/ui_header.md %}

To authorize a charge session from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. In the **Then do** section, select **Add action**.
4. From the search box, search for and select **Peblar: Authorize charge session**.
5. Under **Peblar EV charger**, select the Peblar charger to present the token to.
6. Enter either the **UID** of the token, or its **Description**. Fill in one of the two, not both.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Peblar EV charger:
  description: The Peblar EV charger to present the token to.
  required: true
UID:
  description: The unique identifier of the RFID token to present.
  required: false
Description:
  description: The label of the RFID token to present, instead of its UID.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `peblar.authorize_charge_session`. A basic example looks like this:

{% example %}
action: |
  action: peblar.authorize_charge_session
  data:
    config_entry_id: "01234567890abcdef01234567890abcd"
    uid: "04A1B2C3D4E5F6"
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Peblar charger config entry to present the token to.
  required: true
  type: string
uid:
  description: >
    The unique identifier (UID) of the RFID token to present. Provide either this or `description`. You must provide one of the two.
  required: false
  type: string
description:
  description: >
    The label of the RFID token to present, instead of its UID. Provide this or `uid`, not both.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- Only administrators can run this action.
- The charger accepts the request and acts on it a moment later, so watch the charger's state to see the result rather than the action itself.
- This action does not apply to every charger. A charger without an RFID reader has no standalone list to draw from, a charger managed over OCPP has its sessions authorized by that backoffice, and a charger set to charge without authorization has nothing to authorize.

{% include actions/more_examples.md %}

### Automation: authorize the charger when you arrive home

When you get home and a cable is plugged in, present your token so charging can start.

{% details "YAML example for authorizing on arrival" %}

{% example %}
automation: |
  triggers:
    - trigger: state
      entity_id: person.jane
      to: "home"
  conditions:
    - condition: state
      entity_id: sensor.peblar_ev_charger_cp_state
      state: "suspended"
  actions:
    - action: peblar.authorize_charge_session
      data:
        config_entry_id: "01234567890abcdef01234567890abcd"
        description: "Jane's key fob"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
