---
title: "List RFID tokens"
action: peblar.list_rfid_tokens
domain: peblar
description: "Returns all RFID tokens currently configured in the Peblar charger's standalone authorization list."
related:
  - docs: /integrations/peblar/
    title: Peblar
  - action: peblar.add_rfid_token
  - action: peblar.delete_rfid_token
---

The **List RFID tokens** action retrieves all RFID tokens stored in the Peblar charger's standalone authorization list. The action returns the full list as response data, which you can use in an automation or script to inspect or react to the tokens configured on your charger.

{% note %}
This action is only available on Peblar chargers that are equipped with an
RFID reader. The standalone authorization list lives on that reader.
{% endnote %}

{% include actions/try_it.md %}

{% include actions/ui_header.md %}

To retrieve the RFID token list from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. In the **Then do** section, select **Add action**.
4. From the search box, search for and select **Peblar: List RFID tokens**.
5. Under **Peblar EV charger**, select the Peblar charger to retrieve the tokens from.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Peblar EV charger:
  description: The Peblar EV charger to list RFID tokens for.
  required: true
{% endoptions_ui %}

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

### Response data

The action returns an object with a single `tokens` member. Each token has a
`uid` and a `description`:

```yaml
tokens:
  - uid: "04A1B2C3D4E5F6"
    description: "My Card"
  - uid: "04F6E5D4C3B2A1"
    description: "Work Badge"
```

## Good to know

- Only administrators can run this action.
- Token UIDs identify a physical card or key fob, so treat them the way you would any other credential.

{% include actions/more_examples.md %}

### Automation: send a notification with the current RFID token list

Retrieve all configured tokens and send yourself a summary as a notification.

{% details "YAML example for notifying with the RFID token list" %}

{% example %}
automation: |
  triggers:
    - trigger: time
      at: "08:00:00"
  actions:
    - action: peblar.list_rfid_tokens
      data:
        config_entry_id: "01234567890abcdef01234567890abcd"
      response_variable: rfid_tokens
    - action: notify.mobile_app_your_phone
      data:
        title: "Peblar RFID tokens"
        message: >
          Currently authorized tokens:
          {{ rfid_tokens.tokens | map(attribute='description') | join(', ') }}
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
