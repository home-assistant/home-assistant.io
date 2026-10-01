---
title: "Start record"
action: qvr_pro.start_record
domain: qvr_pro
description: "Starts recording a camera channel on your QVR Pro server."
related_actions:
  - qvr_pro.stop_record
---

Use this action to start recording a camera channel on your [QVR Pro](/integrations/qvr_pro/) server. For example, start recording when motion is detected, or while you're away.

{% include actions/ui_header.md %}

To start recording from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **QVR Pro: Start record**.
6. In **GUID**, enter the GUID of the camera channel. See the options below for where to find it.
7. Select **Save**.

This action does not support targets. You choose the camera channel with the **GUID** option instead.

### Options in the UI

{% options_ui %}
GUID:
  description: The GUID of the camera channel to start recording. Each QVR Pro camera in Home Assistant shows its GUID in the `qvr_guid` attribute. You can find it under {% my developer_states title="**Settings** > **Tools** > **States**" %}.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `qvr_pro.start_record`. A basic example looks like this:

{% example %}
action: |
  action: qvr_pro.start_record
  data:
    guid: "245EBE933C0A597EBE865C0A245E0002"
{% endexample %}

This starts recording the camera channel with that GUID.

### Options in YAML

{% options_yaml %}
guid:
  description: The GUID of the camera channel to start recording. Each QVR Pro camera in Home Assistant shows it in the `qvr_guid` attribute.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The recording is stored on your QVR Pro server, not in Home Assistant.
- To stop the recording, use [Stop record](/actions/qvr_pro.stop_record/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: record the driveway when motion is detected

Start recording the driveway camera on your QVR Pro server as soon as the motion sensor detects motion.

- **Trigger**: State changed
  - **Entity**: Driveway motion (`binary_sensor.driveway_motion`)
  - **To**: Detected
- **Action**: Start record
  - **GUID**: The GUID of the driveway camera channel

{% details "YAML example for recording when motion is detected" %}

{% example %}
automation: |
  alias: "Record the driveway when motion is detected"
  triggers:
    - trigger: state
      entity_id: binary_sensor.driveway_motion
      to: "on"
  actions:
    - action: qvr_pro.start_record
      data:
        guid: "YOUR_CHANNEL_GUID"
{% endexample %}

{% enddetails %}

### Automation: record the driveway while you're away

Start recording the driveway camera when you arm your alarm in away mode.

- **Trigger**: State changed
  - **Entity**: Home alarm (`alarm_control_panel.home`)
  - **To**: Armed away
- **Action**: QVR Pro: Start record
  - **GUID**: The GUID of the driveway camera channel

{% details "YAML example for recording while you're away" %}

{% example %}
automation: |
  alias: "Record the driveway while I'm away"
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home
      to: "armed_away"
  actions:
    - action: qvr_pro.start_record
      data:
        guid: "YOUR_CHANNEL_GUID"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
