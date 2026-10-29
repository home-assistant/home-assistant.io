---
title: "Set device time"
action: neopool.set_device_time
domain: neopool
description: "Writes the current Home Assistant time to the controller's real-time clock."
related_actions:
  - neopool.get_device_time
---

Use this action to write the current Home Assistant time to the controller's real-time clock. Use it to correct a controller whose clock has drifted.

This action requires a Home Assistant administrator account.

{% include actions/ui_header.md %}

To set the device time from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **NeoPool: Set device time**.
6. Optionally select the **Device** to update. With a single controller, you can leave it empty.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The NeoPool controller to update. Optional when only one controller is configured.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `neopool.set_device_time`. A basic example looks like this:

{% example %}
action: |
  action: neopool.set_device_time
  data:
    device_id: abc123device456
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The NeoPool controller to update. Optional when only one controller is configured.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- Each write wears the controller's memory, which has a limited number of write cycles. Only set the time when the clock has actually drifted, rather than on a fixed schedule.
- To decide when to correct the clock, use the [Get device time](/actions/neopool.get_device_time/) action to read the drift first and only set the time when it exceeds a threshold you choose.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Keep the controller clock in sync

The controller's real-time clock can drift over time. Instead of a fixed daily overwrite, this automation checks the drift once an hour and only corrects the clock when it exceeds a threshold you choose. This also avoids unnecessary writes to the controller's memory.

{% details "YAML example for keeping the clock in sync" %}

{% example %}
automation: |
  alias: "NeoPool - keep the controller clock in sync"
  triggers:
    - trigger: time_pattern
      hours: "/1"
  actions:
    - action: neopool.get_device_time
      data:
        device_id: abc123device456
      response_variable: pool_time
    - if:
        - condition: template
          value_template: "{{ pool_time.drift_seconds | abs > 120 }}"
      then:
        - action: neopool.set_device_time
          data:
            device_id: abc123device456
{% endexample %}

{% enddetails %}

Replace `abc123device456` with the device ID of your controller. If you only have one NeoPool controller, you can leave the `device_id` out of both actions. Raise or lower the `120` in the template to change how much drift you tolerate before the clock is corrected.

{% include actions/stuck.md %}

{% include actions/related.md %}
