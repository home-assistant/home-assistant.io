---
title: "List autocharge vehicles"
action: peblar.list_vehicle_tokens
domain: peblar
description: "Returns the vehicles configured in the Peblar charger's autocharge list."
related:
  - docs: /integrations/peblar/
    title: Peblar
  - action: peblar.add_vehicle_token
  - action: peblar.delete_vehicle_token
---

The **List autocharge vehicles** action retrieves the vehicles stored in the Peblar charger's autocharge list. The action returns the list as response data, which you can use in an automation or script to inspect which cars are allowed to charge.

Autocharge lets a car authorize itself. The charger recognizes the identifier the car's own controller presents when it is plugged in, so no card or app is needed.

{% note %}
Autocharge is only available on Peblar chargers that are equipped with power line communication hardware.
{% endnote %}

{% include actions/try_it.md %}

{% include actions/ui_header.md %}

To retrieve the autocharge list from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. In the **Then do** section, select **Add action**.
4. From the search box, search for and select **Peblar: List autocharge vehicles**.
5. Under **Peblar EV charger**, select the Peblar charger to retrieve the vehicles from.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Peblar EV charger:
  description: The Peblar EV charger to list autocharge vehicles for.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `peblar.list_vehicle_tokens`. A basic example looks like this:

{% example %}
action: |
  action: peblar.list_vehicle_tokens
  data:
    config_entry_id: "01234567890abcdef01234567890abcd"
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Peblar charger config entry to list autocharge vehicles for.
  required: true
  type: string
{% endoptions_yaml %}

### Response data

The action returns an object with a single `vehicles` member. Each vehicle has
an `evcc_id` and an `alias`:

```yaml
vehicles:
  - evcc_id: "NL-ABC-0123456789-1"
    alias: "The blue one"
  - evcc_id: "NL-ABC-9876543210-2"
    alias: "The other one"
```

## Good to know

- Only administrators can run this action.
- An identifier belongs to a specific car, so treat it the way you would any other credential.

{% include actions/more_examples.md %}

### Automation: send a notification with the current autocharge list

Retrieve the configured vehicles and send yourself a summary as a notification.

{% details "YAML example for notifying with the autocharge list" %}

{% example %}
automation: |
  triggers:
    - trigger: time
      at: "08:00:00"
  actions:
    - action: peblar.list_vehicle_tokens
      data:
        config_entry_id: "01234567890abcdef01234567890abcd"
      response_variable: vehicles
    - action: notify.mobile_app_your_phone
      data:
        title: "Peblar autocharge vehicles"
        message: >
          Currently allowed to charge:
          {{ vehicles.vehicles | map(attribute='alias') | join(', ') }}
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
