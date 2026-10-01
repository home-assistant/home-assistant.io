---
title: "Stop record"
action: qvr_pro.stop_record
domain: qvr_pro
description: "Stops recording a camera channel on your QVR Pro server."
related_actions:
  - qvr_pro.start_record
---

Use this action to stop recording a camera channel on your [QVR Pro](/integrations/qvr_pro/) server. Use it to stop a recording you started with [Start record](/actions/qvr_pro.start_record/).

{% include actions/ui_header.md %}

To stop recording from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **QVR Pro: Stop record**.
6. In **GUID**, enter the GUID of the camera channel. See the options below for where to find it.
7. Select **Save**.

This action does not support targets. You choose the camera channel with the **GUID** option instead.

### Options in the UI

{% options_ui %}
GUID:
  description: The GUID of the camera channel to stop recording. Each QVR Pro camera in Home Assistant shows its GUID in the `qvr_guid` attribute. You can find it under {% my developer_states title="**Settings** > **Tools** > **States**" %}.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `qvr_pro.stop_record`. A basic example looks like this:

{% example %}
action: |
  action: qvr_pro.stop_record
  data:
    guid: "245EBE933C0A597EBE865C0A245E0002"
{% endexample %}

This stops recording the camera channel with that GUID.

### Options in YAML

{% options_yaml %}
guid:
  description: The GUID of the camera channel to stop recording. Each QVR Pro camera in Home Assistant shows it in the `qvr_guid` attribute.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The recording is stored on your QVR Pro server, not in Home Assistant.
- To start recording again, use [Start record](/actions/qvr_pro.start_record/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: stop recording when the driveway is quiet again

Stop recording the driveway camera when the motion sensor has not detected motion for 2 minutes.

- **Trigger**: State changed
  - **Entity**: Driveway motion (`binary_sensor.driveway_motion`)
  - **To**: Clear
  - **For at least**: 2 minutes
- **Action**: Stop record
  - **GUID**: The GUID of the driveway camera channel

{% details "YAML example for stopping the recording when it's quiet" %}

{% example %}
automation: |
  alias: "Stop recording when the driveway is quiet"
  triggers:
    - trigger: state
      entity_id: binary_sensor.driveway_motion
      to: "off"
      for:
        minutes: 2
  actions:
    - action: qvr_pro.stop_record
      data:
        guid: "YOUR_CHANNEL_GUID"
{% endexample %}

{% enddetails %}

### Automation: stop recording when you disarm the alarm

Stop recording the driveway camera when you get home and disarm the alarm.

- **Trigger**: State changed
  - **Entity**: Home alarm (`alarm_control_panel.home`)
  - **To**: Disarmed
- **Action**: QVR Pro: Stop record
  - **GUID**: The GUID of the driveway camera channel

{% details "YAML example for stopping the recording when you disarm the alarm" %}

{% example %}
automation: |
  alias: "Stop recording when I disarm the alarm"
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home
      to: "disarmed"
  actions:
    - action: qvr_pro.stop_record
      data:
        guid: "YOUR_CHANNEL_GUID"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
