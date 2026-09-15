---
title: "Delete an autocharge vehicle"
action: peblar.delete_vehicle_token
domain: peblar
description: "Deletes a vehicle from the Peblar charger's autocharge list."
related:
  - docs: /integrations/peblar/
    title: Peblar
  - action: peblar.list_vehicle_tokens
  - action: peblar.add_vehicle_token
---

The **Delete autocharge vehicle** action removes a vehicle from the Peblar charger's autocharge list. Once removed, that car no longer authorizes itself when it is plugged in.

{% note %}
Autocharge is only available on Peblar chargers that are equipped with power line communication hardware.
{% endnote %}

{% include actions/try_it.md %}

{% include actions/ui_header.md %}

To delete a vehicle from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. In the **Then do** section, select **Add action**.
4. From the search box, search for and select **Peblar: Delete autocharge vehicle**.
5. Under **Peblar EV charger**, select the Peblar charger to delete the vehicle from.
6. Enter the **EVCC ID** of the vehicle to delete.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Peblar EV charger:
  description: The Peblar EV charger to delete the vehicle from.
  required: true
EVCC ID:
  description: The identifier of the vehicle to delete.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `peblar.delete_vehicle_token`. A basic example looks like this:

{% example %}
action: |
  action: peblar.delete_vehicle_token
  data:
    config_entry_id: "01234567890abcdef01234567890abcd"
    evcc_id: "NL-ABC-0123456789-1"
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Peblar charger config entry to delete the vehicle from.
  required: true
  type: string
evcc_id:
  description: >
    The identifier of the vehicle to delete.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Only administrators can run this action.
- Deleting a vehicle is permanent. To restore autocharge for that car, add it again.
- Use [List autocharge vehicles](/actions/peblar.list_vehicle_tokens/) to look up the identifier of a vehicle you want to remove.

{% include actions/more_examples.md %}

### Automation: revoke autocharge when guest mode ends

When you turn off guest mode, remove the guest's car from the autocharge list.

{% details "YAML example for revoking autocharge for a guest vehicle" %}

{% example %}
automation: |
  triggers:
    - trigger: state
      entity_id: input_boolean.guest_mode
      to: "off"
  actions:
    - action: peblar.delete_vehicle_token
      data:
        config_entry_id: "01234567890abcdef01234567890abcd"
        evcc_id: "NL-ABC-0123456789-1"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
