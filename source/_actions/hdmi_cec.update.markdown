---
title: "Update"
action: hdmi_cec.update
domain: hdmi_cec
description: "Updates the state of HDMI-CEC devices from the bus."
related_actions:
  - hdmi_cec.power_on
  - hdmi_cec.standby
  - hdmi_cec.select_device
  - hdmi_cec.send_command
  - hdmi_cec.volume
---

The **Update** action refreshes the state of your HDMI-CEC devices by polling the bus. Home Assistant asks each device for its current status, such as whether it is on or in standby, and updates the matching entities.

Use it when you want to make sure the states in Home Assistant match what your devices are actually doing, for example right after powering things on or off outside of Home Assistant.

{% include actions/ui_header.md %}

To refresh the state of your HDMI-CEC devices from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HDMI-CEC: Update**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hdmi_cec.update`. A basic example looks like this:

{% example %}
action: |
  action: hdmi_cec.update
{% endexample %}

This polls the bus and refreshes the state of all HDMI-CEC devices.

### Options in YAML

This action has no additional options in YAML.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: refresh device states every few minutes

Keep the HDMI-CEC entity states current by polling the bus on a regular schedule.

- **Trigger**: Time pattern, every five minutes
- **Action**: HDMI-CEC: Update

{% details "YAML example for refreshing device states on a schedule" %}

{% example %}
automation: |
  alias: "Refresh HDMI-CEC states"
  triggers:
    - trigger: time_pattern
      minutes: "/5"
  actions:
    - action: hdmi_cec.update
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
