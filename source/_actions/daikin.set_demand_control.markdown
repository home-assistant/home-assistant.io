---
title: "Set Daikin Unit demand control"
action: daikin.set_demand_control
domain: daikin
since: "2026.9.0"
description: "Sets the parameters of daikin demand control mode"
---

Use this action to limit the maximum power of the unit to a percentage of its nominal power, for example to reduce power consumption during peak electricity price periods. It is only available on units that support demand control.

{% include actions/ui_header.md %}

To set a demand control from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Daikin {% term device %} you want to target.
6. From the actions shown for that target, select **Set demand control**.
7. Set the **Demand control** parameters you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Daikin {% term device %} to limit
  required: true
Enable:
  description: Whether demand control should be enabled.
  required: true
Maximum power:
  description: Maximum power as a percentage of the unit's nominal power (40-100). Not required when disabling the demand control.
  required: true
Mode:
  description: "Demand control mode: `Manual`, `Scheduled`, `Auto`. Defaults to `Manual`."
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
  description: Maximum power as a percentage of the unit's nominal power (40-100). Not required when disabling the demand control.
  type: integer
  required: true
mode:
  description: "Demand control mode: `manual`, `scheduled`, `auto`. Defaults to `manual`."
  type: string
  required: false

{% endoptions_yaml %}

## Good to know

- this action works with Daikin climate device
- if multiple indoor units are connected to an outdoor unit, the outdoor unit automatically selects the least restrictive demand setting. For example, if one indoor unit is set to an 80% capacity limit and the other to a 50% capacity limit, the outdoor unit will operate at a maximum capacity of 80%.
- `max_pow` is only applied in manual mode (`mode: manual`).
- `mode: scheduled` applies the previously configured schedule and requires a schedule to have been set first (for example with the ONECTA app or the WLAN API).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Limit the maximum power of the unit during peak/high-rate electricity periods

- **Trigger**: State: High rate signal from energy supplier 
- **Action**: Set demand control
  - **Device**: The unit
  - **Enable**: the desired state of demand control management
  - **Max power**: the desired maximum power

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
            state:
            - 'on'
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

{% include actions/stuck.md %}

{% include actions/related.md %}