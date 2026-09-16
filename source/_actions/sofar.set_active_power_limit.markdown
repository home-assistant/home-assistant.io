---
title: "Set active power limit"
action: sofar.set_active_power_limit
domain: sofar
description: "Caps the inverter's own output as a percentage of its rated power."
related_actions:
  - sofar.set_feed_in_limit
  - sofar.set_passive_mode_timeout
  - sofar.set_passive_mode_power
---

Use this action to cap the inverter's own generation, as a percentage of its rated power. Unlike [Set feed-in limit](/actions/sofar.set_feed_in_limit/), which only throttles what reaches the grid, this caps generation directly, without depending on the inverter's own sense of grid flow.

The rated power is the figure on the inverter's nameplate, which is usually also part of its model name: a 4.4 KTLX-G3 is rated 4.4 kW, so a limit of 50% caps it at 2.2 kW. The integration doesn't currently read the rating from the inverter itself.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To set the active power limit from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Sofar: Set active power limit**.
6. Select the **Inverter**, whether the limit is **Enabled**, and the **Limit** percentage.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Inverter:
  description: The Sofar inverter to send this to.
  required: true
Enabled:
  description: Whether the inverter applies the limit. Turning this off leaves the last limit in place, unused.
  required: true
Limit:
  description: The output ceiling, as a percentage of rated power.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sofar.set_active_power_limit`. A basic example looks like this:

{% example %}
action: |
  action: sofar.set_active_power_limit
  data:
    config_entry_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
    enabled: true
    limit: 50
{% endexample %}

This caps the inverter's own output at 50% of its rated power.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The Sofar inverter to send this to.
  required: true
  type: string
enabled:
  description: >
    Whether the inverter applies the limit. Turning this off leaves the
    last limit in place, unused.
  required: true
  type: boolean
limit:
  description: >
    The output ceiling, as a percentage of rated power.
  required: true
  type: float
{% endoptions_yaml %}

## Good to know

- If the config entry you select doesn't serve the active power control registers, the action fails with an error instead of doing nothing silently.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: curtail generation when a helper is turned on

Some grid operators or tariffs ask for generation to be curtailed at short notice. This automation reacts to an `input_boolean` helper you toggle (by hand, or from another automation) by capping the inverter to 20% of rated power, and lifts the cap again when the helper turns off.

- **Trigger**: State, `input_boolean.curtail_solar`, turns on
- **Action**: Sofar: Set active power limit

{% details "YAML example for reacting to a curtailment helper" %}

{% example %}
automation: |
  alias: "Curtail Sofar generation"
  triggers:
    - trigger: state
      entity_id: input_boolean.curtail_solar
      to: "on"
  actions:
    - action: sofar.set_active_power_limit
      data:
        config_entry_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
        enabled: true
        limit: 20
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
