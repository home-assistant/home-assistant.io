---
title: "Set demand control"
action: daikin.set_demand_control
domain: daikin
since: "2026.10.0"
description: "Sets the parameters of Daikin demand control mode"
---

Use this action to limit the maximum power of the unit to a percentage of its nominal power, for example to reduce power consumption during peak electricity price periods. It is only available on units that support demand control.

{% include actions/ui_header.md %}

To set a demand control from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Under **By type**, select the **Set demand control** {% term action %}.
6. Set the **Demand control** parameters you want to apply.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Daikin {% term device %} to limit
  required: true
Enable:
  description: Whether demand control should be enabled.
  required: true
Maximum power:
  description: Maximum power as a percentage of the unit's nominal power, from 40 to 100. Defaults to 100.
  required: false
Mode:
  description: "Demand control mode: `Manual`, `Auto`. Defaults to `Manual`. In `Auto` mode, the unit manages the limit and Maximum power is not applied"
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `daikin.set_demand_control`. A basic example looks like this:

{% example %}
action: |
  action: daikin.set_demand_control
  data:
    device_id: 17159993ce512ff1794b6c1abc6f3df3
    en_demand: true
    max_pow: 40
{% endexample %}

This sets the {% term device %} `17159993ce512ff1794b6c1abc6f3df3` demand control to 40% of the nominal power.

### Options in YAML

{% options_yaml %}
device_id:
  description: The Daikin {% term device %} to limit
  required: true
  type: string
en_demand:
  description: Whether demand control should be enabled.
  required: true
  type: boolean
max_pow:
  description: Maximum power as a percentage of the unit's nominal power, from 40 to 100. Defaults to 100.
  type: integer
  required: false
mode:
  description: "Demand control mode: `manual`, `auto`. Defaults to `manual`. In `auto` mode, the unit manages the limit and `max_pow` is not applied"
  type: string
  required: false

{% endoptions_yaml %}

## Good to know

- This action works with Daikin climate devices.
- If multiple indoor units are connected to an outdoor unit, the outdoor unit automatically selects the least restrictive demand setting. For example, if one indoor unit is set to an 80% capacity limit and the other to a 50% capacity limit, the outdoor unit will operate at a maximum capacity of 80%.
- `max_pow` is only applied in manual mode (`mode: manual`).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Limit the maximum power of the unit during peak/high-rate electricity periods

- **Trigger**: State: High rate signal from energy supplier 
- **Action**: Set demand control
  - **Device**: The unit {% term device %}
  - **Enable**: True if the High rate signal is true, False otherwise
  - **Maximum power**: 40% if the high rate signal is true, not provided otherwise

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Limit maximum AC power during high-rate periods"
    triggers:
      - trigger: state
        entity_id: binary_sensor.electricity_high_rate
        to:
          - "on"
          - "off"
    actions:
      - if:
          - condition: state
            entity_id: binary_sensor.electricity_high_rate
            state: "on"
        then:
          - action: daikin.set_demand_control
            data:
              device_id: "17159993ce512ff1794b6c1abc6f3df3"
              en_demand: true
              max_pow: 40
        else:
          - action: daikin.set_demand_control
            data:
              device_id: "17159993ce512ff1794b6c1abc6f3df3"
              en_demand: false
{% endexample %}

{% enddetails %}

### Automation: Limit the maximum power of the unit during the night

- **Trigger**: State: Sun
- **Action**: Set demand control
  - **Device**: The unit {% term device %}
  - **Enable**: True if the sun is below the horizon (night), False otherwise
  - **Maximum power**: 60% if the sun is below the horizon is true, not provided otherwise

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Limit the maximum power of the unit during the night"
    triggers:
      - trigger: state
        entity_id: sun.sun
        to:
          - "below_horizon"
          - "above_horizon"
    actions:
      - if:
          - condition: state
            entity_id: sun.sun
            state: "below_horizon"
        then:
          - action: daikin.set_demand_control
            data:
              device_id: "17159993ce512ff1794b6c1abc6f3df3"
              en_demand: true
              max_pow: 60
        else:
          - action: daikin.set_demand_control
            data:
              device_id: "17159993ce512ff1794b6c1abc6f3df3"
              en_demand: false
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
