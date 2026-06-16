---
title: "Discharge"
action: indevolt.discharge
domain: indevolt
description: "Starts discharging an Indevolt battery until the target state of charge is reached."
related_actions:
  - indevolt.charge
---

Use this action to start discharging one or more Indevolt batteries with a set maximum power until the target state of charge is reached. Each device switches to real-time control mode if needed.

{% include actions/ui_header.md %}

To start discharging from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Indevolt: Discharge**.
6. Select the Indevolt devices in the **Device(s)** field, then set the **Target SOC** and **Max. power**.
7. Select **Save**.

This action does not support targets. In the UI, you select the Indevolt devices through the **Device(s)** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Device(s):
  description: The Indevolt devices to start discharging.
  required: true
Target SOC:
  description: The target state of charge, as a percentage. Discharging stops when it is reached.
  required: true
Max. power:
  description: The maximum discharging power, in watts.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `indevolt.discharge`. A basic example looks like this:

{% example %}
action: |
  action: indevolt.discharge
  data:
    device_id: a1b2c3d4e5f6
    target_soc: 10
    power: 800
{% endexample %}

This discharges the battery at up to 800 watts until it reaches 10%.

### Options in YAML

{% options_yaml %}
device_id:
  description: The Indevolt devices to start discharging.
  required: true
  type: [string, list]
target_soc:
  description: >
    The target state of charge, as a percentage from 0 to 100. Discharging
    stops when it is reached.
  required: true
  type: integer
power:
  description: The maximum discharging power, in watts, from 0 to 2400.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
