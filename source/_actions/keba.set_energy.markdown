---
title: "Set energy"
action: keba.set_energy
domain: keba
description: "Sets the target energy for the current charging session on a Keba charging station."
related_actions:
  - keba.set_current
---

Use this action to set the target energy for the current charging session on a Keba charging station, in kilowatt-hours. Once the session reaches this amount, the charging station stops charging. This is useful when you want to add a fixed amount of energy to a car rather than charging it fully.

{% include actions/ui_header.md %}

To set the target energy from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Keba Charging Station: Set energy**.
6. Enter the **Energy** in kilowatt-hours.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Energy:
  description: The target energy for the current charging session in kilowatt-hours. Allowed values are between 0 kWh and 100 kWh. A value of 0 disables the energy limit.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `keba.set_energy`. A basic example looks like this:

{% example %}
action: |
  action: keba.set_energy
  data:
    energy: 10
{% endexample %}

### Options in YAML

{% options_yaml %}
energy:
  description: >
    The target energy for the current charging session in kilowatt-hours.
    Allowed values are between 0 kWh and 100 kWh. A value of 0 disables the
    energy limit.
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: add a fixed amount of energy when plugged in

Top up the car with a set amount of energy whenever it is plugged in.

- **Trigger**: State, the plug sensor changes to plugged in
- **Action**: Keba Charging Station: Set energy

{% details "YAML example for adding a fixed amount of energy" %}

{% example %}
automation: |
  alias: "Add fixed energy when plugged in"
  triggers:
    - trigger: state
      entity_id: binary_sensor.keba_charging_station_plug
      to: "on"
  actions:
    - action: keba.set_energy
      data:
        energy: 15
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
