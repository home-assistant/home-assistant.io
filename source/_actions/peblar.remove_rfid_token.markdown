---
title: "Remove an RFID token"
action: peblar.remove_rfid_token
domain: peblar
description: "Removes an RFID token from the Peblar charger's standalone authorization list."
related:
  - docs: /integrations/peblar/
    title: Peblar
  - action: peblar.list_rfid_tokens
  - action: peblar.add_rfid_token
---

The **Remove RFID token** action deletes an RFID token from the Peblar charger's standalone authorization list. Once removed, that token can no longer be used to authorize charging sessions on the charger.

{% include actions/try_it.md %}

{% include actions/ui_header.md %}

To remove an RFID token from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. In the **Then do** section, select **Add action**.
4. From the search box, search for and select **Peblar: Remove RFID token**.
5. Under **Config entry**, select the Peblar charger to remove the token from.
6. Enter the **UID** of the RFID token to remove.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Peblar charger to remove the RFID token from.
  required: true
UID:
  description: The unique identifier of the RFID token to remove.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `peblar.remove_rfid_token`. A basic example looks like this:

{% example %}
action: |
  action: peblar.remove_rfid_token
  data:
    config_entry_id: "01234567890abcdef01234567890abcd"
    uid: "04A1B2C3D4E5F6"
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Peblar charger config entry to remove the RFID token from.
  required: true
  type: string
uid:
  description: >
    The unique identifier (UID) of the RFID token to remove.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/more_examples.md %}

### Automation: remove an RFID token when a person leaves

When a person is marked as away from home, automatically remove their RFID token from the charger.

{% details "YAML example for removing an RFID token when someone leaves" %}

{% example %}
automation: |
  triggers:
    - trigger: state
      entity_id: person.jane
      to: "not_home"
  actions:
    - action: peblar.remove_rfid_token
      data:
        config_entry_id: "01234567890abcdef01234567890abcd"
        uid: "04A1B2C3D4E5F6"
{% endexample %}

{% enddetails %}
