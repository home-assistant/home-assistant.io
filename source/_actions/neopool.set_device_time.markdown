---
title: "Set device time"
action: neopool.set_device_time
domain: neopool
description: "Writes the current Home Assistant time to the controller's real-time clock."
related_actions:
  - neopool.get_device_time
  - neopool.set_timer
  - neopool.read_register
  - neopool.write_register
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

- To decide when to correct the clock instead of overwriting it on a fixed schedule, use the [Get device time](/actions/neopool.get_device_time/) action to read the drift first and only set the time when it exceeds a threshold you choose.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Set the clock daily

This automation writes the Home Assistant time to the controller every day at 3:00.

{% details "YAML example for a daily clock set" %}

{% example %}
automation: |
  alias: "NeoPool - set the controller clock daily"
  triggers:
    - trigger: time
      at: "03:00:00"
  actions:
    - action: neopool.set_device_time
      data:
        device_id: abc123device456
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
