---
title: "Add an RFID token"
action: peblar.add_rfid_token
domain: peblar
description: "Adds a new RFID token to the Peblar charger's standalone authorization list."
related:
  - docs: /integrations/peblar/
    title: Peblar
  - action: peblar.list_rfid_tokens
  - action: peblar.remove_rfid_token
---

The **Add RFID token** action adds a new RFID token to the Peblar charger's standalone authorization list. Once added, the token can be used to authorize charging sessions on the charger without requiring a connection to an external backend.

{% include actions/try_it.md %}

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
