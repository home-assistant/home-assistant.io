---
title: "Add an autocharge vehicle"
action: peblar.add_vehicle_token
domain: peblar
description: "Adds a vehicle to the Peblar charger's autocharge list."
related:
  - docs: /integrations/peblar/
    title: Peblar
  - action: peblar.list_vehicle_tokens
  - action: peblar.delete_vehicle_token
---

The **Add autocharge vehicle** action adds a vehicle to the Peblar charger's autocharge list. Once added, that car authorizes itself as soon as it is plugged in: the charger recognizes the identifier the car's own controller presents, so no card or app is needed.

{% note %}
Autocharge is only available on Peblar chargers that are equipped with power line communication hardware.
{% endnote %}

{% include actions/try_it.md %}

{% include actions/ui_header.md %}

To add a vehicle from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. In the **Then do** section, select **Add action**.
4. From the search box, search for and select **Peblar: Add autocharge vehicle**.
5. Under **Peblar EV charger**, select the Peblar charger to add the vehicle to.
6. Enter the **EVCC ID** of the vehicle.
7. Enter an **Alias** to identify the vehicle, for example, the name of the car.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Peblar EV charger:
  description: The Peblar EV charger to add the vehicle to.
  required: true
EVCC ID:
  description: The identifier the vehicle presents to the charger.
  required: true
Alias:
  description: A human-readable label for this vehicle.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `peblar.add_vehicle_token`. A basic example looks like this:

{% example %}
action: |
  action: peblar.add_vehicle_token
  data:
    config_entry_id: "01234567890abcdef01234567890abcd"
    evcc_id: "NL-ABC-0123456789-1"
    alias: "The blue one"
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Peblar charger config entry to add the vehicle to.
  required: true
  type: string
evcc_id:
  description: >
    The identifier the vehicle presents to the charger over the power line.
  required: true
  type: string
alias:
  description: >
    A human-readable label for this vehicle, for example, the name of the car.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Only administrators can run this action.
- To find a vehicle's identifier, plug the car in and look it up in the charger's local web interface, which shows the last vehicle it saw.
- A vehicle is added as authorized, so it can charge straight away.

{% include actions/more_examples.md %}

### Automation: add a vehicle when an input text is updated

When you update an input text helper with an identifier and a name, automatically add that vehicle to the charger.

{% details "YAML example for adding a vehicle from an input text" %}

{% example %}
automation: |
  triggers:
    - trigger: state
      entity_id: input_text.new_vehicle_evcc_id
  actions:
    - action: peblar.add_vehicle_token
      data:
        config_entry_id: "01234567890abcdef01234567890abcd"
        evcc_id: "{{ states('input_text.new_vehicle_evcc_id') }}"
        alias: "{{ states('input_text.new_vehicle_alias') }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
