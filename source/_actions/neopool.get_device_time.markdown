---
title: "Get device time"
action: neopool.get_device_time
domain: neopool
description: "Reads the controller's real-time clock and reports its drift from Home Assistant."
related_actions:
  - neopool.set_device_time
---

Use this action to read the wall-clock time from the controller's real-time clock and see how far it has drifted from Home Assistant. It reads the clock directly from the controller when you call it, so the drift is accurate regardless of the polling interval. The action returns a response and does not change the controller.

{% include actions/ui_header.md %}

To get the device time from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **NeoPool: Get device time**.
6. Optionally select the **Device** to read. With a single controller, you can leave it empty.
7. In the **Response variable** field, enter a name to store the result in, such as `pool_time`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The NeoPool controller to read. Optional when only one controller is configured.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `neopool.get_device_time`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: neopool.get_device_time
  data:
    device_id: abc123device456
  response_variable: pool_time
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The NeoPool controller to read. Optional when only one controller is configured.
  required: false
  type: string
{% endoptions_yaml %}

## Response data

The action returns the following fields:

- `device_time`: The controller's clock as an ISO 8601 timestamp.
- `ha_time`: The Home Assistant time the reading was compared against, rounded to whole seconds.
- `drift_seconds`: The difference in seconds, positive when the controller is ahead of Home Assistant.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Keep the controller clock in sync

The controller's real-time clock can drift over time. Instead of a fixed daily overwrite, this automation checks the drift once an hour and only corrects the clock when it exceeds a threshold you choose.

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
