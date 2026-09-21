---
title: "List charge slots"
action: ohme.list_charge_slots
domain: ohme
description: "Returns a list of charge slots."
related_actions:
  - ohme.set_price_cap
---

The **List charge slots** action fetches the charge slots from the plan that Ohme generated for your charger. Charge slots are only returned while a charge is in progress.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To list charge slots from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Ohme: List charge slots**.
6. Select the **Ohme account** to use.
7. In the **Response variable** field, enter a name to store the result, for example `charge_slots`.
8. Select **Save**.

This action does not support targets. Instead, you select the account through the **Ohme account** field.

### Options in the UI

{% options_ui %}
Ohme account:
  description: The Ohme account to return charge slots for.
  required: true
Response variable:
  description: The name of the variable where the result will be stored. If not provided, the result won't be stored.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ohme.list_charge_slots`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: ohme.list_charge_slots
  data:
    config_entry: 1b4a46c6cba0677bbfb5a8c53e8618b0
  response_variable: charge_slots
{% endexample %}

This fetches the current charge slots for the account.

### Options in YAML

{% options_yaml %}
config_entry:
  description: >
    The Ohme account to return charge slots for.
  required: true
  type: string
response_variable:
  description: >
    The name of the variable where the result will be stored.
    If not provided, the result won't be stored.
  required: false
  type: string
{% endoptions_yaml %}

## Response data

The response contains a `slots` list. Each charge slot includes the following fields:

- `start`: The start date and time of the slot.
- `end`: The end date and time of the slot.
- `power`: The average power during the slot, in watts.
- `energy`: The energy delivered during the slot, in watt-hours.

A shortened example of the response looks like this:

```yaml
slots:
  - start: "2024-11-10T00:00:00"
    end: "2024-11-10T01:00:00"
    power: 7000
    energy: 7000
  - start: "2024-11-10T02:00:00"
    end: "2024-11-10T03:00:00"
    power: 7000
    energy: 7000
```

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: log tonight's charge slots when the car plugs in

Charge slots are only returned if a charge is in progress. This automation fires the moment the car is plugged in, fetches the planned charge slots, and sends them as a notification. With this automation you can confirm the charger has scheduled charging in the cheapest and lowest-carbon window without opening the app.

- **Trigger**: State (sensor `sensor.ohme_home_pro_status` changes from `unplugged`)
- **Action**: Ohme: List charge slots
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for sending notification with car charge slots" %}

{% example %}
automation: |
  alias: "Notify with tonight's charge slots when car plugs in"
  triggers:
    - trigger: state
      entity_id: sensor.ohme_home_pro_status
      from: unplugged
  actions:
    - action: ohme.list_charge_slots
      data:
        config_entry: your_config_entry_id
      response_variable: slots
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Ohme charge slots tonight"
        message: "{{ slots }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
