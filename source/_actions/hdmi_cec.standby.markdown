---
title: "Standby"
action: hdmi_cec.standby
domain: hdmi_cec
description: "Puts all devices on the HDMI-CEC bus that support this function into standby."
related_actions:
  - hdmi_cec.power_on
  - hdmi_cec.select_device
  - hdmi_cec.update
  - hdmi_cec.send_command
  - hdmi_cec.volume
---

The **Standby** action puts every device on the HDMI-CEC bus that supports it into standby. It sends a single command that your TV, AV receiver, and other connected devices act on together.

This is the natural counterpart to [Power on](/actions/hdmi_cec.power_on/). Use it to switch off your screen and sound system in one step when you leave the room or head to bed.

{% include actions/ui_header.md %}

To put your HDMI-CEC devices into standby from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HDMI-CEC: Standby**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hdmi_cec.standby`. A basic example looks like this:

{% example %}
action: |
  action: hdmi_cec.standby
{% endexample %}

This puts all CEC devices that support the command into standby.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- Only devices that support the CEC standby command respond. Some devices ignore it or stay on when they are still the active source.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: standby when everyone leaves home

When the last person leaves home, put all connected CEC devices into standby.

- **Trigger**: Zone occupancy cleared
  - **Zone**: Home (`zone.home`)
- **Action**: HDMI-CEC: Standby

{% details "YAML example for standby when leaving home" %}

{% example %}
automation: |
  alias: "Standby when away"
  triggers:
    - trigger: zone.occupancy_cleared
      options:
        zone: zone.home
  actions:
    - action: hdmi_cec.standby
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
