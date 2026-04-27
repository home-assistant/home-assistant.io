---
title: "List RFID tokens"
action: peblar.list_rfid_tokens
domain: peblar
description: "Returns all RFID tokens currently configured in the Peblar charger's standalone authorization list."
related:
  - docs: /integrations/peblar/
    title: Peblar
---

The **List RFID tokens** action retrieves all RFID tokens stored in the Peblar charger's standalone authorization list. The action returns the full list as response data, which you can use in an automation or script to inspect or filter the tokens configured on your charger.

{% include actions/try_it.md %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `peblar.list_rfid_tokens`. A basic example looks like this:

{% example %}
action: |
  action: peblar.list_rfid_tokens
  data:
    config_entry_id: "01234567890abcdef01234567890abcd"
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Peblar charger config entry to retrieve the RFID token list from.
  required: true
  type: string
{% endoptions_yaml %}
