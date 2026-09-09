---
title: "Set feed-in limit"
action: sofar.set_feed_in_limit
domain: sofar
description: "Limits how much power the inverter exports to the grid."
related_actions:
  - sofar.set_active_power_limit
  - sofar.set_passive_mode_timeout
  - sofar.set_passive_mode_power
---

Use this action to cap how much power your Sofar inverter feeds back into the grid. This is different from [Set active power limit](/actions/sofar.set_active_power_limit/), which caps the inverter's own generation directly: the feed-in limit only throttles export, and leaves the inverter free to generate more for local use.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To set the feed-in limit from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Sofar: Set feed-in limit**.
6. Select the **Inverter**, whether it limits the **Mode** (total export or per phase), and the **Maximum power**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Inverter:
  description: The Sofar inverter to send this to.
  required: true
Mode:
  description: Whether to limit the total exported power, or per phase.
  required: true
Maximum power:
  description: The export ceiling, in watts.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sofar.set_feed_in_limit`. A basic example looks like this:

{% example %}
action: |
  action: sofar.set_feed_in_limit
  data:
    config_entry_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
    mode: enabled_feed_in_limitation
    max_power: 3000
{% endexample %}

This limits total grid export to 3000 W.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The Sofar inverter to send this to.
  required: true
  type: string
mode:
  description: >
    Whether to limit the total exported power (`enabled_feed_in_limitation`),
    per phase (`enabled_3_phase_limit`), or to turn the limit off (`disabled`).
  required: true
  type: string
max_power:
  description: >
    The export ceiling, in watts.
  required: true
  type: integer
{% endoptions_yaml %}

## Good to know

- The inverter only accepts **Maximum power** in multiples of 100 W.
- If the config entry you select doesn't serve the feed-in registers, the action fails with an error instead of doing nothing silently.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: cap grid export during a utility export limit

Some grid connections cap how much a household may export. This automation lowers the feed-in limit at sunrise and raises it again at sunset, so exports stay compliant during daylight generation hours.

- **Trigger**: Sun, sunrise
- **Action**: Sofar: Set feed-in limit

{% details "YAML example for a daytime export cap" %}

{% example %}
automation: |
  alias: "Cap Sofar feed-in during the day"
  triggers:
    - trigger: sun
      event: sunrise
  actions:
    - action: sofar.set_feed_in_limit
      data:
        config_entry_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
        mode: enabled_feed_in_limitation
        max_power: 5000
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
