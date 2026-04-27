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
