---
title: Trigger alarm webhook
action: unifiprotect.trigger_alarm_webhook
domain: unifiprotect
description: "Fires a UniFi Protect Alarm Manager webhook trigger."
---

With this action, you can fire a webhook trigger from the UniFi Protect Alarm Manager, which runs the alarms that use it.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Trigger alarm webhook**.
6. Fill in the fields, then select **Save**.

### Options in the UI

{% options_ui %}
NVR:
  description: The UniFi Protect NVR to send the webhook to.
  required: true
Trigger ID:
  description: The ID of the webhook trigger, as shown in the Alarm Manager.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `unifiprotect.trigger_alarm_webhook`. A basic example looks like this:

{% example %}
action: |
  action: unifiprotect.trigger_alarm_webhook
  data:
    config_entry_id: 1234567890abcdef1234567890abcdef
    trigger_id: 0b6c5a2e-9d3f-4c1a-8e7b-2f4d6a8c1e3b
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The config entry ID of the UniFi Protect NVR.
  required: true
  type: string
trigger_id:
  description: The ID of the webhook trigger, as shown in the Alarm Manager.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Only administrators can use this action.
- Unlike the other UniFi Protect actions, this one also works in API key only mode.
- UniFi Protect doesn't always reject an unknown trigger ID, so a typo can fail silently.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: start a Protect alarm when the house is armed away

Fire an Alarm Manager trigger when the Home Assistant alarm is armed away, for example to start recording on all cameras.

- **Trigger**: State changed: Home alarm changes to _Armed away_
- **Action**: Trigger alarm webhook

{% details "YAML example for firing a trigger when armed away" %}

{% example %}
automation: |
  alias: "Start Protect alarm when armed away"
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home_alarm
      to: "armed_away"
  actions:
    - action: unifiprotect.trigger_alarm_webhook
      data:
        config_entry_id: 1234567890abcdef1234567890abcdef
        trigger_id: 0b6c5a2e-9d3f-4c1a-8e7b-2f4d6a8c1e3b
{% endexample %}

{% enddetails %}

### Automation: sound a chime when a door opens at night

Fire an Alarm Manager trigger when the front door opens at night, for example to play a sound on a chime.

- **Trigger**: State changed: Front door changes to _Open_
- **Condition**: Time: after 22:00, before 06:00
- **Action**: Trigger alarm webhook

{% details "YAML example for firing a trigger when a door opens at night" %}

{% example %}
automation: |
  alias: "Chime when the front door opens at night"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  conditions:
    - condition: time
      after: "22:00:00"
      before: "06:00:00"
  actions:
    - action: unifiprotect.trigger_alarm_webhook
      data:
        config_entry_id: 1234567890abcdef1234567890abcdef
        trigger_id: 7d1e4b9a-2c6f-4a8e-b3d5-9f0a1c2e4b6d
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
