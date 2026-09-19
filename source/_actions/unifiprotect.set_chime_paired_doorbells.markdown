---
title: Set chime paired doorbells
action: unifiprotect.set_chime_paired_doorbells
domain: unifiprotect
description: "Pairs one or more doorbells with a UniFi Protect smart chime."
---

With this action, you can choose which doorbells ring a UniFi Protect smart chime. Select the chime, then select the doorbells you want to pair with it.

The list of doorbells replaces whatever was paired before. If you leave the doorbells empty, all doorbells are unpaired from the chime.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **UniFi Protect: Set chime paired doorbells**.
6. In the **Chime** field, select the chime device.
7. In the **Doorbells** field, select the doorbells to pair with the chime. Leave it empty to unpair all doorbells.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Chime:
  description: The chime device to pair or unpair doorbells with.
Doorbells:
  description: The doorbells to pair with the chime. Leave empty to unpair all doorbells from the chime.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `unifiprotect.set_chime_paired_doorbells`. A basic example looks like this:

{% example %}
action: |
  action: unifiprotect.set_chime_paired_doorbells
  data:
    device_id: 1234567890abcdef1234567890abcdef
    doorbells:
      entity_id: binary_sensor.front_doorbell_doorbell
{% endexample %}

This pairs the front doorbell with the selected chime.

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of the chime device to pair or unpair doorbells with.
  required: true
  type: string
doorbells:
  description: >
    A target that selects the doorbells to pair with the chime. You can pass `entity_id`, `device_id`, or `area_id`. Leave it out to unpair all doorbells.
  required: false
  type: map
{% endoptions_yaml %}

## Good to know

- The doorbells you select replace the current pairing. Doorbells you leave out are unpaired.
- Leaving the doorbells empty unpairs every doorbell from the chime.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: silence a chime at night

Unpair all doorbells from a bedroom chime at night, then pair them again in the morning.

- **Trigger**: A scheduled time
- **Action**: UniFi Protect: Set chime paired doorbells

{% details "YAML example for unpairing a chime at night" %}

{% example %}
automation: |
  alias: "Unpair the bedroom chime at night"
  triggers:
    - trigger: time
      at: "22:00:00"
  actions:
    - action: unifiprotect.set_chime_paired_doorbells
      data:
        device_id: 1234567890abcdef1234567890abcdef
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
