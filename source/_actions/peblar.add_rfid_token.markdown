---
title: "Add an RFID token"
action: peblar.add_rfid_token
domain: peblar
description: "Adds a new RFID token to the Peblar charger's standalone authorization list."
related:
  - docs: /integrations/peblar/
    title: Peblar
  - action: peblar.list_rfid_tokens
  - action: peblar.delete_rfid_token
---

The **Add RFID token** action adds a new RFID token to the Peblar charger's standalone authorization list. Once added, the token can be used to authorize charging sessions on the charger without requiring a connection to an external backend.

{% note %}
This action is only available on Peblar chargers that are equipped with an
RFID reader. The standalone authorization list lives on that reader.
{% endnote %}

{% include actions/try_it.md %}

{% include actions/ui_header.md %}

To add an RFID token from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. In the **Then do** section, select **Add action**.
4. From the search box, search for and select **Peblar: Add RFID token**.
5. Under **Peblar EV charger**, select the Peblar charger to add the token to.
6. Enter the **UID** of the RFID token. This is typically printed on the card or key fob.
7. Enter a **Description** to identify the token, for example, the name of the person it belongs to.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Peblar EV charger:
  description: The Peblar charger to add the RFID token to.
  required: true
UID:
  description: The unique identifier of the RFID token to add. This is typically printed on the card or key fob.
  required: true
Description:
  description: A human-readable label for this RFID token, for example, the name of the person it belongs to.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `peblar.add_rfid_token`. A basic example looks like this:

{% example %}
action: |
  action: peblar.add_rfid_token
  data:
    config_entry_id: "01234567890abcdef01234567890abcd"
    uid: "04A1B2C3D4E5F6"
    description: "Jane's key fob"
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Peblar charger config entry to add the RFID token to.
  required: true
  type: string
uid:
  description: >
    The unique identifier (UID) of the RFID token to add. This is typically printed on the card or key fob.
  required: true
  type: string
description:
  description: >
    A human-readable label for this RFID token, for example, the name of the person it belongs to.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/more_examples.md %}

### Automation: add a new RFID token when an input text is updated

When you update an input text helper with a new token UID and description, automatically add it to the charger.

{% details "YAML example for adding an RFID token from an input text" %}

{% example %}
automation: |
  triggers:
    - trigger: state
      entity_id: input_text.new_rfid_uid
  actions:
    - action: peblar.add_rfid_token
      data:
        config_entry_id: "01234567890abcdef01234567890abcd"
        uid: "{{ states('input_text.new_rfid_uid') }}"
        description: "{{ states('input_text.new_rfid_description') }}"
{% endexample %}

{% enddetails %}
